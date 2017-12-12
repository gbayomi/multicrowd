var express = require("express"),
    app     = express(),
    stream = express(),
    port1 = 3000,
    port2 = 1337,
    qs = require('querystring'),
    bs = require( "body-parser"),
    Firebase = require("firebase");
    fs = require('fs');
    $ = jQuery = require('jquery');
    $.csv = require('jquery-csv');
    FirebaseHandler = require('./fire')
    fileUpload = require('express-fileupload');
    path = require("path");
    frbs = new FirebaseHandler();
    VideoHandler = require('./videohandler');
    mkdirp = require('mkdirp');
    json2csv = require('json2csv');
    ThumbnailGenerator = require('video-thumbnail-generator').default;


/***************************
*****AUXILIARY FUNCTIONS****
****************************/
function loadDataFromCSV(input_file) {
    var sample = input_file;
    fileRead = fs.readFileSync(sample, 'UTF-8')
    $.csv.toArrays(fileRead, {}, function(err, data) {
        d = []
        for(var i=0, len=data.length; i<len; i++) {
            d.push(data[i])
        }
    });
    return d
}

function loadFromCSV(input_file) {
    fileRead = fs.readFileSync(input_file, 'UTF-8')
    $.csv.toArrays(fileRead, {}, function(err, data) {
        d = []
        for(var i=0, len=data.length; i<len; i++) {
            d.push(data[i])
        }
    });
    return d
}

function modelInterval(input_file) {
    var data = loadDataFromCSV(input_file)

    var sentences = []
    var intervals = []
    data.forEach(function(element) {
        sentences.push(element[2])
        intervals.push([parseFloat(element[0]), parseFloat(element[1])])
    })

    var input_id = input_file.split('/').pop().split('.')[0]

    console.log(intervals);

    var video = {
        'id': input_id,
        'sentences': sentences,
        'sentence_intervals': intervals
    }

    return video
}

function folderToModel(folder) {
    files_from_folder = []
    fs.readdirSync(folder).forEach(file => {
        if(file != '.DS_Store') {
            files_from_folder.push(folder+file)
        }
    });

    videos = []
    files_from_folder.forEach(function(file){
        videos.push(modelInterval(file))
    });

    videos_obj = {}

    videos.forEach(function(video, i){
        videos_obj['video_'+i] = video
    })

    return videos_obj
}

function subVideoModel(id) {
    folder = 'video/div_' + id + '_transcripts/';
    return folderToModel(folder)
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4());
}

function saveThumb(path) {

    var input_path = path;
    var output_path = path.split('/');
    var filename = output_path.pop().split('.')[0];
    output_path.pop();
    output_path = output_path.join('/') + '/thumbs/';

    mkdirp(output_path, function(err) { 
        tg = new ThumbnailGenerator({
          sourcePath: path,
          thumbnailPath: output_path
        });
         
        tg.generateOneByPercent(90, {filename: filename})
            .then(console.log);
    });
}

function saveDivThumb(params) {
    var size = params.length;

    setTimeout(function () {    
        params.forEach(function(param){
            var out = param['output'];
            saveThumb(out);
        });                   
   }, 18000*(size+2))
}

function splitVideo(path, chunkSize) {

    
    var input_path = path;
    var output_path = path.split('/');
    var file_input = output_path.pop()
    output_path = output_path.join('/')
    file_id = file_input.split('.')[0]
    var video_ext = '/div_' + file_id + '_videos/';
    var video_dir = output_path + video_ext;

    mkdirp(video_dir, function(err) { 
        output_path = output_path + video_ext + 'div_' + file_id + '.mp4';
        videoHandler = new VideoHandler(input_path);
        //videoHandler.logMetadata()
        videoHandler.splitByChunks(output_path, chunkSize, saveDivThumb);
    });

    //
}

function writeFile(path, csv) {
    fs.writeFile(path, csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
}

function splitTranscript(path, chunkSize) {
    var data = loadFromCSV(path)

    files = {}
    chunkRef = 0
    files[chunkRef] = []

    data.forEach(function(row, i) {
        start = row[0]
        end = row[1]
        sentence = row[2]

        if (end>(chunkRef+1)*chunkSize) {
            chunkRef += 1
            files[chunkRef] = []
        }

        start -= (chunkRef)*chunkSize
        end -= (chunkRef)*chunkSize

        files[chunkRef].push([parseFloat(start).toFixed(4), parseFloat(end).toFixed(4), sentence])


    });

    var input_path = path;
    var output_path = path.split('/');
    var file_input = output_path.pop()
    output_path = output_path.join('/')
    var file_id = file_input.split('.')[0].split('_')[0]
    var transc_ext = '/div_' + file_id + '_transcripts/'
    var transc_dir = output_path + transc_ext

    mkdirp(transc_dir, function(err) { 
        for (var i in files) {
            var file = files[i]
            var csv = json2csv({ data: file, hasCSVColumnTitle: false});
            var addr = transc_dir + 'div_' + file_id + '_' + i + '.csv'
            writeFile(addr, csv)
        }
    });
}


/***************************
*****SERVER PARAMETERS******
****************************/
//CORS middleware - Allow Cross Origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // NOT SAFE FOR PRODUCTION
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    next();
}

//use the allowCrossDomain function and bodyparsing for the stream and app objects
app.use(allowCrossDomain);
app.use(express.static(__dirname));

//bodyParser(); is now deprecated, so it is necessary to to call the specific functions
//json() and urlencoded({})
app.use(bs.json());
app.use(bs.urlencoded({
  extended: true
}));

app.use(fileUpload());

/***************************
********SERVER CALLS********
****************************/

app.get('/thumbs', function(req, res){
    var files = []
    var currPath = path.resolve(__dirname) +'/thumbs';
    console.log(currPath);

    fs.readdirSync(currPath).forEach(file => {
        files.push(file);
    });

    res.send(files);
});

app.post('/upload/:chunk', function(req, res){
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    var currPath = path.resolve(__dirname)
    let files = req.files.files;
    var chunkSize = parseInt(req.params['chunk']);

    if (files.length != undefined) {
        var size = files.length
        files.forEach(function(file, i){
            var fileName = currPath + '/video/' + file.name
            file.mv(fileName, function(err) {
                if (err) {
                    console.log('Error')
                    console.log(err)
                    return res.status(500).send(err);
                }

                var ext = file.name.split('.').pop()

                if (ext == 'csv') {
                    splitTranscript(fileName, chunkSize)
                } else if (ext == 'mp4') {
                    saveThumb(fileName);
                    splitVideo(fileName, chunkSize);
                    vhr = new VideoHandler(fileName);
                    vhr.useMetadata(function(self){
                        var duration = self.metadata.streams[0].duration;
                        res.send(String(duration));
                    });
                }
            });
        });
    } else {
        var file = files
        var fileName = currPath + '/video/' + file.name
        file.mv(fileName, function(err) {
            if (err) {
                console.log('Error')
                console.log(err)
                return res.status(500).send(err);
            }
            var ext = fileName.split('/').pop().split('.').pop()

            if (ext == 'csv') {
                splitTranscript(fileName, chunkSize)
            } else if (ext == 'mp4') {
                saveThumb(fileName);
                splitVideo(fileName, chunkSize);
            }
            

            vhr = new VideoHandler(fileName);
            vhr.useMetadata(function(self){
                var duration = self.metadata.streams[0].duration;
                res.send(String(duration));
            });
        });
    }
});


app.post('/newtasks', function(req,res){
    var data = req.body;
    var video_ids = data['video_ids']
    var task_builder = JSON.parse(JSON.stringify(data));

    delete task_builder['video_ids']
    delete task_builder['numerical_range']

    tasks = []
    video_ids.forEach(function(video_id){
        var task = JSON.parse(JSON.stringify(task_builder));
        var sub_videos = subVideoModel(video_id);
        task['sub_videos'] = sub_videos
        task['video_id'] = video_id
        tasks.push(task)
    });
   
    var _id = ''
    tasks.forEach(function(task){
        new_task_obj = {}
        _id = task.video_id + '-' + guidGenerator();
        new_task_obj[_id] = task
        frbs.createTask(new_task_obj)
    });

    res.send(_id);
});

app.post('/newlabels', function(req,res){
    var data = req.body;
    var label_builder = JSON.parse(JSON.stringify(data));
    var turkerid = 'turker' + guidGenerator(); 

    var newObj = {}
    newObj[turkerid] = label_builder;
    frbs.createLabels(newObj);
    res.send(newObj);
});


/***************************
*****INITIATE SERVER******
****************************/
console.log('listening on port ' + port1)
app.listen(port1);
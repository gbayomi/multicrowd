var ffmpeg = require('fluent-ffmpeg');
var path = require("path");

function VideoHandler(video_path) {

    this.video_path = video_path
}

VideoHandler.prototype.split = function(output_path, start_time, duration) {
    ffmpeg(this.video_path)
            .setStartTime(start_time)
            .setDuration(duration)
            .output(output_path)

            .on('end', function(err) {   
                if(!err)
                {
                  console.log('conversion Done');


                }                 

            })
            .on('error', function(err){
                console.log('error: ', +err);

            }).run(); 
}

VideoHandler.prototype._splitByChunks = function(self, params, callback) {
    output_path = params['output_path'];
    createThumb = params['callback'];

    prefix = output_path.split('/').slice(0,-1).join('/')
    name = output_path.split('/').slice(-1).join().split('.')[0]
    extension = '.' + output_path.split('/').slice(-1).join().split('.')[1]

    chunk_size = params['chunk_size']
    duration = self.metadata.streams[0].duration

    i = 0
    count = 0
    start_times = []
    chunks = []
    output_paths = []
    while (i<duration) {
        start_times.push(String(i).toHHMMSS())
        chunks.push(chunk_size)
        output_path_temp = prefix + '/' + name + '_' + String(count) + extension
        output_paths.push(output_path_temp)
        count += 1
        i += chunk_size;
    }

    last_chunk = duration - start_times[start_times.length - 1].toSeconds()
    chunks[chunks.length-1] = Math.ceil(last_chunk)
    size = start_times.length

    packages = []

    for (i=0; i<size; i++) {
        o_ = output_paths[i]
        s_ = start_times[i]
        c_ = chunks[i]
        package = {}
        package['output'] = o_
        package['start_times'] = s_
        package['chunks'] = c_
        packages.push(package)
    }

    loop(self, self.splitPackage, createThumb, packages, 0, size)
}

VideoHandler.prototype.splitPackage = function(self, index, params) {
    package = params[index]
    o_ = package['output']
    s_ = package['start_times']
    c_ = package['chunks']
    self.split(o_, s_, c_);
}

VideoHandler.prototype.splitByChunks = function(output_path, chunk_size, callback) {
    this.useMetadata(this._splitByChunks, 
        {'output_path': output_path, 
        'chunk_size':chunk_size,
        'callback': callback
        }
    )
}

VideoHandler.prototype.useMetadata = function(callback, parameters) {
    ffmpeg.ffprobe(this.video_path, (err, metadata) => {
        this.metadata = metadata
        callback(this, parameters)
    });
}

VideoHandler.prototype.logMetadata = function() {
    ffmpeg.ffprobe(this.video_path, (err, metadata) => {
        console.log(metadata)
    });
}

function loop (self, callback, createThumb, params, i, maximum) {           
   setTimeout(function () {    
      callback(self, i, params);
      console.log(i + ', ' + String((i+1)*17.5).toHHMMSS());
      if (i==0) {
        createThumb(params);  
      }   
      i++;                     
      if (i < maximum) {           
         loop(self, callback, createThumb, params, i, maximum);            
      }                        
   }, 17500)
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

String.prototype.toSeconds = function () { 
    if (!this) return null; 
    var hms = this.split(':'); 
    return (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2] || 0); 
}


module.exports = VideoHandler;
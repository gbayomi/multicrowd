$(document).ready(function() {

	//DO STUFF

	function loadVideo(id, active, thumb_src, video_src) {
		video_string = '<div id='+String(id)+' class="container '+ active +'mini-task">'+
		'<div class="container col-lg-6 videoTransc">'+
		'<video id='+"video_"+id+' class="video-js" poster='+
		thumb_src +
		' controls="true" preload="auto" data-setup="{}" width="375"  height="310">'+
		'<source src='+ video_src +' type="video/mp4"></source>'+
		'</video></div></div>'

		$('#task-container').append(video_string);
	}

	function loadTranscripts(id, categories, sentences, sentence_intervals) {

		var loader = '<div class="container col-lg-6 textTransc">'
		sentences.forEach(function(sentence, i){

			var interval = sentence_intervals[i].join('-');
			console.log(interval);

			var pid = String(id)+ '-' + String(i+1);
			loader += 
			'<p id='+pid+' class="highlight"> <span id='+ interval +' class="text-transcript">'+
			sentence+
			'</span> <button id=' + categories[0] + ' type="button" class="btn btn-info button-label">'+
			categories[0]+
			'</button> <button id=' + categories[1] + ' type="button" class="btn btn-info button-label">'+
			categories[1]+
			'</button></p>'

		});

		loader += '</div>'

		var id_tag = '#' + String(id)
		$(id_tag).append(loader);
	}

	function loadFromParams(id, active, thumb_src, video_src, categories, sentences, sentence_intervals){
		loadVideo(id, active, thumb_src, video_src);
		loadTranscripts(id, categories, sentences, sentence_intervals);
	}

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAPMHeGOhimpxT0Hzz5EljbWrXkaVj_Hag",
		authDomain: "artic-f85f4.firebaseapp.com",
		databaseURL: "https://artic-f85f4.firebaseio.com",
		projectId: "artic-f85f4",
		storageBucket: "artic-f85f4.appspot.com",
		messagingSenderId: "50278070365"
	};

	firebase.initializeApp(config);

    
    $('#login-modal').modal('show');

    $('#submit-id').on('click', function(){
    	//var task_id = 'classic-10cc1cc9-7e5f';
    	var task_id = $('#taskid').val().trim();
    	$('#login-modal').modal('hide');
    	var ref = firebase.database().ref('Tasks/' + task_id);
		ref.on("value", function(snapshot) {
			var task = snapshot.val();
			categories = task.categories;
			videos = task.sub_videos;
			size = Object.keys(videos).length;
			videos_arr = Array.apply(null, Array(size)).map(Number.prototype.valueOf,0);

			for (var key in videos) {
				var index = parseInt(key.split('_')[1]);
				videos_arr[index] = videos[key];
			}

			videos_arr.forEach(function(video, i) {
				var id = i;
				var active = ''
				if (i == 0) {
					active = 'active ';
				}

				var videos_folder = video.id.split('_');
				videos_folder.pop();
				videos_folder = videos_folder.join('_') + '_videos/';

				var thumb_src = '../video/thumbs/'+video.id+'.png';
				var video_src = '../video/' + videos_folder + video.id +'.mp4';
				var sentences = video.sentences;
				var sentence_intervals = video.sentence_intervals;
				
				loadFromParams(id, active, thumb_src, video_src, categories, sentences, sentence_intervals);
			});
			$.getScript("http://vjs.zencdn.net/6.2.8/video.js", function(err){
				$.getScript("js/cframe.js");
			});
		});
    });

	/*
	var ref = firebase.database().ref('Tasks/' + task_id);
	ref.on("value", function(snapshot) {
		var task = snapshot.val();
		categories = task.categories;
		videos = task.sub_videos;
		size = Object.keys(videos).length;
		videos_arr = Array.apply(null, Array(size)).map(Number.prototype.valueOf,0);

		for (var key in videos) {
			var index = parseInt(key.split('_')[1]);
			videos_arr[index] = videos[key];
		}

		videos_arr.forEach(function(video, i) {
			var id = i;
			var active = ''
			if (i == 0) {
				active = 'active ';
			}

			var videos_folder = video.id.split('_');
			videos_folder.pop();
			videos_folder = videos_folder.join('_') + '_videos/';

			var thumb_src = '../video/thumbs/'+video.id+'.png';
			var video_src = '../video/' + videos_folder + video.id +'.mp4';
			var sentences = video.sentences;
			var sentence_intervals = video.sentence_intervals;
			
			loadFromParams(id, active, thumb_src, video_src, categories, sentences, sentence_intervals);
		});
		$.getScript("http://vjs.zencdn.net/6.2.8/video.js", function(err){
			$.getScript("js/cframe.js");
		});
	});
	*/
});


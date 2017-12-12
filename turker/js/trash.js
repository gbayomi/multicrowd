$(document).ready(function() {


	function loadVideo(id, active, thumb_src, video_src) {
		video_string = '<div id='+String(id)+' class="container '+ active +'mini-task">'+
		'<div class="container col-lg-6 videoTransc">'+
		'<video id="player_transc" class="video-js" poster='+
		thumb_src +
		' controls="true" preload="auto" data-setup="{}" width="375"  height="310">'+
		'<source src='+ video_src +' type="video/mp4"></source>'+
		'</video></div></div>'

		$('#task-container').append(video_string);
	}

	function loadTranscripts(id, categories, sentences) {

		var loader = '<div class="container col-lg-6 textTransc">'
		sentences.forEach(function(sentence, i){

			var pid = String(id)+ '-' + String(i+1);
			loader += 
			'<p id='+pid+' class="highlight"> <span class="text-transcript">'+
			sentence+
			'</span> <button id="danger" type="button" class="btn btn-info button-label">'+
			categories[0]+
			'</button> <button id="success" type="button" class="btn btn-info button-label">'+
			categories[1]+
			'</button></p>'

		});

		loader += '</div>'

		var id_tag = '#' + String(id)
		$(id_tag).append(loader);
	}

	function loadFromParams(id, active, thumb_src, video_src, categories, sentences){
		loadVideo(id, active, thumb_src, video_src);
		loadTranscripts(id, categories, sentences);
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

	var task_id = 'vtest-9c6d0efa-43b0'
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
			var thumb_src = '../thumbs/classic.png';
			var video_src = '../videos/vtest.mp4';
			var sentences = video.sentences;
			
			loadFromParams(id, active, thumb_src, video_src, categories, sentences);
		});
		$.getScript("js/cframe.js");
		$.getScript("http://vjs.zencdn.net/6.2.8/video.js");
	});

	/*
	var id = 0;
	var active = 'active ';
	var thumb_src = '../thumbs/classic.png';
	var video_src = '../videos/vtest.mp4';
	var categories = ['SD', 'NON-SD'];
	var sentences = ['ok tell me more', 'nothing to add'];

	//console.log(id, active, thumb_src, video_src, categories, sentences);
	//loadFromParams(id, active, thumb_src, video_src, categories, sentences);
	
	active = '';
	//loadFromParams(1, active, thumb_src, video_src, categories, sentences);
	//loadFromParams(2, active, thumb_src, video_src, categories, sentences);
	//loadFromParams(3, active, thumb_src, video_src, categories, sentences);
	

	//$.getScript("js/cframe.js");
	//$.getScript("http://vjs.zencdn.net/6.2.8/video.js");
	*/





});


/*
<div class="container col-lg-6 textTransc">
  <p id="video_1_transc_1" class="highlight"> <span class="text-transcript">The first active here orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span> <button id='danger' type="button" class="btn btn-info button-label">Violate Social Norm</button> <button id='success' type="button" class="btn btn-info button-label">Doesn't Violate Social Norm</button> </p>
  <p id="video_1_transc_2" class="highlight"> <span class="text-transcript">Ut enim ad minima veniam</span> <button id='danger' type="button" class="btn btn-info button-label">Violate Social Norm</button> <button id='success' type="button" class="btn btn-info button-label">Doesn't Violate Social Norm</button> </p>
  <p id="video_1_transc_3" class="highlight"> <span class="text-transcript">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span> <button id='danger' type="button" class="btn btn-info button-label">Violate Social Norm</button> <button id='success' type="button" class="btn btn-info button-label">Doesn't Violate Social Norm</button> </p>
  <p id="video_1_transc_4" class="highlight"> <span class="text-transcript">Ut enim ad minima veniam</span> <button id='danger' type="button" class="btn btn-info button-label">Violate Social Norm</button> <button id='success' type="button" class="btn btn-info button-label">Doesn't Violate Social Norm</button> </p>
  <p id="video_1_transc_5" class="highlight"> <span class="text-transcript">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span> <button id='danger' type="button" class="btn btn-info button-label">Violate Social Norm</button> <button id='success' type="button" class="btn btn-info button-label">Doesn't Violate Social Norm</button> </p>
</div>
</div>''
*/

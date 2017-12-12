$(document).ready(function() {
	//console.log('olar');

	var active_id = 0
	var no_submit = true
	var answer_dict = {}

	function start_and_stop(id, start_time, stop_time) {
		videojs(id).ready(function(){
		  var myPlayer = this;

		  // EXAMPLE: Start playing the video.
		  myPlayer.currentTime(start_time);
		  myPlayer.play();
		  var duration = stop_time - start_time;

		  setTimeout(function(){ 
		  	myPlayer.pause()
		  }, duration*1000);

		});
	}

	$('.text-transcript').click(function(){
		var interval = String(this.id).split('-');
		console.log(interval);
		var start_time = Math.floor(parseFloat(interval[0]));
		var stop_time = Math.ceil(parseFloat(interval[1]));
		var video_id = 'video_' + String($(this).parent().closest('p').attr('id').split('-')[0]);
		start_and_stop(video_id, start_time, stop_time);
	});

	$('.highlight').hover(function(){
		//console.log('aqui');
		button = '#' + String(this.id) + ' .button-label'
		$(button).show()
	}, function(){
		button = '#' + String(this.id) + ' .button-label'
		$(button).hide()
	});

	$('.button-label').on('click', function (e) {
		id_of_change = $(this).attr('id').split(' ')[0];
		id = $(this).parent().closest('p').attr('id').split(' ')[0];
		button = '#' + String(id) + ' .button-label';

		answer_dict[id] = id_of_change.trim();

		$(button).removeClass('btn-info').addClass('btn-secondary');
		$(button).removeClass('btn-danger').addClass('btn-secondary');
		$(button).removeClass('btn-success').addClass('btn-secondary');

		selection = '#' + String(id) + ' #'+id_of_change
		$(selection).removeClass('btn-secondary').addClass('btn-success');
 	});

 	$('#left-arrow').on('click', function (e) {
 		if (active_id>0) {
			$('#'+String(active_id)).removeClass('active');
			active_id--
			$('#'+String(active_id)).addClass('active');
			$('#submission').attr('disabled','disabled');
			no_submit = true
		}
 	});

 	$('#right-arrow').on('click', function (e) {
 		if (no_submit) {
 			$('#'+String(active_id)).removeClass('active');
			active_id++
			$('#'+String(active_id)).addClass('active');
 		}

		if ($('#'+String(active_id+1)).length<=0) {
			$('#submission').removeAttr('disabled');
			no_submit = false
		}
 	});

 

 	$('#submission').on('click', function (e) {

 		var task_id = $('#taskid').val().trim();
 		var ref = firebase.database().ref('Tasks/' + task_id);
 		ref.on("value", function(snapshot) {
 			new_labels = snapshot.val();
 			size_sub_videos = Object.keys(new_labels.sub_videos).length;

 			for (var i=0; i<size_sub_videos; i++) {
 				sentences = new_labels.sub_videos['video_'+String(i)]['sentences']
 				empty = Array.apply(null, Array(sentences.length)).map(String.prototype.valueOf,"")
 				new_labels.sub_videos['video_'+String(i)]['labels'] = empty
 			}

 			for (var key in answer_dict) {
 				_key = key.split('-');
 				var video_id = _key[0];
 				var label_id = _key[1]

 				var video_key = 'video_'+video_id;
 				new_labels.sub_videos[video_key]['labels'][label_id] = answer_dict[key]
 			}

 			function sendAjaxPost(content) {
			    var submit = $.ajax({
			            url: 'http://localhost:3000/newlabels', 
			            type: 'POST', 
			            data: content,
			            error: function(error) {
			            	console.log("Error - AJAX");
			          }, 
			          	success: function(data) {
			            	console.log(data);
			          }
			        });
			};

			var send_obj = {}
			send_obj[task_id] = new_labels;
 			sendAjaxPost(send_obj);

 		});

 		/*for (key in answer_dict) {

 		}*/
 	});

});

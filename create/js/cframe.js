$(document).ready(function() {
	var video_ids = []
	var divSec = 0
	var level = ''
	var type = ''
	var categories = []
	var countCat = 0

	all_videos = ['classic'];

	$.get("../thumbs/", function(data) {
		var total = 0

	    data.forEach(function(item){
	    	item = item.split('.');
	    	if (item[1] == 'png') {
	    		item = item[0];
	    		total += 1
	    		$(".img-row").append('<div class="img-element">'+
				'<img src=' +'../thumbs/'+ item + '.png ' +
				'width="240px"'+
				' id='+ item +
				' class="img-thumbnail img-check"></div>');
	    	}
	    });

	    if (total<1) {
	    	$(".img-row").append('<h1>No videos uploaded</h1>');
	    }

		$(".img-check").click(function(){
			var video_id = $(this).attr('id');
			var find = video_ids.indexOf(video_id);
			if (find == -1) {
				video_ids.push(video_id);
			} else {
				video_ids.splice(find, 1)
			}
			$(this).toggleClass("check");
		});


		$(".divPadder .btn-default").click(function(){
			divSec = $(this).text().trim()
			$(".divPadder .btn-default").removeClass('btn-selected'); 
			$(this).addClass('btn-selected'); 
		});

		$(".levelPadder .btn-default").click(function(){
			level = $(this).text().trim()
			$(".levelPadder .btn-default").removeClass('btn-selected'); 
			$(this).addClass('btn-selected'); 
		});

		$(".typePadder .btn-default").click(function(){
			type = $(this).text().trim()
			$(".typePadder .btn-default").removeClass('btn-selected'); 
			$(this).addClass('btn-selected'); 
		});

	    $(".divPadder").click(function(){

	    	if ($(".divPadder .btn-default").css("opacity") == 0.5) {
	    		$(".typePadder").hide();
	    		$(".cat-container").hide();
	    		$('.levelPadder .btn-default').css({ "opacity": 1.0 });
	    	} else {
	    		$('.divPadder .btn-default').css({ "opacity": 0.5 });
	    		$(".levelPadder").show();
	    	}
	    	//$(document).scrollTop($(document).height() - 1000);
		});

		$(".levelPadder").click(function(){
			if ($(".levelPadder .btn-default").css("opacity") == 0.5) {
				$(".cat-container").hide();
		    	$('.levelPadder .btn-default').css({ "opacity": 0.5 });
		    	$('.typePadder .btn-default').css({ "opacity": 1.0 });
				$(".typePadder").show();
			} else {
	    		$('.levelPadder .btn-default').css({ "opacity": 0.5 });
	    		$('.typePadder .btn-default').css({ "opacity": 1.0 });
	    		$(".typePadder").show();
	    	}
			$(document).scrollTop($(document).height() - 1000);
		});

		$(".typePadder").click(function(){
	    	$('.typePadder .btn-default').css({ "opacity": 0.5 });
			$(".cat-container").show();
			$(document).scrollTop($(document).height() - 1000);
		});

		$(document).on('click', '.btn-add', function(e) {
	        e.preventDefault();

	        countCat += 1;

	        var newCat = $(this).parents('.entry:first').find('input');
	        categories.push(newCat.val());

	        if (countCat>1) {
	        	$(".task-submit").show();
	        }

	        var controlForm = $('.controls form:first'),
	            currentEntry = $(this).parents('.entry:first'),
	            newEntry = $(currentEntry.clone()).appendTo(controlForm);

	        newEntry.find('input').val('');
	        controlForm.find('.entry:not(:last) .btn-add')
	            .removeClass('btn-add').addClass('btn-remove')
	            .removeClass('btn-success').addClass('btn-danger')
	            .html('<span class="glyphicon glyphicon-minus"></span>');


	        newCat.attr('disabled', 'disabled');


	    }).on('click', '.btn-remove', function(e)
	    {
	    	var oldCat = $(this).parents('.entry:first').find('input').val()
	        categories.splice(oldCat, 1);

			$(this).parents('.entry:first').remove();
			countCat -= 1
			if (countCat<2) {
	        	$(".task-submit").hide();
	        }
			e.preventDefault();
			return false;
		});


		$(".task-submit").click(function(){
			var send_obj = {    
		      "video_ids": video_ids,
		      "help_video_id": "8d70f3c8-", 
		      "div_time": divSec,  
		      "level_type": level,  
		      "price": 10, 
		      "time_to_complete": 800, 
		      "type:": "categorical",      
		      "numerical_range": null,  
		      "categories": categories
		    }

		    sendAjaxPost(send_obj);

		    function sendAjaxPost(content) {
			    var submit = $.ajax({
			            url: 'http://localhost:3000/newtasks', 
			            type: 'POST', 
			            data: content,
			            error: function(error) {
			            	console.log("Error - AJAX");
			          }, 
			          	success: function(data) {
			            	alert(data);
			          }
			        });
			};
		    
		});

	});

});
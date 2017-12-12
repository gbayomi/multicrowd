+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    $("#js-upload-form").submit(function(e){

        e.preventDefault()
	    var formData = new FormData(this);

        var div = $('.number-spinner').find('input').val();
        var _url = 'http://localhost:3000/upload/' + div.trim();
        
	    $.ajax({
	        url: _url,
	        type: 'POST',
	        data: formData,
	        success: function (data) {
	            var duration = data
                function start(duration){
                     var duration = duration*800; // it should finish in 5 seconds !
                     var percent = duration / 100; // 1 percent of duration
                     var i = 0 ;
                     var interval = setInterval(function(){
                        i++;
                        $(".progress-bar").css("width", i + "%");
                        if(i>=100){
                            console.log("done");
                            $('.badge').addClass('alert-success');
                            clearInterval(interval);
                        }
                    }, percent);
                }

                start(duration)
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });

	    return false;
	});

    var update_list = function(names) {

        $(".list-group").empty()
        names.forEach(function(name, i) {
            $(".list-group")
            .append('<a href="#" class="list-group-item"><span class="badge">Status</span>' +
            name + '</a>')
            })
    }

    $('#js-upload-files').change(function(e){
        var names = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            names.push($(this).get(0).files[i].name);
        }

        update_list(names);
    });

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';
        document.getElementById('js-upload-files').files = e.dataTransfer.files;
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

    $(".number-spinner").mousedown(function () {
        console.log('blahj')
    })

}(jQuery);
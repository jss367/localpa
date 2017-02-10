// Variable to hold request
var request = null;


$(document).ready(function(){
	console.log('I have loaded');

	//Grab DOM elements to use later
	analyzeTextButton = $("#analyze-button");
	text = $("user-text");


	//Attempt number one
	analyzeTextButton.click(function() {


		// focus on text field
        text.focus();



		// get text
		// text0 = $("#user-text");
		// console.log(text0); //This part work
		// console.log('text123'); //This part works
		text = $("#user-text").val();
		// $.ajax({
		// 	type: "POST",
		// 	url: "analyze",
		// 	dataType: "json",
		// 	contentType: "application/json",
		// 	data: {"value":text },
		// 	success: function(results, results2, verbs) {
		// 		text = results.text;
		// 		console.log("Success!");
		// 		console.log(verbs);
		// 	}
		// })		



        $.ajax({
            type: 'POST',
            url: "analyze",
            // Encode data as JSON.
            data: {html:text},
            // This is the type of data expected back from the server.
            dataType: 'json',

            success: function (ret) {
              alert('JSON posted: ' + JSON.stringify(ret));
              results = ret.results
              results2 = ret.results2
              verbs = ret.verbs
			  console.log(verbs)





            }
          });

  		// $.ajax({url: "post",
  		// 	type: "POST",
  		//  	success: function(result){
  		//  		console.log(text)
    //         	$("#div1").html(result);
    // 	    }});




})

	//Attempt number two
	// analyzeTextButton.click(function(){

	// 	//get the text
	// 	//document.getElementById("field3").value = document.getElementById("field1").value;
	// 	console.log('I have been clicked');

 //    	 // Abort any pending request
 //    	 if (request) {
 //    	 	request.abort();
 //    	 }
 //    	// setup some local variables
 //    	var $form = $(this);

 //    	// Let's select and cache the text
 //    	var $inputs = $form.find("textarea");

 //    	// Serialize the data in the form
 //    	var serializedData = $form.serialize();

 //    	// Fire off the request
 //    	console.log('Request is being sent');
 //    	request = $.ajax({
 //    		url: "/analyze-text",
 //    		type: "POST",
 //    		data: serializedData
 //    	});

 //    	console.log('Request has been sent');

 //     // Callback handler that will be called on success
 //     request.done(function (response, textStatus, jqXHR){
 //        // Log a message to the console
 //        console.log("Hooray, it worked!");
 //    });

 //    // Callback handler that will be called on failure
 //    request.fail(function (jqXHR, textStatus, errorThrown){
 //        // Log the error to the console
 //        console.error(
 //        	"The following error occurred: "+
 //        	textStatus, errorThrown
 //        	);
 //    });

 //    // Callback handler that will be called regardless
 //    // if the request failed or succeeded
 //    request.always(function () {
 //        // Reenable the inputs
 //        $inputs.prop("disabled", false);
 //    });
 //        //hide all the text
 //        $("p").hide();
 //    });


	//Attempt number three
	$(document).ready(function() {
		var submit_form = function(e) {
			$.getJSON($SCRIPT_ROOT + '/return_text', {
				a: $('input[name="a"]').val(),
				b: $('input[name="b"]').val(),
				contents: $('textarea[name="contents"]').val() 

			}, function(data) {
				$('#result').text(data.result);
				$('input[name=a]').focus().select();
			});
			console.log('Got contents');
			return false;
		};
		$('a#calculate').bind('click', submit_form);
		$('input[type=text]').bind('keydown', function(e) {
			if (e.keyCode == 13) {
				submit_form(e);
			}
		});
		$('input[name=a]').focus();
	});

	    // convert html to text
    function html2text(htmlStr) {
        htmlStr = htmlStr.replace(/<div><br><\/div>/mgi, "\n").replace(/&nbsp;/mgi, " ");
        var el = $("<div>").html(htmlStr);
        $("div,p,br", el).before("\n");
        return el.text().trim();
    }

});



$(document).ready(function(){


	console.log('I have loaded');

    // Variable to hold request
    var request;

    $("button").click(function(){
    	document.getElementById("field3").value = document.getElementById("field1").value;
    	console.log('I have been clicked');

    	 // Abort any pending request
    	 if (request) {
    	 	request.abort();
    	 }
    	// setup some local variables
    	var $form = $(this);

    	// Let's select and cache the text
    	var $inputs = $form.find("textarea");

    	// Serialize the data in the form
    	var serializedData = $form.serialize();

    	// Fire off the request
    	console.log('Request is being sent');
    	request = $.ajax({
    		url: "/index",
    		type: "post",
    		data: serializedData
    	});

    	console.log('Request has been sent');

     // Callback handler that will be called on success
     request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
        	"The following error occurred: "+
        	textStatus, errorThrown
        	);
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });
        //hide all the text
        $("p").hide();
    });





$(function() {
    var submit_form = function(e) {
      $.getJSON($SCRIPT_ROOT + '/_add_numbers', {
        a: $('input[name="a"]').val(),
        b: $('input[name="b"]').val()
      }, function(data) {
        $('#result').text(data.result);
        $('input[name=a]').focus().select();
      });
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

});








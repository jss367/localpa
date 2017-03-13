// Variable to hold request
var request = null;

$(document).ready(function(){
	console.log('I have loaded');

	//Grab DOM elements to use later
	analyzeTextButton = $("#analyze-button");
	text = $("user-text");
	//Attempt number one
	analyzeTextButton.click(function() {
		text = $("#user-text").val();

		$.ajax({
			type: 'POST',
			url: "analyze",
            // Encode data as JSON.
            data: {html:text},
            // This is the type of data expected back from the server.
            dataType: 'json',
            success: function (ret) {
            	//alert('JSON posted: ' + JSON.stringify(ret));
            	results = ret.results
            	console.log(results)
            	verbs = ret.verbs
            	console.log(verbs)
            	displayText();
            }
        });
	})

$('textarea.test-example').highlightWithinTextarea(onTest);
function onTest(input) {
	console.log("We have reached the onTest function")
	// console.log(words)
  return /chile|ecuador|peru/gi;
}

	});

function displayText() {
	$("#num-words").text(results['num_words']);
	$("#ave-words").text(results['Ave word size']);
	$("#fk-score").text(results['Flesch Kincaid']);

	
	//$("#num-words").text(results['num_words']toString());

}



function onInputArray(input) {
  var length = input.length;
  if (length >= 20) {
    return [[0, 10], [length - 10, length]];
  } else {
    return [];
  }
}
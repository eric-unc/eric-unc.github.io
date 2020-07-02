$(document).ready(function(){
	$('a.copyemail').click(function(){
		var emailAddress = "u164" + "" + "33" + "64@live" + "." + "unc.edu";
		navigator.clipboard.writeText(emailAddress).then(function(){
			// Sucessfully copied.
		}, function(){
  		console.error("Unable to write to clipboard!");
		});
	});
});

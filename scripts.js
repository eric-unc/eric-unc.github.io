$(document).ready(function(){
	// Contact
	$('a.copyemail').click(function(){
		let emailAddress = "u164" + "" + "33" + "64@live" + "." + "unc.edu";

		navigator.clipboard.writeText(emailAddress).then(function(){
			// Successfully copied.
		}, function(){
  			console.error("Unable to write to clipboard!");
		});
	});

	// Project filters
	$('button.show-just-active-button').click(function(){
		$('li.proj-inactive, button.show-just-active-button').css('display', 'none');
		$('button.refresh-button').css('display', 'block');
	});

	$('button.refresh-button').click(function(){
		$('button.refresh-button').css('display', 'none');
		$('li.proj-inactive, button.show-just-active-button').css('display', '');
	});
});

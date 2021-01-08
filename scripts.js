$(document).ready(() => {
	// Contact
	$('a.copyemail').click(() => {
		let emailAddress = "u164" + "" + "33" + "64@live" + "." + "unc.edu";

		navigator.clipboard.writeText(emailAddress).then(() => {
			// Successfully copied.
		}, function(){
  			console.error("Unable to write to clipboard!");
		});
	});

	// Project filters
	$('button.show-just-active-button').click(() => {
		$('li.proj-inactive, button.show-just-active-button').fadeOut(400, 'swing', () => {
			$('li.proj-inactive, button.show-just-active-button').css('display', 'none');
			$('button.refresh-button').css('display', 'block');
		});
	});

	$('button.refresh-button').click(() => {
		$('li.proj-inactive, button.show-just-active-button').fadeOut(400, 'swing', () => {
			$('button.refresh-button').css('display', 'none');
			$('li.proj-inactive, button.show-just-active-button').css('display', '');
		});
	});
});

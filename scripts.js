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

	//// Project filters
	// Show only active
	$('.show-just-active-button').click(() => {
		$('.proj-inactive').fadeOut(400, 'swing', () => {
			$('.proj-inactive, .show-just-active-buttons').css('display', 'none');
			$('.refresh-button').css('display', 'block');
		});
	});

	// Show only Java
	addFilter('.button-java', '.proj-java');

	// Show only MediaWiki
	addFilter('.button-mw', '.proj-mw');

	// Show only Ruby
	addFilter('.button-rb', '.proj-rb');

	// Show only HTML/CSS/JS
	addFilter('.button-html', '.proj-html');

	// Show only SQL
	addFilter('.button-sql', '.proj-sql');

	// Show only C/C++
	addFilter('.button-c', '.proj-c');

	// Show only C#
	addFilter('.button-csharp', '.proj-csharp');

	// Show only Python
	addFilter('.button-py', '.proj-py');

	// Show only MATLAB
	addFilter('.button-matlab', '.proj-matlab');

	// Show only Rust
	addFilter('.button-rust', '.proj-rust');

	// Show only hardware
	addFilter('.button-hardware', '.proj-hardware');

	// Refresh
	$('.refresh-button').click(() => {
		$('.refresh-button').fadeOut(400, 'swing', () => {
			$('.refresh-button').css('display', 'none');
			$('li, .show-just-active-buttons').css('display', '');
		});
	});
});

function addFilter(buttonClass, classToKeep){
	$(buttonClass).click(() => {
		$('.show-just-active-buttons').fadeOut(400, 'swing', () => {
			$('.proj-active, .proj-inactive, .show-just-active-buttons').css('display', 'none');
			$(classToKeep).css('display', '');
			$('.refresh-button').css('display', 'block');
		});
	});
}

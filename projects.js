$(document).ready(function(){
	$('button.show-just-active-button').click(function(){
		$('li.proj-inactive, button.show-just-active-button').css('display', 'none');
		$('button.refresh-button').css('display', 'block');
	});

	$('button.refresh-button').click(function(){
		$('button.refresh-button').css('display', 'none');
		$('li.proj-inactive, button.show-just-active-button').css('display', '');
	});
});

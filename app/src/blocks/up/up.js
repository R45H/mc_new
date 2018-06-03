$('.up').on('click', function(e) {
	e.preventDefault();

	$('body, html').animate({
		scrollTop: 0
	}, 500);
});
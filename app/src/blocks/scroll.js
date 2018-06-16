$('.js-scroll').on('click', function(e) {
	e.preventDefault();

	var
		target = addIdHash($(this).attr('href')),
		$target = $(target);

	$('body, html').animate({
		scrollTop: $target.offset().top
	}, 500);
});
var
	classBlock = 'section',
	$nextBtn = $('.' + classBlock + '__next');

$nextBtn.each(function() {

	$(this).on('click', function() {
		var
			$nextSection = $(this)
				.closest('.' + classBlock)
				.next();

		if (!$nextSection.length) return;

		$('body, html').animate({
			scrollTop: $nextSection.offset().top
		}, 500);
	});
});
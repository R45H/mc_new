var $upBtn = $('.footer__up');

if (!$upBtn.length) return;

if (hasScroll('Height')) {

	if ($(window).scrollTop()) {
		$upBtn.show();
	} else {
		$upBtn.hide();
	}
} else {
	$upBtn.hide();
}

$(window).on('resize', function() {

	if (hasScroll('Height')) {

		if ($(this).scrollTop()) {
			$upBtn.show();
		} else {
			$upBtn.hide();
		}

	} else {
		$upBtn.hide();
	}
});

$(window).on('scroll', function() {

	if ($(this).scrollTop()) {
		$upBtn.show();
	} else {
		$upBtn.hide();
	}
});
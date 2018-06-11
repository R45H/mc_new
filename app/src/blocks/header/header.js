var
	classBlock = 'header',
	classCollapse = classBlock + '_collapse',
	$block = $('.' + classBlock);

$(window).on('scroll resize', function() {

	if ($(this).scrollTop() > 0) {
		$block.addClass(classCollapse);
	} else {
		$block.removeClass(classCollapse);
	}
});
var
	classBlock = 'toggle',
	activeClass = classBlock + '_opened',
	inactiveClass = classBlock + '_closed',
	$block = $('.' + classBlock),
	mobilePoint = 767;

/* Анимация гамбургера при клике */
$block.on('click', function() {
	var $this = $(this);

	if (!$this.hasClass(activeClass) && !$this.hasClass(inactiveClass)) {
		$this.addClass(activeClass);
	} else {
		$this.toggleClass(activeClass);
		$this.toggleClass(inactiveClass);
	}
});
/* ===== */

/* Возврат гамбургера в исходное состояние при ресайзе */
$(window).on('resize', function() {

	if (window.innerWidth > mobilePoint) {
		$block.removeClass(inactiveClass + ' ' + activeClass);
	}
});
/* ===== */

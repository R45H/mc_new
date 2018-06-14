var
	$body = $('body'),
	classAside = 'aside',
	$aside = $('.' + classAside),
	classAsideOpened = classAside + '_opened',
	classToggle = 'toggle',
	classToggleActive = classToggle + '_opened',
	classToggleInactive = classToggle + '_closed',
	$toggle = $('.' + classToggle),
	classFog = 'fog',
	delay = 300,
	mobilePoint = 767;

/* Скрытие / раскрытие бокового меню при клике на гамбургер */
$toggle.on('click', function() {

	if ($aside.hasClass(classAsideOpened)) {
		toggleAside('close');
	} else {
		toggleAside('open');
	}
});
/* ===== */

/* Действия при ресайзе */
$(window).on('resize', function() {
	if (!$aside.hasClass(classAsideOpened)) return;

	if (window.innerWidth > mobilePoint) {
		toggleAside('close');
	}
});
/* ===== */

/* Клик по затемнению */
$(document).on('click', '.' + classFog, function() {
	if (!$aside.hasClass(classAsideOpened)) return;
	toggleAside('close');
});
/* ===== */

// Закрытие бокового меню при нажатии ESC
var closeAsideOnEsc = function(event) {
	if (event.keyCode !== 27) return;
	toggleAside('close');
};
// =====

/* Показывает или скрывает боковое меню */
function toggleAside(action) {

	if (action === 'open') {
		$aside.addClass(classAsideOpened);
		$body.append('<div class="' + classFog + ' ' +classFog + '_z_less"></div>');
		$('.' + classFog).fadeIn(delay);
		$(document).on('keydown', closeAsideOnEsc);
		toggleBodyScroll();
	}

	if (action === 'close') {
		$(document).off('keydown', closeAsideOnEsc);
		$aside.removeClass(classAsideOpened);
		$('.' + classFog).fadeOut(delay);
		$toggle
			.removeClass(classToggleActive)
			.addClass(classToggleInactive);

		setTimeout(function() {
			$('.' + classFog).remove();
			toggleBodyScroll(false);
		}, delay / 2);
	}
}
/* ===== */
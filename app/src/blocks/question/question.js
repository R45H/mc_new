/**
 * События:
 * ready.custom.question - Клик по кнопке (передаётся балл за ответ)
 */

var
	classBlock = 'question',
	$block = $('.' + classBlock);

$block.each(function() {
	var
		$this = $(this),
		$radio = $this.find('.' + classBlock + '__radio'),
		$btn = $this.find('.' + classBlock + '__btn');

	if ($radio.find('.radio__input_checked').length) {
		$btn.removeClass('btn_disabled');
	}

	/* Включение кнопки при выборе варианта ответа */
	$radio.on('checked.custom.radio', function(event, $radio) {
		$btn.removeClass('btn_disabled');
	});
	/* ===== */

	/* Отключение кнопки при снятии флажка */
	$radio.on('unchecked.custom.radio', function(event, $radio) {
		$btn.addClass('btn_disabled');
	});
	/* ===== */

	/* Сработка события клика на кнопку */
	$btn.on('click', function() {
		if ($(this).hasClass('btn_disabled')) return;

		$this.trigger('ready.custom.question', [
			$radio.find('.radio__input_checked').attr('data-score'),
			$radio.find('.radio__input_checked').attr('data-result-link')
		]);
	});
	/* ===== */
});
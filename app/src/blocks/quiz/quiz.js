var
	classBlock = 'quiz',
	$block = $('.' + classBlock),
	$sectionStart = $block.find('.' + classBlock + '__section-start'),
	$sectionTest = $block.find('.' + classBlock + '__section-test'),
	$sectionWait = $block.find('.' + classBlock + '__section-wait'),
	$sectionEnd = $block.find('.' + classBlock + '__section-end'),
	$sectionBg = $block.find('.' + classBlock + '__section-bg'),
	$bgHelper = $block.find('.' + classBlock + '__bg-helper'),
	$startBtn = $block.find('.' + classBlock + '__start-btn'),
	$questions = $block.find('.' + classBlock + '__question'),
	$result = $block.find('.' + classBlock + '__result'),
	$num = $block.find('.' + classBlock + '__num'),
	$progressbar = $block.find('.' + classBlock + '__progressbar'),
	$endTriggerWrap = $block.find('.' + classBlock + '__end-trigger-wrap'),
	$endTrigger = $block.find('.' + classBlock + '__end-trigger'),
	numCount = $num.find('.num__item').length, // Количество пунктов нумерации
	questionsCount = $questions.length, // Количество вопросов
	scoreSum = 0, // Сумма всех баллов
	scoreAvg, // Средний показатель по набранным баллам
	delay = 1000;

/* Добавление недостающих пунктов нумерации */
while (numCount < questionsCount) {
	$num
		.find('.num__item')
		.last()
		.clone()
		.text(numCount + 1)
		.appendTo($num);
	numCount++;
}
/* ===== */

/* Удаление лишних пунктов нумерации */
while (numCount > questionsCount) {
	$num
		.find('.num__item')
		.last()
		.remove();
	numCount--;
}
/* ===== */

/* Нажатие на кнопку "Начать тест" */
$startBtn.one('click', function() {

	$sectionStart.fadeOut(delay, function() {
		$sectionTest.fadeIn(delay);
	});
});
/* ===== */

/* Нажатие на кнопку "Далее" в вопросах */
$questions.one('ready.custom.question', function(event, score) {
	var
		$this = $(this),
		$next = $this.next() && $this.next().hasClass(classBlock + '__question') ? $this.next() : null;

	scoreSum += +(score);

	if ($next) {
		var bgImg = $next.attr('data-img') || '';

		/* Плавная смена изображения в вопросах */
		if (bgImg && $sectionBg.length && $bgHelper.length) {
			$bgHelper.fadeIn(delay / 2, function() {
				$sectionBg.css('background-image', 'url(' + bgImg + ')');
				$bgHelper.fadeOut(delay / 2);
			});
		}
		/* ===== */

		/* Переключение на след. вопрос */
		$this.fadeOut(delay / 2, function() {
			$(this)
				.addClass(classBlock + '__question_hidden')
				.css('display', '');

			$next.fadeIn(delay / 2, function() {
				$(this).removeClass(classBlock + '__question_hidden');
			});
		});
		/* ===== */

		/* Переключение нумерации вопросов */
		$num
			.find('.num__item_active')
			.removeClass('num__item_active')
			.addClass('num__item_complete');

		setTimeout(function() {
			$num
				.find('.num__item_complete')
				.last()
				.next()
				.addClass('num__item_active');
		}, delay / 2);
		/* ===== */

	} else {
		scoreAvg = Math.round((scoreSum / questionsCount) * 100);

		$result.attr('data-result', scoreAvg + '%');

		$sectionTest.fadeOut(delay, function() {
			$(this).css('display', '');

			/* Появление секции с прогрессбаром */
			$sectionWait.fadeIn(delay, function() {
				setTimeout(function() {
					startProgressbar($progressbar);
				}, 5000);
			});
			/* ===== */
		});
	}
});
/* ===== */

/* Появление кнопки при завершении прогрессбара */
$progressbar.on('complete.progressbar', function() {
	$endTriggerWrap.slideDown(delay);
});
/* ===== */

/* Появление секции с результатами при клике на кнопку */
$endTrigger.one('click', function() {
	$sectionWait.fadeOut(delay, function() {
		$sectionEnd.fadeIn(delay);
	});
});
/* ===== */
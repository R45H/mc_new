var
	classBlock = 'quiz',
	$block = $('.' + classBlock),
	$sectionStart = $block.find('.' + classBlock + '__section-start'),
	$sectionTest = $block.find('.' + classBlock + '__section-test'),
	$sectionWait = $block.find('.' + classBlock + '__section-wait'),
	$sectionEnd = $block.find('.' + classBlock + '__section-end'),
	$footer = $('.footer'),
	$startBtn = $block.find('.' + classBlock + '__start-btn'),
	$questions = $block.find('.' + classBlock + '__question'),
	$percent = $block.find('.' + classBlock + '__percent'),
	$num = $block.find('.' + classBlock + '__num'),
	$progressbar = $block.find('.' + classBlock + '__progressbar'),
	$endTriggerWrap = $block.find('.' + classBlock + '__end-trigger-wrap'),
	$endTrigger = $block.find('.' + classBlock + '__end-trigger'),
	numCount = $num.find('.num__item').length, // Количество пунктов нумерации
	questionsCount = $questions.length, // Количество вопросов
	scoreSum = 0, // Сумма всех баллов
	scoreAvg, // Средний показатель по набранным баллам
	delay = 1000,
	problemsCount = 0; // Количество проблем, на которые попал пользователь

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

	$footer.fadeOut(delay);
});
/* ===== */

/* Нажатие на кнопку "Далее" в вопросах */
$questions.one('ready.custom.question', function(event, score, result) {
	var
		$this = $(this),
		$next = $this.next() && $this.next().hasClass(classBlock + '__question') ? $this.next() : null,
		resultNum;

	scoreSum += +(score);

	/* Отображение результата если попали на нужный ответ */
	if (result) {
		$('[data-result-target="' + result + '"]')
			.addClass(classBlock + '__result_visible')
			.find('.' + classBlock + '__problem-title')
			.text('Проблема ' + ++problemsCount + ':');
	}
	/* ===== */

	if ($next) {

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

		$percent.attr('data-percent', scoreAvg + '%');

		/* Установка класса секции с результатами */
		if (scoreAvg < 40) {
			resultNum = 1;
		}

		if (scoreAvg >= 40 && scoreAvg < 60) {
			resultNum = 2;
		}

		if (scoreAvg >= 60 && scoreAvg < 80) {
			resultNum = 3;
		}

		if (scoreAvg >= 80) {
			resultNum = 4;
		}

		$sectionEnd.addClass(classBlock + '__section-end_result_' + resultNum);
		/* ===== */

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
		$footer.fadeIn(delay);
	});
});
/* ===== */
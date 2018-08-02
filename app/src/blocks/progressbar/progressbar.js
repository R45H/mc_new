var
	classBlock = 'progressbar',
	$blocks = $('.' + classBlock);

$blocks.each(function() {
	var
		$this = $(this),
		$label = $this.find('.' + classBlock + '__label'),
		max = $this.attr('data-max');

	$this.progressbar({
		classes: {
			'ui-progressbar-value': classBlock + '__value',
			'ui-progressbar-overlay': classBlock + '__overlay',
			'ui-progressbar-indeterminate': classBlock + '_infinite'
		},
		value: false,
		max: max,
		change: function() {
			var
				val = $this.progressbar('value'),
				result = Math.round(100 / (max / val));
			$label.text(result + '%');
		}
	});

	$this.on('complete.progressbar', function() {
		$label.text('Результаты загружены!');
		$this.addClass(classBlock + '_complete');
	});
});
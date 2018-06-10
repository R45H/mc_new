var
	classBlock = 'input',
	classActive = classBlock + '_focus',
	$block = $('.' + classBlock);

$block.each(function() {
	var
		$this = $(this),
		$item = $this.find('.' + classBlock + '__item');

	if ($item.val()) {
		$this.addClass(classActive);
	}

	$item.on('focusin', function() {
		$this.addClass(classActive);
	});

	$item.on('focusout', function() {

		setTimeout(function () {
			if (!$item.val()) {
				$this.removeClass(classActive);
			}
		}, 0);
	});
});
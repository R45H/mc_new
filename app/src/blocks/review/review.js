var
	classBlock = 'review',
	classDots = classBlock + '__dots',
	classDot = classBlock + '__dot',
	classArrow = classBlock + '__arrow',
	classPrevArrow = classArrow + '_prev',
	classNextArrow = classArrow + '_next',
	$block = $('.' + classBlock);

$block.each(function() {
	var
		$this = $(this),
		$slider = $this.find('.' + classBlock + '__wrap'),
		$items = $slider.children();

	if ($items.length <= 1) return;

	$slider.slick({
		dots: true,
		dotsClass: classDots,
		appendDots: $this.find('.' + classBlock + '__dots-wrap'),
		customPaging: function() {
			return '<div class="' + classDot + '"></div>'
		},
		prevArrow: '<div class="' + classArrow + ' ' + classPrevArrow + '"></div>',
		nextArrow: '<div class="' + classArrow + ' ' + classNextArrow + '"></div>',
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnDotsHover: true,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					arrows: false
				}
			}
		]
	});
});
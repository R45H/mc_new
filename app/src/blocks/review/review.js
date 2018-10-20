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
		$items = $slider.children(),
		options = {
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
			autoplaySpeed: 20000,
			pauseOnDotsHover: true,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						arrows: false
					}
				}
			]
		};

	if ($items.length <= 1) return;

	if ($slider.is(':visible')) {
		$slider.slick(options);
	} else {
		$slider.on('visibility.review', function() {
			$slider.slick(options);
		});
	}

	if ($slider.is(':visible')) {

		if (!isSliderOnScreen($slider)) {
			$slider.slick('slickPause');
		}
	}

	$(window).on('scroll resize', function() {

		if ($slider.is(':visible')) {

			if (isSliderOnScreen($slider)) {
				$slider.slick('slickPlay');
			} else {
				$slider.slick('slickPause');
			}
		}
	});
});

function isSliderOnScreen($slider) {
	return $(document).scrollTop() + $(window).height() > $slider.offset().top && $(document).scrollTop() - $slider.offset().top < $slider.height();
}
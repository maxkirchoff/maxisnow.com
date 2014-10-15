var app = (function(document, $) {

	'use strict';
	var docElem = document.documentElement,

		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_headerBackgroundChange = function() {
			var $home_header = $('body#home').find('> header');
			window.setTimeout(function() {
				$home_header.find('#max-bw').fadeIn('slow', function() {
					
				});
				$home_header.find('#overlay').fadeTo('slow', 0.4);
			}, 1000);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
			_headerBackgroundChange();
		};

	return {
		init: _init
	};

})(document, jQuery);

(function() {

	'use strict';
	app.init();

	var $m = $("#m"),
		$k = $("#k"),
		$mParent = $m.parent(),
		$kParent = $k.parent();

	$(window).scroll(function() {
		var windowTop = $(document).scrollTop();

		if ($m.offset().top <= windowTop) {
			$m.css({'position':'fixed', 'top':0})
		}
		if ($k.offset().top <= windowTop) {
			$k.css({'position':'fixed', 'top':0})
		}
		if ($mParent.offset().top > windowTop) {
			$m.css({'position':'static', 'top':'auto'})
		}
		if ($kParent.offset().top > windowTop) {
			$k.css({'position':'static', 'top':'auto'})
		}
		var $homeHeader = $('body#home').find('> header'),
			headerBottom = $homeHeader.offset().top + $homeHeader.height(),
			mBottom = $m.offset().top + $m.height(),
			kBottom = $k.offset().top + $k.height();
			console.log('m bottom: ' + mBottom);
			console.log('header bottom: ' +headerBottom);
		if (mBottom >= headerBottom) {
			$m.css('color', '#b2232d');
		} else {
			$m.css('color', 'white');
		}
		if (kBottom >= headerBottom) {
			$k.css('color', '#b2232d');
		} else {
			$k.css('color', 'white');
		}
	});

})();
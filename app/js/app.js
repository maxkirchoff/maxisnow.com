var Util = {
	smartResize: function(func) {
		'use strict';
		var timeout = false;
		$(window).resize(function(){
			if(timeout !== false) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(func, 500);
		});
	}
};

var app = (function(document, $) {
	'use strict';
	var docElem = document.documentElement,

		_$logo = $('#logo'),
		_$mLogo = _$logo.find('.m'),
		_$kLogo = _$logo.find('.k'),
		_$headerTitle = $('body#home').find('> header').find('h1'),
		_$mTitle = _$headerTitle.find('.m'),
		_$kTitle = _$headerTitle.find('.k'),
		_$topBar = $('#top-bar'),
		_$navigation = $('#navigation'),
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_isMobile = false,
		_headerBackgroundChange = function() {
			var $home_header = $('body#home').find('> header');
			window.setTimeout(function() {
				$home_header.find('#max-bg').addClass('bw');
				$home_header.find('#overlay').fadeTo('slow', 0.4);
			}, 1000);
		},
		_setupDowner = function() {
			var $downer = $('#downer');
			$downer.on('click', function(e) {
				e.preventDefault();
				$('html, body').animate({scrollTop: $('#summary').offset().top - 50}, 3000);
			});

			$(window).scroll(function() {
				if ($(window).scrollTop() > 100) {
					$downer.fadeOut(500);
				} else {
					$downer.fadeIn(500);
				}
			});
		},
		_setupLogoPos = function() {
			var _$mTitleContainer = _$headerTitle.find('span:first-of-type'),
				_$kTitleContainer = _$headerTitle.find('span:nth-of-type(2)');
			_$mLogo.css({'left':_$mTitle.offset().left+'px', 'margin-top':_$mTitleContainer.offset().top+'px'});
			_$kLogo.css({'left':_$kTitle.offset().left+'px', 'margin-top':_$kTitleContainer.offset().top+'px'});
			Util.smartResize(function() {
				_$mLogo.css({'left':_$mTitle.offset().left+'px', 'margin-top':_$mTitleContainer.offset().top+'px'});
				_$kLogo.css({'left':_$kTitle.offset().left+'px', 'margin-top':_$kTitleContainer.offset().top+'px'});
			});
		},
		_logoAnimationSetup = function() {
			$(window).scroll(function() {
				var windowTop = $(document).scrollTop();
				if (_$mLogo.offset().top <= windowTop) {
					_$mLogo.addClass('fixed');
				}
				if (_$kLogo.offset().top <= windowTop) {
					_$kLogo.addClass('fixed');
				}
				if (_$mTitle.offset().top > windowTop) {
					_$mLogo.removeClass('fixed');
				}
				if (_$kTitle.offset().top > windowTop) {
					_$kLogo.removeClass('fixed');
				}
				var $homeHeader = $('body#home').find('> header'),
					headerBottom = $homeHeader.offset().top + $homeHeader.height(),
					outOfHeader = (($(window).scrollTop() + _$mLogo.height()) > headerBottom);
				if (outOfHeader) {
					_$logo.addClass('orange').promise().done(function() {
						_$logo.children().addClass('flip');
						_$topBar.fadeIn(500, function() {
							_$navigation.fadeIn(750);
						});
					});
				} else {
					_$logo.removeClass('orange').promise().done(function() {
						_$logo.children().removeClass('flip');
						_$navigation.hide();
						_$topBar.fadeOut(500);
					});
				}
			});
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
			_headerBackgroundChange();

			_isMobile = window.innerWidth < 1024;
			if (!_isMobile) {
				_setupDowner();
				_setupLogoPos();
				_logoAnimationSetup();
			} else {
				Util.smartResize(function() {
					app.init();
				});
			}
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	'use strict';
	app.init();
})();
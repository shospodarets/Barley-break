/* init page */
$(window).load(function(){
	$('.avatars-wrapper').each(function(){
		$(this).BarleyBreak({
			_holder:'#avatars-holder',
			_elements:'>div',
			_innerElement:'>img',
			_disableSelection:true,
			speed:300,
			initPageAutoMoveFlag:true,
			autoMoveTimeOut:10,
			moveBySwipe:true,
			swipeDirection:'both',
			overlap:true
		});
		setBtnMoveEvents(this);
		setAnimSpeed(this);
		setAutoMoveTimeOutSpeed(this);
		setAutoMoveBySwipe(this);
		setMoveDirection(this);
		setMoveOverlap(this);
		setStopAnimateAndGoToPosition(this);
	});
});

/* set autoMove trigger-buttons */
function setBtnMoveEvents(_wrapper){
	// set vars and first value
	var _form = $('.form-set-automove-flag');
	var _inputTrue = _form.find('.true').removeAttr('checked');
	var _inputFalse = _form.find('.false').removeAttr('checked');
	if(_wrapper.options.initPageAutoMoveFlag) _inputTrue.attr('checked','checked');
	else _inputFalse.attr('checked','checked');
	_form.submit(function(){// on submit
		if(_inputTrue.attr('checked')) $(_wrapper).trigger('startAutoMove');
		else $(_wrapper).trigger('stopAutoMove');
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set animation speed */
function setAnimSpeed(_wrapper){
	// set vars and first value
	var _form = $('.form-set-speed');
	var _inputText = _form.find('#input-set-speed').val(_wrapper.options.speed);
	var _regNum = /^[0-9]+$/;
	_form.submit(function(){// on submit
		var _inputValue = parseInt(_inputText.val());
		if(_inputValue && _regNum.test(_inputText.val()) && _inputValue>0){// if value is number
			_wrapper.options.speed = _inputValue;
		}else{// if value is NaN
			_inputText.val(_wrapper.options.speed);
		}
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set autoMoveTimeOut speed */
function setAutoMoveTimeOutSpeed(_wrapper){
	// set vars and first value
	var _form = $('.form-set-automovetimeout');
	var _inputText = _form.find('#input-set-automovetimeout').val(_wrapper.options.autoMoveTimeOut);
	var _regNum = /^[0-9]+$/;
	_form.submit(function(){// on submit
		var _inputValue = parseInt(_inputText.val());
		if(_inputValue && _regNum.test(_inputText.val()) && _inputValue>0){// if value is number
			_wrapper.options.autoMoveTimeOut = _inputValue;
		}else{// if value is NaN
			_inputText.val(_wrapper.options.autoMoveTimeOut);
		}
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set setAutoMoveBySwipe flag */
function setAutoMoveBySwipe(_wrapper){
	// set vars and first value
	var _form = $('.form-set-move-by-swipe');
	var _inputTrue = _form.find('.true').removeAttr('checked');
	var _inputFalse = _form.find('.false').removeAttr('checked');
	if(_wrapper.options.moveBySwipe) _inputTrue.attr('checked','checked');
	else _inputFalse.attr('checked','checked');
	_form.submit(function(){// on submit
		if(_inputTrue.attr('checked')) _wrapper.options.moveBySwipe = true;
		else _wrapper.options.moveBySwipe = false;
		$(_wrapper).trigger('setMoveBySwipeAndDirection');
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set setMoveDirection */
function setMoveDirection(_wrapper){
	// set vars and first value
	var _form = $('.form-set-move-direction');
	_form.find('input[value='+_wrapper.options.swipeDirection+']').attr('checked','checked');
	_form.submit(function(){// on submit
		var _chClass = _form.find(':checked').attr('value');
		_wrapper.options.swipeDirection = _chClass;
		$(_wrapper).trigger('setMoveBySwipeAndDirection');
		$(_wrapper).trigger('setSwipeDirectionEventList');
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set setMoveOverlap */
function setMoveOverlap(_wrapper){
	// set vars and first value
	var _form = $('.form-set-overlap');
	var _inputTrue = _form.find('.true').removeAttr('checked');
	var _inputFalse = _form.find('.false').removeAttr('checked');
	if(_wrapper.options.overlap) _inputTrue.attr('checked','checked');
	else _inputFalse.attr('checked','checked');
	_form.submit(function(){// on submit
		if(_inputTrue.attr('checked')) _wrapper.options.overlap = true;
		else _wrapper.options.overlap = false;
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* set stopAnimateAndGoToPosition */
function setStopAnimateAndGoToPosition(_wrapper){
	// set vars and first value
	var _form = $('.form-finish-current-animations');
	_form.submit(function(){// on submit
		$(_wrapper).trigger('finishCurrentAnimations');
		return false;;
	})
	.find('*').keypress(function(e){var code = (e.keyCode ? e.keyCode : e.which);if(code == 13) _form.submit();})//Enter keypress;
	.filter('.submit-btn').click(function(){_form.submit();return false;}); // submit link press
}

/* BarleyBreak */
(function($){
	$.fn.BarleyBreak = function(options){
		// default options
		$.extend({
			_holder:'.holder',
			_elements:'>div',
			_innerElement:'img',
			_disableSelection:true,
			speed:300,
			initPageAutoMoveFlag:false,
			autoMoveTimeOut:60,
			moveBySwipe:true,
			swipeDirection:'both',
			overlap:true
		},options);
		return this.each(function(){
			// SET VARS
			var _self = $(this);
			this.options = {};// init options contaner in DOM
			var _options = this.options;
			_options.speed=options.speed;
			_options.initPageAutoMoveFlag=options.initPageAutoMoveFlag;
			_options.autoMoveTimeOut=options.autoMoveTimeOut;
			_options.moveBySwipe=options.moveBySwipe;
			_options.swipeDirection=options.swipeDirection;
			_options.overlap=options.overlap;
			var _holder = _self.find(options._holder).css({
				'width':$(this).width(),
				'height':$(this).height(),
				'position':'relative'
			});
			var _elements = _holder.find(options._elements);
			var _elsInLine = parseInt(parseInt(_holder.width())/parseInt(_elements.eq(0).outerWidth(true)));
			var _elementsLength = _elements.length-1;// all calculations are made from zero
			/* SWIPING FUNCTION */
			var swiping = function(_opt){
				var selfEl = _opt._element;
				var _otherEl = _opt._otherEl;
				var _swipeCondition = _otherEl.length;// if other element exist
				if(!_options.overlap){// if other element exist and is empty
					_swipeCondition = (_otherEl.length && _otherEl.data('BarleyBreakStatic').emptyFlag);
				}
				if(_opt._positionCondition && _swipeCondition){// if not POSITIONmost
					// reset data 
					var tempDataEl = selfEl.clone(true).hide();
					var tempDataOtherEl = _otherEl.clone(true).hide();;
					selfEl
						.data('BarleyBreakDynamic',tempDataOtherEl.data('BarleyBreakDynamic'));
					_otherEl
						.data('BarleyBreakDynamic',tempDataEl.data('BarleyBreakDynamic'));
					tempDataEl.remove();
					tempDataOtherEl.remove();
					// animation depending on the direction
					if(_opt._direction=='vertical'){
						var _elAnimValue =_otherEl.data('BarleyBreakDynamic').positionTop;
						var _otherElAnimValue = selfEl.data('BarleyBreakDynamic').positionTop;
						selfEl.animate({
							top:_otherElAnimValue
						},{queue:false,duration:_options.speed});
						_otherEl.animate({
							top:_elAnimValue
						},{queue:false,duration:_options.speed});
					}else{
						var _elAnimValue = _otherEl.data('BarleyBreakDynamic').positionLeft;
						var _otherElAnimValue = selfEl.data('BarleyBreakDynamic').positionLeft;
						selfEl.animate({
							left:_otherElAnimValue
						},{queue:false,duration:_options.speed});
						_otherEl.animate({
							left:_elAnimValue
						},{queue:false,duration:_options.speed});
					}
				}
			}
			/* POSITION CALCULATE AND SET DATA */
			_elements.each(function(i){
				var el = $(this);
				var lineNumberFromTop = parseInt(i/_elsInLine);
				var lineNumberFromBottom = parseInt((_elementsLength-i)/_elsInLine);
				var elInLineFromLeft = i-_elsInLine*lineNumberFromTop;
				var elInLineFromRight = _elsInLine-elInLineFromLeft-1;
				el.data({
					'BarleyBreakDynamic':{
						'positionTop':parseInt(el.position().top),
						'positionLeft':parseInt(el.position().left),
						'lineNumberFromTop':lineNumberFromTop,
						'elInLineFromRight':elInLineFromRight,
						'lineNumberFromBottom':lineNumberFromBottom,
						'elInLineFromLeft':elInLineFromLeft,
						'itemIndex':i
					},
					'BarleyBreakStatic':{
						'emptyFlag':(!!!el.find(options._innerElement).length)
					}
				})
			});
			/* INIT DISABLE SELECTION */
			(function(){
				if(options._disableSelection){
					_elements.each(function(){
						var el = $(this)
						.append($('<div class="selection" />'));// append box for disable selection in IE
					});
					if(typeof($.fn.disableSelection)=='undefined'){
						jQuery.fn.extend({ 
							disableSelection : function() { 
								this.each(function() { 
									this.onselectstart = function() { return false; }; 
									this.unselectable = "on"; 
									jQuery(this).css('-moz-user-select', 'none'); 
								}); 
							}
						});
					}
					if(typeof($.fn.enableSelection)=='undefined'){
						jQuery.fn.extend({ 
							enableSelection : function() { 
								this.each(function() { 
									this.onselectstart = function() {}; 
									this.unselectable = "off"; 
									jQuery(this).css('-moz-user-select', 'auto'); 
								}); 
							}
						});
					}
					_self.find('*').disableSelection();
				}
			})();
			/* SET STYLES AND TOP/LEFT DATA */
			_elements.each(function(i){
				var el = $(this).css({
					'width':$(this).width(),
					'height':$(this).height(),
					'position':'absolute',
					'top':$(this).data('BarleyBreakDynamic').positionTop,
					'left':$(this).data('BarleyBreakDynamic').positionLeft
				});
			});
			// FILTER NON EMPTY ELEMENTS
			var _moveElements = _elements.filter(function(){
				return (!$(this).data('BarleyBreakStatic').emptyFlag);
			});
			/* SET EVENTS */
			_moveElements.each(function(){
				var el = $(this);
				el.bind('fakeSwipeLeft',function(){/* SWIPE LEFT */
					var positionConditionFlag = el.data('BarleyBreakDynamic').elInLineFromLeft>0;
					var _animateEmptyEl = _elements.filter(function(){
						return ($(this).data('BarleyBreakDynamic').itemIndex == (parseInt(el.data('BarleyBreakDynamic').itemIndex)-1))
					});
					swiping({
						_element:el,
						_positionCondition:positionConditionFlag,
						_otherEl:_animateEmptyEl,
						_direction: 'horizontal'
					});
					return false;
				}).bind('fakeSwipeRight',function(){/* SWIPE RIGHT */
					var positionConditionFlag = el.data('BarleyBreakDynamic').elInLineFromRight>0;
					var _animateEmptyEl = _elements.filter(function(){
						return ($(this).data('BarleyBreakDynamic').itemIndex == (parseInt(el.data('BarleyBreakDynamic').itemIndex)+1))
					});
					swiping({
						_element:el,
						_positionCondition:positionConditionFlag,
						_otherEl:_animateEmptyEl,
						_direction: 'horizontal'
					});
					return false;
				}).bind('fakeSwipeTop',function(){/* SWIPE TOP */
					var positionConditionFlag = el.data('BarleyBreakDynamic').lineNumberFromTop>0;
					var _animateEmptyEl = _elements.filter(function(){
						return ($(this).data('BarleyBreakDynamic').itemIndex == (parseInt(el.data('BarleyBreakDynamic').itemIndex)-_elsInLine))
					});
					swiping({
						_element:el,
						_positionCondition:positionConditionFlag,
						_otherEl:_animateEmptyEl,
						_direction: 'vertical'
					});
					return false;
				}).bind('fakeSwipeBottom',function(){/* SWIPE BOTTOM */
					var positionConditionFlag = el.data('BarleyBreakDynamic').lineNumberFromBottom>0;
					var _animateEmptyEl = _elements.filter(function(){
						return ($(this).data('BarleyBreakDynamic').itemIndex == (parseInt(el.data('BarleyBreakDynamic').itemIndex)+_elsInLine))
					});
					swiping({
						_element:el,
						_positionCondition:positionConditionFlag,
						_otherEl:_animateEmptyEl,
						_direction: 'vertical'
					});
					return false;
				});
			});
			/* INIT MOVE BY SWIPE AND SWIPE DIRECTION */
			(function(){
				_self.bind('setMoveBySwipeAndDirection',function(){
					_moveElements.each(function(){// back to default state
						var el = $(this)
						.unbind('swipeleft swiperight swipetop swipebottom') // unbind events
						.removeClass('move-elements-horizontal move-elements-vertical move-elements-both'); // remove classes
					});
					if (_options.moveBySwipe){
						// set events
						if (_options.swipeDirection != 'vertical') {
							_moveElements.each(function(){
								var el = $(this)
								el.bind('swipeleft', function(){
									el.trigger('fakeSwipeLeft');
									return false;
								}).bind('swiperight', function(){
									el.trigger('fakeSwipeRight');
									return false;
								});
							});
						}
						if (_options.swipeDirection != 'horizontal') {
							_moveElements.each(function(){
								var el = $(this);
								el.bind('swipetop', function(){
									el.trigger('fakeSwipeTop');
									return false;
								}).bind('swipebottom', function(){
									el.trigger('fakeSwipeBottom');
									return false;
								});
							});
						}
						// set classes
						if (_options.swipeDirection == 'horizontal') {
							_moveElements.addClass('move-elements-horizontal');
						}
						else 
							if (_options.swipeDirection == 'vertical') {
								_moveElements.addClass('move-elements-vertical');
							}
							else {
								_moveElements.addClass('move-elements-both');
							}
					}
				});
				_self.trigger('setMoveBySwipeAndDirection');
			})();
			/* SET MOUSESWIPE EVENTS */
			(function(){
				if((typeof(Modernizr)!='undefined' && !Modernizr.touch) || typeof(Modernizr)=='undefined'){// if not mobile browser
					var _x = 0;
					var _y = 0;
					var _tapFlag = false;
					var _xInEl = 0;
					var _yInEl = 0;
					var _startTime = new Date().getTime();
					var _endTime = new Date().getTime();
					var _clickElement = $([]);
					$(document).mouseup(function(e){
						if(_tapFlag){// if first click was made in el
							_x = e.pageX;
							_y = e.pageY;
							_endTime = new Date().getTime();
							if((_endTime-_startTime)<1000){// if mouseclick interval < 1s
								var _startCoord = [_xInEl,_yInEl];
								var _stopCoord = [_x,_y];
								/* horizontal */
								if(Math.abs( _startCoord[0] - _stopCoord[0]) > 10 && Math.abs( _startCoord[1] - _stopCoord[1]) < 20){
									_clickElement
									.trigger( "swipe" )
									.trigger( _startCoord[0] > _stopCoord[0] ? "swipeleft" : "swiperight" );
								}
								/* vertical */
								if(Math.abs( _startCoord[1] - _stopCoord[1]) > 10 && Math.abs( _startCoord[0] - _stopCoord[0]) < 20){
									_clickElement
									.trigger( "swipe" )
									.trigger( _startCoord[1] > _stopCoord[1] ? "swipetop" : "swipebottom" );
								}
							}
						}
						_tapFlag=false;
					});
					_elements.each(function(i){
						var _el = $(this);
						_el.mousedown(function(e){
							_tapFlag=true;
							_xInEl=e.pageX;
							_yInEl=e.pageY;
							_startTime = new Date().getTime();
							_clickElement = _el;
						});
					});
				}
			}());
			/* SET AUTOMOVE */
			(function(){
				// init move direction
				_self.bind('setSwipeDirectionEventList',function(){
					_options.swipeDirectionEventList = [];
					if(_options.swipeDirection!='horizontal'){
						_options.swipeDirectionEventList.push('fakeSwipeTop','fakeSwipeBottom');
					}
					if(_options.swipeDirection!='vertical'){
						_options.swipeDirectionEventList.push('fakeSwipeLeft','fakeSwipeRight');
					}
				});
				_self.trigger('setSwipeDirectionEventList');
				// set move function
				var _lastAutoMoveRunTime = new Date().getTime();
				var _autoMoveTimer = 0;
				var autoMoveFunction = function(){
					clearTimeout(_autoMoveTimer);// clearTimeout for restart function
					var _randomElement = _moveElements.eq(Math.floor(Math.random()*_moveElements.length));
					var _randomEvent = _options.swipeDirectionEventList[Math.floor(Math.random()*_options.swipeDirectionEventList.length)];
					if(!_randomElement.is(':animated')){// if element animated already - restart function
						_randomElement.trigger(_randomEvent);
					}
					restartAutoMoveFunction();
				}
				var restartAutoMoveFunction = function(){// restart autoMoveFunction function
					_autoMoveTimer = setTimeout(function(){
						autoMoveFunction();
					}, (_options.autoMoveTimeOut));
				}
				if(_options.initPageAutoMoveFlag) autoMoveFunction();// trigger by init
				// bind custom events
				_self.bind('startAutoMove',function(){
					clearTimeout(_autoMoveTimer);// clearTimeout for restart function
					restartAutoMoveFunction();
				}).bind('stopAutoMove',function(){
					clearTimeout(_autoMoveTimer);// clearTimeout for restart function
				});
			}());
			/* STOP ALL ANIMATION AND GO TO POSITION */
			_self.bind('finishCurrentAnimations',function(){
				_elements.each(function(){
					var el = $(this).stop().css({
						'top':$(this).data('BarleyBreakDynamic').positionTop,
						'left':$(this).data('BarleyBreakDynamic').positionLeft
					});
				});
			});
		});
	}
}(jQuery));
$(function(){
	(function($){
	
		/*
			local default settings variable which will hold default values for all the options exposed by the plugin.
		*/	
		var defalutSettings = {
			'background' : 'black',
			'border-radius' : '5px',
			'holderBackground' : '#c3c3c3',
			'holderborder-Radius' : '5px',
			'Width' : '10px',
			'holderWidth' : '10px'
		};
		
		var map = {
			'background' : 'background',
			'border-radius' : 'border-radius',
			'holderBackground' : 'background',
			'holderborder-Radius' : 'border-radius',
			'Width' : 'width',
			'holderWidth' : 'width'
		};
		
		var CustomScrollBar = {
			
			init : function( options , element ){
				var self = this;
				self.elem = element;
				if( !( options.contentContainer ) ){
					return;
				}
				self.options = $.extend({},defalutSettings,options);
				self.calculateScrollbarHeight();
				self.calculateDrag();
				self.handleMouseWheel();
			},
			
			getStyleObjectArray : function(){                      
				var self = this,
				holderStyle={},
				scrollbarStyle = {};
				
				$.each(self.options,function( index , value ){
					
					if(index.match(/holder/) != null){
						holderStyle[map[index]] = value;
					}else if(index.match(/contentContainer/)){
						
					}else{
						scrollbarStyle[map[index]] = value;
					}
				});
				self['styleObjects'] = {
					'holderStyleObject' : holderStyle,
					'scrollBarStyleObject' : scrollbarStyle
				};
			},
			
			calculateScrollbarHeight : function(){
				var self = this,
				scrollHolder = self.scrollHolder =  $('<div class="customscrollbar-scrollbar-holder"></div>'),
				scrollBar = self.scrollBar = $('<div class="customscrollbar-scrollbar"></div>'),
				content = self.content = self.options.contentContainer,
				customScrollabeContainerHeight = self.elem.height(),
				contentHeight = parseInt(content.height()) ,
				scrollbarHeight = (customScrollabeContainerHeight / contentHeight) * customScrollabeContainerHeight;
				
				self.elem.css({'overflow':'hidden','position':'relative'});
				content.css({'width':'90%','position':'relative'});
				scrollHolder
				.css('height',customScrollabeContainerHeight)
				.append(scrollBar.css('height',scrollbarHeight))
				.prependTo(self.elem);
				
				self.getStyleObjectArray();
				scrollHolder.css(self['styleObjects']['holderStyleObject']);
				scrollBar.css(self['styleObjects']['scrollBarStyleObject']);
				if(contentHeight < customScrollabeContainerHeight){
					domCache.scrollHolder.css('display','none');
				}
			},
			
			calculateDrag : function(){
				var self = this;
				
				self.scrollBar.draggable({
					containment : 'parent',
					axis : 'y',
					drag : function( event , ui ){
						
						var newTop = (parseInt(self.scrollBar.css('top'))/self.scrollHolder.height()) * self.content.height();
						self.content.css('top','-' +newTop+'px');
						
					}
				});
			},
			
			 handleMouseWheel : function(){
				 var self = this,thrashHoldFlag = false;
				 self.content.on( 'mousewheel' , function( event ){
						var delta = event.originalEvent.deltaY,
						relativeToContent = ( delta / self.content.height() ) * self.scrollHolder.height()
						thrashHold = self.content.height() - self.elem.height(),
						scrollBarThrashHoldTop = self.scrollHolder.height() - self.scrollBar.height(),
						newContentHeight = Math.abs(parseInt( self.content.css('top') )) + delta;
						
						self.content.css( 'top' , '-' + newContentHeight + 'px');
						self.scrollBar.css( 'top' ,(parseInt( self.scrollBar.css('top') ) + relativeToContent) + 'px');	
						
						if(newContentHeight < 0){
							self.content.css( 'top' , '0px' );
							self.scrollBar.css( 'top' , '0px' );
						}
						if(parseInt(self.content.css('top')) <  (-thrashHold)){
							self.content.css( 'top' , (-thrashHold) + 'px');
							self.scrollBar.css( 'top' ,scrollBarThrashHoldTop + 'px');
						}
						
				 });
			 }
		};
		
		$.fn.applyCustomScrollbar = function( options ){
			
			// var settings = $.extend({
					// 'background' : 'black',
					// 'border-radius' : '5px',
					// 'holderBackground' : '#c3c3c3',
					// 'holderborder-Radius' : '5px',
					// 'Width' : '10px',
					// 'holderWidth' : '10px'
				// }, options ),
				
				// domCache = {
					// scrollHolder : $('<div class="customscrollbar-scrollbar-holder"></div>'),
					// scrollBar : $('<div class="customscrollbar-scrollbar"></div>'),
					// content : this.find('.customscrollbar-scrollable-content')
				// },
				// init = function(){
					// calculateScrollbarHeight.call(this);
					// calculateDrag();
				// },
				
				// getStyleObjectArray = function(){                      
					// var holderStyle='{',
					// scrollbarStyle = '{';
					// $.each(settings,function(index,value){
						// if(index.match(/holder/) != null){
							// holderStyle += '"'+index.replace(/holder/,'').toLowerCase()+'"' + ':"' + value+'",';
						// }else{
							// scrollbarStyle += '"'+index.toLowerCase()+'"' + ':"' + value+'",';
						// }
					// });
					// holderStyle = holderStyle.substr(0,holderStyle.length-1) + ',"z-index":"5","min-width":"10px"}';
					// scrollbarStyle = scrollbarStyle.substr(0,scrollbarStyle.length-1) + '}';
					// return [JSON.parse(holderStyle),JSON.parse(scrollbarStyle)];
				// },
				// calculateScrollbarHeight = function(){
					// var customScrollabeContainerHeight = $(this).height(),
					// contentHeight = parseInt($(this).find(domCache.content).height()) ,
					// scrollbarHeight = (customScrollabeContainerHeight / contentHeight) * customScrollabeContainerHeight;
					// domCache.scrollHolder
					// .css('height',customScrollabeContainerHeight)
					// .append(domCache.scrollBar.css('height',scrollbarHeight))
					// .prependTo(this);
					// styleArray = getStyleObjectArray();
					// domCache.scrollHolder.css(styleArray[0]);
					// domCache.scrollBar.css(styleArray[1]);
					// if(contentHeight < customScrollabeContainerHeight){
						// domCache.scrollHolder.css('display','none');
					// }
				// },
				// calculateDrag = function(){
					// domCache.scrollBar.draggable({
						// containment : 'parent',
						// axis : 'y',
						// drag : function(event,ui){
							// var newTop = (parseInt(domCache.scrollBar.css('top'))/domCache.scrollHolder.height()) * domCache.content.height();
							// domCache.content.css('top','-' +newTop+'px');
						// }
					// });
				// };
			
			this.each(function(){
				
				var customScrollBar = Object.create( CustomScrollBar );
				customScrollBar.init( options , $(this) );
				
			});
			
			return this;
		};
	})(jQuery);
	$('.custom-scrollable-container').applyCustomScrollbar({
		'background' : 'rgba(32,80,129,.5)',
		'border-radius' : '0',
		'holderborder-Radius' : '0',
		'contentContainer' : $('.custom-scrollable-container').find('.customscrollbar-scrollable-content')
	});
	$('#loremipsum').applyCustomScrollbar({
		'background' : 'rgba(32,80,129,.5)',
		'border-radius' : '0',
		'holderborder-Radius' : '0',
		'contentContainer' : $('#loremipsum').find('.content')
	});
});


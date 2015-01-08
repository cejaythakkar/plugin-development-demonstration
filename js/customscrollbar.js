$(function(){
	(function($){
		$.fn.applyCustomScrollbar = function(obj){
			
			var settings = $.extend({
					'background' : 'black',
					'border-radius' : '5px',
					'holderBackground' : '#c3c3c3',
					'holderborder-Radius' : '5px',
					'Width' : '10px',
					'holderWidth' : '10px'
				},obj),
				domCache = {
					scrollHolder : $('<div class="scroll-holder"></div>'),
					scrollBar : $('<div class="scrollbar"></div>'),
					content : this.find('.content')
				},
				init = function(){
					calculateScrollbarHeight.call(this);
					calculateDrag();
				},
				getStyleObjectArray = function(){
					var holderStyle='{',
					scrollbarStyle = '{';
					$.each(settings,function(index,value){
						if(index.match(/holder/) != null){
							holderStyle += '"'+index.replace(/holder/,'').toLowerCase()+'"' + ':"' + value+'",';
						}else{
							scrollbarStyle += '"'+index.toLowerCase()+'"' + ':"' + value+'",';
						}
					});
					holderStyle = holderStyle.substr(0,holderStyle.length-1) + '}';
					scrollbarStyle = scrollbarStyle.substr(0,scrollbarStyle.length-1) + '}';
					return [JSON.parse(holderStyle),JSON.parse(scrollbarStyle)];
				},
				calculateScrollbarHeight = function(){
					var customScrollabeContainerHeight = $(this).height(),
					contentHeight = parseInt($('.content').height());
					scrollbarHeight = (customScrollabeContainerHeight / contentHeight) * customScrollabeContainerHeight;
					domCache.scrollHolder
					.css('height',customScrollabeContainerHeight)
					.append(domCache.scrollBar.css('height',scrollbarHeight))
					.prependTo(this);
					styleArray = getStyleObjectArray();
					domCache.scrollHolder.css(styleArray[0]);
					domCache.scrollBar.css(styleArray[1]);
					if(contentHeight < customScrollabeContainerHeight){
						domCache.scrollHolder.css('display','none');
					}
				},
				calculateDrag = function(){
					domCache.scrollBar.draggable({
						containment : 'parent',
						axis : 'y',
						drag : function(event,ui){
							var newTop = (parseInt(domCache.scrollBar.css('top'))/domCache.scrollHolder.height()) * domCache.content.height();
							domCache.content.css('top','-' +newTop+'px');
						}
					});
				};
			
			this.each(function(){
				init.call(this);
			});
			return this;
		};
		
		$('.custom-scrollable-container').applyCustomScrollbar();
	})(jQuery);
	
	// var customScrollabeContainerHeight = $('.custom-scrollable-container').height(),
		// scrollHolderHeight = parseInt($('.scroll-holder').css('height',customScrollabeContainerHeight).height()),
		// contentHeight = parseInt($('.content').height()),
		// scrollbarHeight = (scrollHolderHeight / contentHeight) * scrollHolderHeight,newTop=0;
		
		// $('.scrollbar')
		// .css('height',scrollbarHeight)
		// .draggable({
			// containment : 'parent',
			// axis : 'y',
			// drag : function(event , ui){
				// newTop = (parseInt($(this).css('top')) / scrollHolderHeight) * contentHeight;
				// $('.content').css('top','-'+newTop+'px');
			// }
		// });
		
		
		
	
});
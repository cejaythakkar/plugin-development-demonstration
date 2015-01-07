$(function(){
	(function($){
		$.fn.applyCustomScrollbar = function(obj){
			
			var settings = $.extend({
					'background' : 'black',
					'radius' : '5px',
					'holderBackground' : '#c3c3c3',
					'holderRadius' : '5px',
					'scrollWidth' : '10px',
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
				calculateScrollbarHeight = function(){
					var customScrollabeContainerHeight = $(this).height(),
					holderStyle='{',
					contentHeight = parseInt($('.content').height());
					scrollbarHeight = (customScrollabeContainerHeight / contentHeight) * customScrollabeContainerHeight;
					domCache.scrollHolder
					.css('height',customScrollabeContainerHeight)
					.append(domCache.scrollBar.css('height',scrollbarHeight))
					.prependTo(this);
					
					$.each(settings,function(index,value){
						if(index.match(/holder/) != null){
							holderStyle += '"'+index.replace(/holder/,'').toLowerCase()+'"' + ':"' + value+'",';
						}
					});
					holderStyle = holderStyle.substr(0,holderStyle.length-1) + '}';
					domCache.scrollHolder.css(JSON.parse(holderStyle));
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
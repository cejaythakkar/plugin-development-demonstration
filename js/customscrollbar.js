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
		
		var customScrollBar = {
			testingFunction : function(){
				console.log(self);
			}
		};
		
		$.fn.applyCustomScrollbar = function( options ){
			
			var settings = $.extend({
					'background' : 'black',
					'border-radius' : '5px',
					'holderBackground' : '#c3c3c3',
					'holderborder-Radius' : '5px',
					'Width' : '10px',
					'holderWidth' : '10px'
				}, options ),
				
				domCache = {
					scrollHolder : $('<div class="customscrollbar-scrollbar-holder"></div>'),
					scrollBar : $('<div class="customscrollbar-scrollbar"></div>'),
					content : this.find('.customscrollbar-scrollable-content')
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
					debugger;
					holderStyle = holderStyle.substr(0,holderStyle.length-1) + ',"z-index":"5","min-width":"10px"}';
					scrollbarStyle = scrollbarStyle.substr(0,scrollbarStyle.length-1) + '}';
					return [JSON.parse(holderStyle),JSON.parse(scrollbarStyle)];
				},
				calculateScrollbarHeight = function(){
					debugger;
					var customScrollabeContainerHeight = $(this).height(),
					contentHeight = parseInt($(this).find(domCache.content).find('tree-children').height()) + 19;
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
			console.log(this);
			this.each(function(){
				customScrollBar.self = this;
				customScrollBar.testingFunction();
				init.call(this);
			});
			return this;
		};
		
		//$('.custom-scrollable-container').applyCustomScrollbar();
	})(jQuery);
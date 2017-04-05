(function(window){

	function webkitScrollbar(_opt){
		this.scrollbar_v = document.createElement('div');
		this.scrollbar_h = document.createElement('div');
		this.scrollrail_v = document.createElement('div');
		this.scrollrail_h = document.createElement('div');
		this.scrollbar_v.id = 'scrollbar-vertical';
		this.scrollbar_h.id = 'scrollbar-horizontal';
		this.scrollrail_v.id = 'scrollrail-vertical';
		this.scrollrail_h.id = 'scrollrail-horizontal';

		this.rail = {
			size: 12,		// [px]
			min_size: 25,	// [px]
			margin: 2,		// [px]
			corner: 6		// [px]
		};

		this.zoom_browser;	// browser's zoom value
		this.zoom_body;	// document.body.zoom value

		this.to;
		this.grabbedId;		// grabbing bar's id

		this.bar_v; this.bar_h;			// scrollbar size
		this.margin_v; this.margin_h;	// scrollbar margin
		this.cacheY; this.cacheX;		// scrollbar pos data
		this.winHeight; this.winWidth;	// window size
		this.docHeight; this.docWidth;	// document size

		this.computedBodyStyle;		// document.body.style info

		this.margin_v = this.rail.margin;
		this.margin_h = this.rail.margin;

		this.zoom_browser = 1;

		this.options = _opt;
		// _opt.autohide: [BOOL]

		this.init();
	}

	webkitScrollbar.prototype = {

		// STARTUP FUNCS //////////////////////////////////////////////////////////

		init: function(){
			// do starutup() if DOM loaded already
			if (document.readyState != 'loading') this.startup();

			// do startup() if DOM loaded
			window.addEventListener('DOMContentLoaded',function(){this.startup();}.bind(this),false);
		},
		startup: function(){
			this.computedBodyStyle = window.getComputedStyle(document.body, null); // get document.body.style info

			this.cssHack(); // solve css problems

			// add div#scrollrail-* to body
			this.scrollrail_v.appendChild(this.scrollbar_v);
			this.scrollrail_h.appendChild(this.scrollbar_h);
			document.getElementsByTagName('body')[0].appendChild(this.scrollrail_v);
			document.getElementsByTagName('body')[0].appendChild(this.scrollrail_h);

			var self = this;
			// set update event
			window.addEventListener('scroll',function(e){self.update(e);},false);
			window.addEventListener('resize',function(e){self.update(e);},false);

			// set refresh event
			window.addEventListener('DOMModified',function(e){self.refresh(e);},false);

			// set scrollbar-grabbed events
			this.scrollbar_v.addEventListener('mousedown', function(e){self.grabStart(e,this);},false);
			this.scrollbar_h.addEventListener('mousedown', function(e){self.grabStart(e,this);},false);
			this.scrollrail_v.addEventListener('mousedown', function(e){self.slipStart(e,this);},false);
			this.scrollrail_h.addEventListener('mousedown', function(e){self.slipStart(e,this);},false);
			this.scrollrail_v.addEventListener('mouseover', function(e){self.onRail(e,this);},false);
			this.scrollrail_h.addEventListener('mouseover', function(e){self.onRail(e,this);},false);
			this.scrollrail_v.addEventListener('mouseout', function(e){self.offRail(e,this);},false);
			this.scrollrail_h.addEventListener('mouseout', function(e){self.offRail(e,this);},false);
			window.addEventListener('mousemove', function(e){self.grabMove(e);},false);
			window.addEventListener('mouseup', function(e){self.grabEnd(e);},false);

			this.update();
		},

		// REFRESH FUNCS ////////////////////////////////////////////////////////

		update: function(e){
			this.refresh(e);

			// Update Bar Positions
			var scrollTop = document.body.scrollTop + window.innerHeight/2; // centre pos of scrollTop
			var scrollLeft = document.body.scrollLeft + window.innerWidth/2; // centre pos of scrollLeft
			this.scrollbar_v.style.top = (this.winHeight*(scrollTop/this.docHeight)-this.bar_v/2+this.margin_v)/this.zoom_body+'px';
			this.scrollbar_h.style.left = (this.winWidth*(scrollLeft/this.docWidth)-this.bar_h/2+this.margin_h)/this.zoom_body+'px';
		},
		refresh: function(){
			// cancel if is hidden aleready
			if (this.isHidden()) return false;

			// cancel if is fullscreen
			if (this.isFullscreen()) return false;

			// add scrollrails if removed
			if (!document.getElementById('scrollrail-vertical') || !document.getElementById('scrollrail-horizontal')){
				document.getElementsByTagName('body')[0].appendChild(this.scrollrail_v);
				document.getElementsByTagName('body')[0].appendChild(this.scrollrail_h);
			}

			// set autohide feature
			if (this.options.autohide){
				this.setVisible(this.scrollbar_v);
				this.setVisible(this.scrollbar_h);
				this.setHidden(this.scrollbar_v);
				this.setHidden(this.scrollbar_h);
			}else{
				clearTimeout(this.scrollbar_v.to_autohide);
				clearTimeout(this.scrollbar_h.to_autohide);
			}

			// disabled scrollbar if oversized
			this.scrollrail_v.isActive = (window.innerHeight+1 < document.body.scrollHeight); // +1 for errors
			this.scrollrail_h.isActive = (window.innerWidth+1 < document.body.scrollWidth); // +1 for errors

			this.scrollrail_v.className = (!this.scrollrail_v.isActive)? 'disabled': '';
			this.scrollrail_h.className = (!this.scrollrail_h.isActive)? 'disabled': '';

			// get basic vars
			var wh = window.innerHeight - this.margin_v * 2 - ((this.scrollrail_h.isActive)? this.rail.corner/this.zoom_browser: 0),
				ww = window.innerWidth - this.margin_h * 2 - ((this.scrollrail_v.isActive)? this.rail.corner/this.zoom_browser: 0),
				dh = document.body.scrollHeight,
				dw = document.body.scrollWidth;

			// cancel if document size unchanged
			if (this.winHeight === wh
				&& this.winWidth === ww
				&& this.docHeight === dh
				&& this.docWidth === dw) return false;

			// refresh window/document status
			this.winHeight = wh; this.winWidth = ww;
			this.docHeight = dh; this.docWidth = dw;

			// get zoom levels
			this.zoom_browser = window.outerWidth/window.innerWidth || 1;
			this.zoom_body = document.body.style.zoom || 1;

			/* may needs refresh() after body.style.zoom changed */
			var zoom = this.zoom_browser * this.zoom_body;

			// adjust rail size in zoom
			this.scrollrail_v.style.width = this.rail.size/zoom+'px';
			this.scrollrail_h.style.height = this.rail.size/zoom+'px';

			// adjust scrollbar-thumb's border-radius in zoom
			this.scrollbar_v.style.webkitBorderRadius = 5/zoom+'px / '+ 7/zoom +'px';
			this.scrollbar_h.style.webkitBorderRadius = 14/zoom+'px / '+ 10/zoom +'px';

			this.scrollbar_v.style.borderRadius = 5/zoom+'px / '+ 7/zoom +'px';
			this.scrollbar_h.style.borderRadius = 14/zoom+'px / '+ 10/zoom +'px';

			// adjust scrollbar-thumb's box-shadow in zoom
			this.scrollbar_v.style.webkitBoxShadow = '0 0 '+1/zoom+'px '+1/zoom+'px rgba(255,255,255,.9)';
			this.scrollbar_h.style.webkitBoxShadow = '0 0 '+1/zoom+'px '+1/zoom+'px rgba(255,255,255,.9)';

			this.scrollbar_v.style.boxShadow = '0 0 '+1/zoom+'px '+1/zoom+'px rgba(255,255,255,.9)';
			this.scrollbar_h.style.boxShadow = '0 0 '+1/zoom+'px '+1/zoom+'px rgba(255,255,255,.9)';

			// adjust scrollrail's border-width in zoom
			this.scrollrail_v.style.borderLeftWidth = 1/zoom+'px';
			this.scrollrail_h.style.borderTopWidth = 1/zoom+'px';

			// calculate bar size
			this.bar_v = this.winHeight*(window.innerHeight/this.docHeight)/this.zoom_body;
			this.bar_h = this.winWidth*(window.innerWidth/this.docWidth)/this.zoom_body;

			// limit minimum bar_v size
			if (this.bar_v < this.rail.min_size){
				// calibrate margin_v size
				this.margin_v = this.rail.margin/this.zoom_browser + (this.rail.min_size - this.bar_v)/2;
				this.bar_v = this.rail.min_size;
			}else{
				this.margin_v = this.rail.margin/this.zoom_browser;
			}

			// limit minimum bar_h size
			if (this.bar_h < this.rail.min_size){
				// calibrate margin_h size
				this.margin_h = this.rail.margin/this.zoom_browser + (this.rail.min_size -  this.bar_h)/2;
				this.bar_h = this.rail.min_size;
			}else{
				this.margin_h = this.rail.margin/this.zoom_browser;
			}

			// set bar size
			this.scrollbar_v.style.height = this.bar_v+'px';
			this.scrollbar_h.style.width = this.bar_h+'px';
		},

		// MISCELLANEOUS  ///////////////////////////////////////////////////////////

		isHidden: function(){
			var isHidden = (this.computedBodyStyle.getPropertyValue('overflow') == 'hidden'),
				 isHidden_v = isHidden || (this.computedBodyStyle.getPropertyValue('overflow-y') == 'hidden'),
				 isHidden_h = isHidden || (this.computedBodyStyle.getPropertyValue('overflow-x') == 'hidden');

			// hide scrollrail-* if body.style.overflow == hidden
			this.scrollrail_v.style.display =(isHidden_v)?'none':'';
			this.scrollrail_h.style.display =(isHidden_h)?'none':'';
			return isHidden;
		},
		isFullscreen: function(){
			var isFullscreen = document.webkitIsFullScreen;

			if (isFullscreen){
				this.scrollrail_v.style.display ='none';
				this.scrollrail_h.style.display ='none';
			}
			return isFullscreen;
		},
		cssHack: function(){
			/* To Solve No Scrollbar in body overflowed */

			// body.style.height == window.innerHeight ? body.style.height == 'auto'
			if ((this.computedBodyStyle.getPropertyValue('overflow') == 'auto') &&
				 (this.computedBodyStyle.getPropertyValue('overflow-y' != 'hidden')) &&
				(this.computedBodyStyle.getPropertyValue('height') == window.innerHeight+'px'))
				document.body.style.height = 'auto';
		},

		// FOR AUTOHIDE ///////////////////////////////////////////////////////////

		setVisible: function(_bar){

			_bar.style.visibility = 'visible';
			_bar.style.opacity = '';
			clearTimeout(_bar.to_autohide);
		},
		setHidden: function(_bar){
			if (this.grabbedId) return false;

			_bar.to_autohide = setTimeout(function(){
				_bar.style.visibility = 'hidden';
				_bar.style.opacity = 0;
			}.bind(this),2500);
		},
		
		// FOR GRAB & HOVER EVENTS ////////////////////////////////////////////////

		grabStart: function(e, caller){
			e.preventDefault();

			this.grabbedId = caller.id;

			caller.className = 'hovered';

			// cache positions
			this.cacheY = e.screenY;
			this.cacheX = e.screenX;
		},
		grabMove: function(e){
			if (!this.grabbedId) return false;

			// ignore all mouse events while grabbing
			document.body.style.pointerEvents = 'none';

			if (this.grabbedId == 'scrollbar-vertical'){
				document.body.scrollTop += (e.screenY - this.cacheY)*(this.docHeight/this.winHeight)/this.zoom_browser;
				this.cacheY = e.screenY;
			}else{
				document.body.scrollLeft += (e.screenX - this.cacheX)*(this.docWidth/this.winWidth)/this.zoom_browser;
				this.cacheX = e.screenX;
			}

			this.update();
		},
		grabEnd: function(e){
			if (!this.grabbedId) return false;

			// catch mouse events
			document.body.style.pointerEvents = 'auto';

			this.grabbedId = false;

			// reset hovered class
			this.scrollbar_v.className = '';
			this.scrollbar_h.className = '';

			if (this.options.autohide){
				this.setHidden(this.scrollbar_v);
				this.setHidden(this.scrollbar_h);
			}
		},
		slipStart: function(e, caller){ // slip bars to clicked position on rails
			if (this.grabbedId) return false;

			if (caller.id == 'scrollrail-vertical'){
				document.body.scrollTop = (e.clientY - this.bar_v/2) * this.docHeight/(this.winHeight);
			}else{
				document.body.scrollLeft = (e.clientX - this.bar_h/2) * this.docWidth/(this.winWidth);
			}

			this.update();
			this.grabStart(e, caller.childNodes[0]);
		},
		onRail: function(e, caller){
			// reset classNames
			this.scrollrail_v.classList.remove('hovered');
			this.scrollrail_h.classList.remove('hovered');

			caller.className = 'hovered';
			clearTimeout(caller.to); // cancel removing

			// setVisible() if autohide is on
			if (this.options.autohide){
				this.setVisible((caller.id == 'scrollrail-vertical')
								? this.scrollbar_v
								: this.scrollbar_h);
			}
		},
		offRail: function(e, caller){
			// delay removing .hovered
			caller.to = setTimeout(function(){
				caller.className = '';
			}.bind(this),600);

			// setHidden() if autohide is on
			if (this.options.autohide){
				this.setHidden((caller.id == 'scrollrail-vertical')
							? this.scrollbar_v
							: this.scrollbar_h);
			}
		}
	};

	window.webkitScrollbar = webkitScrollbar;

}) (window);
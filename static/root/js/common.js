
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;!function(i){"use strict";var s=i.GreenSockGlobals||i,e=function(e){var t,i=e.split("."),n=s;for(t=0;t<i.length;t++)n[i[t]]=n=n[i[t]]||{};return n}("com.greensock.utils"),C=function(e){var t=e.nodeType,i="";if(1===t||9===t||11===t){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)i+=C(e)}else if(3===t||4===t)return e.nodeValue;return i},q=document,z=q.defaultView?q.defaultView.getComputedStyle:function(){},r=/([A-Z])/g,D=function(e,t,i,n){var s;return(i=i||z(e,null))?s=(e=i.getPropertyValue(t.replace(r,"-$1").toLowerCase()))||i.length?e:i[t]:e.currentStyle&&(s=(i=e.currentStyle)[t]),n?s:parseInt(s,10)||0},l=function(e){return!!(e.length&&e[0]&&(e[0].nodeType&&e[0].style&&!e.nodeType||e[0].length&&e[0][0]))},T=/(?:\r|\n|\t\t)/g,N=/(?:\s\s+)/g,w=127462,A=127487,L=function(e){return(e.charCodeAt(0)-55296<<10)+(e.charCodeAt(1)-56320)+65536},o=" style='position:relative;display:inline-block;"+(q.all&&!q.addEventListener?"*display:inline;*zoom:1;'":"'"),d=function(e,t){var i=-1!==(e=e||"").indexOf("++"),n=1;return i&&(e=e.split("++").join("")),function(){return"<"+t+o+(e?" class='"+e+(i?n++:"")+"'>":">")}},n=e.SplitText=s.SplitText=function(e,t){if("string"==typeof e&&(e=n.selector(e)),!e)throw"cannot split a null element.";this.elements=l(e)?function(e){var t,i,n,s=[],r=e.length;for(t=0;t<r;t++)if(i=e[t],l(i))for(n=i.length,n=0;n<i.length;n++)s.push(i[n]);else s.push(i);return s}(e):[e],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=t||{},this.split(t)},F=function(e,t,i){var n=e.nodeType;if(1===n||9===n||11===n)for(e=e.firstChild;e;e=e.nextSibling)F(e,t,i);else(3===n||4===n)&&(e.nodeValue=e.nodeValue.split(t).join(i))},I=function(e,t){for(var i=t.length;-1<--i;)e.push(t[i])},p=function(e){var t,i=[],n=e.length;for(t=0;t!==n;i.push(e[t++]));return i},P=function(e,t,i){for(var n;e&&e!==t;){if(n=e._next||e.nextSibling)return n.textContent.charAt(0)===i;e=e.parentNode||e._parent}return!1},Q=function(e){var t,i,n=p(e.childNodes),s=n.length;for(t=0;t<s;t++)(i=n[t])._isSplit?Q(i):(t&&3===i.previousSibling.nodeType?i.previousSibling.nodeValue+=3===i.nodeType?i.nodeValue:i.firstChild.nodeValue:3!==i.nodeType&&e.insertBefore(i.firstChild,i),e.removeChild(i))},a=function(e,t,i,n,s,r,l){var o,d,p,a,h,u,f,c,g,y,x,b,S=z(e),v=D(e,"paddingLeft",S),_=-999,m=D(e,"borderBottomWidth",S)+D(e,"borderTopWidth",S),C=D(e,"borderLeftWidth",S)+D(e,"borderRightWidth",S),T=D(e,"paddingTop",S)+D(e,"paddingBottom",S),N=D(e,"paddingLeft",S)+D(e,"paddingRight",S),w=.2*D(e,"fontSize"),A=D(e,"textAlign",S,!0),L=[],B=[],V=[],W=t.wordDelimiter||" ",H=t.span?"span":"div",E=t.type||t.split||"chars,words,lines",O=s&&-1!==E.indexOf("lines")?[]:null,k=-1!==E.indexOf("words"),R=-1!==E.indexOf("chars"),j="absolute"===t.position||!0===t.absolute,M=t.linesClass,G=-1!==(M||"").indexOf("++"),$=[];for(O&&1===e.children.length&&e.children[0]._isSplit&&(e=e.children[0]),G&&(M=M.split("++").join("")),p=(d=e.getElementsByTagName("*")).length,h=[],o=0;o<p;o++)h[o]=d[o];if(O||j)for(o=0;o<p;o++)((u=(a=h[o]).parentNode===e)||j||R&&!k)&&(b=a.offsetTop,O&&u&&Math.abs(b-_)>w&&"BR"!==a.nodeName&&(f=[],O.push(f),_=b),j&&(a._x=a.offsetLeft,a._y=b,a._w=a.offsetWidth,a._h=a.offsetHeight),O&&((a._isSplit&&u||!R&&u||k&&u||!k&&a.parentNode.parentNode===e&&!a.parentNode._isSplit)&&(f.push(a),a._x-=v,P(a,e,W)&&(a._wordEnd=!0)),"BR"===a.nodeName&&a.nextSibling&&"BR"===a.nextSibling.nodeName&&O.push([])));for(o=0;o<p;o++)u=(a=h[o]).parentNode===e,"BR"!==a.nodeName?(j&&(g=a.style,k||u||(a._x+=a.parentNode._x,a._y+=a.parentNode._y),g.left=a._x+"px",g.top=a._y+"px",g.position="absolute",g.display="block",g.width=a._w+1+"px",g.height=a._h+"px"),!k&&R?a._isSplit?(a._next=a.nextSibling,a.parentNode.appendChild(a)):a.parentNode._isSplit?(a._parent=a.parentNode,!a.previousSibling&&a.firstChild&&(a.firstChild._isFirst=!0),a.nextSibling&&" "===a.nextSibling.textContent&&!a.nextSibling.nextSibling&&$.push(a.nextSibling),a._next=a.nextSibling&&a.nextSibling._isFirst?null:a.nextSibling,a.parentNode.removeChild(a),h.splice(o--,1),p--):u||(b=!a.nextSibling&&P(a.parentNode,e,W),a.parentNode._parent&&a.parentNode._parent.appendChild(a),b&&a.parentNode.appendChild(q.createTextNode(" ")),t.span&&(a.style.display="inline"),L.push(a)):a.parentNode._isSplit&&!a._isSplit&&""!==a.innerHTML?B.push(a):R&&!a._isSplit&&(t.span&&(a.style.display="inline"),L.push(a))):O||j?(a.parentNode&&a.parentNode.removeChild(a),h.splice(o--,1),p--):k||e.appendChild(a);for(o=$.length;-1<--o;)$[o].parentNode.removeChild($[o]);if(O){for(j&&(y=q.createElement(H),e.appendChild(y),x=y.offsetWidth+"px",b=y.offsetParent===e?0:e.offsetLeft,e.removeChild(y)),g=e.style.cssText,e.style.cssText="display:none;";e.firstChild;)e.removeChild(e.firstChild);for(c=" "===W&&(!j||!k&&!R),o=0;o<O.length;o++){for(f=O[o],(y=q.createElement(H)).style.cssText="display:block;text-align:"+A+";position:"+(j?"absolute;":"relative;"),M&&(y.className=M+(G?o+1:"")),V.push(y),p=f.length,d=0;d<p;d++)"BR"!==f[d].nodeName&&(a=f[d],y.appendChild(a),c&&a._wordEnd&&y.appendChild(q.createTextNode(" ")),j&&(0===d&&(y.style.top=a._y+"px",y.style.left=v+b+"px"),a.style.top="0px",b&&(a.style.left=a._x-b+"px")));0===p?y.innerHTML="&nbsp;":k||R||(Q(y),F(y,String.fromCharCode(160)," ")),j&&(y.style.width=x,y.style.height=a._h+"px"),e.appendChild(y)}e.style.cssText=g}j&&(l>e.clientHeight&&(e.style.height=l-T+"px",e.clientHeight<l&&(e.style.height=l+m+"px")),r>e.clientWidth&&(e.style.width=r-N+"px",e.clientWidth<r&&(e.style.width=r+C+"px"))),I(i,L),I(n,B),I(s,V)},h=function(e,t,i,n){var s,r,l=p(e.childNodes),o=l.length,d="absolute"===t.position||!0===t.absolute;if(3!==e.nodeType||1<o){for(t.absolute=!1,s=0;s<o;s++)(3!==(r=l[s]).nodeType||/\S+/.test(r.nodeValue))&&(d&&3!==r.nodeType&&"inline"===D(r,"display",null,!0)&&(r.style.display="inline-block",r.style.position="relative"),r._isSplit=!0,h(r,t,i,n));return t.absolute=d,void(e._isSplit=!0)}!function(e,t,i,n){var s,r,l,o,d,p,a,h,u,f=t.span?"span":"div",c=t.type||t.split||"chars,words,lines",g=(c.indexOf("words"),-1!==c.indexOf("chars")),y="absolute"===t.position||!0===t.absolute,x=t.wordDelimiter||" ",b=" "!==x?"":y?"&#173; ":" ",S=t.span?"</span>":"</div>",v=!0,_=q.createElement("div"),m=e.parentNode;for(m.insertBefore(_,e),_.textContent=e.nodeValue,m.removeChild(e),a=-1!==(s=C(e=_)).indexOf("<"),!1!==t.reduceWhiteSpace&&(s=s.replace(N," ").replace(T,"")),a&&(s=s.split("<").join("{{LT}}")),d=s.length,r=(" "===s.charAt(0)?b:"")+i(),l=0;l<d;l++)if((p=s.charAt(l))===x&&s.charAt(l-1)!==x&&l){for(r+=v?S:"",v=!1;s.charAt(l+1)===x;)r+=b,l++;l===d-1?r+=b:")"!==s.charAt(l+1)&&(r+=b+i(),v=!0)}else"{"===p&&"{{LT}}"===s.substr(l,6)?(r+=g?n()+"{{LT}}</"+f+">":"{{LT}}",l+=5):55296<=p.charCodeAt(0)&&p.charCodeAt(0)<=56319||65024<=s.charCodeAt(l+1)&&s.charCodeAt(l+1)<=65039?(h=L(s.substr(l,2)),u=L(s.substr(l+2,2)),o=w<=h&&h<=A&&w<=u&&u<=A||127995<=u&&u<=127999?4:2,r+=g&&" "!==p?n()+s.substr(l,o)+"</"+f+">":s.substr(l,o),l+=o-1):r+=g&&" "!==p?n()+p+"</"+f+">":p;e.outerHTML=r+(v?S:""),a&&F(m,"{{LT}}","<")}(e,t,i,n)},t=n.prototype;t.split=function(e){this.isSplit&&this.revert(),this.vars=e=e||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var t,i,n,s=this.elements.length,r=e.span?"span":"div",l=("absolute"===e.position||e.absolute,d(e.wordsClass,r)),o=d(e.charsClass,r);-1<--s;)n=this.elements[s],this._originals[s]=n.innerHTML,t=n.clientHeight,i=n.clientWidth,h(n,e,l,o),a(n,e,this.chars,this.words,this.lines,i,t);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},t.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var e=this._originals.length;-1<--e;)this.elements[e].innerHTML=this._originals[e];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},n.selector=i.$||i.jQuery||function(e){var t=i.$||i.jQuery;return t?(n.selector=t)(e):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)},n.version="0.5.6"}(_gsScope),function(e){"use strict";var t=function(){return(_gsScope.GreenSockGlobals||_gsScope).SplitText};"function"==typeof define&&define.amd?define([],t):"undefined"!=typeof module&&module.exports&&(module.exports=t())}();

$(function() {
	$( document ).ready(function(){

		var exampleFontData = {
			'Montserrat': { weight: 400},
			'Montserrat': { weight: 500},
			'Montserrat': { weight: 600},
			'Montserrat': { weight: 800}
			// Etc.
		};
		
		var observers = [];
		
		// Make one observer for each font,
		// by iterating over the data we already have
		Object.keys(exampleFontData).forEach(function(family) {
			var data = exampleFontData[family];
			var obs = new FontFaceObserver(family, data);
			observers.push(obs.load());
		});
		
		Promise.all(observers)
			.then(function(fonts) {
				fonts.forEach(function(font) {
					console.log(font.family + ' ' + font.weight + ' ' + 'loaded');
		
					// Map the result of the Promise back to our existing data,
					// to get the other properties we need.
					console.log(exampleFontData[font.family].color);
				});
				const linesSplit = new SplitText(".wrapLine", {type:"lines"});	 
				const lettersSplit = new SplitText(".chars", {type:"chars"});
				scrollTextAnimation();
			})
			.catch(function(err) {
				console.warn('Some critical font are not available:', err);
				const linesSplit = new SplitText(".wrapLine", {type:"lines"});	 
				const lettersSplit = new SplitText(".chars", {type:"chars"});
				scrollTextAnimation();
			});


	$(".features-slider-container").slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		speed: 700,
		swipe: false,
		adaptiveHeight: true,
		prevArrow: '.features-slider-info .btn-prev',
		nextArrow: '.features-slider-info .btn-next',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					swipe: true
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	var html = document.documentElement;
	var body = document.body;
	
	var scroller = {
		target: document.querySelector("#page-wrap"),
		ease: 0.02, // <= scroll speed
		endY: 0,
		y: 0,
		resizeRequest: 1,
		scrollRequest: 0,
	};
	
	var requestId = null;
	
	TweenLite.set(scroller.target, {
		rotation: 0.01,
		force3D: true
	});
	
	onLoad();
	
	function onLoad() {
		updateScroller();  
		window.focus();
		window.addEventListener("resize", onResize);
		document.addEventListener("scroll", onScroll); 
	}
	
	function updateScroller() {
		var resized = scroller.resizeRequest > 0;
			
		if (resized) { 
			var height = scroller.target.clientHeight;
			body.style.height = height + "px";
			scroller.resizeRequest = 0;
		}
				
		var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
	
		scroller.endY = scrollY;
		scroller.y += (scrollY - scroller.y) * scroller.ease;
	
		if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
			scroller.y = scrollY;
			scroller.scrollRequest = 0;
		}
		
		TweenLite.set(scroller.target, { 
			y: -scroller.y 
		});
		
		requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
	}
	
	function onScroll() {
		scroller.scrollRequest++;
		if (!requestId) {
			requestId = requestAnimationFrame(updateScroller);
		}
	}
	
	function onResize() {
		scroller.resizeRequest++;
		if (!requestId) {
			requestId = requestAnimationFrame(updateScroller);
		}
	}

function scrollTextAnimation(){ 
const tl = new TimelineMax();
			tl
				.addLabel("start")
				.set($('.main-content'), {className:'+=active'})
				.staggerFrom($('.chars > div'), .3, {y:"10", autoAlpha: 0}, 0.1)
				.staggerFrom($('.main-content .intro-paragraph > div'), .3, {y:"20", autoAlpha: 0}, 0.1)
				.addLabel("images")
				.from($('.main-content .intro-buttons a'), 1, {y:"10", autoAlpha: 0})				
				.staggerFrom($('.main-content .intro-bg > img'), 2, {y:"200", autoAlpha: 0}, 1, '-=2')
				.from($('.header'), 1, {y: "-100%"}, "start")
				.set($('.features'), {className:'+=active'} , "images")
				.set($('.features-slider'), {className:'+=active'}, '-=1.3')
				.from($('.show-btn-container'), 1, { autoAlpha: 0}, '-=2.3')
				.set($('.show-btn-container'), {className:'+=active'} , '-=1')
				.from($('.showreel .rotated'), 1, { autoAlpha: 0}, '-=1');

var controller =  new ScrollMagic.Controller();
// var tlCurtain = new TimelineMax();
//     tlCurtain.set($curtain, {className:"+=active"});


$('.info-section-text .wrapLine').each(function(){

const current = this;

const children = $(this).children();

const tween = new TimelineMax()
				.set(current, {className:"+=active"})
				.staggerFrom(children, 0.8, {y: "-20", rotation: -3, autoAlpha: 0}, 0.1);

				const scene = new ScrollMagic.Scene({
					triggerElement: current,
					offset: -$(window).height()*0.4,
					reverse: false
				})
        .setTween(tween)
				.addTo(controller);
				
				scene.on("start", function (event) {
					this.remove();
			});
	});
	

	$('.partners-row').each(function(){

		const current = this;
		
		const children = $(this).children();
		
		const tween = new TimelineMax()
						.set(current, {className:"+=active"})
						.staggerFrom(children, 1.5, {y: "200", autoAlpha: 0}, 0.4);
		
						const scene = new ScrollMagic.Scene({
							triggerElement: current,
							offset: -$(window).height()*0.7,
							reverse: false
						})
						.setTween(tween)
						.addTo(controller);

						scene.on("start", function (event) {
							this.remove();
					});
		
			});

	$('.info-section-image').each(function(){

		const current = this;
				
		const tween = new TimelineMax()						
						.from(current, 1.5, {y: "200", autoAlpha: 0})
						.set(current, {className:"+=active"});
		
		
		
						const scene = new ScrollMagic.Scene({
							triggerElement: current,
							offset: -$(window).height()*0.4,
							reverse: false
						})
						.setTween(tween)
						.addTo(controller);

						scene.on("start", function (event) {
							this.remove();
					});
		
			});
			
			$('.info-section-title h2').each(function(){

				const current = this;
						
				const tween = new TimelineMax()						
								.from(current, 1, {y: "50", autoAlpha: 0})
								.set(current, {className:"+=active"});
				
				
				
								const scene = new ScrollMagic.Scene({
									triggerElement: current,
									offset: -$(window).height()*0.4,
									reverse: false
								})
								.setTween(tween)
								.addTo(controller);

								scene.on("start", function (event) {
									this.remove();
							});
				
					});

				}; //animations end

				$('.showreel-btn').on('click', function(event) {
					event.preventDefault();
					playVideoHello();
					$('.main__page__player').addClass('active');
					$('body').addClass('is-showreel');
				});   
					
				 $('.main__page__player').on('click', function(event) {
					event.preventDefault();
					$('.main__page__player').removeClass('active');
					$('body').removeClass('is-showreel');
					stopVideoHello()
				}); 

				
				});
});

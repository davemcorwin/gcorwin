!function(t){var e,i,s=t.event;e=s.special.debouncedresize={setup:function(){t(this).on("resize",e.handler)},teardown:function(){t(this).off("resize",e.handler)},handler:function(t,o){var n=this,r=arguments,a=function(){t.type="debouncedresize",s.dispatch.apply(n,r)};i&&clearTimeout(i),o?a():i=setTimeout(a,e.threshold)},threshold:150}}(jQuery),function(t){var e,i,s,o=t.event,n={_:0},r=0;e=o.special.throttledresize={setup:function(){t(this).on("resize",e.handler)},teardown:function(){t(this).off("resize",e.handler)},handler:function(a,c){var l=this,f=arguments;i=!0,s||(setInterval(function(){r++,(r>e.threshold&&i||c)&&(a.type="throttledresize",o.dispatch.apply(l,f),i=!1,r=0),r>9&&(t(n).stop(),s=!1,r=0)},30),s=!0)},threshold:0}}(jQuery);var flScripts=flScripts||{namespace:function(t){var e,i,s=t.split("."),o=this;for(e=0,i=s.length;i>e;e++)o[s[e]]||(o[s[e]]={}),o=o[s[e]];return o}};window.console||function(){var t,e="log debug info warn error assert dir dirxml group groupEnd time timeEnd count trace profile profileEnd".split(" "),i=e.length;for(window.console={},t=0;i>t;t++)window.console[e[t]]=function(){}}(),flScripts.isTouch=flScripts.isTouch||function(){return"ontouchstart"in window||"onmsgesturechange"in window},flScripts.isLame=flScripts.isLame||function(){if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){var t=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);return!(parseInt(t[1],10)>=7)}return!1},function(t,e){var i="hasClass",s="hasId",o="noClass",n="noId",r="isGt",a="isLt",c="onResize",l=function(t){return function(){jQuery.ajax({async:!0,type:"GET",url:t,data:null,dataType:"script"})}},f=function(i){var s=i[r]?i[r]:0,o=i[a]?i[a]:999999,n=t(e).width();return n>s&&o>n||void 0},d=function(e,i,s){var o=[];if("string"==typeof e)(!s.tL&&"t"==i||!s.fL&&"f"==i)&&o.push(l(e)),s.tS="t"==i||s.tS,s.fS="f"==i||s.fS;else if(t.isFunction(e))o.push(e);else if(t.isArray(e)){if(!tL&&"t"==i||!fL&&"f"==i)for(var n=e.length,r=0;n>r;r++)o.push(l(e[r]));s.tS="t"==i||s.tS,s.fS="f"==i||s.fS}return o},u=function(e){var c=!0;return void 0!==e[i]&&(c=!!c&&t("."+e[i]).length>0),void 0!==e[s]&&(c=!!c&&t("#"+e[s]).length>0),void 0!==e[o]&&(c=!!c&&0===t("."+e[o]).length),void 0!==e[n]&&(c=!!c&&0===t("#"+e[s]).length),(void 0!==e[r]||void 0!==e[a])&&(c=!!c&&f(e)),c},h=function(e){var i="ifTrue",s="ifFalse",o=0,n=0,r="",a=t.Deferred(),c=t.Deferred();if(void 0!==e.ifTrue1){o+=1,a.done(d(e.ifTrue1,"t",e));for(var r in e)r.indexOf(i)>-1&&"ifTrue1"!==r&&(o+=1,a.done(d(e[i+o],"t",e)))}if(void 0!==e.ifFalse1){n+=1,c.done(d(e.ifFalse1,"f",e));for(var r in e)r.indexOf(s)>-1&&"ifFalse1"!==r&&(n+=1,c.done(d(e[s+n],"f",e)))}!function(t){t?(a.resolve(),e.tL=!!e.tS):(c.resolve(),e.fL=!!e.fS)}(u(e))},p=function(i){void 0!==i[c]&&("debounced"==i[c]?t(e).on("debouncedresize",function(){h(i)}):t(e).on("throttledresize",function(){h(i)}))},v=function(t){for(var e in t)e!=i&&e!=s&&e!=n&&e!=o&&e!=r&&e!=a&&e!=c&&-1==e.indexOf("ifTrue")&&-1==e.indexOf("ifFalse")&&console.warn("flScripts.load : incorrect param - "+e)};flScripts.lasers=flScripts.lasers||function(t,i){var s=0,o=!1,n=function(){setTimeout(function(){"string"==typeof t?void 0!==e[t]&&(o=!0):"function"==typeof t?t()&&(o=!0):t&&(o=!0),o?i():20>s&&(s++,n())},250)};n()},flScripts.load=flScripts.load||function(t){v(t),t.tL=t.tS=t.fL=t.fS=!1,p(t),h(t)}}(jQuery,window),$(function(){flScripts.toggle=function(t){return this instanceof flScripts.toggle?(t=void 0!==t?t:{},this.defClass=void 0!==t.targetClass?t.targetClass:"fl-show",this.defActive=void 0!==t.activeClass?t.activeClass:"current",this.defRemove=void 0!==t.removeAll&&t.removeAll,this.defTarget=void 0!==t.target?t.target:"nav-main",void(this.selector=void 0!==t.selector?t.selector:$("a[data-target]"))):new flScripts.toggle(t)},flScripts.toggle.prototype={enabled:"fl-scripts-toggle-enabled",ghostClick:function(t,e){var i="fl-scripts-ghost",s="fl-scripts-hover-intent";t.on("click",function(o){o.preventDefault(),t.hasClass(i)||(t.addClass(i),setTimeout(function(){t.removeClass(i)},500),t.is('[href^="#"]')||(t.hasClass(s)?(t.removeClass(s),window.location.href=t.attr("href")):t.addClass(s)),e(o))})},dest:function(t){this.selector.each(function(t,e){$(e).off("click")}),delete t},setup:function(){var t=this;this.selector.each(function(e,i){var s=$(i),o=t.defClass,n=t.defActive,r=(t.defRemove,t.defTarget),a=t.enabled;if(!s.hasClass(a)){var c=s.data("target"),l=s.data("toggle"),f=s.data("active"),d=(s.data("removeall"),void 0===c?r:$("."+c)),u=void 0==l?o:l,h=void 0==f?n:f;t.ghostClick(s,function(){d.hasClass(u)?(d.removeClass(u),s.removeClass(h).removeClass(a)):(s.addClass(h).addClass(a),d.addClass(u))})}})}},(new flScripts.toggle).setup()}),$(function(){flScripts.accordion=function(t){if(!(this instanceof flScripts.accordion))return new flScripts.accordion(t);var t=void 0!==t?t:{},e=this;this.enabled="fl-accordion-enabled",this.disabled="fl-accordion-disabled",this.type=void 0!==t.type?t.type:"vertical",this.res=void 0!==t.res?t.res:999999,this.sel=void 0!==t.selector?t.selector:"fl-accordion",this.selector=$("."+this.sel+" > ul > li > a"),this.target=[],this.targetUl=[];var e=this;this.selector.each(function(t,i){var i=$(i),s=i.parent().find("ul");e.check(i,s)})},flScripts.accordion.prototype.eles=[],flScripts.accordion.prototype.targets=[],flScripts.accordion.prototype.add=function(t,e){this.eles.push(t),this.targets.push(e),t.find("+ ul").parent().addClass("has-child")},flScripts.accordion.prototype.check=function(t,e){var i,s=this.eles.length,o=!1;for(i=0;s>i;i++)t.is(this.eles[i])&&(o=!0);return!o&&(this.add(t,e),!0)},flScripts.accordion.prototype.setup=function(){var t,e=$(window).width(),i=this.eles.length,s=this;for(t=0;i>t;t++)if(this.type,e<this.res){var o=s.eles[t].find("+ ul");if(o.length>0){var n=new flScripts.toggle({target:o,selector:s.eles[t]});n.setup()}else flScripts.isLame&&s.eles[t].on("click",function(){location.assign($(this).attr("href"))})}},(new flScripts.accordion).setup(),new flScripts.accordion({type:"horizontal",selector:"fl-accordion-horizontal"}).setup()}),$(function(){flScripts.drop=function(t){return this instanceof flScripts.drop?(t=void 0!==t?t:{},this.selector=void 0!==t.selector?t.selector:$(".fl-drop li"),this.accAnchors=this.selector.find("> a"),this.accTargets=this.accAnchors.find("+ ul"),this.bp=void 0!==t.bp?t.bp:$(".fl-drop").data("bp"),void(this.dropAcc=void 0)):new flScripts.drop(t)},flScripts.drop.prototype={last:$("ul li:last-child"),init:function(){var t=this;this.last.addClass("last-child"),this.selector.each(function(e,i){var s=$(i);if(s.has("ul").length>0){t.setup(s);var o=s.find("> a"),n=o.find("+ ul");t.accSetup(t,o,n),$(window).on("debouncedresize",function(){t.accSetup(t,o,n)})}else flScripts.isLame()&&s.on("click",function(){location.assign($(this).attr("href"))})}),$(window).on("debouncedresize",function(){t.accSetup(t)}),this.accSetup(this)},accSetup:function(t,e,i){var s=$(window).width();if(t.bp>=s){$(".fl-drop").hasClass("fl-accordion")||$(".fl-drop").addClass("fl-accordion");new flScripts.toggle({selector:e,target:i}).setup()}else $(".fl-drop").hasClass("fl-accordion")&&$(".fl-drop").removeClass("fl-accordion")},setup:function(t){var e=t.find("> a");e.find("+ ul"),t.addClass("has-child"),e.hasClass("current")||t.hover(function(){e.addClass("current")},function(){e.removeClass("current")}),this.drop(t,e)},drop:function(t,e){if($(window).width(),flScripts.isTouch()){new flScripts.toggle({targetClass:"fl-drop-active",selector:e,target:t}).setup()}}},(new flScripts.drop).init()});
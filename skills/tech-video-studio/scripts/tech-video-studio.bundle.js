/* TechVideoStudio Standalone Bundle v2.0.0 (Includes GSAP + Studio Primitives) */
/*!
 * GSAP 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function P(t){return(i=yt(t,ot))&&ze}function Q(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function R(t,e){return!e&&console.warn(t)}function S(t,e){return t&&(ot[t]=e)&&i&&(i[t]=e)||ot}function T(){return 0}function ea(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=gt.length;r--&&!gt[r].targetTest(i););e=gt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Vt(t[r],e)))||t.splice(r,1);return t}function fa(t){return t._gsap||ea(Mt(t))[0]._gsap}function ga(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ha(t,e){return(t=t.split(",")).forEach(e)||t}function ia(t){return Math.round(1e5*t)/1e5||0}function ja(t){return Math.round(1e7*t)/1e7||0}function ka(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function la(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ma(){var t,e,r=dt.length,i=dt.slice(0);for(ct={},t=dt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function na(t,e,r,i){dt.length&&!L&&ma(),t.render(e,r,i||L&&e<0&&(t._initted||t._startAt)),dt.length&&!L&&ma()}function oa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(at).length<2?e:r(t)?t.trim():t}function pa(t){return t}function qa(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ta(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?ta(t[r]||(t[r]={}),e[r]):e[r]);return t}function ua(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function va(t){var e=t.parent||I,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}(Z(t.keyframes)):qa;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function xa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function ya(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function za(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Aa(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Ca(t,e,r,i){return t._startAt&&(L?t._startAt.revert(ht):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ea(t){return t._repeat?Tt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ga(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ha(t){return t._end=ja(t._start+(t._tDur/Math.abs(t._ts||t._rts||X)||0))}function Ia(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=ja(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ha(t),r._dirty||Aa(r,t)),t}function Ja(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ga(t.rawTime(),e),(!e._dur||Ot(0,e.totalDuration(),r)-e._tTime>X)&&e.render(r,!0)),Aa(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-X}}function Ka(e,r,i,n){return r.parent&&za(r),r._start=ja((t(i)?i:i||e!==I?xt(e,i,r):e._time)+r._delay),r._end=ja(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),xa(e,r,"_first","_last",e._sort?"_start":0),bt(r)||(e._recent=r),n||Ja(e,r),e._ts<0&&Ia(e,e._tTime),e}function La(t,e){return(ot.ScrollTrigger||Q("scrollTrigger",e))&&ot.ScrollTrigger.create(e,t)}function Ma(t,e,r,i,n){return Qt(t,e,n),t._initted?!r&&t._pt&&!L&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==Rt.frame?(dt.push(t),t._lazy=[n,i],1):void 0:1}function Ra(t,e,r,i){var n=t._repeat,a=ja(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:ja(a*(n+1)+t._rDelay*n):a,0<s&&!i&&Ia(t,t._tTime=t._tDur*s),t.parent&&Ha(t),r||Aa(t.parent,t),t}function Sa(t){return t instanceof Xt?Aa(t):Ra(t,t._dur)}function Va(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new $t(r[0],u,r[1+o])}function Wa(t,e){return t||0===t?e(t):e}function Ya(t,e){return r(t)&&(e=st.exec(t))?e[1]:""}function _a(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function cb(r){return r=Mt(r)[0]||R("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Mt(t,e.querySelectorAll?e:e===r?R("Invalid scope")||a.createElement("div"):r)}}function db(t){return t.sort(function(){return.5-Math.random()})}function eb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=jt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||p).length,c=y[d];if(!c){if(!(f="auto"===p.grid?0:(p.grid||[1,U])[1])){for(h=-U;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f<d&&f--}for(c=y[d]=[],i=T?Math.min(f,d)*w-.5:m%f,n=f===U?0:T?d*x/f-.5:m/f|0,l=U,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),c[u]=o=b?Math.abs("y"===b?s:a):K(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&db(c),c.max=h-l,c.min=l,c.v=d=(parseFloat(p.amount)||parseFloat(p.each)*(d<f?d-1:b?"y"===b?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),c.b=d<0?g-d:g,c.u=Ya(p.amount||p.each)||0,_=_&&d<0?Yt(_):_}return d=(c[t]-c.min)/c.max||0,ja(c.b+(_?_(d):d)*c.v)+c.u}}function fb(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=ja(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:Ya(e))}}function gb(h,e){var l,f,r=Z(h);return!r&&v(h)&&(l=r=h.radius||U,h.values?(h=Mt(h.values),(f=!t(h[0]))&&(l*=l)):h=fb(h.increment)),Wa(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=U,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+Ya(e)}:fb(h))}function hb(t,e,r,i){return Wa(Z(t)?!e:!0===r?!!(r=0):!i,function(){return Z(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function lb(e,r,t){return Wa(t,function(t){return e[~~r(t)]})}function ob(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?at:tt),s+=t.substr(a,e-a)+hb(n?r:+r[0],n?0:+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function rb(t,e,r){var i,n,a,s=t.labels,o=U;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function tb(t){return za(t),t.scrollTrigger&&t.scrollTrigger.kill(!!L),t.progress()<1&&Ct(t,"onInterrupt"),t}function wb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:T,render:he,add:Wt,kill:ce,modifier:fe,rawVars:0},a={targetTest:0,get:0,getSetter:ne,aliases:{},register:0};if(Ft(),t!==i){if(pt[e])return;qa(i,qa(ua(t,n),a)),yt(i.prototype,yt(n,ua(t,a))),pt[i.prop=e]=i,t.targetTest&&(gt.push(i),ft[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}S(e,i),t.register&&t.register(ze,i,_e)}else At.push(t)}function zb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*St+.5|0}function Ab(e,r,i){var n,a,s,o,u,h,l,f,d,c,p=e?t(e)?[e>>16,e>>8&St,e&St]:0:zt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),zt[e])p=zt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&St,p&St,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&St,e&St]}else if("hsl"===e.substr(0,3))if(p=c=e.match(tt),r){if(~e.indexOf("="))return p=e.match(et),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=zb(o+1/3,n,a),p[1]=zb(o,n,a),p[2]=zb(o-1/3,n,a);else p=e.match(tt)||zt.transparent;p=p.map(Number)}return r&&!c&&(n=p[0]/St,a=p[1]/St,s=p[2]/St,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(d=l-f,u=.5<h?d/(2-l-f):d/(l+f),o=l===n?(a-s)/d+(a<s?6:0):l===a?(s-n)/d+2:(n-a)/d+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Bb(t){var r=[],i=[],n=-1;return t.split(Et).forEach(function(t){var e=t.match(rt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Cb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Et),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Ab(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Bb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Et,"1").split(rt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Et)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Fb(t){var e,r=t.join(" ");if(Et.lastIndex=0,Et.test(r))return e=Dt.test(r),t[1]=Cb(t[1],e),t[0]=Cb(t[0],e,Bb(t[1])),!0}function Ob(t){var e=(t+"").split("("),r=Lt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Bt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(oa)):Lt._CE&&It.test(t)?Lt._CE("",t):r}function Qb(t,e){for(var r,i=t._first;i;)i instanceof Xt?Qb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Qb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Sb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ha(t,function(t){for(var e in Lt[t]=ot[t]=a,Lt[n=t.toLowerCase()]=r,a)Lt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Lt[t+"."+e]=a[e]}),a}function Tb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Ub(r,t,e){function Jm(t){return 1===t?1:i*Math.pow(2,-10*t)*H((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/N*(Math.asin(1/i)||0),s="out"===r?Jm:"in"===r?function(t){return 1-Jm(1-t)}:Tb(Jm);return n=N/n,s.config=function(t,e){return Ub(r,t,e)},s}function Vb(e,r){function Rm(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Rm:"in"===e?function(t){return 1-Rm(1-t)}:Tb(Rm);return t.config=function(t){return Vb(e,t)},t}var F,L,l,I,h,n,a,i,o,f,d,c,p,_,m,g,b,O,k,M,C,A,z,E,D,B,Y,j,q={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},V={duration:.5,overwrite:!1,delay:0},U=1e8,X=1/U,N=2*Math.PI,G=N/4,W=0,K=Math.sqrt,J=Math.cos,H=Math.sin,$="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},Z=Array.isArray,tt=/(?:-?\.?\d|\.)+/gi,et=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,rt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,it=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,nt=/[+-]=-?[.\d]+/,at=/[^,'"\[\]\s]+/gi,st=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ot={},ut={suppressEvents:!0,isStart:!0,kill:!1},ht={suppressEvents:!0,kill:!1},lt={suppressEvents:!0},ft={},dt=[],ct={},pt={},_t={},mt=30,gt=[],vt="",yt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},Tt=function _animationCycle(t,e){var r=Math.floor(t/=e);return t&&r===t?r-1:r},bt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},wt={_start:0,endTime:T,totalDuration:T},xt=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||wt,h=t.duration()>=U?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*(Z(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Ot=function _clamp(t,e,r){return r<t?t:e<r?e:r},kt=[].slice,Mt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Ft()?Z(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||_a(t,1)?i.push.apply(i,Mt(t)):i.push(t)})||i}(t,i):_a(t)?kt.call(t,0):t?[t]:[]:kt.call((e||a).querySelectorAll(t),0)},Pt=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Wa(n,function(t){return r+((t-e)/a*s||0)})},Ct=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&dt.length&&ma(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},At=[],St=255,zt={aqua:[0,St,St],lime:[0,St,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,St],navy:[0,0,128],white:[St,St,St],olive:[128,128,0],yellow:[St,St,0],orange:[St,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[St,0,0],pink:[St,192,203],cyan:[0,St,St],transparent:[St,St,St,0]},Et=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in zt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Dt=/hsl[a]?\(/,Rt=(k=Date.now,M=500,C=33,A=k(),z=A,D=E=1e3/240,g={time:0,frame:0,tick:function tick(){yl(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ot.gsap=ze,(h.gsapVersions||(h.gsapVersions=[])).push(ze.version),P(i||h.GreenSockGlobals||!h.gsap&&h||{}),At.forEach(wb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,D-1e3*g.time+1|0)},c=1,yl(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),c=0,_=T},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,C=Math.min(e||33,M)},fps:function fps(t){E=1e3/(t||240),D=1e3*g.time+E},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),B[e?"unshift":"push"](a),Ft(),a},remove:function remove(t,e){~(e=B.indexOf(t))&&B.splice(e,1)&&e<=O&&O--},_listeners:B=[]}),Ft=function _wake(){return!c&&Rt.wake()},Lt={},It=/^[\d.\-M][\d.\-,\s]/,Bt=/["']/g,Yt=function _invertEase(e){return function(t){return 1-e(1-t)}},jt=function _parseEase(t,e){return t&&(s(t)?t:Lt[t]||Ob(t))||e};function yl(t){var e,r,i,n,a=k()-z,s=!0===t;if((M<a||a<0)&&(A+=a-C),(0<(e=(i=(z+=a)-A)-D)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,D+=e+(E<=e?4:E-e),r=1),s||(p=_(yl)),r)for(O=0;O<B.length;O++)B[O](i,b,n,t)}function gn(t){return t<j?Y*t*t:t<.7272727272727273?Y*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?Y*(t-=2.25/2.75)*t+.9375:Y*Math.pow(t-2.625/2.75,2)+.984375}ha("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Sb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Lt.Linear.easeNone=Lt.none=Lt.Linear.easeIn,Sb("Elastic",Ub("in"),Ub("out"),Ub()),Y=7.5625,j=1/2.75,Sb("Bounce",function(t){return 1-gn(1-t)},gn),Sb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),Sb("Circ",function(t){return-(K(1-t*t)-1)}),Sb("Sine",function(t){return 1===t?1:1-J(t*G)}),Sb("Back",Vb("in"),Vb("out"),Vb()),Lt.SteppedEase=Lt.steps=ot.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Ot(0,.99999999,t)|0)+n)*r}}},V.ease=Lt["quad.out"],ha("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return vt+=t+","+t+"Params,"});var qt,Vt=function GSCache(t,e){this.id=W++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ga,this.set=e?e.getSetter:ne},Ut=((qt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},qt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},qt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ra(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},qt.totalTime=function totalTime(t,e){if(Ft(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ia(this,t),!r._dp||r.parent||Ja(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Ka(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===X||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),na(this,t,e)),this},qt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ea(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},qt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<this.rawTime()?1:0},qt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ea(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},qt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?Tt(this._tTime,r)+1:1},qt.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-X?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ga(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-X?0:this._rts,this.totalTime(Ot(-Math.abs(this._delay),this._tDur,r),!1!==e),Ha(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},qt.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ft(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==X&&(this._tTime-=X)))),this):this._ps},qt.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Ka(e,this,t-this._delay),this}return this._start},qt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},qt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ga(e.rawTime(t),this):this._tTime:this._tTime},qt.revert=function revert(t){void 0===t&&(t=lt);var e=L;return L=t,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),L=e,this},qt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},qt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Sa(this)):-2===this._repeat?1/0:this._repeat},qt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Sa(this),e?this.time(e):this}return this._rDelay},qt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},qt.seek=function seek(t,e){return this.totalTime(xt(this,t),w(e))},qt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e))},qt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},qt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},qt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},qt.resume=function resume(){return this.paused(!1)},qt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-X:0)),this):this._rts<0},qt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-X,this},qt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-X))},qt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},qt.then=function then(t){var i=this;return new Promise(function(e){function Co(){var t=i.then;i.then=null,s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:pa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Co():i._prom=Co})},qt.kill=function kill(){tb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ra(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),c||Rt.wake()}qa(Ut.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X,_prom:0,_ps:!1,_rts:1});var Xt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),I&&Ka(t.parent||I,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&La(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Va(0,arguments,this),this},e.from=function from(t,e,r){return Va(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Va(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,va(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new $t(t,e,xt(this,r),1),this},e.call=function call(t,e,r){return Ka(this,$t.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new $t(t,r,xt(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,va(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,va(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:ja(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==I&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(c=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=ja(v%o),v===m?(s=this._repeat,i=g):((s=~~(v/o))&&s===v/o&&(i=g,s--),g<i&&(i=g)),d=Tt(this._tTime,o),!_&&this._tTime&&d!==s&&this._tTime-d*o-this._dur<=0&&(d=s),c&&1&s&&(i=g-i,p=1),s!==d&&!this._lock){var T=c&&1&d,b=T===(c&&1&s);if(s<d&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:ja(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&Ct(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Qb(this,p)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,ja(_),ja(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&i&&!e&&!s&&(Ct(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-X);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||L&&(n._initted||n._startAt)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-X:X);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-X)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ha(this),this.render(t,e,r);this._onUpdate&&!e&&Ct(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||za(this,1),e||t<0&&!_||!v&&!_&&m||(Ct(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=xt(this,i,e)),!(e instanceof Ut)){if(Z(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=$t.delayedCall(0,e)}return this!==e?Ka(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-U);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof $t?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(ya(this,t),t===this._recent&&(this._recent=this._last),Aa(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ja(Rt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=xt(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=$t.delayedCall(0,e||T,r);return i.data="isPause",this._hasPause=1,Ka(this,i,xt(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=xt(this,t);e;)e._start===t&&"isPause"===e.data&&za(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Nt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Mt(e),s=this._first,o=t(r);s;)s instanceof $t?la(s._targets,a)&&(o?(!Nt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=xt(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=$t.to(i,qa({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||X,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ra(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,qa({startAt:{time:xt(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+X)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Aa(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Aa(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=U;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Ka(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=r/a._ts,a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ra(a,a===I&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(I._ts&&(na(I,Ga(t,I)),f=Rt.frame),Rt.frame>=mt){mt+=q.autoSleep||120;var e=I._first;if((!e||!e._ts)&&q.autoSleep&&Rt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Rt.sleep()}}},Timeline}(Ut);qa(Xt.prototype,{_lock:0,_hasPause:0,_forcing:0});function ac(t,e,i,n,a,o){var u,h,l,f;if(pt[t]&&!1!==(u=new pt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Kt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||Z(t)||$(t))return r(t)?Kt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Kt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new _e(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==d))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function gc(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if(Z(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Nt,Gt,Wt=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var d,c=t[e],p="get"!==i?i:s(c)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():c,_=s(c)?l?re:te:Zt;if(r(n)&&(~n.indexOf("random(")&&(n=ob(n)),"="===n.charAt(1)&&(!(d=ka(p,n)+(Ya(p)||0))&&0!==d||(n=d))),!f||p!==n||Gt)return isNaN(p*n)||""===n?(c||e in t||Q(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,c,p,_=new _e(this._pt,t,e,0,1,ue,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(c=~(i+="").indexOf("random("))&&(i=ob(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(it)||[];o=it.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?ka(d,l)-d:parseFloat(l)-d,m:h&&h<4?Math.round:0},m=it.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(nt.test(i)||c)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||q.stringFilter,l)):(d=new _e(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof c?se:ae,0,_),l&&(d.fp=l),u&&d.modifier(u,this,t),this._pt=d)},Qt=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,O=m.yoyoEase,k=m.keyframes,M=m.autoRevert,P=t._dur,C=t._startAt,A=t._targets,S=t.parent,z=S&&"nested"===S.data?S.vars.targets:A,E="auto"===t._overwrite&&!F,D=t.timeline;if(!D||k&&g||(g="none"),t._ease=jt(g,V.ease),t._yEase=O?Yt(jt(!0===O?g:O,V.ease)):0,O&&t._yoyo&&!t._repeat&&(O=t._yEase,t._yEase=t._ease,t._ease=O),t._from=!D&&!!m.runBackwards,!D||k&&!m.stagger){if(p=(l=A[0]?fa(A[0]).harness:0)&&m[l.prop],i=ua(m,ft),C&&(C._zTime<0&&C.progress(1),e<0&&x&&y&&!M?C.render(-1,!0):C.revert(x&&P?ht:ut),C._lazy=0),v){if(za(t._startAt=$t.set(A,qa({data:"isStart",overwrite:!1,parent:S,immediateRender:!0,lazy:!C&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return Ct(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L||!y&&!M)&&t._startAt.revert(ht),y&&P&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&P&&!C)if(e&&(y=!1),a=qa({overwrite:!1,data:"isFromStart",lazy:y&&!C&&w(T),immediateRender:y,stagger:0,parent:S},i),p&&(a[l.prop]=p),za(t._startAt=$t.set(A,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L?t._startAt.revert(ht):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,X,X);for(t._pt=t._ptCache=0,T=P&&w(T)||T&&!P,n=0;n<A.length;n++){if(h=(o=A[n])._gsap||ea(A)[n]._gsap,t._ptLookup[n]=d={},ct[h.id]&&dt.length&&ma(),c=z===A?n:z.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,c,z)&&(t._pt=s=new _e(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)pt[a]&&(f=ac(a,i,t,c,o,z))?f.priority&&(u=1):d[a]=s=Wt.call(t,o,a,"get",i[a],c,z,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),E&&t._pt&&(Nt=t,I.killTweensOf(o,d,t.globalTime(e)),_=!t.parent,Nt=0),t._pt&&T&&(ct[h.id]=1)}u&&pe(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,k&&e<=0&&D.render(U,!0,!0)},Kt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?ob(t):t},Jt=vt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ht={};ha(Jt+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Ht[t]=1});var $t=function(D){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,d,c,p=(a=D.call(this,n?r:va(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,T=p.stagger,b=p.overwrite,x=p.keyframes,O=p.defaults,k=p.scrollTrigger,M=p.yoyoEase,P=r.parent||I,C=(Z(e)||$(e)?t(e[0]):"length"in r)?[e]:Mt(e);if(a._targets=C.length?ea(C):R("GSAP target "+e+" not found. https://gsap.com",!q.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=b,x||T||y(_)||y(m)){if(r=a.vars,(s=a.timeline=new Xt({data:"nested",defaults:O||{},targets:P&&"nested"===P.data?P.vars.targets:C})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,T||y(_)||y(m)){if(h=C.length,d=T&&eb(T),v(T))for(l in T)~Jt.indexOf(l)&&((c=c||{})[l]=T[l]);for(o=0;o<h;o++)(u=ua(r,Ht)).stagger=0,M&&(u.yoyoEase=M),c&&yt(u,c),f=C[o],u.duration=+Kt(_,_assertThisInitialized(a),o,f,C),u.delay=(+Kt(m,_assertThisInitialized(a),o,f,C)||0)-a._delay,!T&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,d?d(o,f,C):0),s._ease=Lt.none;s.duration()?_=m=0:a.timeline=0}else if(x){va(qa(s.vars.defaults,{ease:"none"})),s._ease=jt(x.ease||r.ease||"none");var A,S,z,E=0;if(Z(x))x.forEach(function(t){return s.to(C,t,">")}),s.duration();else{for(l in u={},x)"ease"===l||"easeEach"===l||gc(l,x[l],u,x.easeEach);for(l in u)for(A=u[l].sort(function(t,e){return t.t-e.t}),o=E=0;o<A.length;o++)(z={ease:(S=A[o]).e,duration:(S.t-(o?A[o-1].t:0))/100*_})[l]=S.v,s.to(C,z,E),E+=z.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==b||F||(Nt=_assertThisInitialized(a),I.killTweensOf(C),Nt=0),Ka(P,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!x&&a._start===ja(P._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==P.data)&&(a._tTime=-X,a.render(Math.max(0,-m)||0)),k&&La(_assertThisInitialized(a),k),a}_inheritsLoose(Tween,D);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,c=this._tDur,p=this._dur,_=t<0,m=c-X<t&&!_?c:t<X?0:t;if(p){if(m!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=_){if(i=m,l=this.timeline,this._repeat){if(s=p+this._rDelay,this._repeat<-1&&_)return this.totalTime(100*s+t,e,r);if(i=ja(m%s),m===c?(a=this._repeat,i=p):((a=~~(m/s))&&a===ja(m/s)&&(i=p,a--),p<i&&(i=p)),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=Tt(this._tTime,s),i===d&&!r&&this._initted&&a===o)return this._tTime=m,this;a!==o&&(l&&this._yEase&&Qb(l,u),this.vars.repeatRefresh&&!u&&!this._lock&&this._time!==s&&this._initted&&(this._lock=r=1,this.render(ja(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Ma(this,_?t:i,r,e,m))return this._tTime=0,this;if(!(d===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(p!==this._dur)return this.render(t,e,r)}if(this._tTime=m,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),i&&!d&&!e&&!a&&(Ct(this,"onStart"),this._tTime!==m))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(_&&Ca(this,t,0,r),Ct(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&Ct(this,"onRepeat"),m!==this._tDur&&m||this._tTime!==m||(_&&!this._onUpdate&&Ca(this,t,0,!0),!t&&p||!(m===this._tDur&&0<this._ts||!m&&this._ts<0)||za(this,1),e||_&&!d||!(m||d||u)||(Ct(this,m===c?"onComplete":"onReverseComplete",!0),!this._prom||m<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!bt(t))||(t._ts<0||t._dp._ts<0)&&!bt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Ot(0,t._tDur,e),a=Tt(l,h),t._yoyo&&1&a&&(u=1-u),a!==Tt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||L||i||t._zTime===X||!e&&t._zTime){if(!t._initted&&Ma(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?X:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Ca(t,e,0,!0),t._onUpdate&&!r&&Ct(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&Ct(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&za(t,1),r||L||(Ct(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),D.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){c||Rt.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Qt(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,d=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!d)for(d=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Gt=1,t.vars[e]="+=0",Qt(t,s),Gt=0,o?R(e+" not eligible for reset"):1;d.push(u)}for(f=d.length;f--;)(u=(h=d[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ia(r)+Ya(h.e)),h.b&&(h.b=u.s+Ya(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(Ia(this,0),this.parent||xa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?tb(this):this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Nt&&!0!==Nt.vars.overwrite)._first||tb(this),this.parent&&i!==this.timeline.totalDuration()&&Ra(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,d=t?Mt(t):f,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return"all"===e&&(this._pt=0),tb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ha(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?fa(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=yt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=c[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||ya(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&tb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Va(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Va(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return I.killTweensOf(t,e,r)},Tween}(Ut);qa($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ha("staggerTo,staggerFrom,staggerFromTo",function(r){$t[r]=function(){var t=new Xt,e=kt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function oc(t,e,r){return t.setAttribute(e,r)}function wc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var Zt=function _setterPlain(t,e,r){return t[e]=r},te=function _setterFunc(t,e,r){return t[e](r)},re=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},ne=function _getSetter(t,e){return s(t[e])?te:u(t[e])&&t.setAttribute?oc:Zt},ae=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},se=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},ue=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},he=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},fe=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},ce=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?ya(this,i,"_pt"):i.dep||(e=1),i=r;return!e},pe=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},_e=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=wc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||ae,this.d=s||this,this.set=o||Zt,this.pr=u||0,(this._next=t)&&(t._prev=this)}ha(vt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ft[t]=1}),ot.TweenMax=ot.TweenLite=$t,ot.TimelineLite=ot.TimelineMax=Xt,I=new Xt({sortChildren:!1,defaults:V,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),q.stringFilter=Fb;function Ec(t){return(ye[t]||Te).map(function(t){return t()})}function Fc(){var t=Date.now(),o=[];2<t-Oe&&(Ec("matchMediaInit"),ge.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Ec("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Oe=t,Ec("matchMedia"))}var me,ge=[],ye={},Te=[],Oe=0,Me=0,Pe=((me=Context.prototype).add=function add(t,i,n){function Gw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=cb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Gw,t===s?Gw(a,function(t){return a.add(null,t)}):t?a[t]=Gw:Gw},me.ignore=function ignore(t){var e=l;l=null,t(this),l=e},me.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof $t&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},me.clear=function clear(){this._r.length=this.data.length=0},me.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Xt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof $t||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t)for(var e=ge.length;e--;)ge[e].id===this.id&&ge.splice(e,1)},me.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&cb(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Me++,t&&this.add(t)}var Ce,Ae=((Ce=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Pe(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(ge.indexOf(s)<0&&ge.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Fc):i.addEventListener("change",Fc));return a&&e(s,function(t){return s.add(null,t)}),this},Ce.revert=function revert(t){this.kill(t||{})},Ce.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var Se={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return wb(t)})},timeline:function timeline(t){return new Xt(t)},getTweensOf:function getTweensOf(t,e){return I.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Mt(i)[0]);var a=fa(i||{}).get,s=e?pa:oa;return"native"===e&&(e=""),i?t?s((pt[t]&&pt[t].get||a)(i,t,e,n)):function(t,e,r){return s((pt[t]&&pt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Mt(r)).length){var n=r.map(function(t){return ze.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=pt[e],o=fa(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;d._pt=0,e.init(r,i?t+i:t,d,0,[r]),e.render(1,e),d._pt&&he(1,d)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function $x(t,e,r){return n.resetTo(i,t,e,r)}var r,n=ze.to(t,yt(((r={})[i]="+=0.1",r.paused=!0,r),e||{}));return $x.tween=n,$x},isTweening:function isTweening(t){return 0<I.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=jt(t.ease,V.ease)),ta(V,t||{})},config:function config(t){return ta(q,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!pt[t]&&!ot[t]&&R(i+" effect requires "+t+" plugin.")}),_t[i]=function(t,e,r){return n(Mt(t),qa(e||{},a),r)},r&&(Xt.prototype[i]=function(t,e,r){return this.add(_t[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Lt[t]=jt(e)},parseEase:function parseEase(t,e){return arguments.length?jt(t,e):Lt},getById:function getById(t){return I.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Xt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),I.remove(n),n._dp=0,n._time=n._tTime=I._time,r=I._first;r;)i=r._next,!e&&!r._dur&&r instanceof $t&&r.vars.onComplete===r._targets[0]||Ka(n,r,r._start-r._delay),r=i;return Ka(I,n,0),n},context:function context(t,e){return t?new Pe(t,e):l},matchMedia:function matchMedia(t){return new Ae(t)},matchMediaRefresh:function matchMediaRefresh(){return ge.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Fc()},addEventListener:function addEventListener(t,e){var r=ye[t]||(ye[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=ye[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return Z(e)?lb(e,wrap(0,e.length),t):Wa(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return Z(e)?lb(e,wrapYoyo(0,e.length-1),t):Wa(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:eb,random:hb,snap:gb,normalize:function normalize(t,e,r){return Pt(t,e,0,1,r)},getUnit:Ya,clamp:function clamp(e,r,t){return Wa(t,function(t){return Ot(e,r,t)})},splitColor:Ab,toArray:Mt,selector:cb,mapRange:Pt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ya(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),d={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if(Z(e)&&!Z(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=yt(Z(e)?[]:{},e));if(!u){for(s in i)Wt.call(d,e,s,"get",i[s]);a=function func(t){return he(t,d)||(f?e.p:e)}}}return Wa(t,a)},shuffle:db},install:P,effects:_t,ticker:Rt,updateRoot:Xt.updateRoot,plugins:pt,globalTimeline:I,core:{PropTween:_e,globals:S,Tween:$t,Timeline:Xt,Animation:Ut,getCache:fa,_removeLinkedListItem:ya,reverting:function reverting(){return L},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ha("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Se[t]=$t[t]}),Rt.add(Xt.updateRoot),d=Se.to({},{duration:0});function Jc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Lc(t,a){return{name:t,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ha(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Jc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var ze=Se.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)L?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Lc("roundProps",fb),Lc("modifiers"),Lc("snap",gb))||Se;$t.version=Xt.version=ze.version="3.12.5",o=1,x()&&Ft();function vd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function wd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function xd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function yd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function zd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Ad(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Bd(t,e,r){return t.style[e]=r}function Cd(t,e,r){return t.style.setProperty(e,r)}function Dd(t,e,r){return t._gsap[e]=r}function Ed(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Fd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Gd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Jd(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in ar&&n){if(this.tfm=this.tfm||{},"transform"===t)return dr.transform.split(",").forEach(function(t){return Jd.call(r,t,e)});if(~(t=dr[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=yr(i,t)}):this.tfm[t]=a.x?a[t]:yr(i,t),t===pr&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(cr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(pr,e,"")),t=cr}(n||e)&&this.props.push(t,e,n[t])}function Kd(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Ld(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(hr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=Be())&&t.isStart||n[cr]||(Kd(n),a.zOrigin&&n[pr]&&(n[pr]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Md(t,e){var r={target:t,props:[],revert:Ld,save:Jd};return t._gsap||ze.core.getCache(t),e&&e.split(",").forEach(function(t){return r.save(t)}),r}function Od(t,e){var r=De.createElementNS?De.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):De.createElement(t);return r&&r.style?r:De.createElement(t)}function Pd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(hr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Pd(t,mr(e)||e,1)||""}function Sd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Ee=window,De=Ee.document,Re=De.documentElement,Le=Od("div")||{style:{}},Od("div"),cr=mr(cr),pr=cr+"Origin",Le.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ye=!!mr("perspective"),Be=ze.core.reverting,Fe=1)}function Td(t){var e,r=Od("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(Re.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=Td}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),Re.removeChild(r),this.style.cssText=a,e}function Ud(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Vd(e){var r;try{r=e.getBBox()}catch(t){r=Td.call(e,!0)}return r&&(r.width||r.height)||e.getBBox===Td||(r=Td.call(e,!0)),!r||r.width||r.x||r.y?r:{x:+Ud(e,["x","cx","x1"])||0,y:+Ud(e,["y","cy","y1"])||0,width:0,height:0}}function Wd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Vd(t))}function Xd(t,e){if(e){var r,i=t.style;e in ar&&e!==pr&&(e=cr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(hr,"-$1").toLowerCase())):i.removeAttribute(e)}}function Yd(t,e,r,i,n,a){var s=new _e(t._pt,e,r,0,1,a?Ad:zd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function _d(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Le.style,f=lr.test(e),d="svg"===t.tagName.toLowerCase(),c=(d?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||gr[i]||gr[h])return u;if("px"===h||p||(u=_d(t,e,r,"px")),o=t.getCTM&&Wd(t),(_||"%"===h)&&(ar[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[c],ia(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a=~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==De&&a.appendChild||(a=De.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Rt.time&&!s.uncache)return ia(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||vr[Pd(a,"display")]||(l.position=Pd(t,"position")),a===t&&(l.position="static"),a.appendChild(Le),n=Le[c],a.removeChild(Le),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[c],m?t.style[e]=m:Xd(t,e)}return f&&_&&((s=fa(a)).time=Rt.time,s.width=a[c]),ia(p?n*u/100:n&&u?100/n*u:0)}function be(t,e,r,i){if(!r||"none"===r){var n=mr(e,t,1),a=n&&Pd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Pd(t,"borderTopColor"))}var s,o,u,h,l,f,d,c,p,_,m,g=new _e(this._pt,t.style,e,0,1,ue),v=0,y=0;if(g.b=r,g.e=i,r+="","auto"===(i+="")&&(f=t.style[e],t.style[e]=i,i=Pd(t,e)||i,f?t.style[e]=f:Xd(t,e)),Fb(s=[r,i]),i=s[1],u=(r=s[0]).match(rt)||[],(i.match(rt)||[]).length){for(;o=rt.exec(i);)d=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),d!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===d.charAt(1)&&(d=ka(h,d)+m),c=parseFloat(d),_=d.substr((c+"").length),v=rt.lastIndex-_.length,_||(_=_||q.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=_d(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:c-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Ad:zd;return nt.test(i)&&(g.e=0),this._pt=g}function de(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=Tr[r]||r,e[1]=Tr[i]||i,e.join(" ")}function ee(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],ar[r]&&(i=1,r="transformOrigin"===r?pr:cr),Xd(a,r);i&&(Xd(a,cr),u&&(u.svg&&a.removeAttribute("transform"),Or(a,1),u.uncache=1,Kd(s)))}}function ie(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function je(t){var e=Pd(t,cr);return ie(e)?wr:e.substr(7).match(et).map(ia)}function ke(t,e){var r,i,n,a,s=t._gsap||fa(t),o=t.style,u=je(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?wr:u:(u!==wr||t.offsetParent||t===Re||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,i=t.nextElementSibling,Re.appendChild(t)),u=je(t),n?o.display=n:Xd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Re.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function le(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||ke(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,c=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==wr&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Vd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=c+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[pr]="0px 0px",a&&(Yd(a,h,"xOrigin",f,w),Yd(a,h,"yOrigin",d,x),Yd(a,h,"xOffset",c,h.xOffset),Yd(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function oe(t,e,r){var i=Ya(e);return ia(parseFloat(e)+parseFloat(_d(t,"x",r+"px",i)))+i}function ve(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?sr:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new _e(t._pt,e,i,n,l,wd),o.e=f,o.u="deg",t._props.push(i),o}function we(t,e){for(var r in e)t[r]=e[r];return t}function xe(t,e,r){var i,n,a,s,o,u,h,l=we({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[cr]=e,i=Or(r,1),Xd(r,cr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[cr],f[cr]=e,i=Or(r,1),f[cr]=a),ar)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=Ya(a)!==(h=Ya(s))?_d(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new _e(t._pt,i,n,o,u-o,vd),t._pt.u=h||0,t._props.push(n));we(i,l)}var Ee,De,Re,Fe,Le,Ie,Be,Ye,qe=Lt.Power0,Ve=Lt.Power1,Ue=Lt.Power2,Xe=Lt.Power3,Ne=Lt.Power4,Ge=Lt.Linear,We=Lt.Quad,Qe=Lt.Cubic,Ke=Lt.Quart,Je=Lt.Quint,He=Lt.Strong,$e=Lt.Elastic,Ze=Lt.Back,tr=Lt.SteppedEase,er=Lt.Bounce,rr=Lt.Sine,ir=Lt.Expo,nr=Lt.Circ,ar={},sr=180/Math.PI,or=Math.PI/180,ur=Math.atan2,hr=/([A-Z])/g,lr=/(left|right|width|margin|padding|x)/i,fr=/[\s,\(]\S/,dr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cr="transform",pr=cr+"Origin",_r="O,Moz,ms,Ms,Webkit".split(","),mr=function _checkPropPrefix(t,e,r){var i=(e||Le).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(_r[n]+t in i););return n<0?null:(3===n?"ms":0<=n?_r[n]:"")+t},gr={deg:1,rad:1,turn:1},vr={grid:1,flex:1},yr=function _get(t,e,r,i){var n;return Fe||Sd(),e in dr&&"transform"!==e&&~(e=dr[e]).indexOf(",")&&(e=e.split(",")[0]),ar[e]&&"transform"!==e?(n=Or(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:kr(Pd(t,pr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=br[e]&&br[e](t,e,r)||Pd(t,e)||ga(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?_d(t,e,n,r)+r:n},Tr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},br={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new _e(t._pt,e,r,0,0,ee);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},wr=[1,0,0,1,0,0],xr={},Or=function _parseTransform(t,e){var r=t._gsap||new Vt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x,O,k,M,P,C,A,S,z,E,D,R,F=t.style,L=r.scaleX<0,I="deg",B=getComputedStyle(t),Y=Pd(t,pr)||"0";return i=n=a=u=h=l=f=d=c=0,s=o=1,r.svg=!(!t.getCTM||!Wd(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[cr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[cr]?B[cr]:"")),F.scale=F.rotate=F.translate="none"),m=ke(t,r.svg),r.svg&&(M=r.uncache?(P=t.getBBox(),Y=r.xOrigin-P.x+"px "+(r.yOrigin-P.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),le(t,M||Y,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==wr&&(T=m[0],b=m[1],w=m[2],x=m[3],i=O=m[4],n=k=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?ur(b,T)*sr:0,(f=w||x?ur(w,x)*sr+u:0)&&(o*=Math.abs(Math.cos(f*or))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(R=m[6],E=m[7],A=m[8],S=m[9],z=m[10],D=m[11],i=m[12],n=m[13],a=m[14],h=(g=ur(R,z))*sr,g&&(M=O*(v=Math.cos(-g))+A*(y=Math.sin(-g)),P=k*v+S*y,C=R*v+z*y,A=O*-y+A*v,S=k*-y+S*v,z=R*-y+z*v,D=E*-y+D*v,O=M,k=P,R=C),l=(g=ur(-w,z))*sr,g&&(v=Math.cos(-g),D=x*(y=Math.sin(-g))+D*v,T=M=T*v-A*y,b=P=b*v-S*y,w=C=w*v-z*y),u=(g=ur(b,T))*sr,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),P=O*v+k*y,b=b*v-T*y,k=k*v-O*y,T=M,O=P),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ia(Math.sqrt(T*T+b*b+w*w)),o=ia(Math.sqrt(k*k+R*R)),g=ur(O,k),f=2e-4<Math.abs(g)?g*sr:0,c=D?1/(D<0?-D:D):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!ie(Pd(t,cr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(L?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ia(s),r.scaleY=ia(o),r.rotation=ia(u)+I,r.rotationX=ia(h)+I,r.rotationY=ia(l)+I,r.skewX=f+I,r.skewY=d+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(Y.split(" ")[2])||!e&&r.zOrigin||0)&&(F[pr]=kr(Y)),r.xOffset=r.yOffset=0,r.force3D=q.force3D,r.renderTransform=r.svg?zr:Ye?Sr:Mr,r.uncache=0,r},kr=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Mr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Sr(t,e)},Pr="0deg",Cr="0px",Ar=") ",Sr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,c=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Pr||h!==Pr)){var b,w=parseFloat(h)*or,x=Math.sin(w),O=Math.cos(w);w=parseFloat(l)*or,b=Math.cos(w),a=oe(g,a,x*b*-v),s=oe(g,s,-Math.sin(w)*-v),o=oe(g,o,O*b*-v+v)}_!==Cr&&(y+="perspective("+_+Ar),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Cr&&s===Cr&&o===Cr||(y+=o!==Cr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Ar),u!==Pr&&(y+="rotate("+u+Ar),h!==Pr&&(y+="rotateY("+h+Ar),l!==Pr&&(y+="rotateX("+l+Ar),f===Pr&&d===Pr||(y+="skew("+f+", "+d+Ar),1===c&&1===p||(y+="scale("+c+", "+p+Ar),g.style[cr]=y||"translate(0, 0)"},zr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,c=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),O=parseFloat(f);d=parseFloat(d),c=parseFloat(c),(p=parseFloat(p))&&(c+=p=parseFloat(p),d+=p),d||c?(d*=or,c*=or,r=Math.cos(d)*_,i=Math.sin(d)*_,n=Math.sin(d-c)*-m,a=Math.cos(d-c)*m,c&&(p*=or,s=Math.tan(c-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ia(r),i=ia(i),n=ia(n),a=ia(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||O&&!~(f+"").indexOf("px"))&&(x=_d(g,"x",l,"px"),O=_d(g,"y",f,"px")),(v||y||T||b)&&(x=ia(x+v-(v*r+y*n)+T),O=ia(O+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ia(x+u/100*s.width),O=ia(O+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+O+")",g.setAttribute("transform",s),w&&(g.style[cr]=s)};ha("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});br[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return yr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Er,Dr,Rr,Fr={name:"css",register:Sd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w=this._props,x=t.style,O=i.vars.startAt;for(d in Fe||Sd(),this.styles=this.styles||Md(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==d&&(o=e[d],!pt[d]||!ac(d,e,i,n,t,a)))if(l=typeof o,f=br[d],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=ob(o)),f)f(this,t,d,o,i)&&(T=1);else if("--"===d.substr(0,2))s=(getComputedStyle(t).getPropertyValue(d)+"").trim(),o+="",Et.lastIndex=0,Et.test(s)||(c=Ya(s),p=Ya(o)),p?c!==p&&(s=_d(t,d,s,p)+p):c&&(o+=c),this.add(x,"setProperty",s,o,n,a,0,0,d),w.push(d),b.push(d,0,x[d]);else if("undefined"!==l){if(O&&d in O?(s="function"==typeof O[d]?O[d].call(i,n,t,a):O[d],r(s)&&~s.indexOf("random(")&&(s=ob(s)),Ya(s+"")||"auto"===s||(s+=q.units[d]||Ya(yr(t,d))||""),"="===(s+"").charAt(1)&&(s=yr(t,d))):s=yr(t,d),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),d in dr&&("autoAlpha"===d&&(1===h&&"hidden"===yr(t,"visibility")&&u&&(h=0),b.push("visibility",0,x.visibility),Yd(this,x,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==d&&"transform"!==d&&~(d=dr[d]).indexOf(",")&&(d=d.split(",")[0])),m=d in ar)if(this.styles.save(d),g||((v=t._gsap).renderTransform&&!e.parseTransform||Or(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new _e(this._pt,x,cr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===d)this._pt=new _e(this._pt,v,"scaleY",v.scaleY,(_?ka(v.scaleY,_+u):u)-v.scaleY||0,vd),this._pt.u=0,w.push("scaleY",d),d+="X";else{if("transformOrigin"===d){b.push(pr,0,x[pr]),o=de(o),v.svg?le(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&Yd(this,v,"zOrigin",v.zOrigin,p),Yd(this,x,d,kr(s),kr(o)));continue}if("svgOrigin"===d){le(t,o,1,y,0,this);continue}if(d in xr){ve(this,v,d,h,_?ka(h,_+o):o);continue}if("smoothOrigin"===d){Yd(this,v,"smooth",v.smooth,o);continue}if("force3D"===d){v[d]=o;continue}if("transform"===d){xe(this,o,t);continue}}else d in x||(d=mr(d)||d);if(m||(u||0===u)&&(h||0===h)&&!fr.test(o)&&d in x)u=u||0,(c=(s+"").substr((h+"").length))!==(p=Ya(o)||(d in q.units?q.units[d]:c))&&(h=_d(t,d,s,p)),this._pt=new _e(this._pt,m?v:x,d,h,(_?ka(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==d||!1===e.autoRound?vd:yd),this._pt.u=p||0,c!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=xd);else if(d in x)be.call(this,t,d,s,_?_+o:o);else if(d in t)this.add(t,d,s||t[d],_?_+o:o,n,a);else if("parseTransform"!==d){Q(d,o);continue}m||(d in x?b.push(d,0,x[d]):b.push(d,1,s||t[d])),w.push(d)}T&&pe(this)},render:function render(t,e){if(e.tween._time||!Be())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:yr,aliases:dr,getSetter:function getSetter(t,e,r){var i=dr[e];return i&&i.indexOf(",")<0&&(e=i),e in ar&&e!==pr&&(t._gsap.x||yr(t,"x"))?r&&Ie===r?"scale"===e?Ed:Dd:(Ie=r||{})&&("scale"===e?Fd:Gd):t.style&&!u(t.style[e])?Bd:~e.indexOf("-")?Cd:ne(t,e)},core:{_removeProperty:Xd,_getMatrix:ke}};ze.utils.checkPrefix=mr,ze.core.getStyleSaver=Md,Rr=ha((Er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Dr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){ar[t]=1}),ha(Dr,function(t){q.units[t]="deg",xr[t]=1}),dr[Rr[13]]=Er+","+Dr,ha("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");dr[e[1]]=Rr[e[0]]}),ha("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){q.units[t]="px"}),ze.registerPlugin(Fr);var Lr=ze.registerPlugin(Fr)||ze,Ir=Lr.core.Tween;e.Back=Ze,e.Bounce=er,e.CSSPlugin=Fr,e.Circ=nr,e.Cubic=Qe,e.Elastic=$e,e.Expo=ir,e.Linear=Ge,e.Power0=qe,e.Power1=Ve,e.Power2=Ue,e.Power3=Xe,e.Power4=Ne,e.Quad=We,e.Quart=Ke,e.Quint=Je,e.Sine=rr,e.SteppedEase=tr,e.Strong=He,e.TimelineLite=Xt,e.TimelineMax=Xt,e.TweenLite=$t,e.TweenMax=Ir,e.default=Lr,e.gsap=Lr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


;(function() {
  const __modules = {
  "./core/theme": function(module, exports, __require) {
    const require = (r) => __require("./core/theme", r);
'use strict';

/**
 * Authentic ByteByteGo-Caliber Dark Studio Design System (v2.0)
 * Forensically tuned to #262626 charcoal, two-layer organic corner waves,
 * translucent tinted glass cards, and crisp geometric technical typography.
 */

const PALETTES = {
  byteCharcoal: {
    bg: '#262626',
    blobOuter: '#2E2E2E',
    blobInner: '#353535',
    surface: '#1C1C1C',
    surfaceElevated: '#2A2E37',
    border: '#475569',
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#9CA3AF'
  },
  byteByteGoTrue: {
    bg: '#232323',
    blobOuter: '#2A2A2A',
    blobInner: '#313131',
    surface: '#18181B',
    surfaceElevated: '#27272A',
    border: '#475569',
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#9CA3AF'
  },
  charcoal: {
    bg: '#222222',
    blobOuter: '#2A2A2A',
    blobInner: '#313131',
    surface: '#141821',
    surfaceElevated: '#1E293B',
    border: '#334155',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8'
  },
  midnight: {
    bg: '#0F172A',
    blobOuter: '#15203B',
    blobInner: '#1E293B',
    surface: '#1E293B',
    surfaceElevated: '#334155',
    border: '#475569',
    textPrimary: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8'
  }
};

// Signature ByteByteGo Translucent Glass Tints (rgba fill + high-contrast stroke)
const GLASS_TINTS = {
  teal: {
    fill: 'rgba(24, 128, 138, 0.28)',
    headerBg: '#2A8C96',
    stroke: '#38BDF8',
    highlight: '#5EEAD4'
  },
  olive: {
    fill: 'rgba(168, 152, 48, 0.28)',
    headerBg: '#B8A428',
    stroke: '#EAB308',
    highlight: '#FEF08A'
  },
  plum: {
    fill: 'rgba(132, 68, 122, 0.28)',
    headerBg: '#8A4F80',
    stroke: '#C084FC',
    highlight: '#F5D0FE'
  },
  emerald: {
    fill: 'rgba(18, 132, 98, 0.28)',
    headerBg: '#10B981',
    stroke: '#34D399',
    highlight: '#A7F3D0'
  },
  slate: {
    fill: 'rgba(38, 72, 68, 0.52)',
    headerBg: '#6B7B3A',
    stroke: '#475569',
    highlight: '#FDE047'
  },
  crimson: {
    fill: 'rgba(153, 27, 27, 0.30)',
    headerBg: '#DC2626',
    stroke: '#F87171',
    highlight: '#FCA5A5'
  }
};

const ACCENTS = {
  cyan: { primary: '#0284C7', bright: '#38E8FF', line: '#5CE1E6', dark: '#082F49', soft: '#E0F2FE' },
  emerald: { primary: '#059669', bright: '#10B981', light: '#34D399', dark: '#022C22', mid: '#064E3B', soft: '#A7F3D0' },
  amber: { primary: '#D97706', bright: '#F59E0B', yellow: '#FACC15', dark: '#451A03', mid: '#78350F', soft: '#FEF08A' },
  purple: { primary: '#8A4F80', bright: '#A855F7', dark: '#311E2D', mid: '#701A75', soft: '#F5D0FE' },
  indigo: { primary: '#4F46E5', bright: '#6366F1', dark: '#1E1B4B', mid: '#4338CA', soft: '#C7D2FE' },
  rose: { primary: '#E11D48', bright: '#EF4444', dark: '#450A0A', mid: '#881337', soft: '#FCA5A5' }
};

const FONTS = {
  sans: '"DIN Alternate", "Bahnschrift", "Plus Jakarta Sans", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
};

/**
 * Draws the studio background with authentic organic bezier waves or atmospheric speedlines.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {string} paletteName
 * @param {object} [opts] - { backdrop: 'waves'|'speedlines'|'blueprint'|'clean', timeSec: 0 }
 */
function drawBackground(ctx, width = 1920, height = 1080, paletteName = 'byteCharcoal', opts = {}) {
  const p = PALETTES[paletteName] || PALETTES.byteCharcoal;
  const backdrop = opts.backdrop || 'waves';
  const t = opts.timeSec || 0;

  ctx.save();
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, width, height);

  if (backdrop === 'waves') {
    // Authentic ByteByteGo two-layer organic wave silhouette in bottom-right
    ctx.fillStyle = p.blobOuter;
    ctx.beginPath();
    ctx.moveTo(width * 0.56, height);
    ctx.bezierCurveTo(width * 0.58, height * 0.80, width * 0.72, height * 0.82, width * 0.77, height * 0.66);
    ctx.bezierCurveTo(width * 0.83, height * 0.48, width * 0.94, height * 0.52, width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = p.blobInner;
    ctx.beginPath();
    ctx.moveTo(width * 0.73, height);
    ctx.bezierCurveTo(width * 0.76, height * 0.88, width * 0.85, height * 0.76, width * 0.92, height * 0.80);
    ctx.bezierCurveTo(width * 0.96, height * 0.82, width * 0.98, height * 0.78, width, height * 0.76);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  } else if (backdrop === 'speedlines') {
    // Atmospheric high-speed streaks (for Evolution / Performance scenes)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      const y = ((i * 63) % (height - 160)) + 100;
      const len = 180 + (i % 5) * 90;
      const speed = 220 + (i % 4) * 80;
      const x = ((t * speed + i * 210) % (width + len)) - len;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
    }
  } else if (backdrop === 'blueprint') {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
    for (let x = 0; x < width; x += step * 4) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += step * 4) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
  } else if (backdrop === 'dotMatrix') {
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, 80, width * 0.5, height * 0.5, 920);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const step = 36;
    for (let x = 36; x < width; x += step) {
      for (let y = 110; y < height - 40; y += step) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  } else if (backdrop === 'isometric') {
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.045)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = -height; x < width + height; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height * 1.4, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height * 1.4, 0);
      ctx.stroke();
    }
  } else if (backdrop === 'spotlight') {
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.52, 40, width * 0.5, height * 0.52, 760);
    grad.addColorStop(0, 'rgba(250, 204, 21, 0.075)');
    grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.035)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (backdrop === 'splitHorizontal') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(0, height * 0.52, width, height * 0.48);
  }

  ctx.restore();
}

/**
 * Clean Top Header — Strictly NO third-party watermarks.
 * Includes optional subtle progress indicator pill on top-right.
 */
function drawTopHeader(ctx, title, chapterText = '', options = {}) {
  const width = options.width || 1920;
  const accentColor = options.accentColor || '#38BDF8';
  const marginX = options.marginX || 64;

  const cleanTitle = (title || '').replace(/\s*\([^)]*(?:whiteboard|v\d+|living|beta|preview|edition)[^)]*\)/gi, '').trim();

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 32px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(cleanTitle, marginX, 64);

  if (chapterText) {
    ctx.font = `600 16px ${FONTS.sans}`;
    const textW = ctx.measureText(chapterText).width;
    const pillW = textW + 36;
    const pillH = 34;
    const pillX = width - marginX - pillW;
    const pillY = 40;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 17);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.textAlign = 'center';
    ctx.fillText(chapterText, pillX + pillW / 2, pillY + 22.5);
  }

  // Optional thin timeline progress bar at very bottom edge
  if (typeof options.progress === 'number' && options.progress > 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 1076, width, 4);
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 1076, width * Math.min(1, options.progress), 4);
  }
  ctx.restore();
}

/**
 * Authentic ByteByteGo Translucent Glass Container (supports solid or dashed border + self-draw progress).
 */
function drawGlassCard(ctx, x, y, w, h, opts = {}) {
  const tint = GLASS_TINTS[opts.tint || 'teal'] || GLASS_TINTS.teal;
  const radius = opts.radius !== undefined ? opts.radius : 14;
  const dashed = opts.dashed !== undefined ? opts.dashed : false;
  const drawProgress = opts.progress !== undefined ? opts.progress : 1;

  if (drawProgress <= 0.01) return;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);

  if (opts.fill !== false) {
    ctx.save();
    ctx.globalAlpha *= Math.min(1, drawProgress * 1.25);
    ctx.fillStyle = opts.fillColor || tint.fill;
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = opts.strokeColor || tint.stroke;
  ctx.lineWidth = opts.lineWidth || 2;
  if (dashed) {
    ctx.setLineDash([7, 5]);
  } else if (drawProgress < 0.999) {
    const perim = 2 * (w + h);
    ctx.setLineDash([perim * drawProgress, perim]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  if (opts.badge) {
    ctx.font = `600 18px ${FONTS.sans}`;
    const bw = Math.max(150, ctx.measureText(opts.badge).width + 44);
    const bh = 38;
    let bx = x + (w - bw) / 2;
    if (opts.badgeSide === 'left') {
      bx = x + Math.min(28, Math.max(12, (w - bw) / 2));
    } else if (opts.badgeSide === 'right') {
      bx = x + w - bw - Math.min(28, Math.max(12, (w - bw) / 2));
    }
    const by = y + (opts.badgeInside ? 18 : -bh / 2);

    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 10);
    ctx.fillStyle = opts.badgeBg || tint.headerBg;
    ctx.fill();

    ctx.fillStyle = opts.badgeTextColor || '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(opts.badge, bx + bw / 2, by + 25);
  }

  if (opts.subtitle) {
    const sw = w - 44;
    const sh = 36;
    const sx = x + 22;
    const sy = y + (opts.badgeInside ? 68 : 30);

    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fill();
    ctx.strokeStyle = opts.strokeColor || tint.stroke;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = `500 14.5px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.subtitle, sx + sw / 2, sy + 23);
  }

  ctx.restore();
}

/**
 * Concise Bottom Takeaway Callout — Supports multiple visual styles:
 * variant: 'pill' (default) | 'banner' | 'terminal' | 'badge'
 */
function drawTakeawayPill(ctx, text, options = {}) {
  const canvasWidth = options.canvasWidth || 1920;
  const y = options.y || 925;
  const variant = options.variant || 'pill';
  const alpha = options.alpha !== undefined ? options.alpha : 1;

  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;

  if (variant === 'banner') {
    const accent = options.border || '#10B981';
    const tag = options.tag || 'KEY INSIGHT';
    ctx.font = `600 18px ${FONTS.sans}`;
    const textW = ctx.measureText(text).width;
    const tagW = 148;
    const w = Math.max(640, Math.min(canvasWidth - 200, textW + tagW + 76));
    const h = 52;
    const x = (canvasWidth - w) / 2;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fillStyle = options.bg || 'rgba(15, 23, 42, 0.88)';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Left accent bar + tag box
    ctx.beginPath();
    ctx.roundRect(x, y, tagW, h, [10, 0, 0, 10]);
    ctx.fillStyle = accent;
    ctx.fill();

    ctx.fillStyle = '#090D16';
    ctx.font = `700 14px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(tag, x + tagW / 2, y + h / 2 + 5);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 18px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(text, x + tagW + 24, y + h / 2 + 6);
    ctx.restore();
    return;
  }

  if (variant === 'terminal') {
    const accent = options.border || '#FACC15';
    const prefix = options.tag || '⚡ ARCHITECT RULE //';
    ctx.font = `600 17px ${FONTS.mono}`;
    const fullText = `${prefix}  ${text}`;
    const measured = ctx.measureText(fullText).width;
    const w = Math.max(620, Math.min(canvasWidth - 180, measured + 68));
    const h = 50;
    const x = (canvasWidth - w) / 2;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fillStyle = 'rgba(12, 16, 23, 0.92)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Left glowing stripe
    ctx.fillStyle = accent;
    ctx.fillRect(x, y + 6, 5, h - 12);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FEF08A';
    ctx.fillText(fullText, x + w / 2, y + h / 2 + 6);
    ctx.restore();
    return;
  }

  const bg = options.bg || 'rgba(2, 132, 199, 0.28)';
  const border = options.border || '#38BDF8';
  ctx.font = `600 19px ${FONTS.sans}`;
  const measured = ctx.measureText(text).width;
  const w = Math.max(500, Math.min(canvasWidth - 240, measured + 88));
  const h = 54;
  const x = (canvasWidth - w) / 2;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 27);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w / 2, y + h / 2 + 6.5);
  ctx.restore();
}

/**
 * Dims everything outside a spotlight rectangle to guide viewer focus.
 * Supports both drawSpotlightMask(ctx, { x, y, w, h }, strength) and drawSpotlightMask(ctx, width, height, { x, y, rx, ry, alpha }).
 */
function drawSpotlightMask(ctx, arg1, arg2 = 0.65, arg3 = 1920, arg4 = 1080) {
  let focusRect = arg1;
  let strength = arg2;
  let width = arg3;
  let height = arg4;

  if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'object' && arg3 !== null) {
    width = arg1;
    height = arg2;
    const spec = arg3;
    strength = spec.alpha !== undefined ? spec.alpha : 0.65;
    const rw = spec.w !== undefined ? spec.w : (spec.rx || 180) * 2;
    const rh = spec.h !== undefined ? spec.h : (spec.ry || 140) * 2;
    focusRect = {
      x: spec.w !== undefined ? spec.x : (spec.x || 960) - rw / 2,
      y: spec.h !== undefined ? spec.y : (spec.y || 540) - rh / 2,
      w: rw,
      h: rh,
      pad: spec.pad
    };
  }

  if (!focusRect || strength <= 0.01) return;
  const pad = focusRect.pad !== undefined ? focusRect.pad : 20;
  const rx = focusRect.x - pad;
  const ry = focusRect.y - pad;
  const rw = focusRect.w + pad * 2;
  const rh = focusRect.h + pad * 2;

  ctx.save();
  ctx.fillStyle = `rgba(18, 18, 18, ${Math.min(0.85, strength)})`;
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.roundRect(rx, ry, rw, rh, 18);
  ctx.fill('evenodd');
  ctx.restore();
}

/**
 * Broadcast Subtitles / Synchronized Voiceover Caption Bar (v4.1.1).
 * Automatically wraps long sentences cleanly into max 2 balanced lines anchored near the bottom edge
 * so subtitles NEVER overflow off-screen or collide with diagrams / takeaway pills.
 */
function drawCaptionBar(ctx, text, options = {}) {
  if (!text) return;
  const canvasWidth = options.canvasWidth || 1920;
  const bottomY = options.bottomY || 1056;
  const alpha = options.alpha !== undefined ? options.alpha : 1;
  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = `600 24px ${FONTS.sans}`;

  const maxTextW = options.maxWidth || 1360;
  const clean = String(text).replace(/\s+/g, ' ').trim();
  const words = clean.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (ctx.measureText(candidate).width <= maxTextW || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);

  // Re-balance 2 lines so line 2 isn't a lonely single word
  if (lines.length === 2 && words.length >= 6) {
    const mid = Math.ceil(words.length / 2);
    const l1 = words.slice(0, mid).join(' ');
    const l2 = words.slice(mid).join(' ');
    if (ctx.measureText(l1).width <= maxTextW && ctx.measureText(l2).width <= maxTextW) {
      lines[0] = l1;
      lines[1] = l2;
    }
  }

  const displayLines = lines.slice(0, 2);
  const lineH = 34;
  const padX = 32;
  const padY = 12;
  const maxLineW = Math.max(...displayLines.map((l) => ctx.measureText(l).width));
  const tw = Math.min(canvasWidth - 160, maxLineW + padX * 2);
  const th = displayLines.length * lineH + padY * 2 - 4;
  const tx = (canvasWidth - tw) / 2;
  const ty = options.y != null ? options.y : (bottomY - th);

  ctx.beginPath();
  ctx.roundRect(tx, ty, tw, th, 12);
  ctx.fillStyle = 'rgba(14, 17, 23, 0.90)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = options.color || '#F8FAFC';
  ctx.textAlign = 'center';
  displayLines.forEach((line, idx) => {
    ctx.fillText(line, canvasWidth / 2, ty + padY + 23 + idx * lineH);
  });
  ctx.restore();
}

/**
 * Animated Broadcast Voiceover Equalizer / Senior SA Narrator Pill.
 */
function drawSpeakerWave(ctx, timeSec = 0, options = {}) {
  const x = options.x !== undefined ? options.x : 64;
  const y = options.y !== undefined ? options.y : 988;
  const label = options.label || 'Senior SA';
  const color = options.color || '#5CE1E6';
  const alpha = options.alpha !== undefined ? options.alpha : 1;
  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = `600 14px ${FONTS.sans}`;
  const textW = ctx.measureText(label).width;
  const pillW = textW + 64;
  const pillH = 38;

  ctx.beginPath();
  ctx.roundRect(x, y, pillW, pillH, 19);
  ctx.fillStyle = 'rgba(18, 24, 32, 0.86)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(92, 225, 230, 0.35)';
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // Animated 5-bar voice waveform
  const barX0 = x + 16;
  const midY = y + pillH / 2;
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    const amp = 4 + 9 * Math.abs(Math.sin(timeSec * 7.5 + i * 1.15));
    ctx.beginPath();
    ctx.roundRect(barX0 + i * 5, midY - amp / 2, 3, amp, 1.5);
    ctx.fill();
  }

  ctx.fillStyle = '#E2E8F0';
  ctx.textAlign = 'left';
  ctx.fillText(label, x + 46, y + 24);
  ctx.restore();
}

/**
 * Sequential Beat Stage Manager — Ensures only ONE focal visual act is on screen at any moment!
 * Smoothly glides & fades the active beat in at `startSec`, animates its `progress` (0 -> 1),
 * applies continuous subtle kinetic camera breathing, provides staggered choreography helpers
 * (`stagger`, `pulse`, `countUp`), and cleanly fades out at `endSec`.
 */
function withBeat(ctx, localT, startSec, endSec, drawFn, opts = {}) {
  if (localT < startSec || localT > endSec) return;
  const fadeIn = opts.fadeIn !== undefined ? opts.fadeIn : 0.4;
  const fadeOut = opts.fadeOut !== undefined ? opts.fadeOut : 0.38;
  const drawDur = opts.drawDuration !== undefined ? opts.drawDuration : 1.1;

  const elapsed = localT - startSec;
  const beatSpan = Math.max(0.5, endSec - startSec);
  const remaining = endSec - localT;

  const rawIn = fadeIn > 0 ? Math.min(1, elapsed / fadeIn) : 1;
  const rawOut = (opts.noFadeOut || fadeOut <= 0) ? 1 : Math.min(1, remaining / fadeOut);

  // Smooth cubic ease out
  const easeIn = 1 - ((1 - rawIn) ** 3);
  const easeOut = 1 - ((1 - rawOut) ** 2);
  const alpha = Math.max(0, Math.min(1, Math.min(easeIn, easeOut)));
  if (alpha <= 0.01) return;

  const rawProg = Math.min(1, elapsed / Math.max(0.1, drawDur));
  const progress = 1 - ((1 - rawProg) ** 2.5);
  const offsetY = (1 - easeIn) * (opts.slideY !== undefined ? opts.slideY : 20);

  // Rock-solid stage by default (no continuous wobble/drift on static icons or cards; opt-in via kineticCamera: true)
  const beatRatio = Math.min(1, elapsed / beatSpan);
  const kineticScale = opts.kineticCamera === true ? (0.985 + beatRatio * 0.025) : 1;
  const kineticFloatY = 0;

  const stagger = (index = 0, delayStep = 0.48, dur = 0.68) => {
    const t = Math.max(0, elapsed - index * delayStep);
    const p = Math.min(1, t / Math.max(0.08, dur));
    return 1 - ((1 - p) ** 2.6);
  };

  // Sentence-Synced Full-Beat Reveal: spreads N visual events evenly across the beat's spoken span
  // so a new visual action triggers every ~2.2-2.8s (matching real ByteByteGo cadence) instead of dumping all at t=1s!
  const reveal = (stepIndex = 0, totalSteps = 3, dur = 0.62) => {
    const usableSpan = Math.max(1.2, beatSpan * 0.78);
    const startAt = stepIndex === 0 ? 0.12 : (0.12 + (stepIndex / Math.max(1, totalSteps)) * usableSpan);
    const t = Math.max(0, elapsed - startAt);
    const p = Math.min(1, t / Math.max(0.08, dur));
    return 1 - ((1 - p) ** 2.6);
  };

  // Returns the currently highlighted step index (0 .. totalSteps-1) as the beat progresses
  const activeStep = (totalSteps = 3) => {
    const usableSpan = Math.max(1.2, beatSpan * 0.82);
    const ratio = Math.max(0, Math.min(0.999, elapsed / usableSpan));
    return Math.floor(ratio * Math.max(1, totalSteps));
  };

  const pulse = (speed = 2.6, phase = 0) => 0.5 + 0.5 * Math.sin(elapsed * speed + phase);

  const countUp = (target, dur = 2.0, delay = 0.35) => {
    const t = Math.max(0, elapsed - delay);
    const p = Math.min(1, t / Math.max(0.1, dur));
    const eased = 1 - ((1 - p) ** 3);
    return Math.round(target * eased);
  };

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(960, 520 + offsetY + kineticFloatY);
  ctx.scale(kineticScale, kineticScale);
  ctx.translate(-960, -520);
  drawFn({ alpha, progress, beatT: elapsed, beatSpan, beatRatio, stagger, reveal, activeStep, pulse, countUp });
  ctx.restore();
}

/**
 * Forensic ByteByteGo Visual DNA Benchmark (measured via rea-video across real ByteByteGo videos:
 * HTTP1/2/3, Database ACID, Linux Boot Process).
 */
const BYTEBYTEGO_DNA = {
  ground: '#232323',
  targetCoverPct: [5.0, 12.5],
  targetNegSpacePct: [87.5, 95.0],
  microBeatSec: 3.2,
  beatDurationSec: 10.0,
  interBeatPauseSec: 0.28,
  maxHeroNodesPerBeat: 3
};

/**
 * Draws a crisp ByteByteGo-style centered beat header (title + optional subtitle)
 * safely positioned below the top chrome bar without overlapping the 1920x1080 whiteboard.
 */
function drawBeatHeader(ctx, title, subtitle = '', opts = {}) {
  const alpha = opts.alpha != null ? Math.max(0, Math.min(1, opts.alpha)) : 1;
  if (alpha <= 0.01 || !title) return;
  const accent = opts.accent || '#38BDF8';

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.textAlign = 'center';

  // Subtle accent bar above title — compact header ends cleanly at y=185 leaving y=215..955 strictly for diagrams
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(960 - 34, 96, 68, 4, 2);
  ctx.fill();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = `800 34px ${FONTS.sans}`;
  ctx.fillText(title, 960, 138);

  if (subtitle) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 20px ${FONTS.sans}`;
    ctx.fillText(subtitle, 960, 172);
  }
  ctx.restore();
}

module.exports = {
  PALETTES,
  BYTEBYTEGO_DNA,
  GLASS_TINTS,
  ACCENTS,
  FONTS,
  drawBackground,
  drawTopHeader,
  drawBeatHeader,
  drawGlassCard,
  drawTakeawayPill,
  drawSpotlightMask,
  drawCaptionBar,
  drawSpeakerWave,
  withBeat
};

  },
  "./core/camera": function(module, exports, __require) {
    const require = (r) => __require("./core/camera", r);
'use strict';

/**
 * Cinematic 2D Virtual Camera Engine (ByteByteGo After-Effects Style).
 * Enables Overview -> Smooth Zoom-In to Focus Node -> Pan Across Pipeline -> Reset to Wide.
 */

function createCameraState(width = 1920, height = 1080) {
  return {
    camX: width / 2,
    camY: height / 2,
    camZoom: 1,
    __camWidth: width,
    __camHeight: height
  };
}

/**
 * Adds a smooth camera zoom + pan tween onto a GSAP timeline.
 * @param {object} tl - GSAP timeline
 * @param {object} state - Scene state containing camX, camY, camZoom
 * @param {object} target - { x, y, zoom, duration, ease }
 * @param {number} atTime - Timeline start timestamp
 */
function zoomTo(tl, state, target, atTime) {
  return tl.to(state, {
    camX: target.x !== undefined ? target.x : 960,
    camY: target.y !== undefined ? target.y : 540,
    camZoom: target.zoom !== undefined ? target.zoom : 1.5,
    duration: target.duration !== undefined ? target.duration : 1.1,
    ease: target.ease || 'power3.inOut'
  }, atTime);
}

/**
 * Resets virtual camera smoothly back to full 1920x1080 wide framing.
 */
function reset(tl, state, atTime, duration = 1.0) {
  const w = state.__camWidth || 1920;
  const h = state.__camHeight || 1080;
  return tl.to(state, {
    camX: w / 2,
    camY: h / 2,
    camZoom: 1,
    duration,
    ease: 'power3.inOut'
  }, atTime);
}

/**
 * Applies the virtual camera transform to `ctx` around `(state.camX, state.camY)`.
 * Call before drawing world-space diagram elements; header/takeaway stay screen-space!
 */
function apply(ctx, state, width = 1920, height = 1080) {
  const cx = state.camX !== undefined ? state.camX : width / 2;
  const cy = state.camY !== undefined ? state.camY : height / 2;
  const z = state.camZoom !== undefined ? state.camZoom : 1;

  ctx.save();
  if (Math.abs(z - 1) > 0.0005 || Math.abs(cx - width / 2) > 0.5 || Math.abs(cy - height / 2) > 0.5) {
    ctx.translate(width / 2, height / 2);
    ctx.scale(z, z);
    ctx.translate(-cx, -cy);
  }
}

function restore(ctx) {
  ctx.restore();
}

module.exports = {
  createCameraState,
  zoomTo,
  reset,
  apply,
  restore
};

  },
  "./core/draw-effects": function(module, exports, __require) {
    const require = (r) => __require("./core/draw-effects", r);
'use strict';

const { FONTS } = require('./theme');

/**
 * Progressive Vector Self-Draw & Kinetic Typography Effects.
 * Replicates After Effects Trim Paths (`strokeDashoffset`) and character reveals.
 */

/**
 * Self-draws any arbitrary canvas path progressively from 0 -> 1.
 * @param {CanvasRenderingContext2D} ctx
 * @param {function} buildPathFn - Function calling ctx.moveTo / lineTo / arc / bezierCurveTo / roundRect
 * @param {number} progress - 0.0 to 1.0
 * @param {object} style - { stroke, lineWidth, fill, fillAfter, pathLength }
 */
function strokeDraw(ctx, buildPathFn, progress = 1, style = {}) {
  if (progress <= 0.005) return;
  const p = Math.min(1, progress);
  const estLen = style.pathLength || 1200;

  ctx.save();
  ctx.beginPath();
  buildPathFn(ctx);

  if (style.fill && p > (style.fillAfter !== undefined ? style.fillAfter : 0.65)) {
    const fillAlpha = Math.min(1, (p - (style.fillAfter || 0.65)) / 0.35);
    ctx.save();
    ctx.globalAlpha *= fillAlpha;
    ctx.fillStyle = style.fill;
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = style.stroke || '#5CE1E6';
  ctx.lineWidth = style.lineWidth || 2.5;
  ctx.lineCap = style.lineCap || 'round';
  ctx.lineJoin = style.lineJoin || 'round';

  if (p < 0.999) {
    ctx.setLineDash([estLen * p, estLen]);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

/**
 * Progressive character-by-character typewriter text reveal (matching ByteByteGo label reveals).
 */
function typeText(ctx, text, x, y, progress = 1, style = {}) {
  if (!text || progress <= 0.01) return;
  const count = Math.max(1, Math.ceil(text.length * Math.min(1, progress)));
  const slice = text.slice(0, count);

  ctx.save();
  ctx.fillStyle = style.color || '#FFFFFF';
  ctx.font = style.font || `600 17px ${FONTS.sans}`;
  ctx.textAlign = style.align || 'center';
  ctx.fillText(slice, x, y);
  ctx.restore();
}

/**
 * Animated two-stroke red failure cross-out `✕` (matching ByteByteGo broken link / error state).
 */
function crossOutFailure(ctx, cx, cy, progress = 1, opts = {}) {
  if (progress <= 0.01) return;
  const r = (opts.size || 38) / 2;
  const color = opts.color || '#EF4444';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = opts.lineWidth || 6;
  ctx.lineCap = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  // Stroke 1 (0 -> 0.5)
  const p1 = Math.min(1, progress * 2);
  ctx.beginPath();
  ctx.moveTo(cx - r, cy - r);
  ctx.lineTo(cx - r + 2 * r * p1, cy - r + 2 * r * p1);
  ctx.stroke();

  // Stroke 2 (0.5 -> 1.0)
  if (progress > 0.5) {
    const p2 = Math.min(1, (progress - 0.5) * 2);
    ctx.beginPath();
    ctx.moveTo(cx + r, cy - r);
    ctx.lineTo(cx + r - 2 * r * p2, cy - r + 2 * r * p2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Radial spark burst when an event / error / optimization triggers.
 */
function sparkBurst(ctx, cx, cy, progress, opts = {}) {
  if (progress <= 0.01 || progress >= 0.99) return;
  const rays = opts.rays || 8;
  const maxR = opts.radius || 46;
  const color = opts.color || '#FACC15';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha *= (1 - progress);

  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const r1 = maxR * 0.35 * progress;
    const r2 = maxR * progress;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Expanding concentric sonar/radar pulse rings behind a focal component.
 */
function sonarPulse(ctx, cx, cy, timeSec = 0, opts = {}) {
  const color = opts.color || '#38BDF8';
  const rings = opts.rings || 3;
  const minR = opts.minRadius || 36;
  const maxR = opts.maxRadius || 125;
  const speed = opts.speed || 0.7;

  ctx.save();
  ctx.strokeStyle = color;
  for (let i = 0; i < rings; i++) {
    const phase = ((timeSec * speed) + (i / rings)) % 1;
    const r = minR + (maxR - minR) * phase;
    ctx.globalAlpha = (1 - phase) * (opts.alpha || 0.42);
    ctx.lineWidth = 2.4 * (1 - phase * 0.5);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * High-velocity stream of glowing message capsules flying between two coordinates.
 */
function dataStreamParticles(ctx, x1, y1, x2, y2, timeSec = 0, opts = {}) {
  const count = opts.count || 4;
  const color = opts.color || '#34D399';
  const speed = opts.speed || 1.1;
  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.save();
  for (let i = 0; i < count; i++) {
    const p = ((timeSec * speed) + (i / count)) % 1;
    const px = x1 + (x2 - x1) * p;
    const py = y1 + (y2 - y1) * p;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(-14, -5, 28, 10, 5);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(-6, -2.5, 12, 5, 2.5);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Animated radial speedometer / throughput gauge dial with glowing needle and live counter.
 */
function liveGaugeArc(ctx, cx, cy, radius = 90, progress = 1, opts = {}) {
  const color = opts.color || '#34D399';
  const trackColor = opts.trackColor || 'rgba(51, 65, 85, 0.55)';
  const fillRatio = Math.max(0, Math.min(1, (opts.valueRatio !== undefined ? opts.valueRatio : 0.88) * progress));
  const startAngle = Math.PI * 0.8;
  const sweepAngle = Math.PI * 1.4;

  ctx.save();
  // Background track arc
  ctx.strokeStyle = trackColor;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, startAngle + sweepAngle);
  ctx.stroke();

  // Active glowing value arc
  if (fillRatio > 0.01) {
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, startAngle + sweepAngle * fillRatio);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Animated needle
  const needleAngle = startAngle + sweepAngle * fillRatio;
  const nx = cx + Math.cos(needleAngle) * (radius - 20);
  const ny = cy + Math.sin(needleAngle) * (radius - 20);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(nx, ny);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();

  if (opts.label) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 26px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.label, cx, cy + radius * 0.55);
  }
  if (opts.sub) {
    ctx.fillStyle = color;
    ctx.font = `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.sub, cx, cy + radius * 0.82);
  }
  ctx.restore();
}

module.exports = {
  strokeDraw,
  typeText,
  crossOutFailure,
  sparkBurst,
  sonarPulse,
  dataStreamParticles,
  liveGaugeArc
};

  },
  "./core/layout": function(module, exports, __require) {
    const require = (r) => __require("./core/layout", r);
'use strict';

/**
 * Mathematical Layout & Symmetry Engine.
 * Eliminates off-center pipelines, asymmetric margins, and transform leaks.
 */

/**
 * Centers a multi-stage horizontal pipeline across the canvas width.
 * @param {number[]} widths - Width of each stage in pixels, e.g. [280, 360, 310, 340]
 * @param {object} [opts]
 * @param {number} [opts.gap=110] - Connector gap between stages
 * @param {number} [opts.canvasWidth=1920]
 * @param {number} [opts.centerY=450]
 * @param {number} [opts.height=360]
 * @returns {{ stages: Array<{x:number, y:number, w:number, h:number, cx:number, cy:number, right:number}>, connectors: Array<{x1:number, y1:number, x2:number, y2:number}>, marginX: number }}
 */
function horizontalPipeline(widths, opts = {}) {
  const gap = opts.gap !== undefined ? opts.gap : 110;
  const canvasWidth = opts.canvasWidth || 1920;
  const centerY = opts.centerY || 450;
  const defaultH = opts.height || 360;
  const heights = opts.heights || widths.map(() => defaultH);

  const totalStagesWidth = widths.reduce((sum, w) => sum + w, 0);
  const totalGapsWidth = Math.max(0, widths.length - 1) * gap;
  const totalWidth = totalStagesWidth + totalGapsWidth;
  const marginX = Math.round((canvasWidth - totalWidth) / 2);

  const stages = [];
  const connectors = [];
  let cursorX = marginX;

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const h = heights[i];
    const x = cursorX;
    const y = Math.round(centerY - h / 2);
    stages.push({
      index: i,
      x,
      y,
      w,
      h,
      cx: Math.round(x + w / 2),
      cy: centerY,
      right: x + w
    });

    if (i < widths.length - 1) {
      connectors.push({
        x1: x + w,
        y1: centerY,
        x2: x + w + gap,
        y2: centerY
      });
    }
    cursorX += w + gap;
  }

  return { stages, connectors, marginX, totalWidth };
}

/**
 * Symmetrical Left vs Right split layout (e.g. Stack vs Heap, Client vs Server).
 */
function splitColumns(leftWidth = 460, rightWidth = 460, opts = {}) {
  const gap = opts.gap !== undefined ? opts.gap : 520;
  const canvasWidth = opts.canvasWidth || 1920;
  const centerY = opts.centerY || 480;
  const height = opts.height || 440;

  const totalWidth = leftWidth + gap + rightWidth;
  const marginX = Math.round((canvasWidth - totalWidth) / 2);
  const y = Math.round(centerY - height / 2);

  const left = {
    x: marginX,
    y,
    w: leftWidth,
    h: height,
    cx: Math.round(marginX + leftWidth / 2),
    cy: centerY,
    right: marginX + leftWidth
  };

  const rightX = marginX + leftWidth + gap;
  const right = {
    x: rightX,
    y,
    w: rightWidth,
    h: height,
    cx: Math.round(rightX + rightWidth / 2),
    cy: centerY,
    right: rightX + rightWidth
  };

  return {
    left,
    right,
    bridge: { x1: left.right, y1: centerY, x2: right.x, y2: centerY },
    marginX
  };
}

/**
 * Calculates vertical Y targets centered around centerY for 1 -> N fan-out trees.
 */
function fanOutTargets(count, opts = {}) {
  const centerY = opts.centerY || 450;
  const spacing = opts.spacing || 150;
  const targetX = opts.targetX || 1300;
  const targetWidth = opts.targetWidth || 320;

  const totalSpan = (count - 1) * spacing;
  const startY = centerY - totalSpan / 2;

  return Array.from({ length: count }, (_, i) => {
    const cy = Math.round(startY + i * spacing);
    return {
      index: i,
      x: targetX,
      cy,
      cx: Math.round(targetX + targetWidth / 2),
      w: targetWidth
    };
  });
}

/**
 * Safe scale/fade wrapper around a pivot point (cx, cy).
 */
function scaleAround(ctx, cx, cy, scale, drawFn, alpha = 1) {
  if (scale <= 0.001 || alpha <= 0.001) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-cx, -cy);
  drawFn();
  ctx.restore();
}

module.exports = {
  horizontalPipeline,
  splitColumns,
  fanOutTargets,
  scaleAround
};

  },
  "./core/connectors": function(module, exports, __require) {
    const require = (r) => __require("./core/connectors", r);
'use strict';

const { FONTS } = require('./theme');

function drawArrowhead(ctx, x, y, angle, headlen = 12) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), y - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function drawConnectorLabel(ctx, label, mx, my, dx, dy, opts = {}) {
  const len = Math.hypot(dx, dy) || 1;
  const isDiagonal = Math.abs(dy) > 18 && Math.abs(dx) > 18;
  const offset = opts.labelOffset !== undefined ? opts.labelOffset : (isDiagonal ? -18 : -14);

  // Use upward normal vector so label always sits cleanly above horizontal or diagonal lines
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }

  const lx = isDiagonal ? mx + nx * Math.abs(offset) : mx;
  const ly = isDiagonal ? my + ny * Math.abs(offset) : my + offset;

  ctx.save();
  ctx.font = opts.labelFont || `600 15.5px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (opts.labelBg !== false && isDiagonal) {
    const tw = ctx.measureText(label).width + 16;
    const th = 24;
    ctx.fillStyle = 'rgba(38, 38, 38, 0.88)';
    ctx.beginPath();
    ctx.roundRect(lx - tw / 2, ly - th / 2, tw, th, 6);
    ctx.fill();
  }

  ctx.fillStyle = opts.labelColor || opts.color || '#FFFFFF';
  ctx.fillText(label, lx, isDiagonal ? ly : ly - 2);
  ctx.restore();
}

/**
 * Traveling data packet comet train along a linear connector segment.
 */
function pulseOrb(ctx, x1, y1, x2, y2, timeSec = 0, opts = {}) {
  const color = opts.color || '#38BDF8';
  const speed = opts.speed || 1.25;
  const offset = opts.phase || 0;
  const count = opts.orbs !== undefined ? opts.orbs : 2;
  const liveT = timeSec || (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : 0);

  ctx.save();
  for (let i = 0; i < count; i++) {
    const p = ((liveT * speed) + offset + (i / count)) % 1.0;
    const px = x1 + (x2 - x1) * p;
    const py = y1 + (y2 - y1) * p;

    // Subtle trailing tail
    const tailP = Math.max(0, p - 0.08);
    const tx = x1 + (x2 - x1) * tailP;
    const ty = y1 + (y2 - y1) * tailP;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Outer halo
    ctx.beginPath();
    ctx.arc(px, py, 8.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.42;
    ctx.fill();

    // Inner bright core
    ctx.beginPath();
    ctx.arc(px, py, 4.2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 1.0;
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Crisp ByteByteGo Arrow: Origin dot o──────▶ Clean Arrowhead (supports solid or dashed + optional traveling packet).
 */
function solidArrow(ctx, x1, y1, x2, y2, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#FFFFFF';
  const lw = opts.lineWidth || 2.5;
  const label = opts.label || '';
  const dashed = Boolean(opts.dashed);
  const p = Math.min(1, progress);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false && opts.startDot !== false) {
    ctx.beginPath();
    ctx.arc(x1, y1, 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const curX = x1 + (x2 - x1) * p;
  const curY = y1 + (y2 - y1) * p;

  ctx.beginPath();
  if (dashed) {
    ctx.setLineDash(opts.dash || [7, 5]);
  }
  ctx.moveTo(x1, y1);
  ctx.lineTo(curX, curY);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = Math.atan2(y2 - y1, x2 - x1);
  drawArrowhead(ctx, curX, curY, angle, 11.5);

  if (label && p > 0.35) {
    drawConnectorLabel(ctx, label, (x1 + x2) / 2, (y1 + y2) / 2, x2 - x1, y2 - y1, {
      ...opts,
      color
    });
  }
  ctx.restore();

  const liveT = opts.timeSec !== undefined
    ? opts.timeSec
    : (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : undefined);

  if (liveT !== undefined && p > 0.75 && opts.packets !== false) {
    pulseOrb(ctx, x1, y1, x2, y2, liveT, {
      color: opts.orbColor || color,
      speed: opts.speed,
      orbs: opts.orbs
    });
  }
}

/**
 * Signature Dashed ByteByteGo Arrow: Origin dot o- - - -▶ Clean Arrowhead.
 */
function dashedArrow(ctx, x1, y1, x2, y2, opts = {}) {
  return solidArrow(ctx, x1, y1, x2, y2, {
    ...opts,
    color: opts.color || '#38BDF8',
    dashed: true
  });
}

/**
 * One-call animated Flow Arrow (draws progressive arrow + live traveling packet orb).
 */
function flowArrow(ctx, x1, y1, x2, y2, timeSec = 0, opts = {}) {
  return solidArrow(ctx, x1, y1, x2, y2, {
    ...opts,
    timeSec
  });
}

/**
 * Quadratic Bezier Curved Arrow for feedback loops, retries, and cache look-aside paths.
 */
function curvedArrow(ctx, x1, y1, x2, y2, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#5CE1E6';
  const lw = opts.lineWidth || 2.5;
  const curvature = opts.curvature !== undefined ? opts.curvature : 0.25;
  const dashed = Boolean(opts.dashed);
  const p = Math.min(1, progress);

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = opts.cpX !== undefined ? opts.cpX : mx - dy * curvature;
  const cy = opts.cpY !== undefined ? opts.cpY : my + dx * curvature;

  const estLen = Math.hypot(dx, dy) * (1 + Math.abs(curvature) * 0.65);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false) {
    ctx.beginPath();
    ctx.arc(x1, y1, 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  if (dashed) {
    ctx.setLineDash([7, 5]);
  } else if (p < 0.999) {
    ctx.setLineDash([estLen * p, estLen]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Compute point and tangent at progress p on quadratic Bezier
  const u = 1 - p;
  const tipX = u * u * x1 + 2 * u * p * cx + p * p * x2;
  const tipY = u * u * y1 + 2 * u * p * cy + p * p * y2;
  const tx = 2 * u * (cx - x1) + 2 * p * (x2 - cx);
  const ty = 2 * u * (cy - y1) + 2 * p * (y2 - cy);
  drawArrowhead(ctx, tipX, tipY, Math.atan2(ty, tx), 11.5);

  if (opts.label && p > 0.45) {
    const peakX = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
    const peakY = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
    drawConnectorLabel(ctx, opts.label, peakX, peakY, dx, dy, {
      ...opts,
      labelBg: true,
      labelOffset: curvature >= 0 ? 18 : -18,
      color
    });
  }
  ctx.restore();
}

/**
 * Orthogonal Rounded-Corner Elbow Connector: o───┐
 *                                               └───▶
 * Prevents diagonal line crossings in complex architecture diagrams!
 */
function elbowArrow(ctx, points, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (!points || points.length < 2 || progress <= 0.01) return;

  const color = opts.color || '#FFFFFF';
  const lw = opts.lineWidth || 2.5;
  const radius = opts.radius !== undefined ? opts.radius : 12;
  const dashed = Boolean(opts.dashed);

  let totalLen = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalLen += Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false) {
    ctx.beginPath();
    ctx.arc(points[0][0], points[0][1], 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    ctx.arcTo(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], radius);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last[0], last[1]);

  if (dashed) {
    ctx.setLineDash([7, 5]);
  } else if (progress < 0.999) {
    ctx.setLineDash([totalLen * progress, totalLen]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  if (progress >= 0.95) {
    const prev = points[points.length - 2];
    const angle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
    drawArrowhead(ctx, last[0], last[1], angle, 11.5);
  }

  if (opts.label && progress > 0.5) {
    const midIdx = Math.floor((points.length - 1) / 2);
    const mx = (points[midIdx][0] + points[midIdx + 1][0]) / 2;
    const my = (points[midIdx][1] + points[midIdx + 1][1]) / 2;
    ctx.font = `600 14.5px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.label, mx, my - 10);
  }
  ctx.restore();
}

/**
 * Glowing fiber-optic pointer laser beam.
 */
function laserBeam(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#38BDF8';
  const label = opts.label || '';
  const p = Math.min(1, progress);
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x1, y1, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -(timeSec || 0) * 48;
  ctx.moveTo(x1, y1);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.setLineDash([]);

  if (p >= 0.95) {
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x2, y2, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (label && p > 0.5) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.font = `bold 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 16);
  }
  ctx.restore();
}

/**
 * Dual Request / Response arrows (supports both ByteByteGo crisp solid white lines and dashed mode).
 */
function bidirectional(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const gap = opts.gap || 16;
  const solid = opts.solid !== undefined ? opts.solid : true;
  const reqColor = opts.reqColor || (solid ? '#FFFFFF' : '#38BDF8');
  const resColor = opts.resColor || (solid ? '#FFFFFF' : '#10B981');
  const reqProgress = opts.reqProgress !== undefined ? opts.reqProgress : 1;
  const resProgress = opts.resProgress !== undefined ? opts.resProgress : 1;
  const fn = solid ? solidArrow : dashedArrow;

  fn(ctx, x1, y1 - gap, x2, y2 - gap, {
    progress: reqProgress,
    color: reqColor,
    label: opts.reqLabel || '',
    labelOffset: -12
  });
  if (reqProgress > 0.85 && opts.packets !== false) {
    pulseOrb(ctx, x1, y1 - gap, x2, y2 - gap, timeSec, { color: '#38BDF8' });
  }

  fn(ctx, x2, y2 + gap, x1, y1 + gap, {
    progress: resProgress,
    color: resColor,
    dashed: opts.resDashed !== undefined ? opts.resDashed : !solid,
    label: opts.resLabel || '',
    labelOffset: 24
  });
  if (resProgress > 0.85 && opts.packets !== false) {
    pulseOrb(ctx, x2, y2 + gap, x1, y1 + gap, timeSec, { color: '#10B981', phase: 0.5 });
  }
}

module.exports = {
  solidArrow,
  dashedArrow,
  flowArrow,
  curvedArrow,
  elbowArrow,
  pulseOrb,
  laserBeam,
  bidirectional
};

  },
  "./core/icons": function(module, exports, __require) {
    const require = (r) => __require("./core/icons", r);
'use strict';

const BUILTIN_SVGS = {
  javaLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M38,78 C38,78 48,82 62,78 C70,75 75,70 70,66 C65,62 55,64 45,67 C35,70 30,75 38,78 Z" fill="#5382A1"/><path d="M34,88 C34,88 46,92 64,88 C76,85 82,78 76,73 C70,68 56,71 44,75 C32,79 26,85 34,88 Z" fill="#E76F00"/><path d="M52,15 C45,30 38,42 48,55 C52,45 55,36 50,22 C48,18 52,15 52,15 Z" fill="#E76F00"/><path d="M60,25 C54,38 48,48 58,60 C62,50 64,42 59,31 C57,27 60,25 60,25 Z" fill="#5382A1"/><path d="M32,95 C45,99 68,99 82,95 C74,98 56,101 32,95 Z" fill="#E76F00"/></svg>`,
  coffeeMug: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M22,35 L26,82 C26,88 32,92 38,92 L62,92 C68,92 74,88 74,82 L78,35 Z" fill="#0284C7" stroke="#38BDF8" stroke-width="4"/><path d="M78,45 C86,45 92,52 92,60 C92,68 86,75 76,75" fill="none" stroke="#38BDF8" stroke-width="5" stroke-linecap="round"/><path d="M38,24 C36,18 42,12 38,6" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><path d="M50,26 C48,20 54,14 50,8" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><path d="M62,24 C60,18 66,12 62,6" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="35" rx="28" ry="8" fill="#0369A1" stroke="#38BDF8" stroke-width="3"/></svg>`,
  gear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="28" fill="#F59E0B"/><circle cx="50" cy="50" r="12" fill="#1E1E1E"/><g fill="#F59E0B"><rect x="44" y="6" width="12" height="16" rx="3"/><rect x="44" y="78" width="12" height="16" rx="3"/><rect x="6" y="44" width="16" height="12" rx="3"/><rect x="78" y="44" width="16" height="12" rx="3"/><rect x="18" y="18" width="16" height="12" rx="3" transform="rotate(45 26 24)"/><rect x="66" y="66" width="16" height="12" rx="3" transform="rotate(45 74 72)"/><rect x="66" y="18" width="16" height="12" rx="3" transform="rotate(-45 74 24)"/><rect x="18" y="66" width="16" height="12" rx="3" transform="rotate(-45 26 72)"/></g></svg>`,
  shieldGuard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,6 L88,22 C88,60 72,86 50,96 C28,86 12,60 12,22 Z" fill="#065F46" stroke="#10B981" stroke-width="4"/><path d="M32,50 L45,64 L72,34" fill="none" stroke="#34D399" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  droneBot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><ellipse cx="60" cy="45" rx="32" ry="20" fill="#10B981" stroke="#34D399" stroke-width="3"/><circle cx="60" cy="42" r="12" fill="#064E3B"/><circle cx="60" cy="42" r="6" fill="#6EE7B7"/><path d="M28,45 L10,30 M92,45 L110,30" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/><ellipse cx="10" cy="30" rx="14" ry="4" fill="#64748B"/><ellipse cx="110" cy="30" rx="14" ry="4" fill="#64748B"/><path d="M48,65 L38,82 M72,65 L82,82" stroke="#64748B" stroke-width="3" stroke-linecap="round"/><ellipse cx="38" cy="82" rx="6" ry="2" fill="#10B981"/><ellipse cx="82" cy="82" rx="6" ry="2" fill="#10B981"/><path d="M50,62 L30,96 L90,96 L70,62 Z" fill="#34D399" opacity="0.25"/></svg>`,
  flameNitro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,4 C50,4 70,32 70,58 C70,80 58,96 50,96 C42,96 30,80 30,58 C30,32 50,4 50,4 Z" fill="#DC2626"/><path d="M50,24 C50,24 63,44 63,64 C63,78 56,86 50,86 C44,86 37,78 37,64 C37,44 50,24 50,24 Z" fill="#F59E0B"/><path d="M50,46 C50,46 56,58 56,68 C56,76 53,80 50,80 C47,80 44,76 44,68 C44,58 50,46 50,46 Z" fill="#FEF08A"/><polygon points="46,60 54,60 50,74" fill="#FFFFFF"/></svg>`,
  turboMeter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><path d="M15,70 A40,40 0 1,1 85,70" fill="none" stroke="#334155" stroke-width="10" stroke-linecap="round"/><path d="M15,70 A40,40 0 0,1 65,33" fill="none" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/><path d="M65,33 A40,40 0 0,1 85,70" fill="none" stroke="#EF4444" stroke-width="10" stroke-linecap="round"/><circle cx="50" cy="70" r="8" fill="#F8FAFC"/><line x1="50" y1="70" x2="72" y2="40" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/></svg>`,
  cpuSilicon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><g stroke="#F59E0B" stroke-width="3" stroke-linecap="round"><line x1="30" y1="5" x2="30" y2="18"/><line x1="55" y1="5" x2="55" y2="18"/><line x1="85" y1="5" x2="85" y2="18"/><line x1="110" y1="5" x2="110" y2="18"/><line x1="30" y1="122" x2="30" y2="135"/><line x1="55" y1="122" x2="55" y2="135"/><line x1="85" y1="122" x2="85" y2="135"/><line x1="110" y1="122" x2="110" y2="135"/><line x1="5" y1="30" x2="18" y2="30"/><line x1="5" y1="55" x2="18" y2="55"/><line x1="5" y1="85" x2="18" y2="85"/><line x1="5" y1="110" x2="18" y2="110"/><line x1="122" y1="30" x2="135" y2="30"/><line x1="122" y1="55" x2="135" y2="55"/><line x1="122" y1="85" x2="135" y2="85"/><line x1="122" y1="110" x2="135" y2="110"/></g><rect x="18" y="18" width="104" height="104" rx="12" fill="#1E293B" stroke="#64748B" stroke-width="3"/><rect x="36" y="36" width="68" height="68" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5"/><text x="70" y="76" font-family="-apple-system, sans-serif" font-weight="bold" font-size="22" fill="#F59E0B" text-anchor="middle">CPU</text></svg>`,
  userAvatar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#0284C7"/><circle cx="50" cy="38" r="18" fill="#F8FAFC"/><path d="M22,82 C22,64 36,58 50,58 C64,58 78,64 78,82 Z" fill="#F8FAFC"/></svg>`,
  winOS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><path fill="#00ADEF" d="M0,12.5 L36,7.5 L36,42 L0,42 Z M40,7 L88,0 L88,42 L40,42 Z M0,46 L36,46 L36,80.5 L0,75.5 Z M40,46 L88,46 L88,88 L40,81 Z"/></svg>`,
  linuxPenguin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="28" ry="32" fill="#FFFFFF" stroke="#000000" stroke-width="4"/><ellipse cx="50" cy="58" rx="20" ry="24" fill="#F8FAFC"/><circle cx="50" cy="25" r="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/><circle cx="43" cy="22" r="4" fill="#000000"/><circle cx="57" cy="22" r="4" fill="#000000"/><polygon points="46,28 54,28 50,36" fill="#F59E0B"/><ellipse cx="32" cy="85" rx="14" ry="7" fill="#F59E0B"/><ellipse cx="68" cy="85" rx="14" ry="7" fill="#F59E0B"/></svg>`,
  appleLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><path fill="#FFFFFF" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.81-11.72-14.33-6.42-10.13-11.38-21.57-14.88-34.33-3.51-12.76-5.26-24.38-5.26-34.86 0-14.04 3.51-25.59 10.53-34.65 7.02-9.06 15.82-13.69 26.4-13.88 4.8 0 10.18 1.25 16.14 3.75 5.96 2.5 9.75 3.8 11.37 3.9 1.84 0 5.8-1.4 11.88-4.2 6.08-2.8 11.28-4.1 15.6-3.9 11.53.5 20.8 4.8 27.81 12.9-10.03 6.1-15 14.5-14.9 25.2.1 8.3 3.3 15.4 9.6 21.3 6.3 5.9 13.9 9.3 22.8 10.2-1.8 5.7-4.1 11.5-6.9 17.4zM119.22 33.15c0-7.2 2.6-13.9 7.8-20.1 5.2-6.2 11.7-10.2 19.5-12.05-.1 1.2-.3 2.5-.6 3.9-.7 4.1-2.3 8.3-4.8 12.6-2.5 4.3-5.9 7.7-10.2 10.2-4.3 2.5-8.2 4-11.7 4.5v-.95z"/></svg>`,
  dockerContainer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="14" y="34" width="72" height="44" rx="6" fill="#0284C7" stroke="#38BDF8" stroke-width="3"/><line x1="32" y1="34" x2="32" y2="78" stroke="#38BDF8" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="78" stroke="#38BDF8" stroke-width="3"/><line x1="68" y1="34" x2="68" y2="78" stroke="#38BDF8" stroke-width="3"/><rect x="26" y="18" width="16" height="14" rx="2" fill="#38BDF8"/><rect x="46" y="18" width="16" height="14" rx="2" fill="#38BDF8"/></svg>`,
  lockGold: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M32,44 L32,30 C32,18 68,18 68,30 L68,44" fill="none" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/><rect x="22" y="44" width="56" height="44" rx="10" fill="#D97706" stroke="#FEF08A" stroke-width="3"/><circle cx="50" cy="64" r="6" fill="#1E1E1E"/></svg>`,
  cloudNode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><path d="M32,74 L90,74 C104,74 112,64 112,52 C112,41 103,32 92,31 C88,16 74,8 58,8 C40,8 26,20 24,37 C13,39 6,48 6,58 C6,68 16,74 32,74 Z" fill="#0369A1" stroke="#38BDF8" stroke-width="3.5"/></svg>`,
  lightningBolt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="56,6 22,54 48,54 42,94 78,44 52,44" fill="#F59E0B" stroke="#FEF08A" stroke-width="3" stroke-linejoin="round"/></svg>`,
  globeNet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#082F49" stroke="#38BDF8" stroke-width="3.5"/><ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="#38BDF8" stroke-width="2.5"/><line x1="10" y1="50" x2="90" y2="50" stroke="#38BDF8" stroke-width="2.5"/><line x1="16" y1="30" x2="84" y2="30" stroke="#38BDF8" stroke-width="2"/><line x1="16" y1="70" x2="84" y2="70" stroke="#38BDF8" stroke-width="2"/></svg>`,
  kafkaLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="#5CE1E6" stroke-width="5" fill="#1E293B"><line x1="36" y1="50" x2="66" y2="26"/><line x1="36" y1="50" x2="66" y2="74"/><line x1="36" y1="50" x2="36" y2="18"/><line x1="36" y1="50" x2="36" y2="82"/><circle cx="36" cy="50" r="14" fill="#0284C7"/><circle cx="36" cy="16" r="9"/><circle cx="36" cy="84" r="9"/><circle cx="68" cy="24" r="10"/><circle cx="68" cy="76" r="10"/></g></svg>`,
  redisCube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,14 88,32 50,50 12,32" fill="#EF4444" stroke="#FCA5A5" stroke-width="2.5"/><polygon points="12,48 50,66 88,48 88,58 50,76 12,58" fill="#DC2626"/><polygon points="12,66 50,84 88,66 88,76 50,94 12,76" fill="#991B1B"/><circle cx="50" cy="31" r="6" fill="#FEF08A"/></svg>`,
  postgresElephant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M24,36 C24,18 42,12 56,14 C72,16 82,28 80,46 C78,64 70,84 58,84 C52,84 52,66 54,56 C44,62 32,58 26,48 Z" fill="#0284C7" stroke="#7DD3FC" stroke-width="3.5"/><circle cx="62" cy="34" r="4.5" fill="#FFFFFF"/><path d="M54,54 C58,58 66,58 72,52" fill="none" stroke="#BAE6FD" stroke-width="3" stroke-linecap="round"/></svg>`,
  kubernetesWheel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,6 88,26 94,68 68,94 32,94 6,68 12,26" fill="#1D4ED8" stroke="#60A5FA" stroke-width="3.5"/><circle cx="50" cy="52" r="22" fill="none" stroke="#FFFFFF" stroke-width="4.5"/><circle cx="50" cy="52" r="7" fill="#FFFFFF"/><g stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"><line x1="50" y1="20" x2="50" y2="84"/><line x1="20" y1="36" x2="80" y2="68"/><line x1="20" y1="68" x2="80" y2="36"/></g></svg>`,
  rustGear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" fill="none" stroke="#F97316" stroke-width="10" stroke-dasharray="12 6"/><circle cx="50" cy="50" r="26" fill="#1E1E1E" stroke="#FB923C" stroke-width="3"/><text x="50" y="61" font-family="-apple-system, sans-serif" font-weight="900" font-size="34" fill="#F97316" text-anchor="middle">R</text></svg>`,
  goGopher: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="20" y="18" width="60" height="68" rx="30" fill="#06B6D4" stroke="#67E8F9" stroke-width="3.5"/><circle cx="38" cy="40" r="9" fill="#FFFFFF"/><circle cx="62" cy="40" r="9" fill="#FFFFFF"/><circle cx="40" cy="40" r="4" fill="#0F172A"/><circle cx="60" cy="40" r="4" fill="#0F172A"/><ellipse cx="50" cy="54" rx="8" ry="5" fill="#FDE047"/><rect x="45" y="58" width="4" height="7" rx="1" fill="#FFFFFF"/><rect x="51" y="58" width="4" height="7" rx="1" fill="#FFFFFF"/></svg>`,
  hardDiskPlatter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="14" y="12" width="72" height="76" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="3.5"/><circle cx="50" cy="46" r="24" fill="#1E293B" stroke="#7DD3FC" stroke-width="3"/><circle cx="50" cy="46" r="8" fill="#38BDF8"/><path d="M50,28 A18,18 0 0,1 68,46" fill="none" stroke="#34D399" stroke-width="3" stroke-linecap="round"/><polygon points="26,74 48,52 53,57 32,78" fill="#FACC15"/><circle cx="28" cy="76" r="5" fill="#F59E0B"/></svg>`,
  ramChip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="24" width="100" height="46" rx="8" fill="#064E3B" stroke="#34D399" stroke-width="3.5"/><rect x="22" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><rect x="50" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><rect x="78" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><g fill="#FACC15"><rect x="18" y="70" width="8" height="10" rx="1"/><rect x="32" y="70" width="8" height="10" rx="1"/><rect x="46" y="70" width="8" height="10" rx="1"/><rect x="66" y="70" width="8" height="10" rx="1"/><rect x="80" y="70" width="8" height="10" rx="1"/><rect x="94" y="70" width="8" height="10" rx="1"/></g></svg>`,
  networkCardNic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="16" y="22" width="88" height="54" rx="8" fill="#0C4A6E" stroke="#38BDF8" stroke-width="3.5"/><rect x="34" y="34" width="34" height="28" rx="5" fill="#0F172A" stroke="#5CE1E6" stroke-width="2.5"/><circle cx="84" cy="38" r="5" fill="#4ADE80"/><circle cx="84" cy="54" r="5" fill="#FACC15"/><path d="M16,32 L6,32 L6,66 L16,66" fill="none" stroke="#94A3B8" stroke-width="4"/><rect x="28" y="76" width="44" height="10" rx="2" fill="#FACC15"/></svg>`,
  rocketBoost: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,10 C68,26 72,52 68,70 L32,70 C28,52 32,26 50,10 Z" fill="#38BDF8" stroke="#E0F2FE" stroke-width="3"/><circle cx="50" cy="42" r="10" fill="#0F172A" stroke="#FACC15" stroke-width="3"/><polygon points="32,54 16,74 32,70" fill="#F43F5E"/><polygon points="68,54 84,74 68,70" fill="#F43F5E"/><path d="M38,72 L50,94 L62,72 Z" fill="#FACC15"/><path d="M43,72 L50,86 L57,72 Z" fill="#FEF08A"/></svg>`,
  magnifyingGlass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="44" cy="44" r="26" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="6"/><line x1="63" y1="63" x2="86" y2="86" stroke="#FACC15" stroke-width="9" stroke-linecap="round"/><path d="M32,36 A14,14 0 0,1 52,32" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></svg>`,
  boxArchive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="16" y="28" width="68" height="56" rx="8" fill="#4C1D95" stroke="#C084FC" stroke-width="3.5"/><rect x="12" y="16" width="76" height="16" rx="5" fill="#6D28D9" stroke="#E9D5FF" stroke-width="3"/><rect x="44" y="16" width="12" height="68" fill="#FACC15" opacity="0.85"/><rect x="38" y="46" width="24" height="14" rx="4" fill="#0F172A" stroke="#FACC15" stroke-width="2"/></svg>`,
  checkShield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#064E3B" stroke="#34D399" stroke-width="4"/><path d="M32,52 L45,65 L70,36" fill="none" stroke="#4ADE80" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warningAlert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,12 90,84 10,84" fill="#7F1D1D" stroke="#F87171" stroke-width="4" stroke-linejoin="round"/><line x1="50" y1="38" x2="50" y2="60" stroke="#FEF08A" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="73" r="4.5" fill="#FEF08A"/></svg>`,
  codeFile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M22,10 L62,10 L82,30 L82,90 L22,90 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="4" stroke-linejoin="round"/><path d="M62,10 L62,30 L82,30" fill="#0369A1" stroke="#38BDF8" stroke-width="3.5" stroke-linejoin="round"/><polyline points="42,50 32,60 42,70" fill="none" stroke="#7DD3FC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="62,50 72,60 62,70" fill="none" stroke="#7DD3FC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="56" y1="46" x2="48" y2="74" stroke="#FACC15" stroke-width="4.5" stroke-linecap="round"/></svg>`,
  binaryFile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M22,10 L62,10 L82,30 L82,90 L22,90 Z" fill="#064E3B" stroke="#34D399" stroke-width="4" stroke-linejoin="round"/><path d="M62,10 L62,30 L82,30" fill="#047857" stroke="#34D399" stroke-width="3.5" stroke-linejoin="round"/><text x="52" y="58" font-family="monospace" font-weight="900" font-size="22" fill="#6EE7B7" text-anchor="middle">0101</text><text x="52" y="78" font-family="monospace" font-weight="900" font-size="18" fill="#FACC15" text-anchor="middle">CAFE</text></svg>`,
  stackLayers: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,14 88,32 50,50 12,32" fill="#0284C7" stroke="#7DD3FC" stroke-width="3.5" stroke-linejoin="round"/><polyline points="12,50 50,68 88,50" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12,68 50,86 88,68" fill="none" stroke="#34D399" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trashSweep: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="24" y="28" width="52" height="58" rx="8" fill="#7F1D1D" stroke="#F87171" stroke-width="4"/><line x1="16" y1="28" x2="84" y2="28" stroke="#FCA5A5" stroke-width="6" stroke-linecap="round"/><path d="M38,28 L38,18 C38,14 62,14 62,18 L62,28" fill="none" stroke="#FCA5A5" stroke-width="4.5"/><line x1="40" y1="42" x2="40" y2="72" stroke="#FCA5A5" stroke-width="4.5" stroke-linecap="round"/><line x1="50" y1="42" x2="50" y2="72" stroke="#FCA5A5" stroke-width="4.5" stroke-linecap="round"/><line x1="60" y1="42" x2="60" y2="72" stroke="#FCA5A5" stroke-width="4.5" stroke-linecap="round"/></svg>`,
  databaseStack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="24" rx="34" ry="12" fill="#6D28D9" stroke="#C4B5FD" stroke-width="3.5"/><path d="M16,24 L16,74 C16,81 31,86 50,86 C69,86 84,81 84,74 L84,24" fill="#4C1D95" stroke="#C4B5FD" stroke-width="3.5"/><path d="M16,49 C16,56 31,61 50,61 C69,61 84,56 84,49" fill="none" stroke="#A78BFA" stroke-width="3.5"/><ellipse cx="50" cy="24" rx="34" ry="12" fill="#7C3AED" stroke="#DDD6FE" stroke-width="3"/></svg>`,
  serverRack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="16" y="14" width="68" height="22" rx="5" fill="#1E293B" stroke="#38BDF8" stroke-width="3.5"/><circle cx="30" cy="25" r="4" fill="#34D399"/><line x1="44" y1="25" x2="72" y2="25" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/><rect x="16" y="42" width="68" height="22" rx="5" fill="#1E293B" stroke="#38BDF8" stroke-width="3.5"/><circle cx="30" cy="53" r="4" fill="#FACC15"/><line x1="44" y1="53" x2="72" y2="53" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/><rect x="16" y="70" width="68" height="22" rx="5" fill="#1E293B" stroke="#38BDF8" stroke-width="3.5"/><circle cx="30" cy="81" r="4" fill="#34D399"/><line x1="44" y1="81" x2="72" y2="81" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/></svg>`
};

const imageCache = {};
const pendingPromises = [];

function register(name, svgMarkup) {
  BUILTIN_SVGS[name] = svgMarkup;
  if (typeof Image !== 'undefined') {
    const p = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);
      imageCache[name] = img;
    });
    pendingPromises.push(p);
  }
}

function initBuiltinIcons() {
  if (typeof Image === 'undefined') return Promise.resolve();
  for (const [key, svg] of Object.entries(BUILTIN_SVGS)) {
    if (!imageCache[key]) {
      register(key, svg);
    }
  }
  return Promise.all(pendingPromises);
}

function get(name) {
  return imageCache[name] || null;
}

/**
 * Ergonomic helper to draw a registered SVG icon centered at (cx, cy),
 * with automatic continuous kinetic floating, sonar pulse rings, and rotation physics.
 */
function draw(ctx, name, cx, cy, size = 48, opts = {}) {
  const img = get(name);
  if (!img) return false;
  const alpha = opts.alpha !== undefined ? opts.alpha : 1;
  if (alpha <= 0.01) return false;

  const liveT = opts.timeSec !== undefined
    ? opts.timeSec
    : (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : 0);

  // Static icons & logos stay rock-solid by default (opt-in `animate: true` or `spin: true` only)
  const animate = opts.animate === true;
  const phase = opts.phase || ((cx * 0.013 + cy * 0.017) % 6.28);
  const floatY = animate ? Math.sin(liveT * 2.4 + phase) * (opts.floatAmp !== undefined ? opts.floatAmp : 3.5) : 0;

  ctx.save();
  ctx.globalAlpha *= alpha;

  ctx.translate(cx, cy + floatY);
  if (opts.spin === true) {
    ctx.rotate(liveT * (opts.spinSpeed || 0.9));
  }

  if (opts.glowColor) {
    ctx.shadowColor = opts.glowColor;
    ctx.shadowBlur = opts.glowBlur || 12;
  }
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
  return true;
}

/**
 * Draws an expressive animated icon inside a glowing circular medallion with an orbiting particle
 * and an optional bold title + subtitle below. Ideal for uncluttered, high-impact visual scenes.
 */
function drawBadge(ctx, name, cx, cy, size = 110, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return false;

  const liveT = opts.timeSec !== undefined
    ? opts.timeSec
    : (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : 0);

  const color = opts.color || '#38BDF8';
  const bg = opts.bg || 'rgba(15, 23, 42, 0.92)';
  const radius = size * 0.68;
  const phase = opts.phase || ((cx * 0.011 + cy * 0.019) % 6.28);

  // Overshoot pop-in scale
  const p = Math.min(1, progress);
  const popScale = p < 0.75
    ? (p / 0.75) * 1.08
    : 1.08 - ((p - 0.75) / 0.25) * 0.08;

  ctx.save();
  ctx.globalAlpha *= p;
  ctx.translate(cx, cy);
  ctx.scale(popScale, popScale);

  // Outer expanding radar ripple
  const ripplePhase = (liveT * 0.75 + phase * 0.2) % 1;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha *= (1 - ripplePhase) * 0.5;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(0, 0, radius + ripplePhase * 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Glowing medallion circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Rotating dashed tech ring inside medallion
  ctx.save();
  ctx.rotate(liveT * 0.65 + phase);
  ctx.strokeStyle = color;
  ctx.globalAlpha *= 0.45;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Orbiting energy particle on medallion rim
  const orbitAngle = liveT * 2.2 + phase;
  const ox = Math.cos(orbitAngle) * radius;
  const oy = Math.sin(orbitAngle) * radius;
  ctx.save();
  ctx.fillStyle = '#FACC15';
  ctx.shadowColor = '#FACC15';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(ox, oy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw the icon inside
  draw(ctx, name, 0, 0, size * 0.74, {
    glowColor: color,
    pulseRing: false,
    timeSec: liveT,
    phase
  });

  // Optional top tag pill
  if (opts.tag) {
    ctx.font = '800 13px "JetBrains Mono", monospace';
    const tw = Math.max(96, ctx.measureText(opts.tag).width + 24);
    ctx.beginPath();
    ctx.roundRect(-tw / 2, -radius - 20, tw, 26, 13);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = '#090D16';
    ctx.textAlign = 'center';
    ctx.fillText(opts.tag, 0, -radius - 3);
  }

  // Optional title & subtitle below
  if (opts.title) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 23px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(opts.title, 0, radius + 38);
  }
  if (opts.sub) {
    ctx.fillStyle = opts.subColor || color;
    ctx.font = '600 16.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(opts.sub, 0, radius + 66);
  }

  ctx.restore();
  return true;
}

function listNames() {
  return Object.keys(BUILTIN_SVGS);
}

module.exports = {
  BUILTIN_SVGS,
  register,
  initBuiltinIcons,
  get,
  draw,
  drawBadge,
  listNames
};

  },
  "./core/whiteboard": function(module, exports, __require) {
    const require = (r) => __require("./core/whiteboard", r);
'use strict';

/**
 * TechVideoStudio v4.0.0 — Composable Living Whiteboard & Causal Choreography Engine
 *
 * Instead of wiping the screen between hardcoded slide templates, ByteByteGo videos
 * work like a living architectural whiteboard:
 *   - Actors (servers, DBs, queues, caches, memory bars, code blocks, groups, icons)
 *     persist on a continuous 1920x1080 canvas across multiple narration beats.
 *   - Causal Actions execute on a normalized (p: 0..1) or second-based (at) timeline:
 *       spawn, connect, packet, mutate, focus, resetCamera, spotlight, callout, appendItem
 *   - Packets physically travel along edges and trigger state mutations on arrival.
 *   - Camera smoothly zooms/pans to inspect internal mechanics, then pulls back out.
 */

const Theme = require('./theme');
const Camera = require('./camera');
const Effects = require('./draw-effects');
const Connectors = require('./connectors');
const Icons = require('./icons');

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function easeOutCubic(t) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutCubic(t) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutBack(t) {
  const x = clamp01(t);
  const c1 = 1.45;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/**
 * Resolve an action's start time (seconds) and duration (seconds) against total duration.
 * Supports either `at` (absolute seconds) or `p` (0..1 fraction of totalDuration).
 */
function resolveActionTiming(action, totalDuration) {
  const dur = Math.max(0.15, action.dur != null ? action.dur : (action.pDur != null ? action.pDur * totalDuration : 0.75));
  let start = 0;
  if (action.at != null) {
    start = action.at;
  } else if (action.p != null) {
    start = action.p * totalDuration;
  }
  return { start, dur, end: start + dur };
}

/**
 * Compute anchor point on an actor's bounding box facing another actor.
 */
function getActorBounds(actor) {
  const w = actor.w || (actor.kind === 'icon' ? 160 : actor.kind === 'pill' ? 260 : 380);
  const h = actor.h || (actor.kind === 'icon' ? 160 : actor.kind === 'pill' ? 76 : 210);
  return {
    cx: actor.x,
    cy: actor.y,
    x: actor.x - w / 2,
    y: actor.y - h / 2,
    w,
    h
  };
}

function getEdgeEndpoints(fromActor, toActor, pad = 10) {
  const a = getActorBounds(fromActor);
  const b = getActorBounds(toActor);
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const dir = dx >= 0 ? 1 : -1;
    return {
      x1: a.cx + dir * (a.w / 2 + pad),
      y1: a.cy,
      x2: b.cx - dir * (b.w / 2 + pad),
      y2: b.cy
    };
  }
  const dir = dy >= 0 ? 1 : -1;
  return {
    x1: a.cx,
    y1: a.cy + dir * (a.h / 2 + pad),
    x2: b.cx,
    y2: b.cy - dir * (b.h / 2 + pad)
  };
}

/**
 * Evaluate the complete deterministic state of the whiteboard at time `t` (in seconds).
 * Pure function of (spec, t, totalDuration) — guarantees 100% frame-exact FFmpeg renders.
 */
function evaluateWhiteboardState(spec, t, totalDuration) {
  const safeDur = Math.max(1, totalDuration || 10);
  const actors = new Map();
  const baseActors = Array.isArray(spec.actors) ? spec.actors : [];

  for (const raw of baseActors) {
    const initiallyVisible = raw.initial === true || (raw.spawnAt == null && raw.spawnP == null && !(spec.actions || []).some((a) => a.type === 'spawn' && a.target === raw.id));
    let spawnP = initiallyVisible ? 1 : 0;
    if (raw.spawnAt != null) {
      spawnP = clamp01((t - raw.spawnAt) / (raw.spawnDur || 0.55));
    } else if (raw.spawnP != null) {
      spawnP = clamp01((t - raw.spawnP * safeDur) / (raw.spawnDur || 0.55));
    }
    actors.set(raw.id, {
      ...raw,
      items: Array.isArray(raw.items) ? raw.items.slice() : [],
      spawnProgress: spawnP,
      alpha: 1,
      spotlight: false,
      crossOutProgress: 0,
      pulseAt: null,
      meter: raw.meter != null ? raw.meter : null,
      badge: raw.badge || null,
      badgeColor: raw.badgeColor || raw.color || '#38BDF8',
      borderColor: raw.borderColor || raw.color || '#E5E7EB',
      fillColor: raw.fillColor || null,
      status: raw.status || null,
      sub: raw.sub || ''
    });
  }

  const edges = [];
  const baseEdges = Array.isArray(spec.edges) ? spec.edges : [];
  for (const e of baseEdges) {
    const start = e.at != null ? e.at : (e.p != null ? e.p * safeDur : 0);
    const dur = e.dur || 0.5;
    const progress = clamp01((t - start) / dur);
    edges.push({ ...e, progress });
  }

  const activePackets = [];
  const activeCallouts = [];
  const sparks = [];

  // Camera state (defaults to full 1920x1080 center view)
  let camX = 960;
  let camY = 540;
  let camZoom = 1.0;

  // Spotlight tracking (last active spotlight wins)
  let spotlightTargets = null;
  let spotlightDim = 0.58;

  const actions = Array.isArray(spec.actions) ? spec.actions : [];
  for (const action of actions) {
    const { start, dur, end } = resolveActionTiming(action, safeDur);

    if (action.type === 'spawn') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        actor.spawnProgress = Math.max(actor.spawnProgress, clamp01((t - start) / dur));
      }
      continue;
    }

    if (action.type === 'connect') {
      if (t >= start) {
        const progress = clamp01((t - start) / dur);
        edges.push({
          from: action.from,
          to: action.to,
          label: action.label || '',
          color: action.color || '#FFFFFF',
          style: action.style || 'solid',
          curve: action.curve,
          dashed: action.dashed,
          progress
        });
      }
      continue;
    }

    if (action.type === 'packet') {
      const count = Math.max(1, action.count || 1);
      const stagger = action.stagger != null ? action.stagger : 0.28;
      for (let i = 0; i < count; i++) {
        const pStart = start + i * stagger;
        const pEnd = pStart + dur;
        if (t >= pStart && t <= pEnd) {
          activePackets.push({
            from: action.from,
            to: action.to,
            label: action.label || '',
            color: action.color || '#FACC15',
            progress: easeInOutCubic((t - pStart) / dur),
            curve: action.curve
          });
        }
        // Arrival spark & subtle target highlight right as packet lands
        if (action.sparkOnArrive !== false && t >= pEnd && t <= pEnd + 0.55) {
          const toActor = actors.get(action.to);
          if (toActor) {
            sparks.push({
              x: toActor.x,
              y: toActor.y,
              progress: clamp01((t - pEnd) / 0.55),
              color: action.color || '#34D399'
            });
          }
        }
      }
      continue;
    }

    if (action.type === 'mutate') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        const mProg = clamp01((t - start) / Math.max(0.25, dur));
        if (action.badge !== undefined) actor.badge = action.badge;
        if (action.badgeColor) actor.badgeColor = action.badgeColor;
        if (action.borderColor) actor.borderColor = action.borderColor;
        if (action.fillColor) actor.fillColor = action.fillColor;
        if (action.sub !== undefined) actor.sub = action.sub;
        if (action.label !== undefined) actor.label = action.label;
        if (action.status !== undefined) actor.status = action.status;
        if (action.meter != null) {
          const fromMeter = actor.meter != null ? actor.meter : 0;
          actor.meter = fromMeter + (action.meter - fromMeter) * easeOutCubic(mProg);
        }
        if (action.crossOut) {
          actor.crossOutProgress = Math.max(actor.crossOutProgress, mProg);
        }
        if (t <= start + 0.6) {
          actor.pulseAt = clamp01((t - start) / 0.6);
        }
      }
      continue;
    }

    if (action.type === 'appendItem') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        actor.items.push({
          text: action.text || '',
          color: action.color || '#E5E7EB',
          progress: clamp01((t - start) / Math.max(0.25, dur))
        });
      }
      continue;
    }

    if (action.type === 'spotlight') {
      if (t >= start && (action.until == null || t <= action.until) && (action.pUntil == null || t <= action.pUntil * safeDur)) {
        spotlightTargets = new Set(Array.isArray(action.targets) ? action.targets : [action.target]);
        spotlightDim = action.dimAlpha != null ? action.dimAlpha : 0.62;
      }
      continue;
    }

    if (action.type === 'clearSpotlight') {
      if (t >= start) spotlightTargets = null;
      continue;
    }

    if (action.type === 'callout') {
      const callEnd = action.until != null ? action.until : (action.pUntil != null ? action.pUntil * safeDur : end);
      if (t >= start && t <= callEnd) {
        const enterP = clamp01((t - start) / 0.35);
        const exitP = t > callEnd - 0.3 ? clamp01((callEnd - t) / 0.3) : 1;
        activeCallouts.push({
          target: action.target,
          x: action.x,
          y: action.y,
          text: action.text || '',
          side: action.side || 'top',
          color: action.color || '#FACC15',
          alpha: Math.min(enterP, exitP),
          progress: enterP
        });
      }
      continue;
    }

    if (action.type === 'focus') {
      if (t >= start) {
        const fProg = easeInOutCubic(clamp01((t - start) / dur));
        let tx = action.x != null ? action.x : 960;
        let ty = action.y != null ? action.y : 540;
        if (action.target && actors.has(action.target)) {
          const a = actors.get(action.target);
          tx = a.x;
          ty = a.y;
        }
        const tz = action.zoom != null ? action.zoom : 1.32;
        camX = camX + (tx - camX) * fProg;
        camY = camY + (ty - camY) * fProg;
        camZoom = camZoom + (tz - camZoom) * fProg;
      }
      continue;
    }

    if (action.type === 'resetCamera') {
      if (t >= start) {
        const rProg = easeInOutCubic(clamp01((t - start) / dur));
        camX = camX + (960 - camX) * rProg;
        camY = camY + (540 - camY) * rProg;
        camZoom = camZoom + (1.0 - camZoom) * rProg;
      }
      continue;
    }
  }

  // Apply spotlight dimming
  if (spotlightTargets) {
    for (const [id, actor] of actors.entries()) {
      if (spotlightTargets.has(id)) {
        actor.spotlight = true;
        actor.alpha = 1;
      } else if (actor.kind !== 'group') {
        actor.alpha = spotlightDim;
      }
    }
  }

  return {
    actors,
    edges,
    activePackets,
    activeCallouts,
    sparks,
    camera: { x: camX, y: camY, zoom: camZoom }
  };
}

/**
 * Draw a single actor according to its `kind`.
 */
function drawActor(ctx, actor, t) {
  if (actor.spawnProgress <= 0.01) return;
  const p = actor.spawnProgress;
  const scale = actor.kind === 'group' ? 1 : (0.86 + 0.14 * easeOutBack(p));
  const b = getActorBounds(actor);

  ctx.save();
  ctx.globalAlpha = clamp01(p * 1.4) * actor.alpha;
  ctx.translate(b.cx, b.cy);
  ctx.scale(scale, scale);
  ctx.translate(-b.cx, -b.cy);

  const strokeCol = actor.status === 'error'
    ? '#F87171'
    : actor.status === 'hot'
      ? '#FB923C'
      : actor.status === 'ok'
        ? '#34D399'
        : actor.borderColor;

  // 1. Dashed Architectural Group Container (label pill sits cleanly ON top border — never floats into header!)
  if (actor.kind === 'group') {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, 18);
    ctx.fillStyle = actor.fillColor || 'rgba(255,255,255,0.025)';
    ctx.fill();
    ctx.setLineDash([14, 10]);
    ctx.strokeStyle = strokeCol || 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    if (actor.label) {
      ctx.font = `800 22px ${Theme.FONTS.sans}`;
      const hasGrpIcon = Boolean(actor.icon);
      const labelW = ctx.measureText(actor.label).width;
      const pillW = labelW + (hasGrpIcon ? 64 : 32);
      const pillH = 38;
      const pillX = b.x + 24;
      const pillY = b.y - pillH / 2;

      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 10);
      ctx.fillStyle = '#232323';
      ctx.fill();
      ctx.strokeStyle = strokeCol || 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      if (hasGrpIcon) {
        Icons.draw(ctx, actor.icon, pillX + 24, b.y, 24, { animate: false });
      }
      ctx.fillStyle = strokeCol || '#E5E7EB';
      ctx.textAlign = 'left';
      ctx.fillText(actor.label, pillX + (hasGrpIcon ? 44 : 16), b.y + 8);
    }
    ctx.restore();
    ctx.restore();
    return;
  }

  // 2. Icon Medallion Actor (zero wobble — rock solid)
  if (actor.kind === 'icon') {
    if (actor.spotlight) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.cx, b.cy, Math.max(b.w, b.h) * 0.56, 0, Math.PI * 2);
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 4;
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
    }
    Icons.drawBadge(ctx, actor.icon || 'cpuSilicon', b.cx, b.cy, Math.min(b.w, b.h) * 0.5, {
      color: strokeCol,
      tag: actor.badge,
      title: actor.label,
      sub: actor.sub,
      progress: p,
      timeSec: t
    });
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: Math.min(b.w, b.h) * 0.42 });
    }
    ctx.restore();
    return;
  }

  // 3. Pill Actor (ByteByteGo crisp rounded pill with optional crisp icon)
  if (actor.kind === 'pill') {
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, b.h / 2);
    ctx.fillStyle = actor.fillColor || (actor.spotlight ? 'rgba(16, 185, 129, 0.25)' : 'rgba(20, 24, 30, 0.94)');
    ctx.fill();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
    if (actor.spotlight) {
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 16;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    if (actor.icon) {
      const iconSize = Math.min(38, b.h * 0.58);
      const labelW = ctx.measureText(actor.label || '').width;
      const totalW = iconSize + 14 + labelW;
      const startX = b.cx - totalW / 2;
      Icons.draw(ctx, actor.icon, startX + iconSize / 2, b.cy, iconSize, { animate: false });
      ctx.textAlign = 'left';
      ctx.fillText(actor.label || '', startX + iconSize + 14, b.cy + 8);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(actor.label || '', b.cx, b.cy + 8);
    }
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: b.h * 0.48 });
    }
    ctx.restore();
    return;
  }

  // 4. Cylinder Database / Storage Actor (with optional icon + generous spacing)
  if (actor.kind === 'cylinder') {
    const ry = 22;
    ctx.fillStyle = actor.fillColor || '#2C2C2C';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
    if (actor.spotlight) {
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 18;
    }
    // Body
    ctx.beginPath();
    ctx.moveTo(b.x, b.y + ry);
    ctx.lineTo(b.x, b.y + b.h - ry);
    ctx.ellipse(b.cx, b.y + b.h - ry, b.w / 2, ry, 0, Math.PI, 0, true);
    ctx.lineTo(b.x + b.w, b.y + ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Top cap
    ctx.beginPath();
    ctx.ellipse(b.cx, b.y + ry, b.w / 2, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#343434';
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    const hasCylIcon = Boolean(actor.icon);
    const labelY = hasCylIcon ? b.cy + 24 : b.cy + 6;
    if (hasCylIcon) {
      Icons.draw(ctx, actor.icon, b.cx, b.cy - 22, 46, { animate: false });
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(actor.label || '', b.cx, labelY);
    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.fillText(actor.sub, b.cx, labelY + 32);
    }
    if (actor.badge) {
      drawActorBadge(ctx, b.x + b.w - 10, b.y - 6, actor.badge, actor.badgeColor);
    }
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: 46 });
    }
    ctx.restore();
    return;
  }

  // 5. Visual-First Architectural Card / Memory Bar / Code Block Actor (generous spacing, zero cramped text!)
  ctx.beginPath();
  ctx.roundRect(b.x, b.y, b.w, b.h, 16);
  ctx.fillStyle = actor.fillColor || (actor.kind === 'code' ? '#181C22' : '#2A2D34');
  ctx.fill();
  ctx.strokeStyle = strokeCol;
  ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
  if (actor.spotlight) {
    ctx.shadowColor = strokeCol;
    ctx.shadowBlur = 18;
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  const hasIcon = Boolean(actor.icon);
  const hasItems = Array.isArray(actor.items) && actor.items.length > 0;
  const hasMeter = actor.meter != null;
  const hasLogoStrip = Array.isArray(actor.icons) && actor.icons.length > 0;

  // Mode A: Hero Icon Card (clean visual icon centered above title + sub — ByteByteGo visual-first standard!)
  if (hasIcon && !hasItems && !hasMeter && !hasLogoStrip) {
    const iconSize = Math.min(68, b.h * 0.38);
    const iconCy = b.y + b.h * 0.34;

    // Soft circular icon medallion
    ctx.save();
    ctx.beginPath();
    ctx.arc(b.cx, iconCy, iconSize * 0.68, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fill();
    ctx.strokeStyle = strokeCol;
    ctx.globalAlpha *= 0.45;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    Icons.draw(ctx, actor.icon, b.cx, iconCy, iconSize, { animate: false });

    const titleY = iconCy + iconSize * 0.68 + 34;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 25px ${Theme.FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(actor.label || '', b.cx, titleY);

    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.fillText(actor.sub, b.cx, titleY + 32);
    }
  } else {
    // Mode B: Structured Header + Generous Spacing + Divider + Items / Meter / Multi-Logo Strip
    const headerPadTop = 26;
    const iconBadgeSize = 46;
    const textLeftX = hasIcon ? b.x + 88 : b.cx;
    const titleY = b.y + headerPadTop + 22;

    if (hasIcon) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x + 48, b.y + headerPadTop + 26, 28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
      ctx.restore();
      Icons.draw(ctx, actor.icon, b.x + 48, b.y + headerPadTop + 26, iconBadgeSize, { animate: false });
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    ctx.textAlign = hasIcon ? 'left' : 'center';
    ctx.fillText(actor.label || '', textLeftX, titleY);

    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.textAlign = hasIcon ? 'left' : 'center';
      ctx.fillText(actor.sub, textLeftX, titleY + 32);
    }

    // Subtle divider between header and body content
    const dividerY = b.y + (actor.sub ? 96 : 76);
    if (hasItems || hasLogoStrip) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(b.x + 22, dividerY);
      ctx.lineTo(b.x + b.w - 22, dividerY);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // Dynamic appended items with airy 38px vertical rhythm
    if (hasItems) {
      const startY = dividerY + 36;
      const rowH = 38;
      actor.items.slice(0, 6).forEach((item, idx) => {
        const text = typeof item === 'string' ? item : item.text;
        const col = typeof item === 'string' ? '#E5E7EB' : (item.color || '#E5E7EB');
        const itemP = typeof item === 'string' ? 1 : (item.progress != null ? item.progress : 1);
        ctx.save();
        ctx.globalAlpha *= itemP;
        ctx.fillStyle = col;
        ctx.font = `600 20px ${actor.kind === 'code' ? Theme.FONTS.mono : Theme.FONTS.sans}`;
        ctx.textAlign = 'left';
        ctx.fillText(text, b.x + 26, startY + idx * rowH);
        ctx.restore();
      });
    }

    // Multi-Logo Strip (e.g. Linux + Apple + Windows logos for cross-platform clarity!)
    if (hasLogoStrip) {
      const logos = actor.icons.slice(0, 5);
      const logoSize = 36;
      const gap = 26;
      const stripW = logos.length * logoSize + (logos.length - 1) * gap;
      const stripStartX = b.cx - stripW / 2 + logoSize / 2;
      const stripY = b.y + b.h - 36;
      logos.forEach((iconName, idx) => {
        Icons.draw(ctx, iconName, stripStartX + idx * (logoSize + gap), stripY, logoSize, { animate: false });
      });
    }

    // Live fill meter (for Heap / Eden / Queue / CPU load)
    if (hasMeter) {
      const padX = 24;
      const barW = b.w - padX * 2;
      const barH = 26;
      const barY = b.y + b.h - 46;
      ctx.beginPath();
      ctx.roundRect(b.x + padX, barY, barW, barH, 8);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      const fillW = Math.max(0, barW * clamp01(actor.meter));
      if (fillW > 2) {
        const mCol = actor.meter > 0.85 ? '#F87171' : (actor.meter > 0.6 ? '#FACC15' : '#34D399');
        ctx.beginPath();
        ctx.roundRect(b.x + padX, barY, fillW, barH, 8);
        ctx.fillStyle = mCol;
        ctx.fill();
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 16px ${Theme.FONTS.mono}`;
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(clamp01(actor.meter) * 100)}%`, b.x + b.w - padX - 8, barY + 19);
    }
  }

  // Status badge pill on top-right corner
  if (actor.badge) {
    drawActorBadge(ctx, b.x + b.w - 12, b.y - 4, actor.badge, actor.badgeColor);
  }

  // Mutation pulse ring
  if (actor.pulseAt != null && actor.pulseAt < 1) {
    ctx.save();
    ctx.globalAlpha *= (1 - actor.pulseAt) * 0.7;
    ctx.beginPath();
    ctx.roundRect(b.x - 8 * actor.pulseAt, b.y - 8 * actor.pulseAt, b.w + 16 * actor.pulseAt, b.h + 16 * actor.pulseAt, 18);
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();
  }

  if (actor.crossOutProgress > 0.02) {
    Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: Math.min(b.w, b.h) * 0.36 });
  }

  ctx.restore();
}

function drawActorBadge(ctx, rightX, topY, text, color) {
  ctx.save();
  ctx.font = `800 17px ${Theme.FONTS.mono}`;
  const tw = ctx.measureText(text).width + 24;
  const bh = 32;
  ctx.beginPath();
  ctx.roundRect(rightX - tw, topY - bh / 2, tw, bh, 16);
  ctx.fillStyle = color || '#38BDF8';
  ctx.fill();
  ctx.fillStyle = '#0B1120';
  ctx.textAlign = 'center';
  ctx.fillText(text, rightX - tw / 2, topY + 6);
  ctx.restore();
}

/**
 * Draw an animated flying packet along the edge between two actors.
 */
function drawPacket(ctx, fromActor, toActor, packet) {
  const ep = getEdgeEndpoints(fromActor, toActor, 8);
  let px, py;
  if (packet.curve) {
    const mx = (ep.x1 + ep.x2) / 2;
    const my = (ep.y1 + ep.y2) / 2 + packet.curve;
    const u = 1 - packet.progress;
    px = u * u * ep.x1 + 2 * u * packet.progress * mx + packet.progress * packet.progress * ep.x2;
    py = u * u * ep.y1 + 2 * u * packet.progress * my + packet.progress * packet.progress * ep.y2;
  } else {
    px = ep.x1 + (ep.x2 - ep.x1) * packet.progress;
    py = ep.y1 + (ep.y2 - ep.y1) * packet.progress;
  }

  ctx.save();
  const label = packet.label || '';
  ctx.font = `800 18px ${Theme.FONTS.mono}`;
  const pw = Math.max(46, ctx.measureText(label).width + 28);
  const ph = 36;

  ctx.shadowColor = packet.color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.roundRect(px - pw / 2, py - ph / 2, pw, ph, 18);
  ctx.fillStyle = packet.color;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = '#18181B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  if (label) {
    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.fillText(label, px, py + 6);
  }
  ctx.restore();
}

/**
 * Draw a crisp ByteByteGo-style callout annotation pointing cleanly to an actor's OUTER border
 * (never stabbing through card text or overlapping top status badges!).
 */
function drawCallout(ctx, callout, actors) {
  let tx = callout.x || 960;
  let ty = callout.y || 540;
  let edgeX = tx;
  let edgeY = ty;
  let cx = tx;
  let cy = ty - 110;
  const bh = 52;

  if (callout.target && actors.has(callout.target)) {
    const targetActor = actors.get(callout.target);
    const b = getActorBounds(targetActor);
    tx = b.cx;
    ty = b.cy;
    const extraBadgeClear = targetActor.badge ? 22 : 0;
    if (callout.side === 'bottom') {
      edgeX = b.cx;
      edgeY = b.y + b.h + 6;
      cx = b.cx;
      cy = edgeY + 56;
    } else if (callout.side === 'left') {
      edgeX = b.x - 6;
      edgeY = b.cy;
      cx = edgeX - 180;
      cy = b.cy;
    } else if (callout.side === 'right') {
      edgeX = b.x + b.w + 6;
      edgeY = b.cy;
      cx = edgeX + 180;
      cy = b.cy;
    } else {
      edgeX = b.cx;
      edgeY = b.y - 6 - extraBadgeClear * 0.4;
      cx = b.cx;
      cy = edgeY - 58 - extraBadgeClear * 0.5;
    }
  }

  ctx.save();
  ctx.globalAlpha = callout.alpha;
  ctx.font = `700 21px ${Theme.FONTS.sans}`;
  const tw = ctx.measureText(callout.text).width + 44;

  // Stem connects pill edge neatly to actor outer border — ZERO overlap with text!
  let stemStartX = cx;
  let stemStartY = cy;
  if (cy < edgeY) stemStartY = cy + bh / 2;
  else if (cy > edgeY) stemStartY = cy - bh / 2;
  else if (cx < edgeX) stemStartX = cx + tw / 2;
  else stemStartX = cx - tw / 2;

  ctx.beginPath();
  ctx.moveTo(stemStartX, stemStartY);
  ctx.lineTo(edgeX, edgeY);
  ctx.strokeStyle = callout.color;
  ctx.lineWidth = 3;
  ctx.setLineDash([7, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Anchor dot on target outer edge
  ctx.beginPath();
  ctx.arc(edgeX, edgeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = callout.color;
  ctx.fill();

  // Callout pill
  ctx.beginPath();
  ctx.roundRect(cx - tw / 2, cy - bh / 2, tw, bh, 14);
  ctx.fillStyle = '#181C22';
  ctx.fill();
  ctx.strokeStyle = callout.color;
  ctx.lineWidth = 2.8;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(callout.text, cx, cy + 7);
  ctx.restore();
}

/**
 * Render a complete Composable Whiteboard scene at time `t` (in seconds).
 * Enforces a strict Safe Diagram Stage (y = 198..960) so zoomed cameras NEVER collide with the beat header!
 */
function renderScene(ctx, spec, t, totalDuration, opts = {}) {
  const state = evaluateWhiteboardState(spec, t, totalDuration);

  // Optional beat header (drawn in screen space before camera transform)
  if (spec.title && opts.drawHeader !== false) {
    Theme.drawBeatHeader(ctx, spec.title, spec.subtitle || '', {
      alpha: clamp01(t / 0.35),
      accent: spec.accent || '#38BDF8'
    });
  }

  // Strict Safe Diagram Stage Clip + Stage-Centered Camera Transform (y = 198..960, centerY = 580)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 198, 1920, 765);
  ctx.clip();

  const z = state.camera.zoom || 1;
  const cx = state.camera.x != null ? state.camera.x : 960;
  const cy = state.camera.y != null ? state.camera.y : 580;
  if (Math.abs(z - 1) > 0.0005 || Math.abs(cx - 960) > 0.5 || Math.abs(cy - 580) > 0.5) {
    // Pivot zoomed framing around the safe stage center (960, 580) instead of raw 540 so zoomed objects stay well clear of the header!
    const stageCenterY = Math.abs(z - 1) > 0.01 ? 585 : 540;
    ctx.translate(960, stageCenterY);
    ctx.scale(z, z);
    ctx.translate(-cx, -(Math.abs(z - 1) > 0.01 ? cy : 540));
  }

  // Layer 1: Group containers (behind everything)
  for (const actor of state.actors.values()) {
    if (actor.kind === 'group') drawActor(ctx, actor, t);
  }

  // Layer 2: Connecting edges
  for (const edge of state.edges) {
    if (edge.progress <= 0.01) continue;
    const fromActor = state.actors.get(edge.from);
    const toActor = state.actors.get(edge.to);
    if (!fromActor || !toActor) continue;
    const ep = getEdgeEndpoints(fromActor, toActor, 10);
    if (edge.curve) {
      Connectors.curvedArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, {
        progress: edge.progress,
        color: edge.color || '#FFFFFF',
        lineWidth: 3,
        bend: edge.curve,
        label: edge.label || ''
      });
    } else if (edge.style === 'flow') {
      Connectors.flowArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, t, {
        progress: edge.progress,
        color: edge.color || '#38BDF8',
        lineWidth: 3,
        label: edge.label || '',
        orbs: 2
      });
    } else {
      Connectors.solidArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, {
        progress: edge.progress,
        color: edge.color || '#FFFFFF',
        lineWidth: 3,
        dashed: edge.dashed || edge.style === 'dashed',
        label: edge.label || '',
        timeSec: t
      });
    }
  }

  // Layer 3: Foreground actors
  for (const actor of state.actors.values()) {
    if (actor.kind !== 'group') drawActor(ctx, actor, t);
  }

  // Layer 4: Flying data packets
  for (const packet of state.activePackets) {
    const fromActor = state.actors.get(packet.from);
    const toActor = state.actors.get(packet.to);
    if (fromActor && toActor) {
      drawPacket(ctx, fromActor, toActor, packet);
    }
  }

  // Layer 5: Arrival sparks & callouts
  for (const sp of state.sparks) {
    Effects.sparkBurst(ctx, sp.x, sp.y, sp.progress, { color: sp.color, count: 10, maxRadius: 48 });
  }
  for (const callout of state.activeCallouts) {
    drawCallout(ctx, callout, state.actors);
  }

  ctx.restore();

  // Optional bottom takeaway pill (drawn in screen space)
  if (spec.takeaway) {
    const pTakeaway = clamp01((t - totalDuration * 0.72) / 0.5);
    if (pTakeaway > 0.05) {
      Theme.drawTakeawayPill(ctx, spec.takeaway, {
        variant: 'pill',
        border: spec.accent || '#34D399',
        alpha: pTakeaway
      });
    }
  }

  return state;
}

/**
 * Extract crisp soft micro-pop/tick SFX cues automatically from a whiteboard's causal actions.
 */
function extractSfxCues(spec, sceneStartSec, totalDuration) {
  const cues = [];
  const actions = Array.isArray(spec.actions) ? spec.actions : [];
  for (const action of actions) {
    const { start, end } = resolveActionTiming(action, totalDuration);
    if (action.type === 'spawn' || action.type === 'callout') {
      cues.push({ time: Number((sceneStartSec + start).toFixed(2)), type: 'pop' });
    } else if (action.type === 'packet') {
      cues.push({ time: Number((sceneStartSec + end).toFixed(2)), type: 'tick' });
    } else if (action.type === 'mutate') {
      cues.push({ time: Number((sceneStartSec + start).toFixed(2)), type: 'tick' });
    }
  }
  return cues;
}

module.exports = {
  evaluateWhiteboardState,
  renderScene,
  extractSfxCues
};

  },
  "./illustrations/primitives": function(module, exports, __require) {
    const require = (r) => __require("./illustrations/primitives", r);
'use strict';

const { FONTS } = require('../core/theme');
const Icons = require('../core/icons');
const Connectors = require('../core/connectors');

/**
 * Rich, Domain-Specific Visual Illustrations Library.
 * Designed specifically to prevent "Repeated Dashed Box + Pill Monotony".
 */

// 1. REALISTIC IDE CODE EDITOR WINDOW
function codeEditorWindow(ctx, x, y, w, h, opts = {}) {
  const fileName = opts.fileName || 'App.java';
  const iconName = opts.icon || 'javaLogo';
  const lines = opts.lines || [
    { text: 'public class App {', color: '#F43F5E' },
    { text: '  public static void main() {', color: '#38BDF8' },
    { text: '    int a = 10, b = 20;', color: '#E2E8F0' },
    { text: '    System.out.println(a + b);', color: '#10B981' },
    { text: '  }', color: '#38BDF8' },
    { text: '}', color: '#F43F5E' }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = '#111827';
  ctx.fill();
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Title bar
  ctx.beginPath();
  ctx.roundRect(x, y, w, 36, [12, 12, 0, 0]);
  ctx.fillStyle = '#1F2937';
  ctx.fill();

  // Traffic lights
  const dots = ['#EF4444', '#F59E0B', '#10B981'];
  dots.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x + 20 + idx * 16, y + 18, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Active file tab
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.roundRect(x + 76, y + 6, 130, 30, [6, 6, 0, 0]);
  ctx.fill();
  ctx.fillStyle = '#E5E7EB';
  ctx.font = `600 13px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(fileName, x + 141, y + 25);

  const iconImg = Icons.get(iconName);
  if (iconImg) {
    ctx.drawImage(iconImg, x + w - 38, y + 6, 24, 24);
  }

  lines.forEach((line, i) => {
    const ly = y + 68 + i * 27;
    ctx.fillStyle = '#4B5563';
    ctx.font = `12px ${FONTS.mono}`;
    ctx.textAlign = 'right';
    ctx.fillText(String(i + 1), x + 28, ly);

    ctx.fillStyle = line.color || '#E2E8F0';
    ctx.font = `13.5px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(line.text, x + 42, ly);
  });
  ctx.restore();
}

// 2. BINARY / BYTECODE CAPSULE
function bytecodeCapsule(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'App.class (Bytecode)';
  const badgeTitle = opts.badgeTitle || '0xCAFEBABE';
  const badgeSub = opts.badgeSub || 'Magic Class Header';
  const iconName = opts.icon || 'coffeeMug';
  const opcodes = opts.opcodes || ['0: iload_1', '1: iload_2', '2: iadd', '3: ireturn'];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#064E3B';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(x, y, w, 38, [14, 14, 0, 0]);
  ctx.fillStyle = '#065F46';
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + 24);

  ctx.fillStyle = '#022C22';
  ctx.beginPath();
  ctx.roundRect(x + 18, y + 50, w - 36, 50, 8);
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const iconImg = Icons.get(iconName);
  if (iconImg) {
    ctx.drawImage(iconImg, x + 28, y + 56, 38, 38);
  }
  ctx.fillStyle = '#F59E0B';
  ctx.font = `bold 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(badgeTitle, x + 76, y + 74);
  ctx.fillStyle = '#94A3B8';
  ctx.font = `12px ${FONTS.sans}`;
  ctx.fillText(badgeSub, x + 76, y + 91);

  ctx.fillStyle = '#34D399';
  ctx.font = `13.5px ${FONTS.mono}`;
  opcodes.forEach((op, idx) => {
    ctx.fillText(op, x + 32, y + 134 + idx * 26);
  });
  ctx.restore();
}

// 3. ROTATING MECHANICAL GEAR NODE
function compilerGear(ctx, cx, cy, angleDeg, opts = {}) {
  const size = opts.size || 72;
  const label = opts.label || 'javac';
  const iconImg = Icons.get('gear');

  ctx.save();
  if (iconImg) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((angleDeg * Math.PI) / 180);
    ctx.drawImage(iconImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
  if (label) {
    ctx.fillStyle = opts.color || '#F59E0B';
    ctx.font = `bold 16px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + size / 2 + 24);
  }
  ctx.restore();
}

// 4. DISTINCT HARDWARE MACHINES: 'pc' | 'server' | 'laptop'
function hardwareMachine(ctx, x, cy, opts = {}) {
  const w = opts.width || 330;
  const h = opts.height || 96;
  const y = cy - h / 2;
  const type = opts.type || 'pc';
  const title = opts.title || 'Workstation';
  const status = opts.status || 'Runtime OK ✓';
  const iconImg = opts.osIcon ? Icons.get(opts.osIcon) : null;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (type === 'pc') {
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(x + 22, cy - 28, 48, 36);
    ctx.fillStyle = '#64748B';
    ctx.fillRect(x + 42, cy + 8, 8, 12);
    ctx.fillRect(x + 34, cy + 20, 24, 4);
  } else if (type === 'server') {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + 18, cy - 22, 56, 44);
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(x + 22, cy - 16, 28, 6);
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(x + 60, cy - 13, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 60, cy - 3, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#64748B';
    ctx.fillRect(x + 22, cy + 2, 48, 14);
  } else if (type === 'laptop') {
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(x + 20, cy - 24, 52, 34);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + 24, cy - 20, 44, 26);
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(x + 14, cy + 10, 64, 6);
  }

  const textStartX = iconImg ? x + 150 : x + 94;
  if (iconImg) {
    ctx.drawImage(iconImg, x + 88, cy - 24, 46, 46);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 18px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, textStartX, cy - 4);

  ctx.fillStyle = opts.statusColor || '#10B981';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.fillText(status, textStartX, cy + 20);
  ctx.restore();
}

// 5. MULTI-TIER VAULT SAFE (ClassLoaders, CPU Cache L1/L2/L3, Auth Tiers)
function tieredVault(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '1. ClassLoader Vault';
  const accent = opts.accent || '#D97706';
  const tiers = opts.tiers || [
    { name: 'Bootstrap Tier', sub: 'Core JDK (java.base)', bg: '#78350F', text: '#FEF08A' },
    { name: 'Platform Tier', sub: 'Extensions & Drivers', bg: '#854D0E', text: '#FEF08A' },
    { name: 'Application Tier', sub: 'User App & Libraries', bg: '#9A3412', text: '#FED7AA' }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#292524';
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  tiers.forEach((t, i) => {
    const ty = y + 44 + i * 94;
    ctx.beginPath();
    ctx.roundRect(x + 20, ty, w - 40, 76, 10);
    ctx.fillStyle = t.bg || '#78350F';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = t.text || '#FEF08A';
    ctx.font = `bold 16px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(t.name, x + 38, ty + 31);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(t.sub, x + 38, ty + 54);

    // Gold vault lock indicator
    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(x + w - 46, ty + 38, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#78350F';
    ctx.fillRect(x + w - 48, ty + 34, 4, 8);
  });
  ctx.restore();
}

// 6. HOLOGRAPHIC X-RAY SECURITY SCANNER CHAMBER
function xraySecurityScanner(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '2. Security Verifier';
  const radarProgress = opts.radarProgress !== undefined ? opts.radarProgress : 0;
  const checks = opts.checks || [
    '✓ Type Safety: VALID',
    '✓ Stack Bounds: VALID',
    '✓ Pointer Safety: VALID'
  ];
  const shieldTitle = opts.shieldTitle || '🚫 Attack Deflection Shield';
  const shieldNote = opts.shieldNote || 'Blocks buffer overflows & illegal pointers';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#022C22';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  ctx.fillStyle = '#064E3B';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 40, w - 40, 165, 10);
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const shieldImg = Icons.get('shieldGuard');
  if (shieldImg) {
    ctx.drawImage(shieldImg, x + 36, y + 72, 96, 96);
  }

  if (radarProgress > 0 && radarProgress < 1) {
    const scanY = y + 44 + radarProgress * 155;
    ctx.strokeStyle = '#6EE7B7';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#6EE7B7';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(x + 22, scanY);
    ctx.lineTo(x + w - 22, scanY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = '#A7F3D0';
  ctx.font = `bold 14px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  checks.forEach((chk, idx) => {
    ctx.fillText(chk, x + 150, y + 88 + idx * 32);
  });

  // Deflection alert box
  ctx.fillStyle = '#450A0A';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 225, w - 40, 88, 10);
  ctx.fill();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FCA5A5';
  ctx.font = `bold 14.5px ${FONTS.sans}`;
  ctx.fillText(shieldTitle, x + 36, y + 258);

  ctx.fillStyle = '#FEE2E2';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(shieldNote, x + 36, y + 286);
  ctx.restore();
}

// 7. LIFO EXECUTION STACK CHAMBER
function lifoStackChamber(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || 'Thread Execution Stack (LIFO)';
  const frames = opts.frames || [
    { name: 'calculateTax()', sub: 'rate = 0.08', bg: '#166534', active: false },
    { name: 'getUserProfile()', sub: 'ref -> HEAP', bg: '#0284C7', active: true },
    { name: 'main()', sub: 'entry point', bg: '#334155', active: false }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#082F49';
  ctx.fill();
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#0284C7';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  let activeAnchorY = y + h / 2;

  frames.forEach((f, i) => {
    const fy = y + 52 + i * 96;
    if (f.active) activeAnchorY = fy + 40;

    ctx.beginPath();
    ctx.roundRect(x + 24, fy, w - 48, 80, 10);
    ctx.fillStyle = f.bg || '#1E293B';
    ctx.fill();
    ctx.strokeStyle = f.active ? '#38BDF8' : '#64748B';
    ctx.lineWidth = f.active ? 2.5 : 1;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold 16px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(f.name, x + 40, fy + 34);

    ctx.fillStyle = '#E0F2FE';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(f.sub || '', x + 40, fy + 58);

    ctx.fillStyle = f.active ? '#F59E0B' : '#94A3B8';
    ctx.font = `bold 12px ${FONTS.mono}`;
    ctx.textAlign = 'right';
    ctx.fillText(f.active ? 'ACTIVE REF •' : `Frame #${frames.length - i}`, x + w - 38, fy + 34);
  });

  ctx.restore();
  return { anchorX: x + w, anchorY: activeAnchorY };
}

// 8. 3D HEAP MEMORY GRID + AUTONOMOUS GC SWEEPER DRONE
function memoryHeapGrid(ctx, x, y, w, h, timeSec, opts = {}) {
  const header = opts.header || 'Shared Heap Memory Grid';
  const liveTitle = opts.liveTitle || 'User ("Alice")';
  const liveSub = opts.liveSub || 'id: 101 | $250.00';
  const deadTitle = opts.deadTitle || '💀 Dead Object';
  const deadSub = opts.deadSub || '0 pointers [Severed]';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#311E2D';
  ctx.fill();
  ctx.strokeStyle = '#8A4F80';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#8A4F80';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  // Memory grid lines
  ctx.strokeStyle = '#4A044E';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 32, y + 90 + i * 52);
    ctx.lineTo(x + w - 32, y + 90 + i * 52);
    ctx.stroke();
  }

  // Live Object Card
  const liveX = x + 36;
  const liveY = y + 72;
  ctx.beginPath();
  ctx.roundRect(liveX, liveY, 244, 96, 12);
  ctx.fillStyle = '#7C2D12';
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const avatarImg = Icons.get('userAvatar');
  if (avatarImg) {
    ctx.drawImage(avatarImg, liveX + 16, liveY + 17, 62, 62);
  }
  ctx.fillStyle = '#FED7AA';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(liveTitle, liveX + 90, liveY + 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `13px ${FONTS.mono}`;
  ctx.fillText(liveSub, liveX + 90, liveY + 66);

  // Dead Object Card
  const deadX = x + 36;
  const deadY = y + 204;
  ctx.beginPath();
  ctx.roundRect(deadX, deadY, 244, 92, 12);
  ctx.fillStyle = '#450A0A';
  ctx.fill();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#FCA5A5';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.fillText(deadTitle, deadX + 22, deadY + 38);
  ctx.fillStyle = '#FECDD3';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(deadSub, deadX + 22, deadY + 64);

  // Hovering Autonomous GC Drone
  const droneX = x + w - 98;
  const droneY = y + 178 + Math.sin(timeSec * 3.2) * 8;
  const droneImg = Icons.get('droneBot');
  if (droneImg) {
    ctx.drawImage(droneImg, droneX - 52, droneY - 42, 104, 86);
  }
  ctx.fillStyle = '#10B981';
  ctx.font = `bold 14px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('GC Sweeper Bot', droneX, droneY + 66);
  ctx.fillStyle = '#A7F3D0';
  ctx.font = `12px ${FONTS.sans}`;
  ctx.fillText('Reclaiming RAM', droneX, droneY + 84);

  ctx.restore();
  return { targetX: liveX, targetY: liveY + 48 };
}

// 9. SEQUENTIAL INSTRUCTION READER (Interpreters, Parsers, WAL Logs)
function sequentialReader(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '1. Bytecode Interpreter';
  const items = opts.items || ['0: iload_1', '1: iload_2', '2: iadd', '3: ireturn'];
  const activeIndex = opts.activeIndex !== undefined ? opts.activeIndex : 1;
  const footer = opts.footer || 'Instant 0ms Startup';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#1E1B4B';
  ctx.fill();
  ctx.strokeStyle = '#6366F1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#6366F1';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  items.forEach((op, i) => {
    const active = i === activeIndex;
    ctx.fillStyle = active ? '#4338CA' : '#0F172A';
    ctx.beginPath();
    ctx.roundRect(x + 20, y + 48 + i * 52, w - 40, 42, 8);
    ctx.fill();
    ctx.strokeStyle = active ? '#818CF8' : '#334155';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = active ? '#FFFFFF' : '#94A3B8';
    ctx.font = `bold 14px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(op, x + 38, y + 75 + i * 52);
  });

  ctx.fillStyle = '#A5B4FC';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(footer, x + w / 2, y + h - 32);
  ctx.restore();
}

// 10. HOTSPOT TACHOMETER & NITRO FORGE
function turboForge(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '2. HotSpot JIT Turbocharger';
  const counterLabel = opts.counterLabel || 'Loop Counter';
  const countVal = opts.countValue !== undefined ? opts.countValue : 10000;
  const flameScale = opts.flameScale || 1;
  const title = opts.title || 'C2 Optimizer Active';
  const sub = opts.sub || 'Compiles Hot Paths';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#451A03';
  ctx.fill();
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#D97706';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const meterImg = Icons.get('turboMeter');
  if (meterImg) {
    ctx.drawImage(meterImg, x + 26, y + 42, 98, 78);
  }

  ctx.fillStyle = '#78350F';
  ctx.beginPath();
  ctx.roundRect(x + 136, y + 46, w - 158, 68, 10);
  ctx.fill();

  ctx.fillStyle = '#FED7AA';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(counterLabel, x + 152, y + 70);

  ctx.fillStyle = '#F59E0B';
  ctx.font = `bold 20px ${FONTS.mono}`;
  ctx.fillText(`${Math.floor(countVal).toLocaleString()}x`, x + 152, y + 97);

  const flameImg = Icons.get('flameNitro');
  if (flameImg) {
    ctx.save();
    ctx.translate(x + w / 2, y + 195);
    ctx.scale(flameScale, flameScale);
    ctx.drawImage(flameImg, -40, -40, 80, 80);
    ctx.restore();
  }

  ctx.fillStyle = '#FEF08A';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + 262);

  ctx.fillStyle = '#FED7AA';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(sub, x + w / 2, y + 286);
  ctx.restore();
}

// 11. NATIVE ASSEMBLY / MACHINE CODE TERMINAL
function nativeAssemblyBlock(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '3. Native Machine Code';
  const lines = opts.lines || [
    'movl  %edi, %eax',
    'addl  %esi, %eax',
    'retq  (x86_64 / ARM)',
    '01001000 10001001',
    '11000000 11000011'
  ];
  const footer = opts.footer || 'Zero Interpreter Overhead';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#064E3B';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  ctx.fillStyle = '#022C22';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 48, w - 40, 220, 10);
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#34D399';
  ctx.font = `bold 13.5px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  lines.forEach((ln, idx) => {
    ctx.fillText(ln, x + 36, y + 84 + idx * 36);
  });

  ctx.fillStyle = '#A7F3D0';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(footer, x + w / 2, y + h - 32);
  ctx.restore();
}

// 12. BARE-METAL SILICON CPU DIE + HARDWARE REGISTERS
function siliconCpuDie(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '4. Bare-Metal Silicon';
  const cpuPulse = opts.cpuPulse || 1;
  const registers = opts.registers || [
    'RAX: 0x0000001E (30)',
    'RBX: 0x0000000A (10)',
    'RCX: 0x00000014 (20)'
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const cpuImg = Icons.get('cpuSilicon');
  if (cpuImg) {
    ctx.save();
    ctx.translate(x + w / 2, y + 108);
    ctx.scale(cpuPulse, cpuPulse);
    ctx.drawImage(cpuImg, -58, -58, 116, 116);
    ctx.restore();
  }

  ctx.fillStyle = '#1E293B';
  ctx.beginPath();
  ctx.roundRect(x + 22, y + 190, w - 44, 110, 10);
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = `bold 13.5px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  registers.forEach((reg, i) => {
    ctx.fillText(reg, x + 38, y + 222 + i * 28);
  });
  ctx.restore();
}

// 13. WEB BROWSER CLIENT VIEWPORT (For Networking / HTTP / Frontend-Backend videos)
function browserClient(ctx, x, y, w, h, opts = {}) {
  const url = opts.url || 'https://api.app.io';
  const headline = opts.headline || 'Web Client';
  const status = opts.status || 'TLS 1.3 Active';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(x, y, w, 42, [12, 12, 0, 0]);
  ctx.fillStyle = '#1E293B';
  ctx.fill();

  ['#EF4444', '#F59E0B', '#10B981'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x + 18 + i * 14, y + 21, 4.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // URL Bar
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.roundRect(x + 66, y + 9, w - 82, 24, 12);
  ctx.fill();
  ctx.fillStyle = '#38BDF8';
  ctx.font = `12px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText('🔒 ' + url, x + 78, y + 25);

  const globeImg = Icons.get('globeNet');
  if (globeImg) {
    ctx.drawImage(globeImg, x + w / 2 - 36, y + 66, 72, 72);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 18px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(headline, x + w / 2, y + 170);

  ctx.fillStyle = '#10B981';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.fillText(status, x + w / 2, y + 196);
  ctx.restore();
}

// 14. 3D ISOMETRIC MULTI-PLATTER DATABASE (For SQL, ACID, Sharding, Replication)
function isometricDatabase(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'Primary DB';
  const sub = opts.sub || 'PostgreSQL • WAL';
  const color = opts.color || '#38BDF8';
  const fill = opts.fill || '#082F49';
  const platters = opts.platters || 3;

  ctx.save();
  const ry = 22;
  const platterH = Math.floor((h - 50) / platters);

  for (let i = platters - 1; i >= 0; i--) {
    const py = y + 10 + i * platterH;
    ctx.fillStyle = fill;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(x, py + ry);
    ctx.lineTo(x, py + platterH);
    ctx.ellipse(x + w / 2, py + platterH, w / 2, ry, 0, Math.PI, 0, true);
    ctx.lineTo(x + w, py + ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x + w / 2, py + ry, w / 2, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0C4A6E';
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 17px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + h - 8);

  if (sub) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(sub, x + w / 2, y + h + 14);
  }
  ctx.restore();
}

// 15. STREAMING MESSAGE QUEUE PIPE (Kafka, RabbitMQ, Event Bus)
function messageQueuePipe(ctx, x, y, w, h, timeSec, opts = {}) {
  const title = opts.title || 'Kafka Topic Partition';
  const color = opts.color || '#F59E0B';
  const slots = opts.slots || 5;

  ctx.save();
  ctx.fillStyle = '#1E293B';
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, h / 2);
  ctx.fill();
  ctx.stroke();

  const innerPad = 24;
  const slotW = (w - innerPad * 2 - (slots - 1) * 12) / slots;
  const shift = ((timeSec * 0.9) % 1) * (slotW + 12);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x + 12, y + 8, w - 24, h - 16, (h - 16) / 2);
  ctx.clip();

  for (let i = -1; i < slots + 1; i++) {
    const sx = x + innerPad + i * (slotW + 12) + shift;
    ctx.fillStyle = '#78350F';
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sx, y + 16, slotW, h - 32, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FEF08A';
    ctx.font = `bold 12px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(`msg`, sx + slotW / 2, y + h / 2 + 4);
  }
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y - 14);
  ctx.restore();
}

// 16. HIGH-SPEED RAM CACHE MATRIX (Redis, Memcached, Page Cache)
function cacheMemoryMatrix(ctx, x, y, w, h, timeSec, opts = {}) {
  const header = opts.header || 'Redis In-Memory Cache';
  const cols = opts.cols || 3;
  const rows = opts.rows || 3;
  const hotCell = Math.floor(timeSec * 2) % (cols * rows);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#2E0816';
  ctx.fill();
  ctx.strokeStyle = '#F43F5E';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#E11D48';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const padX = 24;
  const padY = 44;
  const gap = 12;
  const cellW = (w - padX * 2 - (cols - 1) * gap) / cols;
  const cellH = (h - padY - 36 - (rows - 1) * gap) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const cx = x + padX + c * (cellW + gap);
      const cy = y + padY + r * (cellH + gap);
      const isHot = idx === hotCell;

      ctx.fillStyle = isHot ? '#10B981' : '#4C0519';
      ctx.strokeStyle = isHot ? '#6EE7B7' : '#881337';
      ctx.lineWidth = isHot ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cellW, cellH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHot ? '#022C22' : '#FECDD3';
      ctx.font = `bold 12px ${FONTS.mono}`;
      ctx.textAlign = 'center';
      ctx.fillText(isHot ? 'HIT ⚡' : `k:${idx + 1}`, cx + cellW / 2, cy + cellH / 2 + 4);
    }
  }

  ctx.fillStyle = '#FDA4AF';
  ctx.font = `600 13px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('Sub-millisecond O(1) RAM Lookup', x + w / 2, y + h - 14);
  ctx.restore();
}

// 17. STAGE PANEL (Clean labeled stage container for custom compositions)
function stagePanel(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || 'Stage';
  const accent = opts.accent || '#8A4F80';
  const bg = opts.bg || '#311E2D';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);
  ctx.restore();
}

// Helper for inner step blocks when needed inside a custom stagePanel
function stepBlock(ctx, x, y, w, h, title, sub, opts = {}) {
  const bg = opts.bg || '#701A75';
  const titleColor = opts.titleColor || '#F5D0FE';

  ctx.save();
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fill();

  ctx.fillStyle = titleColor;
  ctx.font = `bold 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 20, y + 30);

  if (sub) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(sub, x + 20, y + 52);
  }
  ctx.restore();
}

module.exports = {
  codeEditorWindow,
  bytecodeCapsule,
  compilerGear,
  hardwareMachine,
  tieredVault,
  xraySecurityScanner,
  lifoStackChamber,
  memoryHeapGrid,
  sequentialReader,
  turboForge,
  nativeAssemblyBlock,
  siliconCpuDie,
  browserClient,
  isometricDatabase,
  messageQueuePipe,
  cacheMemoryMatrix,
  stagePanel,
  stepBlock,
  // Expose Connectors convenience
  Connectors
};

  },
  "./illustrations/archetypes": function(module, exports, __require) {
    const require = (r) => __require("./illustrations/archetypes", r);
'use strict';

const Theme = require('../core/theme');
const Effects = require('../core/draw-effects');
const Connectors = require('../core/connectors');

const { FONTS, GLASS_TINTS } = Theme;

/**
 * Signature ByteByteGo Line-Art Primitives & High-Retention Scene Archetypes (v2.1).
 * Every primitive supports progressive self-drawing (`progress: 0 -> 1`) and dual calling conventions.
 */

// 1. AUTHENTIC 3D STACKED ISOMETRIC WIREFRAME SERVER (Matches ByteByteGo HTTP video)
function isometricServerStack(ctx, cx, cy, opts = {}) {
  const slabs = opts.slabs || 3;
  const rx = opts.rx || 68;
  const ry = opts.ry || 34;
  const slabThickness = opts.thickness || 18;
  const gap = opts.gap || 26;
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || '';

  if (progress <= 0.01) return { leftX: cx - rx, rightX: cx + rx, cy };

  const totalHeight = (slabs - 1) * gap;
  const startY = cy - totalHeight / 2;

  ctx.save();
  for (let i = slabs - 1; i >= 0; i--) {
    const sy = startY + i * gap;
    const localP = Math.max(0, Math.min(1, (progress * slabs) - (slabs - 1 - i) * 0.45));
    if (localP <= 0.01) continue;

    ctx.save();
    ctx.fillStyle = '#242424';
    ctx.beginPath();
    ctx.moveTo(cx, sy - ry);
    ctx.lineTo(cx + rx, sy);
    ctx.lineTo(cx + rx, sy + slabThickness);
    ctx.lineTo(cx, sy + ry + slabThickness);
    ctx.lineTo(cx - rx, sy + slabThickness);
    ctx.lineTo(cx - rx, sy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    Effects.strokeDraw(ctx, (c) => {
      c.moveTo(cx, sy - ry);
      c.lineTo(cx + rx, sy);
      c.lineTo(cx, sy + ry);
      c.lineTo(cx - rx, sy);
      c.closePath();

      c.moveTo(cx - rx, sy);
      c.lineTo(cx - rx, sy + slabThickness);
      c.lineTo(cx, sy + ry + slabThickness);
      c.lineTo(cx + rx, sy + slabThickness);
      c.lineTo(cx + rx, sy);
    }, localP, { stroke, lineWidth: 2, pathLength: 620 });

    if (localP > 0.75) {
      ctx.fillStyle = stroke;
      ctx.beginPath();
      ctx.arc(cx - rx * 0.62, sy + ry * 0.38 + slabThickness * 0.45, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.46, sy + ry * 0.46 + slabThickness * 0.45);
      ctx.lineTo(cx - rx * 0.22, sy + ry * 0.58 + slabThickness * 0.45);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
  }

  if (label) {
    Effects.typeText(ctx, label, cx, startY + totalHeight + ry + slabThickness + 30, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
  return { leftX: cx - rx, rightX: cx + rx, cy };
}

// 2. FOLDED-CORNER DOCUMENT WITH RIBBON BADGE (HTML, LOG, JSON, SQL, CLASS)
function foldedFileBadge(ctx, cx, cy, tagOrOpts = 'LOG', maybeOpts = {}) {
  const opts = typeof tagOrOpts === 'object' && tagOrOpts !== null ? tagOrOpts : maybeOpts;
  const tag = typeof tagOrOpts === 'string' ? tagOrOpts : (opts.badge || opts.tag || 'LOG');
  const w = opts.width || 96;
  const h = opts.height || 118;
  const fold = opts.fold || 24;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const outlineColor = opts.outlineColor || '#FFFFFF';
  const ribbonBg = opts.ribbonBg || opts.badgeColor || '#3B82F6';
  const ribbonStroke = opts.ribbonStroke || '';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(x + 10, y);
    c.lineTo(x + w - fold, y);
    c.lineTo(x + w, y + fold);
    c.lineTo(x + w, y + h - 10);
    c.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
    c.lineTo(x + 10, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - 10);
    c.lineTo(x, y + 10);
    c.quadraticCurveTo(x, y, x + 10, y);

    c.moveTo(x + w - fold, y);
    c.lineTo(x + w - fold, y + fold);
    c.lineTo(x + w, y + fold);
  }, progress, { stroke: outlineColor, lineWidth: 2.3, pathLength: 520 });

  if (progress > 0.35) {
    const rp = Math.min(1, (progress - 0.35) / 0.65);
    const rw = w + 20;
    const rh = 38;
    const rx = cx - rw / 2;
    const ry = cy + 6;

    ctx.save();
    ctx.globalAlpha *= rp;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 10);
    ctx.fillStyle = ribbonBg;
    ctx.fill();
    if (ribbonStroke) {
      ctx.strokeStyle = ribbonStroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 21px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(tag, cx, ry + 26);
    ctx.restore();
  }

  if (opts.caption && progress > 0.5) {
    Effects.typeText(ctx, opts.caption, cx, y + h + 28, (progress - 0.5) * 2, {
      font: `500 16px ${FONTS.sans}`,
      color: '#E2E8F0'
    });
  }
  ctx.restore();
}

// 3. THIN-LINE NEON WIREFRAME BROWSER (`WWW` — Matches ByteByteGo HTTP video)
function wireframeBrowser(ctx, x, y, w = 176, h = 122, opts = {}) {
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const centerLabel = opts.label !== undefined ? opts.label : (opts.centerText !== undefined ? opts.centerText : 'WWW');

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.roundRect(x, y, w, h, 8);
    c.moveTo(x, y + 24);
    c.lineTo(x + w, y + 24);
    c.roundRect(x + 8, y + 6, w * 0.56, 12, 6);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(20, 28, 36, 0.55)', pathLength: 780 });

  if (progress > 0.6) {
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(x + w - 34 + i * 11, y + 12, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (centerLabel) {
      ctx.fillStyle = opts.labelColor || '#F59E0B';
      ctx.font = `700 24px ${FONTS.sans}`;
      ctx.textAlign = 'center';
      ctx.fillText(centerLabel, x + w / 2, y + h / 2 + 18);
    }
  }
  ctx.restore();
}

// 4. THIN-LINE WIREFRAME CYLINDER DATABASE (Self-drawing, matches ACID video)
function wireframeCylinderDb(ctx, cx, cy, wOrOpts = {}, hOrUndefined, maybeOpts = {}) {
  const opts = typeof wOrOpts === 'number'
    ? Object.assign({}, maybeOpts, { width: wOrOpts, height: hOrUndefined || 116 })
    : wOrOpts;
  const w = opts.width || 108;
  const h = opts.height || 116;
  const ry = opts.ry || 18;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const stroke = opts.color || '#7DD3FC';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Database';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.ellipse(cx, y + ry, w / 2, ry, 0, 0, Math.PI * 2);
    c.moveTo(x, y + ry);
    c.lineTo(x, y + h - ry);
    c.ellipse(cx, y + h - ry, w / 2, ry, 0, Math.PI, 0, true);
    c.lineTo(x + w, y + ry);
    c.moveTo(x, cy);
    c.ellipse(cx, cy, w / 2, ry, 0, Math.PI, 0, true);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(56, 189, 248, 0.08)', pathLength: 820 });

  if (label) {
    Effects.typeText(ctx, label, cx, y + h + 26, progress, {
      font: `500 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 5. CRISP CYAN LINE-ART USER BUST (Matches ByteByteGo Alice/Bob Transaction scene)
function lineArtUser(ctx, cx, cy, opts = {}) {
  const scale = opts.scale || 1;
  const stroke = opts.color || '#38BDF8';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || '';

  if (progress <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(-22, -16);
    c.lineTo(-22, -38);
    c.quadraticCurveTo(0, -48, 22, -40);
    c.lineTo(22, -12);
    c.quadraticCurveTo(22, 10, 0, 10);
    c.quadraticCurveTo(-22, 10, -22, -16);

    c.moveTo(-22, -22);
    c.quadraticCurveTo(-4, -18, 8, -28);
    c.quadraticCurveTo(16, -20, 22, -20);

    c.moveTo(-10, 10);
    c.lineTo(-10, 20);
    c.moveTo(10, 10);
    c.lineTo(10, 20);

    c.moveTo(-42, 46);
    c.quadraticCurveTo(-42, 22, -14, 20);
    c.lineTo(0, 32);
    c.lineTo(14, 20);
    c.quadraticCurveTo(42, 22, 42, 46);
    c.closePath();

    c.moveTo(0, 32);
    c.lineTo(0, 46);
  }, progress, { stroke, lineWidth: 2.2, pathLength: 560 });

  ctx.restore();

  if (label) {
    Effects.typeText(ctx, label, cx, cy + 68 * scale, progress, {
      font: `600 16px ${FONTS.sans}`,
      color: '#E2E8F0'
    });
  }
}

// 6. TRANSLUCENT STATE MUTATION CARD (e.g. Alice Account: Before $200 / Debit $100 / Available $100)
function stateMutationCard(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'Account State';
  const tint = opts.tint || 'olive';
  const rows = opts.rows || [
    { text: 'Before: $200', highlight: false },
    { text: 'Debit: $100', highlight: true },
    { text: 'Available: $100', highlight: false }
  ];
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  if (title) {
    ctx.fillStyle = (GLASS_TINTS[tint] || GLASS_TINTS.olive).highlight;
    ctx.font = `600 20px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y - 16);
  }

  Theme.drawGlassCard(ctx, x, y, w, h, {
    tint,
    radius: 12,
    badge: opts.badge,
    badgeSide: opts.badgeSide,
    progress
  });

  const rowStart = y + (opts.badge ? 54 : 38);
  const rowGap = Math.min(34, (h - 36) / Math.max(1, rows.length));

  rows.forEach((r, idx) => {
    const rp = Math.max(0, Math.min(1, (progress - idx * 0.18) / 0.55));
    if (rp <= 0.01) return;
    const text = typeof r === 'string'
      ? r
      : (r.text || `${r.actor || 'State'}: ${r.before || ''} -> ${r.after || ''}`);
    const isHighlight = Boolean(r.highlight);
    const col = typeof r.highlight === 'string' ? r.highlight : (isHighlight ? '#FACC15' : '#FFFFFF');
    Effects.typeText(ctx, text, x + w / 2, rowStart + idx * rowGap, rp, {
      font: `${isHighlight ? '700' : '500'} 18px ${FONTS.sans}`,
      color: col
    });
  });
  ctx.restore();
}

// 7. BROKEN LINK PLUG + RED FAILURE CROSS-OUT (Matches ByteByteGo ACID failure state)
function brokenLinkPlug(ctx, cx, cy, opts = {}) {
  const baseP = opts.progress !== undefined ? opts.progress : 1;
  const sep = (opts.separation !== undefined ? opts.separation : baseP) * 14;
  const crossProgress = opts.crossProgress !== undefined ? opts.crossProgress : baseP;

  if (baseP <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 4);

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-42 - sep, -14, 28, 28, 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-14 - sep, -6); ctx.lineTo(-4 - sep, -6);
  ctx.moveTo(-14 - sep, 6); ctx.lineTo(-4 - sep, 6);
  ctx.stroke();

  ctx.strokeStyle = '#C084FC';
  ctx.beginPath();
  ctx.roundRect(10 + sep, -14, 28, 28, 5);
  ctx.stroke();
  ctx.restore();

  if (crossProgress > 0.01) {
    Effects.crossOutFailure(ctx, cx, cy, crossProgress, { size: 42 });
  }

  if (opts.caption && baseP > 0.4) {
    Effects.typeText(ctx, opts.caption, cx, cy + 68, (baseP - 0.4) / 0.6, {
      font: `600 16px ${FONTS.sans}`,
      color: '#FCA5A5'
    });
  }
}

// ============================================================================
// HIGH-RETENTION FULL-SCENE ARCHETYPES
// ============================================================================

// 8. EVOLUTION / MILESTONE TIMELINE STRIP (`HTTP/1 o──▶ HTTP/1.1 o──▶ HTTP/2 o──▶ HTTP/3`)
function evolutionTimeline(ctx, itemsOrCx, yOrOpts = {}, maybeOpts = {}) {
  let items = itemsOrCx;
  let opts = yOrOpts;
  if (typeof itemsOrCx === 'number') {
    opts = Object.assign({}, maybeOpts, { centerY: yOrOpts });
    items = opts.items || ['v1.0', 'v2.0', 'v3.0'];
  }
  const canvasWidth = opts.canvasWidth || 1920;
  const cy = opts.centerY || 540;
  const nodeW = opts.nodeWidth || 186;
  const nodeH = opts.nodeHeight || 66;
  const gap = opts.gap || 135;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const activeIndex = opts.activeIndex !== undefined ? opts.activeIndex : items.length - 1;

  const totalW = items.length * nodeW + (items.length - 1) * gap;
  const startX = Math.round((canvasWidth - totalW) / 2);

  ctx.save();
  items.forEach((item, i) => {
    const stepThreshold = i / items.length;
    const localP = Math.max(0, Math.min(1, (progress - stepThreshold * 0.7) / 0.35));
    if (localP <= 0.01) return;

    const x = startX + i * (nodeW + gap);
    const y = cy - nodeH / 2;
    const isCurrent = i === activeIndex;
    const label = typeof item === 'string' ? item : item.label;
    const sub = typeof item === 'object' ? item.sub : '';

    ctx.save();
    ctx.globalAlpha *= localP;
    ctx.beginPath();
    ctx.roundRect(x, y, nodeW, nodeH, 14);
    ctx.fillStyle = isCurrent ? 'rgba(234, 179, 8, 0.22)' : 'rgba(24, 24, 24, 0.85)';
    ctx.fill();
    ctx.strokeStyle = isCurrent ? '#FACC15' : '#D4C646';
    ctx.lineWidth = isCurrent ? 3 : 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 24px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, x + nodeW / 2, cy + 8);

    if (sub) {
      ctx.fillStyle = isCurrent ? '#FEF08A' : '#94A3B8';
      ctx.font = `500 15px ${FONTS.sans}`;
      ctx.fillText(sub, x + nodeW / 2, y + nodeH + 28);
    }
    ctx.restore();

    if (i < items.length - 1) {
      const arrowP = Math.max(0, Math.min(1, (progress - (stepThreshold + 0.08) * 0.7) / 0.25));
      Connectors.solidArrow(ctx, x + nodeW, cy, x + nodeW + gap, cy, {
        progress: arrowP,
        color: '#FFFFFF',
        lineWidth: 2.6
      });
    }
  });
  ctx.restore();
}

// 9. GIANT KINETIC STAT / YEAR HERO SLAM (`2010`, `< 1 ms`, `10,000x` — Matches HTTP 38s)
function heroMetricSlam(ctx, textOrCx, cyOrOpts = {}, maybeOpts = {}) {
  let mainText = textOrCx;
  let opts = cyOrOpts;
  if (typeof textOrCx === 'number' && typeof cyOrOpts === 'number') {
    opts = Object.assign({}, maybeOpts, { cx: textOrCx, cy: cyOrOpts });
    mainText = String(opts.value || opts.text || '2015');
  }
  const cx = opts.cx || 960;
  const cy = opts.cy || 530;
  const color = opts.color || '#2CE5FF';
  const subText = opts.subtitle || opts.sub || '';
  const scale = opts.scale !== undefined ? opts.scale : (opts.progress !== undefined ? opts.progress : 1);
  const fontSize = opts.fontSize || 230;

  if (scale <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = color;
  ctx.font = `800 ${fontSize}px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(mainText, 0, fontSize * 0.32);

  ctx.shadowBlur = 0;
  if (subText) {
    ctx.fillStyle = '#E2E8F0';
    ctx.font = `600 28px ${FONTS.sans}`;
    ctx.fillText(subText, 0, fontSize * 0.32 + 64);
  }
  ctx.restore();
}

// 10. SIDE-BY-SIDE TRANSLUCENT COMPARISON TABLE (Matches Linux BIOS vs UEFI frame 42s)
function comparisonSplitTable(ctx, a1, a2, a3 = {}, a4, a5 = {}) {
  let leftSpec = a1;
  let rightSpec = a2;
  let opts = a3;

  // Support (ctx, x, y, w, h, { leftHeader, rightHeader, rows, progress })
  if (typeof a1 === 'number' && typeof a2 === 'number' && typeof a3 === 'number' && typeof a4 === 'number') {
    const spec = a5 || {};
    const gap = spec.gap || 28;
    const cardW = Math.floor((a3 - gap) / 2);
    const p = spec.progress !== undefined ? spec.progress : 1;
    leftSpec = {
      title: spec.leftHeader || 'Option A',
      headerFill: '#6B7B3A',
      bodyFill: 'rgba(34, 68, 62, 0.72)',
      bullets: (spec.rows || []).map((r) => r.left),
      progress: p
    };
    rightSpec = {
      title: spec.rightHeader || 'Option B',
      headerFill: '#0F766E',
      bodyFill: 'rgba(22, 62, 72, 0.72)',
      bullets: (spec.rows || []).map((r) => r.right),
      progress: p
    };
    opts = { startX: a1, y: a2, cardWidth: cardW, cardHeight: a4, gap };
  }

  const canvasWidth = opts.canvasWidth || 1920;
  const cardW = opts.cardWidth || 620;
  const cardH = opts.cardHeight || 420;
  const gap = opts.gap || 32;
  const y = opts.y || 300;
  const startX = opts.startX !== undefined ? opts.startX : Math.round((canvasWidth - (cardW * 2 + gap)) / 2);

  const cards = [
    { spec: leftSpec, x: startX },
    { spec: rightSpec, x: startX + cardW + gap }
  ];

  cards.forEach(({ spec, x }) => {
    const progress = spec.progress !== undefined ? spec.progress : 1;
    if (progress <= 0.01) return;

    ctx.save();
    ctx.globalAlpha *= progress;

    ctx.beginPath();
    ctx.roundRect(x, y, cardW, cardH, 16);
    ctx.fillStyle = spec.bodyFill || 'rgba(34, 68, 62, 0.72)';
    ctx.fill();
    ctx.strokeStyle = spec.strokeColor || 'rgba(94, 234, 212, 0.35)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(x, y, cardW, 56, [16, 16, 12, 12]);
    ctx.fillStyle = spec.headerFill || '#6B7B3A';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 22px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(spec.title || '', x + cardW / 2, y + 36);

    ctx.textAlign = 'left';
    let cursorY = y + 100;
    (spec.bullets || []).forEach((b, idx) => {
      const text = typeof b === 'string' ? b : b.text;
      const isHighlighted = (typeof b === 'object' && b.highlight) || spec.highlightIndex === idx;
      ctx.fillStyle = isHighlighted ? '#FACC15' : '#F8FAFC';
      ctx.font = `${isHighlighted ? '600' : '500'} 19px ${FONTS.sans}`;

      const words = (`•  ${text}`).split(' ');
      let line = '';
      const maxW = cardW - 56;
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (ctx.measureText(testLine).width > maxW) {
          ctx.fillText(line, x + 28, cursorY);
          line = '    ' + word;
          cursorY += 28;
        } else {
          line = testLine;
        }
      }
      if (line) {
        ctx.fillText(line, x + 28, cursorY);
        cursorY += 38;
      }
    });

    ctx.restore();
  });
}

// 11. SWIMLANE PROTOCOL SEQUENCE DIAGRAM (TCP Handshake, OAuth2, Raft, 2PC)
function swimlaneSequence(ctx, a1, a2, a3 = {}, a4, a5 = {}) {
  let actors = a1;
  let messages = a2;
  let opts = a3;

  // Support (ctx, x, y, w, h, { actors, messages, progress })
  if (typeof a1 === 'number' && typeof a2 === 'number' && typeof a3 === 'number' && typeof a4 === 'number') {
    const spec = a5 || {};
    actors = spec.actors || [];
    messages = spec.messages || [];
    opts = {
      startX: a1 + 95,
      topY: a2 + 30,
      bottomY: a2 + a4 - 20,
      spanWidth: Math.max(200, a3 - 190),
      progress: spec.progress
    };
  }

  const canvasWidth = opts.canvasWidth || 1920;
  const topY = opts.topY || 220;
  const bottomY = opts.bottomY || 780;
  const spanW = opts.spanWidth || 1240;
  const startX = opts.startX !== undefined ? opts.startX : Math.round((canvasWidth - spanW) / 2);
  const stepX = actors.length > 1 ? spanW / (actors.length - 1) : 0;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  const actorXs = actors.map((_, i) => Math.round(startX + i * stepX));

  ctx.save();
  actors.forEach((act, i) => {
    const ax = actorXs[i];
    const name = typeof act === 'string' ? act : act.name;
    const color = (typeof act === 'object' && act.color) || '#38BDF8';

    ctx.beginPath();
    ctx.roundRect(ax - 95, topY - 26, 190, 50, 12);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 18px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(name, ax, topY + 6);

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 6]);
    ctx.beginPath();
    ctx.moveTo(ax, topY + 26);
    ctx.lineTo(ax, bottomY);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  const msgAreaStart = topY + 78;
  const msgGap = Math.min(92, (bottomY - msgAreaStart - 30) / Math.max(1, messages.length));

  messages.forEach((m, idx) => {
    const mp = m.progress !== undefined
      ? m.progress
      : Math.max(0, Math.min(1, (progress * messages.length) - idx));
    if (mp <= 0.01) return;

    const x1 = actorXs[m.from];
    const x2 = actorXs[m.to];
    const y1 = msgAreaStart + idx * msgGap;
    const y2 = y1 + (m.slope !== undefined ? m.slope : 22);
    const col = m.color || '#5CE1E6';

    Connectors.solidArrow(ctx, x1, y1, x2, y2, {
      progress: mp,
      dashed: Boolean(m.dashed),
      label: m.label,
      color: col,
      labelOffset: -14,
      labelBg: false
    });

    if (m.failed && mp > 0.7) {
      Effects.crossOutFailure(ctx, (x1 + x2) / 2, (y1 + y2) / 2, (mp - 0.7) / 0.3, { size: 32 });
    }
  });
  ctx.restore();
}

// 12. CONSISTENT HASH RING (Distributed Systems: DynamoDB, Cassandra, Sharding)
function consistentHashRing(ctx, cx, cy, radius, nodesOrOpts = [], maybeOpts = {}) {
  const isArray = Array.isArray(nodesOrOpts);
  const opts = isArray ? maybeOpts : (nodesOrOpts || {});
  const nodes = isArray ? nodesOrOpts : (opts.nodes || []);
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const tokenAngle = opts.tokenAngle !== undefined ? opts.tokenAngle : (opts.keyAngle !== undefined ? opts.keyAngle : 0);

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
  }, progress, { stroke: '#475569', lineWidth: 3, pathLength: Math.round(2 * Math.PI * radius) + 40 });

  if (opts.sweepToAngle !== undefined && progress > 0.6) {
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, tokenAngle, opts.sweepToAngle);
    ctx.stroke();
  }

  nodes.forEach((n) => {
    const nx = cx + Math.cos(n.angle) * radius;
    const ny = cy + Math.sin(n.angle) * radius;
    ctx.fillStyle = n.color || '#10B981';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(nx, ny, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const lx = cx + Math.cos(n.angle) * (radius + 42);
    const ly = cy + Math.sin(n.angle) * (radius + 42);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(n.label, lx, ly + 5);
  });

  if (opts.showToken !== false && progress > 0.5) {
    const kx = cx + Math.cos(tokenAngle) * radius;
    const ky = cy + Math.sin(tokenAngle) * radius;
    ctx.fillStyle = '#FACC15';
    ctx.shadowColor = '#FACC15';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(kx, ky, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}

// 13. B-TREE / INDEX HIERARCHY (Database Indexes, File Systems, Compilers)
function bTreeHierarchy(ctx, cx, topY, opts = {}) {
  const rootKeys = (opts.root || opts.rootKeys || ['30', '70']).map(String);
  const children = (opts.children || [
    { keys: ['10', '20'], active: false },
    { keys: ['42', '55'], active: true },
    { keys: ['80', '95'], active: false }
  ]).map((c, idx) => ({
    keys: (c.keys || []).map(String),
    active: c.active !== undefined ? c.active : opts.highlightBranch === idx
  }));
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  function drawKeyNode(nx, ny, keys, active) {
    const maxChars = Math.max(2, ...keys.map((k) => String(k).length));
    const cellW = Math.max(56, maxChars * 10 + 22);
    const w = keys.length * cellW;
    const h = 44;
    const x = nx - w / 2;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, ny, w, h, 8);
    ctx.fillStyle = active ? 'rgba(16, 185, 129, 0.28)' : 'rgba(30, 41, 59, 0.85)';
    ctx.fill();
    ctx.strokeStyle = active ? '#34D399' : '#38BDF8';
    ctx.lineWidth = active ? 2.8 : 2;
    ctx.stroke();

    keys.forEach((k, idx) => {
      if (idx > 0) {
        ctx.beginPath();
        ctx.moveTo(x + idx * cellW, ny);
        ctx.lineTo(x + idx * cellW, ny + h);
        ctx.stroke();
      }
      ctx.fillStyle = active ? '#FEF08A' : '#FFFFFF';
      ctx.font = `700 15px ${FONTS.mono}`;
      ctx.textAlign = 'center';
      ctx.fillText(k, x + idx * cellW + cellW / 2, ny + 28);
    });
    ctx.restore();
    return { x, y: ny, w, h };
  }

  ctx.save();
  ctx.globalAlpha *= progress;
  drawKeyNode(cx, topY, rootKeys, true);

  const childY = topY + 130;
  const maxChildChars = Math.max(2, ...children.flatMap((c) => c.keys.map((k) => String(k).length)));
  const estChildW = Math.max(112, (children[0] ? children[0].keys.length : 2) * Math.max(56, maxChildChars * 10 + 22));
  const spacing = opts.spacing || Math.max(210, estChildW + 32);
  const startX = cx - ((children.length - 1) * spacing) / 2;

  children.forEach((ch, i) => {
    const childCx = startX + i * spacing;
    Connectors.solidArrow(ctx, cx + (i - 1) * 28, topY + 44, childCx, childY, {
      color: ch.active ? '#34D399' : '#64748B',
      lineWidth: ch.active ? 2.8 : 1.8
    });
    drawKeyNode(childCx, childY, ch.keys, ch.active);
  });
  ctx.restore();
}

// 14. SEGMENTED NETWORK PACKET / PROTOCOL FRAME (`[ IP | TCP | TLS | HTTP Payload ]`)
function networkPacketFrame(ctx, a1, a2, a3, a4 = {}, a5 = {}) {
  let cx = a1;
  let cy = a2;
  let segments = a3;
  let opts = a4;

  // Support (ctx, x, y, w, h, { segments, progress })
  if (typeof a3 === 'number' && typeof a4 === 'number') {
    opts = Object.assign({}, a5, { height: a4 });
    cx = a1 + a3 / 2;
    cy = a2 + a4 / 2;
    segments = (opts.segments || []).map((s) => ({
      label: s.label,
      sub: s.sub,
      width: s.width || Math.round((s.ratio || 0.25) * a3),
      border: s.border || s.color || '#38BDF8',
      bg: s.bg || 'rgba(30, 41, 59, 0.72)'
    }));
  }

  const h = opts.height || 64;
  const totalW = segments.reduce((s, seg) => s + (seg.width || 160), 0);
  let cursorX = cx - totalW / 2;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  segments.forEach((seg, i) => {
    const sw = seg.width || 160;
    const lp = Math.max(0, Math.min(1, (progress * segments.length) - i * 0.5));
    if (lp > 0.01) {
      ctx.save();
      ctx.globalAlpha *= lp;
      const radii = i === 0
        ? [10, 0, 0, 10]
        : (i === segments.length - 1 ? [0, 10, 10, 0] : 0);

      ctx.beginPath();
      ctx.roundRect(cursorX, cy - h / 2, sw, h, radii);
      ctx.fillStyle = seg.bg || 'rgba(2, 132, 199, 0.35)';
      ctx.fill();
      ctx.strokeStyle = seg.border || '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 16px ${FONTS.sans}`;
      ctx.textAlign = 'center';
      ctx.fillText(seg.label, cursorX + sw / 2, cy + (seg.sub ? -2 : 6));

      if (seg.sub) {
        ctx.fillStyle = '#CBD5E1';
        ctx.font = `12px ${FONTS.mono}`;
        ctx.fillText(seg.sub, cursorX + sw / 2, cy + 18);
      }
      ctx.restore();
    }
    cursorX += sw;
  });
  ctx.restore();
}

// 15. API GATEWAY / REVERSE PROXY LOAD BALANCER ROUTER (1 -> 3 Fan-out distributor)
function loadBalancerRouter(ctx, cx, cy, opts = {}) {
  const radius = opts.radius || 58;
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Load Balancer';
  const algorithm = opts.algorithm || 'Round-Robin';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    // Internal diamond router symbol
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 22, cy - 22);
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 24, cy);
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 22, cy + 22);
  }, progress, { stroke, lineWidth: 2.4, fill: 'rgba(15, 23, 42, 0.85)', pathLength: 520 });

  if (progress > 0.6) {
    ctx.fillStyle = '#FACC15';
    ctx.beginPath();
    ctx.arc(cx - 28, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    [-22, 0, 22].forEach((dy) => {
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(cx + 23, cy + dy, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 12px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(algorithm, cx, cy + radius - 14);
  }

  if (label) {
    Effects.typeText(ctx, label, cx, cy + radius + 28, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 16. KAFKA / PUB-SUB PARTITIONED OFFSET LOG STREAM
function pubSubTopicBox(ctx, x, y, w = 460, h = 110, opts = {}) {
  const title = opts.title || 'Topic: orders-stream (Partition 0)';
  const offsets = opts.offsets || ['#101', '#102', '#103', '#104', 'HEAD'];
  const activeSlot = opts.activeSlot !== undefined ? opts.activeSlot : offsets.length - 1;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  Theme.drawGlassCard(ctx, x, y, w, h, {
    tint: opts.tint || 'teal',
    radius: 12,
    progress
  });

  ctx.fillStyle = '#E2E8F0';
  ctx.font = `600 15px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 20, y + 26);

  const cellGap = 8;
  const padX = 20;
  const cellW = Math.floor((w - padX * 2 - (offsets.length - 1) * cellGap) / offsets.length);
  const cellH = 46;
  const cellY = y + 42;

  offsets.forEach((slotText, idx) => {
    const sp = Math.max(0, Math.min(1, (progress * offsets.length) - idx * 0.4));
    if (sp <= 0.01) return;
    const cx = x + padX + idx * (cellW + cellGap);
    const isHead = idx === activeSlot;

    ctx.save();
    ctx.globalAlpha *= sp;
    ctx.beginPath();
    ctx.roundRect(cx, cellY, cellW, cellH, 7);
    ctx.fillStyle = isHead ? 'rgba(250, 204, 21, 0.24)' : 'rgba(15, 23, 42, 0.78)';
    ctx.fill();
    ctx.strokeStyle = isHead ? '#FACC15' : '#38BDF8';
    ctx.lineWidth = isHead ? 2.4 : 1.5;
    ctx.stroke();

    ctx.fillStyle = isHead ? '#FEF08A' : '#FFFFFF';
    ctx.font = `700 14px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(slotText, cx + cellW / 2, cellY + 28);
    ctx.restore();
  });
  ctx.restore();
}

// 17. MICROSERVICE CIRCUIT BREAKER KNIFE-SWITCH (`CLOSED` vs `OPEN (TRIPPED)`)
function circuitBreakerSwitch(ctx, cx, cy, opts = {}) {
  const isOpen = opts.state === 'OPEN' || Boolean(opts.tripped);
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || (isOpen ? 'OPEN (Fast Fail 503)' : 'CLOSED (Healthy Flow)');
  const color = isOpen ? '#F87171' : '#4ADE80';

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  // Left and right terminal posts
  const leftX = cx - 56;
  const rightX = cx + 56;

  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftX - 36, cy);
  ctx.lineTo(leftX, cy);
  ctx.moveTo(rightX, cy);
  ctx.lineTo(rightX + 36, cy);
  ctx.stroke();

  // Switch pivot blade
  const angle = isOpen ? -0.58 : 0;
  ctx.save();
  ctx.translate(leftX, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(110, 0);
  ctx.stroke();
  ctx.restore();

  // Terminal nodes
  [leftX, rightX].forEach((tx) => {
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.fillStyle = color;
  ctx.font = `700 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(label, cx, cy + 40);
  ctx.restore();
}

// 18. CDN GLOBAL EDGE POP WIREFRAME GLOBE
function cdnEdgeGlobe(ctx, cx, cy, radius = 85, opts = {}) {
  const stroke = opts.color || '#38BDF8';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Global Edge CDN';
  const pops = opts.pops || [
    { x: -0.45, y: -0.25, name: 'US-East' },
    { x: 0.15, y: -0.35, name: 'EU-West' },
    { x: 0.52, y: 0.22, name: 'AP-East' }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.ellipse(cx, cy, radius * 0.48, radius, 0, 0, Math.PI * 2);
    c.ellipse(cx, cy, radius, radius * 0.38, 0, 0, Math.PI * 2);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(12, 74, 110, 0.22)', pathLength: 960 });

  if (progress > 0.55) {
    pops.forEach((p) => {
      const px = cx + p.x * radius;
      const py = cy + p.y * radius;
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, Math.PI * 2);
      ctx.fill();

      if (p.name) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 13px ${FONTS.sans}`;
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py - 11);
      }
    });
  }

  if (label) {
    Effects.typeText(ctx, label, cx, cy + radius + 28, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 19. TOKEN BUCKET RATE LIMITER VISUALIZER
function rateLimiterBucket(ctx, cx, cy, opts = {}) {
  const w = opts.width || 116;
  const h = opts.height || 126;
  const fillLevel = opts.fillLevel !== undefined ? opts.fillLevel : 0.65;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const tokens = opts.tokens !== undefined ? opts.tokens : 4;
  const label = opts.label !== undefined ? opts.label : 'Token Bucket (100 req/s)';

  if (progress <= 0.01) return;

  const topW = w;
  const botW = w * 0.78;
  const yTop = cy - h / 2;
  const yBot = cy + h / 2;

  ctx.save();
  // Liquid capacity fill
  if (progress > 0.4) {
    const fh = h * Math.max(0.1, Math.min(1, fillLevel)) * progress;
    const fy = yBot - fh;
    ctx.fillStyle = fillLevel > 0.25 ? 'rgba(56, 189, 248, 0.26)' : 'rgba(248, 113, 113, 0.28)';
    ctx.beginPath();
    ctx.moveTo(cx - topW * 0.44, fy);
    ctx.lineTo(cx + topW * 0.44, fy);
    ctx.lineTo(cx + botW / 2, yBot);
    ctx.lineTo(cx - botW / 2, yBot);
    ctx.closePath();
    ctx.fill();
  }

  // Bucket wireframe trapezoid
  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(cx - topW / 2, yTop);
    c.lineTo(cx - botW / 2, yBot);
    c.lineTo(cx + botW / 2, yBot);
    c.lineTo(cx + topW / 2, yTop);
  }, progress, { stroke: '#5CE1E6', lineWidth: 2.6, pathLength: 420 });

  // Gold tokens inside bucket
  if (progress > 0.6) {
    for (let i = 0; i < tokens; i++) {
      const tx = cx - 26 + (i % 3) * 26;
      const ty = yBot - 22 - Math.floor(i / 3) * 24;
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (label) {
    Effects.typeText(ctx, label, cx, yBot + 28, progress, {
      font: `600 16px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 20. 3D MEMORY HIERARCHY & LATENCY PYRAMID (Style A: Hardware Cutaway)
function memoryHierarchyPyramid(ctx, cx, cy, opts = {}) {
  const w = opts.width || 520;
  const h = opts.height || 440;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const tiers = opts.tiers || [
    { name: 'CPU L1/L2 Cache', latency: '1 ns', color: '#FACC15', fill: 'rgba(250, 204, 21, 0.22)', active: false, bar: 0.08 },
    { name: 'DRAM (Redis In-Memory)', latency: '100 ns ⚡', color: '#34D399', fill: 'rgba(16, 185, 129, 0.35)', active: true, bar: 0.18 },
    { name: 'NVMe Flash SSD', latency: '10,000 ns (100x Slower)', color: '#38BDF8', fill: 'rgba(56, 189, 248, 0.16)', active: false, bar: 0.65 },
    { name: 'Magnetic Disk / Network', latency: '1,000,000 ns (10,000x)', color: '#F87171', fill: 'rgba(248, 113, 113, 0.18)', active: false, bar: 1.0 }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  const topY = cy - h / 2;
  const tierGap = 12;
  const tierH = (h - (tiers.length - 1) * tierGap) / tiers.length;

  tiers.forEach((tier, i) => {
    const localP = Math.max(0, Math.min(1, (progress - i * 0.12) / 0.6));
    if (localP <= 0.01) return;

    const ty = topY + i * (tierH + tierGap);
    const topRatio = 0.36 + (i / tiers.length) * 0.64;
    const botRatio = 0.36 + ((i + 0.88) / tiers.length) * 0.64;
    const tw1 = w * topRatio;
    const tw2 = w * botRatio;

    ctx.save();
    ctx.globalAlpha *= localP;

    // Trapezoid body
    ctx.beginPath();
    ctx.moveTo(cx - tw1 / 2, ty);
    ctx.lineTo(cx + tw1 / 2, ty);
    ctx.lineTo(cx + tw2 / 2, ty + tierH);
    ctx.lineTo(cx - tw2 / 2, ty + tierH);
    ctx.closePath();
    ctx.fillStyle = tier.fill;
    ctx.fill();

    ctx.strokeStyle = tier.color;
    ctx.lineWidth = tier.active ? 3 : 1.8;
    if (tier.active) {
      ctx.shadowColor = tier.color;
      ctx.shadowBlur = 16;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Tier title & latency
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${tier.active ? 18 : 16}px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(tier.name, cx, ty + tierH * 0.44);

    ctx.fillStyle = tier.color;
    ctx.font = `700 15px ${FONTS.mono}`;
    ctx.fillText(tier.latency, cx, ty + tierH * 0.78);

    // Active pointer badge on left
    if (tier.active) {
      const badgeLabel = tier.badge || opts.activeBadge || 'REDIS ZONE';
      const bx = cx - tw2 / 2 - 125;
      const by = ty + tierH / 2 - 16;
      ctx.beginPath();
      ctx.roundRect(bx, by, 108, 32, 16);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.fillStyle = '#052E16';
      ctx.font = `800 13px ${FONTS.mono}`;
      ctx.fillText(badgeLabel, bx + 54, by + 21);
    }

    ctx.restore();
  });

  ctx.restore();
}

// 21. CONTIGUOUS MEMORY BYTE-ARRAY TAPE & STRUCT LAYOUT (Style A: Memory Strip)
function byteArrayTape(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'SDS Memory Layout (Contiguous Byte Array)';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const cells = opts.cells || [
    { label: 'len = 5', sub: '4 Bytes', color: '#FACC15', bg: 'rgba(250, 204, 21, 0.20)', span: 1.3 },
    { label: 'alloc = 16', sub: '4 Bytes', color: '#34D399', bg: 'rgba(52, 211, 153, 0.20)', span: 1.3 },
    { label: 'flags', sub: '1B', color: '#C084FC', bg: 'rgba(192, 132, 252, 0.20)', span: 0.9 },
    { label: "'R'", sub: '0x52', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.22)', span: 0.7 },
    { label: "'E'", sub: '0x45', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.22)', span: 0.7 },
    { label: "'D'", sub: '0x44', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.22)', span: 0.7 },
    { label: "'I'", sub: '0x49', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.22)', span: 0.7 },
    { label: "'S'", sub: '0x53', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.22)', span: 0.7 },
    { label: "'\\0'", sub: '1B', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.18)', span: 0.7 },
    { label: 'free (11B)', sub: 'Pre-allocated', color: '#4ADE80', bg: 'rgba(74, 222, 128, 0.12)', span: 1.6, dashed: true }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  if (title) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 20px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(title, x, y - 42);
  }

  const totalSpan = cells.reduce((acc, c) => acc + (c.span || 1), 0);
  let curX = x;
  const tapeH = Math.min(86, h);

  // Draw top brackets if provided
  if (opts.brackets) {
    opts.brackets.forEach((b) => {
      const bx1 = x + w * b.startRatio;
      const bx2 = x + w * b.endRatio;
      const by = y - 12;
      ctx.strokeStyle = b.color || '#94A3B8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(bx1 + 4, by + 6);
      ctx.lineTo(bx1 + 4, by - 4);
      ctx.lineTo(bx2 - 4, by - 4);
      ctx.lineTo(bx2 - 4, by + 6);
      ctx.stroke();

      ctx.fillStyle = b.color || '#E2E8F0';
      ctx.font = `600 13px ${FONTS.mono}`;
      ctx.textAlign = 'center';
      ctx.fillText(b.label, (bx1 + bx2) / 2, by - 10);
    });
  }

  cells.forEach((c, idx) => {
    const cw = (w * (c.span || 1)) / totalSpan;
    const cellP = Math.max(0, Math.min(1, (progress * 1.3) - idx * 0.05));
    if (cellP <= 0.01) {
      curX += cw;
      return;
    }

    ctx.save();
    ctx.globalAlpha *= cellP;
    ctx.beginPath();
    ctx.roundRect(curX + 2, y, cw - 4, tapeH, 6);
    ctx.fillStyle = c.bg || 'rgba(30, 41, 59, 0.85)';
    ctx.fill();

    ctx.strokeStyle = c.color || '#38BDF8';
    ctx.lineWidth = 1.8;
    if (c.dashed) ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 15px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(c.label, curX + cw / 2, y + tapeH * 0.45);

    if (c.sub) {
      ctx.fillStyle = c.color || '#94A3B8';
      ctx.font = `500 12px ${FONTS.mono}`;
      ctx.fillText(c.sub, curX + cw / 2, y + tapeH * 0.78);
    }
    ctx.restore();
    curX += cw;
  });

  ctx.restore();
}

// 22. RADIAL HUB-AND-SPOKE REACTOR TOPOLOGY (Style B: Radial Canvas)
function radialHubAndSpoke(ctx, cx, cy, opts = {}) {
  const rx = opts.rx || 430;
  const ry = opts.ry || 255;
  const hubRadius = opts.hubRadius || 98;
  const hubTitle = opts.hubTitle || 'epoll_wait()';
  const hubSub = opts.hubSub || 'O(1) Kernel Reactor';
  const hubColor = opts.hubColor || '#FACC15';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const timeSec = opts.timeSec || 0;
  const nodes = opts.nodes || [
    { label: 'Client #1', cmd: 'SET user:1', angle: -145, color: '#38BDF8' },
    { label: 'Client #2', cmd: 'GET cart:9', angle: -180, color: '#34D399' },
    { label: 'Client #3', cmd: 'INCR hits', angle: 145, color: '#C084FC' },
    { label: 'Client #4', cmd: 'HSET prof', angle: -35, color: '#F472B6' },
    { label: 'Client #5', cmd: 'ZADD rank', angle: 0, color: '#FBBF24' },
    { label: 'Client #6', cmd: 'LPUSH job', angle: 35, color: '#60A5FA' }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  // Outer subtle orbital guide ellipse
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Draw radial spokes and satellite nodes
  nodes.forEach((n, idx) => {
    const rad = (n.angle * Math.PI) / 180;
    const nx = cx + Math.cos(rad) * rx;
    const ny = cy + Math.sin(rad) * ry;
    const hx = cx + Math.cos(rad) * (hubRadius + 12);
    const hy = cy + Math.sin(rad) * (hubRadius + 12);

    // Spoke line
    ctx.save();
    ctx.strokeStyle = n.color;
    ctx.globalAlpha *= 0.45;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(hx, hy);
    ctx.stroke();
    ctx.restore();

    // Animated packet traveling inward along spoke
    const packetPhase = ((timeSec * 0.85 + idx * 0.21) % 1);
    const px = nx + (hx - nx) * packetPhase;
    const py = ny + (hy - ny) * packetPhase;
    ctx.save();
    ctx.fillStyle = n.color;
    ctx.shadowColor = n.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, py, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Satellite node pill card
    const nw = 178;
    const nh = 68;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(nx - nw / 2, ny - nh / 2, nw, nh, 12);
    ctx.fillStyle = 'rgba(17, 24, 39, 0.92)';
    ctx.fill();
    ctx.strokeStyle = n.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(n.label, nx, ny - 6);

    ctx.fillStyle = n.color;
    ctx.font = `600 13.5px ${FONTS.mono}`;
    ctx.fillText(n.cmd, nx, ny + 18);
    ctx.restore();
  });

  // Central Glowing Reactor Core
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 12, cx, cy, hubRadius + 24);
  grad.addColorStop(0, 'rgba(250, 204, 21, 0.28)');
  grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius + 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#141B2D';
  ctx.fill();
  ctx.strokeStyle = hubColor;
  ctx.lineWidth = 3.2;
  ctx.stroke();

  // Rotating inner dashed ring
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(timeSec * 0.6);
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, hubRadius - 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 20px ${FONTS.mono}`;
  ctx.textAlign = 'center';
  ctx.fillText(hubTitle, cx, cy - 4);

  ctx.fillStyle = hubColor;
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.fillText(hubSub, cx, cy + 20);
  ctx.restore();

  ctx.restore();
}

// 23. HORIZONTAL "VS" EXECUTION RACE & TIMELINE LANES (Style C: Top-vs-Bottom Split Battle)
function horizontalLaneRace(ctx, x, y, w, h, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const topLane = opts.topLane || {
    tag: 'STOP-THE-WORLD RESIZE (Traditional Hash Table)',
    desc: 'Blocks all client requests while copying 100M keys at once',
    latency: '4,200 ms FREEZE ❌',
    color: '#EF4444',
    bg: 'rgba(127, 29, 29, 0.22)'
  };
  const bottomLane = opts.bottomLane || {
    tag: 'PROGRESSIVE REHASHING (Redis dict.c)',
    desc: 'Migrates 1 bucket per query incrementally: ht[0] -> ht[1]',
    latency: '0.08 ms (ZERO FREEZE) ✔',
    color: '#10B981',
    bg: 'rgba(6, 78, 59, 0.24)'
  };

  if (progress <= 0.01) return;

  const laneH = (h - 44) / 2;
  const botY = y + laneH + 44;

  ctx.save();
  ctx.globalAlpha *= progress;

  // Top Lane
  ctx.beginPath();
  ctx.roundRect(x, y, w, laneH, 14);
  ctx.fillStyle = topLane.bg;
  ctx.fill();
  ctx.strokeStyle = topLane.color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Top Header Strip
  ctx.fillStyle = topLane.color;
  ctx.font = `800 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(topLane.tag, x + 24, y + 32);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = `500 14.5px ${FONTS.sans}`;
  ctx.fillText(topLane.desc, x + 24, y + 56);

  // Latency Badge Right
  ctx.beginPath();
  ctx.roundRect(x + w - 260, y + 16, 236, 38, 19);
  ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
  ctx.fill();
  ctx.strokeStyle = topLane.color;
  ctx.stroke();
  ctx.fillStyle = '#FCA5A5';
  ctx.font = `700 15px ${FONTS.mono}`;
  ctx.textAlign = 'center';
  ctx.fillText(topLane.latency, x + w - 142, y + 40);

  // Bottom Lane
  ctx.beginPath();
  ctx.roundRect(x, botY, w, laneH, 14);
  ctx.fillStyle = bottomLane.bg;
  ctx.fill();
  ctx.strokeStyle = bottomLane.color;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.fillStyle = '#34D399';
  ctx.font = `800 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(bottomLane.tag, x + 24, botY + 32);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = `500 14.5px ${FONTS.sans}`;
  ctx.fillText(bottomLane.desc, x + 24, botY + 56);

  ctx.beginPath();
  ctx.roundRect(x + w - 260, botY + 16, 236, 38, 19);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.stroke();
  ctx.fillStyle = '#A7F3D0';
  ctx.font = `700 15px ${FONTS.mono}`;
  ctx.textAlign = 'center';
  ctx.fillText(bottomLane.latency, x + w - 142, botY + 40);

  // Center Glowing VS Emblem
  const vsY = y + laneH + 22;
  const vsX = x + w / 2;
  ctx.beginPath();
  ctx.moveTo(x + 40, vsY);
  ctx.lineTo(x + w - 40, vsY);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.arc(vsX, vsY, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#FACC15';
  ctx.fill();
  ctx.fillStyle = '#0F172A';
  ctx.font = `900 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('VS', vsX, vsY + 6);

  ctx.restore();
}

// 24. TRIANGULAR QUORUM CONSENSUS MESH (Style E: Sentinel / Raft Mesh)
function quorumTriangleMesh(ctx, cx, cy, opts = {}) {
  const radius = opts.radius || 145;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const timeSec = opts.timeSec || 0;
  const nodes = opts.nodes || [
    { name: 'Sentinel 1', role: 'Leader ★', color: '#FACC15', angle: -90 },
    { name: 'Sentinel 2', role: 'Voter ✔', color: '#38BDF8', angle: 30 },
    { name: 'Sentinel 3', role: 'Voter ✔', color: '#38BDF8', angle: 150 }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  const pts = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: cx + Math.cos(rad) * radius,
      y: cy + Math.sin(rad) * radius * 0.85
    };
  });

  // Mesh heartbeat edges
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
    ctx.lineWidth = 2.2;
    ctx.setLineDash([7, 5]);
    ctx.lineDashOffset = -timeSec * 32;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.restore();
  }

  // Center Quorum Pill
  ctx.beginPath();
  ctx.roundRect(cx - 82, cy - 20, 164, 40, 20);
  ctx.fillStyle = 'rgba(250, 204, 21, 0.18)';
  ctx.fill();
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.fillStyle = '#FEF08A';
  ctx.font = `700 13.5px ${FONTS.mono}`;
  ctx.textAlign = 'center';
  ctx.fillText('QUORUM (2/3) ✔', cx, cy + 5);

  // Sentinel vertices
  pts.forEach((p) => {
    const bw = 156;
    const bh = 58;
    ctx.beginPath();
    ctx.roundRect(p.x - bw / 2, p.y - bh / 2, bw, bh, 12);
    ctx.fillStyle = '#111827';
    ctx.fill();
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(p.name, p.x, p.y - 4);

    ctx.fillStyle = p.color;
    ctx.font = `600 12.5px ${FONTS.mono}`;
    ctx.fillText(p.role, p.x, p.y + 16);
  });

  ctx.restore();
}

// 25. 16,384 HASH-SLOT CLUSTER RING TOPOLOGY (Style E: Circular Sharding Ring)
function hashSlotRingCluster(ctx, cx, cy, opts = {}) {
  const radius = opts.radius || 175;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const timeSec = opts.timeSec || 0;
  const shards = opts.shards || [
    { name: 'Master Shard 1', range: 'Slots 0..5460', color: '#38BDF8', startDeg: -110, endDeg: 0 },
    { name: 'Master Shard 2', range: 'Slots 5461..10922', color: '#34D399', startDeg: 10, endDeg: 120 },
    { name: 'Master Shard 3', range: 'Slots 10923..16383', color: '#FACC15', startDeg: 130, endDeg: 240 }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  // Draw segmented glowing ring arcs
  shards.forEach((sh, idx) => {
    const a1 = (sh.startDeg * Math.PI) / 180;
    const a2 = (sh.endDeg * Math.PI) / 180;
    const mid = (a1 + a2) / 2;

    ctx.save();
    ctx.strokeStyle = sh.color;
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, a1, a1 + (a2 - a1) * progress);
    ctx.stroke();
    ctx.restore();

    // Docked Shard Node outside arc midpoint
    const nx = cx + Math.cos(mid) * (radius + 115);
    const ny = cy + Math.sin(mid) * (radius + 88);

    // Routing beam from center to shard
    ctx.save();
    ctx.strokeStyle = sh.color;
    ctx.globalAlpha *= 0.45;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.lineDashOffset = -timeSec * 36;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    ctx.restore();

    const nw = 188;
    const nh = 68;
    ctx.beginPath();
    ctx.roundRect(nx - nw / 2, ny - nh / 2, nw, nh, 10);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
    ctx.strokeStyle = sh.color;
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(sh.name, nx, ny - 6);

    ctx.fillStyle = sh.color;
    ctx.font = `600 13px ${FONTS.mono}`;
    ctx.fillText(sh.range, nx, ny + 18);
  });

  // Center Smart Client Formula Core
  ctx.beginPath();
  ctx.arc(cx, cy, 86, 0, Math.PI * 2);
  ctx.fillStyle = '#111827';
  ctx.fill();
  ctx.strokeStyle = '#5CE1E6';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('Smart Client', cx, cy - 18);
  ctx.fillStyle = '#5CE1E6';
  ctx.font = `700 14px ${FONTS.mono}`;
  ctx.fillText('CRC16(key)', cx, cy + 5);
  ctx.fillStyle = '#FACC15';
  ctx.fillText('% 16,384', cx, cy + 25);

  ctx.restore();
}

// 26. 2x2 ARCHITECTURAL DO'S & DON'TS SCORECARD MATRIX (Style F: Blueprint Scorecard)
function scorecardMatrix(ctx, x, y, w, h, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const items = opts.items || [
    { type: 'dont', title: 'Big Keys (>10MB Hashes)', cmd: '❌ DEL huge_user_hash', desc: 'Blocks single thread for seconds during synchronous free', color: '#F87171' },
    { type: 'do', title: 'Async Background Free', cmd: '✔ UNLINK huge_user_hash', desc: 'Unlinks pointer in O(1) and frees memory on bio thread', color: '#34D399' },
    { type: 'dont', title: 'Unbounded Lua Loops', cmd: '❌ EVAL "while true..."', desc: 'Atomic script execution freezes all 10,000+ clients', color: '#F87171' },
    { type: 'do', title: '75% maxmemory Cap', cmd: '✔ maxmemory 75% RAM', desc: 'Leaves 25% headroom for BGSAVE Copy-On-Write pages', color: '#38BDF8' }
  ];

  if (progress <= 0.01) return;

  const gap = 22;
  const cardW = (w - gap) / 2;
  const cardH = (h - gap) / 2;

  ctx.save();
  items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = x + col * (cardW + gap);
    const cy = y + row * (cardH + gap);
    const localP = Math.max(0, Math.min(1, (progress * 1.2) - idx * 0.12));
    if (localP <= 0.01) return;

    ctx.save();
    ctx.globalAlpha *= localP;

    // Card surface with top accent bar
    ctx.beginPath();
    ctx.roundRect(cx, cy, cardW, cardH, 14);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fill();
    ctx.strokeStyle = it.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top status pill
    const isDo = it.type === 'do';
    ctx.beginPath();
    ctx.roundRect(cx + 18, cy + 16, 128, 28, 14);
    ctx.fillStyle = isDo ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.22)';
    ctx.fill();
    ctx.fillStyle = it.color;
    ctx.font = `800 12.5px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(isDo ? '✔ BEST PRACTICE' : '❌ ANTI-PATTERN', cx + 82, cy + 35);

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 18px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(it.title, cx + 18, cy + 72);

    // CLI Command box
    ctx.beginPath();
    ctx.roundRect(cx + 18, cy + 88, cardW - 36, 38, 8);
    ctx.fillStyle = '#090D16';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = it.color;
    ctx.font = `600 14.5px ${FONTS.mono}`;
    ctx.fillText(it.cmd, cx + 32, cy + 112);

    // Description
    ctx.fillStyle = '#CBD5E1';
    ctx.font = `500 14px ${FONTS.sans}`;
    ctx.fillText(it.desc, cx + 18, cy + 154);

    ctx.restore();
  });

  ctx.restore();
}

// 27. LINUX SENDFILE() ZERO-COPY DMA KERNEL PIPELINE (Style D: User vs Kernel Bypass)
function zeroCopyDmaPipeline(ctx, x, y, w, h, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const timeSec = opts.timeSec || 0;

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  const divY = y + h * 0.34;

  // Top Stratum: User Space (Bypassed!)
  ctx.beginPath();
  ctx.roundRect(x + 80, y, w - 160, divY - y - 24, 14);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 1.8;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#94A3B8';
  ctx.font = `700 18px ${FONTS.mono}`;
  ctx.textAlign = 'center';
  ctx.fillText('USER SPACE (JVM Process Memory — Completely Bypassed)', x + w / 2, y + 44);

  // Bypass Pill
  ctx.beginPath();
  ctx.roundRect(x + w / 2 - 280, y + 64, 560, 42, 21);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#6EE7B7';
  ctx.font = `800 16px ${FONTS.mono}`;
  ctx.fillText('✔ ZERO CPU DATA COPIES INTO USER SPACE', x + w / 2, y + 91);

  // Kernel Boundary Line
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(x, divY);
  ctx.lineTo(x + w, divY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.roundRect(x + w / 2 - 260, divY - 18, 520, 36, 18);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#FACC15';
  ctx.stroke();
  ctx.fillStyle = '#FEF08A';
  ctx.font = `800 14px ${FONTS.mono}`;
  ctx.fillText('▲ USER SPACE   |   ▼ LINUX KERNEL & HARDWARE DMA', x + w / 2, divY + 5);

  // Bottom Stratum: 3 Hardware / Kernel Stages connected by Direct DMA
  const stages = [
    {
      title: '1. Disk Segment (.log)',
      sub: 'Sequential Read Block',
      badge: 'NVMe / Disk',
      color: '#38BDF8',
      bg: 'rgba(2, 132, 199, 0.24)'
    },
    {
      title: '2. OS PageCache (RAM)',
      sub: 'sendfile() Descriptor Only',
      badge: 'Kernel Buffer',
      color: '#FACC15',
      bg: 'rgba(161, 98, 7, 0.26)'
    },
    {
      title: '3. NIC TX Ring Buffer',
      sub: '10+ Gbps Wire Streaming',
      badge: 'Network Card',
      color: '#34D399',
      bg: 'rgba(6, 78, 59, 0.30)'
    }
  ];

  const cardW = 360;
  const cardH = 195;
  const cardY = divY + 56;
  const spacing = (w - cardW * 3) / 2;

  stages.forEach((st, idx) => {
    const cx = x + idx * (cardW + spacing);
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cardW, cardH, 16);
    ctx.fillStyle = st.bg;
    ctx.fill();
    ctx.strokeStyle = st.color;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Badge
    ctx.beginPath();
    ctx.roundRect(cx + cardW / 2 - 76, cardY + 20, 152, 30, 15);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fill();
    ctx.strokeStyle = st.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = st.color;
    ctx.font = `700 13px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(st.badge, cx + cardW / 2, cardY + 40);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 22px ${FONTS.sans}`;
    ctx.fillText(st.title, cx + cardW / 2, cardY + 102);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = `600 15.5px ${FONTS.mono}`;
    ctx.fillText(st.sub, cx + cardW / 2, cardY + 142);

    if (idx < 2) {
      const ax1 = cx + cardW + 10;
      const ax2 = cx + cardW + spacing - 10;
      const ay = cardY + cardH / 2;
      Connectors.solidArrow(ctx, ax1, ay, ax2, ay, {
        progress,
        color: idx === 0 ? '#38BDF8' : '#34D399',
        lineWidth: 3.2,
        label: idx === 0 ? 'DMA Engine #1' : 'DMA Engine #2 (0 CPU)'
      });

      // Flowing DMA packet dot
      const phase = (timeSec * 1.1 + idx * 0.4) % 1;
      const px = ax1 + (ax2 - ax1) * phase;
      ctx.save();
      ctx.fillStyle = '#FACC15';
      ctx.shadowColor = '#FACC15';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, ay, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  ctx.restore();
}

// 28. PARALLEL PARTITION STREAM & CONSUMER GROUP MESH (Style B: Fan-out Parallel Stream)
function partitionConsumerMesh(ctx, x, y, w, h, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const timeSec = opts.timeSec || 0;
  const partitions = opts.partitions || [
    { name: 'Partition 0 (Broker 1)', offsets: ['#81', '#82', '#83', '#84'], consumer: 'Consumer A', throughput: '350K msg/s', color: '#38BDF8' },
    { name: 'Partition 1 (Broker 2)', offsets: ['#44', '#45', '#46', '#47'], consumer: 'Consumer B', throughput: '350K msg/s', color: '#34D399' },
    { name: 'Partition 2 (Broker 3)', offsets: ['#92', '#93', '#94', '#95'], consumer: 'Consumer C', throughput: '350K msg/s', color: '#FACC15' }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  const rowGap = 28;
  const rowH = (h - rowGap * (partitions.length - 1)) / partitions.length;
  const partW = 640;
  const consW = 420;
  const arrowSpan = w - partW - consW;

  partitions.forEach((p, idx) => {
    const ry = y + idx * (rowH + rowGap);

    // Left Partition Log Box
    pubSubTopicBox(ctx, x, ry, partW, rowH, {
      title: p.name,
      offsets: p.offsets,
      activeSlot: p.offsets.length - 1,
      tint: idx === 0 ? 'teal' : (idx === 1 ? 'emerald' : 'olive'),
      progress
    });

    // Center Parallel Stream Arrow
    const ax1 = x + partW + 16;
    const ax2 = x + partW + arrowSpan - 16;
    const ay = ry + rowH / 2;

    Connectors.solidArrow(ctx, ax1, ay, ax2, ay, {
      progress,
      color: p.color,
      lineWidth: 2.8,
      label: p.throughput
    });

    // Animated stream pulse
    const phase = (timeSec * 1.2 + idx * 0.33) % 1;
    const px = ax1 + (ax2 - ax1) * phase;
    ctx.save();
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, ay, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right Dedicated Consumer Card
    const cx = x + partW + arrowSpan;
    ctx.beginPath();
    ctx.roundRect(cx, ry, consW, rowH, 14);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 22px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(p.consumer, cx + consW / 2, ry + rowH * 0.44);

    ctx.fillStyle = p.color;
    ctx.font = `600 15.5px ${FONTS.mono}`;
    ctx.fillText('1:1 Exclusive Partition Lock-Free Read', cx + consW / 2, ry + rowH * 0.76);
  });

  ctx.restore();
}

module.exports = {
  isometricServerStack,
  foldedFileBadge,
  wireframeBrowser,
  wireframeCylinderDb,
  lineArtUser,
  stateMutationCard,
  brokenLinkPlug,
  evolutionTimeline,
  heroMetricSlam,
  comparisonSplitTable,
  swimlaneSequence,
  consistentHashRing,
  bTreeHierarchy,
  networkPacketFrame,
  loadBalancerRouter,
  pubSubTopicBox,
  circuitBreakerSwitch,
  cdnEdgeGlobe,
  rateLimiterBucket,
  memoryHierarchyPyramid,
  byteArrayTape,
  radialHubAndSpoke,
  horizontalLaneRace,
  quorumTriangleMesh,
  hashSlotRingCluster,
  scorecardMatrix,
  zeroCopyDmaPipeline,
  partitionConsumerMesh
};

  },
  "./core/runner": function(module, exports, __require) {
    const require = (r) => __require("./core/runner", r);
'use strict';

const Theme = require('./theme');
const Camera = require('./camera');
const Icons = require('./icons');

/**
 * Elastic Multi-Scene Timeline Engine & Cinematic Camera Runner (v2.1).
 *
 * Features:
 * - Authentic #262626 ByteByteGo palette + per-scene backdrop ('waves'|'speedlines'|'blueprint')
 * - Built-in 2D Virtual Camera (`camX`, `camY`, `camZoom`) per scene
 * - Smooth cross-scene transitions ('fade' | 'slideLeft' | 'zoomThrough')
 * - Declarative Motion SFX cue timeline (`sfx: [{ time, type, volume }]`)
 * - Synchronized voiceover captions (`captions: [{ start, end, text }]`)
 * - Multi-metric Visual QA Telemetry (`__studioAnalyzeFrame`)
 * - Interactive browser scrubber & keyboard shortcuts (Space, Left/Right, 1-9) when opened in Chrome
 */
function createVideo(config) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return config;
  }

  const width = config.width || 1920;
  const height = config.height || 1080;
  const fps = config.fps || 60;
  const palette = config.palette || 'byteCharcoal';
  const title = config.title || 'Technical Architecture';
  const showProgressBar = config.showProgressBar !== undefined ? config.showProgressBar : true;
  const showCaptions = config.showCaptions === true;

  const canvas = typeof config.canvas === 'string'
    ? document.querySelector(config.canvas)
    : (config.canvas || document.getElementById('canvas'));

  let scaleFactor = window.__studioScaleFactor || 1;
  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;
  const ctx = canvas.getContext('2d');

  if (config.customIcons) {
    for (const [k, svg] of Object.entries(config.customIcons)) {
      Icons.register(k, svg);
    }
  }

  let cursor = 0;
  const allSfxCues = [];
  const allCaptions = Array.isArray(config.captions) ? [...config.captions] : [];
  const narrationSegments = [];

  const scenes = (config.scenes || []).map((sc, idx) => {
    const duration = sc.duration || 15;
    const start = cursor;
    const end = cursor + duration;
    cursor = end;

    const camBase = Camera.createCameraState(width, height);
    const state = Object.assign(
      camBase,
      { __alpha: 0, __offsetX: 0 },
      sc.initialState ? sc.initialState() : {}
    );

    const qaTime = sc.qaTime !== undefined ? start + sc.qaTime : Number((start + duration * 0.65).toFixed(2));
    const transition = sc.transition || 'fade';

    if (Array.isArray(sc.sfx)) {
      sc.sfx.forEach((cue) => {
        if (cue.type === 'whoosh' || cue.type === 'draw') return;
        allSfxCues.push({
          time: Number((start + (cue.time || 0)).toFixed(3)),
          type: cue.type || 'pop',
          volume: cue.volume !== undefined ? cue.volume : 0.08
        });
      });
    }
    if (Array.isArray(sc.captions)) {
      sc.captions.forEach((cap) => {
        allCaptions.push({
          start: start + (cap.start || 0),
          end: start + (cap.end !== undefined ? cap.end : duration),
          text: cap.text
        });
      });
    }

    // Collect scene narration: if sc.captions has multiple timed beats, push each beat
    // as its own time-aligned narration segment so voiceover locks to visual beat transitions
    // with natural human breathing pauses between beats.
    let scenePersona = config.persona || 'senior-sa';
    let sceneLang = config.lang || 'en';
    if (typeof sc.narration === 'string' && sc.narration.trim()) {
      narrationSegments.push({
        sceneIndex: idx,
        sceneId: sc.id || `scene-${idx + 1}`,
        chapter: sc.chapter || `0${idx + 1}. Scene ${idx + 1}`,
        start,
        end,
        duration,
        leadIn: 0.25,
        persona: scenePersona,
        lang: sceneLang,
        text: sc.narration.trim()
      });
    } else if (sc.narration && typeof sc.narration === 'object' && sc.narration.text) {
      if (sc.narration.persona) scenePersona = sc.narration.persona;
      if (sc.narration.lang) sceneLang = sc.narration.lang;
      narrationSegments.push({
        sceneIndex: idx,
        sceneId: sc.id || `scene-${idx + 1}`,
        chapter: sc.chapter || `0${idx + 1}. Scene ${idx + 1}`,
        start,
        end,
        duration,
        leadIn: 0.25,
        persona: scenePersona,
        lang: sceneLang,
        text: sc.narration.text.trim()
      });
    } else if (Array.isArray(sc.captions) && sc.captions.length > 0) {
      sc.captions.forEach((cap, capIdx) => {
        const capText = (cap.text || '').trim();
        if (!capText) return;
        const relStart = cap.start !== undefined ? cap.start : 0;
        const relEnd = cap.end !== undefined ? cap.end : duration;
        narrationSegments.push({
          sceneIndex: idx,
          beatIndex: capIdx,
          sceneId: `${sc.id || `scene-${idx + 1}`}-beat-${capIdx + 1}`,
          chapter: sc.chapter || `0${idx + 1}. Scene ${idx + 1}`,
          start: start + relStart,
          end: start + relEnd,
          duration: Math.max(1.8, relEnd - relStart),
          leadIn: capIdx === 0 ? 0.14 : 0.10,
          persona: cap.persona || scenePersona,
          lang: cap.lang || sceneLang,
          text: capText
        });
      });
    }

    return {
      index: idx,
      id: sc.id || `scene-${idx + 1}`,
      chapter: sc.chapter || `0${idx + 1}. Scene ${idx + 1}`,
      backdrop: sc.backdrop || 'waves',
      transition,
      duration,
      start,
      end,
      qaTime,
      state,
      build: sc.build,
      render: sc.render
    };
  });

  const totalDuration = cursor || config.duration || 60;

  if (typeof gsap === 'undefined') {
    throw new Error('GSAP is required before TechVideoStudio.createVideo()');
  }

  const masterTl = gsap.timeline({ paused: true });

  scenes.forEach((sc) => {
    const fadeDur = 0.45;
    if (sc.transition === 'slideLeft') {
      sc.state.__offsetX = 140;
      masterTl.to(sc.state, { __alpha: 1, __offsetX: 0, duration: 0.55, ease: 'power3.out' }, sc.start);
    } else {
      masterTl.to(sc.state, { __alpha: 1, duration: fadeDur, ease: 'power2.out' }, sc.start);
    }

    if (typeof sc.build === 'function') {
      const subTl = gsap.timeline();
      sc.build(subTl, sc.state, sc.duration);
      masterTl.add(subTl, sc.start);
    }

    masterTl.to(sc.state, { __alpha: 0, duration: fadeDur, ease: 'power2.in' }, Math.max(sc.start + fadeDur, sc.end - fadeDur));
  });

  let currentTimeSec = 0;

  function renderAt(timeSec) {
    const safeSec = Number.isFinite(timeSec) ? timeSec : currentTimeSec;
    const clamped = Math.max(0, Math.min(totalDuration - 0.001, safeSec));
    currentTimeSec = clamped;
    window.__studioCurrentTimeSec = clamped;
    masterTl.seek(clamped);

    const activeScene = scenes.find((s) => clamped >= s.start && clamped < s.end) || scenes[scenes.length - 1];

    ctx.save();
    if (scaleFactor !== 1) {
      ctx.scale(scaleFactor, scaleFactor);
    }

    Theme.drawBackground(ctx, width, height, palette, {
      backdrop: activeScene ? activeScene.backdrop : 'waves',
      timeSec: clamped
    });

    if (activeScene) {
      ctx.save();
      ctx.globalAlpha = activeScene.state.__alpha;

      ctx.save();
      if (activeScene.state.__offsetX) {
        ctx.translate(activeScene.state.__offsetX, 0);
      }
      Camera.apply(ctx, activeScene.state, width, height);

      activeScene.render(ctx, {
        state: activeScene.state,
        t: clamped,
        localT: clamped - activeScene.start,
        duration: activeScene.duration,
        width,
        height
      });

      Camera.restore(ctx);
      ctx.restore();

      Theme.drawTopHeader(ctx, title, activeScene.chapter, {
        width,
        progress: showProgressBar ? (clamped / totalDuration) : 0
      });

      if (showCaptions) {
        const activeCap = allCaptions.find((c) => clamped >= c.start && clamped <= c.end);
        if (activeCap && activeCap.text) {
          // Sentence-synced proportional chunking so only 1 crisp sentence displays at a time
          const sentences = String(activeCap.text)
            .split(/(?<=[.?!])\s+/)
            .map((s) => s.trim())
            .filter(Boolean);
          let displayCap = activeCap.text;
          if (sentences.length > 1) {
            const totalChars = sentences.reduce((sum, s) => sum + Math.max(8, s.length), 0);
            const capDur = Math.max(0.2, activeCap.end - activeCap.start);
            const relP = Math.max(0, Math.min(0.9999, (clamped - activeCap.start) / capDur));
            let acc = 0;
            for (const s of sentences) {
              acc += Math.max(8, s.length) / totalChars;
              if (relP <= acc) {
                displayCap = s;
                break;
              }
            }
          }
          Theme.drawCaptionBar(ctx, displayCap, { canvasWidth: width });
        }
      }

      ctx.restore();
    }

    ctx.restore();
  }

  window.__studioMeta = {
    version: '2.2.0',
    title,
    width,
    height,
    fps,
    totalDuration,
    qaTimes: scenes.map((s) => s.qaTime),
    sfxCues: allSfxCues,
    narrationSegments,
    scenes: scenes.map((s) => ({
      index: s.index,
      id: s.id,
      chapter: s.chapter,
      backdrop: s.backdrop,
      start: s.start,
      end: s.end,
      duration: s.duration,
      qaTime: s.qaTime
    }))
  };

  window.__studioSetScaleFactor = function (factor) {
    scaleFactor = Math.max(1, Number(factor) || 1);
    window.__studioScaleFactor = scaleFactor;
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    renderAt(currentTimeSec);
  };

  window.__studioSeek = function (timeSec) {
    renderAt(timeSec);
    return true;
  };

  window.__studioCaptureFrameJpeg = function (timeSec, quality = 0.96) {
    renderAt(timeSec);
    return canvas.toDataURL('image/jpeg', quality);
  };

  /**
   * Comprehensive Visual QA Linter & Telemetry Analyzer:
   * - negativeSpacePct: % of canvas remaining clean charcoal backdrop (target: 35% - 88%)
   * - headerZoneClear: checks that diagram elements don't collide with top header bar
   * - activeHueBuckets: verifies visual color diversity (cyan, green, amber, purple, etc.)
   */
  window.__studioAnalyzeFrame = function (timeSec) {
    if (timeSec !== undefined) {
      renderAt(timeSec);
    }
    const sampleStep = Math.max(4, Math.round(8 * scaleFactor));
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let bgPixels = 0;
    let totalSampled = 0;
    let headerBleedPixels = 0;
    let headerSampled = 0;
    const hueBuckets = new Set();

    const headerYMin = Math.round(84 * scaleFactor);
    const headerYMax = Math.round(108 * scaleFactor);

    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const idx = (y * canvas.width + x) * 4;
        const r = img[idx];
        const g = img[idx + 1];
        const b = img[idx + 2];

        const isBg = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && r >= 16 && r <= 64;
        if (isBg) {
          bgPixels++;
        } else {
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          if (maxC - minC > 40) {
            if (r > g && g > b) hueBuckets.add('amber');
            else if (g >= r && g >= b) hueBuckets.add('emerald');
            else if (b >= g && g > r) hueBuckets.add('cyan');
            else if (r > g && b > g) hueBuckets.add('plum');
            else hueBuckets.add('accent');
          }
        }
        totalSampled++;

        if (y >= headerYMin && y <= headerYMax) {
          headerSampled++;
          if (!isBg) headerBleedPixels++;
        }
      }
    }

    const negativeSpacePct = Number(((bgPixels / Math.max(1, totalSampled)) * 100).toFixed(1));
    const headerBleedPct = Number(((headerBleedPixels / Math.max(1, headerSampled)) * 100).toFixed(1));
    const headerZoneClear = headerBleedPct < 8.0;
    const warnings = [];

    if (negativeSpacePct < 30) {
      warnings.push(`Crowded canvas (${negativeSpacePct}% negative space < 30% minimum)`);
    } else if (negativeSpacePct > 96) {
      warnings.push(`Nearly empty frame (${negativeSpacePct}% negative space > 96%)`);
    }
    if (!headerZoneClear) {
      warnings.push(`Diagram bleeds into top header safety zone (${headerBleedPct}%)`);
    }

    return {
      negativeSpacePct,
      headerZoneClear,
      activeHueCount: hueBuckets.size,
      status: warnings.length === 0 ? 'PASS' : 'WARN',
      warnings
    };
  };

  window.startRecording = async function () {
    await readyPromise;
    const stream = canvas.captureStream(fps);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 18000000
    });
    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.start();

    let startWall = null;
    return new Promise((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      };
      function step(now) {
        if (!startWall) startWall = now;
        const elapsed = (now - startWall) / 1000;
        if (elapsed >= totalDuration) {
          recorder.stop();
          return;
        }
        renderAt(elapsed);
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  };

  function setupInteractivePlayer() {
    if (navigator.webdriver) return;

    let playing = new URLSearchParams(window.location.search).get('play') === '1';
    let lastWall = performance.now();

    const hud = document.createElement('div');
    hud.style.cssText = [
      'position:fixed', 'bottom:14px', 'left:50%', 'transform:translateX(-50%)',
      'background:rgba(20,20,20,0.88)', 'border:1px solid rgba(92,225,230,0.35)',
      'border-radius:999px', 'padding:8px 20px', 'display:flex', 'align-items:center',
      'gap:14px', 'color:#fff', 'font:600 13px -apple-system,sans-serif',
      'z-index:9999', 'opacity:0', 'transition:opacity 0.2s', 'backdrop-filter:blur(8px)'
    ].join(';');

    const btn = document.createElement('button');
    btn.textContent = playing ? '⏸ Pause' : '▶ Play';
    btn.style.cssText = 'background:#0284C7;color:#fff;border:none;border-radius:999px;padding:4px 12px;cursor:pointer;font-weight:600';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = String(totalDuration);
    slider.step = '0.05';
    slider.value = String(currentTimeSec);
    slider.style.cssText = 'width:320px;cursor:pointer;accent-color:#5CE1E6';

    const label = document.createElement('span');
    label.style.cssText = 'font-family:monospace;min-width:110px';
    const updateLabel = () => {
      label.textContent = `${currentTimeSec.toFixed(1)}s / ${totalDuration.toFixed(1)}s`;
      slider.value = String(currentTimeSec);
      btn.textContent = playing ? '⏸ Pause' : '▶ Play';
    };
    updateLabel();

    btn.onclick = () => {
      playing = !playing;
      lastWall = performance.now();
      updateLabel();
    };
    slider.oninput = () => {
      playing = false;
      renderAt(parseFloat(slider.value));
      updateLabel();
    };

    hud.appendChild(btn);
    hud.appendChild(slider);
    hud.appendChild(label);
    document.body.appendChild(hud);

    window.addEventListener('mousemove', (e) => {
      hud.style.opacity = e.clientY > window.innerHeight - 110 ? '1' : '0';
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        btn.onclick();
      } else if (e.code === 'ArrowRight') {
        playing = false;
        renderAt(currentTimeSec + 0.5);
        updateLabel();
      } else if (e.code === 'ArrowLeft') {
        playing = false;
        renderAt(currentTimeSec - 0.5);
        updateLabel();
      } else if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        if (scenes[idx]) {
          playing = false;
          renderAt(scenes[idx].qaTime);
          updateLabel();
        }
      }
    });

    function tick(now) {
      if (playing) {
        const dt = (now - lastWall) / 1000;
        lastWall = now;
        renderAt((currentTimeSec + dt) % totalDuration);
        updateLabel();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const readyPromise = Promise.all([
    Icons.initBuiltinIcons(),
    document.fonts ? document.fonts.ready : Promise.resolve()
  ]).then(() => {
    renderAt(scenes[0] ? scenes[0].qaTime : 0);
    window.__studioReady = true;
    window.iconsReady = true;
    setupInteractivePlayer();
  });

  return {
    seek: renderAt,
    meta: window.__studioMeta,
    ready: readyPromise
  };
}

module.exports = {
  createVideo
};

  },
  "./index": function(module, exports, __require) {
    const require = (r) => __require("./index", r);
'use strict';

const Theme = require('./core/theme');
const Camera = require('./core/camera');
const Effects = require('./core/draw-effects');
const Layout = require('./core/layout');
const Connectors = require('./core/connectors');
const Icons = require('./core/icons');
const Whiteboard = require('./core/whiteboard');
const Primitives = require('./illustrations/primitives');
const Archetypes = require('./illustrations/archetypes');
const Runner = require('./core/runner');

// Merge Primitives + Archetypes under Illustrations for ergonomic one-stop access,
// while also exposing Archetypes explicitly.
const Illustrations = Object.assign({}, Primitives, Archetypes);

const TechVideoStudio = {
  version: '4.1.0',
  Theme,
  Camera,
  Effects,
  Layout,
  Connectors,
  Icons,
  Whiteboard,
  Illustrations,
  Archetypes,
  createVideo: Runner.createVideo
};

if (typeof window !== 'undefined') {
  window.TechVideoStudio = TechVideoStudio;
}

module.exports = TechVideoStudio;

  }
  };
  const __cache = {};
  function __normalize(fromId, req) {
    if (!req.startsWith('.')) return req;
    const parts = (fromId.split('/').slice(0, -1).join('/') + '/' + req).split('/');
    const out = [];
    for (const p of parts) {
      if (!p || p === '.') continue;
      if (p === '..') out.pop();
      else out.push(p);
    }
    return './' + out.join('/');
  }
  function __require(fromId, req) {
    const id = __normalize(fromId, req);
    if (__cache[id]) return __cache[id].exports;
    if (!__modules[id]) throw new Error('Module not found: ' + id + ' (from ' + fromId + ')');
    const mod = { exports: {} };
    __cache[id] = mod;
    __modules[id](mod, mod.exports, __require);
    return mod.exports;
  }
  __require('./x', './index');
})();

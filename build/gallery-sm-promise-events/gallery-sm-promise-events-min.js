YUI.add("gallery-sm-promise-events",function(e,t){"use strict";var n=e.Lang.isObject,r=e.Array,i;i=e.Promise.EventNotifier=function(){this._targets=[]},i.decorate=function(e){return e._evts?e:(e._evts={subs:{},targets:[]},e.on=function(t,n){return t&&n&&(e._evts.subs[t]||(e._evts.subs[t]=[]),e._evts.subs[t].push(n)),e},e.then=function(e){return function(t,n){var r=i.decorate(e.call(this,t,n));return this._evts.targets.push(r),r}}(e.then),e)},e.mix(i.prototype,{addEvents:function(e){return this._targets.push(e),i.decorate(e)},fire:function(t,i){var s=this._targets.slice(),o={},u=i&&n(i,!0)?e.merge(i):{},a,f,l,c,h,p,d;for(l=0;l<s.length;++l)s[l]._evts&&(d=e.stamp(s[l]),o[d]||(o[d]=1,s.push.apply(s,s[l]._evts.targets)));u.type=t,arguments.length>1&&(u.details=r(arguments,1,!0));for(l=0,c=s.length;l<c;++l){a=s[l],f=a&&a._evts&&a._evts.subs[t];if(f)for(h=0,p=f.length;h<p;++h)e.soon(e.bind(f[h],null,u))}return this}})},"@VERSION@",{requires:["promise"]});
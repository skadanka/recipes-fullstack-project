(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6524534e"],{"7d11":function(e,t,r){"use strict";var n=r("ff71"),s=r.n(n);s.a},c16e:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e._e(),r("h1",{staticClass:"title"},[e._v("Private")]),e.$root.store.username?e._e():r("router-link",{attrs:{to:"/login",tag:"button"}},[e._v("You need to Login to vue this")]),r("div",{staticClass:"recipes"},[r("RecipePreviewList",{key:e.randomKey,attrs:{title:"Recipes",recipes:e.privateRecipes}})],1)],1)},s=[],a=r("2909"),i=(r("96cf"),r("1da1")),c=r("99d8"),o={components:{RecipePreviewList:c["a"]},props:{},data:function(){return{randomKey:0,privateRecipes:[]}},mounted:function(){this.updateRecipes()},methods:{updateRecipes:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get(e.$root.store.server_domain+"/users/created-recipes");case 3:n=t.sent,s=n.data.recipes,console.log(n.data),e.privateRecipes=[],(r=e.privateRecipes).push.apply(r,Object(a["a"])(s)),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))()}}},p=o,u=(r("7d11"),r("2877")),d=Object(u["a"])(p,n,s,!1,null,"44452142",null);t["default"]=d.exports},ff71:function(e,t,r){}}]);
//# sourceMappingURL=chunk-6524534e.6a87fa32.js.map
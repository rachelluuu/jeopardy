(this.webpackJsonpconfusion=this.webpackJsonpconfusion||[]).push([[0],{45:function(e,t,a){e.exports=a(76)},51:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(8),l=a.n(c),s=(a(50),a(51),a(52),a(53),a(9)),o=a(10),i=a(13),u=a(11),m=a(14),p=a(6),f=a(7),E=function(){return r.a.createElement("div",{className:"col-12"},r.a.createElement("span",{className:"fa fa-spinner fa-pulse fa-3x fa-fw text-primary"}),r.a.createElement("p",null,"Loading . . ."))};function d(e){var t=e.qa;e.onClick;return r.a.createElement(p.a,null,r.a.createElement(f.b,{to:"/search/".concat(t.id)},r.a.createElement(p.b,null,r.a.createElement(p.c,null,t.question))))}var v=function(e){var t=e.qas.qas.filter((function(e){return""!==e.question})).map((function(t){return r.a.createElement("div",{className:"question col-lg-3 col-md-6 col-12",key:t.id},r.a.createElement(d,{qa:t,onClick:e.onClick}))}));return e.qas.isLoading?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"xxxrow"},r.a.createElement(E,null))):e.qas.errMess?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h4",null,e.qas.errMess)))):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},t))};function h(e){var t=e.qa;return r.a.createElement(p.a,null,r.a.createElement(p.b,null,r.a.createElement(p.c,null,"Question: ",t.question),"Answer: ",t.answer,r.a.createElement("hr",null),r.a.createElement("ul",null,r.a.createElement("li",null,"Value: ",t.value),r.a.createElement("li",null,"Category: ",t.category.title),r.a.createElement("li",null,"Air Date: ",t.airdate))))}var b=function(e){return e.isLoading?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(E,null))):e.errMess?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h4",null,e.errMess))):(console.log(e),null==e.qa?r.a.createElement("div",null):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"question col-12"},r.a.createElement(h,{qa:e.qa})))))},O=a(18),g=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={isNavOpen:!1},a.toggleNav=a.toggleNav.bind(Object(O.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"toggleNav",value:function(){this.setState({isNavOpen:!this.state.isNavOpen})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p.g,{dark:!0,expand:"md"},r.a.createElement("div",{className:"container"},r.a.createElement(p.i,{onClick:this.toggleNav}),r.a.createElement(p.h,{className:"mr-auto",href:"/jeopardy"},r.a.createElement("b",null,"Jeopardy!")),r.a.createElement(p.d,{isOpen:this.state.isNavOpen,navbar:!0},r.a.createElement(p.e,{navbar:!0},r.a.createElement(p.f,null,r.a.createElement(f.c,{className:"nav-link",to:"/search"},r.a.createElement("span",{className:"fa fa-info fa-lg"})," Search")),r.a.createElement(p.f,null,r.a.createElement(f.c,{className:"nav-link",to:"/play"},r.a.createElement("span",{className:"fa fa-list fa-lg"})," Play")))))))}}]),t}(n.Component);var y=function(e){return r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-auto"},r.a.createElement("p",null,"\xa9 Copyright 2019 Rachel Lu"))))},N=a(23),j=function(){return{type:"QAS_LOADING"}},q=function(e){return{type:"QAS_FAILED",payload:e}},w=function(e){return{type:"ADD_QAS",payload:e}},k=a(29),A=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"onDishSelect",value:function(e){this.setState({selectedDish:e})}},{key:"componentDidMount",value:function(){this.props.fetchQAs()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(g,null),r.a.createElement(k.TransitionGroup,null,r.a.createElement(k.CSSTransition,{key:this.props.location.key,classNames:"page",timeout:300},r.a.createElement(f.f,{location:this.props.location},r.a.createElement(f.e,{exact:!0,path:"/search",component:function(){return r.a.createElement("div",{className:"container"},r.a.createElement(v,{qas:e.props.qas,onClick:function(t){return e.onQASelect(t)}}),r.a.createElement(b,{qa:e.props.qas.qas.filter((function(t){return t.id===e.props.selectedQa}))[0]}))}}),r.a.createElement(f.e,{path:"/search/:qaId",component:function(t){var a=t.match;return r.a.createElement(b,{qa:e.props.qas.qas.filter((function(e){return e.id===parseInt(a.params.qaId,10)}))[0],isLoading:e.props.qas.isLoading,errMess:e.props.qas.errMess})}}),r.a.createElement(f.d,{to:"/search"})))),r.a.createElement(y,null))}}]),t}(n.Component),D=Object(f.g)(Object(N.b)((function(e){return{qas:e.qas}}),(function(e){return{fetchQAs:function(){e((function(e){return e(j(!0)),fetch("https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues").then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(t){return e(w(t))})).catch((function(t){return e(q(t.message))}))}))}}}))(A)),S=(a(75),a(15)),L=a(42);function C(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?C(a,!0).forEach((function(t){Object(L.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):C(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!0,errMess:null,qas:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_QAS":return M({},e,{isLoading:!1,errMess:null,qas:t.payload});case"QAS_LOADING":return M({},e,{isLoading:!0,errMess:null,qas:[]});case"QAS_FAILED":return M({},e,{isLoading:!1,errMess:t.payload});default:return e}},x=a(43),P=a.n(x),I=a(44),_=a.n(I),G=Object(S.d)(Object(S.c)({qas:Q}),Object(S.a)(P.a,_.a)),J=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(N.a,{store:G},r.a.createElement(f.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(D,null))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[45,1,2]]]);
//# sourceMappingURL=main.271c50a7.chunk.js.map
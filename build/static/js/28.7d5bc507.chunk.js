(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[28],{698:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"f",(function(){return p})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return m})),n.d(t,"d",(function(){return v})),n.d(t,"a",(function(){return b}));var a=n(242),r=n(48),i=n(47),o=n(241),c=n(710),l=n.n(c),s=n(711),u=n.n(s),d=function(e){return e.replace(/[^\d+]+/g,"")},p=function(e){return e.replace(/[,.]/g,"")},f=function(e){var t=e.data,n=e.filters,a=e.columns_keys,r=t;if(n.search){var i=n.search.toLowerCase();r=t.filter((function(e){return a.find((function(t){var n;return null===(n=e[t])||void 0===n?void 0:n.toLowerCase().match(i)}))?e:null}))}return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{order:"ascend"};return Object(o.a)(e).sort((function(e,a){var r=e[t],i=a[t];if("ascend"===n.order){if(r<i)return-1;if(r>i)return 1}else{if(r>i)return-1;if(r<i)return 1}return 0}))}(r,n.sort.field,{order:n.sort.order})},m=function e(t){var n=[!1,0];return Object.entries(t).reduce((function(t,a){var r=Object(i.a)(a,2),o=r[0],c=r[1];return c&&"object"===typeof c?t[o]=e(c):(Boolean(c)||n.includes(c))&&(t[o]=c),t}),{})},v=function(e){return e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"")},b=function(e,t,n){var i=t.map((function(e){return n.reduce((function(t,n){var i=e[n.key];return"function"===typeof n.render?Object(r.a)({},t,Object(a.a)({},n.name,n.render(e))):Object(r.a)({},t,Object(a.a)({},n.name,i))}),{})})),o={Sheets:{data:u.a.utils.json_to_sheet(i)},SheetNames:["data"]},c=u.a.write(o,{bookType:"xlsx",type:"array"}),s=new Blob([c],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});l.a.saveAs(s,e+".xlsx")}},699:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(90),o=n.n(i),c=n(701),l=n(361),s=n(10);t.a=function(e){var t=e||{},n=t.content,a=t.duration,i=void 0===a?1500:a,s=t.onEndDuration,d={loop:!1,autoplay:!0,animationData:c,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}};l.a.success({title:r.a.createElement(o.a,{width:150,height:150,options:d}),icon:null,content:r.a.createElement(u,null,n),centered:!0,okButtonProps:{style:{display:"none"}}}),setTimeout((function(){null===s||void 0===s||s(),l.a.destroyAll()}),i)};var u=s.c.div.withConfig({displayName:"successModal__Content",componentId:"uq8ekf-0"})(["text-align:center;font-size:16px;"])},701:function(e){e.exports=JSON.parse('{"v":"5.6.10","fr":60,"ip":0,"op":60,"w":100,"h":100,"nm":"Icons_Done","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Done","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[50.000000000000014,50.000000000000014,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[25.000000000000007,25.000000000000007,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[-26.667,26.667]],"o":[[13.333,13.333],[0,0],[0,0]],"v":[[-60,0],[-20,40],[60,-40]],"c":false},"ix":2},"nm":"\u041a\u043e\u043d\u0442\u0443\u0440 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.101960784314,0.756862745098,0.482352941176,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":16,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"\u041e\u0431\u0432\u043e\u0434\u043a\u0430 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c"}],"nm":"\u0424\u0438\u0433\u0443\u0440\u0430 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[0]},{"t":60,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"\u041e\u0431\u0440\u0435\u0437\u0430\u0442\u044c \u043a\u043e\u043d\u0442\u0443\u0440\u044b 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":300,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Stroke","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[50.000000000000014,18.750000000000007,0],"ix":2},"a":{"a":0,"k":[115,-10,0],"ix":1},"s":{"a":0,"k":[25.000000000000007,25.000000000000007,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[69.036,0],[0,-69.036],[-69.036,0],[0,69.036]],"o":[[-69.036,0],[0,69.036],[69.036,0],[0,-69.036]],"v":[[45,-80],[-80,45],[45,170],[170,45]],"c":true},"ix":2},"nm":"\u041a\u043e\u043d\u0442\u0443\u0440 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.101960784314,0.756862745098,0.482352941176,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":16,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"\u041e\u0431\u0432\u043e\u0434\u043a\u0430 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[114.895,114.598],"ix":2},"a":{"a":0,"k":[44.895,44.598],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c"}],"nm":"\u042d\u043b\u043b\u0438\u043f\u0441 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[0]},{"t":60,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"\u041e\u0431\u0440\u0435\u0437\u0430\u0442\u044c \u043a\u043e\u043d\u0442\u0443\u0440\u044b 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":300,"st":0,"bm":0}],"markers":[]}')},702:function(e,t,n){"use strict";var a=n(0),r=n.n(a);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createElement("linearGradient",{id:"SVGID_1_",gradientUnits:"userSpaceOnUse",x1:157.206,x2:399.801,y1:198.835,y2:441.429},r.a.createElement("stop",{offset:0,stopColor:"#28a265"}),r.a.createElement("stop",{offset:1,stopColor:"#28895e"})),l=r.a.createElement("linearGradient",{id:"lg1"},r.a.createElement("stop",{offset:0,stopColor:"#108372",stopOpacity:0}),r.a.createElement("stop",{offset:1,stopColor:"#108372"})),s=r.a.createElement("linearGradient",{id:"SVGID_2_",gradientUnits:"userSpaceOnUse",x1:410.128,x2:371.628,xlinkHref:"#lg1",y1:173.746,y2:61.246}),u=r.a.createElement("linearGradient",{id:"SVGID_3_",gradientUnits:"userSpaceOnUse",x1:343.295,x2:388.016,y1:58.746,y2:103.468},r.a.createElement("stop",{offset:0,stopColor:"#91d1b2"}),r.a.createElement("stop",{offset:1,stopColor:"#28a265"})),d=r.a.createElement("linearGradient",{id:"SVGID_4_",gradientTransform:"matrix(-1 0 0 1 2638.046 0)",gradientUnits:"userSpaceOnUse",x1:2383.023,x2:2383.023,xlinkHref:"#lg1",y1:463.718,y2:513.306}),p=r.a.createElement("g",null,r.a.createElement("path",{d:"m68.219 31.876-.052 446.25c-.002 17.528 14.338 31.872 31.866 31.874l309.91.036c17.534.002 31.882-14.342 31.884-31.876l.042-360.725c.001-9.787-3.886-19.174-10.805-26.095l-80.484-80.503c-6.92-6.921-16.305-10.81-26.092-10.811l-224.386-.026c-17.534-.002-31.881 14.342-31.883 31.876z",fill:"url(#SVGID_1_)"}),r.a.createElement("path",{d:"m345.913 205.238h-181.78c-11.15 0-20.19 9.05-20.19 20.2v191.57c0 11.15 9.04 20.19 20.19 20.19h181.78c11.15 0 20.19-9.04 20.19-20.19v-191.57c0-11.15-9.04-20.2-20.19-20.2zm-17.098 68.498h-51.505c-4.025 0-7.288-3.263-7.288-7.288v-23.923c0-4.025 3.263-7.288 7.288-7.288h51.505c4.025 0 7.288 3.263 7.288 7.288v23.923c0 4.025-3.263 7.288-7.288 7.288zm-51.505 30h51.505c4.025 0 7.288 3.263 7.288 7.288v20.389c0 4.025-3.263 7.288-7.288 7.288h-51.505c-4.025 0-7.288-3.263-7.288-7.288v-20.389c.001-4.025 3.264-7.288 7.288-7.288zm-44.575 34.964h-51.505c-4.025 0-7.288-3.263-7.288-7.288v-20.389c0-4.025 3.263-7.288 7.288-7.288h51.505c4.025 0 7.288 3.263 7.288 7.288v20.389c0 4.025-3.263 7.288-7.288 7.288zm7.288-96.174v23.923c0 4.025-3.263 7.288-7.288 7.288h-51.505c-4.025 0-7.288-3.263-7.288-7.288v-23.923c0-4.025 3.263-7.288 7.288-7.288h51.505c4.025 0 7.288 3.263 7.288 7.288zm-58.793 126.174h51.505c4.025 0 7.288 3.263 7.288 7.288v23.923c0 4.025-3.263 7.288-7.288 7.288h-51.505c-4.025 0-7.288-3.263-7.288-7.288v-23.923c.001-4.025 3.264-7.288 7.288-7.288zm88.793 31.21v-23.923c0-4.025 3.263-7.288 7.288-7.288h51.505c4.025 0 7.288 3.263 7.288 7.288v23.923c0 4.025-3.263 7.288-7.288 7.288h-51.506c-4.024 0-7.287-3.263-7.287-7.288z",fill:"#ebeff0"}),r.a.createElement("path",{d:"m350.551 10.826c-4.74-4.74-10.638-8.056-17.028-9.676v103.922l108.33 108.33v-95.99c0-9.787-3.888-19.173-10.808-26.094z",fill:"url(#SVGID_2_)"}),r.a.createElement("path",{d:"m440.76 108.461c.118.513.227 1.011.326 1.492h-97.648c-6.914 0-12.52-5.605-12.52-12.52v-96.834c.763.136 1.565.295 2.392.478 7.279 1.61 13.916 5.353 19.188 10.624l77.655 77.655c5.251 5.251 8.938 11.87 10.607 19.105z",fill:"url(#SVGID_3_)"}),r.a.createElement("path",{d:"m441.853 447.219v30.919c0 17.534-14.346 31.88-31.88 31.88h-309.91c-17.529 0-31.87-14.342-31.87-31.87v-30.929z",fill:"url(#SVGID_4_)"})),f=function(e){var t=e.svgRef,n=e.title,a=o(e,["svgRef","title"]);return r.a.createElement("svg",i({id:"Capa_1",enableBackground:"new 0 0 510.036 510.036",height:512,viewBox:"0 0 510.036 510.036",width:512,ref:t},a),n?r.a.createElement("title",null,n):null,c,l,s,u,d,p)},m=r.a.forwardRef((function(e,t){return r.a.createElement(f,i({svgRef:t},e))})),v=(n.p,n(690)),b=function(){return r.a.createElement(v.a,{component:m,style:{fontSize:18}})};b.displayName="ExcelIcon";t.a=b},704:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(10),o=n(785),c=function(e){var t=Object.assign({},e);return r.a.createElement(l,Object.assign({placeholder:"Digite para procurar",allowClear:!0,autoFocus:!0},t))};c.displayName="SearchInput",t.a=c;var l=Object(i.c)(o.a.Search).withConfig({displayName:"SearchInput__SearchStyled",componentId:"sc-7wjkuk-0"})(["border:none;width:100%;height:32px;border-bottom:1px solid #d9d9d9;border-radius:0;&.ant-input-affix-wrapper-focused,&.ant-input-affix-wrapper:focus{border-color:",";box-shadow:0 2px 2px -2px ",";}.ant-input-search-icon::before{display:none;}"],(function(e){return e.theme.colors.primary}),(function(e){return e.theme.colors.light_gray}))},705:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(125),o=n(77),c=function(e){var t=e.onClick,n=e.action_text;return r.a.createElement(i.a,{image:i.a.PRESENTED_IMAGE_SIMPLE,description:r.a.createElement("span",null,"Nenhum dado foi encontrado.",r.a.createElement("br",null),r.a.createElement(o.a,{type:"link",onClick:t},"Criar ",n))})};c.displayName="EmptyComponent",t.a=Object(a.memo)(c)},706:function(e,t,n){"use strict";var a=n(147),r=n(0),i=n.n(r),o=n(10),c=function(e){var t=e.divRef,n=Object(a.a)(e,["divRef"]);return i.a.createElement(l,Object.assign({},n,{ref:t}),n.children)};c.displayName="TableContainer",t.a=c;var l=o.c.div.withConfig({displayName:"TableContainer__Container",componentId:"sc-1of4nmx-0"})(["display:flex;margin:0 -2rem 0 0;height:100%;"])},707:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(10),o=function(e){return r.a.createElement(c,null,e.children)};o.displayName="ContainerList",t.a=o;var c=i.c.div.withConfig({displayName:"ContainerList__Container",componentId:"sc-1ematne-0"})(["height:100%;width:100%;padding:2rem;"])},708:function(e,t){},712:function(e,t){},713:function(e,t){},714:function(e,t,n){"use strict";var a=n(48),r=n(0),i=n.n(r),o=n(77),c=n(10),l=n(704),s=n(702),u=function(e){var t=e.placeholder,n=e.button_text,r=e.onPressEnter,c=e.setFilters,u=e.handleNew,f=e.has_create_permission,m=void 0===f||f,v=e.exportToXLS;return i.a.createElement(d,null,i.a.createElement(p,null,i.a.createElement(l.a,{onSearch:function(e){return r(e)},onChange:function(e){0===e.target.value.length&&c((function(e){return Object(a.a)({},e,{search:""})}))},placeholder:t})),i.a.createElement("div",null,!!v&&i.a.createElement(o.a,{onClick:v,style:{marginRight:10}},i.a.createElement(s.a,null)),m&&i.a.createElement(o.a,{type:"primary",onClick:function(){return u()}},n)))};u.displayName="HeaderActions",t.a=Object(r.memo)(u);var d=c.c.div.withConfig({displayName:"HeaderActions__ActionsContainer",componentId:"m7pokc-0"})(["display:flex;justify-content:space-between;align-items:center;margin-bottom:3rem;"]),p=c.c.div.withConfig({displayName:"HeaderActions__IntWrapper",componentId:"m7pokc-1"})(["display:flex;width:45rem;"])},718:function(e,t,n){"use strict";var a=n(1),r=n.n(a),i=n(8),o=n.n(i),c=n(0),l=n(3),s=n.n(l),u=n(103),d=n.n(u),p=n(106),f=n(91),m=n(77),v=n(105),b=n(49),h=n(78),x=n(57),y=n(194),g=n(19),k=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},E=c.forwardRef((function(e,t){var n=c.useState(e.visible),a=o()(n,2),i=a[0],l=a[1];c.useEffect((function(){"visible"in e&&l(e.visible)}),[e.visible]),c.useEffect((function(){"defaultVisible"in e&&l(e.defaultVisible)}),[e.defaultVisible]);var u=function(t,n){"visible"in e||l(t),e.onVisibleChange&&e.onVisibleChange(t,n)},d=function(t){u(!1,t),e.onConfirm&&e.onConfirm.call(void 0,t)},E=function(t){u(!1,t),e.onCancel&&e.onCancel.call(void 0,t)},O=c.useContext(x.b).getPrefixCls,j=e.prefixCls,C=e.placement,_=e.children,w=e.overlayClassName,S=k(e,["prefixCls","placement","children","overlayClassName"]),T=O("popover",j),N=O("popconfirm",j),P=s()(N,w),z=c.createElement(b.a,{componentName:"Popconfirm",defaultLocale:h.a.Popconfirm},(function(t){return function(t,n){var a=e.okButtonProps,i=e.cancelButtonProps,o=e.title,l=e.cancelText,s=e.okText,u=e.okType,p=e.icon;return c.createElement("div",{className:"".concat(t,"-inner-content")},c.createElement("div",{className:"".concat(t,"-message")},p,c.createElement("div",{className:"".concat(t,"-message-title")},Object(y.a)(o))),c.createElement("div",{className:"".concat(t,"-buttons")},c.createElement(m.a,r()({onClick:E,size:"small"},i),l||n.cancelText),c.createElement(m.a,r()({onClick:d},Object(v.a)(u),{size:"small"},a),s||n.okText)))}(T,t)}));return c.createElement(f.a,r()({},S,{prefixCls:T,placement:C,onVisibleChange:function(t){e.disabled||u(t)},visible:i,overlay:z,overlayClassName:P,ref:t}),Object(g.a)(_,{onKeyDown:function(e){var t,n;c.isValidElement(_)&&(null===(n=null===_||void 0===_?void 0:(t=_.props).onKeyDown)||void 0===n||n.call(t,e)),function(e){e.keyCode===p.a.ESC&&i&&u(!1,e)}(e)}}))}));E.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:c.createElement(d.a,null),disabled:!1},t.a=E},719:function(e,t,n){"use strict";var a=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},i=n(148),o=function(e,t){return a.createElement(i.a,Object.assign({},e,{ref:t,icon:r}))};o.displayName="DeleteOutlined";t.a=a.forwardRef(o)},720:function(e,t,n){"use strict";var a=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},i=n(148),o=function(e,t){return a.createElement(i.a,Object.assign({},e,{ref:t,icon:r}))};o.displayName="EditOutlined";t.a=a.forwardRef(o)},774:function(e,t,n){"use strict";var a=n(37),r=n.n(a),i=n(58),o=n(47),c=n(0),l=n.n(c),s=n(691),u=n(126),d=n(901),p=n(77),f=n(688),m=n(52),v=function(){var e=Object(m.b)({method:"GET"},{manual:!0}),t=Object(o.a)(e,2),n=t[0].loading,a=t[1];return[function(e){return a({url:"/kindpeople/".concat(e)})},n]},b=n(10),h=n(785),x=n(684),y=n(685),g=function(e){var t=e.form;return l.a.createElement(s.a,{layout:"vertical",form:t,initialValues:{_id:null,description:""}},l.a.createElement(s.a.Item,{name:"_id",noStyle:!0},l.a.createElement(h.a,{type:"hidden"})),l.a.createElement(x.a,{gutter:8},l.a.createElement(y.a,{span:24},l.a.createElement(s.a.Item,{name:"description",label:"Descri\xe7\xe3o",rules:[{required:!0,message:"Campo obrigat\xf3rio"}]},l.a.createElement(h.a,{placeholder:"Informe o tipo de pessoa",autoComplete:"off"})))))};g.displayName="PersonKindForm";var k=g,E=n(698),O=function(){var e=Object(m.b)({url:"/kindpeople",method:"POST"},{manual:!0}),t=Object(o.a)(e,2),n=t[0].loading,a=t[1];return[function(e){var t=Object(E.e)(e);return t._id?a({url:"/kindpeople/".concat(t._id),method:"PUT",data:t}):a({data:t})},n]},j=n(127),C=n(699),_=function(e,t){var n=e.afterSave,a=Object(c.useState)(!1),m=Object(o.a)(a,2),b=m[0],h=m[1],x=s.a.useForm(),y=Object(o.a)(x,1)[0],g=O(),E=Object(o.a)(g,2),_=E[0],S=E[1],T=v(),N=Object(o.a)(T,2),P=N[0],z=N[1],D=function(){var e=Object(i.a)(r.a.mark((function e(t){var n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,P(t);case 3:n=e.sent,a=n.data.kindPeople,y.setFieldsValue(a),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(j.a)("2508202252");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),I=function(e){e&&D(e),h(!0)},V=function(){h(!1),setTimeout((function(){return y.resetFields()}),300)};Object(c.useImperativeHandle)(t,(function(){return{open:I,close:V}}));var G=function(){var e=Object(i.a)(r.a.mark((function e(t){var a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_(t);case 3:if(a=e.sent,(i=a.data).success){e.next=8;break}return u.b.error(i.message),e.abrupt("return");case 8:Object(C.a)({content:"Tipo de pessoa salva com sucesso"}),n&&n(i.kindPeople),V(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),Object(j.a)("2508202211");case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}();return l.a.createElement(d.a,{visible:b,onClose:V,title:"Tipo de Pessoa",width:500,footer:l.a.createElement(w,null,l.a.createElement(p.a,{onClick:V},"Cancelar"),l.a.createElement(p.a,{loading:S||z,onClick:function(){y.validateFields().then((function(e){return G(e)}))},type:"primary"},"Salvar"))},l.a.createElement(f.a,{spinning:z||S},l.a.createElement(k,{form:y})))};_.displayName="PersonKind";t.a=Object(c.forwardRef)(_);var w=b.c.div.withConfig({displayName:"PersonKind__Footer",componentId:"sc-1oa21w2-0"})(["text-align:right;button + button{margin-left:8px;}"])},902:function(e,t,n){"use strict";n.r(t);var a=n(48),r=n(37),i=n.n(r),o=n(58),c=n(47),l=n(0),s=n.n(l),u=n(707),d=n(714),p=n(698),f=n(890),m=n(10),v=n(706),b=function(e){var t,n=e.columns,a=e.filtered_data,r=e.loading,i=e.filters,o=e.handleTableChange,c=e.locale,u=Object(l.useRef)(null),d=((null===(t=u.current)||void 0===t?void 0:t.clientHeight)||0)-40;return s.a.createElement(v.a,{divRef:u},s.a.createElement(x,{style:{flex:"auto",width:0},columns:n,dataSource:a,loading:r,onChange:o,rowKey:"_id",tableLayout:"fixed",size:"middle",bordered:!0,pagination:{showTotal:function(e){return"".concat(e," no total")},showSizeChanger:!0,pageSize:i.pagination.page_size,total:a.length,current:i.pagination.current_page,pageSizeOptions:["10","20","40","50","100"]},locale:c,scroll:{y:d}}))};b.displayName="PersonKindTable";var h=Object(l.memo)(b),x=Object(m.c)(f.a).withConfig({displayName:"PersonKindTable__StyledTable",componentId:"sc-10u20p8-0"})([".ant-table-container,.ant-spin-nested-loading,.ant-table,.ant-spin-container{height:calc(100% - 48px);}.ant-table-body{height:100%;}"]),y=n(705),g=n(718),k=n(77),E=n(719),O=n(720),j=n(128),C=n(31),_=function(e){var t=e.destroying,n=e.handleDelete,a=e.handleEdit,r=Object(C.c)((function(e){return e.permissions}));return Object(l.useMemo)((function(){return[{title:"Tipo Pessoa",dataIndex:"description",defaultSortOrder:"ascend",sorter:!0,key:"description"},{title:"A\xe7\xf5es",key:"actions",align:"center",width:90,render:function(e){var i=e._id;return s.a.createElement(s.a.Fragment,null,(null===r||void 0===r?void 0:r.kindPeople.delete)&&s.a.createElement(g.a,{title:s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,"O tipo de pessoa ser\xe1 exclu\xedda de todos os processos em que est\xe1 atrelada."),s.a.createElement("div",null,"Deseja continuar?")),okText:"Sim",cancelText:"N\xe3o",okType:"danger",placement:"topLeft",onConfirm:function(){return n(i)}},s.a.createElement(k.a,{type:"text",loading:t,icon:s.a.createElement(E.a,{style:{color:j.a.colors.red}})})),(null===r||void 0===r?void 0:r.kindPeople.update)&&s.a.createElement(k.a,{type:"text",icon:s.a.createElement(O.a,{style:{color:j.a.colors.primary}}),onClick:function(){return a(i)}}))}}]}),[n,a,t,r])},w=n(52),S=function(){return Object(w.b)({url:"/kindpeople",method:"GET"},{manual:!0})},T=n(127),N=n(774),P=function(){var e=Object(w.b)({method:"DELETE"},{manual:!0}),t=Object(c.a)(e,2),n=t[0].loading,a=t[1];return[function(e){return a({url:"/kindpeople/".concat(e)})},n]},z=n(126),D=function(e){var t=Object(l.useMemo)((function(){return[{name:"Tipo Pessoa",key:"description"}]}),[]);return Object(l.useCallback)((function(){Object(p.a)("tipo_pessoa",e,t)}),[t,e])},I={search:"",pagination:{current_page:1,page_size:10},sort:{field:"description",order:"ascend"}},V=["description"],G=function(){var e=Object(C.c)((function(e){return e.permissions})),t=Object(l.useRef)(null),n=Object(l.useState)(I),r=Object(c.a)(n,2),f=r[0],m=r[1],v=Object(l.useState)([]),b=Object(c.a)(v,2),x=b[0],g=b[1],k=P(),E=Object(c.a)(k,2),O=E[0],j=E[1],w=S(),G=Object(c.a)(w,2),A=G[0].loading,B=G[1],L=function(){var e=Object(o.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B();case 3:t=e.sent,n=t.data,g(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(T.a)("2508202310");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();Object(l.useEffect)((function(){L()}),[]);var R=Object(l.useMemo)((function(){return Object(p.b)({data:x,filters:f,columns_keys:V})}),[f,x]),F=Object(l.useCallback)((function(e){m((function(t){return Object(a.a)({},t,{search:Object(p.f)(e)})}))}),[]),M=function(e){var n;null===(n=t.current)||void 0===n||n.open(e)},H=function(){var e=Object(o.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(t);case 3:if(n=e.sent,null===(a=n.data)||void 0===a?void 0:a.success){e.next=8;break}return z.b.error(a.message),e.abrupt("return");case 8:z.b.success("Tipo de pessoa exclu\xedda com sucesso"),L(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),Object(T.a)("2608202053");case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),U=Object(l.useCallback)((function(e,t,n){var r,i=f;(null===n||void 0===n||null===(r=n.column)||void 0===r?void 0:r.sorter)&&(i=Object(a.a)({},i,{sort:{order:n.order,field:n.field}})),i=Object(a.a)({},i,{pagination:{current_page:e.current||i.pagination.current_page,page_size:e.pageSize||i.pagination.page_size}}),m(i)}),[f]),K=Object(l.useMemo)((function(){return{emptyText:(null===e||void 0===e?void 0:e.kindPeople.create)&&s.a.createElement(y.a,{onClick:function(){return M()},action_text:"Tipo de Pessoa"})}}),[e]),q=_({destroying:j,handleDelete:H,handleEdit:M}),J=D(R);return s.a.createElement(u.a,null,s.a.createElement(d.a,{onPressEnter:F,setFilters:m,placeholder:"Informe o tipo de pessoa",button_text:"Novo Tipo",handleNew:M,has_create_permission:null===e||void 0===e?void 0:e.kindPeople.create,exportToXLS:J}),s.a.createElement(h,{columns:q,filtered_data:R,filters:f,handleTableChange:U,loading:A,locale:K}),s.a.createElement(N.a,{afterSave:function(){L()},ref:t}))};G.displayName="PersonKindList";t.default=G}}]);
(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=function(e){return r.a.createElement("div",null,"search name: ",r.a.createElement("input",{value:e.search,onChange:e.handlerSearch}))},i=function(e){return r.a.createElement("div",null,r.a.createElement("h2",null,"Add new"),r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handlerNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handlerNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},s=function(e){return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),e.records.map((function(n,t){return r.a.createElement("div",{key:t},n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){e.deletePersonOf(n.id)}},"delete"))})))},m=t(3),d=t.n(m),f="/api/persons",h=function(){return d.a.get(f).then((function(e){return e.data}))},p=function(e){return d.a.post(f,e).then((function(e){return e.data}))},b=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var n=e.message;return null===n.message?null:r.a.createElement("div",{className:"error"===n.type?"error":"success"},n.message)},v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),m=Object(o.a)(c,2),d=m[0],f=m[1],v=Object(a.useState)(""),w=Object(o.a)(v,2),y=w[0],O=w[1],j=Object(a.useState)(""),N=Object(o.a)(j,2),C=N[0],S=N[1],k=Object(a.useState)({message:null,type:null}),P=Object(o.a)(k,2),x=P[0],T=P[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var D=""===C?t:t.filter((function(e){return e.name.search(new RegExp(C,"i"))>-1}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(g,{message:x}),r.a.createElement(l,{search:C,handlerSearch:function(e){S(e.target.value)}}),r.a.createElement(i,{addPerson:function(e){e.preventDefault();var n=t.findIndex((function(e){return e.name===d}));n>-1?window.confirm("".concat(d," is already added to the phonebook, replace the old number with the new one?"))&&b(t[n].id,{name:d,number:y}).then((function(e){u(t.map((function(n){return n.id!==e.id?n:e})))})):p({name:d,number:y}).then((function(e){T({message:"person added successfully",type:"success"}),setTimeout((function(){T({message:null})}),5e3),u(t.concat(e)),f(""),O("")})).catch((function(e){T({message:e.response.data.error,type:"error"}),setTimeout((function(){T({message:null})}),5e3)}))},newName:d,newNumber:y,handlerNameChange:function(e){f(e.target.value)},handlerNumberChange:function(e){O(e.target.value)}}),r.a.createElement(s,{records:D,deletePersonOf:function(e){window.confirm("Do you really want to delete this?")&&E(e).then((function(n){u(t.filter((function(n){return n.id!==e})))})).catch((function(n){u(t.filter((function(n){return n.id!==e}))),T({message:"person already removed from the server",type:"error"}),setTimeout((function(){T({message:null})}),5e3)}))}}))};t(36);c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.29170b2f.chunk.js.map
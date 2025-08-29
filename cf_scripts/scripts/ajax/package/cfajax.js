/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
(function(){
if(!Object.defineProperty||!(function(){
try{
Object.defineProperty({},"x",{});
return true;
}
catch(e){
return false;
}
}())){
var _1=Object.defineProperty;
Object.defineProperty=function(o,_3,_4){
if(_1){
try{
return _1(o,_3,_4);
}
catch(e){
}
}
if(o!==Object(o)){
throw TypeError("Object.defineProperty called on non-object");
}
if(Object.prototype.__defineGetter__&&("get" in _4)){
Object.prototype.__defineGetter__.call(o,_3,_4.get);
}
if(Object.prototype.__defineSetter__&&("set" in _4)){
Object.prototype.__defineSetter__.call(o,_3,_4.set);
}
if("value" in _4){
o[_3]=_4.value;
}
return o;
};
}
}());
if(!String.prototype.startsWith){
Object.defineProperty(String.prototype,"startsWith",{value:function(_5,_6){
_6=!_6||_6<0?0:+_6;
return this.substring(_6,_6+_5.length)===_5;
}});
}
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_11,_12){
if($L.isAvailable){
$L.error(_11,_12);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_11);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_11+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_13,_14,_15,_16,_17,_18,_19,_1a){
var msg=$L.format(_14,_16);
if(_13){
$L.error(msg,"http");
if(!_17){
_17=-1;
}
if(!_18){
_18=msg;
}
_13(_17,_18,_1a);
}else{
if(_19){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_15);
}
}
};
$C.setGlobalErrorHandler=function(_1c){
$C.userGlobalErrorHandler=_1c;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _1d=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_1d.length;i++){
try{
return new ActiveXObject(_1d[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_21,_22,_23,_24,_25,_26){
var req=$A.createXMLHttpRequest();
if(!_21){
_21="GET";
}
if(_23&&_24){
req.onreadystatechange=function(){
$A.callback(req,_24,_25);
};
}
if(_22){
_22+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_22="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_22+="&_cf_clientid="+_cf_clientid;
}
if(_21=="GET"){
if(_22){
_22+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_22;
}else{
url+="&"+_22;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_21,url,_23);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_22]);
req.open(_21,url,_23);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_22){
req.send(_22);
}else{
req.send(null);
}
}
if(!_23){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_26);
}else{
return req;
}
}
};
$A.callback=function(req,_29,_2a){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_29(req,_2a);
};
$A.submitForm=function(_2b,url,_2d,_2e,_2f,_30){
var _31=$C.getFormQueryString(_2b);
if(_31==-1){
$C.handleError(_2e,"ajax.submitform.formnotfound","http",[_2b],-1,null,true);
return;
}
if(!_2f){
_2f="POST";
}
_30=!(_30===false);
var _32=function(req){
$A.submitForm.callback(req,_2b,_2d,_2e);
};
$L.info("ajax.submitform.submitting","http",[_2b]);
var _34=$A.sendMessage(url,_2f,_31,_30,_32);
if(!_30){
$L.info("ajax.submitform.success","http",[_2b]);
return _34.responseText;
}
};
$A.submitForm.callback=function(req,_36,_37,_38){
if($A.isRequestError(req)){
$C.handleError(_38,"ajax.submitform.error","http",[req.status,_36,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_36]);
if(_37){
_37(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_39,_3a){
var el=$D.getElement(_3a,_39);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_3c,_3d){
var _3e;
if(typeof _3c=="string"){
_3e=(document.getElementById(_3c)||document.forms[_3c]);
}else{
if(typeof _3c=="object"){
_3e=_3c;
}
}
if(!_3e||null==_3e.elements){
return -1;
}
var _3f,elementName,elementValue,elementDisabled;
var _40=false;
var _41=(_3d)?{}:"";
for(var i=0;i<_3e.elements.length;i++){
_3f=_3e.elements[i];
elementDisabled=_3f.disabled;
elementName=_3f.name;
elementValue=_3f.value;
if(_3f.id&&_3f.id.startsWith("cf_textarea")){
var _43=CKEDITOR.instances;
if(_43){
for(ta in _43){
if(_43[ta].getData){
elementValue=_43[ta].getData();
break;
}
}
}
}
if(!elementDisabled&&elementName){
switch(_3f.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_3f.options.length;j++){
if(_3f.options[j].selected){
if(window.ActiveXObject){
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,_3f.options[j].attributes["value"].specified?_3f.options[j].value:_3f.options[j].text);
}else{
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,_3f.options[j].hasAttribute("value")?_3f.options[j].value:_3f.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_3f.checked){
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
break;
case "submit":
if(_3f.cfinputbutton){
if(_40==false&&_3f.clicked){
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
_40=true;
}
}else{
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
}
break;
case "textarea":
var _45;
if(window.FCKeditorAPI&&(_45=$C.objectCache[elementName])&&_45.richtextid){
var _46=FCKeditorAPI.GetInstance(_45.richtextid);
if(_46){
elementValue=_46.GetXHTML();
}
}
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
break;
default:
_41=$C.getFormQueryString.processFormData(_41,_3d,elementName,elementValue);
break;
}
}
}
if(!_3d){
_41=_41.substr(0,_41.length-1);
}
return _41;
};
$C.getFormQueryString.processFormData=function(_47,_48,_49,_4a){
if(_48){
if(_47[_49]){
_47[_49]+=","+_4a;
}else{
_47[_49]=_4a;
}
}else{
_47+=encodeURIComponent(_49)+"="+encodeURIComponent(_4a)+"&";
}
return _47;
};
$A.importTag=function(_4b){
$C.importedTags.push(_4b);
};
$A.checkImportedTag=function(_4c){
var _4d=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_4c){
_4d=true;
break;
}
}
if(!_4d){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_4c]);
}
};
$C.getElementValue=function(_4f,_50,_51){
if(!_4f){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_51){
_51="value";
}
var _52=$B.getBindElementValue(_4f,_50,_51);
if(typeof (_52)=="undefined"){
_52=null;
}
if(_52==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_4f,_51],null,null,true);
return;
}
return _52;
};
$B.getBindElementValue=function(_53,_54,_55,_56,_57){
var _58="";
if(window[_53]){
var _59=eval(_53);
if(_59&&_59._cf_getAttribute){
_58=_59._cf_getAttribute(_55);
return _58;
}
}
var _5a=$C.objectCache[_53];
if(_5a&&_5a._cf_getAttribute){
_58=_5a._cf_getAttribute(_55);
return _58;
}
var el=$D.getElement(_53,_54);
var _5c=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_5c&&!_57){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_53]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _5d=true;
for(var i=0;i<el.length;i++){
var _5f=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_5f||(_5f&&el[i].checked)){
if(!_5d){
_58+=",";
}
_58+=$B.getBindElementValue.extract(el[i],_55);
_5d=false;
}
}
}else{
_58=$B.getBindElementValue.extract(el,_55);
}
}else{
var _5d=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_5d){
_58+=",";
}
_58+=$B.getBindElementValue.extract(el.options[i],_55);
_5d=false;
}
}
}
if(typeof (_58)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_53,_55]);
return null;
}
if(_56&&$C.required[_53]&&_58.length==0){
return null;
}
return _58;
};
$B.getBindElementValue.extract=function(el,_61){
var _62=el[_61];
if((_62==null||typeof (_62)=="undefined")&&el.getAttribute){
_62=el.getAttribute(_61);
}
return _62;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_63){
var _64=_63.category;
return "<p>"+"<span class='"+_64+"'>"+_64+"</span>:<i>"+_63.source+"</i>: "+_63.msg+"</p>";
};
var _65=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_65.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_65._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_65._btnPause.value=CFMessage["log.pause"]||"Pause";
_65._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_66,_67,_68,_69){
if(!$L.isAvailable){
return;
}
if(!_68){
_68="global";
}
_68=CFMessage[_68]||_68;
_67=CFMessage[_67]||_67;
_66=$L.format(_66,_69);
YAHOO.log(_66,_67,_68);
};
$L.format=function(_6a,_6b){
var msg=CFMessage[_6a]||_6a;
if(_6b){
for(i=0;i<_6b.length;i++){
if(!_6b[i].length){
_6b[i]="";
}
var _6d="{"+i+"}";
msg=msg.replace(_6d,_6b[i]);
}
}
return msg;
};
$L.debug=function(_6e,_6f,_70){
$L.log(_6e,"debug",_6f,_70);
};
$L.info=function(_71,_72,_73){
$L.log(_71,"info",_72,_73);
};
$L.error=function(_74,_75,_76){
$L.log(_74,"error",_75,_76);
};
$L.dump=function(_77,_78){
if($L.isAvailable){
var _79=(/string|number|undefined|boolean/.test(typeof (_77))||_77==null)?_77:recurse(_77,typeof _77,true);
$L.debug(_79,_78);
}
};
$X.invoke=function(_7a,_7b,_7c,_7d,_7e){
return $X.invokeInternal(_7a,_7b,_7c,_7d,_7e,false,null,null);
};
$X.invokeInternal=function(_7f,_80,_81,_82,_83,_84,_85,_86){
var _87="method="+_80+"&_cf_ajaxproxytoken="+_81;
if(_84){
_87+="&_cfclient="+"true";
var _88=$X.JSON.encodeInternal(_7f._variables,_84);
_87+="&_variables="+encodeURIComponent(_88);
var _89=$X.JSON.encodeInternal(_7f._metadata,_84);
_87+="&_metadata="+encodeURIComponent(_89);
}
var _8a=_7f.returnFormat||"json";
_87+="&returnFormat="+_8a;
if(_7f.queryFormat){
_87+="&queryFormat="+_7f.queryFormat;
}
if(_7f.formId){
var _8b=$C.getFormQueryString(_7f.formId,true);
if(_82!=null){
for(prop in _8b){
_82[prop]=_8b[prop];
}
}else{
_82=_8b;
}
_7f.formId=null;
}
var _8c="";
if(_82!=null){
_8c=$X.JSON.encodeInternal(_82,_84);
_87+="&argumentCollection="+encodeURIComponent(_8c);
}
$L.info("ajaxproxy.invoke.invoking","http",[_7f.cfcPath,_80,_8c]);
if(_7f.callHandler){
_7f.callHandler.call(null,_7f.callHandlerParams,_7f.cfcPath,_87);
return;
}
var _8d;
var _8e=_7f.async;
if(_85!=null){
_8e=true;
_8d=function(req){
$X.callbackOp(req,_7f,_83,_85,_86);
};
}else{
if(_7f.async){
_8d=function(req){
$X.callback(req,_7f,_83);
};
}
}
var req=$A.sendMessage(_7f.cfcPath,_7f.httpMethod,_87,_8e,_8d,null,true);
if(!_8e){
return $X.processResponse(req,_7f);
}
};
$X.callback=function(req,_93,_94){
if($A.isRequestError(req)){
$C.handleError(_93.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_93.cfcPath,req.statusText],req.status,req.statusText,false,_94);
}else{
if(_93.callbackHandler){
var _95=$X.processResponse(req,_93);
_93.callbackHandler(_95,_94);
}
}
};
$X.callbackOp=function(req,_97,_98,_99,_9a){
if($A.isRequestError(req)){
var _9b=_97.errorHandler;
if(_9a!=null){
_9b=_9a;
}
$C.handleError(_9b,"ajaxproxy.invoke.error","http",[req.status,_97.cfcPath,req.statusText],req.status,req.statusText,false,_98);
}else{
if(_99){
var _9c=$X.processResponse(req,_97);
_99(_9c,_98);
}
}
};
$X.processResponse=function(req,_9e){
var _9f=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_9f=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_9f){
break;
}
}
var _a2=(req.responseXML&&req.responseXML.childNodes.length>0);
var _a3=_a2?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_a3]);
var _a4;
var _a5=_9e.returnFormat||"json";
if(_a5=="json"){
try{
_a4=_9f?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _9e._metadata!=="undefined"&&_9e._metadata.servercfc&&typeof req.responseText==="string"){
_a4=req.responseText;
}else{
throw e;
}
}
}else{
_a4=_a2?req.responseXML:(_9f?null:req.responseText);
}
return _a4;
};
$X.init=function(_a6,_a7,_a8){
if(typeof _a8==="undefined"){
_a8=false;
}
var _a9=_a7;
if(!_a8){
var _aa=_a7.split(".");
var ns=self;
for(i=0;i<_aa.length-1;i++){
if(_aa[i].length){
ns[_aa[i]]=ns[_aa[i]]||{};
ns=ns[_aa[i]];
}
}
var _ac=_aa[_aa.length-1];
if(ns[_ac]){
return ns[_ac];
}
ns[_ac]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_a9=ns[_ac].prototype;
}else{
_a9.httpMethod="GET";
_a9.async=false;
_a9.callbackHandler=null;
_a9.errorHandler=null;
_a9.formId=null;
}
_a9.cfcPath=_a6;
_a9.setHTTPMethod=function(_ad){
if(_ad){
_ad=_ad.toUpperCase();
}
if(_ad!="GET"&&_ad!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_ad],null,null,true);
}
this.httpMethod=_ad;
};
_a9.setSyncMode=function(){
this.async=false;
};
_a9.setAsyncMode=function(){
this.async=true;
};
_a9.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_a9.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_a9.setForm=function(fn){
this.formId=fn;
};
_a9.setQueryFormat=function(_b1){
if(_b1){
_b1=_b1.toLowerCase();
}
if(!_b1||(_b1!="column"&&_b1!="row"&&_b1!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_b1],null,null,true);
}
this.queryFormat=_b1;
};
_a9.setReturnFormat=function(_b2){
if(_b2){
_b2=_b2.toLowerCase();
}
if(!_b2||(_b2!="plain"&&_b2!="json"&&_b2!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_b2],null,null,true);
}
this.returnFormat=_b2;
};
$L.info("ajaxproxy.init.created","http",[_a6]);
if(_a8){
return _a9;
}else{
return ns[_ac];
}
};
$U.isWhitespace=function(s){
var _b4=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_b4=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_b4){
break;
}
}
return _b4;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _b8=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_b8=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_b8){
break;
}
}
return i;
};
$C.trim=function(_bb){
return _bb.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _bd=true;
if(typeof (n)=="number"){
_bd=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_bd=false;
break;
}
}
}
return _bd;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _c2=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_c2="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_c2="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _c4=o.DATA[o.COLUMNS[i]];
if(!_c4||!$U.isArray(_c4)){
_c2=null;
break;
}
}
}
}
return _c2;
};
$X.JSON=new function(){
var _c5={}.hasOwnProperty?true:false;
var _c6=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _ca=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _cf=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _d2=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _cf(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _d2(o);
}else{
if(typeof o=="string"){
return _ca(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_c5||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(_d9){
if(typeof _d9=="object"){
return _d9;
}
if($U.isWhitespace(_d9)){
return null;
}
var _da=$U.getFirstNonWhitespaceIndex(_d9);
if(_da>0){
_d9=_d9.slice(_da);
}
if(window._cf_jsonprefix&&_d9.indexOf(_cf_jsonprefix)==0){
_d9=_d9.slice(_cf_jsonprefix.length);
}
try{
if(_c6.test(_d9)){
return JSON.parse(_d9);
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_dc,_dd,_de,_df,_e0){
if(url==null){
$C.handleError(_de,"navigate.urlrequired","widget");
return;
}
if(_df){
_df=_df.toUpperCase();
if(_df!="GET"&&_df!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_df],null,null,true);
}
}else{
_df="GET";
}
var _e1;
if(_e0){
_e1=$C.getFormQueryString(_e0);
if(_e1==-1){
$C.handleError(null,"navigate.formnotfound","http",[_e0],null,null,true);
}
}
if(_dc==null){
if(_e1){
if(url.indexOf("?")==-1){
url+="?"+_e1;
}else{
url+="&"+_e1;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_dc]);
var obj=$C.objectCache[_dc];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_dc=obj._cf_body;
}
}
$A.replaceHTML(_dc,url,_df,_e1,_dd,_de);
};
$A.checkForm=function(_e3,_e4,_e5,_e6,_e7){
var _e8=_e4.call(null,_e3);
if(_e8==false){
return false;
}
var _e9=$C.getFormQueryString(_e3);
$L.info("ajax.submitform.submitting","http",[_e3.name]);
$A.replaceHTML(_e5,_e3.action,_e3.method,_e9,_e6,_e7);
return false;
};
$A.replaceHTML=function(_ea,url,_ec,_ed,_ee,_ef){
var _f0=document.getElementById(_ea);
if(!_f0){
$C.handleError(_ef,"ajax.replacehtml.elnotfound","http",[_ea]);
return;
}
var _f1="_cf_containerId="+encodeURIComponent(_ea);
_ed=(_ed)?_ed+"&"+_f1:_f1;
$L.info("ajax.replacehtml.replacing","http",[_ea,url,_ed]);
if(_cf_loadingtexthtml){
try{
_f0.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _f2=function(req,_f4){
var _f5=false;
if($A.isRequestError(req)){
$C.handleError(_ef,"ajax.replacehtml.error","http",[req.status,_f4.id,req.statusText],req.status,req.statusText);
_f5=true;
}
var _f6=new $E.CustomEvent("onReplaceHTML",_f4);
var _f7=new $E.CustomEvent("onReplaceHTMLUser",_f4);
$E.loadEvents[_f4.id]={system:_f6,user:_f7};
if(req.responseText.search(/<script/i)!=-1){
try{
_f4.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_f4,_ef);
}else{
try{
_f4.innerHTML=req.responseText;
$A.updateLayouttab(_f4);
if(_ed.indexOf("window-id")>-1){
var q=_ed.substring(_ed.indexOf("window-id")+10,_ed.indexOf("&"));
var cmp=Ext.getCmp(q);
if(cmp){
cmp.update(_f4.innerHTML);
}
}
}
catch(e){
}
}
$E.loadEvents[_f4.id]=null;
_f6.fire();
_f6.unsubscribe();
_f7.fire();
_f7.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_f4.id]);
if(_ee&&!_f5){
_ee();
}
};
try{
$A.sendMessage(url,_ec,_ed,true,_f2,_f0);
}
catch(e){
try{
_f0.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_ef,"ajax.replacehtml.connectionerror","http",[_ea,url,e]);
}
};
$A.replaceHTML.processResponseText=function(_fa,_fb,_fc){
var pos=0;
var _fe=0;
var _ff=0;
_fb._cf_innerHTML="";
while(pos<_fa.length){
var _100=_fa.indexOf("<s",pos);
if(_100==-1){
_100=_fa.indexOf("<S",pos);
}
if(_100==-1){
break;
}
pos=_100;
var _101=true;
var _102=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_102.length;i++){
var _104=pos+i+1;
if(_104>_fa.length){
break;
}
var _105=_fa.charAt(_104);
if(_102[i][0]!=_105&&_102[i][1]!=_105){
pos+=i+1;
_101=false;
break;
}
}
if(!_101){
continue;
}
var _106=_fa.substring(_fe,pos);
if(_106){
_fb._cf_innerHTML+=_106;
}
var _107=_fa.indexOf(">",pos)+1;
if(_107==0){
pos++;
continue;
}else{
pos+=7;
}
var _108=_107;
while(_108<_fa.length&&_108!=-1){
_108=_fa.indexOf("</s",_108);
if(_108==-1){
_108=_fa.indexOf("</S",_108);
}
if(_108!=-1){
_101=true;
for(var i=1;i<_102.length;i++){
var _104=_108+2+i;
if(_104>_fa.length){
break;
}
var _105=_fa.charAt(_104);
if(_102[i][0]!=_105&&_102[i][1]!=_105){
_108=_104;
_101=false;
break;
}
}
if(_101){
break;
}
}
}
if(_108!=-1){
var _109=_fa.substring(_107,_108);
var _10a=_109.indexOf("<!--");
if(_10a!=-1){
_109=_109.substring(_10a+4);
}
var _10b=_109.lastIndexOf("//-->");
if(_10b!=-1){
_109=_109.substring(0,_10b-1);
}
if(_109.indexOf("document.write")!=-1||_109.indexOf("CF_RunContent")!=-1){
if(_109.indexOf("CF_RunContent")!=-1){
_109=_109.replace("CF_RunContent","document.write");
}
_109="var _cfDomNode = document.getElementById('"+_fb.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_109+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_109);
}
catch(ex){
$C.handleError(_fc,"ajax.replacehtml.jserror","http",[_fb.id,ex]);
}
}
_100=_fa.indexOf(">",_108)+1;
if(_100==0){
_ff=_108+1;
break;
}
_ff=_100;
pos=_100;
_fe=_100;
}
if(_ff<_fa.length-1){
var _106=_fa.substring(_ff,_fa.length);
if(_106){
_fb._cf_innerHTML+=_106;
}
}
try{
_fb.innerHTML=_fb._cf_innerHTML;
$A.updateLayouttab(_fb);
}
catch(e){
}
_fb._cf_innerHTML="";
};
$A.updateLayouttab=function(_10c){
var _10d=_10c.id;
var s=_10d.substr(13,_10d.length);
var cmp=Ext.getCmp(s);
var _110=_10c.innerHTML;
var _111=document.getElementById(_10d);
var html=_111.innerHTML;
if(cmp){
cmp.update("<div id="+_10c.id+">"+html+"</div>");
}
var _111=document.getElementById(_10d);
if(_111){
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_113,_114){
var _115=function(_116){
return (_116.name==_113||_116.id==_113);
};
var _117=$D.getElementsBy(_115,null,_114);
if(_117.length==1){
return _117[0];
}else{
return _117;
}
};
$D.getElementsBy=function(_118,tag,root){
tag=tag||"*";
var _11b=[];
if(root){
root=$D.get(root);
if(!root){
return _11b;
}
}else{
root=document;
}
var _11c=root.getElementsByTagName(tag);
if(!_11c.length&&(tag=="*"&&root.all)){
_11c=root.all;
}
for(var i=0,len=_11c.length;i<len;++i){
if(_118(_11c[i])){
_11b[_11b.length]=_11c[i];
}
}
return _11b;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _11f=[];
for(var i=0,len=el.length;i<len;++i){
_11f[_11f.length]=$D.get(el[i]);
}
return _11f;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_121,_122){
return {name:_121,domNode:_122,subs:[],subscribe:function(func,_124){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_124){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_124});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_12d){
var l={el:el,ev:ev,fn:fn,params:_12d};
$E.listeners.push(l);
var _12f=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_12d);
};
if(el.addEventListener){
window.addEventListener("load",function(){
el.addEventListener(ev,_12f,false);
});
el.addEventListener(ev,_12f,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_12f);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_134){
var _135=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_134){
_135=true;
break;
}
}
return _135;
};
$E.callBindHandlers=function(id,_139,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_13f,_140,user){
if($E.registerOnLoad.windowLoaded){
if(_13f&&_13f._cf_containerId&&$E.loadEvents[_13f._cf_containerId]){
if(user){
$E.loadEvents[_13f._cf_containerId].user.subscribe(func,_13f);
}else{
$E.loadEvents[_13f._cf_containerId].system.subscribe(func,_13f);
}
}else{
func.call(null,null,_13f);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_13f);
}else{
if(_140){
$E.windowLoadImpEvent.subscribe(func,_13f);
}else{
$E.windowLoadEvent.subscribe(func,_13f);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _143=document.createElement("span");
document.body.insertBefore(_143,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_145,_146,_147,_148){
for(var i=0;i<_145.length;i++){
var _14a=_145[i][0];
var _14b=_145[i][1];
var _14c=_145[i][2];
if(window[_14a]){
var _14d=eval(_14a);
if(_14d&&_14d._cf_register){
_14d._cf_register(_14c,_147,_146);
continue;
}
}
var _14e=$C.objectCache[_14a];
if(_14e&&_14e._cf_register){
_14e._cf_register(_14c,_147,_146);
continue;
}
var _14f=$D.getElement(_14a,_14b);
var _150=(_14f&&((!_14f.length&&_14f.length!=0)||(_14f.length&&_14f.length>0)||_14f.tagName=="SELECT"));
if(!_150){
$C.handleError(null,"bind.register.elnotfound","bind",[_14a]);
}
if(_14f.length>1&&!_14f.options){
for(var j=0;j<_14f.length;j++){
$B.register.addListener(_14f[j],_14c,_147,_146);
}
}else{
$B.register.addListener(_14f,_14c,_147,_146);
}
}
if(!$C.bindHandlerCache[_146.bindTo]&&typeof (_146.bindTo)=="string"){
$C.bindHandlerCache[_146.bindTo]=function(){
_147.call(null,null,_146);
};
}
if(_148){
_147.call(null,null,_146);
}
};
$B.register.addListener=function(_152,_153,_154,_155){
if(!$E.isListener(_152,_153,_154,_155)){
$E.addListener(_152,_153,_154,_155);
}
};
$B.assignValue=function(_156,_157,_158,_159){
if(!_156){
return;
}
if(_156.call){
_156.call(null,_158,_159);
return;
}
var _15a=$C.objectCache[_156];
if(_15a&&_15a._cf_setValue){
_15a._cf_setValue(_158);
return;
}
var _15b=document.getElementById(_156);
if(!_15b){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_156]);
}
if(_15b.tagName=="SELECT"){
var _15c=$U.checkQuery(_158);
var _15d=$C.objectCache[_156];
if(_15c){
if(!_15d||(_15d&&(!_15d.valueCol||!_15d.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_156]);
return;
}
}else{
if(typeof (_158.length)=="number"&&!_158.toUpperCase){
if(_158.length>0&&(typeof (_158[0].length)!="number"||_158[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_156]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_156]);
return;
}
}
_15b.options.length=0;
var _15e;
var _15f=false;
if(_15d){
_15e=_15d.selected;
if(_15e&&_15e.length>0){
_15f=true;
}
}
if(!_15c){
for(var i=0;i<_158.length;i++){
var opt=new Option(_158[i][1],_158[i][0]);
_15b.options[i]=opt;
if(_15f){
for(var j=0;j<_15e.length;j++){
if(_15e[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_15c=="col"){
var _163=_158.DATA[_15d.valueCol];
var _164=_158.DATA[_15d.displayCol];
if(!_163||!_164){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_156]);
return;
}
for(var i=0;i<_163.length;i++){
var opt=new Option(_164[i],_163[i]);
_15b.options[i]=opt;
if(_15f){
for(var j=0;j<_15e.length;j++){
if(_15e[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_15c=="row"){
var _165=-1;
var _166=-1;
for(var i=0;i<_158.COLUMNS.length;i++){
var col=_158.COLUMNS[i];
if(col==_15d.valueCol){
_165=i;
}
if(col==_15d.displayCol){
_166=i;
}
if(_165!=-1&&_166!=-1){
break;
}
}
if(_165==-1||_166==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_156]);
return;
}
for(var i=0;i<_158.DATA.length;i++){
var opt=new Option(_158.DATA[i][_166],_158.DATA[i][_165]);
_15b.options[i]=opt;
if(_15f){
for(var j=0;j<_15e.length;j++){
if(_15e[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_15b[_157]=_158;
}
$E.callBindHandlers(_156,null,"change");
$L.info("bind.assignvalue.success","bind",[_158,_156,_157]);
};
$B.localBindHandler=function(e,_169){
var _16a=document.getElementById(_169.bindTo);
var _16b=$B.evaluateBindTemplate(_169,true);
$B.assignValue(_169.bindTo,_169.bindToAttr,_16b);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_16c,_16d,_16e,_16f,_170){
var _171=_16c.bindExpr;
var _172="";
if(typeof _170=="undefined"){
_170=false;
}
for(var i=0;i<_171.length;i++){
if(typeof (_171[i])=="object"){
var _174=null;
if(!_171[i].length||typeof _171[i][0]=="object"){
_174=$X.JSON.encode(_171[i]);
}else{
var _174=$B.getBindElementValue(_171[i][0],_171[i][1],_171[i][2],_16d,_16f);
if(_174==null){
if(_16d){
_172="";
break;
}else{
_174="";
}
}
}
if(_16e){
_174=encodeURIComponent(_174);
}
_172+=_174;
}else{
var _175=_171[i];
if(_170==true&&i>0){
if(typeof (_175)=="string"&&_175.indexOf("&")!=0){
_175=encodeURIComponent(_175);
}
}
_172+=_175;
}
}
return _172;
};
$B.jsBindHandler=function(e,_177){
var _178=_177.bindExpr;
var _179=new Array();
var _17a=_177.callFunction+"(";
for(var i=0;i<_178.length;i++){
var _17c;
if(typeof (_178[i])=="object"){
if(_178[i].length){
if(typeof _178[i][0]=="object"){
_17c=_178[i];
}else{
_17c=$B.getBindElementValue(_178[i][0],_178[i][1],_178[i][2],false);
}
}else{
_17c=_178[i];
}
}else{
_17c=_178[i];
}
if(i!=0){
_17a+=",";
}
_179[i]=_17c;
_17a+="'"+_17c+"'";
}
_17a+=")";
var _17d=_177.callFunction.apply(null,_179);
$B.assignValue(_177.bindTo,_177.bindToAttr,_17d,_177.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_17f){
var _180=_17f.bindTo;
if($C.objectCache[_180]&&$C.objectCache[_180]._cf_visible===false){
$C.objectCache[_180]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_17f,false,true,false,true);
var _182=$U.extractReturnFormat(url);
if(_182==null||typeof _182=="undefined"){
_182="JSON";
}
if(_17f.bindToAttr||typeof _17f.bindTo=="undefined"||typeof _17f.bindTo=="function"){
var _17f={"bindTo":_17f.bindTo,"bindToAttr":_17f.bindToAttr,"bindToParams":_17f.bindToParams,"errorHandler":_17f.errorHandler,"url":url,returnFormat:_182};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_17f);
}
catch(e){
$C.handleError(_17f.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_180,url,null,null,_17f.callback,_17f.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_184){
if($A.isRequestError(req)){
$C.handleError(_184.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_184.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _185;
try{
if(_184.returnFormat==null||_184.returnFormat==="JSON"){
_185=$X.JSON.decode(req.responseText);
}else{
_185=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_185=req.responseText;
}else{
$C.handleError(_184.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_184.bindTo,_184.bindToAttr,_185,_184.bindToParams);
}
};
$A.initSelect=function(_186,_187,_188,_189){
$C.objectCache[_186]={"valueCol":_187,"displayCol":_188,selected:_189};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_18a){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_18a];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_18d,_18e,_18f){
var obs={bindParams:_18f};
obs.onCurrentRowChanged=function(){
_18e.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_18e.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _191=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_191(str);
};
}
if(Spry.Debug.reportError){
var _193=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_193(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_195,_196){
var url;
var _198="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_198+="&_cf_clientid="+_cf_clientid;
}
var _199=window[_196.bindTo];
var _19a=(typeof (_199)=="undefined");
if(_196.cfc){
var _19b={};
var _19c=_196.bindExpr;
for(var i=0;i<_19c.length;i++){
var _19e;
if(_19c[i].length==2){
_19e=_19c[i][1];
}else{
_19e=$B.getBindElementValue(_19c[i][1],_19c[i][2],_19c[i][3],false,_19a);
}
_19b[_19c[i][0]]=_19e;
}
_19b=$X.JSON.encode(_19b);
_198+="&method="+_196.cfcFunction;
_198+="&argumentCollection="+encodeURIComponent(_19b);
$L.info("spry.bindhandler.loadingcfc","http",[_196.bindTo,_196.cfc,_196.cfcFunction,_19b]);
url=_196.cfc;
}else{
url=$B.evaluateBindTemplate(_196,false,true,_19a);
$L.info("spry.bindhandler.loadingurl","http",[_196.bindTo,url]);
}
var _19f=_196.options||{};
if((_199&&_199._cf_type=="json")||_196.dsType=="json"){
_198+="&returnformat=json";
}
if(_199){
if(_199.requestInfo.method=="GET"){
_19f.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_198;
}else{
url+="&"+_198;
}
}else{
_19f.postData=_198;
_19f.method="POST";
_199.setURL("");
}
_199.setURL(url,_19f);
_199.loadData();
}else{
if(!_19f.method||_19f.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_198;
}else{
url+="&"+_198;
}
}else{
_19f.postData=_198;
_19f.useCache=false;
}
var ds;
if(_196.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_196.xpath,_19f);
}else{
ds=new Spry.Data.JSONDataSet(url,_19f);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_196.dsType;
var _1a1={onLoadError:function(req){
$C.handleError(_196.errorHandler,"spry.bindhandler.error","http",[_196.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_1a1);
window[_196.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_1a4){
var _1a5=$U.getFirstNonWhitespaceIndex(_1a4);
if(_1a5>0){
_1a4=_1a4.slice(_1a5);
}
if(window._cf_jsonprefix&&_1a4.indexOf(_cf_jsonprefix)==0){
_1a4=_1a4.slice(_cf_jsonprefix.length);
}
return _1a4;
};
$P.init=function(_1a6){
$L.info("pod.init.creating","widget",[_1a6]);
var _1a7={};
_1a7._cf_body=_1a6+"_body";
$C.objectCache[_1a6]=_1a7;
};
$B.cfcBindHandler=function(e,_1a9){
var _1aa=(_1a9.httpMethod)?_1a9.httpMethod:"GET";
var _1ab={};
var _1ac=_1a9.bindExpr;
for(var i=0;i<_1ac.length;i++){
var _1ae;
if(_1ac[i].length==2){
_1ae=_1ac[i][1];
}else{
_1ae=$B.getBindElementValue(_1ac[i][1],_1ac[i][2],_1ac[i][3],false);
}
_1ab[_1ac[i][0]]=_1ae;
}
var _1af=function(_1b0,_1b1){
$B.assignValue(_1b1.bindTo,_1b1.bindToAttr,_1b0,_1b1.bindToParams);
};
var _1b2={"bindTo":_1a9.bindTo,"bindToAttr":_1a9.bindToAttr,"bindToParams":_1a9.bindToParams};
var _1b3={"async":true,"cfcPath":_1a9.cfc,"httpMethod":_1aa,"callbackHandler":_1af,"errorHandler":_1a9.errorHandler};
if(_1a9.proxyCallHandler){
_1b3.callHandler=_1a9.proxyCallHandler;
_1b3.callHandlerParams=_1a9;
}
$X.invoke(_1b3,_1a9.cfcFunction,_1a9._cf_ajaxproxytoken,_1ab,_1b2);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _1b5;
var _1b6=url.toUpperCase();
var _1b7=_1b6.indexOf("RETURNFORMAT");
if(_1b7>0){
var _1b8=_1b6.indexOf("&",_1b7+13);
if(_1b8<0){
_1b8=_1b6.length;
}
_1b5=_1b6.substring(_1b7+13,_1b8);
}
return _1b5;
};
$U.replaceAll=function(_1b9,_1ba,_1bb){
var _1bc=_1b9.indexOf(_1ba);
while(_1bc>-1){
_1b9=_1b9.replace(_1ba,_1bb);
_1bc=_1b9.indexOf(_1ba);
}
return _1b9;
};
$U.cloneObject=function(obj){
var _1be={};
for(key in obj){
var _1bf=obj[key];
if(typeof _1bf=="object"){
_1bf=$U.cloneObject(_1bf);
}
_1be.key=_1bf;
}
return _1be;
};
$C.clone=function(obj,_1c1){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _1c2=new Object();
for(var i in obj){
if(_1c1===true){
_1c2[i]=$C.clone(obj[i]);
}else{
_1c2[i]=obj[i];
}
}
return _1c2;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();

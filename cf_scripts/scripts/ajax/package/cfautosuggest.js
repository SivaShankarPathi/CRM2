/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Autosuggest){
ColdFusion.Autosuggest={};
}
var staticgifpath=_cf_ajaxscriptsrc+"/resources/cf/images/static.gif";
var dynamicgifpath=_cf_ajaxscriptsrc+"/resources/cf/images/loading.gif";
ColdFusion.Autosuggest.loadAutoSuggest=function(_2e2,_2e3){
var _2e4=ColdFusion.objectCache[_2e3.autosuggestid];
if(typeof (_2e2)=="string"){
_2e2=_2e2.split(",");
}else{
var _2e5=false;
if(_2e2&&ColdFusion.Util.isArray(_2e2)){
_2e5=true;
if(_2e2.length>0&&(typeof (_2e2[0])!="string"&&typeof (_2e2[0])!="number")){
_2e5=false;
}
}
if(!_2e5){
ColdFusion.handleError(_2e4.onbinderror,"autosuggest.loadautosuggest.invalidvalue","widget",[_2e3.autosuggestid]);
return;
}
}
var _2e6=document.getElementById(_2e3.autosuggestid).value;
if(_2e6.length==1&&_2e2.length==0){
var _2e7=new Array();
_2e4.dataSource.flushCache();
_2e4.dataSource=new YAHOO.widget.DS_JSArray(_2e7);
_2e4.autosuggestitems=_2e7;
}
if(_2e2.length>0){
var i=0;
var _2e9=false;
var _2e7=new Array();
for(i=0;i<_2e2.length;i++){
if(_2e2[i]){
if(typeof (_2e2[i])=="string"){
_2e7[i]=_2e2[i];
}else{
if(typeof (_2e2[i])=="number"){
_2e7[i]=_2e2[i]+"";
}else{
_2e7[i]=new String(_2e2[i]);
}
}
if(_2e7[i].indexOf(_2e6)==0){
_2e9=true;
}
}
}
if(_2e9==false&&_2e4.showloadingicon==true){
document.getElementById(_2e3.autosuggestid+"_cf_button").src=staticgifpath;
}
_2e4.dataSource.flushCache();
_2e4.dataSource=new YAHOO.widget.DS_JSArray(_2e7);
_2e4.autosuggestitems=_2e7;
if(_2e4.queryMatchContains){
_2e4.dataSource.queryMatchContains=_2e4.queryMatchContains;
}
_2e4._sendQuery(_2e6);
}else{
if(_2e4.showloadingicon==true){
document.getElementById(_2e3.autosuggestid+"_cf_button").src=staticgifpath;
_2e4.showloadingicon==false;
}
}
};
ColdFusion.Autosuggest.checkToMakeBindCall=function(arg,_2eb,_2ec,_2ed,_2ee){
var _2ed=document.getElementById(_2eb).value;
if(!_2ec.isContainerOpen()&&_2ed.length>0&&arg.keyCode!=39&&(arg.keyCode>31||(arg.keyCode==8&&_2ec.valuePresent==true))){
_2ec.valuePresent=false;
if(_2ec.showloadingicon==true){
document.getElementById(_2eb+"_cf_button").src=dynamicgifpath;
}
ColdFusion.Log.info("autosuggest.checktomakebindcall.fetching","widget",[_2eb,_2ed]);
if(_2ec.cfqueryDelay>0){
var _2ef=setTimeout(_2ee,_2ec.cfqueryDelay*1000,this);
if(_2ec._nDelayID!=-1){
clearTimeout(_2ec._cf_nDelayID);
}
_2ec._cf_nDelayID=_2ef;
}else{
_2ee.call(this);
}
}
};
ColdFusion.Autosuggest.checkValueNotInAutosuggest=function(_2f0,_2f1){
if(_2f0.autosuggestitems){
for(var i=0;i<_2f0.autosuggestitems.length;i++){
if(_2f1==_2f0.autosuggestitems[i]){
return false;
}
}
}
return true;
};
ColdFusion.Autosuggest.triggerOnChange=function(type,args){
var _2f5=args[0];
var _2f6=document.getElementById(_2f5.id);
ColdFusion.Event.callBindHandlers(_2f5.id,null,"change");
};
ColdFusion.Autosuggest.init=function(_2f7,_2f8,_2f9){
return new YAHOO.widget.AutoComplete(_2f7,_2f8,_2f9);
};
ColdFusion.Autosuggest.getAutosuggestObject=function(_2fa){
var _2fb=ColdFusion.objectCache[_2fa];
if(_2fb==null||typeof (_2fb)=="undefined"){
ColdFusion.handleError(null,"autosuggest.getAutosuggestObject.notfound","widget",[_2fa],null,null,true);
}
return _2fb;
};
ColdFusion.Autosuggest.initJS_ARRAY=function(_2fc){
return new YAHOO.widget.DS_JSArray(_2fc);
};

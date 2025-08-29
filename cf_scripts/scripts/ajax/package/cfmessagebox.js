/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.MessageBox){
ColdFusion.MessageBox={};
}
var $MB=ColdFusion.MessageBox;
var DEFAULT_OK="Ok";
var DEFAULT_NO="No";
var DEFAULT_CANCEL="Cancel";
var DEFAULT_YES="Yes";
var DEFAULT_ALERT_BUTTON_TYPE=1;
var DEFAULT_CONFIRM_BUTTON_TYPE=6;
var DEFAULT_PROMPT_BUTTON_TYPE=9;
var CF_BEFORE_SHOW_HANDLER_ADDED=false;
var CURRENT_MESSAGEBOX_ID;
var $XB={};
Ext.onReady(function(){
$XB=Ext.MessageBox;
DEFAULT_OK=$XB.buttonText.ok;
DEFAULT_NO=$XB.buttonText.no;
DEFAULT_CANCEL=$XB.buttonText.cancel;
DEFAULT_YES=$XB.buttonText.yes;
DEFAULT_ALERT_BUTTON_TYPE=$XB.OK;
DEFAULT_CONFIRM_BUTTON_TYPE=$XB.YESNO;
DEFAULT_PROMPT_BUTTON_TYPE=$XB.OKCANCEL;
});
ColdFusion.MessageBox.init=function(_685,type,_687,_688,_689,_68a,_68b,_68c,_68d,_68e,_68f,icon,_691,x,y,_694,_695){
var _696={messageBoxId:_685,type:type,callBack_Fn:_68f,multiline:_68d,modal:_68e,width:_691,bodyStyle:_695};
if(_687==null||typeof (_687)=="undefined"){
_687="";
}
_687=ColdFusion.Util.replaceAll(_687,"\n","<br>");
_696.messageText=_687;
if(_689!=null&&typeof (_689)!="undefined"){
_696.label_OK=_689;
}
if(_68a!=null&&typeof (_68a)!="undefined"){
_696.label_NO=_68a;
}
if(_68c!=null&&typeof (_68c)!="undefined"){
_696.label_YES=_68c;
}
if(_68b!=null&&typeof (_68b)!="undefined"){
_696.label_CANCEL=_68b;
}
if(_688==null||typeof (_688)=="undefined"){
type=type.toLowerCase();
if(type=="alert"){
_688="Alert";
}else{
if(type=="confirm"){
_688="Confirm";
}else{
if(type=="prompt"){
_688="Prompt";
}
}
}
}
_696.title=_688;
if(_694&&typeof (_694)=="string"){
_696.buttonType=_694;
}
if(icon&&typeof (icon)=="string"){
_696.icon=icon;
}
if(typeof x=="number"&&x>=0){
_696.x=x;
}
if(typeof y=="number"&&y>=0){
_696.y=y;
}
ColdFusion.objectCache[_685]=_696;
};
$MB.show=function(_697){
var _698=$MB.getMessageBoxObject(_697);
var type=_698.type;
type=(new String(type)).toLowerCase();
if(!CF_BEFORE_SHOW_HANDLER_ADDED){
var _69a=Ext.MessageBox;
_69a.addListener("show",$MB.beforeShowHandler,_698);
CF_BEFORE_SHOW_HANDLER_ADDED=true;
}
CURRENT_MESSAGEBOX_ID=_697;
var _69b=_698.buttonType;
var _69c={ok:DEFAULT_OK,no:DEFAULT_NO,cancel:DEFAULT_CANCEL,yes:DEFAULT_YES};
if(_698.label_OK){
_69c.ok=_698.label_OK;
}
if(_698.label_YES){
_69c.yes=_698.label_YES;
}
if(_698.label_NO){
_69c.no=_698.label_NO;
}
if(_698.label_CANCEL){
_69c.cancel=_698.label_CANCEL;
}
Ext.MessageBox.buttonText=_69c;
if(typeof _69b!="undefined"){
_69b=_69b.toUpperCase();
if(_69b&&_69b!=="OKCANCEL"&&_69b!=="OK"&&_69b!=="YESNOCANCEL"&&_69b!=="YESNO"){
ColdFusion.handleError(null,"messagebox.show.invalidbuttontype","widget",[messagebox,_69b],null,null,true);
}
switch(_69b){
case "OK":
_69b=$XB.OK;
break;
case "OKCANCEL":
_69b=$XB.OKCANCEL;
break;
case "YESNOCANCEL":
_69b=$XB.YESNOCANCEL;
break;
case "YESNO":
_69b=$XB.YESNO;
break;
}
}
var icon=_698.icon;
var _69e="";
if(icon&&typeof (icon)==="string"){
icon=icon.toUpperCase();
switch(icon){
case "ERROR":
_69e=$XB.ERROR;
break;
case "INFO":
_69e=$XB.INFO;
break;
case "QUESTION":
_69e=$XB.QUESTION;
break;
case "WARNING":
_69e=$XB.WARNING;
break;
}
}
var _69f={title:_698.title,msg:_698.messageText,fn:_698.callBack_Fn,modal:_698.modal,icon:_69e,scope:null};
if(_698.width){
_69f.width=_698.width;
if(_69f.width>600){
_69f.maxWidth=_69f.width;
}
if(_69f.width<100){
_69f.minWidth=_69f.width;
}
}
if(type==="alert"){
if(!_69b){
_69b=DEFAULT_ALERT_BUTTON_TYPE;
}
_69f.buttons=_69b;
$XB.show(_69f);
}
if(type==="confirm"){
if(!_69b){
_69b=DEFAULT_CONFIRM_BUTTON_TYPE;
}
_69f.buttons=_69b;
$XB.show(_69f);
}
if(type==="prompt"){
if(!_69b){
_69b=DEFAULT_PROMPT_BUTTON_TYPE;
}
_69f.buttons=_69b;
_69f.prompt=true;
_69f.multiline=_698.multiline;
_69f.value="",$XB.show(_69f);
}
ColdFusion.Log.info("messagebox.show.shown","widget",[_697]);
};
$MB.create=function(_6a0,type,_6a2,_6a3,_6a4,_6a5){
if(_6a0&&typeof _6a0!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
if(!_6a0||ColdFusion.trim(_6a0)==""){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
var _6a6=ColdFusion.objectCache[_6a0];
if(_6a6!=null||typeof _6a6!="undefined"){
ColdFusion.handleError(null,"messagebox.create.duplicatename","widget",[_6a0],null,null,true);
return;
}
if(_6a3&&typeof _6a3!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_6a0],null,null,true);
return;
}
if(!_6a3||ColdFusion.trim(_6a3)==""){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_6a0],null,null,true);
return;
}
if(_6a2&&typeof _6a2!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtitle","widget",[_6a0],null,null,true);
return;
}
if(type&&typeof type!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtype","widget",[_6a0],null,null,true);
return;
}
if(!type||ColdFusion.trim(type)==""){
ColdFusion.handleError(null,"messagebox.create.emptytype","widget",[_6a0],null,null,true);
return;
}
if(_6a4&&typeof _6a4!=="function"){
ColdFusion.handleError(null,"messagebox.create.invalidcallback","widget",[_6a0],null,null,true);
return;
}
var _6a7=DEFAULT_CANCEL;
var _6a8=DEFAULT_NO;
var _6a9=DEFAULT_OK;
var _6aa=DEFAULT_YES;
var _6ab=true;
var _6ac=null;
var _6ad=false;
var icon;
var _6af;
var x;
var y;
var _6b2;
if(_6a5&&_6a5.labelok){
_6a9=_6a5.labelok;
}
if(_6a5&&_6a5.labelno){
_6a8=_6a5.labelno;
}
if(_6a5&&_6a5.labelyes){
_6aa=_6a5.labelyes;
}
if(_6a5&&_6a5.labelcancel){
_6a7=_6a5.labelcancel;
}
if(_6a5&&typeof _6a5.multiline==="boolean"){
_6ad=_6a5.multiline;
}
if(_6a5&&typeof _6a5.modal==="boolean"){
_6ab=_6a5.modal;
}
if(_6a5&&_6a5.buttontype){
_6ac=_6a5.buttontype;
if(type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.create.invalidtypeandbuttontypecombination","widget",[_6a0],null,null,true);
}else{
if(_6ac.toUpperCase()!="YESNO"&&_6ac.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.create.invalidbuttontype","widget",[_6a0,_6ac],null,null,true);
}
}
}
if(_6a5&&_6a5.width){
_6af=_6a5.width;
if(_6af&&typeof _6af!="number"){
ColdFusion.handleError(null,"messagebox.create.widthnotnumeric","widget",[_6a0,_6af],null,null,true);
}
}
if(_6a5&&typeof _6a5.x!="undefined "){
if(_6a5.x&&typeof _6a5.x!="number"){
ColdFusion.handleError(null,"messagebox.create.xnotnumeric","widget",[_6a0,_6a5.x],null,null,true);
return;
}
x=_6a5.x;
}
if(_6a5&&typeof _6a5.y!="undefined"){
if(_6a5.y&&typeof _6a5.y!="number"){
ColdFusion.handleError(null,"messagebox.create.ynotnumeric","widget",[_6a0,_6a5.y],null,null,true);
return;
}
y=_6a5.y;
}
if(_6a5&&_6a5.icon){
icon=_6a5.icon;
if(icon){
icon=icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.create.invalidicon","widget",[_6a0,icon],null,null,true);
}
}
}
if(_6a5&&_6a5.bodystyle){
_6b2=_6a5.bodystyle;
}
$MB.init(_6a0,type,_6a3,_6a2,_6a9,_6a8,_6a7,_6aa,_6ad,_6ab,_6a4,icon,_6af,x,y,_6ac,_6b2);
ColdFusion.Log.info("messagebox.create.created","widget",[_6a0,type]);
};
$MB.updateMessage=function(_6b3,_6b4){
var _6b5=$MB.getMessageBoxObject(_6b3);
_6b5.messageText=_6b4;
ColdFusion.Log.info("messagebox.updatemessage.updated","widget",[_6b3]);
};
$MB.updateTitle=function(_6b6,_6b7){
var _6b8=$MB.getMessageBoxObject(_6b6);
_6b8.title=_6b7;
ColdFusion.Log.info("messagebox.updatetitle.updated","widget",[_6b6]);
};
$MB.update=function(_6b9,_6ba){
var _6bb=$MB.getMessageBoxObject(_6b9);
var _6bc={};
if(!_6ba||typeof _6ba!="object"){
ColdFusion.handleError(null,"messagebox.update.invalidconfigobject","widget",[_6b9],null,null,true);
return;
}
if(_6ba.name&&typeof _6ba.name=="string"){
ColdFusion.handleError(null,"messagebox.update.nameupdatenotallowed","widget",[_6b9],null,null,true);
return;
}
if(_6ba.type&&typeof _6ba.type=="string"){
ColdFusion.handleError(null,"messagebox.update.typeupdatenotallowed","widget",[_6b9],null,null,true);
return;
}
if(_6ba.message){
if(typeof _6ba.message==="string"||typeof _6ba.message=="object"){
_6bc.messageText=_6ba.message;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidmessage","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.title){
if(typeof _6ba.title==="string"||typeof _6ba.title=="object"){
_6bc.title=_6ba.title;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidtitle","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.labelok!=null||typeof _6ba.labelok!="undefined"){
if(typeof _6ba.labelok==="string"||typeof _6ba.labelok=="object"){
_6bc.label_OK=_6ba.labelok;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelok","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.labelno!=null||typeof _6ba.labelno!="undefined"){
if(typeof _6ba.labelno==="string"||typeof _6ba.labelno=="object"){
_6bc.label_NO=_6ba.labelno;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelno","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.labelyes!=null||typeof _6ba.labelyes!="undefined"){
if(typeof _6ba.labelyes==="string"||typeof _6ba.labelyes=="object"){
_6bc.label_YES=_6ba.labelyes;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelyes","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.labelcancel!=null||typeof _6ba.labelcancel!="undefined"){
if(typeof _6ba.labelcancel==="string"||typeof _6ba.labelcancel=="object"){
_6bc.label_CANCEL=_6ba.labelcancel;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelcancel","widget",[_6b9],null,null,true);
return;
}
}
if(typeof _6ba.modal=="boolean"){
_6bc.modal=_6ba.modal;
}
if(typeof _6ba.multiline==="boolean"){
if(_6bb.type.toLowerCase()!="prompt"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeformultiline","widget",[_6b9],null,null,true);
return;
}
_6bc.multiline=_6ba.multiline;
}
if(_6ba&&_6ba.width){
if(typeof _6ba.width==="number"||typeof _6ba.width=="object"){
_6bc.width=_6ba.width;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidwidth","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.icon!=null||typeof _6ba.icon!="undefined"){
if(typeof _6ba.icon==="string"){
icon=_6ba.icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_6b9],null,null,true);
return;
}
_6bc.icon=_6ba.icon;
}else{
if(typeof _6ba.icon=="object"&&_6ba.icon==null){
_6bc.icon=null;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_6b9],null,null,true);
return;
}
}
}
if(_6ba.callbackhandler!=null||typeof _6ba.callbackhandler!="undefined"){
if(typeof _6ba.callbackhandler==="function"||typeof _6ba.callbackhandler==="object"){
_6bc.callBack_Fn=_6ba.callbackhandler;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidcallbackhandler","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.x!=null||typeof _6ba.x!="undefined"){
if(typeof _6ba.x==="number"||typeof _6ba.x=="object"){
_6bc.x=_6ba.x;
}else{
ColdFusion.handleError(null,"messagebox.update.xnotnumeric","widget",[_6b9,_6ba.x],null,null,true);
return;
}
}
if(_6ba.y!=null||typeof _6ba.y!="undefined"){
if(typeof _6ba.y==="number"||typeof _6ba.y=="object"){
_6bc.y=_6ba.y;
}else{
ColdFusion.handleError(null,"messagebox.update.ynotnumeric","widget",[_6b9,_6ba.y],null,null,true);
return;
}
}
if(_6ba.bodystyle!=null||typeof _6ba.bodystyle!="undefined"){
if(typeof _6ba.bodystyle==="string"||typeof _6ba.bodystyle=="object"){
_6bc.bodyStyle=_6ba.bodystyle;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbodystyle","widget",[_6b9],null,null,true);
return;
}
}
if(_6ba.buttontype!=null||typeof _6ba.buttontype!="undefined"){
if(typeof _6ba.buttontype==="string"||typeof _6ba.buttontype==="object"){
buttonType=_6ba.buttontype;
if(_6bb.type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeandbuttontypecombination","widget",[_6b9],null,null,true);
return;
}else{
if(buttonType.toUpperCase()!="YESNO"&&buttonType.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_6b9],null,null,true);
return;
}
}
_6bc.buttonType=_6ba.buttontype;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_6b9],null,null,true);
return;
}
}
for(key in _6bc){
_6bb[key]=_6bc[key];
}
ColdFusion.Log.info("messagebox.update.updated","messagebox",[_6b9]);
};
$MB.getMessageBoxObject=function(_6bd){
var _6be=ColdFusion.objectCache[_6bd];
if(_6be==null||typeof (_6be)=="undefined"){
ColdFusion.handleError(null,"messagebox.getmessageboxobject.missingmessageboxid","widget",[_6bd],null,null,true);
}
return _6be;
};
$MB.isMessageBoxDefined=function(_6bf){
var _6c0=ColdFusion.objectCache[_6bf];
if(_6c0==null||typeof (_6c0)=="undefined"){
return false;
}else{
return true;
}
};
$MB.beforeShowHandler=function(_6c1){
var _6c2=$MB.getMessageBoxObject(CURRENT_MESSAGEBOX_ID);
var _6c3=_6c2.x;
var _6c4=_6c2.y;
var _6c5=_6c2.bodyStyle;
var _6c6=_6c1.body.parent();
var id=_6c6.id;
var ele=document.getElementById(id);
if(null!=_6c5){
ele.style.cssText=_6c5;
}
if(_6c3&&_6c4&&typeof _6c3=="number"&&typeof _6c4=="number"&&_6c3>=0&&_6c4>=0){
_6c1.setPosition(_6c3,_6c4);
}else{
_6c1.center();
}
};

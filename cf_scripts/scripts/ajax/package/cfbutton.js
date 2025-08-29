/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Button){
ColdFusion.Button={};
}
var $BT=ColdFusion.Button;
ColdFusion.Button.init=function(_774,_775,icon,tips,_778,_779,_77a,_77b,_77c){
var _77d={renderTo:_774,enableToggle:_77c,text:_775,onClick:_778,onToggle:_779,onMouseOver:_77a,onMouseout:_77b,tooltip:tips,icon:icon};
var _77e={renderTo:_774,enableToggle:_77c,text:_775};
if(tips!=null&&typeof tips!="undefined"){
_77e.tooltip=tips;
Ext.QuickTips.init();
}
if(icon!=null&&typeof icon!="undefined"){
_77e.icon=icon;
}
if(icon&&_775){
_77e.iconCls="x-btn-text-icon";
}else{
if(icon&&!_775){
_77e.iconCls="x-btn-icon";
}
}
var _77f=new Ext.Button(_77e);
if(_778!=null&&typeof _778=="function"){
_77f.on("click",_778,_77d);
}
if(_779!=null&&typeof _779=="function"){
_77f.on("toggle",_779,_77d);
}
if(_77a!=null&&typeof _77a=="function"){
_77f.on("mouseover",_77a,_77d);
}
if(_77b!=null&&typeof _77b=="function"){
_77f.on("mouseout",_77b,_77d);
}
_77d.buttonComp=_77f;
ColdFusion.objectCache[_774]=_77d;
ColdFusion.Log.info("button.initialized","widget",[_774]);
};
$BT.show=function(_780){
var _781=$BT.getButtonObject(_780);
if(_781!=null){
_781.show();
}
ColdFusion.Log.info("button.show.shown","widget",[_780]);
};
$BT.hide=function(_782){
var _783=$BT.getButtonObject(_782);
if(_783!=null){
_783.hide();
}
ColdFusion.Log.info("button.hide.hidden","widget",[_782]);
};
$BT.disable=function(_784){
var _785=$BT.getButtonObject(_784);
if(_785!=null){
_785.disable();
}
ColdFusion.Log.info("button.disable.disabled","widget",[_784]);
};
$BT.enable=function(_786){
var _787=$BT.getButtonObject(_786);
if(_787!=null){
_787.enable();
}
ColdFusion.Log.info("button.enable.enabled","widget",[_786]);
};
$BT.getButtonObject=function(_788){
var _789=$BT.getButtonConfigObj(_788);
if(_789!=null){
return _789.buttonComp;
}else{
ColdFusion.handleError(null,"button.component.notFound","widget",[_788],null,null,true);
}
};
$BT.setLabel=function(_78a,_78b){
var _78c=$BT.getButtonObject(_78a);
if(_78c!=null){
_78c.text=_78b;
}
};
$BT.getButtonConfigObj=function(_78d){
var _78e=ColdFusion.objectCache[_78d];
if(_78e==null||typeof (_78e)=="undefined"){
ColdFusion.handleError(null,"button.component.notFound","widget",[_78d],null,null,true);
}
return _78e;
};
$BT.toggle=function(_78f){
var _790=$BT.getButtonObject(_78f);
if(_790!=null){
_790.toggle();
}
};

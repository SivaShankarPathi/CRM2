/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Slider){
ColdFusion.Slider={};
}
var $SL=ColdFusion.Slider;
ColdFusion.Slider.init=function(_1c6,name,_1c8,_1c9,_1ca,_1cb,_1cc,_1cd,_1ce,_1cf,tip,_1d1,_1d2){
var _1d3={renderTo:_1c6,id:name};
if(_1ce!=null&&typeof (_1ce)!="undefined"){
_1d3.ClicktoChange=_1ce;
}else{
_1d3.ClicktoChange=false;
}
if(_1cf!=null&&typeof (_1cf)!="undefined"){
_1d3.increment=_1cf;
}else{
_1d3.increment=1;
}
if(_1cc!=null&&typeof (_1cc)!=undefined){
_1d3.minValue=_1cc;
}else{
_1d3.minValue=0;
}
if(_1cb!=null&&typeof (_1cb)!=undefined){
_1d3.value=_1cb;
}else{
_1d3.value=_1d3.minValue;
}
if(_1c9!=null&&typeof (_1c9)!=undefined){
_1d3.width=_1c9;
}else{
_1d3.width=200;
}
if(_1ca!=null&&typeof (_1ca)!="undefined"){
_1d3.height=_1ca;
}else{
_1d3.height=100;
}
if(_1cd!=null&&typeof (_1cd)!=undefined){
_1d3.maxValue=_1cd;
}else{
_1d3.maxValue=100;
}
if(_1c8!=null&&typeof (_1c8)!=undefined){
_1d3.vertical=_1c8;
}else{
_1d3.vertical=false;
}
if(_1d1!=null&&typeof (_1d1)=="function"){
_1d3.onChange=_1d1;
}
if(_1d2!=null&&typeof (_1d2)!="undefined"){
_1d3.onDrg=_1d2;
}
Ext.define("Ext.ux.ST",{extend:"Ext.slider.Tip",minWidth:25,minHeight:25,offsets:[0,-10],init:function(_1d4){
_1d4.on("dragstart",this.onSlide,this);
_1d4.on("drag",this.onSlide,this);
_1d4.on("dragend",this.hide,this);
_1d4.on("destroy",this.destroy,this);
},onSlide:function(_1d5,e,_1d7){
this.show();
this.body.update(this.getText(_1d5));
this.el.alignTo(_1d7.el,"b-t?",this.offsets);
this.doAutoRender();
},getText:function(_1d8){
return _1d8.getValue()==0?"0":_1d8.getValue();
}});
if(tip!=null&&typeof (tip)!="undefined"){
if(tip){
_1d3.plugins=new Ext.ux.ST();
}else{
_1d3.useTips=false;
}
}
var _1d9=Ext.create("Ext.slider.Single",_1d3);
_1d9.on("drag",$SL.onDragHandler,_1d3);
_1d9.on("changecomplete",$SL.onChangeHandler,_1d3);
_1d3.sliderComp=_1d9;
ColdFusion.objectCache[name]=_1d3;
ColdFusion.Log.info("slider.initialized","widget",[name]);
};
$SL.onDragHandler=function(_1da,_1db){
var _1dc=this.onDrg;
if(_1dc!=null&&typeof (_1dc)=="function"){
_1dc.call(this,_1da,_1db);
}
};
$SL.onChangeHandler=function(_1dd,_1de){
var _1df=this.onChange;
if(_1df!=null&&typeof (_1df)=="function"){
_1df.call(this,_1dd,_1de);
}
};
$SL.getValue=function(_1e0){
var _1e1=ColdFusion.objectCache[_1e0];
if(_1e1!=null||typeof (_1e1)!="undefined"){
var _1e2=_1e1.sliderComp;
if(_1e2){
return _1e2.getValue();
}
}else{
ColdFusion.handleError(null,"slider.getvalue.notfound","widget",[_1e0],null,null,true);
}
};
$SL.getSliderObject=function(_1e3){
var _1e4=ColdFusion.objectCache[_1e3];
if(_1e4!=null||typeof (_1e4)!="undefined"){
return _1e4.sliderComp;
}else{
return null;
}
};
$SL.setValue=function(_1e5,_1e6){
var _1e7=ColdFusion.objectCache[_1e5];
if(_1e7!=null||typeof (_1e7)!="undefined"){
var _1e8=_1e7.sliderComp;
if(_1e8){
return _1e8.setValue(_1e6,true);
}
}else{
ColdFusion.handleError(null,"slider.setvalue.notfound","widget",[_1e5],null,null,true);
}
};
$SL.show=function(_1e9){
var _1ea=ColdFusion.objectCache[_1e9];
if(_1ea!=null||typeof (_1ea)!="undefined"){
var _1eb=_1ea.sliderComp;
if(_1eb){
return _1eb.show();
}
}else{
ColdFusion.handleError(null,"slider.show.notfound","widget",[_1e9],null,null,true);
}
ColdFusion.Log.info("slider.show.shown","widget",[_1e9]);
};
$SL.hide=function(_1ec){
var _1ed=ColdFusion.objectCache[_1ec];
if(_1ed!=null||typeof (_1ed)!="undefined"){
var _1ee=_1ed.sliderComp;
if(_1ee){
return _1ee.hide();
}
}else{
ColdFusion.handleError(null,"slider.hide.notfound","widget",[_1ec],null,null,true);
}
ColdFusion.Log.info("slider.hide.hidden","widget",[_1ec]);
};
$SL.enable=function(_1ef){
var _1f0=ColdFusion.objectCache[_1ef];
if(_1f0!=null||typeof (_1f0)!="undefined"){
var _1f1=_1f0.sliderComp;
if(_1f1){
return _1f1.enable();
}
}else{
ColdFusion.handleError(null,"slider.enable.notfound","widget",[_1ef],null,null,true);
}
ColdFusion.Log.info("slider.enable.enabled","widget",[_1ef]);
};
$SL.disable=function(_1f2){
var _1f3=ColdFusion.objectCache[_1f2];
if(_1f3!=null||typeof (_1f3)!="undefined"){
var _1f4=_1f3.sliderComp;
if(_1f4){
return _1f4.disable();
}
}else{
ColdFusion.handleError(null,"slider.disable.notfound","widget",[_1f2],null,null,true);
}
ColdFusion.Log.info("slider.disable.disabled","widget",[_1f2]);
};

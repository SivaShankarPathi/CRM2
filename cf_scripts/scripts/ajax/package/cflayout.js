/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Layout){
ColdFusion.Layout={};
}
var ACCORDION_TITLE_ICON_CSS_TEMPLATE=".{0} { background-image:url({1}); }";
if(!ColdFusion.MapVsAccordion){
ColdFusion.MapVsAccordion={};
}
ColdFusion.Layout.initializeTabLayout=function(id,_329,_32a,_32b,_32c){
Ext.QuickTips.init();
var _32d;
if(_32a){
_32d={renderTo:id,height:_32a};
}else{
_32d={renderTo:id,autoHeight:true};
}
if(_32b&&_32b!="undefined"){
_32d.width=_32b;
}else{
_32d.autoWidth=true;
}
if(_329){
_32d.tabPosition="bottom";
}else{
_32d.enableTabScroll=true;
}
_32d.plain=!_32c;
var _32e=new Ext.tab.Panel(_32d);
ColdFusion.objectCache[id]=_32e;
return _32e;
};
ColdFusion.Layout.getTabLayout=function(_32f){
var _330=ColdFusion.objectCache[_32f];
if(!_330||!(_330 instanceof Ext.TabPanel)){
ColdFusion.handleError(null,"layout.gettablayout.notfound","widget",[_32f],null,null,true);
}
return _330;
};
ColdFusion.Layout.onTabActivate=function(tab){
tab._cf_visible=true;
if(tab._cf_dirtyview){
var _332=ColdFusion.bindHandlerCache[tab._cf_body];
if(_332){
_332();
}
tab._cf_dirtyview=false;
}
};
ColdFusion.Layout.onTabDeactivate=function(tab){
tab._cf_visible=false;
if(tab._cf_refreshOnActivate){
tab._cf_dirtyview=true;
}
};
ColdFusion.Layout.onTabClose=function(tab){
tab._cf_visible=false;
};
ColdFusion.Layout.addTab=function(_335,_336,name,_338,_339,_33a,_33b,_33c,_33d){
if(_339!=null&&_339.length==0){
_339=null;
}
var _33e=_335.initialConfig.autoHeight;
if(typeof _33e=="undefined"){
_33e=false;
}
var _33f=Ext.getCmp(name);
if(_33f){
alert("Component with the name "+name+" already exists. Please use unique names for all the components. Layout will not be rendered");
return;
}
_33f=new Ext.Panel({title:_338,contentEl:_336,_cf_body:_336,id:name,closable:_33a,tabTip:_339,autoScroll:_33d,autoShow:true,autoHeight:_33e});
var tab=_335.add(_33f);
if(_33c){
_33f.setDisabled(true);
}
tab._cf_visible=false;
tab._cf_dirtyview=true;
tab._cf_refreshOnActivate=_33b;
tab.addListener("activate",ColdFusion.Layout.onTabActivate);
tab.addListener("deactivate",ColdFusion.Layout.onTabDeactivate);
tab.addListener("close",ColdFusion.Layout.onTabClose);
ColdFusion.objectCache[name]=tab;
var _341=tab.height;
if(_341&&_341>1){
var _342=document.getElementById(_336);
_342.style.height=_341;
}
};
ColdFusion.Layout.enableTab=function(_343,_344){
var _345=ColdFusion.objectCache[_343];
var _346=ColdFusion.objectCache[_344];
if(_345&&(_345 instanceof Ext.TabPanel)&&_346){
_346.setDisabled(false);
ColdFusion.Log.info("layout.enabletab.enabled","widget",[_344,_343]);
}else{
ColdFusion.handleError(null,"layout.enabletab.notfound","widget",[_343],null,null,true);
}
};
ColdFusion.Layout.disableTab=function(_347,_348){
var _349=ColdFusion.objectCache[_347];
var _34a=ColdFusion.objectCache[_348];
if(_349&&(_349 instanceof Ext.TabPanel)&&_34a){
_34a.setDisabled(true);
ColdFusion.Log.info("layout.disabletab.disabled","widget",[_348,_347]);
}else{
ColdFusion.handleError(null,"layout.disabletab.notfound","widget",[_347],null,null,true);
}
};
ColdFusion.Layout.selectTab=function(_34b,_34c){
var _34d=ColdFusion.objectCache[_34b];
var tab=ColdFusion.objectCache[_34c];
if(_34d&&(_34d instanceof Ext.TabPanel)&&tab){
_34d.setActiveTab(tab);
ColdFusion.Log.info("layout.selecttab.selected","widget",[_34c,_34b]);
}else{
ColdFusion.handleError(null,"layout.selecttab.notfound","widget",[_34b],null,null,true);
}
};
ColdFusion.Layout.hideTab=function(_34f,_350){
var _351=ColdFusion.objectCache[_34f];
if(_351&&(_351 instanceof Ext.TabPanel)){
var _352=ColdFusion.objectCache[_350];
var _353=false;
if(_352){
if(_351.getActiveTab()&&_351.getActiveTab().getId()==_350){
var i;
for(i=0;i<_351.items.length;i++){
var _355=_351.getComponent(i);
if(_355.hidden==false){
_353=true;
_355.show();
break;
}
}
if(_353==false){
document.getElementById(_350).style.display="none";
}
}
_352.tab.hide();
ColdFusion.Log.info("layout.hidetab.hide","widget",[_350,_34f]);
}
}else{
ColdFusion.handleError(null,"layout.hidetab.notfound","widget",[_34f],null,null,true);
}
};
ColdFusion.Layout.showTab=function(_356,_357){
var _358=ColdFusion.objectCache[_356];
var _359=ColdFusion.objectCache[_357];
if(_358&&(_358 instanceof Ext.TabPanel)&&_359){
_359.tab.show();
ColdFusion.Log.info("layout.showtab.show","widget",[_357,_356]);
}else{
ColdFusion.handleError(null,"layout.showtab.notfound","widget",[_356],null,null,true);
}
};
ColdFusion.Layout.disableSourceBind=function(_35a){
var _35b=ColdFusion.objectCache[_35a];
if(_35b==null||_35b=="undefined"){
ColdFusion.handleError(null,"layout.disableSourceBind.notfound","widget",[_35a],null,null,true);
}
_35b._cf_dirtyview=false;
};
ColdFusion.Layout.enableSourceBind=function(_35c){
var _35d=ColdFusion.objectCache[_35c];
if(_35d==null||_35d=="undefined"){
ColdFusion.handleError(null,"layout.enableSourceBind.notfound","widget",[_35c],null,null,true);
}
_35d._cf_dirtyview=true;
};
ColdFusion.Layout.createTab=function(_35e,_35f,_360,_361,_362){
var _363=ColdFusion.objectCache[_35e];
var _364=_35f;
if(_35e&&typeof (_35e)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidname","widget",null,null,null,true);
return;
}
if(!_35e||ColdFusion.trim(_35e)==""){
ColdFusion.handleError(null,"layout.createtab.emptyname","widget",null,null,null,true);
return;
}
if(_35f&&typeof (_35f)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidareaname","widget",null,null,null,true);
return;
}
if(!_35f||ColdFusion.trim(_35f)==""){
ColdFusion.handleError(null,"layout.createtab.emptyareaname","widget",null,null,null,true);
return;
}
if(_360&&typeof (_360)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidtitle","widget",null,null,null,true);
return;
}
if(!_360||ColdFusion.trim(_360)==""){
ColdFusion.handleError(null,"layout.createtab.emptytitle","widget",null,null,null,true);
return;
}
if(_361&&typeof (_361)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidurl","widget",null,null,null,true);
return;
}
if(!_361||ColdFusion.trim(_361)==""){
ColdFusion.handleError(null,"layout.createtab.emptyurl","widget",null,null,null,true);
return;
}
_35f="cf_layoutarea"+_35f;
if(_363&&(_363 instanceof Ext.TabPanel)){
var _365=null;
var ele=document.getElementById(_35f);
if(ele!=null){
ColdFusion.handleError(null,"layout.createtab.duplicateel","widget",[_35f],null,null,true);
return;
}
var _367=false;
var _368=false;
var _369=false;
var _36a=false;
var _36b=false;
var _36c=null;
if((_363.items.length<=0)){
_369=true;
}
if(_362!=null){
if(typeof (_362)!="object"){
ColdFusion.handleError(null,"layout.createtab.invalidconfig","widget",null,null,null,true);
return;
}
if(typeof (_362.closable)!="undefined"&&_362.closable==true){
_367=true;
}
if(typeof (_362.disabled)!="undefined"&&_362.disabled==true){
_368=true;
}
if(typeof (_362.selected)!="undefined"&&_362.selected==true){
_369=true;
}
if(typeof (_362.inithide)!="undefined"&&_362.inithide==true){
_36a=true;
}
if(typeof (_362.tabtip)!="undefined"&&_362.tabtip!=null){
_36c=_362.tabtip;
}
}
var _36d=document.getElementById(_35e);
if(_36d){
var _36e=document.getElementById(_35e);
var _36f=document.createElement("div");
_36f.id=_35f;
_36f.className="ytab";
if(_362!=null&&typeof (_362.align)!="undefined"){
_36f.align=_362.align;
}
var _370="display:none";
if(_363.tabheight){
_370="height:"+_363.tabheight+";";
}
if(_362!=null&&typeof (_362.style)!="undefined"){
var _371=new String(_362.style);
_371=_371.toLowerCase();
_370=_370+_371;
}
if(_362!=null&&typeof (_362.overflow)!="undefined"){
var _372=new String(_362.overflow);
_372=_372.toLowerCase();
if(_372!="visible"&&_372!="auto"&&_372!="scroll"&&_372!="hidden"){
ColdFusion.handleError(null,"layout.createtab.invalidoverflow","widget",null,null,null,true);
return;
}
if(_372.toLocaleLowerCase()==="hidden"){
_36b=false;
}
_370=_370+"overflow:"+_372+";";
}else{
_370=_370+"; overflow:auto;";
}
_36f.style.cssText=_370;
_36e.appendChild(_36f);
}
ColdFusion.Layout.addTab(_363,_35f,_364,_360,_36c,_367,false,_368,_36b);
ColdFusion.Log.info("layout.createtab.success","http",[_35f,_35e]);
if(_369==true){
ColdFusion.Layout.selectTab(_35e,_364);
}
if(_36a==true){
ColdFusion.Layout.hideTab(_35e,_364);
}
if(_361!=null&&typeof (_361)!="undefined"&&_361!=""){
if(_361.indexOf("?")!=-1){
_361=_361+"&";
}else{
_361=_361+"?";
}
var _373;
var _374;
if(_362){
_373=_362.callbackHandler;
_374=_362.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_35f,_361,"GET",null,_373,_374);
}
}else{
ColdFusion.handleError(null,"layout.createtab.notfound","widget",[_35e],null,null,true);
}
};
ColdFusion.Layout.getBorderLayout=function(_375){
var _376=ColdFusion.objectCache[_375];
if(!_376){
ColdFusion.handleError(null,"layout.getborderlayout.notfound","widget",[_375],null,null,true);
}
return _376;
};
ColdFusion.Layout.showArea=function(_377,_378){
var _379=ColdFusion.Layout.convertPositionToDirection(_378);
var _37a=ColdFusion.objectCache[_377];
var _37b;
if(_37a){
var _37c=_37a.items;
for(var i=0;i<_37c.getCount();i++){
var _37e=_37c.items[i];
if(_37e instanceof Ext.Panel&&_37e.region==_379){
_37b=_37e;
break;
}
}
if(_37b){
_37b.show();
_37b.expand();
ColdFusion.Log.info("layout.showarea.shown","widget",[_378,_377]);
}else{
ColdFusion.handleError(null,"layout.showarea.areanotfound","widget",[_378],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.showarea.notfound","widget",[_377],null,null,true);
}
};
ColdFusion.Layout.hideArea=function(_37f,_380){
var _381=ColdFusion.Layout.convertPositionToDirection(_380);
var _382=ColdFusion.objectCache[_37f];
var _383;
if(_382){
var _384=_382.items;
for(var i=0;i<_384.getCount();i++){
var _386=_384.items[i];
if(_386 instanceof Ext.Panel&&_386.region==_381){
_383=_386;
break;
}
}
if(_383){
_383.hide();
ColdFusion.Log.info("layout.hidearea.hidden","widget",[_380,_37f]);
}else{
ColdFusion.handleError(null,"layout.hidearea.areanotfound","widget",[_380],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.hidearea.notfound","widget",[_37f],null,null,true);
}
};
ColdFusion.Layout.collapseArea=function(_387,_388){
var _389=ColdFusion.Layout.convertPositionToDirection(_388);
var _38a=ColdFusion.objectCache[_387];
var _38b;
if(_38a){
var _38c=_38a.items;
for(var i=0;i<_38c.getCount();i++){
var _38e=_38c.items[i];
if(_38e instanceof Ext.Panel&&_38e.region==_389){
_38b=_38e;
break;
}
}
if(_38b){
_38b.collapse();
ColdFusion.Log.info("layout.collpasearea.collapsed","widget",[_388,_387]);
}else{
ColdFusion.handleError(null,"layout.collpasearea.areanotfound","widget",[_388],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.collpasearea.notfound","widget",[_388],null,null,true);
}
};
ColdFusion.Layout.expandArea=function(_38f,_390){
var _391=ColdFusion.Layout.convertPositionToDirection(_390);
var _392=ColdFusion.objectCache[_38f];
var _393;
if(_392){
var _394=_392.items;
for(var i=0;i<_394.getCount();i++){
var _396=_394.items[i];
if(_396 instanceof Ext.Panel&&_396.region==_391){
_393=_396;
break;
}
}
if(_393){
_393.expand();
ColdFusion.Log.info("layout.expandarea.expanded","widget",[_390,_38f]);
}else{
ColdFusion.handleError(null,"layout.expandarea.areanotfound","widget",[_390],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.expandarea.notfound","widget",[_390],null,null,true);
}
};
ColdFusion.Layout.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)==Object){
value=$G.printObject(value);
}
str+=value;
}
return str;
};
ColdFusion.Layout.InitAccordion=function(_399,_39a,_39b,_39c,_39d,_39e,_39f,_3a0){
var _3a1=false;
if(_39b.toUpperCase()=="LEFT"){
_3a1=true;
}
if(_39e==null||typeof (_39e)=="undefined"){
_39d=false;
}
var _3a2={activeOnTop:_39a,collapseFirst:_3a1,titleCollapse:_39c,fill:_39d};
var _3a3={renderTo:_399,layoutConfig:_3a2,items:_3a0,layout:"accordion"};
if(_39e==null||typeof (_39e)=="undefined"){
_3a3.autoHeight=true;
_3a3.height=600;
}else{
_3a3.height=_39e;
}
_3a3.flex=1;
if(_39f==null||typeof (_39f)=="undefined"){
_3a3.autoWidth=true;
}else{
_3a3.width=_39f;
}
_3a3.align="stretch";
_3a3.preventRegister=true;
var _3a4=new Ext.Panel(_3a3);
ColdFusion.objectCache[_399]=_3a4;
ColdFusion.Log.info("layout.accordion.initialized","widget",[_399]);
return _3a4;
};
ColdFusion.Layout.InitAccordionChildPanel=function(_3a5,_3a6,_3a7,_3a8,_3a9,_3aa,_3ab,_3ac){
if(_3a7==null||typeof (_3a7)==undefined||_3a7.length==0){
_3a7="  ";
}
var _3ad={contentEl:_3a5,id:_3a6,title:_3a7,collapsible:_3a8,closable:_3a9,autoScroll:_3aa,_cf_body:_3a5};
if(_3ab&&typeof _3ab=="string"){
_3ad.iconCls=_3ab;
}
_3ad.preventRegister=true;
var _3ae=new Ext.Panel(_3ad);
_3ae._cf_visible=false;
_3ae._cf_dirtyview=true;
_3ae._cf_refreshOnActivate=_3ac;
_3ae.on("expand",ColdFusion.Layout.onAccordionPanelExpand,this);
_3ae.on("collapse",ColdFusion.Layout.onAccordionPanelCollapse,this);
_3ae.on("hide",ColdFusion.Layout.onAccordionPanelHide,this);
_3ae.on("show",ColdFusion.Layout.onAccordionPanelExpand,this);
ColdFusion.objectCache[_3a6]=_3ae;
ColdFusion.Log.info("layout.accordion.childinitialized","widget",[_3a6]);
return _3ae;
};
ColdFusion.Layout.getAccordionLayout=function(_3af){
var _3b0=ColdFusion.objectCache[_3af];
if(!_3b0||!(_3b0 instanceof Ext.Panel)){
ColdFusion.handleError(null,"layout.getaccordionlayout.notfound","widget",[_3af],null,null,true);
}
return _3b0;
};
ColdFusion.Layout.onAccordionPanelExpand=function(_3b1){
_3b1._cf_visible=true;
if(_3b1._cf_dirtyview){
var _3b2=ColdFusion.bindHandlerCache[_3b1._cf_body];
if(_3b2){
_3b2();
}
_3b1._cf_dirtyview=false;
}
var el=Ext.get(_3b1.contentEl);
el.move("left",1);
el.move("right",1);
var _3b4=ColdFusion.MapVsAccordion[_3b1._cf_body];
if(_3b4!=undefined){
var _3b5=$MAP.getMapPanelObject(_3b4);
if(_3b5!=undefined){
if(_3b5.initShow===true){
$MAP.show(_3b4);
}
}
}
};
ColdFusion.Layout.onAccordionPanelCollapse=function(_3b6){
_3b6._cf_visible=false;
if(_3b6._cf_refreshOnActivate){
_3b6._cf_dirtyview=true;
}
};
ColdFusion.Layout.onAccordionPanelHide=function(_3b7){
_3b7._cf_visible=false;
};
ColdFusion.Layout.hideAccordion=function(_3b8,_3b9){
var _3ba=ColdFusion.objectCache[_3b8];
var _3bb=ColdFusion.objectCache[_3b9];
if(!_3ba||!_3ba instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.layoutnotfound","widget",[_3b8],null,null,true);
}
if(!_3bb||!_3bb instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.panelnotfound","widget",[_3b9],null,null,true);
}
_3bb.hide();
ColdFusion.Log.info("layout.hideaccordion.hidden","widget",[_3b9,_3b8]);
};
ColdFusion.Layout.showAccordion=function(_3bc,_3bd){
var _3be=ColdFusion.objectCache[_3bc];
var _3bf=ColdFusion.objectCache[_3bd];
if(!_3be||!_3be instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.layoutnotfound","widget",[_3bc],null,null,true);
}
if(!_3bf||!_3bf instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.panelnotfound","widget",[_3bd],null,null,true);
}
_3bf.show();
ColdFusion.Log.info("layout.showaccordion.shown","widget",[_3bd,_3bc]);
};
ColdFusion.Layout.expandAccordion=function(_3c0,_3c1){
var _3c2=ColdFusion.objectCache[_3c0];
var _3c3=ColdFusion.objectCache[_3c1];
if(!_3c2||!_3c2 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.layoutnotfound","widget",[_3c0],null,null,true);
}
if(!_3c3||!_3c3 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.panelnotfound","widget",[_3c1],null,null,true);
}
_3c3.expand();
ColdFusion.Log.info("layout.expandaccordion.expanded","widget",[_3c1,_3c0]);
};
ColdFusion.Layout.selectAccordion=function(_3c4,_3c5){
return ColdFusion.Layout.expandAccordion(_3c4,_3c5);
};
ColdFusion.Layout.collapseAccordion=function(_3c6,_3c7){
var _3c8=ColdFusion.objectCache[_3c6];
var _3c9=ColdFusion.objectCache[_3c7];
if(!_3c8||!_3c8 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.layoutnotfound","widget",[_3c6],null,null,true);
}
if(!_3c9||!_3c9 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.panelnotfound","widget",[_3c7],null,null,true);
}
_3c9.collapse();
ColdFusion.Log.info("layout.collapseaccordion.collapsed","widget",[_3c7,_3c6]);
};
ColdFusion.Layout.createAccordionPanel=function(_3ca,_3cb,_3cc,url,_3ce){
var _3cf=ColdFusion.objectCache[_3ca];
var _3d0=_3cb;
if(_3ca&&typeof (_3ca)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidname","widget",[_3ca],null,null,true);
return;
}
if(!_3ca||ColdFusion.trim(_3ca)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyname","widget",[_3ca],null,null,true);
return;
}
if(_3cb&&typeof (_3cb)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidaccordionpanelname","widget",[_3cb],null,null,true);
return;
}
if(!_3cb||ColdFusion.trim(_3cb)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyaccordionpanelname","widget",[_3cb],null,null,true);
return;
}
if(_3cc&&typeof (_3cc)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_3cb],null,null,true);
return;
}
if(!_3cc||ColdFusion.trim(_3cc)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_3cb],null,null,true);
return;
}
if(url&&typeof (url)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_3cb],null,null,true);
return;
}
if(!url||ColdFusion.trim(url)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_3cb],null,null,true);
return;
}
_3cb="cf_layoutarea"+_3d0;
if(_3cf&&(_3cf instanceof Ext.Panel)){
var _3d1=null;
var ele=document.getElementById(_3cb);
if(ele!=null){
ColdFusion.handleError(null,"layout.createaccordionpanel.duplicateel","widget",[_3cb],null,null,true);
return;
}
var _3d3=true;
var _3d4;
var _3d5=false;
var _3d6=null;
if(_3ce!=null){
if(typeof (_3ce)!="object"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidconfig","widget",[_3cb],null,null,true);
return;
}
}
if(_3ce&&typeof (_3ce.selected)!="undefined"&&_3ce.selected==true){
_3d5=true;
}
if(_3ce&&_3ce.titleicon){
if(typeof _3ce.titleicon!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitleicon","widget",[_3cb],null,null,true);
return;
}
var _3d7=Ext.String.format(ACCORDION_TITLE_ICON_CSS_TEMPLATE,_3cb,_3ce.titleicon);
Ext.util.CSS.createStyleSheet(_3d7,_3cb+"_cf_icon");
_3d6=_3cb;
}
var _3d8=_3cf.layoutConfig;
var _3d9=true;
if(_3d8&&typeof _3d8.fill!="undefined"){
_3d9=_3d8.fill;
}
if(_3ce!=null&&typeof (_3ce.overflow)!="undefined"){
var _3d4=new String(_3ce.overflow);
_3d4=_3d4.toLowerCase();
if(_3d4!="visible"&&_3d4!="auto"&&_3d4!="scroll"&&_3d4!="hidden"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflow","widget",[_3cb],null,null,true);
return;
}
if(!_3d9&&(_3d4=="auto"||_3d4=="scroll")){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflowforfillheight","widget",[_3cb],null,null,true);
return;
}
if(_3d4=="hidden"){
_3d3=false;
}
}else{
_3d4="auto";
_3d3=true;
}
var _3da=document.getElementById(_3ca);
if(_3da){
var _3db=document.getElementById(_3ca);
var _3dc=document.createElement("div");
_3dc.id=_3cb;
if(_3ce!=null&&typeof (_3ce.align)!="undefined"){
_3dc.align=_3ce.align;
}
var _3dd="";
if(_3cf.height){
_3dd="height:"+_3cf.height+";";
}
if(_3ce!=null&&typeof (_3ce.style)!="undefined"){
var _3de=new String(_3ce.style);
_3de=_3de.toLowerCase();
_3dd=_3dd+_3de;
}
_3dd=_3dd+"overflow:"+_3d4+";";
_3dc.style.cssText=_3dd;
_3db.appendChild(_3dc);
}
var _3df=true;
var _3e0=true;
itemobj=ColdFusion.Layout.InitAccordionChildPanel(_3cb,_3d0,_3cc,_3e0,_3df,_3d3,_3d6,false);
_3cf.add(itemobj);
if(url!=null&&typeof (url)!="undefined"&&url!=""){
if(url.indexOf("?")!=-1){
url=url+"&";
}else{
url=url+"?";
}
var _3e1;
var _3e2;
if(_3ce){
_3e1=_3ce.callbackHandler;
_3e2=_3ce.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_3cb,url,"GET",null,_3e1,_3e2);
}
_3cf.updateLayout();
if(_3d5){
ColdFusion.Layout.expandAccordion(_3ca,_3d0);
}
ColdFusion.Log.info("layout.createaccordionpanel.created","widget",[_3cb]);
}else{
ColdFusion.handleError(null,"layout.createaccordionpanel.layoutnotfound","widget",[_3ca],null,null,true);
}
};
ColdFusion.Layout.initViewport=function(_3e3,item){
var _3e5=new Array();
_3e5[0]=item;
var _3e6={items:_3e5,layout:"fit",name:_3e3};
var _3e7=new Ext.Viewport(_3e6);
return _3e7;
};
ColdFusion.Layout.convertPositionToDirection=function(_3e8){
if(_3e8.toUpperCase()=="LEFT"){
return "west";
}else{
if(_3e8.toUpperCase()=="RIGHT"){
return "east";
}else{
if(_3e8.toUpperCase()=="CENTER"){
return "center";
}else{
if(_3e8.toUpperCase()=="BOTTOM"){
return "south";
}else{
if(_3e8.toUpperCase()=="TOP"){
return "north";
}
}
}
}
}
};
ColdFusion.Layout.addMapInAccordionMapping=function(_3e9,map){
ColdFusion.MapVsAccordion[_3e9]=map;
};

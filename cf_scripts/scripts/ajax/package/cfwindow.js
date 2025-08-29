/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Window){
ColdFusion.Window={};
}
ColdFusion.Window.windowIdCounter=1;
ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE="WINDOW_DIV_ID .x-window-tc , WINDOW_DIV_ID .x-window-tl, WINDOW_DIV_ID .x-window-tr, WINDOW_DIV_ID .x-window-bc, WINDOW_DIV_ID .x-window-br, WINDOW_DIV_ID"+" .x-window-bl, WINDOW_DIV_ID  .x-window-ml, WINDOW_DIV_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
ColdFusion.Window.create=function(_71c,_71d,url,_71f){
if(_71c==null){
ColdFusion.handleError(null,"window.create.nullname","widget",null,null,null,true);
return;
}
if(_71c==""){
ColdFusion.handleError(null,"window.create.emptyname","widget",null,null,null,true);
return;
}
var _720=ColdFusion.objectCache[_71c];
var _721=false;
if(typeof (_720)!="undefined"&&_720!=null){
if(_720.callfromtag){
ColdFusion.handleError(null,"window.create.duplicatename","widget",[_71c]);
}
if(typeof (_720.isConfObj)!="undefined"&&_720.isConfObj==true){
_721=true;
if(_71f!=null&&typeof (_71f.initshow)!="undefined"){
if(_71f.initshow==false){
return;
}
}
}else{
if(!_71f||(_71f&&_71f.initshow!==false)){
ColdFusion.Window.show(_71c);
}
return;
}
}
if(!_720){
ColdFusion.Log.info("window.create.creating","widget",[_71c]);
}
var _722=ColdFusion.Window.createHTML(_71c,_71d,url,_71f,_721);
var _723=ColdFusion.objectCache[_71c];
if(_723!=null&&typeof (_723.isConfObj)!="undefined"&&_723.isConfObj==true){
return;
}
return ColdFusion.Window.createJSObj(_71c,url,_722);
};
ColdFusion.Window.createHTML=function(_724,_725,url,_727,_728){
var _729=null;
var _72a=null;
if(_727&&_727.divid){
_729=document.getElementById(_727.divid);
}
if(_729==null){
_729=document.createElement("div");
_72a="cf_window"+ColdFusion.Window.windowIdCounter;
ColdFusion.Window.windowIdCounter++;
_729.id=_72a;
_729.className="x-hidden";
}
var _72b=false;
var _72c=null;
if(_727!=null&&typeof (_727.headerstyle)!="undefined"&&_727.headerstyle!=null){
var _72d=new String(_727.headerstyle);
_72d=_72d.toLowerCase();
var _72e=_72d.indexOf("background-color");
if(_72e>=0){
_72b=true;
var _72f=_72d.indexOf(";",_72e+17);
if(_72f<0){
_72f=_72d.length;
}
_72c=_72d.substring(_72e+17,_72f);
}
}
var _730=document.getElementById(_724+"_title-html");
if(_72b==true&&_72c){
var _731="#"+_727.divid;
var _732="NAME_ID .x-window-tc , NAME_ID .x-window-tl, NAME_ID .x-window-tr, NAME_ID .x-window-bc, NAME_ID .x-window-br, NAME_ID .x-window-bl,NAME_ID .x-window-ml, NAME_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
var _733=ColdFusion.Util.replaceAll(ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE,"WINDOW_DIV_ID",_731);
var _733=ColdFusion.Util.replaceAll(_733,"COLOR_ID",_72c);
Ext.util.CSS.createStyleSheet(_733);
}
if(_730==null){
_730=document.createElement("div");
_730.id=_724+"_title-html";
var _734="x-window-header";
_730.className=_734;
if(_725){
_730.innerHTML=_725;
}else{
_730.innerHTML="&nbsp;";
}
}
var _735=document.getElementById(_724+"-body");
if(_735==null){
_735=document.createElement("div");
_735.id=_724+"-body";
_729.appendChild(_735);
}
var _736;
_736=ColdFusion.Window.getUpdatedConfigObj(_727,_724);
if(_727){
_736.header={style:_727.headerstyle};
}
if(typeof (_736)=="undefined"){
_729.innerHTML="";
return;
}
if(_72a){
_736.divid=_72a;
}
_736.title=_725;
if(typeof (_736.initshow)!="undefined"&&_736.initshow===false){
_736.url=url;
ColdFusion.objectCache[_724]=_736;
ColdFusion.objectCache[_724+"-body"]=_736;
}
_736.items=[{html:_729.innerHTML}];
return _736;
};
ColdFusion.Window.createJSObj=function(_737,url,_739){
var _73a;
var _73b=false;
if(typeof (_739.childlayoutid)&&_739.childlayoutid!=null){
_73b=true;
_739.layout="border";
_739.items=ColdFusion.objectCache[_739.childlayoutid];
}else{
var elem=document.getElementById(_737+"-body");
if(elem){
elem.parentNode.removeChild(elem);
}
_739.layout="fit";
}
if(typeof (_739.autoScroll)=="undefined"){
_739.autoScroll=true;
}
if(_739.onShow){
_739._cf_onShow=_739.onShow;
_739.onShow=null;
}
if(_739.onHide){
_739._cf_onHide=_739.onHide;
_739.onHide=null;
}
_73a=new Ext.Window(_739);
_73a.show();
_73a.hide();
_73a.cfwindowname=_737;
_73a.tempx=_739.tempx;
_73a.tempy=_739.tempy;
_73a.divid=_739.divid;
if(typeof (_739.headerstyle)!="undefined"&&_739.headerstyle!=null){
var _73d=document.getElementById(_737+"_title");
_73d=_73d||document.getElementById(_73a.id+"_header_hd-textEl");
if(_73d!=null){
_73d.style.cssText="background:none;"+_739.headerstyle;
}
}
if(typeof (_739.bodystyle)!="undefined"&&_739.bodystyle!=null){
var _73e=document.getElementById(_737+"-body");
if(_73e){
var _73f=_73e.parentNode;
}
if(_73f!=null){
_73f.style.cssText=_739.bodystyle;
}
}
_73a.isConfObj=false;
_73a._cf_body=_737+"-body";
ColdFusion.objectCache[_737]=_73a;
if(_73b){
var _740=_73a.getLayout();
var _741=ColdFusion.objectCache[_739.childlayoutid];
}
_73a.addListener("beforeclose",ColdFusion.Window.beforeCloseHandler);
var _742=null;
if(typeof (url)!="undefined"&&url!=""){
_742=url;
}
if(_742==null){
if(typeof (_739.initshow)=="undefined"||_739.initshow==true){
_73a.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
ColdFusion.Window.showandhide(_73a,_739);
}
return;
}
ColdFusion.objectCache[_737+"-body"]=_73a;
if(typeof (_739.callfromtag)=="undefined"){
var _743;
var _744;
_73a._cf_visible=false;
_73a._cf_dirtyview=true;
_73a.addListener("show",ColdFusion.Window.showHandler);
_73a.addListener("hide",ColdFusion.Window.hideHandler);
_73a.url=_742;
if(_739){
if(typeof (_739.initshow)=="undefined"||_739.initshow==true){
ColdFusion.Window.showandhide(_73a,_739);
}
_743=_739.callbackHandler;
_744=_739.errorHandler;
}
}else{
_73a.callfromtag=true;
_73a._cf_visible=false;
_73a._cf_dirtyview=true;
_73a.addListener("show",ColdFusion.Window.showHandler);
_73a.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
_73a.addListener("hide",ColdFusion.Window.hideHandler);
if(typeof (_739.initshow)=="undefined"||_739.initshow==true){
ColdFusion.Window.showandhide(_73a,_739);
}
}
var body=document.getElementById(_737+"-body");
if(body){
body.style.width="100%";
body.style.height="100%";
}
var _746=body.parentNode.parentNode.parentNode;
if(_746){
_746.style.overflow="auto";
}
var _747=document.getElementsByClassName("x-window-bodywrap");
if(typeof (_747)!="undefined"){
for(var i=0;i<_747.length;i++){
var elem=_747[i].firstChild;
elem.style.overflow="hidden";
}
}
};
ColdFusion.Window.showandhide=function(_749,_74a){
if(typeof (_74a.tempinitshow)!="undefined"&&_74a.tempinitshow==false){
var _74b=Ext.Element.get(_749.divid);
if(typeof _74b!="undefined"&&_74b){
_74b.show();
_74b.hide();
}
}else{
if(_749){
_749.show();
}
}
};
ColdFusion.Window.destroy=function(_74c,_74d){
if(_74c){
var _74e=ColdFusion.Window.getWindowObject(_74c);
if(_74e){
if(_74d===true){
_74e.destroy(true);
}else{
_74e.destroy();
}
ColdFusion.objectCache[_74c]=null;
}
}
};
ColdFusion.Window.resizeHandler=function(_74f,_750,_751){
if(typeof (_74f.fixedcenter)!="undefined"&&_74f.fixedcenter==true){
_74f.center();
}
};
ColdFusion.Window.beforeShowHandler=function(_752){
if(typeof (_752.fixedcenter)!="undefined"&&_752.fixedcenter==true){
_752.center();
}
};
ColdFusion.Window.beforeCloseHandler=function(_753){
if(_753.destroyonclose!="undefined"&&_753.destroyonclose==true){
ColdFusion.objectCache[_753.cfwindowname]=null;
return true;
}else{
_753.hide();
return false;
}
};
ColdFusion.Window.showHandler=function(_754){
_754._cf_visible=true;
if(_754._cf_dirtyview){
if(typeof (_754.callfromtag)=="undefined"){
ColdFusion.Ajax.replaceHTML(_754._cf_body,_754.url,"GET",null,_754.callbackHandler,_754.errorHandler);
}else{
var _755=ColdFusion.bindHandlerCache[_754._cf_body];
if(_755){
_755();
}
}
_754._cf_dirtyview=false;
}
};
ColdFusion.Window.hideHandler=function(_756){
_756._cf_visible=false;
if(_756._cf_refreshOnShow){
_756._cf_dirtyview=true;
}
};
ColdFusion.Window.xPosition=50;
ColdFusion.Window.yPosition=50;
ColdFusion.Window.resetHTML=function(_757){
var _758=document.getElementById(_757);
if(_758){
_758.innerHTML="";
}
};
ColdFusion.Window.getUpdatedConfigObj=function(_759,_75a){
var _75b={};
if(_759!=null){
if(typeof (_759)!="object"){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidconfig","widget",[_75a],null,null,true);
return;
}
for(var key in _759){
if(key=="center"&&ColdFusion.Util.isBoolean(_759["center"])){
_75b["fixedcenter"]=_759["center"];
}else{
_75b[key]=_759[key];
}
}
}
if(typeof (_75b.initshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.initshow)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidinitshow","widget",[_75a],null,null,true);
return;
}else{
_75b.initshow=ColdFusion.Util.castBoolean(_75b.initshow);
_75b._cf_visible=_75b.initshow;
}
}
_75b.tempcenter=null;
if(typeof (_75b.fixedcenter)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.fixedcenter)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidcenter","widget",[_75a],null,null,true);
return;
}else{
_75b.fixedcenter=ColdFusion.Util.castBoolean(_75b.fixedcenter);
}
}
if(typeof (_75b.resizable)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.resizable)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidresizable","widget",[_75a],null,null,true);
return;
}else{
_75b.resizable=ColdFusion.Util.castBoolean(_75b.resizable);
}
}
if(typeof (_75b.draggable)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.draggable)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invaliddraggable","widget",[_75a],null,null,true);
return;
}else{
_75b.draggable=ColdFusion.Util.castBoolean(_75b.draggable);
}
}
if(typeof (_75b.closable)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.closable)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidclosable","widget",[_75a],null,null,true);
return;
}else{
_75b.closable=ColdFusion.Util.castBoolean(_75b.closable);
}
}
if(typeof (_75b.modal)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.modal)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidmodal","widget",[_75a],null,null,true);
return;
}else{
_75b.modal=ColdFusion.Util.castBoolean(_75b.modal);
}
}
if(typeof (_75b.refreshonshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_75b.refreshonshow)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidrefreshonshow","widget",[_75a],null,null,true);
return;
}else{
_75b._cf_refreshOnShow=ColdFusion.Util.castBoolean(_75b.refreshonshow);
}
}
_75b.shadow=true;
if(!_75b.height){
_75b.height=300;
}else{
if(ColdFusion.Util.isInteger(_75b.height)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheight","widget",[_75a],null,null,true);
return;
}
}
if(!_75b.width){
_75b.width=500;
}else{
if(ColdFusion.Util.isInteger(_75b.width)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidwidth","widget",[_75a],null,null,true);
return;
}
}
var _75d=false;
if(_75b.minwidth){
if(ColdFusion.Util.isInteger(_75b.minwidth)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_75a],null,null,true);
return;
}
var _75e=_75b.minwidth;
var _75f=_75b.width;
if(typeof (_75e)!="number"){
_75e=parseInt(_75e);
}
if(typeof (_75f)!="number"){
_75f=parseInt(_75f);
}
if(_75e>_75f){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_75a],null,null,true);
return;
}
_75b.minWidth=_75b.minwidth;
_75d=true;
}
if(_75b.minheight){
if(ColdFusion.Util.isInteger(_75b.minheight)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminheight","widget",[_75a],null,null,true);
return;
}
var _760=_75b.minheight;
var _761=_75b.height;
if(typeof (_760)!="number"){
_760=parseInt(_760);
}
if(typeof (_761)!="number"){
_761=parseInt(_761);
}
if(_760>_761){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheightvalue","widget",[_75a],null,null,true);
return;
}
_75b.minHeight=_75b.minheight;
_75d=true;
}
if(_75b.x){
if(ColdFusion.Util.isInteger(_75b.x)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidx","widget",[_75a],null,null,true);
return;
}
}
if(_75b.y){
if(ColdFusion.Util.isInteger(_75b.y)==false){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidy","widget",[_75a],null,null,true);
return;
}
}
if(typeof (_75b.x)=="undefined"&&(typeof (_75b.fixedcenter)=="undefined"||_75b.fixedcenter==false)){
_75b.x=ColdFusion.Window.xPosition;
ColdFusion.Window.xPosition+=15;
}
if(typeof (_75b.y)=="undefined"&&(typeof (_75b.fixedcenter)=="undefined"||_75b.fixedcenter==false)){
_75b.y=ColdFusion.Window.yPosition;
ColdFusion.Window.yPosition+=15;
}
if(typeof (_75b.initshow)!="undefined"&&_75b.initshow===false){
_75b.tempinitshow=false;
if(typeof (_75b.fixedcenter)!="undefined"&&_75b.fixedcenter===true){
_75b.tempcenter=_75b.fixedcenter;
_75b.fixedcenter=null;
}else{
_75b.tempx=_75b.x;
_75b.tempy=_75b.y;
}
_75b.x=-10000;
_75b.y=-10000;
}
_75b.constraintoviewport=true;
_75b.initshow=true;
if(_75b.resizable!=null&&_75b.resizable==false&&_75d==true){
ColdFusion.Window.resetHTML(_75a);
ColdFusion.handleError(null,"window.getupdatedconfigobject.minhwnotallowed","widget",[_75a],null,null,true);
return;
}
_75b.collapsible=false;
_75b.shadow=true;
_75b.isConfObj=true;
return _75b;
};
ColdFusion.Window.show=function(_762){
var _763=ColdFusion.objectCache[_762];
if(typeof (_763)!="undefined"&&_763!=null){
if(typeof (_763.isConfObj)!="undefined"&&_763.isConfObj==true){
_763.initshow=true;
var _764=ColdFusion.Window.createHTML(_762,null,_763.url,_763,true);
ColdFusion.Window.createJSObj(_762,_763.url,_764);
}else{
if(_763.isVisible()==false){
_763.show();
ColdFusion.Log.info("window.show.shown","widget",[_762]);
}
if(_763.tempcenter!=null){
_763.center();
_763.tempcenter=null;
}else{
if(_763.getEl()&&_763.getEl().getX()>0&&_763.getEl().getY()>0){
_763.tempx=null;
_763.tempy=null;
}else{
if(_763.tempx!=null&&_763.tempy!=null){
_763.setPosition(_763.tempx,_763.tempy);
_763.tempx=null;
_763.tempy=null;
}else{
var x=_763.getEl().getX();
var y=_763.getEl().getY();
_763.setPosition(x+1,y+1);
_763.setPosition(x,y);
}
}
}
}
}else{
ColdFusion.handleError(null,"window.show.notfound","widget",[_762],null,null,true);
}
};
ColdFusion.Window.hide=function(_767){
var _768=ColdFusion.objectCache[_767];
if(_768){
if(_768.isVisible&&_768.isVisible()==true){
_768.hide();
ColdFusion.Log.info("window.hide.hidden","widget",[_767]);
}
}else{
ColdFusion.handleError(null,"window.hide.notfound","widget",[_767],null,null,true);
}
};
ColdFusion.Window.onShow=function(_769,_76a){
var _76b=ColdFusion.objectCache[_769];
if(typeof (_76b)!="undefined"&&_76b!=null){
_76b._cf_onShow=_76a;
if(_76b.addListener){
_76b.addListener("show",ColdFusion.Window.onShowWrapper);
}
}else{
ColdFusion.handleError(null,"window.onshow.notfound","widget",[_769],null,null,true);
}
};
ColdFusion.Window.onShowWrapper=function(_76c){
_76c._cf_onShow.call(null,_76c.cfwindowname);
};
ColdFusion.Window.onHide=function(_76d,_76e){
var _76f=ColdFusion.objectCache[_76d];
if(typeof (_76f)!="undefined"&&_76f!=null){
_76f._cf_onHide=_76e;
if(_76f.addListener){
_76f.addListener("hide",ColdFusion.Window.onHideWrapper);
}
}else{
ColdFusion.handleError(null,"window.onhide.notfound","widget",[_76d],null,null,true);
}
};
ColdFusion.Window.onHideWrapper=function(_770){
_770._cf_onHide.call(null,_770.cfwindowname);
};
ColdFusion.Window.getWindowObject=function(_771){
if(!_771){
ColdFusion.handleError(null,"window.getwindowobject.emptyname","widget",null,null,null,true);
return;
}
var _772=ColdFusion.objectCache[_771];
if(_772==null||(typeof (_772.isConfObj)=="undefined"&&Ext.Window.prototype.isPrototypeOf(_772)==false)){
ColdFusion.handleError(null,"window.getwindowobject.notfound","widget",[_771],null,null,true);
return;
}
if(typeof (_772.isConfObj)!="undefined"&&_772.isConfObj==true){
_772.initshow=true;
var _773=ColdFusion.Window.createHTML(_771,null,_772.url,_772,true);
ColdFusion.Window.createJSObj(_771,_772.url,_773);
ColdFusion.Window.hide(_771);
_772=ColdFusion.objectCache[_771];
}
return _772;
};

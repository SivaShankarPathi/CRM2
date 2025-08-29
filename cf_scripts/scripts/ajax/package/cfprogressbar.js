/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.ProgressBar){
ColdFusion.ProgressBar={};
}
var $P=ColdFusion.ProgressBar;
ColdFusion.ProgressBar.create=function(_3eb,_3ec,_3ed,_3ee,_3ef,_3f0,_3f1,_3f2,_3f3,_3f4){
var _3f5={renderTo:_3eb,interval:_3ee,onComplete:_3f2,autodisplay:_3f1,onError:_3f4};
var _3f6={renderTo:_3eb};
if(_3f0!=null&&typeof (_3f0)!=undefined){
_3f5.width=_3f0;
_3f6.width=_3f0;
}else{
_3f6.width=400;
}
if(_3ef!=null&&typeof (_3ef)!=undefined){
_3f5.height=_3ef;
_3f6.height=_3ef;
}else{
_3f5.autoHeight=true;
_3f6.autoHeight=true;
}
if(_3ec!=null){
_3f5.manual=true;
_3f5.status_retrieval_fn=_3ec;
}else{
_3f5.manual=false;
_3f5.duration=_3ed;
}
_3f5.hidden=!_3f1;
_3f6.hidden=_3f5.hidden;
if(_3f3!=null&&typeof _3f3!="undefined"){
_3f5.cls=_3f3;
_3f6.cls=_3f3;
}
var _3f7=new Ext.ProgressBar(_3f6);
_3f5.progressBarComp=_3f7;
ColdFusion.objectCache[_3eb]=_3f5;
ColdFusion.Log.info("progressbar.create.created","widget",[_3eb]);
};
$P.start=function(_3f8){
var _3f9=$P.getProgressBarObject(_3f8);
var _3fa=ColdFusion.objectCache[_3f8];
if(!_3f9.isVisible()){
_3f9=_3f9.show();
}
_3fa.started=true;
if(_3fa.manual==false){
var _3fb=_3fa.interval;
var _3fc=_3fa.duration;
var _3fd=_3fc/_3fb;
_3f9.wait({interval:_3fb,duration:_3fc,increment:_3fd,fn:$P.automaticPBCompleteHandler,scope:_3fa});
}else{
var _3fe=setInterval(_3fa.status_retrieval_fn,_3fa.interval);
_3fa.processId=_3fe;
}
ColdFusion.Log.info("progressbar.start.started","widget",[_3f8]);
};
$P.stop=function(_3ff,_400){
var pBar=$P.getProgressBarObject(_3ff);
var _402=ColdFusion.objectCache[_3ff];
var _403=_402.processId;
if(typeof _402.started!="undefined"&&_402.started==true){
_402.started=false;
}else{
ColdFusion.Log.info("progressbar.stop.nonrunning","widget",[_3ff]);
return;
}
if(_403!=null&&typeof (_403)!="undefined"){
clearInterval(_403);
}
if(typeof _402.manual!="undefined"&&_402.manual==false){
pBar.reset();
}
if(_400&&_400==true){
var _404=_402.onComplete;
if(_404!=null&&_404.call){
_404.call();
}
}
ColdFusion.Log.info("progressbar.stop.stopped","widget",[_3ff]);
};
$P.hide=function(_405){
var pBar=$P.getProgressBarObject(_405);
if(pBar.isVisible()){
pBar.hide();
}
ColdFusion.Log.info("progressbar.hide.hidden","widget",[_405]);
};
$P.show=function(_407){
var pBar=$P.getProgressBarObject(_407);
if(!pBar.isVisible()){
pBar.show();
}
ColdFusion.Log.info("progressbar.show.shown","widget",[_407]);
};
$P.reset=function(_409){
var pBar=$P.getProgressBarObject(_409);
if(typeof pBar!="undefined"){
pBar.reset();
}
ColdFusion.Log.info("progressbar.reset.reset","widget",[_409]);
};
$P.updateStatus=function(_40b,_40c,_40d){
var pBar=$P.getProgressBarObject(_40b);
if(typeof (_40c)=="undefined"||typeof (_40c)!="number"){
ColdFusion.handleError(null,"progressbar.updatestatus.invalidstatus","widget",[_40b,_40c],null,null,true);
return;
}
if(typeof pBar!="undefined"){
pBar.updateProgress(_40c,_40d);
}
ColdFusion.Log.info("progressbar.updatestatus.updated","widget",[_40b]);
};
$P.update=function(_40f,_410){
var _411={};
var _412=ColdFusion.objectCache[_40f];
if(_412==null||typeof (_412)=="undefined"){
ColdFusion.handleError(null,"progressbar.update.notfound","widget",[_40f],null,null,true);
return;
}
if(_410.duration){
if(typeof _410.duration==="number"||typeof _410.duration=="object"){
_411.duration=_410.duration;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidduration","widget",[_40f],null,null,true);
return;
}
}
if(_410.interval){
if(typeof _410.interval==="number"||typeof _410.interval=="object"){
_411.interval=_410.interval;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidinterval","widget",[_40f],null,null,true);
return;
}
}
if(_410.oncomplete){
if(typeof _410.oncomplete==="function"||typeof _410.oncomplete=="object"){
_411.onComplete=_410.oncomplete;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidoncomplete","widget",[_40f],null,null,true);
return;
}
}
for(key in _411){
_412[key]=_411[key];
}
ColdFusion.Log.info("progressbar.update.updated","widget",[_40f]);
};
$P.loadStatus=function(data,_414){
var _415=ColdFusion.AjaxProxy.JSON.decode(data);
var _416=_415.MESSAGE;
var _417=_415.STATUS;
var pBar=$P.getProgressBarObject(_414._cf_progressbarid);
pBar.updateProgress(_417,_416);
if(_417&&(_417===1||_417==1||_417>1)){
$P.stop(_414._cf_progressbarid,true);
}
};
$P.automaticPBCompleteHandler=function(){
var _419=this.progressBarComp;
_419.updateProgress(1);
if(this.onComplete&&typeof this.onComplete=="function"){
this.onComplete.call(_419,_419);
}
};
$P.errorHandler=function(_41a,_41b,_41c){
var pbId=_41c.bindToParams._cf_progressbarid;
var _41e=ColdFusion.objectCache[pbId];
var _41f=_41e.onError;
if(_41f!=null&&typeof _41f==="function"){
_41f.call(null,_41a,_41b);
}
$P.stop(pbId);
};
$P.getProgressBarObject=function(_420){
var _421=ColdFusion.objectCache[_420];
if(_421==null||typeof (_421)=="undefined"){
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarid","widget",[_420],null,null,true);
return;
}
if(_421.progressBarComp&&typeof _421.progressBarComp!="undefined"){
return _421.progressBarComp;
}else{
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarcomponent","widget",[_420],null,null,true);
return;
}
};

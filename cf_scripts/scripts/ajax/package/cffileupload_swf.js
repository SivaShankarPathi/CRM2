/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.FileUpload){
ColdFusion.FileUpload={};
}
var $FS=ColdFusion.FileUpload;
$FS.defaultSWFLocation=_cf_ajaxscriptsrc+"/resources/cf/assets/MultiFileUpload.swf";
var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;
var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;
var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;
var defaultAddButtonLabel="Add Files";
var defaultUploadButtonLabel="Upload";
var defaultClearButtonLabel="Clear All";
var defaultDeleteButtonLabel="Delete";
var defaultAddIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/addfile.png";
var defaultUploadIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/upload.png";
var defaultClearIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/clear.gif";
var defaultDeleteIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/delete.png";
var defaultUploadSize=10*1024*1024;
var fileUploadPrefix="cf_fileUpload_";
ColdFusion.FileUpload.create=function(_6c9,_6ca,_6cb,_6cc,_6cd,_6ce,_6cf,_6d0,_6d1,_6d2,_6d3,_6d4,_6d5,_6d6,_6d7,_6d8,_6d9,_6da,_6db,_6dc,_6dd,_6de,_6df,_6e0,_6e1,_6e2,_6e3,_6e4,_6e5,_6e6){
var _6e7={};
_6e7.uploadDivId=_6c9;
_6e7.fileUploadName=fileUploadPrefix+_6c9;
_6e7.url_withoutQuery=_6ca;
_6e7.url_queryString=_6cb;
_6e7.url_CF_cookie=_6cc;
_6e7.url=$FS.constructUrl(_6ca,_6cb,_6cc);
_6e7.onCompleteHandler=_6d4;
_6e7.onUploadCompleteHandler=_6d5;
_6e7.onErrorHandler=_6d6;
_6e7.progressbar=_6e1;
if(_6d9==null){
_6d9="";
}
_6e7.bgcolor=_6d9;
if(_6da==null){
_6da="";
}
_6e7.selectcolor=_6da;
if(_6db==null){
_6db="";
}
_6e7.rollovercolor=_6db;
if(_6dc==null){
_6dc="";
}
_6e7.textcolor=_6dc;
if(_6df==null){
_6df="left";
}
_6e7.titletextalign=_6df;
if(_6dd==null){
_6dd="";
}
_6e7.titletextcolor=_6dd;
if(_6de==null){
_6de="";
}
_6e7.headercolor=_6de;
_6e7.bgcolor=_6d9;
_6e7.bgcolor=_6d9;
if(_6e0==null){
_6e0="";
}
_6e7.fileFilter=_6e0;
_6e7.disableUploadButton=_6e3;
if(_6e5==null||typeof _6e5=="undefined"){
_6e5="window";
}
_6e7.wmode=_6e5;
_6e7.stopOnError=_6e4;
if(_6cd==null||typeof _6cd==="undefined"){
_6cd=defaultAddButtonLabel;
}
_6e7.addIcon=defaultAddIcon;
_6e7.addButtonLabel=_6cd;
if(_6cf==null||typeof _6cf==="undefined"){
_6cf=defaultUploadButtonLabel;
}
_6e7.uploadButtonLabel=_6cf;
_6e7.uploadIcon=defaultUploadIcon;
if(_6d1==null||typeof _6d1==="undefined"){
_6d1="File Upload ";
}
_6e7.title=_6d1;
_6e7.swfLocation=$FS.defaultSWFLocation;
if(_6ce==null||typeof _6ce==="undefined"){
_6ce=defaultClearButtonLabel;
}
_6e7.clearButtonLabel=_6ce;
_6e7.clearIcon=defaultClearIcon;
if(_6d0==null||typeof _6d0==="undefined"){
_6d0=defaultDeleteButtonLabel;
}
_6e7.deleteButtonLabel=_6d0;
_6e7.deleteIcon=defaultDeleteIcon;
if(_6d2==null||!typeof _6d2==="Number"){
_6d2=-1;
}
_6e7.maxFileSelect=_6d2;
if(_6d3==null||!typeof _6d3==="number"){
_6d3=defaultUploadSize;
}
_6e7.maxUploadSize=_6d3;
if(_6d7==null||typeof _6d7==="undefined"){
_6d7=420;
}
_6e7.widthInPx=_6d7+"px";
_6e7.width=_6d7;
if(_6d8==null||typeof _6d8==="undefined"){
_6d8=300;
}
_6e7.heightInPx=_6d8+"px";
_6e7.height=_6d8;
_6e7.align=_6e6;
ColdFusion.objectCache[_6c9]=_6e7;
ColdFusion.objectCache[_6e7.fileUploadName]=_6e7;
var _6e8=$FS.constructMarkup(_6e7);
var _6e9=document.getElementById(_6c9);
_6e9.innerHTML=_6e8;
ColdFusion.Log.info("fileupload.initialized","widget",[_6c9]);
};
$FS.constructMarkup=function(_6ea){
var str="";
if(isIE&&isWin&&!isOpera){
str+="<object width=\""+_6ea.width+"\" height=\""+_6ea.height+"\"";
str+=" id=\""+_6ea.fileUploadName+"\" name=\""+_6ea.playerName+"\" type=\"application/x-shockwave-flash\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ";
str+=" data=\""+_6ea.swfLocation+"\">";
str+="<param name=\"movie\" value=\""+_6ea.swfLocation+"\" />";
str+="<param name=\"quality\" value=\""+_6ea.quality+"\" />";
str+="<param name=\"allowFullScreen\" value=\""+_6ea.fullScreen+"\" />";
str+="<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
str+="<param name=\"wmode\" value=\""+_6ea.wmode+"\" />";
str+="<param name=\"flashvars\" value=\"uniqueid="+_6ea.fileUploadName+"&url="+_6ea.url+"&addLabel="+_6ea.addButtonLabel+"&deleteLabel="+_6ea.deleteButtonLabel;
str+="&clearLabel="+_6ea.clearButtonLabel+"&uploadLabel="+_6ea.uploadButtonLabel+"&maxUploadSize="+_6ea.maxUploadSize+"&maxFileSelect="+_6ea.maxFileSelect+"&progress="+_6ea.progressbar;
str+="&stopOnError="+_6ea.stopOnError+"&hideUpload="+_6ea.disableUploadButton+"&bgcolor="+_6ea.bgcolor+"&fileFilter="+_6ea.fileFilter+"&deleteIcon="+_6ea.deleteIcon+"&title="+_6ea.title;
str+="&uploadIcon="+_6ea.uploadIcon+"&textcolor="+_6ea.textcolor+"&titletextcolor="+_6ea.titletextcolor+"&headercolor="+_6ea.headercolor+"&titletextalign="+_6ea.titletextalign+"&rollovercolor="+_6ea.rollovercolor+"&selectcolor="+_6ea.selectcolor+"\" />";
str+="</object>";
}else{
str="<embed src=\""+_6ea.swfLocation+"\" allowScriptAccess=\"samedomain\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\""+_6ea.wmode+"\"";
str+=" name=\""+_6ea.fileUploadName+"\" width=\""+_6ea.width+"\" height=\""+_6ea.height+"\" quality=\" "+_6ea.quality+"\"";
str+=" flashvars=\"uniqueid="+_6ea.fileUploadName+"&url="+_6ea.url+"&addLabel="+_6ea.addButtonLabel+"&deleteLabel="+_6ea.deleteButtonLabel;
str+="&clearLabel="+_6ea.clearButtonLabel+"&uploadLabel="+_6ea.uploadButtonLabel+"&maxUploadSize="+_6ea.maxUploadSize+"&maxFileSelect="+_6ea.maxFileSelect+"&progress="+_6ea.progressbar;
str+="&stopOnError="+_6ea.stopOnError+"&hideUpload="+_6ea.disableUploadButton+"&bgcolor="+_6ea.bgcolor+"&fileFilter="+_6ea.fileFilter+"&deleteIcon="+_6ea.deleteIcon+"&title="+_6ea.title;
str+="&uploadIcon="+_6ea.uploadIcon+"&textcolor="+_6ea.textcolor+"&titletextcolor="+_6ea.titletextcolor+"&headercolor="+_6ea.headercolor+"&titletextalign="+_6ea.titletextalign+"&rollovercolor="+_6ea.rollovercolor+"&selectcolor="+_6ea.selectcolor+"\" />";
}
return str;
};
$FS.constructUrl=function(_6ec,_6ed,_6ee){
var url=_6ec;
if(_6ed!=null){
url+="?"+_6ed;
if(_6ee!=null){
url+="%26"+_6ee;
}
}else{
if(_6ee!=null){
url+="?"+_6ee;
}
}
return url;
};
coldfusion_FileUploadSwf_complete=function(name,_6f1){
var _6f2=$FS.getFileUploadComponent(name);
var _6f3=ColdFusion.objectCache[name];
var _6f4=_6f3.onCompleteHandler;
if(_6f4!=null&&typeof _6f4=="function"){
_6f4.call(this,_6f1);
}
$FS.addResultToArray(_6f1,_6f3);
};
coldfusion_FileUploadSwf_onError=function(name,_6f6){
var _6f7=$FS.getFileUploadComponent(name);
var _6f8=ColdFusion.objectCache[name];
var _6f9=_6f8.onErrorHandler;
if(_6f9!=null&&typeof _6f9=="function"){
_6f9.call(this,_6f6);
}
$FS.addResultToArray(_6f6,_6f8);
};
coldfusion_FileUploadSwf_UploadCompete=function(name){
var _6fb=$FS.getFileUploadComponent(name);
var _6fc=ColdFusion.objectCache[name];
var _6fd=_6fc.onUploadCompleteHandler;
var _6fe=_6fc.resultArray;
if(_6fd!=null&&typeof _6fd=="function"){
_6fd.call(this,_6fe);
}
_6fc.resultArray=new Array();
};
$FS.addResultToArray=function(_6ff,_700){
var _701=_700.resultArray;
if(_701==null||typeof _701=="undefined"){
_701=_700.resultArray=new Array();
}
_701.push(_6ff);
};
$FS.cancelUpload=function(name){
var _703=fileUploadPrefix+name;
var _704=$FS.getFileUploadComponent(_703);
if(_704!=null){
_704.cancelFileUpload();
}else{
ColdFusion.handleError(null,"fileupload.cancelupload.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.cancelupload.cancelled","widget",[name]);
};
$FS.getSelectedFiles=function(name){
var _706=fileUploadPrefix+name;
var _707=$FS.getFileUploadComponent(_706);
if(_707!=null){
return _707.getSelectedFileArray();
}else{
ColdFusion.handleError(null,"fileupload.getSelectedFiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.getSelectedFiles.selected","widget",[name]);
};
$FS.clearAllFiles=function(name){
var _709=fileUploadPrefix+name;
var _70a=$FS.getFileUploadComponent(_709);
if(_70a!=null){
_70a.clearAllUpload();
}else{
ColdFusion.handleError(null,"fileupload.clearallfiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.clearallfiles.cleared","widget",[name]);
};
$FS.setURL=function(name,src){
var _70d=$FS.getFileUploadComponent(fileUploadPrefix+name);
var _70e=ColdFusion.objectCache[name];
if(_70e==null||typeof (_70e)=="undefined"){
ColdFusion.handleError(null,"fileupload.setURL.notfound","widget",[name],null,null,true);
}
if(!src||src.length==0){
ColdFusion.handleError(null,"fileupload.setURL.invalidurl","widget",[name],null,null,true);
}
var _70f=null;
if(src.indexOf("?")>0){
_70f=src.substring(src.indexOf("?")+1);
_70f=escape(_70f);
src=src.substring(0,src.indexOf("?"));
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _710=_70e.url_withoutQuery;
_710=unescape(_710);
var _711="";
if(_710||_710.indexOf("/")>-1){
_711=_710.substring(0,_710.lastIndexOf("/")+1);
}
var _712=_711+src;
var _713=_712.split("/");
var _714=new Array();
var _715=0;
for(var i=0;i<_713.length;i++){
if(_713[i]==".."){
_714[--_715]="";
}else{
_714[_715++]=_713[i];
}
}
src=_714[0];
for(var i=1;i<_715;i++){
src=src+"/"+_714[i];
}
}
var _717=$FS.constructUrl(src,_70f,_70e.url_CF_cookie);
_70e.url=_717;
_70d.setSrc(_717);
ColdFusion.Log.info("fileupload.setURL.urlset","widget",[name,_717]);
};
$FS.startUpload=function(name){
var _719=fileUploadPrefix+name;
var _71a=$FS.getFileUploadComponent(_719);
if(_71a!=null){
_71a.submitUploadForm();
}else{
ColdFusion.handleError(null,"fileupload.startupload.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.startupload.started","widget",[name]);
};
$FS.getFileUploadComponent=function(name){
if(navigator.appName.indexOf("Microsoft")!=-1){
if(window[name]!=null){
return window[name];
}else{
return document[name];
}
}else{
return document[name];
}
};

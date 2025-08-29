/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var _CF_error_messages=new Array();
var _CF_error_fields=new Object();
var _CF_FirstErrorField=null;
var _CF_submit_status=new Array();
_CF_signalLoad=function(){
_CF_loaded=1;
};
_CF_onError=function(_7a1,_7a2,_7a3,_7a4){
if(_CF_error_fields[_7a2]==null){
if(_CF_FirstErrorField==null){
_CF_FirstErrorField=_7a2;
}
_CF_error_exists=true;
_CF_error_fields[_7a2]=_7a4;
_CF_error_messages[_CF_error_messages.length]=_7a4;
}
};
_CF_onErrorAlert=function(_7a5){
var _7a6="";
for(var i=0;i<_7a5.length;i++){
_7a6+=_7a5[i]+"\n";
}
alert(_7a6);
return false;
};
updateHiddenValue=function(val,form,name){
if(form==null||form==""){
form=0;
}
if(document.forms[form]==null||document.forms[form][name]==null){
return;
}
document.forms[form][name].value=val;
};
_CF_hasValue=function(obj,_7ac,_7ad){
if(_7ac=="TEXT"||_7ac=="FILE"||_7ac=="PASSWORD"||_7ac=="CFTEXTAREA"||_7ac=="TEXTAREA"||_7ac=="CFTEXTINPUT"||_7ac=="DATEFIELD"){
if(obj.value.length==0){
return false;
}else{
if(_7ad){
str=obj.value.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
}
return true;
}else{
if(_7ac=="SELECT"){
for(i=0;i<obj.length;i++){
if(obj.options[i].selected&&obj.options[i].value.length>0){
return true;
}
}
return false;
}else{
if(_7ac=="SINGLE_VALUE_RADIO"||_7ac=="SINGLE_VALUE_CHECKBOX"){
if(obj.checked){
return true;
}else{
return false;
}
}else{
if(_7ac=="RADIO"||_7ac=="CHECKBOX"){
if(obj.length==undefined&&obj.checked){
return true;
}else{
for(i=0;i<obj.length;i++){
if(obj[i].checked){
return true;
}
}
}
return false;
}else{
if(_7ac=="CFTREE"){
if(obj["value"].length>0){
return true;
}else{
return false;
}
}else{
if(_7ac=="RICHTEXT"){
var _7ae=FCKeditorAPI.GetInstance(obj.id);
var val=_7ae.GetXHTML();
if(val.length==0){
return false;
}else{
if(_7ad){
str=val.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
return true;
}
}else{
return true;
}
}
}
}
}
}
};
_CF_checkdate=function(_7b0,_7b1){
_7b0=_7b0.replace(/^\s+/,"").replace(/\s+$/,"");
_7b0=_7b0=_7b0.replace(/{d \'/,"").replace(/'}/,"");
if(_7b1){
if(_7b0.length==0){
return false;
}
}else{
if(_7b0.length==0){
return true;
}
}
if(_7b0.length==0){
return true;
}
isplit=_7b0.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_7b0.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_7b0.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_7b0.length){
return false;
}
var _7b2=_7b0.substring(0,isplit);
if(_7b2.length==4){
sYear=_7b0.substring(0,isplit);
isplit=_7b0.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_7b0.length){
return false;
}
sMonth=_7b0.substring((sYear.length+1),isplit);
sDay=_7b0.substring(isplit+1);
}else{
sMonth=_7b0.substring(0,isplit);
isplit=_7b0.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_7b0.length){
return false;
}
sDay=_7b0.substring((sMonth.length+1),isplit);
sYear=_7b0.substring(isplit+1);
}
if((sDay.length==0)||(sMonth.length==0)||(sYear.length==0)){
return false;
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(sYear.length!=1&&sYear.length!=2&&sYear.length!=4){
return false;
}else{
if(!_CF_checkrange(sYear,0,9999)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
}
};
_CF_checkeurodate=function(_7b3,_7b4){
_7b3=_7b3.replace(/^\s+/,"").replace(/\s+$/,"");
_7b3=_7b3=_7b3.replace(/{d \'/,"").replace(/'}/,"");
if(_7b4){
if(_7b3.length==0){
return false;
}
}else{
if(_7b3.length==0){
return true;
}
}
isplit=_7b3.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_7b3.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_7b3.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_7b3.length){
return false;
}
var _7b5=_7b3.substring(0,isplit);
if(_7b5.length==4){
sYear=_7b3.substring(0,isplit);
isplit=_7b3.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_7b3.length){
return false;
}
sMonth=_7b3.substring((sYear.length+1),isplit);
sDay=_7b3.substring(isplit+1);
}else{
sDay=_7b3.substring(0,isplit);
isplit=_7b3.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_7b3.length){
return false;
}
sMonth=_7b3.substring((sDay.length+1),isplit);
sYear=_7b3.substring(isplit+1);
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(!_CF_checkrange(sYear,0,null)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
};
_CF_checkday=function(_7b6,_7b7,_7b8){
maxDay=31;
if(_7b7==4||_7b7==6||_7b7==9||_7b7==11){
maxDay=30;
}else{
if(_7b7==2){
if(_7b6%4>0){
maxDay=28;
}else{
if(_7b6%100==0&&_7b6%400>0){
maxDay=28;
}else{
maxDay=29;
}
}
}
}
return _CF_checkrange(_7b8,1,maxDay);
};
_CF_checkinteger=function(_7b9,_7ba){
_7b9=_7b9.replace(/^\s+/,"").replace(/\s+$/,"");
_7b9=_7b9.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_7ba){
if(_7b9.length==0){
return false;
}
}else{
if(_7b9.length==0){
return true;
}
}
var _7bb=".";
var _7bc=_7b9.indexOf(_7bb);
if(_7bc==-1){
return _CF_checknumber(_7b9);
}else{
return false;
}
};
_CF_numberrange=function(_7bd,_7be,_7bf,_7c0){
if(_7c0){
if(_7bd.length==0){
return false;
}
}else{
if(_7bd.length==0){
return true;
}
}
if(_7be!=null){
if(_7bd<_7be){
return false;
}
}
if(_7bf!=null){
if(_7bd>_7bf){
return false;
}
}
return true;
};
_CF_checknumber=function(_7c1,_7c2){
var _7c3=" .+-0123456789";
var _7c4=" .0123456789";
var _7c5;
var _7c6=false;
var _7c7=false;
var _7c8=false;
_7c1=_7c1.replace(/^\s+/,"").replace(/\s+$/,"");
_7c1=_7c1.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_7c2){
if(_7c1.length==0){
return false;
}
}else{
if(_7c1.length==0){
return true;
}
}
_7c5=_7c3.indexOf(_7c1.charAt(0));
if(_7c5==1){
_7c6=true;
}else{
if(_7c5<1){
return false;
}
}
for(var i=1;i<_7c1.length;i++){
_7c5=_7c4.indexOf(_7c1.charAt(i));
if(_7c5<0){
return false;
}else{
if(_7c5==1){
if(_7c6){
return false;
}else{
_7c6=true;
}
}else{
if(_7c5==0){
if(_7c6||_7c8){
_7c7=true;
}
}else{
if(_7c7){
return false;
}else{
_7c8=true;
}
}
}
}
}
return true;
};
_CF_checkrange=function(_7ca,_7cb,_7cc,_7cd){
_7ca=_7ca.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7cd){
if(_7ca.length==0){
return false;
}
}else{
if(_7ca.length==0){
return true;
}
}
if(!_CF_checknumber(_7ca)){
return false;
}else{
return (_CF_numberrange((eval(_7ca)),_7cb,_7cc));
}
return true;
};
_CF_checktime=function(_7ce,_7cf){
_7ce=_7ce.replace(/^\s+/,"").replace(/\s+$/,"");
_7ce=_7ce.replace(/\s+:\s+/,":");
_7ce=_7ce=_7ce.replace(/{t \'/,"").replace(/'}/,"");
if(_7cf){
if(_7ce.length==0){
return false;
}
}else{
if(_7ce.length==0){
return true;
}
}
var _7d0=_CF_checkregex(_7ce,/^((([0-1]?\d)|(2[0-3])):[0-5]?\d)?(:[0-5]?\d)? ?([AP]M|[AP]m|[ap]m|[ap]M)?$/,_7cf);
return _7d0;
};
_CF_checkphone=function(_7d1,_7d2){
_7d1=_7d1.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7d2){
if(_7d1.length==0){
return false;
}
}else{
if(_7d1.length==0){
return true;
}
}
if(_7d1.length==0){
return true;
}
return _CF_checkregex(_7d1,/^(((1))?[ ,\-,\.]?([\\(]?([1-9][0-9]{2})[\\)]?))?[ ,\-,\.]?([^0-1]){1}([0-9]){2}[ ,\-,\.]?([0-9]){4}(( )((x){0,1}([0-9]){1,5}){0,1})?$/,_7d2);
};
_CF_checkzip=function(_7d3,_7d4){
_7d3=_7d3.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7d4){
if(_7d3.length==0){
return false;
}
}else{
if(_7d3.length==0){
return true;
}
}
return _CF_checkregex(_7d3,/^([0-9]){5,5}$|(([0-9]){5,5}(-| ){1}([0-9]){4,4}$)/,_7d4);
};
_CF_checkcreditcard=function(_7d5,_7d6){
_7d5=_7d5.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7d6){
if(_7d5.length==0){
return false;
}
}else{
if(_7d5.length==0){
return true;
}
}
if(_7d5.length==0){
return true;
}
var _7d7=" -";
var _7d8="";
var _7d9;
for(var i=0;i<_7d5.length;i++){
_7d9=_7d7.indexOf(_7d5.charAt(i));
if(_7d9<0){
_7d8+=_7d5.substring(i,(i+1));
}
}
if(_7d8.length<13||_7d8.length>19){
return false;
}
if(_7d8.charAt(0)=="+"){
return false;
}
if(!_CF_checkinteger(_7d8)){
return false;
}
var _7db=_7d8.length%2==1?false:true;
var _7dc=0;
var _7dd;
for(var i=0;i<_7d8.length;i++){
_7dd=eval(_7d8.charAt(i));
if(_7db){
_7dd*=2;
_7dc+=(_7dd%10);
if((_7dd/10)>=1){
_7dc++;
}
_7db=false;
}else{
_7dc+=_7dd;
_7db=true;
}
}
return (_7dc%10)==0?true:false;
};
_CF_checkssn=function(_7de,_7df){
_7de=_7de.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7df){
if(_7de.length==0){
return false;
}
}else{
if(_7de.length==0){
return true;
}
}
return _CF_checkregex(_7de,/^[0-9]{3}(-| )[0-9]{2}(-| )[0-9]{4}$/,_7df);
};
_CF_checkEmail=function(_7e0,_7e1){
_7e0=_7e0.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7e1){
if(_7e0.length==0){
return false;
}
}else{
if(_7e0.length==0){
return true;
}
}
return _CF_checkregex(_7e0,/^[a-zA-Z_0-9-'\+~]+(\.[a-zA-Z_0-9-'\+~]+)*@([a-zA-Z_0-9-]+\.)+[a-zA-Z]*$/,_7e1);
};
_CF_checkURL=function(_7e2,_7e3){
_7e2=_7e2.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7e3){
if(_7e2.length==0){
return false;
}
}else{
if(_7e2.length==0){
return true;
}
}
return _CF_checkregex(_7e2.toLowerCase(),/^((http|https|ftp|file)\:\/\/([a-zA-Z0-0]*:[a-zA-Z0-0]*(@))?[a-zA-Z0-9-\.]+(\.[a-zA-Z]{2,3})?(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9-\._\?\,\'\/\+&amp;%\$#\=~])*)|((mailto)\:[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]*)|((news)\:[a-zA-Z0-9\.]*)$/,_7e3);
};
_CF_checkUUID=function(_7e4,_7e5){
_7e4=_7e4.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7e5){
if(_7e4.length==0){
return false;
}
}else{
if(_7e4.length==0){
return true;
}
}
return _CF_checkregex(_7e4,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{16,16}/,_7e5);
};
_CF_checkGUID=function(_7e6,_7e7){
_7e6=_7e6.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7e7){
if(_7e6.length==0){
return false;
}
}else{
if(_7e6.length==0){
return true;
}
}
return _CF_checkregex(_7e6,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{12,12}/,_7e7);
};
_CF_checkBoolean=function(_7e8,_7e9){
_7e8=_7e8.replace(/^\s+/,"").replace(/\s+$/,"");
if(_7e9){
if(_7e8.length==0){
return false;
}
}else{
if(_7e8.length==0){
return true;
}
}
if(_7e8.toUpperCase()=="TRUE"||_7e8.toUpperCase()=="YES"||(_CF_checknumber(_7e8)&&_7e8!="0")){
return true;
}else{
if(_7e8.toUpperCase()=="FALSE"||_7e8.toUpperCase()=="NO"||_7e8=="0"){
return true;
}else{
return false;
}
}
};
_CF_setFormParam=function(_7ea,_7eb,_7ec){
var _7ed="document['"+_7ea+"']['"+_7eb+"']";
var obj=eval(_7ed);
if(obj==undefined){
return false;
}else{
obj.value=_7ec;
return true;
}
};
_CF_checkregex=function(_7ef,_7f0,_7f1){
if(_7f1){
if(_7ef.length==0){
return false;
}
}else{
if(_7ef.length==0){
return true;
}
}
return _7f0.test(_7ef);
};

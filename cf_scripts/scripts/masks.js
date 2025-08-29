/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var KT_focusedEl=null;
KT_validateSingle=function(_7f2,_7f3){
var _7f4=_7f2.charCodeAt(0);
switch(_7f3){
case "9":
if(_7f4<58&&_7f4>47){
return true;
}
break;
case "A":
if((_7f4<91&&_7f4>64)||(_7f4<123&&_7f4>96)){
return true;
}
break;
case "X":
if((_7f4<91&&_7f4>64)||(_7f4<123&&_7f4>96)||(_7f4<58&&_7f4>47)){
return true;
}
break;
case "?":
return true;
break;
default:
return true;
break;
}
};
KT_maskDefaultValue=function(_7f5){
switch(_7f5){
case "9":
return "0";
break;
case "A":
return "a";
break;
case "X":
return "0";
break;
case "?":
return "0";
break;
default:
return "0";
break;
}
};
KT_isSpecialChar=function(_7f6){
if(_7f6=="9"||_7f6=="A"||_7f6=="X"||_7f6=="?"){
return true;
}else{
return false;
}
};
mask_onValueChanged=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(KT_focusedEl==null||KT_focusedEl.mask==null||KT_focusedEl.mask==""){
return;
}
var mask=KT_focusedEl.mask;
var val=KT_focusedEl.value;
var i=0;
var _7fa=false;
if(val==KT_focusedEl.oldText){
return;
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_7fa=true;
}
for(;i<mask.length;i++){
if(val.charCodeAt(i).toString()!="NaN"){
if(KT_isSpecialChar(mask.charAt(i))){
if(KT_validateSingle(val.charAt(i),mask.charAt(i))){
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
break;
}
}else{
if(val.charAt(i)!=mask.charAt(i)){
if(i==val.length-1){
var _7fb=val.substr(val.length-1,val.length);
val=val.substr(0,val.length-1)+mask.charAt(i)+_7fb;
_7fa=true;
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
}
break;
}
}
}else{
if(val.length<KT_focusedEl.oldText.length){
break;
}
for(;i<mask.length;i++){
if(!KT_isSpecialChar(mask.charAt(i))){
val+=mask.charAt(i);
_7fa=true;
}else{
break;
}
}
break;
}
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_7fa=true;
}
if(KT_focusedEl.value!=val){
KT_focusedEl.value=val;
}
KT_focusedEl.oldText=val;
if(_7fa){
}
};
mask_parseFirstTime=function(_7fc,mask){
var _7fe="";
var _7ff="";
cond=1;
imask=0;
ival=0;
cnt=0;
while(cond==1){
cond=1;
if(!KT_isSpecialChar(mask.charAt(imask))){
if(_7fc.charCodeAt(ival).toString()!="NaN"){
if(mask.charAt(imask)==_7fc.charAt(ival)){
imask++;
ival++;
}else{
_7fc=_7fc.substr(0,ival)+mask.charAt(imask)+_7fc.substr(ival,_7fc.length);
imask=0;
ival=0;
cond=1;
}
}else{
_7fc+=KT_maskDefaultValue(mask.charAt(imask));
}
}else{
imask++;
ival++;
}
if(imask>=mask.length||ival>=_7fc.length){
cond=0;
}
}
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_7fe+=mask.charAt(i);
if(_7fc.charCodeAt(i).toString()!="NaN"){
_7ff+=_7fc.charAt(i);
}else{
_7ff+=KT_maskDefaultValue(mask.charAt(i));
}
}
}
oldvalue=_7fc;
_7fc=_7ff;
var _800="";
for(i=0;i<_7fe.length;i++){
if(!KT_validateSingle(_7fc.charAt(i),_7fe.charAt(i))){
_800+=KT_maskDefaultValue(_7fe.charAt(i));
}else{
_800+=_7fc.charAt(i);
}
}
var _801="";
var j=0;
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_801+=_800.charAt(j++);
}else{
_801+=mask.charAt(i);
}
}
return _801;
};
mask_onSetFocus=function(obj,mask){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(typeof obj.mask=="undefined"){
ret="";
if(obj.value!=""){
ret=mask_parseFirstTime(obj.value,mask);
}
obj.value=ret;
obj.mask=mask;
}
KT_focusedEl=obj;
if(typeof KT_focusedEl.oldText=="undefined"){
KT_focusedEl.oldText=obj.value;
mask_onValueChanged();
}
};
mask_onKillFocus=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
mask_onValueChanged();
KT_focusedEl=null;
};

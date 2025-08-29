/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.WebSocket={NS:"coldfusion.websocket.channels",WELCOME:"welcome",AUTHENTICATE:"authenticate",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",PUBLISH:"publish",INVOKE_AND_PUBLISH:"invokeAndPublish",GET_CHANNELS:"getChannels",GET_SUBSCRIBER_COUNT:"getSubscriberCount",GET_SUBSCRIPTIONS:"getSubscriptions",SEND_MESSAGE:"sendMessage",INVOKE_AND_MESSAGE:"invokeAndSend",INVOKE:"invoke",STOP:"stop",init:function(id,_5ab,_5ac,_5ad,_5ae,_5af,_5b0,_5b1,_5b2,_5b3,_5b4){
if(cf_ws.isWebSocketSupported()){
lWSC=new cf_ws.CFWebSocketWrapper();
ColdFusion.WebSocket[id]=lWSC;
lWSC.options={OnWelcome:this.cfonOpencallBk,OnMessage:this.cfMessageHandlerCallBk,OnClose:_5b1,onError:_5b2,appName:_5ab,cfauth:_5ad,subscribeTo:_5ae,referrer:_5b3};
var _5b5=self.location.hostname;
if(!(self.WebSocket||self.MozWebSocket)&&_5ac==true){
var _5b6={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"WebSocket over SSL will not work as your browser does not have native WebSockets support."};
var _5b7=_5b2!=null?_5b2:_5af;
_5b7(_5b6);
return;
}
if(_5ac==false&&_5b5&&_5b5=="localhost"){
_5b5="127.0.0.1";
}
var _5b8;
var port;
if(_5b4){
if(self.location.port!=""){
port=self.location.port;
}else{
if(self.location.protocol!=""&&self.location.protocol=="https:"){
port=443;
}else{
port=80;
}
}
if(self.location.protocol!=""&&self.location.protocol=="https:"){
protocol="wss://";
}else{
protocol="ws://";
}
_5b8="/cfws";
}else{
port=_5ac?_cf_websocket_ssl_port:_cf_websocket_port;
_5b8="/cfusion"+"/cfusion";
protocol=_5ac?"wss://":"ws://";
}
var lURL=protocol+(_5b5)+":"+port+_5b8;
lWSC.options.url=lURL;
var lRes=lWSC.open(lURL,lWSC.options);
lWSC.isOpen=true;
lWSC.processConnected=function(_5bc){
};
lWSC.processDisconnected=function(_5bd){
};
lWSC.defaultMessageHandler=_5af;
if(_5b0){
lWSC.appOnOpenHandler=_5b0;
}
lWSC.channelSpecificResHandlers={};
lWSC.subscribercount_callbackHandlers={};
return lWSC;
}else{
var _5b6={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"Browser neither have native WebSocket support nor a flash player for the fallback."};
var _5b7=_5b2!=null?_5b2:_5af;
_5b7(_5b6);
}
},welcome:function(_5be,_5bf,_5c0){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.WELCOME,authKey:_5be,subscribeTo:_5bf,appName:_5c0});
}
return lRes;
},authenticate:function(_5c2,_5c3){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.AUTHENTICATE,username:_5c2,password:_5c3,appName:this.options.appName});
}
return lRes;
},subscribe:function(_5c5,_5c6,_5c7){
var lRes=this.isConnected();
if(lRes==true){
var _5c9={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SUBSCRIBE,channel:_5c5,appName:this.options.appName};
if(_5c6!=null&&(typeof _5c6=="object")){
_5c9.customOptions=_5c6;
}
this.sendToken(_5c9);
if(_5c7){
this.channelSpecificResHandlers[_5c5]=_5c7;
this.channelName_subscriptionInProcess=_5c5;
}
}
return lRes;
},unsubscribe:function(_5ca){
var lRes=this.isConnected();
if(lRes==true){
var _5cc={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.UNSUBSCRIBE,channel:_5ca,appName:this.options.appName};
this.sendToken(_5cc);
delete this.channelSpecificResHandlers[_5ca];
}
return lRes;
},publish:function(_5cd,_5ce,_5cf){
var lRes=this.isConnected();
if(lRes==true){
var _5d1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.PUBLISH,channel:_5cd,data:_5ce,appName:this.options.appName};
if(_5cf!=null&&(typeof _5cf=="object")){
_5d1.customOptions=_5cf;
}
this.sendToken(_5d1);
}
return lRes;
},invokeAndPublish:function(_5d2,_5d3,_5d4,_5d5,_5d6){
var lRes=this.isConnected();
if(lRes==true){
var _5d8={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_PUBLISH,channel:_5d2,cfcName:_5d3,cfcMethod:_5d4,methodArguments:_5d5,appName:this.options.appName,referrer:this.options.referrer};
if(_5d6!=null&&(typeof _5d6=="object")){
_5d8.customOptions=_5d6;
}
this.sendToken(_5d8);
}
return lRes;
},getSubscriberCount:function(_5d9,_5da){
var lRes=this.isConnected();
if(lRes==true){
var _5dc={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIBER_COUNT,channel:_5d9,appName:this.options.appName};
this.sendToken(_5dc);
}
if(_5da){
if(!this.subscribercount_callbackHandlers){
this.subscribercount_callbackHandlers={};
}
this.subscribercount_callbackHandlers[_5d9]=_5da;
}
return lRes;
},getSubscriptions:function(_5dd){
var lRes=this.isConnected();
if(lRes==true){
var _5df={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIPTIONS,appName:this.options.appName};
this.sendToken(_5df);
}
if(_5dd){
this.subscriptions_callbackHandler=_5dd;
}
return lRes;
},sendMessage:function(_5e0,_5e1,_5e2){
var lRes=this.isConnected();
if(lRes==true){
var _5e4={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SEND_MESSAGE,targetId:_5e0,data:_5e1,appName:this.options.appName};
if(_5e2!=null&&(typeof _5e2=="object")){
_5e4.customOptions=_5e2;
}
this.sendToken(_5e4);
}
return lRes;
},invokeAndSend:function(_5e5,_5e6,_5e7,_5e8,_5e9){
var lRes=this.isConnected();
if(lRes==true){
var _5eb={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_MESSAGE,target:_5e5,cfcName:_5e6,cfcMethod:_5e7,methodArguments:_5e8,appName:this.options.appName};
if(_5e9!=null&&(typeof _5e9=="object")){
_5eb.customOptions=_5e9;
}
this.sendToken(_5eb);
}
return lRes;
},invoke:function(_5ec,_5ed,_5ee,_5ef){
var lRes=this.isConnected();
if(lRes==true){
var _5f1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE,cfcName:_5ec,cfcMethod:_5ed,methodArguments:_5ee,appName:this.options.appName,referrer:this.options.referrer};
if(_5ef!=null&&(typeof _5ef=="object")){
_5f1.customOptions=_5ef;
}
this.sendToken(_5f1);
}
return lRes;
},openConnection:function(){
var lURL=lWSC.options.url;
this.open(lURL,this.options);
},isConnectionOpen:function(){
var _5f3=this.isConnected();
return _5f3;
},closeConnection:function(){
this.close({fireClose:true});
},cfonOpencallBk:function(_5f4){
if(this.cfauth!=null||this.susbcribeTo!=null){
_5f4.welcome(this.cfauth,this.subscribeTo,this.appName);
}
if(_5f4.appOnOpenHandler){
_5f4.appOnOpenHandler(_5f4);
}
},cfMessageHandlerCallBk:function(_5f5,_5f6){
var _5f7=_5f6.defaultMessageHandler;
if((_5f5.type=="event")&&(_5f5.name=="connect"||_5f5.name=="disconnect")){
return;
}
if((_5f5.reqType=="subscribe")&&_5f6.channelName_subscriptionInProcess!=null){
if(_5f5.code==-1){
delete _5f6.channelSpecificResHandlers[_5f6.channelName_subscriptionInProcess];
}
delete _5f6.channelName_subscriptionInProcess;
}
if((_5f5.reqType=="getSubscriberCount")&&_5f6.subscribercount_callbackHandlers[_5f5.channel]!=null){
_5f6.subscribercount_callbackHandlers[_5f5.channel].call(this,_5f5);
delete _5f6.subscribercount_callbackHandlers[_5f5.channelname];
return;
}
if((_5f5.reqType=="getSubscriptions")&&_5f6.subscriptions_callbackHandler!=null){
_5f6.subscriptions_callbackHandler(_5f5);
delete _5f6.subscriptions_callbackHandler;
return;
}
if(_5f5.type=="data"&&_5f5.channelname){
var _5f8=_5f5.channelname;
var _5f9=_5f6.channelSpecificResHandlers[_5f8];
while(_5f9==null){
var lPos=_5f8.lastIndexOf(".");
if(lPos>0){
_5f8=_5f8.substr(0,lPos);
_5f9=_5f6.channelSpecificResHandlers[_5f8];
}else{
break;
}
}
if(_5f9){
_5f7=_5f9;
}
}
_5f7.call(this,_5f5);
}};
function cfwebsocketinit(){
var _5fb=ColdFusion.WebSocket;
ns=cf_ws;
for(var _5fc in _5fb){
ns["CFWebSocketWrapper"].prototype[_5fc]=_5fb[_5fc];
}
}
cfwebsocketinit();

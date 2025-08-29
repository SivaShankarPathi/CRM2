/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Tooltip){
ColdFusion.Tooltip={};
}
ColdFusion.Tooltip.setToolTipOut=function(_791,_792){
var _793=_792.tooltip;
_793.tooltipout=true;
};
ColdFusion.Tooltip.getToolTip=function(_794,_795){
var _796=ColdFusion.objectCache[_795.context];
if(!_796){
if(_795.style){
_795.styleObj=ColdFusion.Tooltip.parseStyle(_795.style);
}
_796=new YAHOO.widget.Tooltip(_795.context+"_cf_tooltip",_795);
ColdFusion.objectCache[_795.context]=_796;
_796.doShow(_794,_795.context);
if(_795._cf_url){
var _797=function(req,_799){
_799.tooltip.cfg.setProperty("text",req.responseText);
if(_799.tooltip.tooltipout==false){
_799.tooltip.doShow(_799.event,_799.id);
}
};
YAHOO.util.Event.addListener(_795.context,"mouseout",ColdFusion.Tooltip.setToolTipOut,{"tooltip":_796});
_796.cfg.setProperty("text",_cf_loadingtexthtml);
_796.doShow(_794,_795.context);
try{
ColdFusion.Log.info("tooltip.gettooltip.fetch","widget",[_795.context]);
ColdFusion.Ajax.sendMessage(_795._cf_url,"GET",_795._cf_query,true,_797,{tooltip:_796,event:_794,id:_795.context});
}
catch(e){
tooltipdiv=ColdFusion.DOM.getElement(_795.context);
tooltipdiv.innerHTML="";
ColdFusion.globalErrorHandler(null,e,tooltipdiv);
}
}
}
_796.tooltipout=false;
};
ColdFusion.Tooltip.parseStyle=function(_79a){
var _79b={};
if(_79a&&typeof _79a==="string"){
var _79c=_79a.split(";");
for(var i=0;i<_79c.length;i++){
var temp=_79c[i];
tempArray=temp.split(":");
if(tempArray.length===2){
var key=tempArray[0];
key=key.toLowerCase();
var _7a0=tempArray[1];
switch(key){
case "width":
_79b.width=_7a0;
break;
case "color":
_79b.color=_7a0;
break;
case "background-color":
_79b[key]=_7a0;
break;
case "padding":
_79b.padding=_7a0;
break;
default:
_79b[key]=_7a0;
}
}
}
}
return _79b;
};

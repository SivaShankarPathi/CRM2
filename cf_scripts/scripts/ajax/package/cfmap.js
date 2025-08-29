/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Map){
ColdFusion.Map={};
}
var coldFusion_markerObjCache=new Array();
var $MAP=ColdFusion.Map;
$MAP.statusCodeObject={code200:"A directions request could not be successfully parsed. For example, the request may have been rejected if it contained more than the maximum number of waypoints allowed.",code400:"A directions request could not be successfully parsed. For example, the request may have been rejected if it contained more than the maximum number of waypoints allowed.",code500:"A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known",code601:"The HTTP query parameter was either missing or had no value. For geocoding requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input",code602:"No corresponding geographic location could be found for the specified address. This may be due to the fact that the address is relatively new, or it may be incorrect",code603:"The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons",code604:"The GDirections object could not compute directions between the points mentioned in the query. This is usually because there is no route available between the two points, or because we do not have data for routing in that region",code610:"This request was invalid.",code620:"The webpage has gone over the requests limit in too short a period of time."};
ColdFusion.Map._init=function(_5fd,_5fe,_5ff,type,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a,_60b,_60c,_60d,_60e,_60f,_610,_611,_612,_613,_614,_615,_616,_617,_618,_619,_61a,_61b){
var _61c=null;
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(_61d){
if(_61b<1){
_610=_61d.coords.latitude;
_611=_61d.coords.longitude;
_60f=null;
}
if(_61b!==0){
if(_61b<0){
_61b=_61b*-1;
}
_615[_61b-1].latitude=_61d.coords.latitude;
_615[_61b-1].longitude=_61d.coords.longitude;
}
_61c=ColdFusion.Map.init(_5fd,_5fe,_5ff,type,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a,_60b,_60c,_60d,_60e,_60f,_610,_611,_612,_613,_614,_615,_616,_617,_618,_619,_61a);
},function(_61e){
_61c=ColdFusion.Map.init(_5fd,_5fe,_5ff,type,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a,_60b,_60c,_60d,_60e,_60f,_610,_611,_612,_613,_614,_615,_616,_617,_618,_619,_61a);
});
}else{
_61c=ColdFusion.Map.init(_5fd,_5fe,_5ff,type,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a,_60b,_60c,_60d,_60e,_60f,_610,_611,_612,_613,_614,_615,_616,_617,_618,_619,_61a);
}
return _61c;
};
ColdFusion.Map.init=function(_61f,_620,_621,type,_623,_624,_625,_626,_627,_628,_629,_62a,_62b,_62c,_62d,_62e,_62f,_630,_631,_632,_633,_634,_635,_636,_637,_638,_639,_63a,_63b,_63c){
var _63d={divName:_61f,type:type,layout:"fit",renderTo:_61f,centerAddress:_631,centerLatitude:_632,centerLongitude:_633,markerItems:_637,onLoad:_638,onError:_639,showCenterMarker:_62c,showAllMarker:_62d,markerColor:_635,markerIcon:_636,markerBindListener:_63b,initShow:_626};
if(_621!=null&&typeof (_621)!="undefined"){
_63d.width=_621;
}else{
_63d.width=400;
}
if(_620!=null&&typeof (_620)!="undefined"){
_63d.height=_620;
}else{
_63d.height=400;
}
if(_623!=null&&typeof (_623)!="undefined"){
_63d.zoomLevel=_623;
}else{
_63d.zoomLevel=3;
}
_63d.hideBorders=_625;
if(!_625){
if(_624==null||typeof _624==="undefined"||_624.length==0){
_624=" ";
}
_63d.title=_624;
_63d.collapsible=_627;
}
if(_635==null&&_636==null){
_63d.markerColor="#00FF00";
}
var _63e=new Ext.Panel(_63d);
ColdFusion.objectCache[_61f]=_63d;
_63d.mapPanel=_63e;
var _63f=["enableDragging"];
var swz=false;
if(_628){
swz=true;
}
if(_629){
_63f.push("enableDoubleClickZoom");
}else{
_63f.push("disableDoubleClickZoom");
}
if(_62a){
_63f.push("enableContinuousZoom");
}else{
_63f.push("disableContinuousZoom");
}
var _641=["NonExistantControl"];
if(_62b){
_641.push("scaleControl");
}
var mtc=false;
var mtco="";
if(_62f&&_62f.toUpperCase()=="BASIC"){
mtc=true;
mtco="google.maps.MapTypeControlStyle.HORIZONTAL_BAR";
}else{
if(_62f&&_62f.toUpperCase()=="ADVANCED"){
mtc="true";
mtco=google.maps.MapTypeControlStyle.DROPDOWN_MENU;
}
}
if(_62e){
_641.push("overviewMapControl");
}
var zc=false;
var zco="";
if(_630!=null&&_630!="undefined"){
_630=_630.toUpperCase();
switch(_630){
case "SMALL":
zco=google.maps.ZoomControlStyle.SMALL;
zc=true;
break;
case "SMALL3D":
zco=google.maps.ZoomControlStyle.SMALL;
zc=true;
break;
case "LARGE":
zco=google.maps.ZoomControlStyle.LARGE;
zc=true;
break;
case "LARGE3D":
zco=google.maps.ZoomControlStyle.LARGE;
zc=true;
break;
}
}
var _646=[];
for(i=0;i<_63d.markerItems.length;i++){
var _647=$MAP.parseMarker(_63d.markerItems[i],_61f);
_646.push(_647);
}
if(_634==null||typeof _634==="undefined"){
_634="";
}
var _648={marker:{title:_634,iscenter:true}};
if(_63d.markerColor!=null&&typeof _63d.markerColor!="undefined"){
_648.marker.markercolor=_63d.markerColor;
}else{
if(_63d.markerIcon!=null&&typeof _63d.markerIcon!="undefined"){
_648.marker.markericon=_63d.markerIcon;
}
}
if(_63a===true){
_648.listeners={click:$MAP.markerOnClickHandler};
if(_63c!=null){
_648.marker.markerwindowcontent=_63c;
}else{
_648.marker.bindcallback=_63b;
}
_648.marker.name=_61f;
}
if(_63d.centerAddress!=null&&typeof _63d.centerAddress==="string"){
_648.geoCodeAddr=_63d.centerAddress;
_648.marker.address=_63d.centerAddress;
}else{
_648.lat=_63d.centerLatitude;
_648.lng=_63d.centerLongitude;
_648.marker.address=_63d.centerAddress;
}
var _649=false;
if(_62f!=null&&typeof _62f=="string"&&_62f.toUpperCase()=="ADVANCED"){
_649=true;
}
var _64a=new Ext.ux.GMapPanel({xtype:"gmappanel",region:"center",zoomLevel:_63d.zoomLevel,gmapType:_63d.type,mapConfOpts:_63f,mapControls:_641,setCenter:_648,markers:_646,border:!_63d.hideBorders,onLoadhandler:$MAP.onLoadCompleteHandler,onErrorhandler:_639,name:_63d.divName,noCenterMarker:!_62c,showAllMarker:_62d,advanceMapTypeControl:_649,initShow:_626,zc:zc,zco:zco,mtc:mtc,mtco:mtco,swz:swz});
_63e.add(_64a);
_63d.mapPanelObject=_64a;
if(_626===false){
_63e.hide();
}else{
_63e.updateLayout();
}
ColdFusion.Log.info("map.initialized","widget",[_61f]);
return _63e;
};
$MAP.addMarker=function(name,_64c){
var _64d=$MAP.getMapPanelObject(name);
var _64e=$MAP.parseMarker(_64c,name);
var _64f=[];
_64f.push(_64e);
_64d.addMarkers(_64f);
ColdFusion.Log.info("map.addmarker.markeradded","widget",[name,_64f.length]);
};
$MAP.setCenter=function(name,_651){
var _652=$MAP.getMapPanelObject(name);
var lat;
var lng;
if(_651.latitude&&_651.longitude){
if(typeof _651.latitude!="number"||typeof _651.longitude!="number"){
ColdFusion.handleError(null,"map.setcenter.latlngnonnumeric","widget",[name,_651.latitude,_651.longitude],null,null,true);
}else{
lat=_651.latitude;
lng=_651.longitude;
}
var _655=new google.maps.LatLng(lat,lng);
_652.getMap().setCenter(_655,_652.zoomLevel);
var _656={};
_656.markercolor="#00FF00";
_652.addMarker(new google.maps.LatLng(_651.latitude,_651.longitude),_656,null,true);
}else{
if(_651.address){
if(typeof _651.address!="string"){
ColdFusion.handleError(null,"map.setcenter.addressnotstring","widget",[name,_651.address],null,null,true);
}else{
_652.geoCodeLookup(_651.address,null,null,true);
}
}else{
ColdFusion.handleError(null,"map.setcenter.invalidcenter","widget",[name],null,null,true);
}
}
ColdFusion.Log.info("map.setcenter.centerset","widget",[name]);
};
$MAP.getLatitudeLongitude=function(_657,_658){
geocoder=new google.maps.Geocoder();
if(_658==null||!typeof _658==="function"){
_658=$MAP.LatitudeLongitudeHandler;
}
geocoder.geocode({"address":_657},_658);
};
$MAP.addEvent=function(name,_65a,_65b,_65c){
if(_65a=="singlerightclick"){
_65a="rightclick";
}
if(_65a=="maptypechanged"){
_65a="maptypeid_changed";
}
var _65d=$MAP.getMapPanelObject(name);
_65d.addEventToMap(_65a,_65b,_65c);
};
$MAP.setZoomLevel=function(name,_65f){
var _660=$MAP.getMapPanelObject(name);
_660.zoomLevel=_65f;
_660.getMap().setZoom(_65f);
};
$MAP.getMapObject=function(name){
var _662=$MAP.getMapPanelObject(name);
if(_662!=null){
return _662.getMap();
}
};
$MAP.parseMarker=function(_663,_664){
var _665={};
if(_663.latitude&&_663.longitude){
if(typeof _663.latitude!="number"||typeof _663.longitude!="number"){
ColdFusion.handleError(null,"map.marker.latlngnonnumeric","widget",[_663.latitude,_663.longitude],null,null,true);
}else{
_665.lat=_663.latitude;
_665.lng=_663.longitude;
}
}else{
if(_663.address!=null){
if(typeof _663.address!="string"){
ColdFusion.handleError(null,"map.marker.addressnotstring","widget",[_663.address],null,null,true);
}else{
_665.address=_663.address;
}
}
}
var _666={};
if(_663.tip==null){
_666.title="";
}else{
_666.title=_663.tip;
}
if(_663.markercolor!=null&&typeof _663.markercolor!="undefined"){
_666.markercolor=_663.markercolor;
}else{
if(_663.markericon!=null&&typeof _663.markericon!="undefined"){
_666.markericon=_663.markericon;
}
}
if(_663.showmarkerwindow===true||_663.markerwindowcontent!=null){
var _667=ColdFusion.objectCache[_664];
var _668;
if(_667!=null||typeof (_667)!="undefined"){
_668=_667.markerBindListener;
}
if(_668!=null||_663.markerwindowcontent!=null){
_665.listeners={click:$MAP.markerOnClickHandler};
if(_663.markerwindowcontent!=null){
_666.markerwindowcontent=_663.markerwindowcontent;
}else{
_666.bindcallback=_668;
}
_666.name=_663.name;
}
}
_665.marker=_666;
return _665;
};
$MAP.onErrorHandler=function(name,_66a){
var _66b=ColdFusion.objectCache[name];
var _66c=$MAP.statusCodeObject;
var _66d=$MAP.retrieveStatueMessage(_66a);
var _66e=_66b.onError;
if(_66e!=null&&typeof _66e==="function"){
_66e.call(null,_66a,_66d);
}else{
alert("Error: "+_66d);
}
ColdFusion.handleError(null,"map.loadMap.error","map",[name,_66a,_66d],null,null,true);
};
$MAP.onLoadCompleteHandler=function(name){
var _670=ColdFusion.objectCache[name];
var _671=_670.onLoad;
if(_671!=null&&typeof _671==="function"){
_671.call();
}
};
$MAP.retrieveStatueMessage=function(code){
var _673;
switch(code){
case "ZERO_RESULTS":
_673=$MAP.statusCodeObject.code602;
break;
case "OVER_QUERY_LIMIT":
_673=$MAP.statusCodeObject.code620;
break;
case "REQUEST_DENIED":
_673=$MAP.statusCodeObject.code610;
break;
case "INVALID_REQUEST":
_673=$MAP.statusCodeObject.code610;
break;
}
return _673;
};
var currentopenwindow="";
$MAP.markerOnClickHandler=function(_674){
coldFusion_markerObjCache[this.name]=this.scope.marker;
if(this.bindcallback!=null&&typeof this.bindcallback=="function"){
var _675=this.address;
if(_675==null||typeof _675=="undefined"){
_675="";
}
this.bindcallback.call(null,this.name,_674.latLng.lat(),_674.latLng.lng(),_675);
}else{
if(this.scope.statictext!=null&&typeof this.scope.statictext!="undefined"){
var me=this,infoWindow=new google.maps.InfoWindow({content:this.scope.statictext,position:this.scope.marker.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(this.scope.marker.map);
currentopenwindow=infoWindow;
}
}
};
ColdFusion.Map.loadMarkerWindowInfo=function(data,_678){
var _679=coldFusion_markerObjCache[_678._cf_marker_name];
var me=this,infoWindow=new google.maps.InfoWindow({content:data,position:_679.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(_679.map);
currentopenwindow=infoWindow;
};
ColdFusion.Map.bindOnErrorHandler=function(data,_67c){
ColdFusion.handleError(null,"map.markerbind.binderror","widget",[data],null,null,true);
};
$MAP.getMapPanelObject=function(name){
var _67e=ColdFusion.objectCache[name];
if(_67e==null||typeof (_67e)=="undefined"){
ColdFusion.handleError(null,"map.getmappanelobject.notfound","widget",[name],null,null,true);
}
return _67e.mapPanelObject;
};
$MAP.refresh=function(name){
var _680=ColdFusion.objectCache[name];
if(_680==null||typeof (_680)=="undefined"){
ColdFusion.handleError(null,"map.refresh.notfound","widget",[name],null,null,true);
}
_680.mapPanel.updateLayout();
};
$MAP.hide=function(name){
var _682=ColdFusion.objectCache[name];
if(_682==null||typeof (_682)=="undefined"){
ColdFusion.handleError(null,"map.hide.notfound","widget",[name],null,null,true);
}
_682.mapPanel.hide();
};
$MAP.show=function(name){
var _684=ColdFusion.objectCache[name];
if(_684==null||typeof (_684)=="undefined"){
ColdFusion.handleError(null,"map.show.notfound","widget",[name],null,null,true);
}
_684.mapPanel.show();
_684.mapPanel.updateLayout();
};

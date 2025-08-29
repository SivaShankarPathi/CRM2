/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.RichText||(ColdFusion.RichText={});
ColdFusion.RichText.editorState={};
ColdFusion.RichText.buffer=null;
ColdFusion.RichText.registerAfterSet=function(_2fd){
if(ColdFusion.RichText.editorState[_2fd]){
var _2fe=function(){
ColdFusion.RichText.fireChangeEvent(_2fd);
};
var _2ff=CKEDITOR.instances[_2fd];
_2ff.on("OnAfterSetHTML",_2fe);
}else{
setTimeout(function(){
ColdFusion.RichText.registerAfterSet(_2fd);
},1000);
}
};
ColdFusion.RichText.getEditorObject=function(_300){
if(!_300){
ColdFusion.handleError(null,"richtext.geteditorobject.missingtextareaname","widget",null,null,null,true);
return;
}
var _301=ColdFusion.objectCache[_300];
if(_301==null||CKEDITOR.editor.prototype.isPrototypeOf(_301)==false){
ColdFusion.handleError(null,"richtext.geteditorobject.notfound","widget",[_300],null,null,true);
return;
}
return CKEDITOR.instances[_301.richtextid];
};
ColdFusion.RichText.setValue=function(_302,_303){
if(ColdFusion.RichText.editorState[_302]){
var _304=CKEDITOR.instances[_302];
_304.setData(_303);
_304.fire("onAfterSetHTML");
}else{
setTimeout(function(){
ColdFusion.RichText.setValue(_302,_303);
},1000);
}
};
ColdFusion.RichText.getValue=function(_305){
if(ColdFusion.RichText.editorState[_305]){
return CKEDITOR.instances[_305].getData();
}else{
ColdFusion.Log.error("richtext.initialize.getvalue.notready","widget",[_305]);
return null;
}
};
ColdFusion.RichText.fireChangeEvent=function(_306){
var _307=ColdFusion.objectCache[_306];
ColdFusion.Log.info("richtext.firechangeevent.firechange","widget",[_307._cf_name]);
var _308=document.getElementById(_306);
if(_308){
if(_308.fireEvent){
_308.fireEvent("onchange");
}
if(document.createEvent){
var evt=document.createEvent("HTMLEvents");
if(evt.initEvent){
evt.initEvent("change",true,true);
}
if(_308.dispatchEvent){
_308.dispatchEvent(evt);
}
}
}
ColdFusion.Event.callBindHandlers(_306,null,"change");
};
ColdFusion.RichText.editor_onfocus=function(e){
document.getElementById(e.editor.id+"_top").style.display="block";
};
ColdFusion.RichText.editor_onblur=function(e){
document.getElementById(e.editor.id+"_top").style.display="none";
};
ColdFusion.RichText.setChangeBuffer=function(e){
ColdFusion.RichText.buffer=CKEDITOR.instances[e.editor.name].getData();
};
ColdFusion.RichText.resetChangeBuffer=function(e){
if(ColdFusion.RichText.buffer!=CKEDITOR.instances[e.editor.name].getData()){
ColdFusion.RichText.fireChangeEvent(e.editor.name);
}
ColdFusion.RichText.buffer=null;
};
var parameters={};
CKEDITOR.on("instanceCreated",function(e){
var _30f=e.editor.name;
if(parameters[_30f].Id){
ColdFusion.RichText.editorState[parameters[_30f].Id]=false;
e.editor.richtextid=parameters[_30f].Id;
ColdFusion.objectCache[parameters[_30f].Id]=e.editor;
}
if(parameters[_30f].Name){
e.editor._cf_name=parameters[_30f].Name;
ColdFusion.objectCache[parameters[_30f].Name]=e.editor;
}
if(parameters[_30f].Val){
e.editor.Value=parameters[_30f].Val;
}
e.editor._cf_setValue=function(_310){
ColdFusion.RichText.setValue(_30f,_310);
};
e.editor._cf_getAttribute=function(){
return ColdFusion.RichText.getValue(_30f);
};
e.editor._cf_register=function(_311,_312,_313){
var _314=document.getElementById(_30f);
if(_314){
ColdFusion.Event.addListener(_314,_311,_312,_313);
}
};
});
ColdFusion.RichText.initialize=function(Id,Name,Val,_318,_319,_31a,_31b,_31c,_31d,Skin,_31f,_320,_321,_322,_323){
parameters[Id]={};
parameters[Id].Id=Id;
parameters[Id].Name=Name;
parameters[Id].Val=Val;
var _324=function(evt){
if(_31f==true){
evt.editor.on("focus",ColdFusion.RichText.editor_onfocus);
evt.editor.on("blur",ColdFusion.RichText.editor_onblur);
document.getElementById(evt.editor.id+"_top").style.display="none";
}
evt.editor.on("focus",ColdFusion.RichText.setChangeBuffer);
evt.editor.on("blur",ColdFusion.RichText.resetChangeBuffer);
ColdFusion.RichText.editorState[evt.editor.name]=true;
if(ColdFusion.RichText.OnComplete){
ColdFusion.RichText.OnComplete(evt.editor);
}
};
var _326={on:{"instanceReady":_324}};
_326["toolbar"]="Default";
if(_31a!=null){
_326["height"]=_31a;
}
if(_319!=null){
_326["width"]=_319;
}
if(_31b!=null){
_326["font_names"]=_31b;
}
if(_31c!=null){
_326["fontSize_sizes"]=_31c;
}
if(_31d!=null){
_326["format_tags"]=_31d;
}
if(Skin!=null){
_326["skin"]=Skin;
}
if(_31f==true){
_326["toolbarCanCollapse"]=false;
}
if(_320!=null){
_326["toolbar"]=_320;
}
var _327=CKEDITOR.replace(Id,_326);
};

/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
cfinitgrid=function(){
Ext.override(Ext.form.field.Number,{decimalPrecision:6});
if(!ColdFusion.Grid){
ColdFusion.Grid={};
}
var $G=ColdFusion.Grid;
if(!$G.GridBindelementsMap){
$G.GridBindelementsMap={};
}
var $L=ColdFusion.Log;
$G.init=function(id,name,_426,_427,edit,_429,_42a,_42b,_42c,_42d,_42e,_42f,_430,_431,_432,_433,_434,_435,_436,_437,_438,_439,_43a,_43b,_43c,_43d,_43e,_43f,_440,_441,_442){
var grid;
var _444;
var _445=false;
if(_435&&typeof (_435)!="undefined"){
_444=_435;
_445=true;
}else{
_444="rowmodel";
_444=new Ext.selection.RowModel({mode:"SINGLE"});
}
var _446=_42c;
var _447={store:_42d,columns:_42c,selModel:_444,autoSizeColumns:_42a,autoSizeHeaders:_42a,stripeRows:_430,autoExpandColumnId:_42b};
if(_43f!=null&&typeof _43f!="undefined"){
_447.plugins=_43f;
}
var _448=ColdFusion.objectCache[id];
var _449=document.getElementById(_448.gridId);
if(_449!=null){
var _44a=_449.style.cssText;
if(typeof _44a=="undefined"){
_44a="";
}
_44a="width:"+_42e+"px;"+_44a;
_449.style.cssText=_44a;
}
_447.width=_42e;
if(_42a===true){
_447.viewConfig={forceFit:true};
_447.forceFit=true;
}else{
if(_435&&typeof (_435)!="undefined"){
_447.autoExpandColumn=_42b;
}else{
_447.autoExpandColumn=_42b;
}
}
if(_42f){
_447.height=_42f;
}else{
_447.autoHeight=true;
var _44b=".x-grid3-header {position: relative;}";
Ext.util.CSS.createStyleSheet(_44b,"_cf_grid"+id);
}
if(_437&&typeof (_437)!="undefined"){
_447.features={ftype:"grouping",groupHeaderTpl:"{columnName}: {groupValue} ({rows.length} items)"};
}
_447.title=_438;
_447.collapsible=_436;
if(_436&&_438==null){
_447.title="  ";
}
var _44c=ColdFusion.objectCache[id];
_44c.bindOnLoad=_429;
_44c.dynamic=_427;
_44c.styles=_431;
_44c.grouping=_437;
_44c.onLoadFunction=_43e;
_44c.multiRowSelection=_445;
_447.renderTo=_44c.gridId;
Ext.onReady(function(){
_447.dockedItems={xtype:"toolbar",dock:"top"};
_447.tbar=new Ext.Toolbar({hidden:true});
if(_427){
_447.bbar=new Ext.PagingToolbar({pageSize:_432,store:_42d});
if(_43c&&(_439||_43a)){
var _44d=_447.bbar;
if(_439){
_44d.add({xtype:"button",text:_439,handler:$G.insertRow,scope:_44c});
_44d.add({xtype:"button",text:" save ",handler:$G.saveNewRecord,scope:_44c});
_44d.add({xtype:"button",text:" cancel ",handler:$G.cancelNewRecord,scope:_44c});
}
if(_43a){
_44d.add({xtype:"button",text:_43a,handler:$G.deleteRow,scope:_44c});
}
}
}
if(edit&&!_427){
var bbar=new Ext.Toolbar();
if(_439||_43a){
if(_439){
bbar.add({xtype:"button",text:_439,handler:$G.insertRow,scope:_44c});
}
if(_43a){
bbar.add({xtype:"button",text:_43a,handler:$G.deleteRow,scope:_44c});
}
}else{
var bbar=new Ext.Toolbar({hidden:true});
}
_447.bbar=bbar;
}
_42d.pageSize=_432;
$G.addStripeRowColor(_447,_430,_442);
var fn=function(){
grid=Ext.create("Ext.grid.Panel",_447);
$G.Ext_caseInsensitive_sorting();
_42d.addListener("load",$G.Actions.onLoad,_44c,{delay:50});
grid.view.addListener("beforeshow",function(menu){
var _451=_446.getColumnCount();
for(var i=0;i<_451;i++){
if("CFGRIDROWINDEX"==_446.getDataIndex(i)){
menu.remove(menu.items["items"][i]);
break;
}
}
},this);
_44c.grid=grid;
if(!_427){
_42d.addListener("load",$G.Actions.onLoad,_44c,{delay:50});
_42d.load();
}
if(_427){
_42d._cf_errorHandler=_43d;
_42d.proxy._cf_actions=_44c;
if(_44c.bindOnLoad){
_42d.load({params:{start:0,limit:_432}});
}else{
_44c.bindOnLoad=true;
}
}else{
$G.applyStyles(_44c);
}
if(_440){
ColdFusion.Bind.register(_440,{actions:_44c},$G.bindHandler,false);
}
$L.info("grid.init.created","widget",[id]);
_44c.init(id,name,_426,_43b,_427,edit,_43c,_43d,_434,_432,_433,_437);
};
if(_427&&_441){
setTimeout(fn,0);
}else{
fn();
}
});
};
$G.addStripeRowColor=function(_453,_454,_455){
if(_454){
_453.viewConfig={listeners:{refresh:function(view){
var _457=view.getNodes();
for(var i=0;i<_457.length;i++){
if(i%2==0){
continue;
}
var node=_457[i];
var _45a=view.getRecord(node);
var _45b=_455;
var _45c=Ext.get(node).query("td");
for(var j=0;j<_45c.length;j++){
Ext.fly(_45c[j]).setStyle("background-color",_45b);
}
}
}}};
}
};
$G.applyStyles=function(_45e){
Ext.util.CSS.createStyleSheet(_45e.styles);
_45e.stylesApplied=true;
};
$G.bindHandler=function(e,_460){
$G.refresh(_460.actions.id,_460.actions.preservePageOnSort);
};
$G.bindHandler._cf_bindhandler=true;
$G.refresh=function(_461,_462){
var _463=ColdFusion.objectCache[_461];
if(_463&&$G.Actions.prototype.isPrototypeOf(_463)==true){
var _464=_463.grid.getStore();
if(_463.dynamic){
_463.editOldValue=null;
_463.selectedRow=-1;
var bind=$G.GridBindelementsMap[_461];
if(bind){
var url=_464.proxy.url;
var _467=bind.split(";");
for(i=0;i<_467.length;i++){
var _468=_467[i].split(",");
indx=url.indexOf("&"+_468[0]+"=");
var _469=0;
if(indx<1){
indx=url.indexOf(_468[0]+"=");
_469=indx;
}else{
_469=indx+1;
}
url1=url.substring(0,indx);
nxtindx=url.indexOf("&",_469);
url2=url.substring(nxtindx);
var val=_468[2];
var eval="";
if(_468[2]&&_468[2].endsWith("()")){
val=_468[2].substring(0,val.length-2);
eval=window[val]();
}else{
if(_468[2]){
eval=ColdFusion.Bind.getBindElementValue(_468[1],val,_468[3]);
}else{
eval=_468[1];
}
}
url=url1+"&"+_468[0]+"="+eval+url2;
}
_464.proxy.url=url;
}
if(_462){
_464.reload();
}else{
if(_464.lastOptions){
_464.lastOptions.page=1;
}
_464.currentPage=1;
_464.reload({params:{start:0,limit:_463.pageSize}});
}
}
}else{
ColdFusion.handleError(null,"grid.refresh.notfound","widget",[_461],null,null,true);
return;
}
if(_463.multiRowSelection){
}
$L.info("grid.refresh.success","widget",[_461]);
};
$G.Ext_caseInsensitive_sorting=function(){
Ext.data.Store.prototype.sortData=function(f,_46d){
_46d=_46d||"ASC";
var st=this.fields.get(f).sortType;
var fn=function(r1,r2){
var v1=st(r1.data[f]),v2=st(r2.data[f]);
if(v1.toLowerCase){
v1=v1.toLowerCase();
v2=v2.toLowerCase();
}
return v1>v2?1:(v1<v2?-1:0);
};
this.data.sort(_46d,fn);
if(this.snapshot&&this.snapshot!=this.data){
this.snapshot.sort(_46d,fn);
}
};
};
$G.getTopToolbar=function(_473){
var _474=ColdFusion.objectCache[_473];
if(!_474){
ColdFusion.handleError(null,"grid.getTopToolbar.notfound","widget",[_473],null,null,true);
return;
}
return _474.grid.getDockedItems()[1];
};
$G.showTopToolbar=function(_475){
var _476=ColdFusion.objectCache[_475];
if(!_476){
ColdFusion.handleError(null,"grid.showTopToolbar.notfound","widget",[_475],null,null,true);
return;
}
var tbar=_476.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.showTopToolbar.toolbarNotDefined","widget",[_475],null,null,true);
return;
}
tbar.show();
};
$G.hideTopToolbar=function(_478){
var _479=ColdFusion.objectCache[_478];
if(!_479){
ColdFusion.handleError(null,"grid.hideTopToolbar.notfound","widget",[_478],null,null,true);
return;
}
var tbar=_479.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideTopToolbar.toolbarNotDefined","widget",[_478],null,null,true);
return;
}
tbar.hide();
};
$G.refreshTopToolbar=function(_47b){
var _47c=ColdFusion.objectCache[_47b];
if(!_47c){
ColdFusion.handleError(null,"grid.refreshTopToolbar.notfound","widget",[_47b],null,null,true);
return;
}
var tbar=_47c.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshTopToolbar.toolbarNotDefined","widget",[_47b],null,null,true);
return;
}
if(tbar&&typeof tbar.doLayout==="function"){
tbar.doLayout();
}
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.getBottomToolbar=function(_47e){
var _47f=ColdFusion.objectCache[_47e];
if(!_47f){
ColdFusion.handleError(null,"grid.getBottomToolbar.notfound","widget",[_47e],null,null,true);
return;
}
return _47f.grid.getDockedItems()[_47f.grid.getDockedItems().length-1];
};
$G.showBottomToolbar=function(_480){
var _481=ColdFusion.objectCache[_480];
if(!_481){
ColdFusion.handleError(null,"grid.showBottomToolbar.notfound","widget",[_480],null,null,true);
return;
}
var tbar=_481.grid.getDockedItems()[_481.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.showBottomToolbar.toolbarNotDefined","widget",[_480],null,null,true);
return;
}
tbar.show();
};
$G.hideBottomToolbar=function(_483){
var _484=ColdFusion.objectCache[_483];
if(!_484){
ColdFusion.handleError(null,"grid.hideBottomToolbar.notfound","widget",[_483],null,null,true);
return;
}
var tbar=_484.grid.getDockedItems()[_484.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideBottomToolbar.toolbarNotDefined","widget",[_483],null,null,true);
return;
}
tbar.hide();
};
$G.refreshBottomToolbar=function(_486){
var _487=ColdFusion.objectCache[_486];
if(!_487){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.notfound","widget",[_486],null,null,true);
return;
}
var tbar=_487.grid.getDockedItems()[_487.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.toolbarNotDefined","widget",[_486],null,null,true);
return;
}
if(tbar&&typeof tbar.doLayout==="function"){
tbar.doLayout();
}
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.sort=function(_489,_48a,_48b){
var _48c=ColdFusion.objectCache[_489];
if(!_48c){
ColdFusion.handleError(null,"grid.sort.notfound","widget",[_489],null,null,true);
return;
}
_48a=_48a.toUpperCase();
var _48d=-1;
var _48e=_48c.grid.columns;
for(var i=0;i<_48e.length-1;i++){
if(_48a==_48e[i].colName){
_48d=i;
break;
}
}
if(_48d==-1){
ColdFusion.handleError(null,"grid.sort.colnotfound","widget",[_48a,_489],null,null,true);
return;
}
if(!_48b){
_48b="ASC";
}
_48b=_48b.toUpperCase();
if(_48b!="ASC"&&_48b!="DESC"){
ColdFusion.handleError(null,"grid.sort.invalidsortdir","widget",[_48b,_489],null,null,true);
return;
}
var _490=_48c.grid.getStore();
_490.sort(_48a,_48b);
};
$G.getGridObject=function(_491){
if(!_491){
ColdFusion.handleError(null,"grid.getgridobject.missinggridname","widget",null,null,null,true);
return;
}
var _492=ColdFusion.objectCache[_491];
if(_492==null||$G.Actions.prototype.isPrototypeOf(_492)==false){
ColdFusion.handleError(null,"grid.getgridobject.notfound","widget",[_491],null,null,true);
return;
}
return _492.grid;
};
$G.getSelectedRows=function(_493){
if(!_493){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _494=ColdFusion.objectCache[_493];
var _495=new Array();
var _496=_494.grid.getSelectionModel();
var _497=_496.selected;
var _498=_494.grid.columns;
var _499=0;
for(i=0;i<_497.length;i++){
var _49a=_497.items[i].data;
var _49b={};
for(var _49c=_499;_49c<_498.length-1;_49c++){
var key=_498[_49c].dataIndex;
_49b[key]=_49a[key];
}
_495[i]=_49b;
}
return _495;
};
$G.clearSelectedRows=function(_49e){
if(!_49e){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _49f=ColdFusion.objectCache[_49e];
var _4a0=_49f.grid.getSelectionModel();
_4a0.deselectAll();
if(_49f.multiRowSelection){
}
};
$G.Actions=function(_4a1){
this.gridId=_4a1;
this.init=$G.Actions.init;
this.onChangeHandler=$G.Actions.onChangeHandler;
this.onChangeHandler_MultiRowsDelete=$G.Actions.onChangeHandler_MultiRowsDelete;
this.selectionChangeEvent=new ColdFusion.Event.CustomEvent("cfGridSelectionChange",_4a1);
this.fireSelectionChangeEvent=$G.fireSelectionChangeEvent;
this._cf_getAttribute=$G.Actions._cf_getAttribute;
this._cf_register=$G.Actions._cf_register;
this.loaded=false;
};
$G.Actions.init=function(id,_4a3,_4a4,_4a5,_4a6,edit,_4a8,_4a9,_4aa,_4ab,_4ac,_4ad){
this.id=id;
this.gridName=_4a3;
this.formId=_4a4;
this.form=document.getElementById(_4a4);
this.cellClickInfo=_4a5;
this.edit=edit;
this.onChangeFunction=_4a8;
this.onErrorFunction=_4a9;
this.preservePageOnSort=_4aa;
this.pageSize=_4ab;
this.selectedRow=-1;
this.selectOnLoad=_4ac;
this.grouping=_4ad;
this.grid.addListener("cellclick",$G.cellClick,this,true);
this.editField=document.createElement("input");
this.editField.setAttribute("name",_4a3);
this.editField.setAttribute("type","hidden");
this.form.appendChild(this.editField);
if(edit){
if(!_4a6){
var _4ae=this.grid.columns;
this.editFieldPrefix="__CFGRID__EDIT__=";
var i=0;
var _4b0=_4ae.length-1;
if(this.multiRowSelection===true&&this.dynamic===false){
i++;
_4b0--;
}
this.editFieldPrefix+=_4b0+$G.Actions.fieldSep;
var _4b1=true;
for(i;i<_4ae.length-1;i++){
if(!_4b1){
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldPrefix+=_4ae[i].colName;
this.editFieldPrefix+=$G.Actions.valueSep;
if(_4ae[i].getEditor()){
this.editFieldPrefix+="Y";
}else{
this.editFieldPrefix+="N";
}
_4b1=false;
}
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldState=[];
this.editFieldState.length=this.grid.getStore().getTotalCount();
$G.Actions.computeEditField(this);
this.insertInProgress=false;
this.insertEvent=null;
this.grid.addListener("beforeedit",$G.Actions.beforeEdit,this);
this.grid.addListener("edit",$G.Actions.afterEdit,this,true);
}
if(_4a6){
this.grid.getStore().addListener("beforeload",$G.Actions.beforeLoad,this,true);
}
this.grid.getSelectionModel().addListener("select",$G.rowSelect,this,true);
this.grid.getSelectionModel().addListener("beforerowselect",$G.beforeRowSelect,this,true);
};
$G.Actions.beforeLoad=function(_4b2,_4b3){
var _4b4=_4b2.sortInfo;
var _4b5=(_4b3.sorters&&_4b3.sorters[0]&&_4b3.sorters[0].property!=this.sortCol);
if(_4b5&&!this.preservePageOnSort){
_4b3.start=0;
_4b3.page=1;
_4b2.currentPage=1;
}
if(_4b3.sorters&&_4b3.sorters[0]){
this.sortCol=_4b3.sorters[0].property;
this.sortDir=_4b3.sorters[0].direction;
}
};
$G.Actions.onLoad=function(_4b6){
this.editOldValue=null;
this.selectedRow=-1;
this.insertInProgress=false;
var _4b7=0;
if((this.bindOnLoad||!this.dynamic)&&this.selectOnLoad&&!this.grouping){
this.grid.getSelectionModel().select(_4b7,false);
}
if(!this.gridRendered&&this.onLoadFunction&&typeof this.onLoadFunction=="function"){
this.gridRendered=true;
this.onLoadFunction.call(null,this.grid);
}
$G.applyStyles(_4b6);
try{
var _4b8=Ext.ComponentQuery.query("tabpanel");
if(_4b8&&this.grid&&this.loaded==false){
for(var i=0;i<_4b8.length;i++){
if(_4b8[i].body.dom.innerHTML.indexOf(this.grid.id)>0){
_4b8[i].updateLayout();
this.loaded=true;
}
}
}
}
catch(exception){
}
};
$G.Actions._cf_getAttribute=function(_4ba){
_4ba=_4ba.toUpperCase();
var _4bb=this.selectedRow;
var _4bc=null;
if(_4bb!=0&&(!_4bb||_4bb==-1)){
return _4bc;
}
var ds=this.grid.getStore();
var _4be=(this.dynamic)?ds.getAt(_4bb):ds.getById(_4bb);
_4bc=_4be.get(_4ba);
return _4bc;
};
$G.Actions._cf_register=function(_4bf,_4c0,_4c1){
this.selectionChangeEvent.subscribe(_4c0,_4c1);
};
$G.rowSelect=function(_4c2,_4c3,row){
var _4c5="";
var _4c6=_4c2.selected.items;
if(_4c6.length==0){
return;
}
var _4c7=_4c6[0].get("CFGRIDROWINDEX")||row;
if(_4c7&&(_4c7+"").indexOf("cf_gridmodel")==0){
_4c7=row;
}
if(this.selectedRow!=_4c7){
this.selectedRow=_4c7;
var _4c8=true;
for(col in _4c6[0].data){
if(col=="CFGRIDROWINDEX"){
continue;
}
if(typeof col=="undefined"||col=="undefined"){
continue;
}
if(!_4c8){
_4c5+="; ";
}
_4c5+="__CFGRID__COLUMN__="+col+"; ";
_4c5+="__CFGRID__DATA__="+_4c6[0].data[col];
_4c8=false;
}
this.fireSelectionChangeEvent();
this.insertInProgress=false;
}
};
$G.beforeRowSelect=function(_4c9,row){
var ds=this.grid.getStore();
var _4cc=ds.getAt(row);
return !$G.isNullRow(_4cc.data);
};
$G.isNullRow=function(data){
var _4ce=true;
for(col in data){
if(data[col]!=null){
_4ce=false;
break;
}
}
return _4ce;
};
$G.fireSelectionChangeEvent=function(){
$L.info("grid.fireselectionchangeevent.fire","widget",[this.id]);
this.selectionChangeEvent.fire();
};
$G.cellClick=function(grid,td,_4d1,_4d2,tr,_4d4,e,_4d6){
var _4d7=this.cellClickInfo.colInfo[_4d1];
if(_4d7){
var _4d8=grid.getSelectionModel().selected;
var url;
if(_4d8.items.length>0&&_4d8.items[0].data){
url=_4d8.items[0].data[_4d7.href.toUpperCase()];
}
if(!url){
url=_4d7.href;
}
var _4da=_4d7.hrefKey;
var _4db=_4d7.target;
var _4dc=this.appendKey;
if(this.cellClickInfo.appendKey){
var _4dd;
if(_4da||_4da==0){
var _4de=grid.getStore().getAt(_4d4);
var _4df=grid.panel.columns[_4da].dataIndex;
_4dd=_4de.get(_4df);
}else{
var _4e0=this.grid.columns;
_4dd=_4d8.items[0].get(_4e0[0].dataIndex);
for(var i=1;i<_4e0.length-1;i++){
_4dd+=","+_4d8.items[0].get(_4e0[i].dataIndex);
}
}
if(url.indexOf("?")!=-1){
url+="&CFGRIDKEY="+_4dd;
}else{
url+="?CFGRIDKEY="+_4dd;
}
}
if(_4db){
_4db=_4db.toLowerCase();
if(_4db=="_top"){
_4db="top";
}else{
if(_4db=="_parent"){
_4db="parent";
}else{
if(_4db=="_self"){
_4db=window.name;
}else{
if(_4db=="_blank"){
window.open(encodeURI(url));
return;
}
}
}
}
if(!parent[_4db]){
ColdFusion.handleError(null,"grid.cellclick.targetnotfound","widget",[_4db]);
return;
}
parent[_4db].location=encodeURI(url);
}else{
window.location=encodeURI(url);
}
}
};
$G.insertRow=function(){
if(this.insertInProgress&&this.dynamic){
ColdFusion.handleError(null,"Multiple row insert is not supported","Grid",[this.gridId],null,null,true);
return;
}
var _4e2={action:"I",values:[]};
var _4e3=this.grid.columns;
var _4e4=this.grid.getStore();
var _4e5={};
var _4e6="{";
for(var i=0;i<_4e3.length-1;i++){
var _4e8="";
_4e2.values[i]=[_4e8,_4e8];
_4e5[_4e3[i].dataIndex]=_4e8;
_4e6=_4e6+"\""+_4e3[i].colName+"\":\""+_4e8+"\",";
}
_4e5["CFGRIDROWINDEX"]=_4e4.getCount()+1;
_4e6=_4e6+"\"CFGRIDROWINDEX\":\""+(_4e4.getCount()+1)+"\"}";
_4e4.add(JSON.parse(_4e6));
_4e4.getAt(_4e4.getCount()-1).data["CFGRIDROWINDEX"]=_4e4.getCount();
if(this.dynamic==true){
this.selectedRow=_4e4.getCount();
}
this.editFieldState.push(_4e2);
this.grid.getSelectionModel().select(_4e4.getCount()-1);
this.insertInProgress=true;
$G.Actions.computeEditField(this);
};
$G.saveNewRecord=function(){
if(!this.insertInProgress){
return;
}
var _4e9=this.selectedRow;
var _4ea=this.insertEvent;
if(_4e9==-1){
return;
}
if(this.onChangeFunction){
this.onChangeHandler("I",_4e9-1,_4ea,$G.insertRowCallback);
}else{
if(this.dynamic==false){
var _4eb=this.grid.getStore();
var _4ec=_4ea.record;
var _4ed=new Array(1);
_4ed[0]=_4ec;
var _4ee=_4eb.getAt(this.selectedRow-1);
_4eb.remove(_4ee);
_4eb.add(_4ed);
}
}
this.insertInProgress=false;
this.insertEvent=null;
};
$G.cancelNewRecord=function(){
if(!this.insertInProgress){
return;
}
this.editFieldState.pop();
var _4ef=this.grid.getStore();
var _4f0=_4ef.getAt(this.selectedRow-1);
_4ef.remove(_4f0);
this.insertInProgress=false;
this.insertEvent=null;
this.selectedRow=this.selectedrow-1;
};
$G.deleteRow=function(){
var _4f1=null;
var _4f2;
if(this.multiRowSelection===true){
var _4f3=this.grid.getSelectionModel();
_4f1=_4f3.selected;
}
_4f1=this.grid.getSelectionModel().getSelection();
if(_4f1!=null&&_4f1.length<2){
_4f1=null;
}
if(_4f1==null){
_4f2=this.selectedRow;
}
if(_4f2==-1&&_4f1==null){
return;
}
if(this.onChangeFunction){
if(_4f1!=null){
this.onChangeHandler_MultiRowsDelete("D",_4f1,null,$G.deleteRowCallback);
}else{
this.onChangeHandler("D",_4f2,null,$G.deleteRowCallback);
}
}else{
if(!this.dynamic){
var _4f4=this.grid.getStore();
if(_4f1!=null){
for(i=0;i<_4f1.length;i++){
var _4f5=_4f4.indexOf(_4f1[i]);
var _4f6=this.editFieldState[_4f5];
if(_4f6){
_4f6.action="D";
}else{
_4f6=$G.Actions.initEditState(this,"D",_4f1[i],_4f5+1);
}
}
for(i=0;i<_4f1.length;i++){
_4f4.remove(_4f1[i]);
}
}else{
var _4f6=this.editFieldState[_4f2-1];
if(_4f6){
_4f6.action="D";
}else{
var _4f7=this.grid.getStore().getById(_4f2);
_4f6=$G.Actions.initEditState(this,"D",_4f7,_4f2);
}
_4f4.remove(this.grid.getSelectionModel().getSelection());
}
$G.Actions.computeEditField(this);
this.grid.editingPlugin.completeEdit();
this.selectedRow=-1;
}
}
};
$G.deleteRowCallback=function(_4f8,_4f9){
var _4fa=_4f9._cf_grid.getStore();
var _4fb=_4f9._cf_grid_properties;
var _4f9=_4fa.lastOptions;
var key="start";
if(_4fa.getCount()==1){
if(_4f9.start>=_4f9.limit){
_4f9.start=_4f9.start-_4f9.limit;
}
_4f9.page=_4f9.page-1;
_4fa.reload(_4f9);
}else{
_4fa.reload();
}
if(_4fb.multiRowSelection){
var _4fd=_4fb.grid.getView().headerCt(0);
if(_4fd!=null){
var _4fe=Ext.Element.get(_4fd).first();
if(_4fe){
_4fe.replaceClass("x-grid3-hd-checker-on");
}
}
}
};
$G.insertRowCallback=function(_4ff,_500){
var _501=_500._cf_grid.getStore();
var _502=_500._cf_grid.actions;
_501.reload();
};
$G.Actions.beforeEdit=function(_503,e,_505){
if($G.isNullRow(e.record.data)){
return false;
}
this.editColumn=e.column;
this.editOldValue=e.value;
};
$G.Actions.afterEdit=function(_506,_507,_508){
var _509=_507.value;
if(_509==this.editOldValue){
return;
}
if(this.insertInProgress==false&&this.onChangeFunction){
this.onChangeHandler("U",this.selectedRow,_507);
}else{
if(!this.dynamic){
rowidx=_507.rowIdx;
if(!rowidx&&rowidx!=0){
rowidx=_507.row;
}
var _50a=$G.computeActualRow_editField(this.editFieldState,_507.record.data.CFGRIDROWINDEX);
var _50b=this.editFieldState[_50a-1];
var _50c=_507.colIdx;
if(!_50c&&_50c!=0){
_50c=_507.column;
}
var cols=_506.grid.columns;
var _50e=_507.field;
for(i=0;i<cols.length;i++){
var col=cols[i];
if(_50e==col.colName){
_50c=i;
}
}
if(_50b){
if(this.multiRowSelection===true&&this.insertInProgress==true){
_50c=_50c-1;
}
_50b.values[_50c][1]=_509;
}else{
var _510=this.grid.getStore().getById(_507.record.data.CFGRIDROWINDEX);
_50b=$G.Actions.initEditState(this,"U",_510,_50a);
var _511=this.editOldValue+"";
if(_507.column.type=="date"){
if(_511&&typeof _511=="string"){
_511=new Date(_511);
}
var _512="F, j Y H:i:s";
if(_507.column&&_507.column.format){
_512=_507.column.format;
}
_50b.values[_50c][1]=Ext.Date.format(_509,_512);
_50b.values[_50c][0]=_511?Ext.Date.format(_511,_512):_511;
}else{
_50b.values[_50c][0]=_511;
_50b.values[_50c][1]=_509;
}
}
$G.Actions.computeEditField(this);
}
}
this.editOldValue=null;
this.fireSelectionChangeEvent();
};
$G.computeActualRow_editField=function(_513,_514){
if(_513.length==_514){
return _514;
}
var _515=0;
var _516=0;
for(;_516<_513.length&&_515<_514;_516++){
var _517=_513[_516];
if(!_517||_517.action!="D"){
_515++;
}
}
return _516;
};
$G.Actions.onChangeHandler=function(_518,_519,_51a,_51b){
var _51c={};
var _51d={};
var data="";
if(null==_51a){
data=this.grid.getStore().getAt(_519).data;
}else{
data=_51a?_51a.record.data:this.grid.getStore().getAt(_519).data;
}
for(col in data){
_51c[col]=data[col];
}
if(_518=="U"){
if((_51a.value==null||_51a.value=="")&&(_51a.originalValue==null||_51a.originalValue=="")){
return;
}
if(_51a.value&&_51a.column.type=="date"){
if(typeof _51a.originalValue=="string"){
var _51f=new Date(_51a.originalValue);
}
if(_51f!=null&&_51f.getElapsed(_51a.value)==0){
return;
}else{
_51c[_51a.field]=_51a.originalValue;
var _520="F, j Y H:i:s";
if(_51a.column.format){
_520=_51a.column.format;
}
_51d[_51a.field]=Ext.Date.format(_51a.value,_520);
}
}else{
_51c[_51a.field]=_51a.originalValue;
_51d[_51a.field]=_51a.value;
}
}
this.onChangeFunction(_518,_51c,_51d,_51b,this.grid,this.onErrorFunction,this);
};
$G.Actions.onChangeHandler_MultiRowsDelete=function(_521,_522,_523,_524){
var _525=new Array();
var _526={};
for(i=0;i<_522.length;i++){
_525[i]=_522.items[i].data;
}
this.onChangeFunction(_521,_525,_526,_524,this.grid,this.onErrorFunction,this);
};
$G.Actions.initEditState=function(_527,_528,_529,_52a){
var _52b={action:_528,values:[]};
var _52c=_527.grid.columns;
var _52d=_52c.length-1;
_52b.values.length=_52d;
var i=0;
if(_527.multiRowSelection===true&&_527.dynamic===false){
i=i++;
}
for(i;i<_52d;i++){
var _52f=_529.get(_52c[i].colName);
_52b.values[i]=[_52f,_52f];
}
_527.editFieldState[_52a-1]=_52b;
return _52b;
};
$G.Actions.fieldSep=eval("'\\u0001'");
$G.Actions.valueSep=eval("'\\u0002'");
$G.Actions.nullValue=eval("'\\u0003'");
$G.Actions.computeEditField=function(_530){
if(_530.dynamic){
return;
}
var _531=_530.editFieldPrefix;
var _532=_530.editFieldState;
var _533=_530.grid.columns;
var _534=0;
var _535="";
for(var i=0;i<_532.length;i++){
var _537=_532[i];
if(_537){
_534++;
_535+=$G.Actions.fieldSep;
_535+=_537.action+$G.Actions.valueSep;
var _538=_537.values;
if(_530.multiRowSelection===true&&_530.dynamic===false&&_537.action!="I"){
_538=_538.slice(1,_538.length);
}
for(var j=0;j<_538.length;j++){
if(j>0){
_535+=$G.Actions.valueSep;
}
var _53a=($G.Actions.isNull(_538[j][0]))?$G.Actions.nullValue:_538[j][0];
var _53b=($G.Actions.isNull(_538[j][1]))?$G.Actions.nullValue:_538[j][1];
var _53c=j;
if(_530.multiRowSelection===true){
_53c++;
}
if(_533[_53c].getEditor()&&_53b==$G.Actions.nullValue&&_533[_53c].getEditor().xtype=="checkbox"){
_53b="0";
}
if(_537.action!="I"||(_537.action=="I"&&_533[_53c].getEditor())){
_535+=_53b;
if(_537.action=="U"&&_533[_53c].getEditor()){
_535+=$G.Actions.valueSep+_53a;
}
}
}
}
}
_531+=_534+_535;
_530.editField.setAttribute("value",_531);
};
$G.Actions.isNull=function(val){
var ret=(val==null||typeof (val)=="undefined"||val.length==0);
return ret;
};
$G.loadData=function(data,_540){
_540._cf_gridDataProxy.loadResponse(data,_540);
var _541=ColdFusion.objectCache[_540._cf_gridname];
$G.applyStyles(_541);
$L.info("grid.loaddata.loaded","widget",[_540._cf_gridname]);
if($G.Actions.isNull(data.TOTALROWCOUNT)==false&&data.TOTALROWCOUNT==0){
_541.fireSelectionChangeEvent();
}
};
$G.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
str+=value;
}
return str;
};
$G.formatBoolean=function(v,p,_546){
return "<div class=\"x-grid3-check-col"+(v?"-on":"")+" x-grid3-cc-"+this.id+"\">&#160;</div>";
};
$G.formatDate=function(_547,p,_549){
if(_547&&!_547.dateFormat){
_547=new Date(_547);
}
var _54a=this.dateFormat?this.dateFormat:"m/d/y";
return _547?Ext.Date.dateFormat(_547,_54a):"";
};
$G.convertDate=function(_54b,p,_54d){
if(_54b&&!_54b.dateFormat){
_54b=new Date(_54b);
}
var _54e=this.dateFormat?this.dateFormat:"m/d/y";
return _54b;
};
$G.ExtProxy=function(_54f,_550){
this.api={load:true,create:undefined,save:undefined,destroy:undefined};
$G.ExtProxy.superclass.constructor.call(this);
this.bindHandler=_54f;
this.errorHandler=_550;
};
Ext.extend($G.ExtProxy,Ext.data.DataProxy,{_cf_firstLoad:true,load:function(_551,_552,_553,_554,arg){
if(!this._cf_actions.bindOnLoad){
var _556={"_cf_reader":_552,"_cf_grid_errorhandler":this.errorHandler,"_cf_scope":_554,"_cf_gridDataProxy":this,"_cf_gridname":this._cf_gridName,"_cf_arg":arg,"_cf_callback":_553,"ignoreData":true};
var data=[];
for(i=0;i<_551.limit;i++){
data.push(new Ext.data.Record({}));
}
this.loadResponse(data,_556);
this._cf_actions.bindOnLoad=true;
}else{
var _558=(_551.start/_551.limit)+1;
if(!_551.sort){
_551.sort="";
}
if(!_551.dir){
_551.dir="";
}
this.bindHandler(this,_558,_551.limit,_551.sort,_551.dir,this.errorHandler,_553,_554,arg,_552);
}
},loadResponse:function(data,_55a){
var _55b=null;
if(_55a.ignoreData){
_55b={success:true,records:data,totalRecords:data.length};
}else{
var _55c;
if(!data){
_55c="grid.extproxy.loadresponse.emptyresponse";
}else{
if(!data.TOTALROWCOUNT&&data.TOTALROWCOUNT!=0){
_55c="grid.extproxy.loadresponse.totalrowcountmissing";
}else{
if(!ColdFusion.Util.isInteger(data.TOTALROWCOUNT)){
_55c="grid.extproxy.loadresponse.totalrowcountinvalid";
}else{
if(!data.QUERY){
_55c="grid.extproxy.loadresponse.querymissing";
}else{
if(!data.QUERY.COLUMNS||!ColdFusion.Util.isArray(data.QUERY.COLUMNS)||!data.QUERY.DATA||!ColdFusion.Util.isArray(data.QUERY.DATA)||(data.QUERY.DATA.length>0&&!ColdFusion.Util.isArray(data.QUERY.DATA[0]))){
_55c="grid.extproxy.loadresponse.queryinvalid";
}
}
}
}
}
if(_55c){
ColdFusion.handleError(_55a._cf_grid_errorHandler,_55c,"widget");
this.fireEvent("loadexception",this,_55a,data,e);
return;
}
_55b=_55a._cf_reader.readRecords(data);
}
this.fireEvent("load",this,_55a,_55a._cf_arg);
_55a._cf_callback.call(_55a._cf_scope,_55b,_55a._cf_arg,true);
},update:function(_55d){
},updateResponse:function(_55e){
}});
$G.ExtReader=function(_55f){
this.recordType=Ext.data.Record.create(_55f);
};
Ext.extend($G.ExtReader,Ext.data.DataReader,{readRecords:function(_560){
var _561=[];
var cols=_560.QUERY.COLUMNS;
var data=_560.QUERY.DATA;
for(var i=0;i<data.length;i++){
var _565={};
for(var j=0;j<cols.length;j++){
_565[cols[j]]=data[i][j];
}
_561.push(new Ext.data.Record(_565));
}
return {success:true,records:_561,totalRecords:_560.TOTALROWCOUNT};
}});
$G.CheckColumn=function(_567){
Ext.apply(this,_567);
if(!this.id){
this.id=Ext.id();
}
this.renderer=this.renderer.bind(this);
};
$G.findColumnIndex=function(grid,_569){
var _56a=grid.headerCt.getGridColumns();
for(var i=0;i<_56a.length;i++){
if(_56a[i].dataIndex==_569){
return i;
}
}
};
$G.CheckColumn.prototype={init:function(grid){
this.grid=grid;
this.count=0;
this.columnIndex=$G.findColumnIndex(this.grid,this.dataIndex);
this.grid.on("render",function(){
var view=this.grid.getView();
if(this.editable==true){
this.grid.addListener("itemmousedown",this.onMouseDown,this);
}
},this);
},onMouseDown:function(thi,_56f,item,_571,e,_573){
var t=e.target;
if(t.className&&t.className.indexOf("x-grid-cc-"+this.id)!=-1){
e.stopEvent();
var _575=ColdFusion.clone(_56f);
_575.data=ColdFusion.clone(_56f.data);
this.grid.getSelectionModel().select(_571);
this.grid.getSelectionModel().fireEvent("rowselect",this.grid.getSelectionModel(),_571);
this.grid.fireEvent("beforeedit",this,{grid:this.grid,row:_571,record:_56f,column:this.columnIndex,field:this.dataIndex,value:_56f.data[this.dataIndex]});
_56f.set(this.dataIndex,this.toggleBooleanValue(_56f.data[this.dataIndex]));
this.grid.fireEvent("edit",this,{grid:this.grid,row:_571,record:_575,column:this.columnIndex,field:this.dataIndex,value:_56f.data[this.dataIndex],originalValue:_575.data[this.dataIndex]});
}
},toggleBooleanValue:function(v){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "N";
}
if(v==="N"){
return "Y";
}
if(v===true){
return false;
}
if(v===false){
return true;
}
if(v===0){
return 1;
}
if(v===1){
return 0;
}
if(v==="YES"){
return "NO";
}
if(v==="NO"){
return "YES";
}
if(v==="T"){
return "F";
}
if(v==="F"){
return "T";
}
return "Y";
},renderer:function(v,p,_579){
p.css+=" x-grid-check-col-td";
var _57a=false;
v=(typeof v=="string")?v.toUpperCase():v;
if(typeof v!="undefined"&&(v==1||v=="1"||v=="Y"||v=="YES"||v=="TRUE"||v===true||v==="T")){
_57a=true;
}
return "<div style=\"background-repeat: no-repeat;background-position:center center;width:auto\" class=\"x-grid-cell-checker"+(_57a!=true?"-off":"")+" x-grid-cc-"+this.id+"\">&#160;</div>";
}};
$G.convertBoolean=function(v,_57c){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "YES";
}
if(v==="N"){
return "NO";
}
if(v===true){
return "YES";
}
if(v===false){
return "NO";
}
if(v===0){
return "NO";
}
if(v===1){
return "YES";
}
if(v==="YES"){
return "YES";
}
if(v==="NO"){
return "NO";
}
if(v==="T"){
return "YES";
}
if(v==="F"){
return "NO";
}
if(v==="FALSE"){
return "NO";
}
if(v==""){
return "NO";
}
if(v.toUpperCase()=="NULL"){
return "NO";
}
return "YES";
};
Ext.define(null,{override:"Ext.data.reader.Json",responseType:"",});
Ext.define(null,{override:"Ext.data.request.Ajax",createResponse:function(xhr){
var me=this,isXdr=me.isXdr,headers={},lines=isXdr?[]:xhr.getAllResponseHeaders().replace(/\r\n/g,"\n").split("\n"),count=lines.length,line,index,key,response,useNativeJSON;
while(count--){
line=lines[count];
index=line.indexOf(":");
if(index>=0){
key=line.substr(0,index).toLowerCase();
if(line.charAt(index+1)==" "){
++index;
}
headers[key]=line.substr(index+1);
}
}
response={request:me,requestId:me.id,status:xhr.status,statusText:xhr.statusText,getResponseHeader:function(_57f){
return headers[_57f.toLowerCase()];
},getAllResponseHeaders:function(){
return headers;
}};
if(isXdr){
me.processXdrResponse(response,xhr);
}
if(me.binary){
response.responseBytes=me.getByteArray(xhr);
}else{
if(xhr.responseType){
response.responseType=xhr.responseType;
}
if(xhr.responseType==="blob"){
response.responseBlob=xhr.response;
}else{
if(xhr.responseType==="json"){
response.responseJson=xhr.response;
}else{
if(xhr.responseURL.indexOf(".json")>0){
useNativeJSON=Ext.USE_NATIVE_JSON;
Ext.USE_NATIVE_JSON=false;
console.log(xhr.responseText);
var _580=xhr.responseText.replace(/\/\/(.*)/g,"$1");
console.log(_580);
response.responseText=Ext.JSON.encode(Ext.JSON.decode(_580));
Ext.USE_NATIVE_JSON=useNativeJSON;
}else{
if(xhr.responseType==="document"){
response.responseXML=xhr.response;
}else{
response.responseText=xhr.responseText;
response.responseXML=xhr.responseXML;
}
}
}
}
}
return response;
}});
Ext.define("MyReader",{extend:"Ext.data.reader.Json",alias:"reader.my-json",read:function(_581,_582){
var _583;
if(_581.request){
_583=_581.request.proxy;
}
var _584=_581.responseText;
if(!_584){
_584=_581.responseJson;
}
if(!_584){
_584=_581;
}
var _585="";
if(_583&&!_583._cf_actions.bindOnLoad){
_585="{  totalrows:0, data :[] }";
_583._cf_actions.bindOnLoad=true;
}else{
_585=$G.queryToJson(_584);
}
if(_583){
$G.applyStyles(_583._cf_actions);
}
Ext.USE_NATIVE_JSON=false;
return this.callParent([Ext.decode(_585)]);
}});
Ext.define("customcfajax",{extend:"Ext.data.proxy.Ajax",alias:"proxy.customcfajax",getParams:function(_586){
params=this.callParent(arguments);
if(!(this.sortParam&&_586.config.sorters&&_586.config.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
}});
Ext.define("Ext.data.proxy.JsProxy",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.jsajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.JsProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:false,jsfunction:"",extraparams:[],getParams:function(_587){
params=this.callParent(arguments);
if(_587.config&&_587.config.sorters){
_587.sorters=_587.config.sorters;
}
if(!(this.sortParam&&_587.sorters&&_587.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
},processResponse:function(_588,_589,_58a,_58b){
var me=this,exception,reader,resultSet,meta,destroyOp;
if(me.destroying||me.destroyed){
return;
}
me.fireEvent("beginprocessresponse",me,_58b,_589);
if(_588===true){
reader=me.getReader();
if(_58b.status===204){
resultSet=reader.getNullResultSet();
}else{
resultSet=reader.read(me.extractResponseData(_58b),{recordCreator:_589.getRecordCreator()||reader.defaultRecordCreatorFromServer});
}
if(!_589.$destroyOwner){
_589.$destroyOwner=me;
destroyOp=true;
}
_589.process(resultSet,_58a,_58b);
exception=!_589.wasSuccessful();
}else{
me.setException(_589,_58b);
exception=true;
}
if(me.destroyed){
if(!_589.destroyed&&destroyOp&&_589.$destroyOwner===me){
_589.destroy();
}
return;
}
if(exception){
me.fireEvent("exception",me,_58b,_589);
}else{
meta=resultSet.getMetadata();
if(meta){
me.onMetaChange(meta);
}
}
if(me.destroyed){
if(!_589.destroyed&&destroyOp&&_589.$destroyOwner===me){
_589.destroy();
}
return;
}
me.fireEvent("endprocessresponse",me,_58b,_589);
if(!_589.destroyed&&destroyOp&&_589.$destroyOwner===me){
_589.destroy();
}
},doRequest:function(_58d,_58e,_58f){
var me=this;
op=_58d;
if(!op.page){
op.page=op._page;
}
sorters=_58d.sorters;
sortcol="";
sortdir="ASC";
if(sorters&&sorters.length>0){
sortcol=sorters[0].property;
sortdir=sorters[0].direction;
}
if(this._cf_actions.bindOnLoad){
result=eval(this.jsfunction);
}else{
var _591=[];
for(i=0;i<this._cf_actions.grid.columns.length;i++){
var _592=this._cf_actions.grid.columns[i];
_591[i]=_592.colName;
}
result="{  totalrows:0, QUERY : { COLUMNS : "+_591+" data :[] }}";
}
me.processResponse(true,_58d,"",result,_58e,_58f);
return null;
},getMethod:function(_593){
return this.actionMethods[_593.action];
},createRequestCallback:function(_594,_595,_596,_597){
var me=this;
return function(_599,_59a,_59b){
me.processResponse(_59a,_595,_594,_59b,_596,_597);
};
}},function(){
Ext.data.HttpProxy=this;
});
$G.queryToJson=function(data){
var _59d=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _59f="{  totalrows:"+jsondata.TOTALROWCOUNT+", data :[";
for(var i=0;i<data.length;i++){
var _5a1={};
_59f=_59f+"{";
for(var j=0;j<cols.length;j++){
if(data[i][j]==null){
data[i][j]="";
}
_5a1[cols[j]]=data[i][j];
encodedata=ColdFusion.AjaxProxy.JSON.encode(data[i][j]);
_59f=_59f+cols[j]+":"+encodedata;
if(j!=cols.length-1){
_59f=_59f+",";
}
}
_59f=_59f+"}";
if(i!=data.length-1){
_59f=_59f+",";
}
}
_59f=_59f+"]}";
return _59f;
};
$G.queryToArray=function(data){
var _5a4=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _5a6=new Array();
for(var i=0;i<data.length;i++){
var _5a8=new Array(1);
for(var j=0;j<cols.length;j++){
_5a8[j]=data[i][j];
}
_5a6[i]=_5a8;
}
return _5a6;
};
};
cfinitgrid();

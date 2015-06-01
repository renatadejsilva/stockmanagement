rabbit.util={bind:function(_1,_2){
return function(){
try{
return _1.apply(_2,arguments);
}
catch(e){
console.error(e);
}
};
},getFirstNodeChild:function(_3){
return this.getChildren(_3)[0];
},getChildren:function(_4){
if(_4.children){
return _4.children;
}else{
var _5=_4.childNodes;
var _6=[];
for(var i=0;i<_5.length;i++){
if(_5[i].nodeType===Node.ELEMENT_NODE){
_6.push(_5[i]);
}
}
return _6;
}
},scrollToRelative:function(_7,_8,_9){
var to=_7.scrollTop+_8;
this.scrollTo(_7,to,_9);
},scrollTo:function(_a,to,_b){
if(_b<0){
return;
}
var _c=to-_a.scrollTop;
var _d=_c/_b*10;
setTimeout(function(){
_a.scrollTop=_a.scrollTop+_d;
if(_a.scrollTop===to){
return;
}
this.scrollTo(_a,to,_b-10);
}.bind(this),10);
},xmlEncode:function(_e){
return _e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
},xmlDecode:function(_f){
return _f.toString().replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
},convertDate:function(_10){
if(_10=="7000000000000"){
return "not yet saved";
}
return Ext.util.Format.date(new Date(parseInt(_10)),"Y-m-d G:i");
},appendVersionQuery:function(_11){
return _11+"?v="+rabbit.parameters.codeVersion;
},cloneObject:function(_12){
return JSON.parse(JSON.stringify(_12));
},Class:function(_13,_14){
if(!_14){
_14=_13;
_13=function(){
};
}
var F=function(c){
if(this.init&&c!==rabbit.util.Class){
this.parent=_13.prototype;
this.init.apply(this,arguments);
}
};
_14.call(F.prototype=new _13(rabbit.util.Class),_13.prototype);
return F;
},absoluteCenter:function(_15){
$(_15).css("left",$(_15).parent().width()/2-$(_15).width()/2);
$(_15).css("top",$(_15).parent().height()/2-$(_15).height()/2);
},getResolvedPromise:function(){
var _16=new jQuery.Deferred();
_16.resolve();
return _16.promise();
},addClass:function(_17,_18){
if(typeof _17==="string"){
_17=document.getElementById(_17);
}
_17.setAttribute("class",_17.getAttribute("class")+" "+_18);
},removeClass:function(_19,_1a){
if(typeof _19==="string"){
_19=document.getElementById(_19);
}
_19.setAttribute("class",_19.getAttribute("class").replace(_1a,""));
},stopPropagation:function(e){
e.stopPropagation();
},compareStrings:function(s1,s2){
if(s1==null){
s1="";
}
if(s2==null){
return -1;
}
return "".localeCompare.call(s1,s2);
},compareInts:function(i1,i2){
if(isNaN(i1)){
return -1;
}
if(isNaN(i2)){
return 1;
}
if(i1==i2){
return 0;
}
if(i2>i1){
return -1;
}
return 1;
},insertAtIndex:function(_1b,key,_1c,_1d){
var tmp={};
var _1e=_.keys(_1b);
for(var i=0;i<_1e.length;i++){
if(i>=_1d){
tmp[_1e[i]]=_1b[_1e[i]];
delete _1b[_1e[i]];
}
}
_1b[key]=_1c;
for(var key in tmp){
_1b[key]=tmp[key];
}
return _1b;
},recursivelyRemoveId:function(_1f){
_1f.removeAttribute("id");
var _20=this.getChildren(_1f);
for(var i=0;i<_20.length;i++){
this.recursivelyRemoveId(_20[i]);
}
}};
pidoco={console:{log:function(){
},error:function(){
},debug:function(){
},warn:function(){
},info:function(){
}}};
if(typeof console.log.bind!=="undefined"){
pidoco={console:{}};
if(typeof console.log==="function"){
pidoco.console.log=console.log.bind(console);
}
if(typeof console.error==="function"){
pidoco.console.error=console.error.bind(console);
}
if(typeof console.debug==="function"){
pidoco.console.debug=console.debug.bind(console);
}
if(typeof console.warn==="function"){
pidoco.console.warn=console.warn.bind(console);
}
if(typeof console.info==="function"){
pidoco.console.info=console.info.bind(console);
}
}else{
var illegalInvocation=true;
var testConsole=console.log;
try{
testConsole("Test console does not produce any exception.");
illegalInvocation=false;
}
catch(e){
illegalInvocation=true;
}
if(!illegalInvocation){
pidoco={console:{log:console.log,error:console.error,debug:console.debug,warn:console.warn,info:console.info}};
}
}
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/))){
console.log=function(){
};
console.error=function(e){
var _21=(e.lineNumber!=null)?e.lineNumber:e.line;
var _22=(e.fileName!=null)?e.fileName:e.sourceURL;
var _23={"message":e.name+": "+e.message,"url":_22,"line":_21,"stack":e.stack};
rabbit.repository.communicationMgr.submitError(_23);
};
console.debug=function(){
};
console.warn=function(){
};
console.info=function(){
};
}else{
console.oldError=console.error;
console.error=function(e){
if(typeof e.stack!=="undefined"){
console.oldError(e.stack);
}else{
console.oldError(null,arguments);
}
};
}
rabbit.result={};
rabbit.ui={};
rabbit.data={};
rabbit.event={};
rabbit.parameters={};
rabbit.interaction={};
rabbit.logLevel="debug";
rabbit.communication={};
rabbit.plugins={};
rabbit.stencils={};
rabbit.util=_.extend(rabbit.util,{formatDate:function(_24){
var _25=((new Date()).getTime()-_24)/1000/60;
var _26=new Date(_24);
if(_25<2){
return t("result.discussion.time-a-minute-ago");
}else{
if(_25<60){
return Math.round(_25)+t("result.discussion.time-minutes-ago");
}else{
if(_25<1440){
return t("result.discussion.time-at")+this.pad(_26.getHours())+":"+this.pad(_26.getMinutes());
}else{
return t("result.discussion.on")+_26.toDateString();
}
}
}
},pad:function(val,len){
val=String(val);
len=len||2;
while(val.length<len){
val="0"+val;
}
return val;
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},isElementChildOfSelector:function(_27,_28){
return $(_27).parents(_28).length>0;
},userRole:null});
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",clickAreaHovered:"clickAreaHovered",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",pageReady:"pageReady",layerStoreInserted:"layerStoreInserted",layerLoaded:"layerLoaded",showLayer:"showLayer",hideLayer:"hideLayer",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver",toggleToggleSection:"toggleToggleSection",discussionStoreChanged:"discussionStoreChanged",discussionStoreAdded:"discussionStoreAdded",pageStoreLoaded:"pageStoreLoaded",folderStoreLoaded:"folderStoreLoaded",newInteractionRegistered:"newInteractionRegistered",switchOffSwitch:"switchOffSwitch",switchOnSwitch:"switchOnSwitch"};
rabbit.event.manager=function _returnEventDispatcher(){
var _29={};
var _2a={};
return {registerOnEvent:function registerOnEvent(_2b,_2c,_2d,_2e){
if(typeof _2b!=="string"||typeof _2c!=="function"||typeof _2d!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_29.hasOwnProperty(_2b)){
_29[_2b]=[];
}
var _2f={"callback":_2c,"thisArg":_2d,"includeEventType":false};
if(_2e){
_2f.includeEventType=true;
}
_29[_2b].push(_2f);
},registerOnCategoryEvent:function(_30,_31,_32){
if(typeof _30!=="string"||typeof _31!=="function"||typeof _32!=="object"){
throw "Invalid Arguments for registerOnEventForCategory";
}
if(!_2a.hasOwnProperty(_30)){
_2a[_30]=[];
}
var _33={"callback":_31,"thisArg":_32,"includeEventType":true};
_2a[_30].push(_33);
console.log("ok for "+_30);
},raiseEvent:function raiseEvent(_34){
this._raiseCategoryEvent.apply(this,arguments);
this._raiseNormalEvent.apply(this,arguments);
},_raiseCategoryEvent:function raiseEvent(_35){
var _36=_35.replace(/\..*$/,"");
if(_36!=_35){
console.log("Try to raise catergory "+_36);
var _37=_2a[_36];
if(typeof _37==="undefined"){
console.warn("No handler category for invoked eventType "+_35+" (category: "+_36+")");
return;
}
for(var i=0;i<_37.length;i++){
try{
var _38=Array.prototype.slice.call(arguments);
this._raiseEvent(_37[i],_38);
}
catch(e){
console.error(e);
}
}
}
},_raiseNormalEvent:function raiseEvent(_39){
var _3a=_29[_39];
if(typeof _3a==="undefined"){
console.warn("No handler for invoked eventType "+_39);
return;
}
for(var i=0;i<_3a.length;i++){
try{
var _3b=Array.prototype.slice.call(arguments);
this._raiseEvent(_3a[i],_3b);
}
catch(e){
console.error(e);
}
}
},_raiseEvent:function(_3c,_3d){
var _3e=_3c.callback;
var _3f=_3c.thisArg;
var _40=_3c.includeEventType;
if(typeof _3e!=="function"){
return;
}
if(!_40){
_3d.shift();
}
_3e.apply(_3f,_3d);
}};
}();
rabbit.communication.manager={urls:{createDiscussion:"__reviewBaseUrl__/__layerId__/create",moveDiscussion:"__reviewBaseUrl__/__layerId__/move",deleteDiscussion:"__reviewBaseUrl__/__layerId__/delete",getDiscussions:"__reviewBaseUrl__/__layerId__/discussions",postEntryDiscussion:"__reviewBaseUrl__/__layerId__/post",setStateDiscussion:"__reviewBaseUrl__/__layerId__/setstate",renameDiscussion:"__reviewBaseUrl__/__layerId__/rename",loadLayerExport:"../resources/layers/__layerId____browser__-__mode__.js",loadLayer:"__baseUrl__editor-jersey/prototypes/__prototypeId__/layers/__layer__",pageLink:"__urlPattern__",rectangleExport:"../resources/overlay-rectangles/__width__-__height__-__mode__.js",rectangle:"__baseUrl__prototype/result/__prototypeId__/rect/__mode__",mp3Export:"../resources/audios/__audioId__.mp3",mp3:"__baseUrl__editor-jersey/prototypes/__prototypeId__/audios/__audioId__.mp3"},buildEditUrl:function(_41){
var _42="/rabbit/edit/"+rabbit.result.manager.currentPrototypeId+"#";
var _43="page/"+rabbit.result.manager.currentPageNr;
var _44="";
var _45=rabbit.data.pageStore.objects[_41];
var _46=rabbit.data.folderStore.objects[_45.data.parentFolder];
while(_46!==undefined){
_44="folder/"+_46.data.id+"/"+_44;
_46=rabbit.data.folderStore.objects[_46.data.parentFolder];
}
return _42+_44+_43;
},getUrl:function(_47,_48){
var url=this.urls[_47];
var _49=rabbit.result.manager.urlPattern;
url=url.replace("__baseUrl__",rabbit.common.baseUrl);
url=url.replace("__reviewBaseUrl__",rabbit.facade.getBaseUrl());
if(_47==="loadLayer"){
_49=rabbit.result.manager.urlPattern.replace("__page__","layer/__page__");
}
url=url.replace("__urlPattern__",_49);
for(var key in _48){
url=url.replace("__"+key+"__",_48[key]);
}
return url;
},get:function(url,_4a,_4b,_4c){
return this.ajax(url,"get",_4a,_4b,_4c);
},post:function(url,_4d,_4e,_4f){
return this.ajax(url,"post",_4d,_4e,_4f);
},ajax:function(url,_50,_51,_52,_53){
if(!url){
throw "URL not provided for ajax";
}
_50=_50||"get";
_51=_51||undefined;
_52=_52||undefined;
_53=_53||{};
var _54=_.defaults({url:url,type:_50,dataType:_51,data:_52},_53);
return $.ajax(_54);
}};
rabbit.result.manager={datePickerClicked:false,customDatepickerObjects:[],init:function(_55,_56,_57,_58){
try{
rabbit.common.i18n.init({lang:rabbit.result.lang});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_56;
rabbit.browser=_57;
this.initialPageId=_55;
this.isPushStateAvailable=window.location.protocol!=="file:"&&typeof window.history.replaceState!=="undefined";
this.fromApp=_58;
try{
this._initPlugins();
rabbit.data.folderStore.init();
rabbit.data.pageStore.init();
rabbit.data.layerStore.init();
rabbit.data.discussionStore.init();
rabbit.ui.manager.init();
if(rabbit.parameters.layerIdToOpen){
rabbit.ui.manager.showLayer($("#repository"),rabbit.parameters.layerIdToOpen);
}
rabbit.event.manager.raiseEvent(rabbit.events.pageReady);
}
catch(e){
console.error(e);
}
rabbit.ui.manager._hackToMakeArrowsWork();
if(this.isPushStateAvailable){
window.onpopstate=function(e){
if(e.state){
if(e.state.fromRefresh){
window.history.back();
}else{
rabbit.facade.loadLayer(e.state.pageId);
this.showPage($("#"+e.state.repositoryId),e.state.pageId);
console.log("new pageid "+this.currentPageNr);
}
}
}.bind(this);
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr},"",window.location.href);
}
},setNextPageIsARefresh:function(){
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr,fromRefresh:true},"",window.location.href);
},goBack:function(){
window.history.back();
},_initPlugins:function(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _59=rabbit.facade._availablePlugins[i];
_59.init.apply(_59,_59._initialArguments);
}
catch(e){
console.error(e);
}
}
},goToPage:function(_5a,_5b){
var url;
var _5c=rabbit.data.pageStore.objects[_5a];
var _5d=Boolean(_5c);
if(_5d){
url=_5c.getUrl();
if(rabbit.facade.isExport()&&!url){
alert("Sorry, this page is not part of the export.");
return;
}else{
rabbit.mobile.trigger("pidoco:beforeGoToPage",{height:_5c.data.height,width:_5c.data.width});
}
}else{
if(!_5a.match(/^[a-zA-Z0-9]*:\/\//)){
url="http://"+_5a;
}else{
url=_5a;
}
}
if(!_5d&&rabbit.facade.runningInApp()&&rabbit.facade.isIOS){
window.open(url,"_system");
}else{
if(_5b){
window.open(url);
}else{
location.href=url;
}
}
},showPage:function(_5e,_5f,_60,_61){
_60=_60||false;
var _62=_5e.attr("id");
try{
if(_5f===""||_5f===this.currentPageNr){
return;
}
var _63=rabbit.data.pageStore.objects[_5f];
console.log("show page repository:"+_62+" page:"+_5f,_63);
if(_63===undefined){
this.goToPage(_5f);
return;
}
rabbit.ui.manager.showPage(_5e,_5f,_61);
if(_60===true&&this.isPushStateAvailable){
console.log("PUSH STATE",_5f);
window.history.pushState({repositoryId:_62,pageId:_5f},"",_63.getUrl());
}
this.currentPageNr=_5f;
_5e.data("page-id",_5f);
rabbit.event.manager.raiseEvent(rabbit.events.pageLoaded,_63,_5e);
rabbit.mobile.trigger("pidoco:afterShowPage");
}
catch(e){
console.error(e);
}
},menuClick:function(a,b,_64){
rabbit.result.manager.goToPage(_64,false);
}};
rabbit.ui.manager={inTransition:false,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.layerLoaded,this.fillWrappersWithLayer,this);
},createWrappers:function(_65,_66,_67){
var _68=$("<div class=\"wrapper wrapper-"+_66+"\" data-layer-id=\""+_66+"\" style=\"display: none\"></div>").appendTo(_65);
var _69=rabbit.data.pageStore.objects[_66];
if(_67===true&&_69){
for(var _6a in _69.data.layers){
if(_69.data.layers[_6a]===true||_69.data.layers[_6a]==="true"){
this.createWrappers(_65,_6a);
}
}
}
return _68;
},fillWrappersWithLayer:function(_6b){
var _6c=_6b.data.id;
$(".wrapper-"+_6c+"[data-fill-me=\"true\"]:empty").each(function(_6d,_6e){
this.fillWrapperWithLayer(_6e,_6b);
_6e.removeAttribute("data-fill-me");
}.bind(this));
},fillWrapperWithLayer:function(_6f,_70,_71){
var _72=_70.data.html;
var _73=_6f.parentNode.id;
var _74=_70.data.html;
if(_74){
_74=$(_70.data.html.replace(/__containerId__/g,_73));
if(_71){
_74.find("script").remove();
}
$(_6f).append(_74);
if(!this.inTransition){
rabbit.facade.raiseEvent(rabbit.events.layerStoreInserted,_6f.children[0]);
}
}else{
_6f.setAttribute("data-fill-me","true");
}
return _74;
},getLayerWrapper:function(_75,_76){
return _75.find(">.wrapper-"+_76);
},showLayer:function(_77,_78){
var _79=rabbit.data.layerStore.objects[_78];
if(!_79){
_79=rabbit.data.layerStore.loadLayer(_78);
}
var _7a=this.getLayerWrapper(_77,_78);
if(!_7a.length){
_7a=this.createWrappers(_77,_78,true);
}
if(_7a[0].children.length===0){
this.fillWrapperWithLayer(_7a[0],_79);
}
_7a.show();
rabbit.event.manager.raiseEvent(rabbit.events.showLayer,{id:_77.attr("id")+_78,layerId:_78,repositoryId:_77.attr("id")});
},hideLayer:function(_7b,_7c){
var _7d=this.getLayerWrapper(_7b,_7c);
_7d.hide();
rabbit.event.manager.raiseEvent(rabbit.events.hideLayer,{id:_7b.attr("id")+_7c,layerId:_7c,repositoryId:_7b.attr("id")});
},toggleLayer:function(_7e,_7f){
var _80=this.getLayerWrapper(_7e,_7f);
if(!_80.length||_80.css("display")==="none"){
return this.showLayer(_7e,_7f);
}else{
return this.hideLayer(_7e,_7f);
}
},showPage:function(_81,_82,_83){
var _84;
if(_83==="fromRight"||_83==="fromLeft"||_83==="fromTop"||_83==="fromBottom"){
_84=this.showPageWithTranslation(_81,_82,_83);
}else{
if(_83==="opacity"){
_84=this.showPageWithOpacity(_81,_82);
}else{
if(_83==="flip"){
_84=this.showPageWithFlip(_81,_82);
}else{
_84=this.showPageWithoutTransition(_81,_82);
}
}
}
if(_81.attr("id")=="repository"&&_84){
_84.done(function(){
$(_81).attr("data-review-reference-id",_82);
$(_81).attr("data-page-id",_82);
$(".border-wrapper").attr("data-current-page-id",_82);
});
}
},showPageWithoutTransition:function(_85,_86){
var _87=rabbit.data.pageStore.objects[_86];
var _88=new $.Deferred();
rabbit.ui.manager.showLayer(_85,_86);
_.each(_87.data.layers,function(_89,_8a){
this.showLayer(_85,_8a);
}.bind(this));
_85.find(">.wrapper").each(function(_8b,_8c){
var _8d=_8c.getAttribute("data-layer-id");
if((!_87.data.layers.hasOwnProperty(_8d)||_87.data.layers[_8d]!==true)&&_8d!=_86){
this.hideLayer(_85,_8d);
}
}.bind(this));
_88.resolve();
return _88.promise();
},showPageWithFlip:function(_8e,_8f){
var _90=500;
var _91=new $.Deferred();
var _92=this.createTransitionWrapper(_8e,_8f);
var _93=_92.leave.find(">div");
var _94=_92.enter.find(">div");
_8e.find(">div").hide();
_8e.append(_92.leave).append(_92.enter);
_94.hide();
this.startTransition(_8e);
_93.transition({perspective:"0px",rotateY:"90deg",duration:_90},function(){
_94.transition({perspective:"0px",rotate3d:"0,1,0,270deg",duration:0},function(){
_94.show();
this.showPageWithoutTransition(_94,_8f);
_94.transition({perspective:"0px",rotate3d:"0,1,0,360deg",duration:_90},function(){
_93.transition({perspective:"0px",rotateY:"0deg",duration:0},function(){
this.stopTransition(_8e);
this.showPageWithoutTransition(_8e,_8f);
_92.leave.remove();
_92.enter.remove();
_91.resolve();
}.bind(this));
}.bind(this));
}.bind(this));
}.bind(this));
return _91.promise();
},showPageWithOpacity:function(_95,_96){
var _97=500;
var _98=new $.Deferred();
var _99=this.createTransitionWrapper(_95,_96);
var _9a=_99.leave.find(">div");
var _9b=_99.enter.find(">div");
_95.find(">div").hide();
_95.append(_99.leave).append(_99.enter);
this.startTransition(_95);
_9b.css({opacity:0});
_9a.transition({opacity:0,duration:_97},function(){
this.showPageWithoutTransition(_9b,_96);
_9b.transition({opacity:1,duration:_97},function(){
this.stopTransition(_95);
this.showPageWithoutTransition(_95,_96);
_99.leave.remove();
_99.enter.remove();
_98.resolve();
}.bind(this));
}.bind(this));
return _98.promise();
},showPageWithTranslation:function(_9c,_9d,_9e){
var _9f=_9c.width();
var _a0=_9c.height();
var _a1=500;
var _a2=new $.Deferred();
var _a3=this.createTransitionWrapper(_9c,_9d);
var _a4=_a3.leave.find(">div");
var _a5=_a3.enter.find(">div");
if(_9e==="fromLeft"){
_a5.css("left",-1*_9f);
}else{
if(_9e==="fromTop"){
_a5.css("top",-1*_a0);
}else{
if(_9e==="fromBottom"){
_a5.css("top",_a0);
}else{
_a5.css("left",_9f);
}
}
}
_a5.find(">div").show();
_9c.find(">div").hide();
_9c.append(_a3.leave).append(_a3.enter);
this.startTransition(_9c);
var _a6=function(){
this.stopTransition(_9c);
this.showPageWithoutTransition(_9c,_9d);
_a3.leave.remove();
_a3.enter.remove();
_a2.resolve();
}.bind(this);
if(_9e==="fromLeft"){
_a4.transition({x:_9f+"px",duration:_a1});
_a5.transition({x:_9f+"px",duration:_a1},_a6);
}else{
if(_9e==="fromTop"){
_a4.transition({y:_a0+"px",duration:_a1});
_a5.transition({y:_a0+"px",duration:_a1},_a6);
}else{
if(_9e==="fromBottom"){
_a4.transition({y:"-"+_a0+"px",duration:_a1});
_a5.transition({y:"-"+_a0+"px",duration:_a1},_a6);
}else{
_a4.transition({x:"-"+_9f+"px",duration:_a1});
_a5.transition({x:"-"+_9f+"px",duration:_a1},_a6);
}
}
}
return _a2.promise();
},createTransitionWrapper:function(_a7,_a8){
var _a9=_a7.data("page-id");
var _aa=rabbit.data.pageStore.objects[_a8];
var _ab=rabbit.data.pageStore.objects[_a9];
var _ac,_ad;
var _ae=$("<div class=\"transition-wrapper transition-enter\" data-page-id=\""+_a8+"\"><div class=\"layer-container\"></div></div>");
var _af=$("<div class=\"transition-wrapper transition-leave\" data-page-id=\""+_a9+"\"><div class=\"layer-container\"></div></div>");
var _b0=_af.find(">div");
var _b1=_ae.find(">div");
var _b2=_a7.find(".wrapper-"+_a9).clone().remove("script");
var _b3=_a7.find(".wrapper-"+_a8).clone().remove("script");
for(_ac in _aa.data.layers){
_ad=_aa.data.layers[_ac];
if(_ad===true||_ad==="true"){
this.createWrappers(_b1,_ac,false);
this.showLayer(_b1,_ac);
}
}
for(_ac in _ab.data.layers){
_ad=_ab.data.layers[_ac];
if(_ad===true||_ad==="true"){
this.createWrappers(_b0,_ac,false);
this.showLayer(_b0,_ac);
}
}
_b0.append(_b2);
if(_b3.length===0){
_b3=this.createWrappers(_b1,_a8,true);
}else{
_b1.append(_b3);
}
if(_b3.children().length===0){
this.fillWrapperWithLayer(_b3[0],rabbit.data.layerStore.objects[_a8],true);
}
return {enter:_ae,leave:_af};
},startTransition:function(_b4){
this.inTransition=true;
$("body").addClass("disable-pointer-events");
console.log(_b4);
$(_b4).addClass("during-transition");
},stopTransition:function(_b5){
this.inTransition=false;
$("body").removeClass("disable-pointer-events");
$(_b5).removeClass("during-transition");
},_forceRedraw:function(){
var _b6=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _b7=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_b6||_b7){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
}};
rabbit.interaction.manager={tmp:{},actions:{click:{makeableOnDesktop:function(_b8){
return !_b8.numberOfFinger||_b8.numberOfFinger=="1"||_b8.numberOfFinger=="any";
},render:function(_b9){
if(parseInt(_b9.data.action.numberOfFinger,10)>1){
return t("interaction.action.multiFingerClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_b9));
}else{
return t("interaction.action.click.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_b9));
}
},defineEvent:function(_ba){
var _bb=document.getElementById(_ba.data.stencilId);
if(_ba.data.action.button=="right"){
$(_bb).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_ba,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _bc;
var _bd;
var _be=200;
var _bf=500;
_bb.addEventListener("touchstart",function(e){
if(!_ba.data.action.numberOfFinger||(_ba.data.action.numberOfFinger&&(_ba.data.action.numberOfFinger==="any"||parseInt(_ba.data.action.numberOfFinger,10)===e.touches.length))){
_bc=new Date().getTime();
}
e.preventDefault();
},false);
_bb.addEventListener("touchend",function(e){
if(_bc){
var end=new Date().getTime();
if(_be>(end-_bc)){
rabbit.interaction.manager.raiseInteraction(_ba,rabbit.interaction.manager.serializeEvent(e));
_bc=null;
}
}
e.preventDefault();
},false);
}else{
if(rabbit.interaction.manager.actions.click.makeableOnDesktop(_ba.data.action)){
_bb.addEventListener("click",function(e){
rabbit.interaction.manager.raiseInteraction(_ba,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}
}},doubleClick:{makeableOnDesktop:true,render:function(_c0){
return t("interaction.action.doubleClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c0));
},defineEvent:function(_c1){
var _c2=document.getElementById(_c1.data.stencilId);
if(_c1.data.action.button=="right"){
$(_c2).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_c1,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _c3;
var _c4;
var _c5=200;
var _c6=500;
_c2.addEventListener("touchstart",function(e){
_c3=new Date().getTime();
if(_c6<(_c3-_c4)){
_c4=null;
}
e.preventDefault();
},false);
_c2.addEventListener("touchend",function(e){
if(_c3){
var end=new Date().getTime();
if(_c5>(end-_c3)){
if(!_c4){
_c4=end;
}else{
if(_c6>(end-_c4)){
rabbit.interaction.manager.raiseInteraction(_c1,rabbit.interaction.manager.serializeEvent(e));
_c3=null;
_c4=null;
}
_c4=null;
}
}
}
e.preventDefault();
},false);
}else{
_c2.addEventListener("dblclick",function(e){
rabbit.interaction.manager.raiseInteraction(_c1,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}},hover:{makeableOnDesktop:true,render:function(_c7){
return t("interaction.action.hover.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c7));
},defineEvent:function(_c8){
if(!_c8.data.action.trigger){
_c8.data.action.trigger="enter";
}
if(_c8.data.action.trigger=="both"||_c8.data.action.trigger=="enter"){
$("#"+_c8.data.stencilId).on("mouseenter",function(e){
rabbit.interaction.manager.raiseInteraction(_c8,rabbit.interaction.manager.serializeEvent(e));
});
}
if(_c8.data.action.trigger=="both"||_c8.data.action.trigger=="leave"){
$("#"+_c8.data.stencilId).on("mouseleave",function(e){
rabbit.interaction.manager.raiseInteraction(_c8,rabbit.interaction.manager.serializeEvent(e));
});
}
}},swipe:{makeableOnDesktop:false,render:function(_c9){
return t("interaction.action.swipe.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c9));
},defineEvent:function(_ca){
var _cb=Hammer(document.getElementById(_ca.data.stencilId),{swipe_max_touches:5,drag_block_horizontal:true,drag_block_vertical:true,swipe_velocity:0.4});
_cb.on("swipe",function(e){
if(_ca.data.action.direction==="any"||e.gesture.direction===_ca.data.action.direction){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_ca,rabbit.interaction.manager.serializeEvent(e));
}
});
}},pinch:{makeableOnDesktop:false,render:function(_cc){
return t("interaction.action.pinch.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_cc));
},defineEvent:function(_cd){
var _ce=Hammer(document.getElementById(_cd.data.stencilId),{prevent_default:true});
var _cf=null;
var _d0=false;
if(_cd.data.action.direction==="in"){
_cf="pinchin";
}else{
if(_cd.data.action.direction==="out"){
_cf="pinchout";
}else{
_cf="pinch";
}
}
_ce.on("transformstart",function(e){
_d0=false;
});
_ce.on("transformend",function(e){
if(_d0){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_cd,rabbit.interaction.manager.serializeEvent(e));
}
});
_ce.on(_cf,function(e){
_d0=true;
});
}}},getInterinteractionEventId:function(_d1){
return "interaction."+_d1;
},raiseInteraction:function(_d2,e){
if(this.isInteractionExecutable(_d2)){
rabbit.facade.raiseEvent(_d2.data.uniqueId,e);
return true;
}else{
return false;
}
},isLayerHidden:function(_d3){
return $(_d3).css("display")==="none";
},isInteractionExecutable:function(_d4){
var _d5=$("#"+_d4.data.stencilId);
var _d6=_d5.parents(".layer");
for(var i=0;i<_d6.length;i++){
if(this.isLayerHidden(_d6.get(i))){
return false;
}
}
if(_d5.length===0||_d5.hasClass("layer")&&this.isLayerHidden(_d5)){
return false;
}
return true;
},renderAction:function(_d7){
return rabbit.interaction.manager.actions[_d7.data.action.type].render(_d7);
},getElementTitle:function(_d8){
var _d9=$("#"+_d8.data.stencilId).data("interactive-element-type");
return t("stencils."+_d9+"-palette");
},registerAction:function(_da,_db){
if(_.has(rabbit.interaction.manager.actions,_da)){
throw "Action with name "+_da+" already exists.";
}else{
rabbit.interaction.manager.actions[_da]=_db;
}
},registerReaction:function(_dc,_dd){
if(_.has(rabbit.interaction.manager.reactions,_dc)){
throw "Action with name "+_dc+" already exists.";
}else{
rabbit.interaction.manager.reactions[_dc]=_dd;
}
},reactions:{showPage:{init:function(_de,_df){
var _e0=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_df);
if(rabbit.data.pageStore.objects[_df.target]&&(_e0==="withoutReloadOnly"||_e0==="withoutReloadIframe")){
rabbit.facade.loadLayer(_df.target);
}
},getOpeningMethod:function(_e1){
var _e2=_e1.options;
if(!_e2){
if(_e1.inNewTab==="true"){
_e2="reloadNewTab";
}else{
if(_e1.withoutReload=="true"){
_e2="withoutReloadOnly";
}else{
if(_e1.withoutReload!==undefined){
_e2="reloadOnly";
}
}
}
}
return _e2;
},callback:function(_e3,_e4,_e5){
var _e6=_e5.target;
var _e7=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_e5);
if(_e7==="reloadNewTab"){
rabbit.result.manager.goToPage(_e6,true);
}else{
if(_e7==="withoutReloadOnly"){
rabbit.facade.showPage($("#repository"),_e6,true,_e5.transition);
}else{
if(_e7==="withoutReloadIframe"){
var _e8=document.getElementById(_e4.data.stencilId);
var _e9=rabbit.facade.getRepositoryFromStencil(_e8);
var _ea=false;
if(_e9.attr("id")==="repository"){
_ea=true;
}
rabbit.facade.showPage(_e9,_e6,_ea,_e5.transition);
}else{
rabbit.result.manager.goToPage(_e6);
}
}
}
}},toggleLayer:{init:function(_eb,_ec){
rabbit.facade.loadLayer(_ec.layer);
},callback:function(_ed,_ee,_ef){
var _f0=document.getElementById(_ee.data.stencilId);
var _f1=rabbit.facade.getRepositoryFromStencil(_f0);
if(_ef.visibility==="toggle"){
rabbit.facade.toggleLayer(_f1,_ef.layer);
}else{
if(_ef.visibility==="show"){
rabbit.facade.showLayer(_f1,_ef.layer);
}else{
if(_ef.visibility==="hide"){
rabbit.facade.hideLayer(_f1,_ef.layer);
}
}
}
}},vibrate:{callback:function(_f2,_f3,_f4){
navigator.vibrate=navigator.vibrate||navigator.mozVibrate||navigator.webkitVibrate||undefined;
if(navigator.vibrate){
navigator.vibrate(_f4.duration);
}else{
if(window.parentBody){
window.parentBody.trigger("pidoco:vibrate",[{duration:_f4.duration}]);
}else{
}
}
}},browserBack:{callback:function(_f5,_f6,_f7){
rabbit.facade.browserBack();
}},browserForward:{callback:function(_f8,_f9,_fa){
rabbit.facade.browserForward();
}},closeBrowserWindow:{callback:function(_fb,_fc,_fd){
rabbit.facade.closeBrowserWindow();
}}},registerInteraction:function(_fe,_ff,_100,_101){
if(_fe[0]==="-"){
return;
}
if(!_.isArray(_101)){
_101=[_101];
}
var _102=new rabbit.data.Interaction(_fe,_ff,_100,_101);
_102.initializeAction();
_102.initializeReactions();
rabbit.facade.raiseEvent(rabbit.events.newInteractionRegistered,_102);
},serializeEvent:function(e){
return {};
}};
rabbit.mobile={bind:function(_103,_104){
if(rabbit.facade.runningInApp()){
document.addEventListener(_103,_104);
}
},unbind:function(_105,_106){
if(rabbit.facade.runningInApp()){
document.removeEventListener(_105,_106);
}
},trigger:function(_107,data){
if(rabbit.facade.runningInApp()){
window.parentBody.trigger(_107,data);
}
}};
rabbit.facade=function _returnFacade(){
var _108=rabbit.event.manager;
return {_availablePlugins:[],vml:false,isIOS:navigator.userAgent.match(/iPad|iPhone/),isAndroid:navigator.userAgent.match(/Android/),registerPlugin:function registerPlugin(_109,_10a){
try{
var _10b=Array.prototype.slice.call(arguments);
_10b.shift();
_109._initialArguments=_10b;
this._availablePlugins.push(_109);
}
catch(e){
console.log(e);
}
},registerOnEvent:function registerOnEvent(_10c,_10d,_10e){
try{
if(_.isArray(_10c)){
for(var i=0;i<_10c.length;i++){
console.debug("Registering a handler for "+_10c[i]);
_108.registerOnEvent(_10c[i],_10d,_10e,true);
}
}else{
if(_.isString(_10c)){
console.debug("Registering a handler for "+arguments[0]);
_108.registerOnEvent(_10c,_10d,_10e,false);
}
}
}
catch(e){
console.error(e);
return undefined;
}
},registerOnCategoryEvent:function(_10f,_110,_111){
try{
_108.registerOnCategoryEvent(_10f,_110,_111,true);
}
catch(e){
console.error(e);
return undefined;
}
},raiseEvent:function raiseEvent(_112){
console.debug("Raising a "+arguments[0]+" event");
try{
return _108.raiseEvent.apply(_108,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_113){
var _114=document.getElementById(_113);
if(_114===null){
return;
}
console.debug("Forwarding a click event to "+_113);
_114.click();
_114.focus();
},showPage:function(){
return rabbit.result.manager.showPage.apply(rabbit.result.manager,arguments);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+"/"+rabbit.result.manager.currentPageNr;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
},getUrlPattern:function(){
return rabbit.result.manager.urlPattern;
},getCurrentPageId:function(){
return rabbit.result.manager.currentPageNr;
},getCurrentPage:function(){
return rabbit.data.pageStore.objects[rabbit.result.manager.currentPageNr];
},loadLayer:function(){
return rabbit.data.layerStore.loadLayer.apply(rabbit.data.layerStore,arguments);
},getLayer:function(){
return rabbit.ui.manager.getLayer.apply(rabbit.ui.manager,arguments);
},showLayer:function(){
return rabbit.ui.manager.showLayer.apply(rabbit.ui.manager,arguments);
},hideLayer:function(){
return rabbit.ui.manager.hideLayer.apply(rabbit.ui.manager,arguments);
},toggleLayer:function(){
return rabbit.ui.manager.toggleLayer.apply(rabbit.ui.manager,arguments);
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},getInteractionsAvailableForToolbar:function(){
return rabbit.interaction.manager.interactionsAvailableForToolbar;
},raiseInteraction:function(){
return rabbit.interaction.manager.raiseInteraction.apply(rabbit.interaction.manager,arguments);
},renderAction:function(_115){
return rabbit.interaction.manager.renderAction.apply(rabbit.interaction.manager,arguments);
},registerAction:function(){
return rabbit.interaction.manager.registerAction.apply(rabbit.interaction.manager,arguments);
},registerReaction:function(){
return rabbit.interaction.manager.registerReaction.apply(rabbit.interaction.manager,arguments);
},goBack:function(){
return rabbit.result.manager.goBack.apply(rabbit.result.manager,arguments);
},setNextPageIsARefresh:function(){
return rabbit.result.manager.setNextPageIsARefresh.apply(rabbit.result.manager,arguments);
},runningInApp:function(){
return rabbit.result.manager.fromApp;
},browserBack:function(){
history.go(-1);
},browserForward:function(){
history.go(1);
},closeBrowserWindow:function(){
window.close();
},getLayerFromStencil:function(_116){
return $(_116).closest(".layer");
},getRepositoryFromStencil:function(_117){
return $(_117).closest(".repository");
},isExport:function(){
return rabbit.result.manager.isExport;
},mobile:{bind:function(_118){
return rabbit.mobile.bind.apply(rabbit.mobile,arguments);
},unbind:function(_119){
return rabbit.mobile.unbind.apply(rabbit.mobile,arguments);
},trigger:function(_11a){
return rabbit.mobile.trigger.apply(rabbit.mobile,arguments);
}},markHighlightTouchesAsSuccessful:function(){
return rabbit.plugins.gestureHighlight.markHighlightTouchesAsSuccessful.apply(rabbit.plugins.gestureHighlight,arguments);
},"alert":function(_11b,text,_11c){
rabbit.plugins.systemAlert.alert(_11b,text,_11c);
}};
}();
rabbit.data.Base=rabbit.util.Class(function(){
this.init=function(){
this.data={};
};
this.getData=function(){
return this.data;
};
this.setData=function(data){
this.data=data;
return this;
};
});
rabbit.data.layerStore={objects:{},init:function(){
},loadLayer:function(_11d){
if(typeof this.objects[_11d]==="undefined"){
var url=null;
if(rabbit.result.manager.isExport){
var _11e=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("loadLayerExport",{layerId:_11d,browser:_11e,mode:rabbit.util.getMode()});
}else{
url=rabbit.communication.manager.getUrl("loadLayer",{prototypeId:rabbit.result.manager.currentPrototypeId,layer:_11d});
}
var _11f=(rabbit.result.manager.isExport)?"jsonp":"html";
var ajax=rabbit.communication.manager.get(url,_11f,{containerId:"__containerId__",mode:rabbit.util.getMode()},{crossDomain:rabbit.result.manager.isExport});
if(!rabbit.result.manager.isExport){
ajax.done(this.addLayerFromHtml.bind(this));
}
this.objects[_11d]=new rabbit.data.Layer(_11d,null,null);
}
return this.objects[_11d];
},addLayerFromHtml:function(html){
layerElements=$($.trim(html));
$(layerElements).children().each(function(_120,_121){
_121=$(_121);
var _122=_121.data("layer-id");
var _123=_121.data("layer-type");
var html=$.trim(_121[0].outerHTML);
if(this.objects[_122]){
this.objects[_122].data.id=_122;
this.objects[_122].data.layerType=_123;
this.objects[_122].data.html=html;
}else{
this.objects[_122]=new rabbit.data.Layer(_122,_123,html);
}
rabbit.facade.raiseEvent(rabbit.events.layerLoaded,this.objects[_122]);
}.bind(this));
}};
rabbit.data.Layer=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(id,_124,html){
this.data={id:id,layerType:_124,html:html};
};
});
rabbit.data.pageStore={objects:{},init:function(){
var _125=$("#pageNames").html();
if((_125!==null)&&(_125!=="__pageNames__")){
_125=JSON.parse(_125);
}
var _126=JSON.parse($("#pageData").html());
for(var id in _126.pages){
this.objects[id]=new rabbit.data.Page(_.extend(_126.pages[id],{id:id}));
this.objects[id].data.pageName=_125[id];
}
rabbit.event.manager.raiseEvent(rabbit.events.pageStoreLoaded);
}};
rabbit.data.Page=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
this.getUrl=function(){
if(rabbit.result.manager.isExport){
return this.data.pageName;
}else{
return rabbit.communication.manager.getUrl("pageLink",{page:this.data.id});
}
};
});
rabbit.data.folderStore={objects:{},init:function(){
var _127=JSON.parse($("#folderData").html());
for(var id in _127.folders){
this.objects[id]=new rabbit.data.Folder(_.extend(_127.folders[id],{id:id}));
}
rabbit.event.manager.raiseEvent(rabbit.events.folderStoreLoaded);
}};
rabbit.data.Folder=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
});
rabbit.data.Interaction=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(_128,_129,_12a,_12b){
this.data={stencilId:_128,interactionId:_129,uniqueId:_128+"-"+_129,action:_12a,reactions:_12b};
};
this.initializeAction=function(){
if(!_.has(rabbit.interaction.manager.actions,this.data.action.type)){
console.error("Action \""+this.data.action.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.actions[this.data.action.type].init;
if(typeof init==="function"){
init(this);
}
rabbit.interaction.manager.actions[this.data.action.type].defineEvent(this);
};
this.initializeReactions=function(){
_.each(this.data.reactions,function(_12c){
if(!_.has(rabbit.interaction.manager.reactions,_12c.type)){
console.error("Reaction \""+_12c.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.reactions[_12c.type].init;
if(typeof init==="function"){
init(this,_12c);
}
}.bind(this));
rabbit.facade.registerOnEvent(this.data.uniqueId,function(e){
_.each(this.data.reactions,function(_12d){
var _12e=parseInt(_12d.delay,10)||0;
setTimeout(function(){
rabbit.interaction.manager.reactions[_12d.type].callback(e,this,_12d);
}.bind(this),_12e);
}.bind(this));
},this,this.data.stencilId);
};
});
rabbit.data.discussionStore={writeAccess:false,name:"discussion",objects:{},init:function(){
},createDiscussion:function(_12f,_130,x,y,data){
var url=rabbit.communication.manager.getUrl("createDiscussion",{layerId:_12f});
data=data||{};
data=_.defaults(data,{title:_130,x:x,y:y,pageX:x,pageY:y,referenceId:rabbit.facade.getCurrentPageId(),pageId:rabbit.facade.getCurrentPageId(),layerContainerId:rabbit.facade.getCurrentPageId()});
return rabbit.data.discussionStore.callAjax(url,data);
},deleteDiscussion:function(_131){
delete this.objects[_131.data.id];
var url=rabbit.communication.manager.getUrl("deleteDiscussion",{layerId:_131.data.layerId});
return this.callAjax(url,{discussion:_131.data.id});
},getFromLayer:function(_132){
var url=rabbit.communication.manager.getUrl("getDiscussions",{layerId:_132});
return rabbit.data.discussionStore.callAjax(url);
},callAjax:function(url,data){
var ajax=rabbit.communication.manager.get(url,"json",data);
ajax.done(function(data){
for(var id in data.discussions){
var _133=this.objects[id];
if(_133){
_133.setData(data.discussions[id]);
}else{
_133=new rabbit.data.Discussion();
_133.setData(data.discussions[id]);
this.objects[id]=_133;
}
}
this.writeAccess=data.writeAccess;
if(data.newdiscussion){
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreAdded,this.objects[data.newdiscussion]);
}
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
}.bind(this));
return ajax;
}};
rabbit.data.Discussion=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(){
sup.init.apply(this);
this.data.title="";
this.data.entries=[];
this.data.status="";
};
this.move=function(x,y,_134,_135,_136,_137,_138,_139){
this.data.x=x;
this.data.y=y;
this.data.pageX=_134;
this.data.pageY=_135;
this.data.referenceId=_136;
this.data.pageId=_137;
this.data.layerId=_138;
this.data.layerContainerId=_139;
var url=rabbit.communication.manager.getUrl("moveDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,x:x,y:y,pageX:_134,pageY:_135,referenceId:_136,pageId:_137,layerId:_138,layerContainerId:_139});
};
this.rename=function(_13a){
if(this.data.title===_13a){
return;
}
var _13b=this.data.title;
this.data.title=_13a;
var url=rabbit.communication.manager.getUrl("renameDiscussion",{layerId:this.data.layerId});
var ajax=rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,title:this.data.title});
var _13c=t("result.discussion.title-changed").replace("__oldTitle__",_13b).replace("__newTitle__",_13a);
this.addEntry(_13c);
return ajax;
};
this.addEntry=function(text){
var url=rabbit.communication.manager.getUrl("postEntryDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,text:text});
};
this.setState=function(_13d){
var url=rabbit.communication.manager.getUrl("setStateDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,state:_13d});
};
});
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
rabbit.plugins.background=function(){
var _13e=rabbit.facade;
return {init:function init(){
},adjustBackgroundImage:function adjustBackgroundImage(_13f){
var _140=document.getElementById("borderDiv");
_140.style.width=_13f.data.width+"px";
_140.style.height=_13f.data.height+"px";
var _141=document.getElementById("repositorybackground");
_141.setAttribute("width",_13f.data.width);
_141.setAttribute("height",_13f.data.height);
_141.setAttribute("style","width:"+_13f.data.width+"px;height:"+_13f.data.height+"px;");
this._replaceBackgroundImage(_13f);
},_replaceBackgroundImage:function _replaceBackgroundImage(_142){
var _143,_144;
if(!_13e.vml){
_143=document.getElementById("repositorybackground");
_144=_143.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_144.setAttribute("width",_142.data.width);
_144.setAttribute("height",_142.data.height);
if(_142.data.image!==""){
_144.setAttribute("display","inherit");
_144.setAttributeNS("http://www.w3.org/1999/xlink","href",_142.data.image);
}else{
_144.setAttribute("display","none");
_144.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
_143=document.getElementById("repositorybackground");
_144=document.createElement("img");
_144.style.width="";
_144.style.height="";
_144.setAttribute("src",_142.data.image.replace(/_(\d)+\Z/,""));
_143.replaceChild(_144,_143.firstChild);
if(_142.data.image===""){
_144.style.display="none";
}else{
_144.style.display="inline";
this._adjustBackgroundImgSize(_142.data.width,_142.data.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_145,_146){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_145+", "+_146+");",100);
return;
}
var _147=document.images[0].width;
var _148=document.images[0].height;
if(_147/_148>_145/_146){
document.images[0].width=_145;
document.images[0].height=_148*_145/_147;
}else{
document.images[0].width=_147*_146/_148;
document.images[0].height=_146;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
rabbit.plugins.gps=function(){
var _149=rabbit.facade;
var _14a={};
var _14b=[];
var _14c={nyc:{latitude:40.714353,longitude:-74.005973},paris:{latitude:48.856614,longitude:2.352222},pidoco:{latitude:52.509561,longitude:13.451579},warschauer60:{latitude:52.509754,longitude:13.451715},alexanderplatz:{latitude:52.521832,longitude:13.413168}};
return {trackPositionWithJavaScript:true,trackPosition:false,init:function init(){
this.startTrackPositon();
_149.registerOnEvent("positionChanged",this.positionChanged,this);
_149.registerAction("gps",{availableOnDesktop:false,init:function(){
rabbit.plugins.gps.trackPosition=true;
},render:function(_14d){
if(_14d.trigger==="both"){
return t("interaction.action.gps.userDescription.both");
}else{
if(_14d.trigger==="enter"){
return t("interaction.action.gps.userDescription.enter");
}else{
if(_14d.trigger==="leave"){
return t("interaction.action.gps.userDescription.leave");
}
}
}
},defineEvent:function(_14e){
var area=JSON.parse(_14e.data.action.area);
rabbit.plugins.gps.registerMoveInOutZone(area.latitude,area.longitude,area.distance,_14e.data.action.trigger,function(e){
rabbit.interaction.manager.raiseInteraction(_14e,e);
});
}});
},startTrackPositon:function(){
var _14f=null;
var _150=5000;
if(navigator.geolocation){
var _151=function(){
if(rabbit.plugins.gps.trackPosition){
if(rabbit.plugins.gps.trackPositionWithJavaScript){
navigator.geolocation.getCurrentPosition(function(_152){
rabbit.plugins.gps.positionChanged(_152.coords);
_14f=setInterval(_151,_150);
},function(){
console.log("ERROR GPS!");
},{maximumAge:_150,enableHighAccuracy:true,timeout:10000});
}
clearInterval(_14f);
}
};
_14f=setInterval(_151,_150);
}
},moveToDummyPosition:function(name){
if(!_.has(_14c,name)){
throw "Dummy position "+name+" not found.";
}
this.positionChanged({latitude:_14c[name].latitude,longitude:_14c[name].longitude});
},registerMoveInOutZone:function(_153,_154,_155,_156,_157){
_14b.push({latitude:_153,longitude:_154,distance:_155,callback:_157,trigger:_156,wasInArea:false});
},positionChanged:function(_158){
for(var i=0;i<_14b.length;i++){
var area=_14b[i];
var _159=this.isPositionInArea(_158,area);
if(_159&&!area.wasInArea&&area.trigger==="enter"||!_159&&area.wasInArea&&area.trigger==="leave"||_159!==area.wasInArea&&area.trigger==="both"){
area.callback();
}
area.wasInArea=_159;
}
},isPositionInArea:function(_15a,area){
return this.calculateDistance(_15a.latitude,_15a.longitude,area.latitude,area.longitude)<area.distance;
},calculateDistance:function(lat1,lon1,lat2,lon2){
var _15b=function(deg){
return deg*(Math.PI/180);
};
var R=6371;
var dLat=_15b(lat2-lat1);
var dLon=_15b(lon2-lon1);
var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(_15b(lat1))*Math.cos(_15b(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
var d=R*c;
return d*1000;
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gps);
rabbit.plugins.keypress=function(){
var _15c=rabbit.facade;
return {init:function(){
_15c.registerAction("keypress",{makeableOnDesktop:true,render:function(_15d){
return t("interaction.action.keypress.userDescription");
},defineEvent:function(_15e){
var _15f=_15e.data.action.sequence;
if(_15f){
Mousetrap.bind(_15f,function(){
rabbit.interaction.manager.raiseInteraction(_15e,{});
});
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.keypress);
rabbit.plugins.sound=function(){
var _160=rabbit.facade;
return {audiofiles:{},audios:{},init:function(){
_160.registerReaction("sound",{init:function(_161,_162){
var id=_162.soundUploader;
if(rabbit.result&&rabbit.result.manager.isExport){
url=rabbit.communication.manager.getUrl("mp3Export",{audioId:id});
}else{
url=rabbit.communication.manager.getUrl("mp3",{prototypeId:rabbit.result.manager.currentPrototypeId,audioId:id});
}
rabbit.plugins.sound.audiofiles[id]=new Audio(url);
},callback:function(_163,_164,_165){
rabbit.plugins.sound.audiofiles[_165.soundUploader].play();
if(_165.duration!==""){
setTimeout(function(){
rabbit.plugins.sound.audiofiles[_165.soundUploader].pause();
rabbit.plugins.sound.audiofiles[_165.soundUploader].currentTime=0;
},_165.duration);
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.sound);
rabbit.plugins.systemAlert=function(){
var _166=rabbit.facade;
return {init:function(){
_166.registerReaction("systemAlert",{callback:function(_167,_168,_169){
this.alert(_169.title,_169.text,_169.buttonName);
}.bind(this)});
},alert:function(_16a,text,_16b){
if(_166.runningInApp()){
rabbit.facade.mobile.trigger("pidoco:systemAlert",{title:_16a,text:text,buttonName:_16b});
}else{
alert(text);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.systemAlert);
rabbit.plugins.flip=function(){
var _16c=rabbit.facade;
return {init:function(){
_16c.registerAction("flip",{makeableOnDesktop:false,render:function(_16d){
return t("interaction.action.flip.userDescription");
},defineEvent:function(_16e){
new Fliptiltshake("flip",function(){
rabbit.interaction.manager.raiseInteraction(_16e,{});
});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.flip);
rabbit.plugins.tilt=function(){
var _16f=rabbit.facade;
return {paused:false,init:function(){
_16f.registerAction("tilt",{makeableOnDesktop:false,render:function(_170){
return t("interaction.action.tilt.userDescription");
},defineEvent:function(_171){
new Fliptiltshake("tilt",{rotation:_171.data.action.rotation,direction:(_171.data.action.direction==="both")?null:_171.data.action.direction,angle:_171.data.action.angle,callback:function(){
if(rabbit.plugins.tilt.paused){
return;
}
var _172=rabbit.interaction.manager.raiseInteraction(_171,{});
if(_172){
rabbit.plugins.tilt.paused=true;
setTimeout(function(){
rabbit.plugins.tilt.paused=false;
},500);
}
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.tilt);
rabbit.plugins.shake=function(){
var _173=rabbit.facade;
return {init:function(){
_173.registerAction("shake",{makeableOnDesktop:false,render:function(_174){
return t("interaction.action.shake.userDescription");
},defineEvent:function(_175){
var _176=(_173.isIOS)?_175.data.action.intensity:_175.data.action.intensity*10;
new Fliptiltshake("shake",{threshold:_176,durationMin:_175.data.action.duration,callback:function(){
rabbit.interaction.manager.raiseInteraction(_175,{});
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.shake);
rabbit.plugins.orientation=function(){
var _177=rabbit.facade;
var _178=null;
return {trackPositionWithJavaScript:true,trackPosition:false,init:function(){
rabbit.facade.mobile.bind("pidoco:orientationchange",function(e){
rabbit.plugins.orientation.orientationChanged(e.data.orientation);
});
window.addEventListener("orientationchange",function(){
rabbit.plugins.orientation.orientationChanged(window.orientation);
});
_177.registerAction("orientation",{makeableOnDesktop:false,render:function(_179){
var _17a=_179.data.action;
if(_17a.direction==="portrait"){
return t("interaction.action.orientation.userDescription.portrait");
}else{
return t("interaction.action.orientation.userDescription.landscape");
}
},defineEvent:function(_17b){
_177.registerOnEvent("orientationChanged",function(_17c){
if(_17b.data.action.direction==_17c){
rabbit.interaction.manager.raiseInteraction(_17b,{});
}
},this);
}});
},orientationChanged:function(_17d){
var _17e=(_17d===90||_17d===-90)?"landscape":"portrait";
if(_178!=_17e){
_178=_17e;
_177.raiseEvent("orientationChanged",_17e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.orientation);
rabbit.plugins.mobileInteractionTrigger={groupTopOffset:30,template:"<div class=\"trigger-container\">"+"</div>",interactions:{},triggerGroups:{},init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.container=$(this.template).appendTo("#borderDiv");
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,this.newInteractionRegistered,this);
rabbit.facade.registerOnEvent(rabbit.events.showLayer,this.showLayerListener,this);
rabbit.facade.registerOnEvent(rabbit.events.hideLayer,this.hideLayerListener,this);
},newInteractionRegistered:function(_17f){
var _180=_17f.data.action;
var _181=typeof rabbit.interaction.manager.actions[_180.type].makeableOnDesktop==="function"?rabbit.interaction.manager.actions[_180.type].makeableOnDesktop(_180):rabbit.interaction.manager.actions[_180.type].makeableOnDesktop;
if(_181){
return;
}
if(this.interactions[_17f.data.uniqueId]){
return;
}
var _182=_17f.data.stencilId;
var _183=document.getElementById(_182);
if($(_183).parents(".transition-wrapper:first").length){
return;
}
var _184=$(_183).closest(".mobile-interaction-potential-trigger");
var _185=_184.attr("id");
var _186=$(_184).position();
var _187=true;
if($(_183).hasClass("layer")){
_187=false;
}
var _188=this.triggerGroups[_185];
if(!_188){
_188=$("<div class=\"mobile-interactions-trigger-group-"+_185+" mobile-interactions-trigger-group\" data-trigger-id=\""+_185+"\"></div>");
this.triggerGroups[_185]=_188;
$(_184).mouseenter(function(e){
this.displayInteractions(_188);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_187){
var id=$(_183).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
_188.css({left:_186.left,top:_186.top-this.groupTopOffset});
this.container.append(_188);
$(_188).mouseenter(function(e){
this.displayInteractions(_188);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_187){
var id=$(_183).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
}
var _189=$("<div class=\"active interaction-trigger interaction-trigger-"+_17f.data.uniqueId+" interaction-trigger-"+_180.type+"\" title=\""+t("interaction-trigger-"+_17f.data.action.type+"-tooltip")+"\">"+t("trigger-label-"+_180.type)+"</div>");
if(!_187){
_189.addClass("interaction-trigger-layer-"+_182.replace("-layer",""));
}
_189.click(function(){
rabbit.facade.raiseInteraction(_17f);
});
_188.append(_189);
this.interactions[_17f.data.uniqueId]=_17f;
},hideAllInteractions:function(){
$(".mobile-interactions-trigger-group").removeClass("visible");
},displayInteractions:function(_18a){
$(".mobile-interactions-trigger-group").removeClass("visible");
this.updateTriggerGroupPosition(_18a);
$(_18a).addClass("visible");
},showLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).addClass("active");
$(".mobile-interactions-trigger-group").each(function(_18b,_18c){
this.updateTriggerGroupPosition($(_18c));
}.bind(this));
}
},hideLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).removeClass("active");
}
},updateTriggerGroupPosition:function(_18d){
var _18e=$("#"+_18d.data("trigger-id"));
if(_18e.length){
var _18f=_18e.position();
$(_18d).css({left:_18f.left,top:_18f.top-this.groupTopOffset});
}
},updateAllTriggerGroupPosition:function(){
for(var _190 in this.triggerGroups){
this.updateTriggerGroupPosition(this.triggerGroups[_190]);
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.mobileInteractionTrigger);
rabbit.plugins.toolbar={template:"<div class=\"toolbar\">"+"<div class=\"left\">"+"<a class=\"edit-btn btn\" href=\"#\"><span class=\"icon\" /><%= t('toolbar.edit') %></a>"+"<a class=\"sketched-btn btn\" href=\"#\"><%= t('toolbar.sketched') %></a> "+"<a class=\"sketched-arial-btn btn\" href=\"#\"><%= t('toolbar.sketchedArial') %></a> "+"<a class=\"plain-btn btn\" href=\"#\"><%= t('toolbar.plain') %></a>"+"</div>"+"<div class=\"center\">"+"</div>"+"</div>",init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.toolbar=$($.trim(_.template(this.template)())).appendTo(".toolbar-wrapper>.container");
rabbit.facade.registerOnEvent(rabbit.events.pageStoreLoaded,this.pageStoreLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
},pageStoreLoaded:function(){
this.mode=document.getElementById("mode").innerHTML;
this.changeLinks(rabbit.result.manager.currentPageNr);
},pageLoaded:function(page,_191){
this.changeLinks(page.data.id);
},changeLinks:function(_192){
var _193=rabbit.communication.manager.buildEditUrl(rabbit.result.manager.currentPageNr);
var _194=rabbit.facade.getUrlPattern().replace("__page__",_192);
var _195=_194.replace(this.mode,"sketched").replace("?fontFamily=arial","");
var _196=_194.replace(this.mode,"sketchedArial");
var _197=_194.replace(this.mode,"plain").replace("?fontFamily=arial","");
this.toolbar.find(".edit-btn").attr("href",_193);
this.toolbar.find(".sketched-btn").attr("href",_195);
this.toolbar.find(".sketched-arial-btn").attr("href",_196);
this.toolbar.find(".plain-btn").attr("href",_197);
}};
rabbit.facade.registerPlugin(rabbit.plugins.toolbar);
rabbit.plugins.overlay={shownOverlays:[],rectangles:{},init:function(){
$("#borderDiv").append("<div class=\"overlay-background\"></div>");
rabbit.facade.registerReaction("showOverlay",{init:function(_198,_199){
this.prepareOverlay(_198.data.uniqueId,_199.target);
}.bind(this),callback:function(_19a,_19b,_19c){
this.showOverlay(_19b.data.uniqueId,_19c.target);
}.bind(this)});
rabbit.facade.registerReaction("hideOverlay",{callback:function(_19d,_19e,_19f){
this.hideOverlay();
}.bind(this)});
},prepareOverlay:function(_1a0,_1a1){
var _1a2=$("<div></div>");
var id="overlay-"+_1a0;
var page=rabbit.data.pageStore.objects[_1a1];
var url,ajax;
if(page){
_1a2.addClass("overlay").addClass("repository").attr("id",id).attr("data-original-layer-id",_1a1).attr("data-page-id",_1a1).appendTo("body").css({width:page.data.width+"px",height:page.data.height+"px"}).data("has-rectangle",false);
this.loadRectangle(page.data.width,page.data.height);
rabbit.ui.manager.createWrappers(id,_1a1,true);
rabbit.facade.loadLayer(_1a1);
}
},loadRectangle:function(_1a3,_1a4){
if(this.hasRectangle(_1a3,_1a4)){
return;
}
if(rabbit.result.manager.isExport){
var _1a5=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("rectangleExport",{height:_1a4,width:_1a3,mode:rabbit.util.getMode()});
ajax=rabbit.communication.manager.get(url,"jsonp",{},{crossDomain:rabbit.result.manager.isExport});
}else{
url=rabbit.communication.manager.getUrl("rectangle",{prototypeId:rabbit.result.manager.currentPrototypeId,mode:rabbit.facade.getMode()});
ajax=rabbit.communication.manager.get(url,"html",{height:_1a4,width:_1a3});
ajax.success(function(html){
var _1a6=$(html).children().first();
this.setRectangle(_1a3,_1a4,_1a6);
}.bind(this));
}
},setRectangle:function(_1a7,_1a8,html){
this.rectangles[_1a7+"x"+_1a8]=html;
},getRectangle:function(_1a9,_1aa){
return $(this.rectangles[_1a9+"x"+_1aa]).clone();
},hasRectangle:function(_1ab,_1ac){
return typeof this.rectangles[_1ab+"x"+_1ac]!=="undefined";
},showOverlayBackground:function(){
$(".overlay-background").show();
},hideOverlayBackground:function(){
$(".overlay-background").hide();
},showOverlay:function(_1ad,_1ae){
var id="overlay-"+_1ad;
var page=rabbit.data.pageStore.objects[_1ae];
var _1af=rabbit.facade.getCurrentPage();
var _1b0=$("#"+id);
if(page){
var _1b1=page.data.width;
var _1b2=page.data.height;
if(!_1b0.data("has-rectangle")){
_1b0.append(this.getRectangle(_1b1,_1b2));
_1b0.data("has-rectangle",true);
}
var _1b3=$("#repository").offset();
var _1b4=$(document).height()>$(window).height();
var top,left;
if(_1b4){
top=(window.innerHeight-parseInt(_1b2))/2;
left=(rabbit.facade.getMode()==="plain")?(_1af.data.width-parseInt(_1b1))/2:(window.innerWidth-parseInt(_1b1))/2;
}else{
top=_1b3.top+(_1af.data.height-parseInt(_1b2))/2;
left=_1b3.left+(_1af.data.width-parseInt(_1b1))/2;
}
_1b0.show().css({top:top,left:left});
rabbit.ui.manager.showPage($("#"+id),_1ae);
this.showOverlayBackground();
this.shownOverlays.push(_1b0);
}else{
}
},hideOverlay:function(){
var _1b5=this.shownOverlays.pop();
_1b5.hide();
this.hideOverlayBackground();
}};
rabbit.facade.registerPlugin(rabbit.plugins.overlay);
rabbit.plugins.scrollTo=function(){
var _1b6=rabbit.facade;
return {init:function(){
_1b6.registerReaction("scrollTo",{callback:function(_1b7,_1b8,_1b9){
this.scrollTo(_1b9.position,_1b9.duration);
}.bind(this)});
},scrollTo:function(_1ba,_1bb){
if(_1ba==="bottom"){
$("html, body").animate({scrollTop:$(document).height()},parseInt(_1bb));
}else{
$("html, body").animate({scrollTop:0},parseInt(_1bb));
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.scrollTo);
rabbit.plugins.startDialer={shownOverlays:[],rectangles:{},init:function(){
rabbit.facade.registerReaction("startDialer",{callback:function(_1bc,_1bd,_1be){
this.startDialer(_1be.phoneNumber);
}.bind(this)});
},startDialer:function(_1bf){
window.location.href="tel:"+_1bf;
}};
rabbit.facade.registerPlugin(rabbit.plugins.startDialer);
rabbit.plugins.gestureHighlight=function(){
return {init:function(){
},touchListener:function(e){
this.emptyTouches();
for(var i=0;i<e.targetTouches.length;i++){
var _1c0=e.targetTouches[i];
var _1c1=this.makeCircle(_1c0.pageX-this.offset.left,_1c0.pageY-this.offset.top);
this.touchViewer[0].appendChild(_1c1);
}
e.preventDefault();
},touchEndListener:function(){
setTimeout(function(){
var _1c2=this.touchViewer.find("div");
_1c2.each(function(){
if(!$(this).hasClass("touch-success")){
$(this).addClass("touch-fail");
}
});
setTimeout(function(){
_1c2.fadeOut();
},500);
}.bind(this),300);
},touchSuccess:function(){
var _1c3=this.touchViewer.find("div");
_1c3.each(function(){
$(this).removeClass("touch-fail");
$(this).addClass("touch-success");
});
setTimeout(function(){
_1c3.fadeOut();
},500);
},makeCircle:function(cx,cy){
var el=document.createElement("div");
el.setAttribute("class","touch");
el.style.left=cx+"px";
el.style.top=cy+"px";
return el;
},emptyTouches:function(){
this.touchViewer[0].innerHTML="";
},markHighlightTouchesAsSuccessful:function(){
var _1c4=document.getElementsByClassName("touch");
for(var i=0;i<_1c4.length;i++){
_1c4[i].setAttribute("class",_1c4[i].getAttribute("class")+" touch-success");
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gestureHighlight);
rabbit.plugins.hold={init:function(){
rabbit.facade.registerAction("hold",{makeableOnDesktop:true,render:function(_1c5){
return t("interaction.action.hold.userDescription");
},defineEvent:function(_1c6){
var _1c7=Hammer(document.getElementById(_1c6.data.stencilId),{hold_timeout:_1c6.data.action.timeout});
_1c7.on("hold",function(e){
rabbit.interaction.manager.raiseInteraction(_1c6,{});
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.hold);
rabbit.plugins.valueChanged={listenedGroups:{},init:function(){
rabbit.facade.registerAction("booleanValueChanged",{makeableOnDesktop:true,render:function(_1c8){
return t("interaction.action.booleanValueChanged.userDescription");
},defineEvent:function(_1c9){
var _1ca=_1c9.data.stencilId;
var _1cb=$("#"+_1ca);
if(_1cb.hasClass("radiobutton")){
var _1cc=_1cb.find("input:first").attr("name");
if(!_.has(rabbit.plugins.valueChanged.listenedGroups,_1cc)){
rabbit.plugins.valueChanged.listenedGroups[_1cc]=[];
$("input[name=\""+_1cc+"\"]").change(function(e){
var _1cd=$(e.target).val();
var _1ce=$(e.target).data("old-selected-radiobutton-id");
for(var i=0;i<rabbit.plugins.valueChanged.listenedGroups[_1cc].length;i++){
var _1cf=rabbit.plugins.valueChanged.listenedGroups[_1cc][i];
var _1d0=_1cf.data.stencilId;
var _1d1=_1cf.data.action.selected;
if(_1cd===_1d0&&_1d1==="yes"||_1ce===_1d0&&_1d1==="no"||(_1cd===_1d0||_1ce===_1d0)&&_1d1==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1cf,rabbit.interaction.manager.serializeEvent(e));
}
}
$("input[name=\""+_1cc+"\"]").data("old-selected-radiobutton-id",_1cd);
});
}
rabbit.plugins.valueChanged.listenedGroups[_1cc].push(_1c9);
}else{
if(_1cb.hasClass("checkbox")){
$("#"+_1c9.data.stencilId+" input:first").change(function(e){
if($(e.target).is(":checked")===(_1c9.data.action.selected==="yes")||_1c9.data.action.selected==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1c9,rabbit.interaction.manager.serializeEvent(e));
}
});
}else{
if(_1cb.hasClass("iphoneSwitch")){
var _1d2=function(id){
if(_1c9.data.stencilId===id){
rabbit.interaction.manager.raiseInteraction(_1c9);
}
};
if(_1c9.data.action.selected==="yes"||_1c9.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOffSwitch,_1d2,this);
}
if(_1c9.data.action.selected==="no"||_1c9.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOnSwitch,_1d2,this);
}
}
}
}
}});
rabbit.facade.registerAction("stringValueChanged",{makeableOnDesktop:true,render:function(_1d3){
return t("interaction.action.stringValueChanged.userDescription");
},defineEvent:function(_1d4){
$("#"+_1d4.data.stencilId).change(function(e){
if(e.target.value===_1d4.data.action.value){
rabbit.interaction.manager.raiseInteraction(_1d4,rabbit.interaction.manager.serializeEvent(e));
}
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.valueChanged);
rabbit.plugins.footnote={name:"export",detailFootnotes:{},discussionFootnotes:{},counterDetailFootnotes:0,counterDiscussionFootnotes:0,placedMarkers:[],placedMarkersInPageCoordinateSystem:[],markerSize:20,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,function(_1d5){
var _1d6=document.getElementById(_1d5.getData().stencilId);
var _1d7=_1d6.hasAttribute("data-stencil-id");
var _1d8=_1d6.hasAttribute("data-layer-id");
var id=_1d5.getData().stencilId;
if(!_1d7&&!_1d8&&!this.detailFootnotes[id]){
this.detailFootnotes[id]=_.size(this.detailFootnotes)+1;
}
},this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,function(){
$(".has-footnote").each(function(_1d9,_1da){
var _1db=_1da.getAttribute("data-stencil-id");
if(!_1db){
_1db=_1da.getAttribute("data-layer-id");
}
if(!this.detailFootnotes[_1db]){
this.detailFootnotes[_1db]=_.size(this.detailFootnotes)+1;
}
}.bind(this));
},this);
},showAllFootnotes:function(){
this.hideFootnotes();
this.showDiscussionFootnotes();
this.showDetailFootnotes();
},showFootnote:function(_1dc,x,y,type,_1dd,_1de,_1df,_1e0,text,_1e1){
var _1e2=_1dc.offset();
var _1e3=x;
var _1e4=y;
if(!_1df){
_1e3-=_1e2.left;
_1e4-=_1e2.top;
}
var _1e5;
if(!_1de){
if(type=="detail"){
_1e5=(this.counterDetailFootnotes++)+1;
}else{
if(type=="discussion"){
_1e5=this.getDiscussionLetters(this.counterDiscussionFootnotes++);
}
}
var _1e6=$("<div class=\"footnote-marker footnote-marker-"+type+"\">"+_1e5+"</div>").css({left:_1e3,top:_1e4});
_1dc.append(_1e6);
}
this.placedMarkers.push({stencilOrLayerId:_1dd,stencilUniqueId:_1dc.attr("id"),type:type,index:_1e5,x:x,y:y,outsideOfPage:_1de,inStencilInteraction:_1df,target:_1e0,text:text,footnoteId:_1e1,footnoteElement:_1e6});
},getShownFootnoteIndexes:function(type){
var _1e7={};
for(var i=0;i<this.placedMarkers.length;i++){
var _1e8=this.placedMarkers[i];
if(!type||_1e8.type==type){
_1e7[_1e8.index]={index:_1e8.index,stencilUniqueId:_1e8.stencilUniqueId,outsideOfPage:_1e8.outsideOfPage,inStencilInteraction:_1e8.inStencilInteraction,stencilOrLayerId:_1e8.stencilOrLayerId,target:_1e8.target,text:_1e8.text,footnoteId:_1e8.footnoteId};
}
}
return _1e7;
},hideFootnotes:function(){
this.counterDetailFootnotes=0;
this.counterDiscussionFootnotes=0;
this.placedMarkers=[];
$(".footnote-marker, .footnote-marker-line").remove();
},showDetailFootnotes:function(_1e9){
for(var _1ea in this.detailFootnotes){
var _1eb=false;
var _1ec=$("[data-stencil-id=\""+_1ea+"\"], .wrapper[data-layer-id=\""+_1ea+"\"][data-layer-id=\""+_1e9+"\"]");
var _1ed=null,text=null;
if(!_1ec.length){
_1ec=$("#"+_1ea);
_1eb=true;
_1ed=_1ec.attr("data-href");
text=_.str.clean(_1ec.text());
text=_.str.truncate(text,20);
_1ea=null;
}
for(var i=0;i<_1ec.length;i++){
var _1ee=$(_1ec.get(i));
if(!_1ee.closest(".wrapper[data-layer-id=\""+_1e9+"\"]").length){
continue;
}
var _1ef=_1ee.offset();
var _1f0=_1ee.width();
if(_1eb){
_1f0=_1ee.width()/2;
}
var x=_1ef.left+_1f0;
var y=_1ef.top-20;
var _1f1=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_1f1.x,y:_1f1.y});
if(_1eb){
var _1f2=_1ee.position();
_1f1.x=_1f2.left+_1f0+(x-_1f1.x);
_1f1.y=_1f2.top-20+(y-_1f1.y);
}
this.showFootnote(_1ee,_1f1.x,_1f1.y,"detail",_1ea,_1f1.outsideOfPage,_1eb,_1ed,text);
}
}
this.sortFootenotes();
},sortFootenotes:function(){
this.placedMarkers=_.sortBy(this.placedMarkers,function(_1f3){
return ($(_1f3.footnoteElement).offset())?$(_1f3.footnoteElement).offset().left:100000;
});
for(var i=0;i<this.placedMarkers.length;i++){
var _1f4=this.placedMarkers[i].footnoteElement;
$(_1f4).text(i+1);
this.placedMarkers[i].index=i+1;
}
},getShownDetailFootnotes:function(){
return this.getShownFootnoteIndexes("detail");
},getDiscussionLetters:function(_1f5){
var v="abcdefghijklmnopqrstuvwxyz".split("");
var _1f6="";
var nr=Math.floor(_1f5/26);
var mod=_1f5%26;
for(var j=1,jj=1;j<=nr;j=Math.pow(26,jj)+1,jj++){
_1f6+=v[(nr-1)%26];
}
_1f6+=v[mod];
return _1f6;
},showDiscussionFootnotes:function(_1f7){
var _1f8="abcdefghijklmopqrestuvwxyz".split("");
var _1f9=$("#repository").offset();
var _1fa=this.discussionFootnotes[_1f7];
for(var i=0;i<_1fa.length;i++){
var _1fb=_1fa[i];
var _1fc=_1fb.referenceId;
var _1fd=$(".wrapper-"+_1f7+">.layer [data-stencil-id=\""+_1fc+"\"]");
if(_1fd.length===0){
_1fd=$("[data-page-id=\"page0001\"]");
}
for(var j=0;j<_1fd.length;j++){
var _1fe=$(_1fd.get(j));
var _1ff=_1fe.offset();
var x=_1ff.left+_1fb.x;
var y=_1ff.top+_1fb.y;
var _200=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_200.x,y:_200.y});
this.showFootnote(_1fe,_200.x,_200.y,"discussion",_1fb.id,_200.outsideOfPage,null,null,null,_1fb.id);
}
}
},getShownDiscussionFootnotes:function(){
return this.getShownFootnoteIndexes("discussion");
},findPosition:function(x,y,_201,deep){
deep=deep||1;
var xMin=0-2*this.markerSize;
var yMin=0-2*this.markerSize;
var xMax=$("#repository").width()+2*this.markerSize;
var yMax=$("#repository").height()+2*this.markerSize;
if(x<xMin||x>xMax||y<yMin||y>yMax){
return {outsideOfPage:true};
}else{
return this._findPosition(x,y,_201,deep);
}
},_findPosition:function(x,y,_202,deep){
var _203={x:x,y:y,outsideOfPage:false};
var _204=false;
var _205=null;
var _206=null;
var _207=null;
var _208=null;
var xMax=$("#repository").width()-this.markerSize;
var yMax=$("#repository").height()-this.markerSize;
if(x<0){
_202="x";
_204=true;
}else{
if(y<0){
_202="y";
_204=true;
}else{
if(x>xMax){
_202="x";
_204=true;
}else{
if(y>yMax){
_202="y";
_204=true;
}else{
for(var i=0;i<this.placedMarkers.length;i++){
var _209=true;
var _20a=true;
var _20b=this.placedMarkersInPageCoordinateSystem[i];
var _20c=x-_20b.x;
if(Math.abs(_20c)<this.markerSize){
_209=false;
if(_20c>0){
_205=Math.abs(_20c);
}else{
_206=Math.abs(_20c);
}
}
var _20d=y-_20b.y;
if(Math.abs(_20d)<this.markerSize){
_20a=false;
if(_20d>0){
_207=Math.abs(_20d);
}else{
_208=Math.abs(_20d);
}
}
if(!_209&&!_20a){
_204=true;
break;
}
}
}
}
}
}
_203.x=Math.min(_203.x,$("#repository").width()-2*this.markerSize);
_203.y=Math.min(_203.y,$("#repository").height()-2*this.markerSize);
if(_204&&deep<100){
if(_202=="x"){
var _20e=true;
if(_206===null&&x<xMax||_205!==null&&_206<_205||x<0){
_20e=false;
}
if(_20e){
_203.x=x-this.markerSize;
}else{
_203.x=x+this.markerSize;
}
}
if(_202=="y"){
var _20f=true;
if(_208===null&&y<yMax||_207!==null&&_208<_207||y<0){
_20f=false;
}
if(_20f){
_203.y=y-this.markerSize;
}else{
_203.y=y+this.markerSize;
}
}
return this.findPosition(_203.x,_203.y,(_202==="x")?"y":"x",++deep);
}else{
return _203;
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.footnote);
rabbit.plugins.stencilHighlighter={init:function(){
},highlightStencil:function(_210){
var _211=$("<div class=\"stencil-highlighter-highlighted\"></div>");
_210.append(_211);
},hideHighlightLayer:function(_212){
$(".layer[data-layer-id=\""+_212+"\"] .stencil .stencil-highlighter-highlighted").remove();
},showHighlightLayer:function(_213){
this.hideHighlightLayer(_213);
var _214=$(".layer[data-layer-id=\""+_213+"\"] .stencil");
for(var i=0;i<_214.length;i++){
this.highlightStencil($(_214.get(i)));
}
},deopacify:function(){
$(".stencil-highlighter-opacifyied").removeClass("stencil-highlighter-opacifyied");
},opacifyExceptLayer:function(_215){
this.deopacify();
var _216=$(".stencil");
for(var i=0;i<_216.length;i++){
var _217=$(_216.get(i));
if(!_217.closest(".layer[data-layer-id=\""+_215+"\"]").length){
_217.addClass("stencil-highlighter-opacifyied");
}
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.stencilHighlighter);
rabbit.plugins.tinymcelinks={init:function(){
rabbit.facade.registerOnEvent("pageReady",function(){
var _218=document.querySelectorAll(".layer");
for(var i=0;i<_218.length;i++){
this.activateLinksForLayer(_218[i]);
}
},this);
rabbit.facade.registerOnEvent("layerStoreInserted",this.activateLinksForLayer,this);
},activateLinksForLayer:function(_219){
var _21a=_219.querySelectorAll(".default-text2-container a[href]");
for(var i=0;i<_21a.length;i++){
var link=_21a[i];
if(!link.id){
link.id=Math.floor(Math.random()*1000000000);
}
var id=link.id;
var _21b=link.getAttribute("href");
rabbit.interaction.manager.registerInteraction(id,"tinymce-interaction-"+id,{"button":"left","id":"tinymce-action-"+id,"numberOfFinger":"1","type":"click"},[{"delay":"0","id":"tinymce-reaction-"+id,"options":"reloadOnly","target":_21b,"transition":"none","type":"showPage"}]);
link.className=link.className+" pidoco-clickable-element";
link.setAttribute("data-href",_21b);
link.removeAttribute("href");
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.tinymcelinks);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_21c){
_21c=_21c.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_21c);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
$("#"+id+"-input").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.textinput=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_21d){
$(_21d).find(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.textinput);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.combobox=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_21e){
$(_21e).find(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.combobox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _21f=600;
var _220=".accordion-header";
var _221=".accordion-content";
var _222="accordion-active";
var _223=30;
var _224=function(_225){
var _226=$(_225).parents().children(_220);
var _227=_226.index(_225);
return _227;
};
var _228=function(_229){
return $(_229).parent().parent().parent().attr("id");
};
var _22a=function(_22b){
return $("#"+_22b).find(_220).length;
};
var _22c=function(_22d,_22e,_22f){
var _230=$("#"+_22d+">div>"+_220).length;
$("#"+_22d).find(_221+">div, "+_221+">iframe").css("position","relative").css("left","0px").css("top","0px").css("width",_22e+"px").css("height",(_22f-_230*_223-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_231,_232,_233){
var _234=_22a(id);
if(_233<1){
_233=1;
}
if(_233>_234){
_233=_234;
}
_233--;
$("#"+id).find(_220).click({"accordionObject":this},this.raiseClickCallback);
_22c(id,_231,_232);
this.showTab(id,_233,false);
},showTab:function(id,_235,_236){
this._accordions[id]=_235;
if(_236){
$("#"+id).find(_221).slideUp(_21f);
}else{
$("#"+id).find(_221).hide();
}
var _237=$("#"+id).find(_220).removeClass(_222)[_235];
$(_237).addClass(_222).next().slideDown(_21f,function onCompleteCallback(){
if(BrowserDetect.browser=="MSIE"){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(that,_238){
var _239=_224(_238);
var _23a=_228(_238);
if(that._accordions[_23a]===_239){
return;
}
rabbit.facade.markHighlightTouchesAsSuccessful();
that.showTab(_23a,_239,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _23b=rabbit.facade;
return {init:function init(){
_23b.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_23b.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _23c=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_23d,_23e){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to checkbox "+_23d);
var _23f=document.getElementById(_23d);
if(_23f==null){
return true;
}
var _240=document.getElementById(_23e);
if(_240==null){
return true;
}
if(!_23f.checked){
_240.setAttribute("visibility","hidden");
}else{
_240.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _241=rabbit.facade;
var _242=[];
var _243=false;
var _244=null;
var _245=function(id){
for(var i=0;i<_242.length;i++){
var _246=_242[i];
if(_246.calendarId==id){
return _246;
}
}
return null;
};
var _247=function(id,year,_248){
var _249=_245(id);
_249.calendar.setYear(year);
_249.calendar.setMonth(_248);
_249.calendar.render();
};
var _24a=function _hideCalendar(id,_24b,_24c){
if(_24b){
document.getElementById(id+"_input").value=_24b;
}
var _24d=_245(id);
_24d.calendarVisible=false;
var svg=document.getElementById(_24d.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_24d.calendar.hide();
_24d.overlay.hide();
_243=false;
$("html").unbind("click",_244);
};
var _24e=function _showCalendar(id,_24f){
var _250=_245(id);
_250.calendarVisible=true;
_250.calendar.show();
_250.overlay.show();
_243=true;
var svg=document.getElementById(_250.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
_244=function(e){
if(!rabbit.util.isElementChildOfSelector(e.target,"#"+id)){
_24a(id);
}
};
$("html").bind("click",_244);
};
var _251=function _251(_252){
for(var i=0;i<_252.childNodes.length;i++){
var _253=_252.childNodes[i];
if(_253.nodeType!=1){
continue;
}
if(_253.getAttribute("id")==undefined){
_253.setAttribute("id",_252.getAttribute("id")+"_"+i);
}
arguments.callee(_253);
}
};
var _254=function _254(evt){
if(!evt){
return;
}
if(!_241.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_241.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_24e,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_24a,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_247,this);
},calendarOpen:function(id){
return _243;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _255=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_255.render();
if(rabbit.result.lang=="de"){
var cal=new YAHOO.widget.Calendar(id+"_cal",{START_WEEKDAY:1});
cal.cfg.setProperty("DATE_FIELD_DELIMITER",".");
cal.cfg.setProperty("MDY_DAY_POSITION",1);
cal.cfg.setProperty("MDY_MONTH_POSITION",2);
cal.cfg.setProperty("MDY_YEAR_POSITION",3);
cal.cfg.setProperty("MD_DAY_POSITION",1);
cal.cfg.setProperty("MD_MONTH_POSITION",2);
cal.cfg.setProperty("MONTHS_SHORT",["Jan","Feb","MŠr","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]);
cal.cfg.setProperty("MONTHS_LONG",["Januar","Februar","MŠrz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]);
cal.cfg.setProperty("WEEKDAYS_1CHAR",["S","M","D","M","D","F","S"]);
cal.cfg.setProperty("WEEKDAYS_SHORT",["So","Mo","Di","Mi","Do","Fr","Sa"]);
cal.cfg.setProperty("WEEKDAYS_MEDIUM",["Son","Mon","Die","Mit","Don","Fre","Sam"]);
cal.cfg.setProperty("WEEKDAYS_LONG",["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]);
}else{
var cal=new YAHOO.widget.Calendar(id+"_cal");
}
var _256=new Object();
_256["calendar"]=cal;
_256.overlay=_255;
_256["calendarId"]=id;
_256["calendarVisible"]=false;
_242.push(_256);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _257=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_256.calendarId,_257,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_255.hide();
var _258=id+"_cal";
_251(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var date=cal.cfg.getProperty("pagedate");
var year=date.getUTCFullYear();
var _259=date.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_256.calendarId,year,_259,rabbit.util.userRole,"displayMouseClick");
_251(document.getElementById(_258));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_256);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_256);
YAHOO.util.Event.addListener(id+"_ov","click",_254);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
rabbit.facade.markHighlightTouchesAsSuccessful();
if(this.calendarOpen){
for(var i=0;i<_242.length;i++){
var _25a=_242[i];
if(_25a.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_25a.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_25b){
if(!_25b.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_25b.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_25b.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_254(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
rabbit.stencils.menu=function(){
var _25c=[];
var _25d=function(_25e){
for(var i=0;i<_25c.length;i++){
var menu=_25c[i];
if(menu.domId==_25e){
return menu;
}
}
return null;
};
var _25f=function(_260,_261){
var menu=_25d(_260);
if(menu){
for(var i=0;i<_261.length;i++){
var _262=menu.getSubmenus();
for(var j=0;j<_262.length;j++){
if(_262[j].id==_261[i]){
menu=_262[j];
}
}
}
}
return menu;
};
var _263=function(_264,_265,_266){
if(_266!=null&&_266!=rabbit.util.userRole){
var _267=_25f(_264,_265);
if(_267){
_267.show();
}
}
};
var _268=function(_269,_26a,_26b){
if(_26b!=null&&_26b!=rabbit.util.userRole){
var _26c=_25f(_269,_26a);
if(_26c){
_26c.hide();
}
}
};
var _26d=function(obj){
var menu=obj;
var _26e=[];
while(menu.getRoot()!=menu){
_26e.push(menu.id);
menu=menu.getRoot();
}
var _26f=menu.domId;
var _270=[];
for(var i=_26e.length-1;i>=0;i--){
_270.push(_26e[i]);
}
return [_26f,_270];
};
var _271=function(){
var _272=_26d(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_272[0],_272[1],rabbit.util.userRole);
};
var _273=function(){
var _274=_26d(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_274[0],_274[1],rabbit.util.userRole);
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_263,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_268,this);
},convertMethodIntoFunction:function(_275){
for(var i=0;i<_275.length;i++){
var _276=_275[i].onclick;
if(_276&&_276.fn!=="undefined"){
_276.fn=eval(_276.fn);
}
if(_275[i].submenu){
var _277=_275[i].submenu.itemdata;
this.convertMethodIntoFunction(_277);
}
}
},setupMenu:function setupMenu(id,_278,_279){
try{
_278=_278.replace(/:rabbit.result.manager.menuClick,/g,":\"rabbit.result.manager.menuClick\",");
_278=JSON.parse(_278);
this.convertMethodIntoFunction(_278);
if(_279=="vertical"){
var _27a=new YAHOO.widget.Menu(id+"-bar",{itemdata:_278,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
var _27a=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_278});
}
_27a.render(id+"-menu-container");
_27a.show();
_27a.domId=id;
_25c.push(_27a);
_27a.subscribe("show",_271);
_27a.subscribe("hide",_273);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _27b=rabbit.facade;
return {init:function init(){
_27b.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
$(".radiobutton input:checked").each(function(){
var name=$(this).attr("name");
$("input[name=\""+name+"\"]").data("old-selected-radiobutton-id",$(this).attr("value"));
});
},getAllRadioButtons:function getAllRadioButtons(){
var _27c=[];
var _27d=document.getElementsByTagName("input");
for(var i=0;i<_27d.length;i++){
if(_27d[i].type==="radio"){
_27c.push(_27d[i]);
}
}
return _27c;
},onClick:function onClick(_27e,_27f){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to radioButton "+_27e);
var _280=this.getAllRadioButtons();
for(var i=0;i<_280.length;i++){
var _281=_280[i];
var _282=_281.getAttribute("id")+"_svgChecked";
var _283=document.getElementById(_282);
if(_283!=null){
if(!_281.checked){
if(rabbit.facade.vml){
_283.style.setAttribute("display","none");
}else{
_283.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_283.style.removeAttribute("display");
}else{
_283.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _284={};
var _285=function(_286,_287,_288){
var _289=_284[_286];
if(!_289){
return;
}
if(_288!=null&&_288!=rabbit.util.userRole){
console.log("_sliderChangedCallback "+_287);
_289.setValue(_287);
}
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_285,this);
},setupSlider:function(id,_28a,_28b,_28c,_28d){
try{
_28a=parseInt(_28a);
_28c=parseInt(_28c);
if(_28d){
_28d=parseInt(_28d)*2;
}else{
_28d=0;
}
var _28e=(_28c-(_28c)/21)/10;
var _28f=_28e*_28a;
var _290=_28c-_28f;
var _291=null;
if(_28b=="vertical"){
_291=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_290,_28f,_28e);
}else{
_291=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_290,_28f,_28e);
}
_284[id]=_291;
_291.animate=false;
_291.subscribe("change",function(){
var _292=Math.round(this.getValue()+_28d);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_292,rabbit.util.userRole);
});
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _293=rabbit.facade;
var _294=function _294(_295,_296){
var node=document.getElementById(_295);
if(node){
node.style.setProperty("fill",_296,"");
}
};
var _297=function _297(_298,_299){
var _29a,node=document.getElementById(_298);
if(node){
if(_299=="url(#sketchedHover)"){
_29a=node.ownerDocument.createElement("v:fill");
_29a.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_29a.setAttribute("type","tile");
_29a.setAttribute("origin","0.1,0.1");
_29a.setAttribute("size","175pt,75pt");
_29a.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_29a,node.getElementsByTagName("fill")[0]);
}else{
_29a=node.ownerDocument.createElement("v:fill");
_29a.setAttribute("color",_299);
_29a.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_29a,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_293.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_293.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_293.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_29b){
if(rabbit.facade.vml){
_297(id,_29b);
}else{
_294(id,_29b);
}
},onSvgFocus:function onSvgFocus(_29c){
var _29d;
if(_29c instanceof Array){
for(var key in _29c){
_29d=document.getElementById(_29c[key]);
if(_29d!=null){
_29d.setAttribute("class","svg_selected_element");
}
}
}else{
_29d=document.getElementById(_29c);
if(_29d!=null){
_29d.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_29e){
var _29f;
if(_29e instanceof Array){
for(var key in _29e){
_29f=document.getElementById(_29e[key]);
if(_29f!=null){
_29f.setAttribute("class","svg_unselected_element");
}
}
}else{
_29f=document.getElementById(_29e);
if(_29f!=null){
_29f.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_2a0,_2a1){
var _2a2=document.getElementById(_2a1);
if(_2a2==null){
return true;
}
console.debug("Property changed on "+_2a0);
if(event.srcElement[event.propertyName]==false){
_2a2.style.setAttribute("display","none");
}else{
_2a2.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
rabbit.stencils.tabButton=function(){
var _2a3=rabbit.facade;
var _2a4=function _2a4(_2a5,_2a6){
var node=document.getElementById(_2a5);
if(node){
node.style.setProperty("fill",_2a6,"");
}
};
var _2a7=function _2a7(_2a8,_2a9){
var _2aa,node=document.getElementById(_2a8);
if(node){
if(_2a9=="url(#sketchedHover)"){
_2aa=node.ownerDocument.createElement("v:fill");
_2aa.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_2aa.setAttribute("type","tile");
_2aa.setAttribute("origin","0.1,0.1");
_2aa.setAttribute("size","175pt,75pt");
_2aa.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2aa,node.getElementsByTagName("fill")[0]);
}else{
_2aa=node.ownerDocument.createElement("v:fill");
_2aa.setAttribute("color",_2a9);
_2aa.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2aa,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_2a3.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_2a3.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_2a3.registerOnEvent(rabbit.events.pageLoaded,this.changeTab,this);
_2a3.registerOnEvent(rabbit.events.pageReady,this.changeTab,this);
this.oldPageId=null;
},changeTab:function(page,_2ab){
var _2ac="";
if(page){
_2ac=page.data.id;
}
if(this.oldPageId===null){
_2ac=_2a3.getCurrentPageId();
}
var _2ad=selectorUtil.getElementsByName("target"+this.oldPageId);
for(var i=0;i<_2ad.length;i++){
rabbit.util.removeClass(_2ad[i],"selected");
}
var _2ad=selectorUtil.getElementsByName("target"+_2ac);
for(var i=0;i<_2ad.length;i++){
rabbit.util.addClass(_2ad[i],"selected");
}
this.oldPageId=_2a3.getCurrentPageId();
},handleMouseOver:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
rabbit.util.addClass(id+"_div_small","ClickableSketchHover");
rabbit.util.addClass(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_2a7(id+"_big_path","#EEEEEE");
_2a7(id+"_small_path","#EEEEEE");
}else{
_2a4(id+"_big_path","#EEEEEE");
_2a4(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_setClass(id+"_div_small","ClickableSketch");
_setClass(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_2a7(id+"_big_path","white");
_2a7(id+"_small_path","white");
}else{
_2a4(id+"_big_path","white");
_2a4(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.togglesection=function(){
var _2ae=0;
var _2af=".togglesection-header";
var _2b0=".togglesection-content";
var _2b1="content";
var _2b2="#borderDiv";
var _2b3="open";
var _2b4=rabbit.facade;
var _2b5=function(_2b6,_2b7){
$("#"+_2b6+_2b1).find(".iframe").css("width",_2b7+"px");
};
return {togglers:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.toggleToggleSection,this.toggle,this);
},setupToggler:function(id,_2b8,_2b9){
this.togglers[id]={id:id,page:_2b8};
$("#"+id).find(_2af).click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.facade.raiseEvent(rabbit.events.toggleToggleSection,id);
});
$(_2b2).append($("#"+id).find(_2b0));
},pageLoaded:function(_2ba){
for(var _2bb in this.togglers){
$("#"+this.togglers[_2bb].id+_2b1).hide();
}
},toggle:function(_2bc){
var _2bd=$("#"+_2bc+">div").data("iframe-url");
var page=rabbit.data.pageStore.objects[_2bd];
$("#"+_2bc+_2b1).slideToggle(_2ae,function(){
$("#"+_2bc).toggleClass(_2b3);
});
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.togglesection);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _2be=rabbit.facade;
return {init:function init(){
_2be.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
rabbit.facade.markHighlightTouchesAsSuccessful();
var _2bf=$("#"+id+" > div");
var _2c0=rabbit.events.switchOffSwitch;
_2bf.toggleClass("switch-selected");
if(_2bf.hasClass("switch-selected")){
_2c0=rabbit.events.switchOnSwitch;
}
_2be.raiseEvent(_2c0,id);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _2c1="rating_white.png";
var _2c2="rating_black.png";
var _2c3=rabbit.facade;
var _2c4=new Array();
var _2c5=function(id){
if(_2c4[id]){
return parseInt(_2c4[id]);
}
return 0;
};
var _2c6=function(id,_2c7){
_2c4[id]=_2c7;
};
var _2c8=function(id,_2c9){
var i=1;
_2c9=parseInt(_2c9);
while(true){
var _2ca=document.getElementById(id+"-"+i);
if(_2ca==null){
break;
}
var _2cb=_2ca.getAttribute("src");
_2cb=_2cb.substring(0,_2cb.lastIndexOf("/")+1);
if(i>=_2c9+1){
_2cb+=_2c1;
}else{
_2cb+=_2c2;
}
_2ca.setAttribute("src",_2cb);
i++;
}
};
return {init:function init(){
_2c3.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_2c3.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_2c3.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_2cc){
_2c6(id,_2cc);
},onClick:function onClick(id,_2cd){
rabbit.facade.markHighlightTouchesAsSuccessful();
_2c6(id,_2cd);
_2c8(id,_2cd);
},onMouseOut:function onMouseOut(id){
_2c8(id,_2c5(id));
},onMouseOver:function onMouseOver(id,_2ce){
_2c8(id,parseInt(_2ce));
},checkMouseOutDiv:function(id,_2cf){
if(_2cf.relatedTarget){
return _2cf.relatedTarget.id.indexOf(id)==-1;
}else{
return _2cf.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _2d0=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_2d1){
try{
_2d1=_2d1.replace(/&quot;/g,"\"");
_2d1=JSON.parse(_2d1);
this._trees[id]=_2d1;
}
catch(e){
console.error(e);
}
},clickCallback:function(_2d2,sth){
var _2d3=document.getElementById(_2d2+"-buttonvline");
var _2d4="open";
if(_2d3){
if(_2d3.style.display=="none"){
_2d4="closed";
}
if(_2d4=="closed"){
_2d3.style.display="";
}else{
_2d3.style.display="none";
}
var elem=document.getElementById(_2d2+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_2d4=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_2d2,_2d4);
}
}
},scrollCallback:function(id,_2d5,_2d6){
var _2d7=document.getElementById(id);
_2d7.scrollTop=_2d5;
_2d7.scrollLeft=_2d6;
},update:function(_2d8,_2d9){
this.setStatus(_2d8,_2d9);
this.recalculateLineLengths(_2d8);
},setStatus:function(_2da,_2db){
var tree=this.getTree(_2da);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_2da),tree,_2da,_2db);
}
},setStatusOnSubtree:function(_2dc,tree,_2dd,_2de){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _2df=_2dc+"-"+i;
if(_2df==_2dd){
node.treeItemType=(_2de=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_2df,node.subtree,_2dd,_2de)){
return true;
}
}
}
}
},recalculateLineLengths:function(_2e0){
var tree=this.getTree(_2e0);
if(tree){
var _2e1=this.getTreeName(_2e0);
var _2e2=document.getElementById(_2e1+"-openingvline");
this.traverseTree(_2e1,_2e2,tree,null);
}
},traverseTree:function(_2e3,node,_2e4,_2e5){
var _2e6=false;
if(_2e5===null){
_2e5={0:0,1:0};
_2e6=true;
}
var rows=0;
var _2e7=0;
var _2e8=0;
var _2e9=0;
_2e5[0]=0;
_2e5[1]=0;
if(!_2e6){
rows++;
}
if(_2e4){
for(var i=0;i<_2e4.length;i++){
var _2ea=_2e4[i];
var _2eb=null;
if(_2ea.subtree){
_2eb=_2ea.subtree;
}
this.traverseTree(_2e3+"-"+i,_2ea,_2eb,_2e5);
_2e8=_2e7+1;
_2e7=_2e7+_2e5[0];
_2e9=_2e9+_2e5[1];
}
}
var _2ec=null;
if(_2e6){
_2ec=node;
}else{
_2ec=document.getElementById(_2e3+"-openingvline");
}
if(_2ec){
var _2ed=_2ec.parentNode;
_2ed.style.height=""+(_2d0*_2e7)+"px";
var _2ee=(_2e8-_2e9)*_2d0;
_2ec.style.top=""+_2ee+"px";
}else{
}
if(_2e6||"+"==node.treeItemType){
_2e5[0]=rows+_2e7;
}else{
_2e5[0]=rows;
}
_2e5[1]=rows+_2e9;
},getTree:function(_2ef){
if(_2ef){
var _2f0=this.getTreeName(_2ef);
if(this._trees[_2f0]){
return this._trees[_2f0];
}else{
return null;
}
}
},getTreeName:function(_2f1){
return _2f1.substring(0,_2f1.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},init:function(_2f2){
this.lang=_2f2.lang;
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_2f3){
if(_2f3){
var _2f4=key.toLowerCase();
_2f4=_2f4.replace(/ /g,"-");
_2f4=_2f3+"."+_2f4;
}else{
var _2f4=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
if(rabbit.common.i18n.translation[lang][_2f4]){
return rabbit.common.i18n.translation[lang][_2f4];
}
return key;
},tr:function(key,_2f5){
var _2f6=this.t(key);
for(var k in _2f5){
_2f6=_2f6.replace(k,_2f5[k]);
}
return _2f6;
},translation:{}};
var t=rabbit.common.i18n.t;
var tr=rabbit.common.i18n.tr;


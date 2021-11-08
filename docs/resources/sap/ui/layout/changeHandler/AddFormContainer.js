/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,r,n){"use strict";var o={};o.applyChange=function(t,o,a){var i=a.modifier;var u=a.appComponent;var l=a.view;var c=t.getDefinition();if(c.texts&&c.texts.groupLabel&&c.texts.groupLabel.value&&c.content&&c.content.group&&(c.content.group.selector||c.content.group.id)){var p=c.texts.groupLabel.value;var s=c.content.group.index;var g=c.content.group.selector||{id:c.content.group.id};var f=n.extend({},g);f.id=f.id+"--title";t.setRevertData({newGroupSelector:g});if(i.bySelector(f,u)){return e.markAsNotApplicable("Control to be created already exists:"+f)}else if(i.bySelector(g,u)){return e.markAsNotApplicable("Control to be created already exists:"+g)}return Promise.resolve().then(function(){return Promise.all([i.createControl("sap.ui.core.Title",u,l,f),i.createControl("sap.ui.layout.form.FormContainer",u,l,g)])}).then(function(e){var t=e[0];var r=e[1];i.setProperty(t,"text",p);return Promise.resolve().then(i.insertAggregation.bind(i,r,"title",t,0,l)).then(i.insertAggregation.bind(i,o,"formContainers",r,s,l))})}else{r.error("Change does not contain sufficient information to be applied: ["+c.layer+"]"+c.namespace+"/"+c.fileName+"."+c.fileType);return Promise.resolve()}};o.completeChangeContent=function(r,n,o){var a=r.getDefinition();var i=o.appComponent;if(n.newLabel){e.setTextInChange(a,"groupLabel",n.newLabel,"XFLD")}else{throw new Error("Cannot create a new group: oSpecificChangeInfo.groupLabel attribute required")}if(!a.content){a.content={}}if(!a.content.group){a.content.group={}}if(n.index===undefined){throw new Error("Cannot create a new group: oSpecificChangeInfo.index attribute required")}else{a.content.group.index=n.index}if(n.newControlId){a.content.group.selector=t.getSelector(n.newControlId,i)}else{throw new Error("Cannot create a new group: oSpecificChangeInfo.newControlId attribute required")}};o.revertChange=function(e,t,r){var n=r.appComponent;var o=r.view;var a=r.modifier;var i=e.getRevertData().newGroupSelector;var u=a.bySelector(i,n,o);return Promise.resolve().then(function(){return a.removeAggregation(t,"formContainers",u)}).then(function(){a.destroy(u);e.resetRevertData()})};return o},true);
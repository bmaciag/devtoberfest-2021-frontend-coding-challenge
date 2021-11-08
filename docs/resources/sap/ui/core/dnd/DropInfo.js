/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DragDropBase"],function(r){"use strict";var t=r.extend("sap.ui.core.dnd.DropInfo",{metadata:{library:"sap.ui.core",interfaces:["sap.ui.core.dnd.IDropInfo"],properties:{targetAggregation:{type:"string",defaultValue:null,invalidate:false},dropEffect:{type:"sap.ui.core.dnd.DropEffect",defaultValue:"Move",invalidate:false},dropPosition:{type:"sap.ui.core.dnd.DropPosition",defaultValue:"On",invalidate:false},dropLayout:{type:"sap.ui.core.dnd.DropLayout",defaultValue:"Default",invalidate:false}},events:{dragEnter:{allowPreventDefault:true},dragOver:{},drop:{}}}});t.prototype.getDropTarget=function(){return this.getParent()};t.prototype.isDroppable=function(r,t){this.sTemporaryDropPosition="";if(!this.getEnabled()){return false}var e=this.getDropTarget();if(!e){return false}var o=this.getTargetAggregation();if(!this.checkMetadata(e,o,"droppable")){return false}var o=this.getTargetAggregation();if(e===r&&!o){return true}if(r.getParent()===e&&o===r.sParentAggregationName){return true}if(t&&o&&e===r){var a=r.getDomRefForSetting(o);if(a&&a!=t.target&&a.contains(t.target)){t.setMark("DragWithin",o);this.sTemporaryDropPosition="On";return true}}return false};t.prototype.getDropPosition=function(r){if(r&&this.sTemporaryDropPosition){return this.sTemporaryDropPosition}return this.getProperty("dropPosition")};t.prototype.getDropLayout=function(r){var t=this.getProperty("dropLayout");if(!r||t!="Default"){return t}return this.getDropTarget().getMetadata().getDragDropInfo(this.getTargetAggregation()).layout};t.prototype.fireDragEnter=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;return this.fireEvent("dragEnter",{dragSession:r.dragSession,browserEvent:r.originalEvent,target:t.getDropControl()},true)};t.prototype.fireDragOver=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;return this.fireEvent("dragOver",{dragSession:r.dragSession,browserEvent:r.originalEvent,target:t.getDropControl(),dropPosition:t.getDropPosition()})};t.prototype.fireDrop=function(r){if(!r||!r.dragSession){return}var t=r.dragSession;this.fireEvent("drop",{dragSession:r.dragSession,browserEvent:r.originalEvent,dropPosition:t.getDropPosition(),draggedControl:t.getDragControl(),droppedControl:t.getDropControl()})};return t});
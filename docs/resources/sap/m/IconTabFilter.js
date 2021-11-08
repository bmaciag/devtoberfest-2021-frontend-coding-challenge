/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./AccButton","./IconTabFilterExpandButtonBadge","sap/ui/core/library","sap/ui/core/Core","sap/ui/core/Item","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/core/InvisibleMessage","sap/ui/Device","sap/m/BadgeCustomData","sap/m/Button","sap/m/ResponsivePopover","sap/m/IconTabBarSelectList","sap/m/BadgeEnabler"],function(e,t,o,i,s,a,n,r,l,p,g,d,h,c,u){"use strict";var f=i.TextAlign;var _=i.TextDirection;var I=e.ButtonType;var v=e.PlacementType;var T=e.ImageHelper;var b=e.IconTabFilterDesign;var B=e.BadgeStyle;var m=e.BadgeState;var y=i.IconColor;var C=i.aria.HasPopup;var S=3e3;var D=i.InvisibleMessageMode;var x=-8;var E=a.extend("sap.m.IconTabFilter",{metadata:{interfaces:["sap.m.IconTab","sap.ui.core.PopupInterface","sap.m.IBadge"],library:"sap.m",designtime:"sap/m/designtime/IconTabFilter.designtime",properties:{count:{type:"string",group:"Data",defaultValue:""},showAll:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},iconColor:{type:"sap.ui.core.IconColor",group:"Appearance",defaultValue:y.Default},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},design:{type:"sap.m.IconTabFilterDesign",group:"Appearance",defaultValue:b.Vertical}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},items:{type:"sap.m.IconTab",multiple:true,singularName:"item"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButtonBadge:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});u.call(E.prototype);var O=s.getLibraryResourceBundle("sap.m");E._aAllIconColors=["sapMITBFilterCritical","sapMITBFilterPositive","sapMITBFilterNegative","sapMITBFilterDefault","sapMITBFilterNeutral"];E.prototype._getImageControl=function(e,t,o){var i={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};if(i.src){this._oImageControl=T.getImageControl(this.getId()+"-icon",this._oImageControl,t,i,e,o)}else if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null}return this._oImageControl};E.prototype.init=function(){this._oDragEventDelegate={onlongdragover:this._handleOnLongDragOver,ondragover:this._handleOnDragOver,ondragleave:this._handleOnDragLeave,ondrop:this._handleOnDrop};this.initBadgeEnablement({style:B.Attention,selector:{selector:".sapMITBBadgeHolder"}});this._oCloneInList=null;this.setAggregation("_expandButtonBadge",new o)};E.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy()}if(a.prototype.exit){a.prototype.exit.call(this,e)}if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this._oExpandButton){this._oExpandButton.removeEventDelegate(this._oDragEventDelegate);this._oExpandButton.destroy();this._oExpandButton=null}this.removeEventDelegate(this._oDragEventDelegate);this._oDragEventDelegate=null;if(this._iHideBadgeTimeout){clearTimeout(this._iHideBadgeTimeout)}};E.prototype.invalidate=function(){var e=this.getParent(),t,o;if(!e){return}t=e.getParent();if(!(t instanceof sap.m.IconTabBar)){e.invalidate();return}o=t.getParent();if(o instanceof sap.m.ObjectHeader){o.invalidate()}else{t.invalidate()}};E.prototype.setProperty=function(e,t,o){switch(e){case"textDirection":case"text":case"count":case"showAll":case"icon":case"iconColor":case"iconDensityAware":case"design":if(this.getProperty(e)===t){return this}a.prototype.setProperty.call(this,e,t,true);if(!o){var i=this.getParent();if(i instanceof sap.m.IconTabHeader){i.invalidate()}}break;default:a.prototype.setProperty.apply(this,arguments);break}return this};E.prototype._getNonEmptyKey=function(){var e=this.getKey();if(e){return e}return this.getId()};E.prototype._getRealTab=function(){return this._oRealItem||this};E.prototype._getRootTab=function(){var e=this._getRealTab(),t=e.getParent();while(t&&t.isA("sap.m.IconTabFilter")){e=t;t=t.getParent()}return e};E.prototype._getNestedLevel=function(){var e=this._getRealTab().getParent(),t;for(t=1;e&&e.isA("sap.m.IconTabFilter");t++){e=e.getParent()}return t};E.prototype.render=function(e,t,o){if(!this.getVisible()){return}var i=this.getParent(),s=i.getParent();if(i.getEnableTabReordering()){this._prepareDragEventDelegate()}var a=i._isInsideIconTabBar(),n={role:"tab"},l=this.getId(),p=this.getCount(),g=this.getText(),d=this.getIcon(),h=this.getIconColor(),c=this.getEnabled(),u=this._shouldReadIconColor(),f=this.getDesign()===b.Horizontal,I=i._bTextOnly,v=i._bInLine||i.isInlineMode(),T=this.getShowAll(),B=this.getTextDirection();if(a){n.controls=s.getId()+"-content"}if(this.getItems().length){n.roledescription=O.getText("ICONTABFILTER_SPLIT_TAB")}if(g.length||p!==""||d){var m=[];if(p!==""&&!v){m.push(l+"-count")}if(g.length){m.push(l+"-text")}if(d){m.push(l+"-icon")}if(u){m.push(l+"-iconColor")}n.labelledby=m.join(" ")}if(t!==undefined&&o!==undefined){Object.assign(n,{posinset:t+1,setsize:o})}e.openStart("div",this).accessibilityState(n).class("sapMITBItem");if(!p){e.class("sapMITBItemNoCount")}if(f){e.class("sapMITBHorizontal")}else{e.class("sapMITBVertical")}if(T){e.class("sapMITBAll")}else{e.class("sapMITBFilter")}if(!T&&c){e.class("sapMITBFilter"+h)}if(i._isUnselectable(this)){e.class("sapMITHUnselectable")}if(this.getItems().length>0){e.class("sapMITBFilterWithItems")}if(!c){e.class("sapMITBDisabled").attr("aria-disabled",true)}e.attr("aria-selected",false);var y=this.getTooltip_AsString();if(y){e.attr("title",y)}if(this._isOverflow()||this.getItems().length){e.attr("aria-haspopup","menu")}e.openEnd();if(u){this._renderIconColorDescription(e)}e.openStart("div").class("sapMITBFilterWrapper").openEnd();if(!v){e.openStart("div",l+"-tab").class("sapMITBTab").openEnd();if(!T||!d){var C=["sapMITBFilterIcon","sapMITBBadgeHolder"];if(c){C.push("sapMITBFilter"+h)}e.renderControl(this._getImageControl(C,i,E._aAllIconColors))}if(!T&&!d&&!I){e.openStart("span").class("sapMITBFilterNoIcon").openEnd().close("span")}if(f&&!T){e.close("div");e.openStart("div").class("sapMITBHorizontalWrapper").openEnd()}e.openStart("span",l+"-count").class("sapMITBCount");if(T||!d&&!g.length){e.class("sapMITBBadgeHolder")}e.openEnd();if(p===""&&f){e.unsafeHtml("&nbsp;")}else{e.text(p)}e.close("span");if(!f){e.close("div")}}if(g.length){e.openStart("div",l+"-text").class("sapMITBText");if(!d&&!T){e.class("sapMITBBadgeHolder")}if(a&&s.getUpperCase()){e.class("sapMITBTextUpperCase")}e.openEnd();if(v&&d){this._renderIcon(e)}e.openStart("span").class("sapMITHTextContent").attr("dir",B!==_.Inherit?B.toLowerCase():"auto");e.openEnd().text(i._getDisplayText(this)).close("span");if(this._isOverflow()||this.getItems().length&&i._isUnselectable(this)){e.openStart("span",this.getId()+"-expandButton").class("sapMITHShowSubItemsIcon").openEnd();e.icon(r.getIconURI("slim-arrow-down"),null,{title:null,"aria-hidden":true});e.close("span")}e.close("div")}if(!v&&f){e.close("div")}e.openStart("div").class("sapMITBContentArrow").openEnd().close("div");e.close("div");if(this.getItems().length&&!i._isUnselectable(this)){e.openStart("span").accessibilityState({role:"separator"}).openEnd().close("span");e.renderControl(this._getExpandButton())}e.renderControl(this.getAggregation("_expandButtonBadge"));if(this.getItems().length){this._updateExpandButtonBadge()}e.close("div")};E.prototype.renderInSelectList=function(e,t,o,i,s){if(!this.getVisible()){return}var a=true,n=t._bIconOnly,r=t._oIconTabHeader,l=this.getIconColor(),p=this.getEnabled();if(r){a=r._bTextOnly}e.openStart("li",this).class("sapMITBSelectItem").attr("tabindex","-1").attr("role","menuitem");if(s){e.style("padding-left",s+"rem")}if(o!==undefined&&i!==undefined){e.attr("aria-posinset",o+1);e.attr("aria-setsize",i);e.attr("aria-level",this._getNestedLevel())}var g=this.getTooltip_AsString();if(g){e.attr("title",g)}if(r._isUnselectable(this)){e.class("sapMITHUnselectable")}if(!p){e.class("sapMITBDisabled").attr("aria-disabled",true)}if(t.getSelectedItem()==this){e.class("sapMITBSelectItemSelected");e.attr("aria-selected",true)}if(p){e.class("sapMITBFilter"+l)}var d=this.getId(),h=this._shouldReadIconColor(),c=[];if(!n){c.push(d+"-text")}if(!a&&this.getIcon()){c.push(d+"-icon")}if(h){c.push(d+"-iconColor")}e.accessibilityState({labelledby:c.join(" ")}).openEnd();if(h){this._renderIconColorDescription(e)}if(!a){this._renderIcon(e,n)}if(!n){this._renderText(e)}e.close("li")};E.prototype._onAfterParentRendering=function(){this._renderBadge();l.getInstance()};E.prototype._renderIcon=function(e,t){var o=this.getIcon();if(o){var i=r.getIconInfo(o),s=["sapMITBSelectItemIcon"];if(i&&!i.suppressMirroring){s.push("sapUiIconMirrorInRTL")}if(t){s.push("sapMITBBadgeHolder")}if(this._getIconTabHeader().isInlineMode()){s.push("sapMITBInlineIcon")}e.icon(o,s,{id:this.getId()+"-icon","aria-hidden":true})}else{e.openStart("span").class("sapUiIcon").openEnd().close("span")}};E.prototype._renderIconColorDescription=function(e){e.openStart("div",this.getId()+"-iconColor").style("display","none").openEnd().text(O.getText("ICONTABBAR_ICONCOLOR_"+this.getIconColor().toUpperCase())).close("div")};E.prototype._renderText=function(e){var t=this.getText(),o=this.getCount(),i=s.getConfiguration().getRTL(),a=this.getTextDirection();e.openStart("span",this.getId()+"-text").attr("dir",a!==_.Inherit?a.toLowerCase():"auto").class("sapMText").class("sapMTextNoWrap").class("sapMITBText").class("sapMITBBadgeHolder");var r=n.getTextAlign(f.Begin,a);if(r){e.style("text-align",r)}if(o){if(i){t="("+o+") "+t}else{t+=" ("+o+")"}}e.openEnd().text(t).close("span")};E.prototype._getSelectList=function(){if(!this._oSelectList){this._oSelectList=new c({selectionChange:function(e){var t=e.getParameter("selectedItem");this._oIconTabHeader.setSelectedItem(t._getRealTab());this._oTabFilter._closePopover()}});this._oSelectList._oIconTabHeader=this.getParent();this._oSelectList._oTabFilter=this;this._oSelectList._bIsOverflow=this._isOverflow()}return this._oSelectList};E.prototype._prepareDragEventDelegate=function(){if(this.getEnabled()){this.addEventDelegate(this._oDragEventDelegate,this)}else{this.removeEventDelegate(this._oDragEventDelegate)}};E.prototype._updateTabCountText=function(){if(!this._isOverflow()){return}var e=this._getIconTabHeader()._getItemsForOverflow(this._bIsStartOverflow).filter(function(e){return e.isA("sap.m.IconTabFilter")}).length;this.setText("+"+e)};E.prototype._getExpandButton=function(){this._oExpandButton=this.getAggregation("_expandButton");if(!this._oExpandButton){this._oExpandButton=new t(this.getId()+"-expandButton",{type:I.Transparent,icon:r.getIconURI("slim-arrow-down"),tooltip:O.getText("ICONTABHEADER_OVERFLOW_MORE"),tabIndex:"-1",ariaHasPopup:C.Menu,press:this._expandButtonPress.bind(this)}).addStyleClass("sapMITBFilterExpandBtn");this.setAggregation("_expandButton",this._oExpandButton)}return this._oExpandButton};E.prototype._updateExpandButtonBadge=function(){var e=this.getAggregation("_expandButtonBadge"),t=e.getBadgeCustomData()&&e.getBadgeCustomData().getVisible(),o=this._hasChildWithBadge();if(o&&!t){e.addCustomData(new g({visible:true}))}else if(!o&&t){e.getBadgeCustomData().setVisible(false)}};E.prototype._hasChildWithBadge=function(){var e=this._isOverflow()?this._getIconTabHeader()._getItemsForOverflow(this._bIsStartOverflow):this._getAllSubItems();return e.some(function(e){return e.isA("sap.m.IBadge")&&e.getBadgeCustomData()&&e.getBadgeCustomData().getVisible()})};E.prototype._expandButtonPress=function(){if(!this.getEnabled()){return}this.$().trigger("focus");if(!this._oPopover){this._oPopover=new h({showArrow:false,showHeader:false,offsetY:0,offsetX:0,placement:v.VerticalPreferredBottom}).addStyleClass("sapMITBFilterPopover");this._oPopover.attachBeforeClose(function(){this._getSelectList().destroyItems()},this);if(p.system.phone){this._oPopover._oControl.addButton(this._createPopoverCloseButton())}if(this._getIconTabHeader()._isInsideToolHeader()){this._oPopover.addStyleClass("sapMITBFilterPopoverInToolHeader");this._oPopover.setOffsetY(x);if(!p.system.phone){this._oPopover.addEventDelegate({onAfterRendering:function(e){this._oPopover.getDomRef().style.minWidth=this.$().outerWidth(true)+"px"}.bind(this)})}}this.addDependent(this._oPopover);this._oPopover._oControl._adaptPositionParams=function(){var e=this.$().parents().hasClass("sapUiSizeCompact");this._arrowOffset=0;if(e){this._offsets=["0 0","0 0","0 4","0 0"]}else{this._offsets=["0 0","0 0","0 5","0 0"]}this._atPositions=["end top","end top","end bottom","begin top"];this._myPositions=["end bottom","begin top","end top","end top"]}}var e=this._setSelectListItems();var t=this._getSelectList();this._oPopover.removeAllContent();if(this.getItems().length||this._isOverflow()){this._oPopover.addContent(t);this._oPopover.setInitialFocus(e?t.getSelectedItem():t.getVisibleTabFilters()[0]);this._oPopover.openBy(this)}};E.prototype._getAllSubItems=function(){var e=[];this._getRealTab().getItems().forEach(function(t){if(t.isA("sap.m.IconTabFilter")){e=e.concat(t,t._getAllSubItems())}else{e=e.concat(t)}});return e};E.prototype._getAllSubFilters=function(){return this._getAllSubItems().filter(function(e){return e.isA("sap.m.IconTabFilter")})};E.prototype._getAllSubFiltersDomRefs=function(){return this._getAllSubFilters().filter(function(e){return Boolean(e._getRealTab().getDomRef())}).map(function(e){return e._getRealTab().getDomRef()})};E.prototype._getFirstAvailableSubFilter=function(){var e=this._getAllSubFilters();for(var t=0;t<e.length;t++){var o=e[t];if(o.getContent().length&&o.getVisible()){return o}}return this};E.prototype._isParentOf=function(e){var t=this._getAllSubFilters();for(var o=0;o<t.length;o++){if(t[o]._getRealTab()===e){return true}}return false};E.prototype._createPopoverCloseButton=function(){return new d({text:O.getText("SELECT_CANCEL_BUTTON"),press:this._closePopover.bind(this)})};E.prototype._closePopover=function(){if(this._oPopover){this._oPopover.close();this._oPopover.removeAllContent()}if(this._isOverflow()&&this.getParent().oSelectedItem){(this.getParent()._oSelectedRootItem||this.getParent().oSelectedItem._getRootTab()).$().trigger("focus")}};E.prototype._handleOnDragOver=function(e){if(this._isDropPossible(e)){this.getDomRef().classList.add("sapMITHDragOver");e.preventDefault()}};E.prototype._handleOnLongDragOver=function(e){if(this._isDropPossible(e)){if(this._oPopover&&this._oPopover.isOpen()){return}this._expandButtonPress()}};E.prototype._handleOnDrop=function(){this.getDomRef().classList.remove("sapMITHDragOver")};E.prototype._handleOnDragLeave=function(){this.getDomRef().classList.remove("sapMITHDragOver")};E.prototype._isDropPossible=function(e){var t=this._getIconTabHeader(),o=e.dragSession.getDragControl()._getRealTab(),i=t.oSelectedItem;if(t!==o._getIconTabHeader()){return false}if(o===this||o._isParentOf(this)){return false}if(!this._isOverflow()&&!t.getMaxNestingLevel()){return false}if(this._isOverflow()&&i&&(i===o||i._getRootTab()===o)){return false}return true};E.prototype._setSelectListItems=function(){var e=this.getParent(),t=this._getSelectList(),o=this._getAllSubItems(),i=e.oSelectedItem,s=false,a,n,r,l,p;if(this._isOverflow()){o=e._getItemsForOverflow(this._bIsStartOverflow)}t.destroyItems();t.setSelectedItem(null);for(l=0;l<o.length;l++){a=o[l];n=a.clone(undefined,undefined,{cloneChildren:false,cloneBindings:true});a._oCloneInList=n;r=a.getCustomData();for(p=0;p<r.length;p++){n.addCustomData(r[p].clone())}n._oRealItem=a;t.addItem(n);if(a.isA("sap.m.IconTabSeparator")){continue}if(n._getRealTab()===i){t.setSelectedItem(n);s=true;continue}if(n._getRealTab()._isParentOf(i)){t.setSelectedItem(i._getRealTab());s=true}}return s};E.prototype._isOverflow=function(){return this._bIsOverflow||this._bIsStartOverflow};E.prototype._getIconTabHeader=function(){return this._getRootTab().getParent()};E.prototype.onsapdown=function(e){if(!this.getEnabled()){return}if(this._isOverflow()||this._getNestedLevel()===1&&this._getRealTab()===this&&this._getRealTab().getItems().length!==0){e.stopImmediatePropagation();this._expandButtonPress()}};E.prototype._startBadgeHiding=function(){if(this._iHideBadgeTimeout){return}this._iHideBadgeTimeout=setTimeout(this._hideBadge.bind(this),S);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge()}};E.prototype._hideBadge=function(){var e=this.getBadgeCustomData();if(!e){return}e.setVisible(false);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge()}if(this._oCloneInList&&!this._oCloneInList.bIsDestroyed&&this._oCloneInList.getBadgeCustomData()){this._oCloneInList.getBadgeCustomData().setVisible(false);this._oCloneInList=null}if(this._isInOverflow()){this._getIconTabHeader()._getOverflow()._updateExpandButtonBadge()}if(this._isInStartOverflow()){this._getIconTabHeader()._getStartOverflow()._updateExpandButtonBadge()}this._iHideBadgeTimeout=null};E.prototype._isInOverflow=function(){return!this._bIsOverflow&&this._getIconTabHeader()._getItemsInStrip().indexOf(this._getRealTab())===-1};E.prototype._isInStartOverflow=function(){return!this._bIsStartOverflow&&this._getIconTabHeader()._getItemsInStrip().indexOf(this._getRealTab())===-1};E.prototype.onBadgeUpdate=function(e,t,o){var i=this.getDomRef(),s=this._getIconTabHeader(),a,n,r,p,d,h,c,u;if(!s){return}if(i){r=i.getAttribute("aria-labelledby")||"";switch(t){case m.Appear:r=o+" "+r;break;case m.Disappear:r=r.replace(o,"").trim();break}i.setAttribute("aria-labelledby",r)}if(!s._isRendered()){return}a=this._getRootTab();if(a._isInOverflow()){d=this._getIconTabHeader()._getOverflow();d._updateExpandButtonBadge()}if(a._isInStartOverflow()){h=this._getIconTabHeader()._getStartOverflow();h._updateExpandButtonBadge()}else if(a!==this){a._updateExpandButtonBadge()}if(t!==m.Appear){return}this._enableMotion();if((this._isInOverflow()||this._isInStartOverflow())&&this._oCloneInList){this._oCloneInList.addCustomData(new g)}n=l.getInstance();p=this.getText();if(a._isInOverflow()){c="ICONTABFILTER_SUB_ITEM_BADGE";u=[p,d.getText()]}if(a._isInStartOverflow()){c="ICONTABFILTER_SUB_ITEM_BADGE";u=[p,h.getText()]}else{if(a!==this){c="ICONTABFILTER_SUB_ITEM_BADGE";u=[p,a.getText()]}else{c="ICONTABFILTER_BADGE_MSG";u=p}}n.announce(O.getText(c,u),D.Assertive)};E.prototype.getAriaLabelBadgeText=function(){return O.getText("ICONTABFILTER_BADGE")};E.prototype._enableMotion=function(){if(this._getRealTab()._isInOverflow()||this._getRealTab()._isInStartOverflow()){if(this._oCloneInList&&this._oCloneInList.getDomRef()){this._oCloneInList.getDomRef().classList.add("sapMITBFilterBadgeMotion")}}else if(this.getDomRef()){this.getDomRef().classList.add("sapMITBFilterBadgeMotion")}};E.prototype._shouldReadIconColor=function(){var e=this.getIconColor();return this.getEnabled()&&(e==="Positive"||e==="Critical"||e==="Negative"||e==="Neutral")};return E});
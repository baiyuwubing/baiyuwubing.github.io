window.__require=function e(r,t,o){function i(s,n){if(!t[s]){if(!r[s]){var a=s.split("/");if(a=a[a.length-1],!r[a]){var l="function"==typeof __require&&__require;if(!n&&l)return l(a,!0);if(c)return c(a,!0);throw new Error("Cannot find module '"+s+"'")}}var _=t[s]={exports:{}};r[s][0].call(_.exports,function(e){return i(r[s][1][e]||e)},_,_.exports,e,r,t,o)}return t[s].exports}for(var c="function"==typeof __require&&__require,s=0;s<o.length;s++)i(o[s]);return i}({Helloworld:[function(e,r,t){"use strict";cc._RF.push(r,"e1b90/rohdEk4SdmmEZANaD","Helloworld"),Object.defineProperty(t,"__esModule",{value:!0});var o=cc._decorator,i=o.ccclass,c=o.property,s=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.camera=null,r.sp_camera=null,r.node_icon=null,r.sl_scale=null,r.sl_h=null,r.sl_v=null,r}return __extends(r,e),r.prototype.onLoad=function(){var e=new cc.RenderTexture;e.initWithSize(this.sp_camera.node.width,this.sp_camera.node.height);var r=new cc.SpriteFrame;r.setTexture(e),this.sp_camera.spriteFrame=r,this.camera.targetTexture=e,this.node_icon.runAction(cc.repeatForever(cc.rotateBy(1,100))),this.onSliderChange(this.sl_scale),this.onSliderChange(this.sl_h),this.onSliderChange(this.sl_v)},r.prototype.onSliderChange=function(e){switch(e){case this.sl_scale:var r=2*this.sl_scale.progress;this.camera.zoomRatio=r;break;case this.sl_h:this.camera.node.x=(this.sl_h.progress-.5)*this.node.width;break;case this.sl_v:this.camera.node.y=(this.sl_v.progress-.5)*this.node.height}},__decorate([c(cc.Camera)],r.prototype,"camera",void 0),__decorate([c(cc.Sprite)],r.prototype,"sp_camera",void 0),__decorate([c(cc.Node)],r.prototype,"node_icon",void 0),__decorate([c(cc.Slider)],r.prototype,"sl_scale",void 0),__decorate([c(cc.Slider)],r.prototype,"sl_h",void 0),__decorate([c(cc.Slider)],r.prototype,"sl_v",void 0),r=__decorate([i],r)}(cc.Component);t.default=s,cc._RF.pop()},{}]},{},["Helloworld"]);
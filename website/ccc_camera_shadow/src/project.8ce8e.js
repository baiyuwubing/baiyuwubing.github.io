window.__require=function e(o,t,r){function n(i,a){if(!t[i]){if(!o[i]){var s=i.split("/");if(s=s[s.length-1],!o[s]){var d="function"==typeof __require&&__require;if(!a&&d)return d(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+i+"'")}}var u=t[i]={exports:{}};o[i][0].call(u.exports,function(e){return n(o[i][1][e]||e)},u,u.exports,e,o,t,r)}return t[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<r.length;i++)n(r[i]);return n}({Helloworld:[function(e,o,t){"use strict";cc._RF.push(o,"e1b90/rohdEk4SdmmEZANaD","Helloworld"),Object.defineProperty(t,"__esModule",{value:!0});var r=cc._decorator,n=r.ccclass,c=r.property,i=function(e){function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.camera=null,o.sp_cameras=[],o.node_icon=null,o}return __extends(o,e),o.prototype.onLoad=function(){var e=new cc.RenderTexture;e.initWithSize(this.sp_cameras[0].node.width,this.sp_cameras[0].node.height);var o=new cc.SpriteFrame;o.setTexture(e),this.camera.targetTexture=e,this.sp_cameras.forEach(function(e){e.spriteFrame=o}),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onNodeIconTouchMove,this),this.schedule(this.shadowFollow,.1,cc.macro.REPEAT_FOREVER)},o.prototype.shadowFollow=function(){var e=this;this.sp_cameras.forEach(function(o,t){e.node.position.sub(o.node.position).mag()>0&&(o.node.stopAllActions(),o.node.runAction(cc.moveTo(.05*t+.02,e.node_icon.x,e.node_icon.y)))})},o.prototype.onNodeIconTouchMove=function(e){this.node_icon.x+=e.getDeltaX(),this.node_icon.y+=e.getDeltaY()},__decorate([c(cc.Camera)],o.prototype,"camera",void 0),__decorate([c([cc.Sprite])],o.prototype,"sp_cameras",void 0),__decorate([c(cc.Node)],o.prototype,"node_icon",void 0),o=__decorate([n],o)}(cc.Component);t.default=i,cc._RF.pop()},{}]},{},["Helloworld"]);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Hex = factory());
}(this, (function () { 'use strict';

var padZero = function (str, i) {
  while(str.length < i)
    { str = "0" + str; }

  return str
};


var Hex = function Hex (buffer) {
  this.buffer = buffer;
  this.view = new DataView(buffer);

  this.element = document.createElement('p');
  this.element.style.fontFamily = 'monospace';
  document.body.appendChild(this.element);
};

Hex.prototype.render = function render () {
    var this$1 = this;

  var items = this.buffer.byteLength;

  this.element.textContent = '';

  for (var i = 0; i < items; i++) {
    this$1.element.textContent += padZero(this$1.view.getUint8(i).toString(16), 2) + ' ';
  }

  return this
};

return Hex;

})));

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

var norm = function (str) {
  switch (str) {
  case '\t':
    return '.'
  case '\n':
    return '.'
  case ' ':
    return '.'
  default:
    return str
  }
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

  var rowSize = 16;

  var rows = Math.ceil(items/rowSize);


  var rowText = '';

  for (var i = 0; i < rows; i++) {
    rowText += padZero((i*rowSize).toString(16), 5) + '\n';
  }

  document.querySelector('#addr').innerText = rowText;

  var hexText = '';

  for (var i$1 = 0; i$1 < rows; i$1++) {
    for (var j = 0; j < rowSize; j++) {
      try {
        hexText +=
          padZero(
            this$1.view.getUint8(i$1*rowSize + j)
            .toString(16), 2
          ) + ' ';
      } catch (e) {
        hexText += '-- ';
      }
    }

    hexText += '\n';
  }

  document.querySelector('#hex').innerText = hexText;


  var textText = '';

  for (var i$2 = 0; i$2 < rows; i$2++) {
    for (var j$1 = 0; j$1 < rowSize; j$1++) {
      try {
        textText += norm(String.fromCharCode(this$1.view.getUint8(i$2*16 + j$1)));
      } catch (e) {
        textText += ' ';
      }
    }

    textText += '\n';
  }

  document.querySelector('#text').innerText = textText;

  return this
};

return Hex;

})));

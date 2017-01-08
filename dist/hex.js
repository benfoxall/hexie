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


var UI = function (rows, cols) {

  var root = document.createElement('aside');

  var number_root = document.createElement('section');
  var hex_root    = document.createElement('section');
  var text_root   = document.createElement('section');

  root.appendChild(number_root);
  root.appendChild(hex_root);
  root.appendChild(text_root);

  for(var i = 0; i < rows; i++) {
    var number = document.createElement('div');
    number.innerText = i;

    var hexes = document.createElement('div');
    var texts = document.createElement('div');

    for(var j = 0; j < cols; j++) {

      var hex  = document.createElement('span');
      var text = document.createElement('span');

      hex.innerText = '__';
      text.innerText = '.';

      hexes.appendChild(hex);
      texts.appendChild(text);

    }

    number_root.appendChild(number);
    hex_root.appendChild(hexes);
    text_root.appendChild(texts);

  }

  document.body.appendChild(root);

  // display data to this
  return function(view) {

    var idx, j, value;

    for (var i = 0; i < rows; i++) {
      // populate number
      number_root.children[i].innerText =  padZero((i*cols).toString(16), 5);

      for(j = 0; j < cols; j++) {

        idx = i * cols + j;

        if(idx >= view.byteLength) {
          hex_root.children[i].children[j].innerText = '__';
          text_root.children[i].children[j].innerText = '_';


        } else {
          value = view.getUint8(i * cols + j);

          // populate hex
          hex_root.children[i].children[j].innerText =
            padZero(value.toString(16), 2);

          // populate text
          text_root.children[i].children[j].innerText =
            String.fromCharCode(value);


        }

      }

    }

  }

};

var Hex = function (buffer) {

  var cols = 16;
  var rows = buffer.byteLength / cols;

  var ui = UI(rows, cols);

  // render
  var view = new DataView(buffer);
  ui(view);

};

return Hex;

})));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.hexie = factory());
}(this, (function () { 'use strict';

var padZero = function (str, i) {
  while(str.length < i)
    { str = "0" + str; }

  return str
};

var norm_map = {
  '\n': ' ',
  '\t': ' '
};

var norm = function (s) { return norm_map[s] || s; };

var UI = function (rows, cols) {

  var root = createElement('aside');
  style(root);

  var number_root = createElement('section');
  var hex_root    = createElement('section');
  var text_root   = createElement('section');

  style(number_root);
  style(hex_root);
  style(text_root);

  root.appendChild(number_root);
  root.appendChild(hex_root);
  root.appendChild(text_root);

  for(var i = 0; i < rows; i++) {
    var number = createElement('div');
    number.innerText = i;

    var hexes = createElement('div');
    var texts = createElement('div');

    for(var j = 0; j < cols; j++) {

      var hex  = createElement('span');
      var text = createElement('span');

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
            norm(String.fromCharCode(value));


        }

      }

    }

  }

};

function createElement(name) {
  var element = document.createElement(name);
  style(element);
  return element
}

function style(element) {
  switch (element.tagName) {

  case 'ASIDE':
    element.style.fontFamily = 'monospace';
    element.style.display = 'flex';
    element.style.justifyContent = 'space-around';
    break

  case 'SECTION':
    element.style.margin = '0 1em';
    break

  case 'DIV':
    element.style.whiteSpace = 'nowrap';
    element.style.height = '1em';
    break

  case 'SPAN':
    element.style.display = 'inline-bloc';
    element.style.margin = 'auto .2em';
    break

  }

}

var Hex = function (buffer) {

  var cols = 16;
  var rows = buffer.byteLength / cols;

  var ui = UI(rows, cols);

  
  //console.time('build')
  var view = new DataView(buffer);
  //console.timeEnd('build')

  //console.time('render')
  ui(view);
  //console.timeEnd('render')

};

return Hex;

})));

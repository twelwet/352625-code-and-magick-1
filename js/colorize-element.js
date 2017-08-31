// colorize-element.js
'use strict';

(function () {
  window.colorize = function (element, array, onColorChange) {
    element.addEventListener('click', function () {
      var color = window.util.getRandomValue(array);
      onColorChange(element, color);
    });
  };
})();

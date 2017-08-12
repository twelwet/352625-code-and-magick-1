// stat.js
'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Рисуем тень окна статистки
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Рисуем окно статистики
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  // Текст окна статистики
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Объявим функцию поиска худшего времени в массиве times[]
  var searchWorseTime = function (array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      var time = array[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  var BAR_HEIGHT = 150; // Высота столбца гистограммы
  var BAR_WIDTH = 40; // Ширина столбца
  var INDENT = 50; // Расстояние между столбцами
  var INITIAL_X = 180; // Начальная координата X столбца
  var INITIAL_Y = 240; // Начальная координата Y столбца
  var NAME_X = 140; // Координата Х текста имени игрока
  var NAME_Y = 260; // Координата Y текста имени игрока
  var TIME_X = 140; // Координата X текста времени игрока
  var TIME_Y = 230; // Координата Y текста времени игрока

  var barDistanceX = 0; // Шаг смещения между столбцами

  // Вычислим шаг нормирования высоты столбца
  var step = BAR_HEIGHT / searchWorseTime(times);

  // Объявим функцию получения случайного цвета столбца гистограммы
  var getRandomNumber = function () {
    return Math.random().toFixed(1);
  };

  // Объявим функцию отрисовки столбца гистограммы
  var drawBar = function (stepX, index) {
    ctx.fillStyle = 'rgba(0, 0, 255,' + getRandomNumber() + ')';
    if (names[index] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    }
    return ctx.fillRect(INITIAL_X + stepX, INITIAL_Y, -BAR_WIDTH, -times[index] * step);
  };

  // Объявим функцию отрисовки текста времени прохождения и имени игрока
  var writeText = function (stepX, index) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(Math.round(times[index]), TIME_X + stepX, TIME_Y - times[i] * step);
    ctx.fillText(names[index], NAME_X + stepX, NAME_Y);
  };

  // Запускаем в цикле три ранее объявленные функции
  for (var i = 0; i < times.length; i++) {
    barDistanceX = i * (BAR_WIDTH + INDENT); // Увеличиваем шаг смещения между результатами
    drawBar(barDistanceX, i);
    writeText(barDistanceX, i);
  }
};

// dialog.js
'use strict';

(function () {
  // Находим DIV '.setup-open'
  var userDialogOpen = document.querySelector('.setup-open');

  // Находим SPAN '.setup-close'
  var userDialogClose = document.querySelector('.setup-close');

  // Находим INPUT '.setup-user-name'
  var setupUserName = document.querySelector('.setup-user-name');

  // Объявляем функцию закрытия окна '.setup' по нажатию на ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  // Объявляем функцию открытия окна '.setup'
  var openPopup = function () {
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Объявляем функцию закрытия окна '.setup'
  var closePopup = function () {
    window.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.setup.style.top = '100px';
    window.setup.style.left = '50%';
  };

  // Опишем реакцию блока '.setup-open' на клик мыши
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  // Опишем реакцию блока '.setup-open' на нажатие ENTER на сфокусированном блоке '.setup-open-icon'
  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopup();
    }
  });

  // Опишем реакцию блока '.setup-close' на клик мыши
  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  // Опишем реакцию блока '.setup-close' на нажатие ENTER на сфокусированном блоке '.setup-close'
  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Остановим распространение события при нажатии на ESC, в случае фокуса на элементе '.setup-user-name'
  setupUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  // Объявим callback-функцию, которая отправляет данные формы
  // на сервер и закрывает окно диалога
  var onLoad = function () {
    window.setup.classList.add('hidden');
  };

  // Объявим callback-функцию, которая сообщит об ошибке
  // при неуспешной отправке данных на сервер
  var onError = function (message) {
    var node = document.createElement('div');
    node.style.backgroundColor = 'red';
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.position = 'relative';
    node.style.fontSize = '18px';
    node.style.color = 'white';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = window.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  });

  // Проведем валидацию ввода имени персонажа
  setupUserName.required = true;
  setupUserName.minLength = 2;
  setupUserName.maxLength = 50;

  // Добавим в окно попап функционал изменения по клику мыши:
  // 1) цвет плаща мага из набора 'WIZARD_COAT_COLOR';
  // 2) цвет глаз мага из набора 'WIZARD_EYES_COLOR';
  // 2) цвет фаербола из набора 'WIZARD_FIREBALL_COLOR'.

  // Задаем необходимые переменные
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // 1)
  window.colorize(wizardCoat, window.util.WIZARD_COAT_COLOR, fillElement);
  // 2)
  window.colorize(wizardEyes, window.util.WIZARD_EYES_COLOR, fillElement);
  // 3)
  window.colorize(wizardFireball, window.util.WIZARD_FIREBALL_COLOR, changeElementBackground);

  // Реализуем функционал перетаскивания окна '.setup'
  // Найдем элемент, за который будем 'тянуть' окно
  var dialogHandle = window.setup.querySelector('.upload');

  // Отменяем действие по умолчанию на клик по '.upload'
  dialogHandle.addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

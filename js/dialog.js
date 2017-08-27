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

  // 1)
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.util.getRandomValue(window.util.WIZARD_COAT_COLOR);
  });

  // 2)
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomValue(window.util.WIZARD_EYES_COLOR);
  });

  // 3)
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = window.util.getRandomValue(window.util.WIZARD_FIREBALL_COLOR);
  });
})();

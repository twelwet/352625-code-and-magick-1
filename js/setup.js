// setup.js
'use strict';

(function () {
  // Находим DIV всплывающего окна с настройками мага
  var userDialog = document.querySelector('.setup');

  // Находим пустой DIV списка похожих персонажей
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  // Находим TEMPLATE похожего персонажа
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

  // Объявляем переменную-массив похожих персонажей
  var wizards = new Array(window.util.WIZARD_QUANTITY);

  // Заполняем в цикле переменную-массив похожих персонажей
  // рандомными данными из соответствующих констант
  for (var i = 0; i < wizards.length; i++) {
    wizards[i] = {
      name: window.util.getRandomValue(window.util.WIZARD_NAMES),
      surname: window.util.getRandomValue(window.util.WIZARD_SURNAMES),
      coatColor: window.util.getRandomValue(window.util.WIZARD_COAT_COLOR),
      eyesColor: window.util.getRandomValue(window.util.WIZARD_EYES_COLOR)
    };
  }

  // Объявляем функцию создания DOM-элемента похожего персонажа
  var renderWizard = function (wizard) {
    // Объявляем переменную, в которую клонируем шаблон похожего героя
    var wizardElement = similarWizardTemplate.cloneNode(true);
    // Задаем имя персонажа, цвет мантии, цвет глаз
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // Объявляем функцию заполнения блока DOM-элементами
  var drawAllWizards = function () {
    var fragment = document.createDocumentFragment();
    for (i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  drawAllWizards();
  window.setup = userDialog;
})();

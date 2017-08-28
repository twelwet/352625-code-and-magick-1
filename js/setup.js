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

  // Реализуем функционал перетаскивания артефактов в окне '.setup'

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    // artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    artifactsElement.style.outline = '';
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();

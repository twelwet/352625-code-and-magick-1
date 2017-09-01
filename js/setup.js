// setup.js
'use strict';

(function () {
  // Находим DIV всплывающего окна с настройками мага
  var userDialog = document.querySelector('.setup');

  // Находим пустой DIV списка похожих персонажей
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  // Находим TEMPLATE похожего персонажа
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

  // Объявим функцию создания DOM-элемента похожего персонажа
  var renderWizard = function (wizard) {
    // Объявляем переменную, в которую клонируем шаблон похожего героя
    var wizardElement = similarWizardTemplate.cloneNode(true);
    // Задаем имя персонажа, цвет мантии, цвет глаз
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // Объявим callback-функцию которая заполнит DIV '.setup-similar'
  // DOM-элементами при успешной загрузке данных
  var onLoad = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.WIZARD_QUANTITY; i++) {
      fragment.appendChild(renderWizard(array[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Объявим callback-функцию, которая сообщит об ошибке
  // при неуспешной попытке загрузить данные с сервера
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

  // Вызовем саму функцию загрузки данных
  window.backend.load(onLoad, onError);

  window.setup = userDialog;

  // Реализуем функционал перетаскивания артефактов в окне '.setup'

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
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

import { getResource } from "../services/services";

function cards() {
  // используем классы для карточек 

  class Card {
    constructor(data, templateSelector, parentSelector, ...classes) {
        this._src = data.src;
        this._alt = data.alt;
        this._title = data.title;
        this._descr = data.descr;
        this._price = data.price;
        this._transfer = 27;
        this._templateSelector = templateSelector;
        this._parentSelector = document.querySelector(parentSelector);
        this._classesArray = classes;
        this._changeToUAH();
    }

    _changeToUAH() {
      this._price = this._price * this._transfer;
    }

    _getTemplate() {

      return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.menu__item')
      .cloneNode(true);
    
    }

    _generateCard() {
      this._element = this._getTemplate();
      this._classesArray?.forEach(className => this._element.classList.add(className));
      this._elementImage = this._element.querySelector('.menu__item-image');
      this._elementTitle = this._element.querySelector('.menu__item-subtitle');
      this._elementDescr = this._element.querySelector('.menu__item-descr');
      this._elementPrice = this._element.querySelector('.menu__item-total > span');

      this._elementImage.src = this._src;
      this._elementImage.alt = this._alt;
      this._elementDescr.textContent = this._descr;
      this._elementTitle.textContent = this._title;
      this._elementPrice.textContent = this._price;

      return this._element;
    }

    render() {
      const cardElement = this._generateCard();
      this._parentSelector.append(cardElement);
    }

  }




  getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card({
                src: img,
                alt: altimg,
                title: title,
                descr: descr,
                price: price
            },'#menu-card' ,".menu .container").render();
        });
    });
}

export default cards;
const script = require('./function');

const productsList = [
  { id: 1, name: 'Молоко', count: 400, priceForOne: 50, priceTotal: 0 },
  { id: 2, name: 'Хлеб', count: 100, priceForOne: 20, priceTotal: 0 },
  { id: 3, name: 'Лук', count: 200, priceForOne: 5, priceTotal: 0 },
];

function createObservableObject(array, callback) {
  return new Proxy(array, {
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    },
  });
}
function createObservableArray(array, callback) {
  return new Proxy(array, {
    apply(target, thisArg) {
      callback();
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty() {
      callback();
      return true;
    },
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    },
  });
}

function updateUI() {
  script.calculationTotalPrice(productsList);
  let totalCost = script.totalCostCalculation(productsList);
  const source = document.getElementById('store-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ productsList, totalCost });
  document.getElementById('result-table').innerHTML = html;
  const arrayOfInputCount = document.getElementsByClassName('table-column__input-count');
  const arrayOfInputPrice = document.getElementsByClassName('table-column__input-price');
  document.querySelectorAll('.input').forEach((element) => {
    element.addEventListener('dblclick', (event) => {
      event.target.readOnly = false;
    });
  });
  for (let i = 0; i < arrayOfInputCount.length; i += 1) {
    arrayOfInputCount[i].addEventListener('keydown', (e) => {
      const { key } = e;
      if (key === 'Enter') {
        script.setCount(productsList[i], arrayOfInputCount[i].value);
        return true;
      }
      return false;
    });
  }
  for (let i = 0; i < arrayOfInputPrice.length; i += 1) {
    arrayOfInputPrice[i].addEventListener('keydown', (e) => {
      const { key } = e;
      if (key === 'Enter') {
        script.setPrice(productsList[i], arrayOfInputPrice[i].value);
        return true;
      }
      return false;
    });
  }
}

window.onload = function upload() {
  for (let i = 0; i < listLength; i++) {
    productsList[i] = createObservableObject(productsList[i], updateUI);
  }
  productsList = createObservableArray(productsList, updateUI);
  updateUI();
};

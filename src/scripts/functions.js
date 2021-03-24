function totalCostCalculation(list) {
  const reducer = (accumulator, currentValue) => accumulator + calculationTotalPrice(list);
  return list.reduce(reducer, 0);
}

function calculationTotalPrice(list) {
  if (Array.isArray(list) && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      list[i].priceTotal = list[i].count * list[i].priceForOne;
    }
    return true;
  }
  return false;
}

function setCount(elementProduct, count) {
  elementProduct.count = count;
  return true;
}
function setPrice(elementProduct, price) {
  elementProduct.priceForOne = price;
  return true;
}

module.exports = {
  totalCostCalculation(list),
  calculationTotalPrice(list),
  setCount(elementProduct, count),
  setPrice(elementProduct, price),
};

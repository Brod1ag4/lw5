module.exports.totalCostCalculation = function totalCostCalculation(list) {
  const reducer = (accumulator, currentValue) => accumulator + calculationTotalPrice(list);
  return list.reduce(reducer, 0);
};

module.exports.calculationTotalPrice = function calculationTotalPrice(list) {
  if (Array.isArray(list) && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      list[i].priceTotal = list[i].count * list[i].priceForOne;
    }
    return true;
  }
  return false;
};

module.exports.setCount = function setCount(elementProduct, count) {
  elementProduct.count = count;
  return true;
};
module.exports.setPrice = function setPrice(elementProduct, price) {
  elementProduct.priceForOne = price;
  return true;
};

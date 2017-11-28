export default (items, start, quantity) => {
  let newItems = [];
  const index = start + 1;
  const quantityOnLeft = index - 1;
  const quantityOnRight = Math.abs(index - items.length);
  const rest = quantity - quantityOnRight;
  const half = (quantity - 1) / 2;

  if (quantity === 1) {
    return items.slice(start, index);
  }

  if (!quantityOnLeft) {
    return items.slice(0, quantity);
  }

  if (!quantityOnRight) {
    return items.slice(-quantity);
  }

  if (quantityOnRight === quantityOnLeft && quantity % 2 > 0) {
    newItems = newItems.concat(items.slice(start - half, start));
    newItems.push(items[start]);
    newItems = newItems.concat(items.slice(index, index + half));
    return newItems;
  }

  if (quantityOnRight > rest) {
    return newItems.concat(items.slice(start, quantity + start));
  }

  if (rest) {
    newItems = newItems.concat(items.slice(index - rest, start));
  }
  newItems = newItems.concat(items.slice(start, quantityOnRight + index));
  return newItems;
}

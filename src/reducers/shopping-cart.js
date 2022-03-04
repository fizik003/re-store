const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx + 1) {
    return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
  }

  return [...cartItems, item];
};

const updateCartItem = (book, item = {}, quantity) => {
  const { id = book.id, title = book.title, total = 0, count = 0 } = item;
  return {
    id,
    title,
    count: count + quantity,
    total: total + book.price * quantity,
  };
};

const updateOrder = (state, bookId, quantity) => {
  const {
    bookList: { books },
    shoppingCart: { cartItems },
  } = state;
  const book = books.find((book) => book.id === bookId);

  const itemId = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemId];
  const newItem = updateCartItem(book, item, quantity);

  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemId),
  };
};

export const updateShoppingCart = (state, action) => {
  if (!state)
    return {
      cartItems: [],
      orderTotal: 0,
    };
  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);

    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);

    case "ALL_BOOK_REMOVED_FROM_CART":
      const item = state.shoppingCart.cartItems.find(
        ({ id }) => id === action.payload
      );
      return updateOrder(state, action.payload, -item.count);

    default:
      return state.shoppingCart;
  }
};

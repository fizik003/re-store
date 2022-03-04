export const booksRequested = () => ({
  type: "FETCH_BOOKS_REQUEST",
});

export const booksLoaded = (newBooks) => ({
  type: "FETCH_BOOKS_SUCCESS",
  payload: newBooks,
});

export const booksError = (error) => ({
  type: "FETCH_BOOKS_FAILURE",
  payload: error,
});

export const bookAddedToCart = (bookId) => {
  return {
    type: "BOOK_ADDED_TO_CART",
    payload: bookId,
  };
};

export const bookRemoveFromCart = (bookId) => {
  return {
    type: "BOOK_REMOVED_FROM_CART",
    payload: bookId,
  };
};

export const allBookRemoveFromCart = (bookId) => ({
  type: "ALL_BOOK_REMOVED_FROM_CART",
  payload: bookId,
});

// this function works without redux-thunk
export const fetchBooksOld = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

// this function works with redux-thunk
export const fetchBooks = (bookstoreService) => () => (dispatch) => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

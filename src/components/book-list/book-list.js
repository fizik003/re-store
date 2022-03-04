import React, { Component } from "react";
import { BookListItem } from "../book-list-item";
import { connect } from "react-redux";
import { withBookstorService } from "../hoc";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import "./book-list.css";

const BookList = ({ books, onAddedToCart }) => (
  <ul className="book-list">
    {books.map((book) => {
      return (
        <li key={book.id}>
          <BookListItem
            onAddedToCart={() => onAddedToCart(book.id)}
            book={book}
          />
        </li>
      );
    })}
  </ul>
);

export class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    const { books, loading, error, onAddedToCart } = this.props;
    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator />;

    return <BookList onAddedToCart={onAddedToCart} books={books} />;
  }
}

const mapStateToProps = (state) => {
  const {
    bookList: { books, loading, error },
  } = state;
  return {
    books,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
  };
};

export default compose(
  withBookstorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

package books.service;

import books.model.Book;

import java.util.List;

public interface BookService {

    Book getBookById(int id);

    List<Book> getAllBooks();

    boolean deleteBook(Book book);

    boolean updateBook(Book book);

    boolean createBook(Book book);

    List<Book> getWishBooksByUserId(int userId);

    List<Book> getReadBooksByUserId(int userId);

    List<Book> searchBooks(String key, int max);

    List<Boolean> isWished(String key, int max, int id);

    List<Boolean> isRead(String key, int max, int id);

    boolean wishBook(int userId, int bookId);

    boolean cancelWish(int userId, int bookId);

    boolean readBook(int userId, int bookId);

    boolean cancelRead(int userId, int bookId);


}

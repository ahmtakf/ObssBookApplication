package books.dao;

import books.model.Book;

import java.util.List;

public interface BookDao {

    Book getBookById(int id);

    List<Book> getAllBooks();

    boolean deleteBook(Book book);

    boolean updateBook(Book book);

    boolean createBook(Book book);

    List<Book> getReadBooksByUserId(int userId);

    List<Book> getWishBooksByUserId(int userId);

    List<Book> searchBooks(String key, int max);

    List<Boolean> isWishedByUser(String key, int max, int id);

    List<Boolean> isReadByUser(String key, int max, int id);

    boolean wishBook(int userId, int bookId);

    boolean cancelWish(int userId, int bookId);

    boolean readBook(int userId, int bookId);

    boolean cancelRead(int userId, int bookId);

}
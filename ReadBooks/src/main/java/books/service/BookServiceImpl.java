package books.service;

import books.dao.BookDao;
import books.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService{


    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBookById(int id) {
        return bookDao.getBookById(id);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookDao.getAllBooks();
    }

    @Override
    public boolean deleteBook(Book book) {
        return bookDao.deleteBook(book);
    }

    @Override
    public boolean updateBook(Book book) {
        return bookDao.updateBook(book);
    }

    @Override
    public boolean createBook(Book book) {
        return bookDao.createBook(book);
    }

    @Override
    public List<Book> getWishBooksByUserId(int userId) {
        return bookDao.getWishBooksByUserId(userId);
    }

    @Override
    public List<Book> getReadBooksByUserId(int userId) {
        return bookDao.getReadBooksByUserId(userId);
    }

    @Override
    public List<Book> searchBooks(String key, int max) {
        return bookDao.searchBooks(key, max);
    }

    @Override
    public List<Boolean> isWished(String key, int max, int id) {
        return bookDao.isWishedByUser(key, max, id);
    }

    @Override
    public List<Boolean> isRead(String key, int max, int id) {
        return  bookDao.isReadByUser(key, max, id);
    }

    @Override
    public boolean wishBook(int userId, int bookId) {
        return bookDao.wishBook(userId, bookId);
    }

    @Override
    public boolean cancelWish(int userId, int bookId) {
        return bookDao.cancelWish(userId, bookId);
    }

    @Override
    public boolean readBook(int userId, int bookId) {
        return bookDao.readBook(userId, bookId);
    }

    @Override
    public boolean cancelRead(int userId, int bookId) {
        return bookDao.cancelRead(userId, bookId);
    }
}

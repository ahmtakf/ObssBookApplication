package books.dao;

import books.model.Book;
import books.model.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Component
public class BookDaoImpl implements BookDao{

    JdbcTemplate jdbcTemplate;

    private final String SQL_FIND_BOOK = "select * from book where id = ?";
    private final String SQL_DELETE_BOOK = "delete from book where id = ?";
    private final String SQL_UPDATE_BOOK = "update book set name = ?, publishDate = ?, pageSize  = ?, author = ? where id = ?";
    private final String SQL_GET_ALL = "select * from book";
    private final String SQL_INSERT_BOOK = "insert into book(name, publishDate, pageSize, author) values(?,?,?,?)";

    @Autowired
    public BookDaoImpl(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Book getBookById(int id) {
        return jdbcTemplate.queryForObject(SQL_FIND_BOOK, new Object[] { id }, new BookMapper());
    }

    @Override
    public List<Book> getAllBooks() {

        return jdbcTemplate.query(SQL_GET_ALL, new BookMapper());
    }
    @Override
    public boolean deleteBook(Book book) {

        return jdbcTemplate.update(SQL_DELETE_BOOK, book.getId()) > 0;
    }
    @Override
    public boolean updateBook(Book book) {
        return jdbcTemplate.update(SQL_UPDATE_BOOK, book.getName(), book.getPublishDate(), book.getPageSize(),
                book.getAuthor(), book.getId()) > 0;
    }
    @Override
    public boolean createBook(Book book) {
        return jdbcTemplate.update(SQL_INSERT_BOOK, book.getName(), book.getPublishDate(), book.getPageSize(),
                book.getAuthor().getId()) > 0;
    }

    @Override
    public List<Book> getReadBooksByUserId(int userId) {
        String SQL_GET_ALL_USER_ID = "select b.id,b.name,b.publishDate,b.pageSize, a.id as authorId,a.name as authorName,a.surname as authorSurname,a.birthday as authorBirthday from book b, author a where b.author = a.id and b.id in (select book from user_read_book u where u.user =" + userId +")";

        return jdbcTemplate.query(SQL_GET_ALL_USER_ID, new BookMapper());
    }

    @Override
    public List<Book> getWishBooksByUserId(int userId) {
        String SQL_GET_ALL_USER_ID = "select b.id,b.name,b.publishDate,b.pageSize, a.id as authorId,a.name as authorName,a.surname as authorSurname,a.birthday as authorBirthday from book b, author a where b.author = a.id and b.id in (select book from user_wish_book u where u.user =" + userId +")";

        return jdbcTemplate.query(SQL_GET_ALL_USER_ID, new BookMapper());
    }

    @Override
    public List<Book> searchBooks(String key, int max) {
        String SQL_GET_ALL_USER_ID = "select b.id,b.name,b.publishDate,b.pageSize, a.id as authorId,a.name as authorName,a.surname as authorSurname,a.birthday as authorBirthday from book b, author a where b.author = a.id and b.name like '%" + key +"%' limit " + max;

        return jdbcTemplate.query(SQL_GET_ALL_USER_ID, new BookMapper());
    }

    @Override
    public List<Boolean> isWishedByUser(String key, int max, int id) {
        String ISWISHED_BOOKS = "Select IF(uw.id IS NULL, FALSE, TRUE) as isWished from (select b.id as bid  from book b, author a where b.author = a.id and b.name like '%"+key+"%' limit "+max+") as bo LEFT JOIN (Select * from user_wish_book where user = "+id+") as uw ON (uw.book = bo.bid)";

        return jdbcTemplate.query(ISWISHED_BOOKS, new RowMapper<Boolean>() {
            @Override
            public Boolean mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getBoolean(1);
            }
        });
    }

    @Override
    public List<Boolean> isReadByUser(String key, int max, int id) {
        String ISREAD_BOOKS = "Select IF(uw.id IS NULL, FALSE, TRUE) as isRead from (select b.id as bid  from book b, author a where b.author = a.id and b.name like '%"+key+"%' limit "+max+") as bo LEFT JOIN (Select * from user_read_book where user = "+id+") as uw ON (uw.book = bo.bid)";

        return jdbcTemplate.query(ISREAD_BOOKS, new RowMapper<Boolean>() {
            @Override
            public Boolean mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getBoolean(1);
            }
        });
    }

    @Override
    public boolean wishBook(int userId, int bookId) {
        String WISH_BOOK = "insert into user_wish_book(book, user, wishDate) values(?,?,?)";

        return jdbcTemplate.update(WISH_BOOK, bookId, userId, new Date()) > 0;
    }

    @Override
    public boolean cancelWish(int userId, int bookId) {
        String CANCEL = "delete from user_wish_book where user = ? and book = ?";

        return jdbcTemplate.update(CANCEL, userId, bookId) > 0;
    }

    @Override
    public boolean readBook(int userId, int bookId) {
        String READ_BOOK = "insert into user_read_book(book, user, startDate, endDate) values(?,?,?,?)";

        return jdbcTemplate.update(READ_BOOK, bookId, userId, new Date(), null) > 0;
    }

    @Override
    public boolean cancelRead(int userId, int bookId) {

        String CANCEL = "delete from user_read_book where user = ? and book = ?";

        return jdbcTemplate.update(CANCEL, userId, bookId) > 0;
    }


}

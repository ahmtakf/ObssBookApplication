package books.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class BookMapper implements RowMapper<Book> {
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {

        Book book = new Book();

        book.setId(rs.getInt("id"));
        book.setName(rs.getString("name"));
        book.setPublishDate((Date)rs.getObject("publishDate"));
        book.setPageSize(rs.getInt("pageSize"));

        Author author = new Author();

        author.setId(rs.getInt("authorId"));
        author.setName(rs.getString("authorName"));
        author.setSurname(rs.getString("authorSurname"));
        author.setBirthday((Date)rs.getObject("authorBirthday"));

        book.setAuthor(author);

        return book;
    }
}

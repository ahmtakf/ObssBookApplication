package books.dao;

import books.model.Author;
import books.model.Author;
import books.model.AuthorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;

@Component
public class AuthorDaoImpl implements AuthorDao{

    JdbcTemplate jdbcTemplate;

    private final String SQL_FIND_AUTHOR = "select * from author where id = ?";
    private final String SQL_DELETE_AUTHOR = "delete from author where id = ?";
    private final String SQL_UPDATE_AUTHOR = "update author set name = ?, surname = ?, birthday  = ? where id = ?";
    private final String SQL_GET_ALL = "select * from author";
    private final String SQL_INSERT_AUTHOR = "insert into author(name, surname, birthday) values(?,?,?)";

    @Autowired
    public AuthorDaoImpl(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Author getAuthorById(int id) {
        return jdbcTemplate.queryForObject(SQL_FIND_AUTHOR, new Object[] { id }, new AuthorMapper());
    }

    @Override
    public List<Author> getAllAuthors() {

        return jdbcTemplate.query(SQL_GET_ALL, new AuthorMapper());
    }
    @Override
    public boolean deleteAuthor(Author author) {
        return jdbcTemplate.update(SQL_DELETE_AUTHOR, author.getId()) > 0;
    }
    @Override
    public boolean updateAuthor(Author author) {
        return jdbcTemplate.update(SQL_UPDATE_AUTHOR, author.getName(), author.getSurname(), author.getBirthday(),
                author.getId()) > 0;
    }
    @Override
    public boolean createAuthor(Author author) {
        return jdbcTemplate.update(SQL_INSERT_AUTHOR, author.getName(), author.getSurname(),
                author.getBirthday()) > 0;
    }

}

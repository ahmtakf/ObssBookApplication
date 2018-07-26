package books.service;

import books.dao.AuthorDao;
import books.model.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthorServiceImpl implements AuthorService{

    @Autowired
    private AuthorDao authorDao;

    @Override
    public Author getAuthorById(int id) {
        return authorDao.getAuthorById(id);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorDao.getAllAuthors();
    }

    @Override
    public boolean deleteAuthor(Author author) {
        return authorDao.deleteAuthor(author);
    }

    @Override
    public boolean updateAuthor(Author author) {
        return authorDao.updateAuthor(author);
    }

    @Override
    public boolean createAuthor(Author author) {
        return authorDao.createAuthor(author);
    }

}

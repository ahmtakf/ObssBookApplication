package books.dao;

import books.model.Author;

import java.util.List;

public interface AuthorDao {

    Author getAuthorById(int id);

    List<Author> getAllAuthors();

    boolean deleteAuthor(Author author);

    boolean updateAuthor(Author author);

    boolean createAuthor(Author author);
    
}

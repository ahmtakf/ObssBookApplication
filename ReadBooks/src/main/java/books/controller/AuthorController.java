package books.controller;

import books.model.Author;
import books.service.AuthorService;
import books.service.AuthorServiceImpl;
import books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/author")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/add")
    public ResponseEntity addAuthor(@RequestBody Author author) {

        authorService.createAuthor(author);

        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PostMapping("/getall")
    public ResponseEntity getAll() {

        return new ResponseEntity<>(authorService.getAllAuthors(), HttpStatus.OK);
    }


}

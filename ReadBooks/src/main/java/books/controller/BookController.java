package books.controller;

import books.model.Book;
import books.model.User;
import books.service.BookService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "*")
public class BookController {
    
    @Autowired
    private BookService bookService;
    
    @PostMapping("/add")
    public ResponseEntity addBook(@RequestBody Book book) {

        System.out.println("book");

        bookService.createBook(book);

        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("/getread")
    public ResponseEntity getReadBook(@AuthenticationPrincipal final User user) {

        List<Book> books = bookService.getReadBooksByUserId(user.getId());



        return new ResponseEntity<>( books, HttpStatus.OK);
    }

    @PostMapping("/getwish")
    public ResponseEntity getWishBook(@AuthenticationPrincipal final User user) {

        List<Book> books = bookService.getWishBooksByUserId(user.getId());

        return new ResponseEntity<>( books, HttpStatus.OK);
    }

    @PostMapping("/wish")
    public ResponseEntity wishBook(@AuthenticationPrincipal final User user, @RequestBody Book book) {

        bookService.wishBook(user.getId(),book.getId());

        return new ResponseEntity<>( book, HttpStatus.OK);
    }

    @PostMapping("/cancelwish")
    public ResponseEntity cancelWish(@AuthenticationPrincipal final User user, @RequestBody Book book) {

        bookService.cancelWish(user.getId(),book.getId());

        return new ResponseEntity<>( book, HttpStatus.OK);
    }

    @PostMapping("/read")
    public ResponseEntity readBook(@AuthenticationPrincipal final User user, @RequestBody Book book) {

        bookService.readBook(user.getId(),book.getId());

        return new ResponseEntity<>( book, HttpStatus.OK);
    }

    @PostMapping("/cancelread")
    public ResponseEntity cancelRead(@AuthenticationPrincipal final User user, @RequestBody Book book) {

        bookService.cancelRead(user.getId(),book.getId());

        return new ResponseEntity<>( book, HttpStatus.OK);
    }



    @PostMapping("/search")
    public ResponseEntity searchBooks(@AuthenticationPrincipal final User user, @RequestBody JsonNode search) {

        List<Book> books = bookService.searchBooks(search.get("key").asText(), search.get("max").asInt());

        Map<String, Object> hmap = new HashMap<>();
        hmap.put("books", books);

        List<Boolean> isWished = bookService.isWished(search.get("key").asText(), search.get("max").asInt(), user.getId());

        hmap.put("isWished",isWished);

        List<Boolean> isRead = bookService.isRead(search.get("key").asText(), search.get("max").asInt(), user.getId());

        hmap.put("isRead",isRead);

        return new ResponseEntity<>( hmap, HttpStatus.OK);
    }
    
}

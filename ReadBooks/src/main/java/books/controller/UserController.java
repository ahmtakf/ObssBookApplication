package books.controller;

import books.model.User;
import books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

  /*  @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;*/

    @GetMapping
    public List getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/signup")
    public ResponseEntity signUpUser(@RequestBody User user) {

        userService.createUser(user);

        return loginUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) {

        User loggedUser = userService.login(user);

        return new ResponseEntity<>(loggedUser, HttpStatus.OK);
    }

}

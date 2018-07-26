package books.service;

import books.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User getUserById(int id);

    List<User> getAllUsers();

    boolean deleteUser(User user);

    boolean updateUser(User user);

    boolean createUser(User user);

    User login(User user);

    Optional<User> findByToken(final String token);

    void logout(final User user);

}

package books.dao;

import books.model.User;

import java.util.List;

public interface UserDao {

    User getUserById(int id);

    List<User> getAllUsers();

    boolean deleteUser(User user);

    boolean updateUser(User user);

    boolean createUser(User user);

    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);

}

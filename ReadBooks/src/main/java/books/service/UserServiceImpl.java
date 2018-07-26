package books.service;

import books.dao.UserDao;
import books.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public final class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private TokenService tokenService;

    private Map<String, User> tokenedUsers = new HashMap<>();

    @Override
    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    public boolean deleteUser(User user) {
        return userDao.deleteUser(user);
    }

    @Override
    public boolean updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public boolean createUser(User user) {

        return userDao.createUser(user);
    }

    @Override
    public User login(User user) {

        Map<String,String> map = new HashMap<>();

        map.put("username", user.getUsername());

        User temp = userDao.findByUsername(user.getUsername());

        tokenedUsers.put(user.getUsername(), temp);

        String token = tokenService.expiring(map);

        Optional<User> currentUser = Optional.of(temp)
                .filter(u -> Objects.equals(user.getPassword(), u.getPassword()))
                .map(u -> findByToken(token).get());

        currentUser.get().setToken(token);

        currentUser.get().setPassword("");

        return currentUser.get();
    }

    @Override
    public Optional<User> findByToken(String token) {

        Optional<String> currentUsername = Optional
                .of(tokenService.verify(token))
                .map(map -> map.get("username"));

        return Optional.of(tokenedUsers.get(currentUsername.get()));
    }

    @Override
    public void logout(User user) {
        tokenedUsers.remove(user.getUsername());
    }

}

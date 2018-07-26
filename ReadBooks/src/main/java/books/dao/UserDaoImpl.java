package books.dao;

import books.model.UserMapper;
import books.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;

@Component
public class UserDaoImpl implements UserDao{

    JdbcTemplate jdbcTemplate;

    private final String SQL_FIND_USER = "select * from user where id = ?";
    private final String SQL_DELETE_USER = "delete from user where id = ?";
    private final String SQL_UPDATE_USER = "update user set username = ?, password = ?, isAdmin  = ? where id = ?";
    private final String SQL_GET_ALL = "select * from user";
    private final String SQL_INSERT_USER = "insert into user(username, password, isAdmin) values(?,?,?)";
    private final String SQL_LOGIN_USER = "select * from user where username = ? and password = ?";
    private final String SQL_FIND_USERNAME = "select * from user where username = ?";


    @Autowired
    public UserDaoImpl(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public User getUserById(int id) {
        return jdbcTemplate.queryForObject(SQL_FIND_USER, new Object[] { id }, new UserMapper());
    }

    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query(SQL_GET_ALL, new UserMapper());
    }
    @Override
    public boolean deleteUser(User user) {
        return jdbcTemplate.update(SQL_DELETE_USER, user.getId()) > 0;
    }
    @Override
    public boolean updateUser(User user) {
        return jdbcTemplate.update(SQL_UPDATE_USER, user.getUsername(), user.getPassword(), user.getIsAdmin(),
                user.getId()) > 0;
    }
    @Override
    public boolean createUser(User user) {
        return jdbcTemplate.update(SQL_INSERT_USER, user.getUsername(), user.getPassword(),
                user.getIsAdmin()) > 0;
    }

    @Override
    public User findByUsernameAndPassword(String username, String password) {
        return jdbcTemplate.queryForObject(SQL_LOGIN_USER, new Object[] { username , password}, new UserMapper());
    }

    @Override
    public User findByUsername(String username) {
        return jdbcTemplate.queryForObject(SQL_FIND_USERNAME, new Object[] { username }, new UserMapper());
    }


}

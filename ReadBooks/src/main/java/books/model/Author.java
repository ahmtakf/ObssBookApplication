package books.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Author {

    private int id;

    private String name;

    private String surname;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthday;

    public Author() {

    }

    public Author(int id, String name, String surname, Date birthday) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}

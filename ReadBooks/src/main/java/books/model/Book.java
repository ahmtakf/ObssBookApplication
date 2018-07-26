package books.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Book {

    private int id;

    private String name;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date publishDate;

    private int pageSize;

    private Author author;

    public Book() {

    }

    public Book(int id, String name, Date publishDate, int pageSize, Author author) {
        this.id = id;
        this.name = name;
        this.publishDate = publishDate;
        this.pageSize = pageSize;
        this.author = author;
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

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }


    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}

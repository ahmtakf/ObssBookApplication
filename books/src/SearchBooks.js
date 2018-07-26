import React from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Cookies } from '../node_modules/react-cookie';
import  { Redirect } from 'react-router-dom'

const bookSearchStyle = {
    border:"5px solid red",
    float: 'left',
    width: '20%',
    height: '250px',
    padding: '10px'
};

const bStyle = {
    "marginLeft": "50px",
    "marginTop":"10px"
};

class SearchBooks extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {navigate:false, redirect:"", cookie:new Cookies("user"), error:'', key:'', books:[], isWished:[], isRead:[]};
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.wish = this.wish.bind(this);
        this.read = this.read.bind(this);
    }

    handleChange(event)
    {
        this.setState({key:event.target.value});
    }

    handleBack()
    {
        if (this.state.cookie.get("isAdmin") === "true")
            this.setState({ navigate:true, redirect:"/adminprofile"});
        else
            this.setState({ navigate:true, redirect:"/userprofile"});
    }

    wish(index)
    {
        if (this.state.isWished[index]){

            //so cancel
            BooksAPI.cancelWish(this.state.books[index],this.state.cookie.get("token")).then((book)=>{

                console.log(book);

                if (!book || book.hasOwnProperty('error'))
                {
                    console.log("Search Books Error!");
                }
                else
                {
                    var temp = this.state.isWished;
                    temp[index] = false;
                    this.setState({isWished:temp});
                }

            })
        }
        else{

            //wish reading
            BooksAPI.wishBook(this.state.books[index],this.state.cookie.get("token")).then((book)=>{

                console.log(book);

                if (!book || book.hasOwnProperty('error'))
                {
                    console.log("Search Books Error!");
                }
                else
                {
                    var temp = this.state.isWished;
                    temp[index] = true;
                    this.setState({isWished:temp});
                }

            })

        }
    }

    read(index)
    {
        if (this.state.isRead[index]){
            //so cancel
            BooksAPI.cancelRead(this.state.books[index],this.state.cookie.get("token")).then((book)=>{

                console.log(book);

                if (!book || book.hasOwnProperty('error'))
                {
                    console.log("Search Books Error!");
                }
                else
                {
                    var temp = this.state.isRead;
                    temp[index] = false;
                    this.setState({isRead:temp});
                }

            })
        }
        else{
            //start reading
            BooksAPI.readBook(this.state.books[index],this.state.cookie.get("token")).then((book)=>{

                console.log(book);

                if (!book || book.hasOwnProperty('error'))
                {
                    console.log("Search Books Error!");
                }
                else
                {
                    var temp = this.state.isRead;
                    temp[index] = true;
                    this.setState({isRead:temp});
                }

            })

        }
    }

    search()
    {
        this.setState({key:''});
        BooksAPI.search(this.state.key, 100, this.state.cookie.get("token")).then((books) => {
               
            console.log(books);

            if (!books || books.hasOwnProperty('error'))
            {
                console.log("Search Books Error!");
            }
            else
            {
                this.setState({books:books.books, isWished:books.isWished, isRead:books.isRead});
            }
            
        });
    }

    render()
    {
        if (!this.state.navigate)
            return  <div>
                Kitap ismi:
                <input type="text" value={this.state.key} onChange={this.handleChange}/>
                <button style={bStyle} onClick={this.search}>Ara</button>
                <button style={bStyle} onClick={this.handleBack}>Back</button>
                <table>
                <tbody>
                {this.state.books.map((book, i)=>{
                    return <tr style={bookSearchStyle} key={i} >
                            <td><Book name={book.name} publishDate={book.publishDate} pageSize={book.pageSize} author={book.author}/>
                            <br/><button onClick={() => this.wish(i)} style={bStyle}>{this.state.isWished[i]?"cancel wish":"wish reading"}</button>
                            <br/><button onClick={() => this.read(i)} style={bStyle}>{this.state.isRead[i]?"cancel read":"start reading"}</button>
                            </td>
                            </tr>;
                })}
                </tbody>
                </table>
                <p>{this.state.error}</p>
                </div> ;
        else
            return <Redirect to={this.state.redirect}/>;
    }

}

export default SearchBooks;
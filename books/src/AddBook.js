import React from 'react';
import * as AuthorAPI from './AuthorAPI';
import * as BookAPI from './BooksAPI';
import Cookies from 'universal-cookie';
import  { Redirect, Switch } from 'react-router-dom'

class AddBook extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {name: '', pageSize: '', publishDate:'', author:'', error:'', authors:[], cookie:new Cookies("user"), navigate:false, redirect:'/'};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePageSize = this.handleChangePageSize.bind(this);
        this.handleChangePublishDate = this.handleChangePublishDate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.changeAuthor = this.changeAuthor.bind(this);
    }

    componentDidMount()
    {
        console.log(this.state.cookie.get('token'));

        AuthorAPI.getAll(this.state.cookie.get('token')).then((authors)=>{

            console.log(authors);

            if (!authors || authors.hasOwnProperty('error'))
            {
                this.setState({error:"Error ".concat(authors)});
            }
            else
            {
                this.setState({authors:authors});
            }
        });

    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    //Can be done with one handleChange and name tags 
    //this.setState({{event.target.name}: event.target.value});
    handleChangeName(event) {
        this.setState({  name : event.target.value});
    }

    handleChangePageSize(event) {
        this.setState({  pageSize : event.target.value});
    }

    handleChangePublishDate(event) {
        this.setState({  publishDate : event.target.value});
    }

    handleBack()
    {
        this.setState({ navigate:true, redirect:"/adminprofile"});
    }

    changeAuthor(event)
    {
        console.log(this.state.authors[event.target.value]);
        this.setState({ author:this.state.authors[event.target.value]});
    }
    
    handleAdd(event) {

        if (this.isBlank(this.state.name))
        {
            this.setState({error: "name cannot be empty!"});
        }
        else if (this.isBlank(this.state.pageSize))
        {
            this.setState({error: "Page Size cannot be empty!"});
        }
        else if (this.isBlank(this.state.publishDate))
        {
            this.setState({error: "Publish Date cannot be empty!"});
        }
        else{
            this.setState({error: "", name:"", pageSize:"", publishDate:""});

            BookAPI.addBook(this.state.name, this.state.pageSize, this.state.publishDate, this.state.author, this.state.cookie.get("token")).then((book)=>
                {
                    console.log(book);
                }
            );


        }
        event.preventDefault();
    }

    render()
    {
        if (!this.state.navigate)
            return <form>
                    Name:<br/>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                    <br/>
                    Page Size (Number):<br/>
                    <input type="text" value={this.state.pageSize} onChange={this.handleChangePageSize}/>
                    <br/>   
                    Publish Date YYYY-MM-DD:<br/>
                    <input type="text" value={this.state.publishDate} onChange={this.handleChangePublishDate}/>
                    <br/>
                    Author:<br/>
                    <select onChange={this.changeAuthor}>
                        <option value="0">Select author:</option>
                        {this.state.authors.map((author, i)=>{
                                return <option key={i} value={i}>{author.name}  {author.surname}</option>
                        })}
                    </select>
                    <br/><br/>
                    <button onClick={this.handleAdd}>Add Book</button>
                    <br/><br/>
                    <button onClick={this.handleBack}>Back</button>
                    <p>{this.state.error}</p>
                </form> ;
        else
            return <Switch><Redirect to={this.state.redirect} /></Switch>;
    }

}

export default AddBook;
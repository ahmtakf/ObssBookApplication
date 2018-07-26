import React from 'react';
import * as AuthorAPI from './AuthorAPI';
import Cookies from 'universal-cookie';
import  { Redirect, Switch } from 'react-router-dom'

class AddAuthor extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {name: '', surname: '', birthday:'', error:'', cookie:new Cookies("user"), navigate:false, redirect:'/'};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount()
    {
        console.log(this.state.cookie.get('token'));
    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    //Can be done with one handleChange and name tags 
    //this.setState({{event.target.name}: event.target.value});
    handleChangeName(event) {
        this.setState({  name : event.target.value});
    }

    handleChangeSurname(event) {
        this.setState({  surname : event.target.value});
    }

    handleChangeBirthday(event) {
        this.setState({  birthday : event.target.value});
    }

    handleBack()
    {
        this.setState({ navigate:true, redirect:"/adminprofile"});
    }
    
    handleAdd(event) {

        if (this.isBlank(this.state.name))
        {
            this.setState({error: "name cannot be empty!"});
        }
        else if (this.isBlank(this.state.surname))
        {
            this.setState({error: "surname cannot be empty!"});
        }
        else if (this.isBlank(this.state.birthday))
        {
            this.setState({error: "birthday cannot be empty!"});
        }
        else{
            this.setState({error: "", name:"", surname:"", birthday:""});

            AuthorAPI.addAuthor(this.state.name, this.state.surname, this.state.birthday, this.state.cookie.get("token")).then((author)=>
                {
                    if (!author || author.hasOwnProperty('error'))
                    {
                        this.setState({error:"Error ".concat(author)});
                    }
                    else
                    {
                        console.log(author);
                    }
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
                    Surname:<br/>
                    <input type="text" value={this.state.surname} onChange={this.handleChangeSurname}/>
                    <br/>   
                    Birthday YYYY-MM-DD:<br/>
                    <input type="text" value={this.state.birthday} onChange={this.handleChangeBirthday}/>
                    <br/><br/>
                    <button onClick={this.handleAdd}>Add Author</button>
                    <br/><br/>
                    <button onClick={this.handleBack}>Back</button>
                    <p>{this.state.error}</p>
                </form> ;
        else
            return <Switch><Redirect to={this.state.redirect} /></Switch>;
    }

}

export default AddAuthor;
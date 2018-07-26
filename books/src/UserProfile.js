import React from 'react';
import Cookies from 'universal-cookie';
import  { Redirect } from 'react-router-dom'
import ShowBooks from './ShowBooks';
import * as BooksAPI from './BooksAPI';
import * as UsersAPI from './UsersAPI';


const pStyle =  {
    "marginTop": "10px",
    "marginBottom": "10px",
    "marginRight": "10px",
    "marginLeft": "10px"
};

const bStyle = {
    "marginLeft": "50px"
};

class UserProfile extends React.Component{


    constructor(props)
    {
        super(props);
        this.state = {cookie:new Cookies("user"), redirect:"/", navigate:false, readBooks:[], wishBooks:[]};
        this.logout = this.logout.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount()
    {
        BooksAPI.getRead(this.state.cookie.get("token")).then((books) => {
               
            console.log(books);

            if (!books || books.hasOwnProperty('error'))
            {
                console.log("Read Books Error!");
            }
            else
            {
                this.setState({readBooks:books});
            }
            
        });

        BooksAPI.getWish(this.state.cookie.get("token")).then((books) => {
               
            console.log(books);

            if (!books || books.hasOwnProperty('error'))
            {
                console.log("Read Books Error!");
            }
            else
            {
                this.setState({wishBooks:books});
            }
            
        });

    }

    search()
    {
        this.setState({navigate:true, redirect:"/search"});
    }

    logout()
    {
        UsersAPI.logout(this.state.cookie.get("token")).then((user) => {

            console.log(user);

            if (!user || user.hasOwnProperty('error'))
            {
                console.log("Read Books Error!");
            }
            else
            {
            }

        })
        this.state.cookie.remove("token");
        this.state.cookie.remove("username");
        this.state.cookie.remove("isAdmin");
        this.setState({navigate:true, redirect:"/"});

    }

    render()
    {
        if(!this.state.navigate)
            return  <div>
                <p style={pStyle}>Username : {this.state.cookie.get('username')}
                <button style={bStyle} onClick={this.search}>Search Page</button>
                <button style={bStyle} onClick={this.logout}>Logout</button>
                </p>
                    <ShowBooks title="Started reading" books={this.state.readBooks}/>
                    <ShowBooks title="Wish reading" books={this.state.wishBooks}/>
                </div>;
        else    
            return <Redirect to={this.state.redirect} />;    
    }

}

export default UserProfile;
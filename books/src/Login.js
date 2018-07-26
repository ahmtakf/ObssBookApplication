import React from 'react';
import * as UsersAPI from './UsersAPI';
import Cookies from 'universal-cookie';
import  { Redirect, Switch } from 'react-router-dom'

const formStyle = {
    width:"40%",
    float: 'left',
    marginLeft: '10px',
    marginTop: '10px'
};

class Login extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {username: '', password: '', error:'', cookie:new Cookies("user"), success:false,
            redirect:'',
            signUsername:'',
            signPassword:'',
            signRepassword:'',
            signIsAdmin:'',
            signError:''};
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRepassword = this.changeRepassword.bind(this);
        this.changeIsAdmin = this.changeIsAdmin.bind(this);


    }

    componentDidMount()
    {
        console.log(this.state.cookie.get('token'));
    }

    changeUsername(event)
    {
        this.setState({signUsername: event.target.value});
        if (this.isBlank(event.target.value))
        {
            this.setState({signError: "Username cannot be empty!"});
        }
        else{
            this.setState({signError: ""});
        }
    }

    changePassword(event)
    {
        this.setState({signPassword: event.target.value});
        if (this.isBlank(event.target.value))
        {
            this.setState({signError: "Password cannot be empty!"});
        }
        else{
            this.setState({signError: ""});
        }
    }

    changeRepassword(event)
    {
        this.setState({signRepassword: event.target.value});
        if (this.isBlank(event.target.value))
        {
            this.setState({signError: "Repassword cannot be empty!"});
        }
        else if (event.target.value !== this.state.signPassword)
        {
            this.setState({signError: "Repassword is not same with password!"});
        }
        else{
            this.setState({signError: ""});
        }
    }

    changeIsAdmin(event)
    {
        this.setState({signIsAdmin:event.target.checked});
    }

    handleSignUp(event){
        if (!(this.state.signPassword === this.state.signRepassword))
        {
            this.setState({signError: "Enter re-password correct!"});
        }
        else if (this.isBlank(this.state.signUsername))
        {
            this.setState({signError: "Username cannot be empty!"});
        }
        else if (this.isBlank(this.state.signPassword))
        {
            this.setState({signError: "Password cannot be empty!"});
        }
        else{
            
            UsersAPI.signup(this.state.signUsername, this.state.signPassword, this.state.signIsAdmin).then((user) => {
               
                console.log(user);

                if (!user || user.hasOwnProperty('error'))
                {
                    this.setState({signError:"Error ".concat(user), success:false});
                }
                else
                {
                    var newCookie = this.state.cookie;
                    newCookie.set('token', user.token, { path: '/' });
                    newCookie.set('username', user.username, { path: '/' });
                    newCookie.set('isAdmin', user.isAdmin, { path: '/' });
                    this.setState({error:'', cookie:newCookie, success:true});
                    if (user.isAdmin)
                        this.setState({redirect:'/adminprofile'});
                    else
                        this.setState({redirect:'/userprofile'});
                }
                
            });

        }
        event.preventDefault();
    
    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    //Can be done with one handleChange and name tags 
    //this.setState({{event.target.name}: event.target.value});
    handleChangeUsername(event) {
        this.setState({username: event.target.value});
        if (this.isBlank(event.target.value))
        {
            this.setState({error: "Username cannot be empty!"});
        }
        else{
            this.setState({error: ""});
        }
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
        if (this.isBlank(event.target.value))
        {
            this.setState({error: "Password cannot be empty!"});
        }
        else{
            this.setState({error: ""});
        }
    }
    
    handleLogin(event) {
        if (this.isBlank(this.state.username))
        {
            this.setState({error: "Username cannot be empty!"});
        }
        else if (this.isBlank(this.state.password))
        {
            this.setState({error: "Password cannot be empty!"});
        }
        else{

            UsersAPI.login(this.state.username, this.state.password).then((user) => {
               
                console.log(user);

                if (!user || user.hasOwnProperty('error'))
                {
                    this.setState({error:"Error ".concat(user), success:false});
                }
                else
                {
                    var newCookie = this.state.cookie;
                    newCookie.set('token', user.token, { path: '/' });
                    newCookie.set('username', user.username, { path: '/' });
                    newCookie.set('isAdmin', user.isAdmin, { path: '/' });
                    this.setState({error:'', cookie:newCookie, success:true});
                    if (user.isAdmin)
                        this.setState({redirect:'/adminprofile'});
                    else
                        this.setState({redirect:'/userprofile'});
                }
                
            });
            
        }
        event.preventDefault();
    }

    render()
    {
        if (!this.state.success)
            return <div>
            
                <form style={formStyle}>
                    Login<br/><br/>
                    Username:<br/>
                    <input type="text" value={this.state.username} onChange={this.handleChangeUsername}/>
                    <br/>
                    Password:<br/>
                    <input type="text" value={this.state.password} onChange={this.handleChangePassword}/>
                    <br/><br/>
                    <button onClick={this.handleLogin}>Login</button>
                    <p>{this.state.error}</p>
                </form>
                <form style={formStyle}>
                    SignUp<br/><br/>
                    Username:<br/>
                    <input type="text" value={this.state.signUsername} onChange={this.changeUsername}/>
                    <br/>
                    Password:<br/>
                    <input type="text" value={this.state.signPassword} onChange={this.changePassword}/>
                    <br/>
                    Repassword:<br/>
                    <input type="text" value={this.state.signRepassword} onChange={this.changeRepassword}/>
                    <br/>
                    IsAdmin:
                    <input type="checkbox" checked={this.state.signIsAdmin} onChange={this.changeIsAdmin}/>
                    <br/><br/>
                    <button onClick={this.handleSignUp}>Sign Up</button>
                    <p>{this.state.signError}</p>
                </form>                 
                </div>;
        else
            return <Switch><Redirect to={this.state.redirect} /></Switch>;
    }

}

export default Login;
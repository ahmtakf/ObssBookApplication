import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import UserProfile from './UserProfile';
import SearchBooks from './SearchBooks';
import AdminProfile from './AdminProfile';
import AddAuthor from './AddAuthor';
import AddBook from './AddBook';


class AppRouter extends React.Component{
    render(){
 return <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/adminprofile" component={AdminProfile} />
        <Route path="/addauthor" component={AddAuthor} />
        <Route path="/addbook" component={AddBook} />
        <Route path="/search" component={SearchBooks} />
      </Switch>

  </BrowserRouter>;
}
}

export default AppRouter;
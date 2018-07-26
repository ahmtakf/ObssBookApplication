import React from 'react';

class Book extends React.Component{

    render()
    {
        return  <td style={this.props.style}>
                <div><span>Name: {this.props.name}</span><br/>
                <span>Page size: {this.props.pageSize}</span><br/>
                <span>Author: {this.props.author.name}  {this.props.author.surname}</span><br/>
                <span>Published on {this.props.publishDate}</span><br/></div></td>
       ;
    }

}

export default Book;
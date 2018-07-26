import React from 'react';
import Book from './Book';

const pStyle =  {
    "border":"5px solid red",
    "marginTop": "10px",
    "marginBottom": "10px",
    "marginRight": "10px",
    "marginLeft": "10px"
};

const bookStyle = {
    border:"5px solid red",
    float: 'left',
    width: '20%',
    height: '200px',
    padding: '10px'
};

const tableStyle = {
    width : "100%"
}

class ShowBooks extends React.Component{

    render()
    {
            return  <table style={tableStyle}>
                        <tbody>
                            <tr><th><p style={pStyle}>{this.props.title}</p></th></tr>
                            <tr>
                        {this.props.books.map((book, i) =>{
                            return <Book style={bookStyle} key={i} name={book.name} publishDate={book.publishDate} pageSize={book.pageSize} author={book.author}/>
                        })}
                        </tr>
                        </tbody>
                    </table>; 
    }

}

export default ShowBooks;
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import "./Catalogue.css"


function Catalogue() {

    const [catalogue, setCatalogue] = useState(["Loading..."]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        axios.get("https://salty-caverns-05675.herokuapp.com/books/getBooks").then((response) => {         

            setCatalogue(response.data);
            console.log(response.data);
        });
    }, []);


    // Search method based on tutorial https://www.youtube.com/watch?v=mZvKPtH9Fzo

    return (
        <div className="catalogue">
            
            <input type="text" placeholder="Enter title, author, ISBN or category" 
            style = {{maxWidth:"40%", marginLeft:"30%", textAlign:"center"}} onChange={e=> {setQuery(e.target.value.toLowerCase())}}/>

            <div className="booksDisplay" style={{display:"flex", flexDirection:"row"}}>    
                <div style = {{display:"flex", flexDirection:"row"}}>
                    
                    {catalogue.filter((bookArr) => {
                        if(query.length > 0 && 
                            (bookArr.title.toLowerCase().includes(query) 
                            || bookArr.isbn.toLowerCase().includes(query)
                            || bookArr.author.toLowerCase().includes(query)
                            || bookArr.category.toLowerCase().includes(query))) {
                            return bookArr;
                        } else if(query.length === 0) {
                            return bookArr;
                        }
                        return null;
                    }).map((book, i) =>{
                        return <div className = "book" key = {book.id} onClick={e=> {setSelected(book)}}>{book.title} </div>
                    })}

                </div>
                <div className="bookDetails" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {selected.length === 0?
                    <div>Click on a book to view details</div>
                    :
                    <div>
                        <div>Title: {selected.title}</div>
                        <div>Author: {selected.author}</div>
                        <div>Publisher: {selected.publisher}</div>
                        <div>ISBN: {selected.isbn}</div>
                        <div>Year: {selected.year}</div>
                        <div>Category: {selected.category}</div>
                    </div>
                    }
                    
                </div>
            </div>

        </div>
    )
    
}
export default Catalogue;
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import "./Catalogue.css"


function Catalogue() {

    const [catalogue, setCatalogue] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get("https://salty-caverns-05675.herokuapp.com/books/getBooks").then((response) => {         

            setCatalogue(response.data);
            console.log(response.data);
        });
    }, []);


    // Search method based on tutorial https://www.youtube.com/watch?v=mZvKPtH9Fzo

    return (
        <div className="catalogue">
            <input type="text" placeholder="Enter title, author or ISBN" 
            style = {{maxWidth:"40%"}} onChange={e=> {setQuery(e.target.value.toLowerCase())}}/>
            
            <div style = {{display:"flex", flexDirection:"row"}}>
                
                {catalogue.filter((bookArr) => {
                    if(query.length > 0 && 
                        (bookArr.title.toLowerCase().includes(query) 
                        || bookArr.isbn.toLowerCase().includes(query)
                        || bookArr.author.toLowerCase().includes(query))) {
                        return bookArr;
                    } else if(query.length == 0) {
                        return bookArr;
                    }
                }).map((book, i) =>{
                    return <div className = "book" key = {book.id}>{book.title}</div>
                })}

            </div>

        </div>
    )
    /*{catalogue.filter((val) => {
                if(query.length > 0 && val.toLowerCase().includes(query)) {
                    return val;
                } else if(query.length == 0) {
                    return val;
                }
            }).map((book) => (
                <div className = "book" key={book}>
                    {book}
                </div>
            ))}*/
}
export default Catalogue;
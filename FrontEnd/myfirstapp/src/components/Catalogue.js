import React, { useEffect, useState} from 'react'
import axios from 'axios';
import Book from './Book'
import "./Catalogue.css"


export const Catalogue = props => {

    const [catalogue, setCatalogue] = useState(["Loading..."]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState([]);
    const [viewing, setViewing] = useState(false);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        axios.get("https://sept-login-service.herokuapp.com/api/users/getSellers").then((response) => {         

            setSellers(response.data);
            console.log(response.data);
        });

        axios.get("https://salty-caverns-05675.herokuapp.com/books/getBooks").then((response) => {         

            setCatalogue(response.data);
            console.log(response.data);
            response.data.forEach((book) => {
                if(book.id == props.match.params.book) {
                    bookClicked(book)
                }
            }) 
        });

        
        
        

    }, [props.match.params.book]);

    function bookClicked(book) {
        setSelected(book);
        setViewing(true);
    }

    function getSeller(seller) {
        var name = "";
        console.log(seller)
        for(var i = 0; i < sellers.length; i++) {
            if(sellers[i].id == seller) {
                name = sellers[i].fullName;
            }
        }
        
        return name;
    }
    // Search method based on tutorial https://www.youtube.com/watch?v=mZvKPtH9Fzo

    return (
        <div className="catalogue" style={{maxWidth:"100%", justifyContent:"center"}}>
            
            <input type="text" placeholder="Enter title, author, ISBN or category" 
            style = {{maxWidth:"100%", textAlign:"center"}} onChange={e=> {setQuery(e.target.value.toLowerCase())}}/>
            {viewing?
                
                <div style={{paddingLeft:"5%"}}>

                    <div div type="button" 
                        onClick={e => {setViewing(false)}} 
                        className="btn btn-info btn-block mt-4">
                        Back to Catalogue
                    </div>

                    <Book book = {selected}></Book>

                </div>
            :
                <div className="booksDisplay" style={{display:"grid", gridTemplateColumns: "repeat(4, 25% [col-start])"}}>    
                    
                        
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
                        return  <div style={{display:"flex", flexDirection:"row", justifyContent:"left", alignItems:"center"}}>
                                    <div className = "book" key = {book.id} onClick={e=> {bookClicked(book)}}>
                                    
                                        {book.title} 
                                        
                                    
                                    </div>
                                    {book.shop != null || book.user != null?
                                        <div style={{fontSize:"14pt"}}>
                                            <p style={{textTransform:"capitalize"}}>Condition: {book.condition}</p> 
                                            <p>Sold By: {getSeller(book.shop)}{getSeller(book.user)}</p>
                                            <p>Price: ${book.price}</p> 
                                            <p>Qty: {book.qty}</p>
                                            
                                        </div>
                                    :
                                    <div style={{fontSize:"14pt"}}>
                                        <p>Not for sale</p>
                                        
                                    </div>
                                    }
                                </div>
                    })}

                    
                </div>
            }

        </div>
    )
    
}
export default Catalogue;
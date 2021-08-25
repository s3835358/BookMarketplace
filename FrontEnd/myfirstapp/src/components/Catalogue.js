import React, { useEffect, useState} from 'react'
import axios from 'axios';
import "./Catalogue.css"


function Catalogue() {

    const [catalogue, setCatalogue] = useState([]);

    useEffect(() => {
        axios.get("https://salty-caverns-05675.herokuapp.com/books/getTitles").then((response) => {         

            setCatalogue(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div className="catalogue">
            {catalogue.map((book) => (
                <div className = "book" key={book}>
                    {book}
                </div>
            ))}
        </div>
    )
    
}
export default Catalogue;
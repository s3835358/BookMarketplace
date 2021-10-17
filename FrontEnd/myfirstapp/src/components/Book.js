import React, { useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import PopupContent from "./Layout/PopupContent";
import PayPal from './PayPal'
import 'reactjs-popup/dist/index.css';

export const Book = props => {

    const [selected, setSelected] = useState([]);
    const [cost, setCost] = useState(1);

    useEffect(() => {
        setSelected(props.book)
        getPrice()
    }, [props.book, selected]);

    function isSuccess(result) {
        console.log("ds")
        console.log(result)
    }

    function getPrice() {
        if(selected.price != null) {

            if(parseInt(selected.price) >= 1) {
                setCost(parseInt(selected.price))
            }

        }
    }   

    return (
        <div>  
            <div style={{paddingTop:"3%", paddingLeft:"45%", justifyContent:"center"}}>
                <Popup modal trigger={<div className="btn btn-info btn-block mt-4" type ="button">Share</div>} 
                position="right center">
                    {close => <PopupContent close={close} />}
                    <div>Share URL: "{window.location.href.replace(':book',props.book.id)}"</div>
                </Popup>
            </div>

            <div style={{paddingLeft:"25%", justifyContent:"center"}}>
                <div>Title: {selected.title}</div>
                <div>Author: {selected.author}</div>
                <div>Publisher: {selected.publisher}</div>
                <div>ISBN: {selected.isbn}</div>
                <div>Year: {selected.year}</div>
                <div>Category: {selected.category}</div>
            </div>

            <div style={{paddingTop:"3%", paddingLeft:"25%", justifyContent:"center"}}>
                <PayPal
                    total={cost}
                    //history={history}
                    isSuccess={isSuccess}>
                </PayPal>
            </div>
        </div>
    )
    
}
export default Book;
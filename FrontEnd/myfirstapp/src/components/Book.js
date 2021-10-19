import React, { useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import PopupContent from "./Layout/PopupContent";
import PayPal from './PayPal';
import axios from 'axios';
import store from "../store";
import 'reactjs-popup/dist/index.css';

export const Book = props => {

    const [selected, setSelected] = useState([]);
    const [cost, setCost] = useState(1);
    

    useEffect(() => {
        setSelected(props.book)
        getPrice()
    }, [props.book, selected]);

    function isSuccess(result) {
        console.log(result)

        if(result.paid == true && result.cancelled == false) {
            var seller = selected.shop

            if(selected.shop == null) {
                seller = selected.user
            }
            var req = {
                "seller_id": seller,
                "buyer_id": store.getState().security.user.id,
                // Change if able to purchase multiple
                "qty": 1,
                "price": selected.price,
                "book_id": selected.id,
                "book_title": selected.title
            }

            axios.post(`https://sept-orders.herokuapp.com/orders/addOrder`,req).then(res => {
                console.log(res)            
            }).catch(err =>{
                alert("Incorrect values");
            })

            var req2 = {
                "id": selected.id,
                "title": selected.title,
                "author": selected.author,
                "publisher": selected.publisher,
                "isbn": selected.isbn,
                "year": String(selected.year),
                "category": selected.category,
                "condition": selected.condition,
                "qty": selected.qty,
                "price":selected.price,
                "shop": selected.shop,
                "user": selected.user,
            }

            console.log(req2)
            // Recudes book quantity by one when sold
            axios.post(`https://salty-caverns-05675.herokuapp.com/books/bookSold`,req2).then(res => {
                console.log(res)            
            }).catch(err =>{
                alert("Incorrect values");
            })

            alert("Payment succeeded")
        } else {
            alert("Payment failed")
        }
        
    }

    // PayPal can't take 0 as cost, so if our book doesn't have a valid 
    // cost we set to $1 for the sake of testing
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
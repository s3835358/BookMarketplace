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
    const [reviews, setReviews] = useState([]); 
    const [bookReview, setBookReview] = useState(""); 
    const [file, setFile] = useState("");

    useEffect(() => {
        setSelected(props.book)
        getPrice()
        axios.post(`https://salty-caverns-05675.herokuapp.com/books/getReviews`,props.book).then(res => {
            
            setReviews(res.data);
            console.log(res.data);

        }).catch(err =>{
            alert("Incorrect values");
        })

    }, [props.book, selected]);

    function handleUpload(event) {
        setFile(event.target.files[0]);
      }
    function fileUpload() {
        var req = {cover: file, id: selected.id}
        console.log(req);

        axios.post(`https://salty-caverns-05675.herokuapp.com/books/uploadCover`,req).then(res => {
              console.log(res)
             
          }).catch(err =>{
              alert("Incorrect values");
          })
      };


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

    function submitReview(){
        var req = {
            "user_id": store.getState().security.user.id,
            "book_id": selected.id,
            "content": bookReview,
            "user_name": store.getState().security.user.fullName
        }
        console.log(req)
        axios.post(`https://salty-caverns-05675.herokuapp.com/books/addReview`,req).then(res => {
            console.log(res)            
        }).catch(err =>{
            alert("Incorrect values");
        })
    }

    return (
        <div style={{ width:"50%", backgroundColor:"#f8f9fa"}}>  
            
            <div style={{display:"flex", flexDirection:"row"}}>
                
                <div style={{paddingLeft:"5%",paddingRight:"5%", paddingTop:"3%", textAlign:"center"}}>
                    Add Review
                    <p/>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your review"
                        name="review"
                        value={bookReview}
                        onChange={(ev) => setBookReview(ev.target.value)}
                        />
                    </div>

                    <div type="button" onClick={submitReview} 
                    className="btn btn-info btn-block mt-4"
                    style={{backgroundColor:"black", color:"white",borderColor:"black"}}>
                    Submit Review
                    </div>

                    <div style={{justifyContent:"center"}}>
                        <p></p>
                        <div>Reviews: </div>
                        {   
                        reviews.map((review, i) =>{
                            var dash = " - "
                            var usr = "Review by user: "
                            return (
                                <div>
                                    <p/>
                                    {dash}  
                                    {review.content}
                                    
                                    <p style={{fontSize:"10pt"}}>
                                    <b>{usr}
                                    {review.user_name}
                                    </b>
                                    </p>
                                </div>
                            )
                        })
                        }
                    </div>

                </div>

                <div style={{paddingLeft:"5%", width:"50%", justifyContent:"center", backgroundColor:"#edf6f9"}}>
                    
                    <div style={{paddingLeft:"65%", justifyContent:"center"}}>
                        
                        <Popup modal trigger={<div className="btn btn-info btn-block mt-1" 
                        style={{backgroundColor:"black", color:"white",borderColor:"black"}}
                        type ="button">Share</div>} 
                        position="right center">
                            {close => <PopupContent close={close} />}
                            <div>Share URL: "{window.location.href.replace(':book',props.book.id)}"</div>
                        </Popup>

                    </div>

                    <p/>
                    <div>Title: {selected.title}</div>
                    <div>Author: {selected.author}</div>
                    <div>Publisher: {selected.publisher}</div>
                    <div>ISBN: {selected.isbn}</div>
                    <div>Year: {selected.year}</div>
                    <div>Category: {selected.category}</div>
                    
                    <div style={{paddingTop:"3%", paddingLeft:"5%", justifyContent:"center"}}>
                        <p/>
                        <PayPal
                            total={cost}
                            //history={history}
                            isSuccess={isSuccess}>
                        </PayPal>
                        <p> </p>
                        <input type="file" onChange={handleUpload} />
                        <p>Filename: {file.name}</p>
                        <p>File type: {file.type}</p>
                        <p>File size: {file.size} bytes</p>

                    <div type="submit" onClick={fileUpload} className="btn btn-info btn-block mt-4" 
                    style={{backgroundColor:"black", borderColor:"black",color:"white"}}>
                      Submit
                     </div> 
                    </div>
                    <p/>
                </div>
                

            </div>
            
            
            
        </div>
    )
    
}
export default Book;
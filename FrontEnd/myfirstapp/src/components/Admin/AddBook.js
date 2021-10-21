import React, {useState, useEffect, Component} from "react";
import axios, { post } from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';


export const AddBook = props => {

    const [state,setState] = useState({
        title:"",
        author:"",
        publisher:"",
        isbn:"",
        year:"",
        category:"",
        condition:"",
        qty:"",
        price:""
    });

    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [phrase, setPhrase] = useState("Sell");

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
          if(store.getState().security.user.userType.match("admin")){
            setPhrase("Add");
          }
      }

    }, [user]);


// TEST
class upload extends Component {
onChange(e)
{
let files=e.target.files;

let reader= new FileReader();
reader.readAsDataURL(files[0]);

reader.onload=(e)=>{
  const url="https://salty-caverns-05675.herokuapp.com/books/addBook"
  const formData={file:e.target.result}
  return post(url,formData)
  .then(response=>console.warn("result", response))
}


}

}
// TEST

    function handleSubmit() {

        // Checks password and confirm password fields match
        var shopId = "";
        var userId = "";
        if(store.getState().security.user.userType.match("shop")) {
          shopId = String(localStorage.id);
        } else if (store.getState().security.user.userType.match("user")) {
          userId = String(localStorage.id);
        }

        var req = {
          "title": state.title,
          "author": state.author,
          "publisher": state.publisher,
          "isbn": state.isbn,
          "year": String(state.year),
          "category": state.category,
          "condition": state.condition,
          "qty": state.qty,
          "price":state.price,
          "shop": shopId,
          "user": userId,
        }
        console.log(req);
        // Post request to register account
        axios.post(`https://salty-caverns-05675.herokuapp.com/books/addBook`,req).then(res => {
            console.log(res)
            if(res.status === 200) {
              alert(res.data.title + " has been added..");
            } else {
              alert(state.title + " was not added..");
            }

        }).catch(err =>{
            alert("Incorrect values");
        })

    };

    // Radio button based on positronx.io/react-radio-button-tutorial-with-example/

    return (
        <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          {
            logged && 'userType' in store.getState().security.user?

              <div className ="addBook" style ={{width:"30%"}}>
                  <h1>{phrase} Book</h1>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Book Title"
                      name="bookTitle"
                      value={state.title}
                      onChange={(ev) => setState({...state, title: ev.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Author"
                      name="author"
                      value={state.author}
                      onChange={(ev) => setState({...state, author: ev.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Publisher"
                      name="publisher"
                      value={state.publisher}
                      onChange={(ev) => setState({...state, publisher: ev.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="ISBN"
                      name="isbn"
                      value={state.isbn}
                      onChange={(ev) => setState({...state, isbn: ev.target.value})}
                    />
                  </div>

                  <div className="form-group">
                      <input
                          className="form-control form-control-lg"
                          value={state.year}
                          onChange={(ev) => setState({...state, year: ev.target.value})}
                          placeholder="1990"
                          type="number"
                          min="0000"
                          max="2025"
                          name="year"
                          id="year"
                      />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Category"
                      name="category"
                      value={state.category}
                      onChange={(ev) => setState({...state, category: ev.target.value})}
                    />
                  </div>






                  <div>
                    <h6>Upload File</h6>
                    <input type="file" name="file" onChange={(e)=>this.onChange(e)} />
                    </div>








                  {store.getState().security.user.userType.match("admin")
                  || store.getState().security.user.userType.match("publish")?
                    <div/>
                  :
                    <div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Qty"
                          name="qty"
                          value={state.qty}
                          onChange={(ev) => setState({...state, qty: ev.target.value})}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Price"
                          name="price"
                          value={state.price}
                          onChange={(ev) => setState({...state, price: ev.target.value})}
                        />
                      </div>

                      <div className="form-control form-control-lg">Condition:
                        {store.getState().security.user.userType.match("shop")?
                          <div style ={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>

                            <div>
                              <label>
                                <input
                                  type="radio"
                                  value="new"
                                  checked={state.condition === "new"}
                                  onChange= {(e) => {setState({...state, condition: e.target.value});}}
                                />
                                New
                              </label>
                            </div>

                            <div>
                              <label>
                                <input
                                  type="radio"
                                  value="used"
                                  checked={state.condition === "used"}
                                  onChange= {(e) => {setState({...state, condition: e.target.value});}}
                                />
                                Used
                              </label>
                            </div>

                          </div>
                        :
                          <div>Used</div>
                        }
                      </div>

                    </div>
                  }

                  <div type="button" onClick={handleSubmit} className="btn btn-info btn-block mt-4">{phrase} Book</div>
              </div>

            :
            <div/>
          }
        </div>
    );

}
export default AddBook;

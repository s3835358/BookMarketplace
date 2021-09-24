import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';


export const AddBook = props => {
    
    const [state,setState] = useState({
        title:"",
        author:"",
        publisher:"",
        isbn:"",
        year:"",
        category:""
    });

    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    
    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }
      
    }, [user]);

    function handleSubmit() {

        // Checks password and confirm password fields match
        
        var req = {
            "title": state.title,
            "author": state.author,
            "publisher": state.publisher,
            "isbn": state.isbn,
            "year": String(state.year),
            "category": state.category
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

    

    return (
        <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>          
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?
                
                <div className ="addBook" style ={{width:"30%"}}>
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

                    <div type="button" onClick={handleSubmit} className="btn btn-info btn-block mt-4">Add Book</div>
                </div>
              :
                <div/>
            :
            <div/>
          }   
        </div>
    );
  
}
export default AddBook;
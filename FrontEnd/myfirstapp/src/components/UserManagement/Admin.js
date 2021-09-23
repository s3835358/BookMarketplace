import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import Select from 'react-select';
import {useUserContext} from '../UserManagement/UserContext';
import { customStyles } from "../Layout/selectStyle";


export const Admin = props => {
    
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
    const [bookOpts, setBookOpts] = useState([]);
    const [bookSelected, setBookSelected] = useState({
        id:"",
        title:"",
        author:"",
        publisher:"",
        isbn:"",
        year:"",
        category:""  
    });


    function fillDropDown(res, type){
        var len = res.length;
        var arr = [];
        for(var i = 0; i < len;i++){
            var name = "";
            var val = "";
            if(type.match('books')){
              name = res[i].title;
              val = res[i].id;
              arr.push({
                value : val, 
                label: name, 
                author: res[i].author,
                publisher: res[i].publisher,
                isbn: res[i].isbn,
                year: res[i].year,
                category: res[i].category
              });
            } 
            
        };
        if(type.match('books')){
            setBookOpts(arr);
        }
        
    }

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }
      axios.get(`https://salty-caverns-05675.herokuapp.com/books/getBooks`).then(res => {
        
        fillDropDown(res.data, 'books');
      }).catch(err =>{
          alert("Incorrect values");
      })
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

    function editSubmit() {

      // Checks password and confirm password fields match
      
      var req = {
          "id": bookSelected.id,
          "title": bookSelected.title,
          "author": bookSelected.author,
          "publisher": bookSelected.publisher,
          "isbn": bookSelected.isbn,
          "year": String(bookSelected.year),
          "category": bookSelected.category
      }
      console.log(req);
      // Post request to register account
      axios.post(`https://salty-caverns-05675.herokuapp.com/books/editBook`,req).then(res => {
          console.log(res.data)
          if(res.status === 200) {
            alert(res.data.title + " has been edited..");
          } else {
            alert(state.title + " was not edited..");
          }
          
      }).catch(err =>{
          alert("Incorrect values");
      })
      
  };

    return (
        <div>
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?

              <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
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
                  <p/>
                  <div>Check catalogue to see if book has been added.</div>
                  <p/>
                  <div style={{width:"30%"}}>
                    <Select 
                      styles={customStyles}
                      placeholder="Select Book to edit"
                      options={bookOpts}
                      onChange={opt => setBookSelected({...bookSelected, 
                        id: opt.value,
                        title: opt.label,
                        author: opt.author,
                        publisher: opt.publisher,
                        isbn: opt.isbn,
                        year: opt.year,
                        category: opt.category
                      })}
                    />
                  </div>
                  <p/>
                  <div className ="editBook" style ={{width:"30%"}}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Book Title"
                          name="bookTitle"
                          value={bookSelected.title}
                          onChange={(ev) => setBookSelected({...bookSelected, title: ev.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Author"
                          name="author"
                          value={bookSelected.author}
                          onChange={(ev) => setBookSelected({...bookSelected, author: ev.target.value})}
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Publisher"
                          name="publisher"
                          value={bookSelected.publisher}
                          onChange={(ev) => setBookSelected({...bookSelected, publisher: ev.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="ISBN"
                          name="isbn"
                          value={bookSelected.isbn}
                          onChange={(ev) => setBookSelected({...bookSelected, isbn: ev.target.value})}
                        />
                      </div>

                      <div className="form-group">
                          <input
                              className="form-control form-control-lg"
                              value={bookSelected.year}
                              onChange={(ev) => setBookSelected({...bookSelected, year: ev.target.value})}
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
                          value={bookSelected.category}
                          onChange={(ev) => setBookSelected({...bookSelected, category: ev.target.value})}
                        />
                      </div>

                      <div type="button" onClick={editSubmit} className="btn btn-info btn-block mt-4">Submit edits to Book</div>
                  </div>
              </div>
              :
              <div></div>
            :
            
            <div></div>
          
          }
        </div>
    );
  
}
export default Admin;
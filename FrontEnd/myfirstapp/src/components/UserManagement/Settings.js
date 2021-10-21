import React, { useState } from "react";
import axios from "axios";
import store from "../../store";
import classnames from "classnames";


export const Settings = props => {

    const [shopReq, setShopReq] = useState(false);
    const [abn, setAbn] = useState("");
    const [busName, setBusName] = useState("");

    function requestShop() {
        
        var req = {
            "token": localStorage.jwtToken,
            "abn": abn,
            "busName": busName
        }

        axios.post(`https://sept-login-service.herokuapp.com/api/users/requestShop`,req).then(res => {
            alert("Request Sent");
            setShopReq(false);
        }).catch(err =>{
            // Tell user what went wrong with submission
            alert(err);
        })
    }

    return (
        <div className="col-md-8 m-auto" style={{display:"flex", flexDirection:"column", width:"30%"}}>
            
            {'userType' in store.getState().security.user?
                store.getState().security.user.userType.match("user")?
                        <div className="btn btn-info btn-block mt-4" onClick={e=> 
                            {shopReq? setShopReq(false) : setShopReq(true)}}
                            type ="button">Request to be Shop Owner
                        </div>
                    :
                        <div/>
            :
                <div/>
            }

            {shopReq?
                    <div>
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="ABN"
                            name="abn"
                            value={abn}
                            onChange={e => setAbn(e.target.value)}
                        />
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="busName"
                            name="busName"
                            value={busName}
                            onChange={e => setBusName(e.target.value)}
                        />
                        <div className="btn btn-info btn-block mt-4" onClick={requestShop}                            
                            type ="button">Request to be Shop Owner
                        </div>
                    </div>
                :
                    <div>

                    </div>
            }

                <div className = "forgot-password">
                    <h3> Forgot Password? </h3>
                    <a className="forgot-password" href="/ForgotPassword">
                                            Reset Password Here
                                        </a>

                </div> 

              


</div>

    );
  
}
export default Settings;
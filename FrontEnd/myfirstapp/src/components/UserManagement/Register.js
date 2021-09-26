import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Form, FloatingLabel} from "react-bootstrap";
import store from "../../store";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      userType: "",
      phone: "",
      address: "",
      abn: "",
      pending: "",
      busName: "",
      errors: {},
      edit: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    var type = this.state.userType;

    if('userType' in store.getState().security.user) {
      if(store.getState().security.user.userType.match("admin")) {
        type = "admin";
      }
    }

    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userType: type,
      phone: this.state.phone,
      address: this.state.address,
      abn: this.state.abn,
      pending: this.state.pending,
      busName: this.state.busName
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if(this.props.toEdit != null) {
      this.setState({
        username: this.props.toEdit.username,
        fullName: this.props.toEdit.fullName,
        password: "",
        confirmPassword: "",
        userType: this.props.toEdit.userType,
        phone: this.props.toEdit.phone,
        address: this.props.toEdit.address,
        abn: this.props.toEdit.abn,
        pending: this.props.toEdit.pending,
        busName: this.props.toEdit.busName,
        errors: {},
        edit: true
      });

    } 
  }

  render() {
     

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              
              {
                    'userType' in store.getState().security.user?

                      store.getState().security.user.userType.match("admin") && this.state.edit?
                
                          <div>
                            <h1 className="display-4 text-center">Edit User</h1>
                            <p className="lead text-center">Adjust the details</p>
                          </div>
                        
                        :

                        <div>
                          <h1 className="display-4 text-center">Add Admin User</h1>
                          <p className="lead text-center">Create the Account</p>
                        </div>

                      
                    :                     
                      <div>
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                      </div>
              }
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email Address (Username)"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  {
                    'userType' in store.getState().security.user && !this.state.edit?

                      store.getState().security.user.userType.match("admin")?

                        <div/>
                      :
                        <div/>
                    :
                      <FloatingLabel label="User Type">
                        <Form.Select 
                          size="lg"
                          style={{height:"10%"}}
                          name="userType"
                          value={this.state.userType}
                          onChange={this.onChange}>
                          <option hidden></option>
                          <option value="customer">Customer</option>
                          <option value="shopOwner">Shop Owner</option>
                          <option value="publisher">Publisher</option>
                        </Form.Select>
                      </FloatingLabel>
                    
                  }
                </div>
                {this.state.userType.match("shopOwner") || this.state.userType.match("publisher")?
                  <div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Abn"
                        name="abn"
                        value={this.state.abn}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Business Name"
                        name="busName"
                        value={this.state.busName}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  
                :
                  <div></div>
                }
                
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);
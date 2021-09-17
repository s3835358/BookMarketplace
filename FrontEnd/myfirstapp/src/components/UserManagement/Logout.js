import {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Logout extends Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        
        return null;
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logout }
)(Logout);
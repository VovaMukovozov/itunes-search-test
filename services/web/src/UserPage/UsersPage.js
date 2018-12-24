import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userActions } from '../_actions';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(userActions.delete(this.delete));
    }

    render() {
        const { users, user } = this.props;
        const id = user._id;
        if(Object.keys(users).length === 0){
            return  <Redirect to='/' />
        }
        return (
            <div>
                <div className="col-md-6 col-md-offset-3">
                    <Link to='/'>Home page  </Link>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.items && users.items.map((user, index) =>
                        <tr key={user._id}>
                            <th scope="row">{index+1}</th>
                            <td>{user.username}</td>
                            <td>{user.createdAt}</td>
                            <td>
                                <button type="button" className={user._id === id ? 'btn btn-link disabled' : 'btn btn-link'} onClick={this.handleClick} ref={this.delete = user._id}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.authentication;
    const { users } = state;
    return {
        user,
        users
    };
};

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
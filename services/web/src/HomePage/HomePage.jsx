import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, searchActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickTop10 = this.handleClickTop10.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { search } = this.state;
        if (search) {
            this.props.dispatch(searchActions.search(search));
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleClickTop10() {
        this.props.dispatch(userActions.favourites());
    }
    handleClick() {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { search } = this.state;
        const { user, loggedIn, tracks,  searched, favourites} = this.props;
        if(!loggedIn) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Link to='/users'>All registered users</Link>
                <button type="button" className="btn btn-link" onClick={this.handleClickTop10}>Get top 10</button>
                {favourites.searched ?
                    <div>
                        <h1>Top 10</h1>
                        <p>
                            {favourites.items.map((item, index) =>
                                <span key={index} className="badge badge-secondary">{item.name}</span>
                            )}
                        </p>
                    </div>
                    : null
                }

                <h1>Hi {user.username}, please search the music</h1>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="search">Search</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="search" value={search} onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary ">Search Music</button>
                            </div>
                        </div>
                    </div>
                </form>
                <ul>
                    {searched && tracks.map((track, index) =>
                        <li key={index}>
                            <Link  to={`/track/${index}`}>
                            {track.trackName || track.collectionName}
                            </Link>
                        </li>

                    )}
                </ul>
                <button type="button" className="btn btn-link" onClick={this.handleClick}>Logout</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { favourites } = state;
    const { user, loggedIn } = state.authentication;
    const { tracks, searched } = state.search;
    return {
        favourites,
        tracks,
        searched,
        user,
        loggedIn
    };
};

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
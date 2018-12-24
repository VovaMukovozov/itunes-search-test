import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player'

class TrackPage extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { id } = this.props.match.params;
        const tracks = this.props.tracks;
        if(!tracks || !tracks[id]) {
            return  <Redirect to='/' />
        }
        const track = tracks[id];
        console.log(tracks[id]);
        return (
            <div className="row">
                <div className="col-sm">
                    <p>{track.artistName} - {track.trackName || track.collectionName}</p>
                    <img className="img-fluid" src={track.artworkUrl100} />
                </div>
                <div className="col-sm">
                    <ReactPlayer url={track.previewUrl} playing controls />
                </div>
                <Link to='/'>Home page  </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { tracks, searched } = state.search;
    return {
        tracks,
        searched
    };
};

const connectedTrackPage = connect(mapStateToProps)(TrackPage);
export { connectedTrackPage as TrackPage };
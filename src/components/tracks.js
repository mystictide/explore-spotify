import React, { Fragment } from 'react'
import spotifyHelpers from '../spotifyHelpers';

export default class tracks extends React.Component {
    state = {
        loading: true,
    }

    async componentDidMount() {
        this.state.loading = false;
    }

    render() {
        if (this.props.data) {
            return (
                <div className="results">
                    <div className='funcs'>
                        <button onClick={e => tracks.clearData()}>Go back</button>
                        <button onClick={e => spotifyHelpers.createPlaylist()}>Create a Playlist</button>
                        {/* <span>listing {this.props.data.tracks.length} recommended tracks</span> */}
                    </div>
                    <div className='tracks'>
                        <ul>
                            {
                                this.props.data.tracks
                                    .map(track =>
                                        <Fragment key={track.id}>
                                            <div className='track-info'>
                                                {track.album.images[0] ? <li className='art'><img alt="album art" src={track.album.images[2].url}></img></li> : ""}
                                                <li className='name'>{track.name}
                                                    <span>{track.artists.map((item, index) => ((index ? ', ' : '') + item.name))}</span>
                                                </li>
                                                <li className='preview'>
                                                    {track.preview_url ? <button onClick={e => tracks.managePreview(e.target)}>Play Preview</button> : ""}
                                                    {track.preview_url ? <audio loop>
                                                        <source src={track.preview_url} type="audio/mp3"></source>
                                                    </audio> : ""}
                                                </li>
                                                <li className='duration'><span>{tracks.formatDuration(track.duration_ms)}</span></li>
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </ul>
                    </div>
                    <div className='funcs'>
                        {/* <span>listing {this.props.data.tracks.length} recommended tracks</span> */}
                        <button onClick={e => tracks.clearData()}>Go back</button>
                        <button onClick={e => spotifyHelpers.createPlaylist()}>Create a Playlist</button>
                    </div>
                </div>
            )
        }
        else if (this.state.loading) {
            return <div className='results'><div className='state'>loading..</div></div>
        }
        else {
            return ("")
        }


    }
}

tracks.clearData = () => {
    localStorage.removeItem("spotiData");
    window.location.reload();
}

tracks.formatDuration = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

tracks.managePreview = async (event) => {
    let el = event.nextElementSibling;
    if (el.duration > 0 && !el.paused) {
        event.innerHTML = "Play Preview";
        el.volume = 0.2
        el.pause();
    } else {
        el.volume = 0.2
        el.play();
        event.innerHTML = "Pause";
    }
}
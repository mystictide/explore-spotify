import React, { Fragment } from 'react'
import AudioPlayer from 'react-audio-player';

export default class tracks extends React.Component {
    render() {
        return (
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
                                            {track.preview_url ? <button onClick={e => tracks.playPreview(e.target)}>Play Preview</button> : ""}
                                            {track.preview_url ? <audio loop>
                                                <source src={track.preview_url} type="audio/mp3"></source>
                                            </audio> : ""}
                                        </li>
                                        <li className='duration'>{tracks.formatDuration(track.duration_ms)}</li>
                                    </div>
                                </Fragment>
                            )
                    }
                </ul>
            </div>
        )
    }
}

tracks.generateID = (id) => {
    let rnd = Math.random().toString(36).substring(2, 9);
    return rnd + id;
}

tracks.formatDuration = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

tracks.playPreview = async (event) => {
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
import React from "react";
import spotifyHelpers from "../spotifyHelpers";

export default class functions extends React.Component {
    render() {
        return (
            <div className='results'>
                <div className='funcs'>
                    <input placeholder="pick at most 5 artists.."></input>
                    <span className="selected">and/or</span>
                    <input placeholder="pick at most 5 tracks.."></input>
                </div>
                {/* <div className='display'>
                    <span className="selected">selected</span>
                    <span className="items">muse, testing, beardfish, king crimson, habibi, muse, testing, beardfish, king crimson, habibi</span>
                </div> */}
                <div className='funcs'>
                    <button onClick={e => functions.getbyArtists("medium_term")}>Explore by Recent Top Artists</button>
                    <button onClick={e => functions.getbyTracks("medium_term")}>Explore by Recent Top Tracks</button>
                </div>
                <div className='funcs'>
                    <button onClick={e => functions.getbyArtists("long_term")}>Explore by All-Time Top Artists</button>
                    <button onClick={e => functions.getbyTracks("long_term")}>Explore by All-Time Top Tracks</button>
                </div>
            </div>
        )
    }
}

functions.getbyArtists = (range) => {
    spotifyHelpers.databyAllTimeTopArtists(range);
}

functions.getbyTracks = (range) => {
    spotifyHelpers.databyAllTimeTopTracks(range);
}
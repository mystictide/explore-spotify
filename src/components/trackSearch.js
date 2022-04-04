import React, { Component, Fragment } from 'react'
import spotifyHelpers from '../spotifyHelpers';

export default class trackSearch extends Component {

    constructor() {
        super();
        this.state = {
            suggUpdated: false,
        };
        this.selection = [];
        this.searchResultlist = React.createRef();
    }

    scrollToElement = () => this.searchResultlist.current.scrollIntoView(true, {behavior: "smooth", block: "end", inline: "nearest"});

    handletrackSelection = async (e) => {
        let val = e.getAttribute('value');
        let index = this.selection.indexOf(val)
        if (index < 0 && this.selection.length < 5) {
            this.selection.push(val);
            document.cookie = "selection=" + this.selection + ";max-age=3600;samesite=lax;Secure";
            this.toggleSelected(e);
            this.setState({ suggUpdated: true });
        }
        else if (index >= 0 && this.selection.length <= 5) {
            this.selection.splice(index, 1)
            document.cookie = "selection=" + this.selection + ";max-age=3600;samesite=lax;Secure";
            this.toggleSelected(e);
            this.setState({ suggUpdated: true });
        }
        if (this.selection.length <= 0) {
            this.clearCookie();
        }
    }

    toggleSelected = async (e) => {
        e.closest(".item").classList.toggle("selected");
    }

    clearCookie = async () => {
        document.cookie = "selection=;max-age=0;samesite=lax;Secure";
    }

    getRecommendations = async () => {
        spotifyHelpers.databySelectedTracks(this.selection);
    }

    render() {
        return (
            <Fragment key="trackSearch">
                {this.selection.length > 0 ? <div className='funcs'>
                    <button onClick={e => this.getRecommendations()}>Recommend Tracks</button>
                </div> : ""}
                <ul ref={this.searchResultlist} className={this.props.tracks.length === 1 ? "single" : ""}>
                    {this.props.tracks.map(track =>
                        <Fragment key={track.id}>
                             <li>
                            <div className='track-results'>
                                <div className='item' onClick={e => this.handletrackSelection(e.target)}>
                                    {track.album.images[0] ? <div className='art'><img alt="album art" src={track.album.images[2].url}></img></div> : ""}
                                    <p className='name' value={track.id}>{track.name}<span value={track.id}>{track.artists.map((item, index) => ((index ? ', ' : '') + item.name))}</span></p>
                                </div>
                            </div>
                            </li>
                        </Fragment>
                    )
                    }
                </ul>
                {/* {this.suggestions ? <div className='display'>
                    <span className="selected">selected</span>
                    <span className="items">{this.suggestions}</span>
                </div> : ""} */}
            </Fragment>
        )
    }
}
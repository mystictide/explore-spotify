import React, { Component, Fragment } from 'react'

export default class trackSearch extends Component {

    constructor() {
        super();
        this.state = {
            suggUpdated: false,
        };
        this.selection = [];
    }

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
    }

    toggleSelected = async (e) => {
        e.closest(".item").classList.toggle("selected");
    }

    render() {
        return (
            <Fragment key="trackSearch">
                <ul>
                    {this.props.tracks.map(track =>
                        <Fragment key={track.id}>
                            <div className='track-results'>
                                <div className='item' onClick={e => this.handletrackSelection(e.target)}>
                                    {track.album.images[0] ? <li className='art'><img alt="album art" src={track.album.images[2].url}></img></li> : ""}
                                    <li className='name' value={track.id}>{track.name}<span value={track.id}>{track.artists.map((item, index) => ((index ? ', ' : '') + item.name))}</span></li>
                                </div>
                            </div>
                        </Fragment>
                    )
                    }
                </ul>
                {this.suggestions ? <div className='display'>
                    <span className="selected">selected</span>
                    <span className="items">{this.suggestions}</span>
                </div> : ""}
            </Fragment>
        )
    }
}
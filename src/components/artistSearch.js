import React, { Component, Fragment } from 'react'

export default class artistSearch extends Component {

    constructor() {
        super();
        this.state = {
            suggUpdated: false,
        };
        this.selection = [];
    }

    handleArtistSelection = async (e) => {
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
        e.parentElement.classList.toggle("selected");
    }

    render() {
        return (
            <Fragment key="artistSearch">
                <ul>
                    {this.props.artists.map(artist =>
                        <Fragment key={artist.id}>
                            <div className='artist-results'>
                                <div className='item' onClick={e => this.handleArtistSelection(e.target)}>
                                    {artist.images[0] ? <li className='art'><img alt="artist art" src={artist.images[2].url}></img></li> : ""}
                                    <li className='name' value={artist.id}>{artist.name}</li>
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
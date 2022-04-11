import React, { Component, Fragment } from "react";
import spotifyHelpers from "../spotifyHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class artistSearch extends Component {
  constructor() {
    super();
    this.state = {
      suggUpdated: false,
    };
    this.selection = [];
    this.searchResultlist = React.createRef();
  }

  scrollToElement = () =>
    this.searchResultlist.current.scrollIntoView(true, {
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

  handleArtistSelection = async (e, val) => {
    let index = this.selection.indexOf(val);
    if (index < 0 && this.selection.length < 5) {
      this.selection.push(val);
      document.cookie =
        "selection=" + this.selection + ";max-age=3600;samesite=lax;Secure";
      this.toggleSelected(e);
      this.setState({ suggUpdated: true });
    } else if (index >= 0 && this.selection.length <= 5) {
      this.selection.splice(index, 1);
      document.cookie =
        "selection=" + this.selection + ";max-age=3600;samesite=lax;Secure";
      this.toggleSelected(e);
      this.setState({ suggUpdated: true });
    }
    if (this.selection.length <= 0) {
      this.clearCookie();
    }
    if (this.selection.length === 5) {
        console.log(e)
      toast.error("reached maximum selection capacity!");
    }
  };

  toggleSelected = async (e) => {
    e.classList.toggle("selected");
  };

  clearCookie = async () => {
    document.cookie = "selection=;max-age=0;samesite=lax;Secure";
  };

  getRecommendations = async () => {
    spotifyHelpers.databySelectedArtists(this.selection);
    this.scrollToElement();
  };

  render() {
    return (
      <Fragment key="artistSearch">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          icon={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          theme="dark"
        />
        {this.selection.length > 0 ? (
          <div className="funcs">
            <button onClick={(e) => this.getRecommendations()}>
              Recommend Tracks
            </button>
          </div>
        ) : (
          ""
        )}
        <ul
          ref={this.searchResultlist}
          className={this.props.artists.length === 1 ? "single" : ""}
        >
          {this.props.artists.map((artist) => (
            <Fragment key={artist.id}>
              <li>
                <div className="artist-results">
                  <div
                    className={
                      this.props.artists.length === 1 ? "single-item" : "item"
                    }
                    onClick={(e) =>
                      this.handleArtistSelection(e.target, artist.id)
                    }
                  >
                    {artist.images[0] ? (
                      <div className="art">
                        <img alt="artist art" src={artist.images[2].url}></img>
                      </div>
                    ) : (
                      ""
                    )}
                    <p className="name">{artist.name}</p>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
        {/* {this.suggestions ? <div className='display'>
                    <span className="selected">selected</span>
                    <span className="items">{this.suggestions}</span>
                </div> : ""} */}
      </Fragment>
    );
  }
}

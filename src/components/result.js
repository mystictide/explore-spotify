import React from 'react'
import spotifyHelpers from '../spotifyHelpers';
import Tracks from './tracks';

export default class result extends React.Component {
  state = {
    loading: true,
    tracks: null,
  }

  async componentDidMount() {
    this.tracks = null;
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div className='results'><div className='state'>loading..</div></div>
    }
    if (this.props.data) {
      return (
        <Tracks data={this.props.data} ></Tracks>
      )
    }
    else if (this.props.token && this.props.token !== "access_denied") {
      return (
        <div className='results'>
          <div className='funcs'>
            <button onClick={result.getbyArtists}>Explore by Top Artists</button>
            <button onClick={result.getbyTracks}>Explore by Top Tracks</button>
          </div>
        </div>
      )
    }
    else if (this.props.token && this.props.token === "error") {
      return (
        <div className='results'><div className='error'><h5>houston, we have a problem</h5><h5>..let's try again</h5></div></div>)
    }
    else {
      return ("")
    }
  }
}

result.getbyArtists = () => {
  spotifyHelpers.databyTopArtists();
}

result.getbyTracks = () => {
  spotifyHelpers.databyTopTracks();
}
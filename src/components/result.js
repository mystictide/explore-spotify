import React from 'react'
import PropTypes from 'prop-types'
import SpotifyGenres from './spotifyGenres'

export default class result extends React.Component {
  state = {
    loading: true,
    genres: null,
  }
  
  async componentDidMount() {
    this.genres = null;
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div className='state'>loading..</div>
    }
    return (
      <div>
        {/* <div><SpotifyGenres /></div> */}
      </div>
    )
  }
}

result.propTypes = {
  title: PropTypes.string,
}

result.getUsers = (username) => {
  alert(username);
}

result.getRandomUsers = () => {
  alert("test");
}
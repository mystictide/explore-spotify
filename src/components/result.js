import React from 'react'
import Tracks from './tracks';
import Functions from './functions';

export default class result extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    this.state.loading = false;
  }

  render() {
    if (this.props.data) {
      return (
        <Tracks data={this.props.data}></Tracks>
      )
    }
    else if (this.props.token && this.props.token !== "access_denied") {
      return (
        <Functions></Functions>
      )
    }
    else if (this.props.token && this.props.token === "error") {
      return (
        <div className='results'><div className='error'><h5>houston, we have a problem</h5><h5>..let's try again</h5></div></div>)
    }
    else if (this.state.loading) {
      return <div className='results'><div className='state'>loading..</div></div>
    }
    else {
      return ("")
    }
  }
}
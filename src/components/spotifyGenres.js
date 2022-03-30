import React from 'react'
import axios from "axios";
import { authCreds } from '../authCreds';

export default class SpotifyGenres extends React.Component {

    state = {
        tokenResponse: null,
        genres: []
    }
    async componentDidMount() {

    }

    render() {
        return (
            <ul>
                {
                    this.state.genres
                        .map(genre =>
                            <li key={genre.id}>{genre.name}</li>
                        )
                }
            </ul>)
    }
}
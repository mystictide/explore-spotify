import React from 'react'
import axios from "axios";
import { authCreds } from '../authCreds';

export default class SpotifyGenres extends React.Component {

    state = {
        tokenResponse: null,
        genres: []
    }
    async componentDidMount() {

        await axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + btoa(authCreds.client_id + ':' + authCreds.client_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            },
            json: true
        }).then(res => {
            const tokenResponse = res;
            console.log(res);
            this.setState({ tokenResponse });

            axios.get('https://api.spotify.com/v1/browse/categories?locale?sv_US', {
                headers: { 'Authorization': 'Bearer ' + this.state.tokenResponse.data.access_token },
                data: 'grant_type=client_credentials',
                method: 'GET'
            }).then(genreResponse => {
                console.log(genreResponse.data.categories.items);
                const genres = genreResponse.data.categories.items;
                this.setState({ genres, loading: false });
            });
        });
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
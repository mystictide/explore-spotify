> This is my first React app, and a product of a whole lot of trial and error.

```diff
- (Work in Progress)
```

### Explore Spotify, by your Top Artists & Tracks, create playlists by the recommendations

## Before you build

For authorization helpers to work, create a ```.js``` file named ```authCreds``` under ```src``` folder with:

```
const charset = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = () => {
    let text = "";
    for (var i = 0; i <= 16; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

export const authCreds =
{
    client_id: 'your_client_id',
    client_secret: 'your_client_secret', //not needed at current version
    redirect_uri: 'http://localhost:3000',
    auth_endpoint: 'https://accounts.spotify.com/authorize',
    response_type: 'token',
    state: generateRandomString(),
    scope: 'user-read-private user-top-read playlist-modify-private',
};
```

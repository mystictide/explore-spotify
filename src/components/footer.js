import authHelpers from "../authHelpers";

const footer = (props) => {
  const { logged } = props;
  return (
    <footer>
      {logged ? <div className="logout"><button onClick={e => authHelpers.logout()}>&gt; log out</button></div> : <div className="logout"></div>}
      <div className="github"><button onClick={footer.goToRepo}></button></div>
      <div className="info">
        <div className="spoti">Spotify API is a shy one, so bear with me.</div>
        <div className="react">made with <h3 onClick={footer.goToReact}>React</h3>.. and some <h2>☕</h2></div>
      </div>

    </footer>
  )
}

footer.goToReact = () => {
  let url = 'https://reactjs.org'
  window.open(url, '_blank');
}

footer.goToRepo = () => {
  let url = 'https://github.com/mystictide/explore-spotify'
  window.open(url, '_blank');
}

export default footer
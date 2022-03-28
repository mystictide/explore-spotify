const footer = () => {
  return (
    <footer>
      <div className="github"><button onClick={footer.goToRepo}></button></div>
      <div className="info">
        <div className="spoti">Spotify API is a shy one, so bear with me.</div>
        <div className="react">made with <h3>React</h3>.. and some coffee.</div>
      </div>

    </footer>
  )
}

footer.goToRepo = () => {
  let url = 'https://github.com/mystictide'
  window.open(url, '_blank');
}

export default footer
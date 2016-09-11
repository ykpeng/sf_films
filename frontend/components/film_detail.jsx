const React = require('react');

const FilmDetail = React.createClass({
  render(){
    let film = this.props.film;
    return(
      <div className="film-detail">
        <h3>{film.title} ({film.release_year})</h3>

        <h4>Production company</h4>
        <p>{film.production_company}</p>

        <h4>Distributor</h4>
        <p>{film.distributor}</p>

        <h4>Director</h4>
        <p>{film.director}</p>

        <h4>Writer</h4>
        <p>{film.writer}</p>

        <h4>Actor(s)</h4>
        <ul>
          <li>{film.actor_1}</li>
          <li>{film.actor_2}</li>
          <li>{film.actor_3}</li>
        </ul>
      </div>
    )
  }
})

module.exports = FilmDetail;

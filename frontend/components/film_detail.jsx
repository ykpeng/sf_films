const React = require('react');

const FilmDetail = React.createClass({
  render(){
    let film = this.props.film;
    return(
      <div className="film-detail">
        <p>Title: {film.title}</p>
        <p>Release year: {film.release_year}</p>
        <p>Production company: {film.production_company}</p>
        <p>Distributor: {film.distributor}</p>
        <p>Director: {film.director}</p>
        <p>Writer: {film.writer}</p>

        <p>Actors:</p>
        <p>{film.actor_1}</p>
        <p>{film.actor_2}</p>
        <p>{film.actor_3}</p>
      </div>
    )
  }
})

module.exports = FilmDetail;

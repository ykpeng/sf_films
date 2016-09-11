const React = require('react');
const ReactDOM = require('react-dom');
// const SearchActions = require('../actions/search_actions');
const hashHistory = require('react-router').hashHistory;

const _getCoordsObj = function(latLng) {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng()
  });
}

const mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

const FilmMap = React.createClass({
  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.markers = [];
    this.registerListeners();
    this._onChange();
  },

  markersToRemove(){
    return this.markers.filter( marker => {
      return !this.props.films.hasOwnProperty(marker.filmId);
    });
  },

  filmsToAdd(){
    const currentFilmIds = this.markers.map( marker => marker.filmId );
    const newFilms = this.props.films;
    const newFilmIds = Object.keys(newFilms);

    return newFilmIds.reduce( (collection, filmId) => {
      if (!currentFilmIds.includes(filmId)) {
        return ( collection.concat( [newFilmes[filmId]] ));
      }
    }, [] );
  },

  componentDidUpdate() {
    this._onChange();
  },

  _onChange() {
    this.filmsToAdd().forEach(this.createMarkerFromFilm);
    this.markersToRemove().forEach(this.removeMarker);
  },

  // _handleClick(coords) {
  //   hashHistory.push({
  //     pathname: "films/new",
  //     query: coords
  //   });
  // },

  registerListeners() {
    const that = this;
    google.maps.event.addListener(this.map, 'idle', () => {
      const mapBounds = that.map.getBounds();
      const northEast = _getCoordsObj(mapBounds.getNorthEast());
      const southWest = _getCoordsObj(mapBounds.getSouthWest());
      const bounds = { northEast, southWest };
      // SearchActions.updateBounds(bounds);
    });
    google.maps.event.addListener(this.map, 'click', event => {
      const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      that._handleClick(coords);
    });
  },

  // createMarkerFromFilm(film) {
  //   const pos = new google.maps.LatLng(film.lat, film.lng);
  //   const marker = new google.maps.Marker({
  //     position: pos,
  //     map: this.map,
  //     filmId: film.id
  //   });
  //   marker.addListener('click', () => {
  //     hashHistory.push("films/" + film.id );
  //   });
  //   this.markers.push(marker);
  // },

  removeMarker(marker) {
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  },

  render() {
    return ( <div className="map" ref="map">Map</div>);
  }
});

module.exports = FilmMap;

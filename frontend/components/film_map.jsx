const React = require('react');
const ReactDOM = require('react-dom');

const mapOptions = {
  center: {lat: 37.773972, lng: -122.431297}, //San Francisco
  zoom: 13
};

const FilmMap = React.createClass({
  componentDidMount() {
    const map = ReactDOM.findDOMNode(this.refs.map);
    this.map = new google.maps.Map(map, mapOptions);
    this.geocoder = new google.maps.Geocoder();
  },

  resetMarkers(){
    this.clearMarkers();
    this.props.results.forEach(result => {
      this.searchAddress(result);
    })
  },

  clearMarkers(){
    this.markers = this.markers || [];
    this.markers.forEach(marker => {
      marker.setMap(null);
    })
    this.markers = [];
  },

  searchAddress(result){
    let self = this;
    this.geocoder.geocode({ address: result.locations, componentRestrictions: { locality: "San Francisco" } }, function(response, status){
      if (status === google.maps.GeocoderStatus.OK) {
        let pos = response[0].geometry.location;
        self.setSingleMarker(result, pos);
      } else {
        console.log("The Geocode was not successful for the following reason: " + status);
      }
    })
  },

  setSingleMarker(result, pos) {
    let self = this;
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });

    let contentString = "";

    if (result.locations) {
      contentString += `<h4>Shoot location</h4><p>${result.locations}</p>`;
    };

    if (result.fun_facts) {
      contentString += `<h4>Fun fact</h4><p>${result.fun_facts}</p>`;
    };

    marker.infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
      if (self.currMarker) {
        self.currMarker.infowindow.close();
      }
      marker.infowindow.open(this.map, marker);
      self.currMarker = marker;
    });

    this.markers.push(marker);
  },

  render() {
    this.resetMarkers();
    return (
      <div className="map" ref="map"></div>
    );
  }
});

module.exports = FilmMap;

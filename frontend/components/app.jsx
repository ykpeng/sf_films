const React = require('react');
const SearchBar = require('./search_bar');
const FilmDetail = require('./film_detail');
const FilmMap = require('./film_map');
const ResultStore = require('../stores/result_store');

const App = React.createClass({
  getInitialState(){
    return {
      results: ResultStore.all()
    };
  },

  componentDidMount(){
    this.listener = ResultStore.addListener(this.handleStoreChange);
  },

  componentWillUnmount(){
    this.listener.remove();
  },

  handleStoreChange(){
    this.setState({ results: ResultStore.all() });
  },

  filmDetail() {
    if (Object.keys(this.state.results).length > 0) {
      return (
        <FilmDetail film={this.state.results[0]}/>
      );
    }
  },

  render(){
    return(
      <div>
        <SearchBar/>
        { this.filmDetail() }
      </div>
    )
  }
});

{/*<FilmMap results = {results}/>*/}

module.exports = App;

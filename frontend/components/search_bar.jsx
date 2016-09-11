const React = require('react');
const MatchStore = require('../stores/match_store');
const MatchActions = require('../actions/match_actions');
const ResultActions = require('../actions/result_actions');

const SearchBar = React.createClass({
  getInitialState(){
    return {
      query: "",
      matches: [],
      focusedIdx: 0
    };
  },

  componentDidMount(){
    this.listener = MatchStore.addListener(this.handleStoreChange);
  },

  componentWillUnmount(){
    this.listener.remove();
  },

  handleStoreChange(){
    this.setState({ matches: MatchStore.all() });
  },

  handleInputChange(e){
    this.setState({ query: e.target.value }, this.updateMatches);
  },

  updateMatches(){
    if (this.state.query !== "") {
      MatchActions.fetchMatches((this.state.query).toLowerCase());
    } else {
      this.setState({ matches: new Set() });
    }
  },

  handleClick(match){
    ResultActions.fetchResults(match);
    this.setState({
      query: "",
      matches: new Set()
    })
  },

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleClick(this.state.matches[focusedIdx]);
    }
  },

  searchResults() {
    let matches = this.state.matches;

    if (matches.length > 0) {
      return (
        <ul className="search-results">
          { matches.map( (match, i) => {
            return (
              <li onClick={this.handleClick.bind(this, match)}
                  key={i}
                  className="search-result"
                  value={match}>
                <p>{match}</p>
              </li>
            )
          }) }
        </ul>
      )
    }
  },

  render(){
    return(
      <aside>
        <div>
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text"
                 onInput={this.handleInputChange}
                 onKeyPress={this.handleKeyPress}
                 placeholder="Search Movie Title"
                 value={this.state.query}/>
        </div>

        { this.searchResults() }

      </aside>
    );
  }
})

module.exports = SearchBar;

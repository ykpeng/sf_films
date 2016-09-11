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
    this.setState({
      query: e.target.value,
      focusedIdx: 0,
    }, this.updateMatches);
  },

  updateMatches(){
    if (this.state.query !== "") {
      MatchActions.fetchMatches((this.state.query).toLowerCase());
    } else {
      this.setState({ matches: [] });
    }
  },

  handleClick(match){
    ResultActions.fetchResults(match);
    this.setState({
      query: "",
      matches: [],
      focusedIdx: 0
    })
  },

  handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 39) {
      this.handleClick(this.state.matches[this.state.focusedIdx]);
    } else if (e.keyCode === 38) {
      if (this.state.focusedIdx > 0) {
        let focusedIdx = this.state.focusedIdx - 1;
        this.setState({ focusedIdx: focusedIdx });
      }
    } else if (e.keyCode === 40) {
      if (this.state.focusedIdx < this.state.matches.length - 1) {
        let focusedIdx = this.state.focusedIdx + 1;
        this.setState({ focusedIdx: focusedIdx })
      }
    }
  },

  searchResults() {
    let matches = this.state.matches;

    if (matches.length > 0) {
      return (
        <ul className="search-results">
          { matches.map( (match, i) => {
            let focused = "";
            if (i === this.state.focusedIdx) {
              focused += " focused"
            }
            return (
              <li onClick={this.handleClick.bind(this, match)}
                  key={i}
                  className={"search-result" + focused}
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
                 onKeyDown={this.handleKeyDown}
                 placeholder="Search Movie Title"
                 value={this.state.query}/>
        </div>

        { this.searchResults() }

      </aside>
    );
  }
})

module.exports = SearchBar;

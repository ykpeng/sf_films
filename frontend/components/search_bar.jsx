const React = require('react');
const MatchStore = require('../stores/match_store');
const MatchActions = require('../actions/match_actions');
const ResultActions = require('../actions/result_actions');

const SearchBar = React.createClass({
  getInitialState(){
    return {
      query: "",
      matches: new Set()
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
      MatchActions.fetchMatches(this.state.query);
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

  render(){
    let matches = Array.from(this.state.matches);
    return(
      <aside>
        <div>
          <input type="text"
                 onInput={this.handleInputChange}
                 placeholder="Search Movie Title"
                 value={this.state.query}/>
        </div>

        <ul>
          { matches.map( (match, i) => {
            return (
              <li onClick={this.handleClick.bind(this, match)}
                  key={i}
                  value={match}>
                {match}
              </li>
            )
          }) }
        </ul>

      </aside>
    );
  }
})

module.exports = SearchBar;

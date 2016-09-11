const MatchApiUtil = require('../util/match_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const MatchConstants = require('../constants/match_constants');

const MatchActions = {
  fetchMatches(query) {
    MatchApiUtil.fetchMatches(query, this.receiveMatches);
  },

  receiveMatches(matches) {
    Dispatcher.dispatch({
      actionType: MatchConstants.MATCHES_RECEIVED,
      matches: matches
    })
  }
}

module.exports = MatchActions;

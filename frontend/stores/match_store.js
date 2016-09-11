const Store = require('flux/utils').Store;
const MatchConstants = require('../constants/match_constants');
const Dispatcher = require('../dispatcher/dispatcher');

const MatchStore = new Store(Dispatcher);

let _matches = new Set();

MatchStore.all = function() {
  return _matches;
}

function resetMatches(matches) {
  _matches = matches;
  MatchStore.__emitChange();
}

MatchStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case MatchConstants.MATCHES_RECEIVED:
      resetMatches(payload.matches);
      break;
  }
}

module.exports = MatchStore;

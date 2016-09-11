const Store = require('flux/utils').Store;
const ResultConstants = require('../constants/result_constants');
const Dispatcher = require('../dispatcher/dispatcher');

const ResultStore = new Store(Dispatcher);

let _results = [];

ResultStore.all = function() {
  return _results;
}

function resetResults(results) {
  _results = results;
  ResultStore.__emitChange();
}

ResultStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ResultConstants.RESULTS_RECEIVED:
      resetResults(payload.results);
      break;
  }
}

module.exports = ResultStore;

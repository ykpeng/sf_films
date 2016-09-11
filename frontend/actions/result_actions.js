const ResultApiUtil = require('../util/result_api_util');
const ResultConstants = require('../constants/result_constants');
const Dispatcher = require('../dispatcher/dispatcher');

const ResultActions = {
  fetchResults(query) {
    ResultApiUtil.fetchResults(query, this.receiveResults);
  },

  receiveResults(results) {
    Dispatcher.dispatch({
      actionType: ResultConstants.RESULTS_RECEIVED,
      results: results
    })
  }
}

module.exports = ResultActions;

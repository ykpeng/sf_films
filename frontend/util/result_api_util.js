const ResultApiUtil = {
  fetchResults(query, cb){
    $.ajax({
      url: `https://data.sfgov.org/resource/wwmu-gmzc.json?title=${query}`,
      method: "GET",
      success(response){
        cb(response);
      }
    })
  }
}

module.exports = ResultApiUtil;

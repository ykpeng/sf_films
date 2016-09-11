const MatchApiUtil = {
  fetchMatches(query, cb){
    let url = `https://data.sfgov.org/resource/wwmu-gmzc.json?$where=starts_with(lower(title),%20%27${query}%27)&$limit=10`;

    $.ajax({
      url: url,
      method: "GET",
      success(response){
        let matches = new Set();
        response.forEach((match) => {
          matches.add(match.title);
        })
        cb(matches);
      }
    })
  }
}

module.exports = MatchApiUtil;

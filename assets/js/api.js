var baseApi = "http://localhost:5000/api"
var baseHeader = {
    "Content-Type": "application/json",
    "SC-API-TOKEN": "<ENTER API KEY>" 
}

function getLeaderboardData() {
    fetch(`${baseApi}/api/user/leaderboard`, {
        method: "POST",
        headers: baseHeader
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data = data["data"]
    })
}

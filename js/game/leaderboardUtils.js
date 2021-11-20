class LeaderboardUtils {
    static leaderboardKey = "gameLeaderboard"

    static writeToLeaderboard(name, score) {
        if (localStorage.getItem(LeaderboardUtils.leaderboardKey) == undefined) {
            let emptyLeaderboard = {table: []};
            localStorage.setItem(LeaderboardUtils.leaderboardKey, JSON.stringify(emptyLeaderboard));
        }
        let leaderboard = JSON.parse(localStorage.getItem(LeaderboardUtils.leaderboardKey));
        leaderboard.table.push({name: name, score: score});
        localStorage.setItem(LeaderboardUtils.leaderboardKey, JSON.stringify(leaderboard));
    }

    static getSortedLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem(LeaderboardUtils.leaderboardKey));
        let table = leaderboard.table.sort((a, b) => 
        {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }
            return 0;
        });
        return table;
    }
}
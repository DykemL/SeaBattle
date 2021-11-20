let leaderboardTable = document.getElementById('leaderboard');
let leaderboard = LeaderboardUtils.getSortedLeaderboard();
for (let record of leaderboard) {
    var rowElement = document.createElement('tr');
    rowElement.innerHTML = `<td>${record.name}</td><td>${record.score}</td>`;
    console.log(rowElement);
    leaderboardTable.appendChild(rowElement);
}
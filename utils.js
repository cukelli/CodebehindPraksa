function getRandomInt(min, max) {  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function sortAndUpdateRangeForList(teamList, start) {
    let resultList = teamList.sort((a,b)=>{       
        if (b.points == a.points){
            if (b.getBallsDifference() === a.getBallsDifference()) {
                return b.pointedBalls - a.pointedBalls;
            }
            return b.getBallsDifference() - a.getBallsDifference();
        }
        return  b.points - a.points;
    })


    resultList[0].rank = start++;
    resultList[1].rank = start++;
    resultList[2].rank = start++;
    return resultList;
}

function playMatch() {
    let firstPoints = getRandomInt(60,100);
    let secondPoints = getRandomInt(60,100);
    if (firstPoints === secondPoints) {
        secondPoints = secondPoints + 1;
    }
    let points = firstPoints > secondPoints ? [firstPoints, secondPoints] :  [secondPoints,firstPoints ];
    return points;

}

function createQuarter(groupFirst, groupSecond, championship){
    let randomChoice =  Math.floor(Math.random() *  2) + 0
    let points = playMatch(); 
    let quarter;
    let quarters = [];
    if (championship[groupFirst][randomChoice].matches.hasOwnProperty(championship[groupSecond][randomChoice].team)){
        if (randomChoice === 0){
            let team1 = championship[groupFirst][randomChoice];
            let team2 = championship[groupSecond][randomChoice+1];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
            team1 = championship[groupFirst][randomChoice+1];
            team2 = championship[groupSecond][randomChoice];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
            
        } else {
            let team1 = championship[groupFirst][randomChoice];
            let team2 = championship[groupSecond][randomChoice-1];
    
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
            team1 = championship[groupFirst][randomChoice-1];
            team2 = championship[groupSecond][randomChoice];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
    
        }
    
        }
    else {
    
        if (randomChoice === 0){
            let team1 = championship[groupFirst][randomChoice];
            let team2 = championship[groupSecond][randomChoice];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
    
            }
            quarters.push(quarter)
    
            team1 = championship[groupFirst][randomChoice+1];
            team2 = championship[groupSecond][randomChoice+1];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
        } else {
            let team1 = championship[groupFirst][randomChoice];
            let team2 = championship[groupSecond][randomChoice];
    
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
    
            team1 = championship[groupFirst][randomChoice-1];
            team2 = championship[groupSecond][randomChoice-1];
            if (team1.FIBARanking < team2.FIBARanking){
                quarter = {[team1.team] : points[0], [team2.team] : points[1]}
            } else {
                quarter = {[team2.team] : points[0], [team1.team] : points[1]}
            }
            quarters.push(quarter)
    
        }
    
    }

    return quarters;
}

function getFibaRankingFromTeam(allTeams, teamName){
    for (let team of allTeams){
        if (team.team === teamName){
            return team.FIBARanking
        }
    }
    return 0;
}
export { getRandomInt as getRandomInt };
export { sortAndUpdateRangeForList as sortAndUpdateRangeForList };
export { createQuarter as createQuarter };
export { getFibaRankingFromTeam as getFibaRankingFromTeam };
export { playMatch as playMatch };
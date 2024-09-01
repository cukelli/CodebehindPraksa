import Team from './model/Team.js';
import Group from './model/Group.js';
import { getRandomInt,sortAndUpdateRangeForList, createQuarter, getFibaRankingFromTeam, playMatch } from './utils.js';
import { readFileSync } from 'fs';
import { platform } from 'os';

var groups = JSON.parse(readFileSync('groups.json', 'utf8'));

var groupsFromFile = [];

for (const [group, teams] of Object.entries(groups)) {
    let newGroup = new Group(group);

    for (var team of teams) {

        let newTeam = new Team(team.Team, team.ISOCode, team.FIBARanking);
        newGroup.addTeamToList(newTeam);
    }

    groupsFromFile.push(newGroup);
}



var firstTeams = []
var secondTeams = []
var thirdTeams = []

console.log(`Grupna faza - I kolo\n`)
for (let group of groupsFromFile) {
    console.log(`\tGrupa ${group.name}`)
    for (let team of group.teamList) {
        let tmpList = group.teamList.slice();
        tmpList.splice(tmpList.indexOf(team), 1)
  
        for (let opponent of tmpList) {
            if (team.groupOpponents.indexOf(opponent.team) === -1 && opponent.groupOpponents.indexOf(team.team) === -1){
                team.addOpponents(opponent.team);
                opponent.addOpponents(team.team);
            } else {
                continue;
            }
            let flag = false;
            let firstPoints = getRandomInt(60,100);
            let secondPoints = getRandomInt(60,100);

            //predaja 

            if (firstPoints === secondPoints) {
                secondPoints = secondPoints + 1;
                flag = true;
            }
            let points = firstPoints > secondPoints ? [firstPoints, secondPoints] :  [secondPoints,firstPoints ];

            if (team.FIBARanking < opponent.FIBARanking) {
                team.points = team.points + 2;
                team.pointedBalls = team.pointedBalls + points[0];
                team.receivedBalls = team.receivedBalls + points[1];
                team.wins = team.wins + 1;

                opponent.points = flag ? opponent.points + 0 : opponent.points + 1;
                opponent.pointedBalls = opponent.pointedBalls + points[1];
                opponent.receivedBalls = opponent.receivedBalls + points[0];
                opponent.loses = opponent.loses + 1;

                let nameOponnent = opponent.team;
                let nameTeam = team.team

                team.matches[nameOponnent] = points[1]
                opponent.matches[nameTeam]= points[0]
                console.log(`\t\t ${team.team} - ${opponent.team} (${points[0]}:${points[1]})`)
            }
            else {
                opponent.points = opponent.points + 2;
                opponent.pointedBalls = opponent.pointedBalls + points[0];
                opponent.receivedBalls = opponent.receivedBalls + points[1];
                opponent.wins = opponent.wins + 1;


                let nameOponnent = team.team;
                let nameTeam = opponent.team;

                team.points = flag ? team.points + 0 : team.points + 1;
                team.pointedBalls = team.pointedBalls + points[1];
                team.receivedBalls = team.receivedBalls + points[0];
                team.loses = team.loses + 1;
            
                opponent.matches[nameOponnent] = points[1]
                team.matches[nameTeam] = points[0]
                console.log(`\t\t ${team.team} - ${opponent.team} (${points[1]}:${points[0]})`)

            }

        
        }
        

    }

    group.teamList =  group.teamList.sort((a,b)=>{       
        if (b.points == a.points){
            return a.matches[b.team] - b.matches[a.team]
        }
        return  b.points - a.points
    })

    firstTeams.push(group.teamList[0])
    secondTeams.push(group.teamList[1])
    thirdTeams.push(group.teamList[2])

}

console.log("Konacan plasman u grupama:")
for (let group of groupsFromFile) {
    console.log(`\t Grupa ${group.name} (Ime - pobede/porazi/bodovi/postignuti koševi/primljeni koševi/koš razlika):`)
    let i = 1;
    for (let team of group.teamList){
        console.log(`\t\t${i++}. ${team.team} \t ${team.wins}/${team.loses}/${team.points}/${team.pointedBalls}/${team.receivedBalls}/${team.getBallsDifference()}`)
    }
}

firstTeams = sortAndUpdateRangeForList(firstTeams,1);
secondTeams = sortAndUpdateRangeForList(secondTeams,4);

thirdTeams = sortAndUpdateRangeForList(thirdTeams,7);
thirdTeams.splice(thirdTeams.indexOf(thirdTeams[2]), 1)

var allTeams = [...firstTeams, ...secondTeams, ...thirdTeams]
var championship = {
    D: [firstTeams[0], firstTeams[1]],
    E: [firstTeams[2], secondTeams[0]],
    F: [secondTeams[1], secondTeams[2]],
    G: [thirdTeams[0], thirdTeams[1]]
}

console.log("Sesiri")
for (let attr in championship){
    console.log(`\t Sesir ${attr}`)
    for (let team of championship[attr]){
        console.log(`\t\t${team.team}`)
    }
}

var quarters = [...createQuarter("D", "E", championship),...createQuarter("F", "G", championship)]

console.log("Cetvrtfinale:")
for (let quarter of quarters){
    console.log(`\t\t`)
    for (let attr in quarter){
        console.log(`\t${attr}: ${quarter[attr]}`)
    }
    
}
let randomChoice =  Math.floor(Math.random() *  2) + 0
let match1 = playMatch();
let match2 = playMatch();
var semiFinals = []

if (randomChoice === 0) {
    let firstSemiFinal = [Object.keys(quarters[0])[0],  Object.keys(quarters[2])[0]]

    if (getFibaRankingFromTeam(allTeams, firstSemiFinal[0]) < getFibaRankingFromTeam(allTeams, firstSemiFinal[1])){
        firstSemiFinal = {[firstSemiFinal[0]]: match1[0], [firstSemiFinal[1]]: match1[1]}
    } else {
        firstSemiFinal = {[firstSemiFinal[1]]: match1[0], [firstSemiFinal[0]]: match1[1]}
    }

    let secondSemiFinal = [Object.keys(quarters[1])[0], Object.keys(quarters[3])[0]]
    if (getFibaRankingFromTeam(allTeams, secondSemiFinal[0]) < getFibaRankingFromTeam(allTeams, secondSemiFinal[1])){
        secondSemiFinal = {[secondSemiFinal[0]]: match2[0], [secondSemiFinal[1]]: match2[1]}
    } else {
        secondSemiFinal = {[secondSemiFinal[1]]: match2[0], [secondSemiFinal[0]]: match2[1]}
    }

    semiFinals.push(firstSemiFinal, secondSemiFinal);
}else {
    let firstSemiFinal = [Object.keys(quarters[1])[0],  Object.keys(quarters[2])[0]]

    if (getFibaRankingFromTeam(allTeams, firstSemiFinal[0]) < getFibaRankingFromTeam(allTeams, firstSemiFinal[1])){
        firstSemiFinal = {[firstSemiFinal[0]]: match1[0], [firstSemiFinal[1]]: match1[1]}
    } else {
        firstSemiFinal = {[firstSemiFinal[1]]: match1[0], [firstSemiFinal[0]]: match1[1]}
    }

    let secondSemiFinal = [Object.keys(quarters[0])[0], Object.keys(quarters[3])[0]]
    if (getFibaRankingFromTeam(allTeams, secondSemiFinal[0]) < getFibaRankingFromTeam(allTeams, secondSemiFinal[1])){
        secondSemiFinal = {[secondSemiFinal[0]]: match2[0], [secondSemiFinal[1]]: match2[1]}
    } else {
        secondSemiFinal = {[secondSemiFinal[1]]: match2[0], [secondSemiFinal[0]]: match2[1]}
    }

    semiFinals.push(firstSemiFinal, secondSemiFinal);
}


console.log("Polufinale:")
for (let semi of semiFinals){
    console.log(`\t\t`)
    for (let attr in semi){
        console.log(`\t${attr}: ${semi[attr]}`)
    }
    
}

match1 = playMatch();
match2 = playMatch();

var final = {}
var bronze = {}

if (getFibaRankingFromTeam(allTeams, Object.keys(semiFinals[0])[0]) < getFibaRankingFromTeam(allTeams, Object.keys(semiFinals[1])[0])){
    final = {[Object.keys(semiFinals[0])[0]]: match1[0], [Object.keys(semiFinals[1])[0]]: match1[1]}
} else {
    final = {[Object.keys(semiFinals[1])[0]]: match1[0], [Object.keys(semiFinals[0])[0]]: match1[1]}
}

console.log("Finale:")

for (let attr in final){
    console.log(`\t${attr}: ${final[attr]}`)
}
    


if (getFibaRankingFromTeam(allTeams, Object.keys(semiFinals[0])[1]) < getFibaRankingFromTeam(allTeams, Object.keys(semiFinals[1])[1])){
    bronze = {[Object.keys(semiFinals[0])[1]]: match1[0], [Object.keys(semiFinals[1])[1]]: match1[1]}
} else {
    bronze = {[Object.keys(semiFinals[1])[1]]: match1[0], [Object.keys(semiFinals[0])[1]]: match1[1]}
}


console.log("Takmicenje za trece mesto:")

for (let attr in bronze){
    console.log(`\t${attr}: ${bronze[attr]}`)
}

console.log("Prva tri mesta:")
console.log(`1.${Object.keys(final)[0]} \n2.${Object.keys(final)[1]} \n3.${Object.keys(bronze)[0]}`)
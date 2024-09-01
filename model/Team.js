export default class Team {

    constructor(team, ISOCode, FIBARanking) {
        this.wins = 0;
        this.rank = 0;
        this.matches = {}
        this.groupOpponents = [];
        this.loses = 0;
        this.points = 0;
        this.pointedBalls = 0;
        this.receivedBalls = 0;
        this.team = team;
        this.ISOCode = ISOCode;
        this.FIBARanking = FIBARanking;
    }

    addOpponents(opponent){
        this.groupOpponents.push(opponent);
    }

    
    get getMatches(){
        return this.matches;
    }

    get getRank() {
        return this.rank;
    }

    set setRank(rank) {
        this.rank = rank;
        
    }

    set setMatches(matches){
        return this.matches = matches;
    }

    get getTeam() {
        return this.team;
    }

    get getGroupOpponents(){
        return this.groupOpponents;
    }

    set setGroupOpponents(teamsPlayed){
        return this.groupOpponents = teamsPlayed;
    }
    get getWins() {
        return this.wins;
    }

    get getLoses() {
        return this.loses;
    }

    get getPoints() {
        return this.points;
    }

    get getPointedBalls() {
        return this.pointedBalls;
    }

    get getReceivedBalls() {
        return this.receivedBalls;
    }

     getBallsDifference() {
        return this.pointedBalls - this.receivedBalls;
    }

    set setWins(wins) {
        this.wins = wins;
    }

    set setLoses(loses) {
        this.loses = loses;
    }

    set setPoints(points) {
        this.points = points;
    }

    set setPointedBalls(pointedBalls) {
        this.pointedBalls = pointedBalls;
    }

    set setReceivedBalls(receivedBalls) {
        this.receivedBalls = receivedBalls;
    }

    get getISOCode() {
        return this.ISOCode;
    }

    get getFIBARanking() {
        return this.FIBARanking;
    }

    set setTeam(team) {
     this.team = team;
    }

    set setISOCode(ISOCode) {
         this.ISOCode = ISOCode;
    }

    set setFIBARanking(FIBARanking) {
         this.FIBARanking = FIBARanking;
    }
}


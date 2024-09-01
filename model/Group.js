
export default class Group {

   constructor(name) {
    this.teamList = [];
     this.name = name;
   }

  get getTeamList() {
    return this.teamList;
  }


  addTeamToList(team) 
  {
    this.teamList.push(team);
  }

  set setTeamList(teamList) {
    this.teamList = teamList;
  }

  get getName() {
    return this.name;
  }
  set setName(name) {
    this.name = name;
  }


}
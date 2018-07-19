
//assign Roles Functions
function assignRoles(roles){
  const spyNum = howManySpies(roles.length)  
  for (let i = 0; i < spyNum; i++){
    assignRandomSpy(roles)
  }
  roles.forEach(role => {
  if (!role.role) role.role = 'good'  
  })  
}

function howManySpies(num){  
  switch(num){
    case 5:
    case 6:
      return 2
    case 7:
    case 8:
    case 9:
      return 3    
    case 10:
      return 4
    default:
      return 2
  }
}

function assignRandomSpy(roles){
  let idx = Math.floor(Math.random()*roles.length)  
  if (roles[idx].role == 'spy') assignRandomSpy(roles)
  else roles[idx].role = 'spy'
}

//new Round functions
function initRound(game_id){
  // db.getMissions(game_id).then(missions => {
  //   db.getRounds(mission_id)
  // })
  

}

module.exports = {
  assignRoles,
  initRound
}
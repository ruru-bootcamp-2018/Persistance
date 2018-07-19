

function assignRoles(roles){
  const spyNum = howManySpies(roles.length)
  for (let i = 0; i < spyNum; i++){
    assignRandomSpy(roles)
  }
  roles.forEach(role => {
  if (role.role != 'spy') role.role = 'good'
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
  if (roles[idx] == 'spy') assignRandomSpy(roles)
  else roles[idx].role = 'spy'
}

module.exports = {
  assignRoles
}
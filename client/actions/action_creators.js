export function setState(state) {
  return {
    type: 'SET_STATE',
    state: state
  }
}

export function goal(team) {
  return {
    type    : 'GOAL',
    team    : team,
    isRemote: true
  }
}

export function next() {
  return {
    type: 'NEXT',
    isRemote: true
  }
}
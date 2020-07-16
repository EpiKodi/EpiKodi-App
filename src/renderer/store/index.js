export const state = () => ({
  username: [],
  token: [], // access = state.token[0].text
  friendlist: []
})

export const mutations = {
  addtoken (state, text) {
    state.token.splice(state.token)
    state.token.push({
      text,
    })
  },
  removetoken (state) {
    state.token.splice(state.token)
  },
  addusername(state, text) {
    state.username.splice(state.username)
    state.username.push({
      text,
    })
  },
  removeusername(state) {
    state.username.splice(state.username)
  },
  addFriendlist (state, text) {
    state.friendlist.push({
      text
    })
  }
}
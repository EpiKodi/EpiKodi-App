export const state = () => ({
  username: "",
  token: "", // access = state.token[0].text
  friendlist: [],
})

export const getters = {
  usernameFriendlist: state => {
    return state.friendlist.filter(name => name.username)
  }
}
export const mutations = {
  addtoken (state, text) {
    state.token = text
  },
  removetoken (state) {
    state.token = ""
  },
  addusername(state, text) {
  state.username = text
  },
  removeusername(state) {
    state.username = ""
  },
  addFriendlist (state, text) {
      state.friendlist.push({
        text
      })
  },
  delFriendlist(state) {
    state.friendlist = []
  },
}
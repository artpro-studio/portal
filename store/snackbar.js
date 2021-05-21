export const state = () => ({
  content: '',
  color: ''
})

export const mutations = {
  showMessage (state, payload) {
    console.log(payload)
    state.content = payload.message
    state.color = payload.color
  }
}

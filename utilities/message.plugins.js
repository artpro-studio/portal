export default{
    install(Vue, options){
        Vue.prototype.$messagesSuccess = function(message){
          let color = 'green'
          this.$store.commit('snackbar/showMessage', { message, color })
        }

        Vue.prototype.$messagesError = function(message){
          let color = 'red'
          this.$store.commit('snackbar/showMessage', { message, color })
        }
        Vue.prototype.$messagesInfo = function(message){
          let color = 'orange'
          this.$store.commit('snackbar/showMessage', { message, color })
        }
    }
}

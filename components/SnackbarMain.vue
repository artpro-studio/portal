<template>
  <v-snackbar v-model="show" :color="color" :top="true" timeout="3000" class="flex">
    <div class="snackbar__info">
      {{ message }}
      <v-btn small text @click="show = false"><v-icon>
        mdi-close
      </v-icon></v-btn>
    </div>
  </v-snackbar>
</template>

<script>
    export default {
       data(){
         return{
           show: false,
           message: '',
           color: ''
         }
       },
      created () {
        this.$store.subscribe((mutation, state) => {
          if (mutation.type === 'snackbar/showMessage') {
            this.message = state.snackbar.content
            this.color = state.snackbar.color
            this.show = true
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
  .snackbar__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

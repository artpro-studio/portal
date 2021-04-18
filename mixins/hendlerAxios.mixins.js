export default {

  methods:{

    handlerMessage(data){
      //В случае ошибки
      console.log(data);
      if(data.status != true){
        if(data.message){
          console.log(data.message)
          return false;
        }
        console.log('Произошла ошибка')
        return false;
      }
      //В случае успешного
      if(data.message){
        console.log(data.message)
        return true;
      }
      console.log('Прошло успешно')
      return true
    },
    async handlerAxios(type, route, data){
      //Обработчик запроса на сервер
      let request = [];
      switch (type) {
        case 'get':
          request = await this.$axios.$get(`${process.env.baseUrl}/${route}`, data)
          if(request.status != true){
            this.handlerMessage(request);
            return false
          }

          this.handlerMessage(request);
          return request
          break;
        case 'post':
          try {
            request = await this.$axios.$post(`${process.env.baseUrl}/${route}`, data)
            if(request.status != true){
              this.handlerMessage(request);
              return false
            }

            this.handlerMessage(request);
            return request
          }catch (e) {
            console.log(e)
            throw e
          }
          break;
        case 'put':
          try {
            request = await this.$axios.$put(`${process.env.baseUrl}/${route}`, data)
            if(request.status != true){
              this.handlerMessage(request);
              return false
            }

            this.handlerMessage(request);
            return request
          } catch (e) {
            console.log(e)
            throw e
          }
          break;
        case 'delete':
          try {
            request = await this.$axios.$delete(`${process.env.baseUrl}/${route}`)
            if(request.status != true){
              this.handlerMessage(request);
              return false
            }

            this.handlerMessage(request);
            return request
          } catch (e) {
            console.log(e)
            throw e
          }
          break;
      }
    }
  }
}

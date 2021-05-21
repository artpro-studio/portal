export default {

  methods:{

    handlerMessage(data){
      //В случае ошибки
      if(data.status != true){
        if(data.message){
          if(Object.keys(data.message).length <= 0){
            this.$messagesError('Произошла ошибка');
            return false;
          }
          this.$messagesError(data.message);
          return false;
        }
        this.$messagesError('Произошла ошибка');
        return false;
      }
      //В случае успешного
      if(data.message){
        if(Object.keys(data.message).length <= 0){
          return false;
        }
        this.$messagesSuccess(data.message);
        return true;
      }
      //this.$messagesSuccess('Прошло успешно');
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

class ApiError extends Error{
  //Обработчик ошибок
  constructor(error, status, message) {
    super();
    this.error = error;
    this.message = message;
    this.status = status;
  }

  static badRequest(message){
    return new ApiError('404',false, message)
  }

  static internal(message){
    return new ApiError('500',false, message)
  }

  static errorValidations(message){
    return new ApiError('200',false, message)
  }

  static successValidations(message){
    return new ApiError('200',true, message)
  }

}
module.exports = ApiError



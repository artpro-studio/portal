const ApiError = require('../handlers/apiError')

module.exports = function (err, req, res, next) {
  if(err instanceof ApiError){
    return res.status(err.error).json({status:err.status, message: err.message})
  }
  return res.status(500).json({status:false, message: 'Непредвиденная ошибка'})
}

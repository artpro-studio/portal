const handlerDataTable = (data, model) => {
  //Обработчик для таблиц
  let result = {headers:[], content:[]}, headers = [];

  if(data.length > 0){
    headers = data.dataValues || data[0].dataValues
  }

  if(Array.isArray(data)){
    //Проверка если обьект пришел один
    result.content = data.map( item => {
      return item.dataValues
    })
  }else{
    result.content.push(data.dataValues)
  }

  // result.content.forEach(item => {
  //   let itemText = '';
  //   if (typeof item == 'Object'){
  //     console.log(item)
  //     for (let key in item){
  //       itemText += item[key]
  //     }
  //     item = itemText
  //   }
  //
  // })

  result.headers = []
  for (let key in headers) {
    let modelText = model[key] || model[key + 's'] || {}
    result.headers.push({text:modelText.comment || '', value: key})
  }

  return result;
}
module.exports.handlerDataTable = handlerDataTable

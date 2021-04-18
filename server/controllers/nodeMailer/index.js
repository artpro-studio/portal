const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { sendMailer } = require('../../handlers/nodeMailer')

//Группировака массива по ключу
function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  };
}


function stringMessage(licNumber, type, thisView, comment, title){
  let itemComment = comment != '' ? 'Комментарий: ' + comment + '; ' : '',
    itemLicNumber = licNumber != '' ? 'Лицевой счет: ' + licNumber + '; ': '',
    itemType = type != '' ? 'Тип счетчика: ' + type : '',
    itemThisView = thisView != '' ? thisView + '; ' : '',
    itemTitle = title != undefined ? 'Компания: ' + title + '; ' : '';

    itemType = itemType + ' - ' + itemThisView

    return itemTitle + itemLicNumber + ' ' + itemType + ' ' + itemComment + '<br>';
}


module.exports.sendCounter = async (req, res, next) => {
  //Отрпавка показаний счетчиков
  try {
    const formData = req.body

    //Группируем полученые данные для разделение отправки
    let groupData = groupBy("inn");
    groupData = groupData(formData.data);
    let request = null;
    //Перебираем сгруппированый обьект по инн с отправкой на почту
    for (let key in groupData) {
      let emailTo = groupData[key][0].email // Куда отправлять
      let titleTo = groupData[key][0].titleForm // Название организации
      let messages = '' // Тело сообшения

      groupData[key].forEach(item => {

        messages += stringMessage(item.licNumber, item.type, item.thisView, item.comment)

      })

      request = sendMailer(emailTo, 'Показание счетиков c portal-jkh.ru', messages)
    }

    console.log('fromEmail', formData.fromEmail);
    //Отправка клиенту если почта есть
    if(formData.fromEmail != ''){

      let items = '';

      formData.data.forEach(item => {

        items += stringMessage(item.licNumber, item.type, item.thisView, item.comment, item.titleForm);

      })

      console.log('items', items)
      request = sendMailer(formData.fromEmail, 'Показание счетиков c portal-jkh.ru', items)

    }


    res.json({status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

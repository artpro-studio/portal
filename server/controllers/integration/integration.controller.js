const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { Nsi, Types, House } = require('../../models/house/index')
const { Organization } = require('../../models/organization/index')
const csv = require('csv-parser')
const fs = require('fs')


module.exports.ImportData = async (req, res, next) => {

  function parse_data(filename, model, skip) {
    let results = [];
    fs.createReadStream(filename)
      .pipe(csv({
        separator: ';',
        mapValues: ({ header, index, value }) => value === ''? null : value
      }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (let item of results){
          if (skip > 0){
            skip--
            continue
          }
          try{
            let obj = await model.findOne({where: {id: item.id}});

            if (!obj) {
              console.log('0000-1',item)
              await model.create(item);
            }
          } catch (e) {
            console.log(e);
            throw e
          }
      }
      });
  }

  //Импорт
  try {
    const name = req.body['name']
    const skip = req.body['skip']
    let choice = {
      'nsi': {
        'model': Nsi,
        'filename': 'exp_nsi_06_04.csv'
      },
      'address': {
        'model': House,
        'filename': 'export_house.csv'
      },
      'org': {
        'model': Organization,
        'filename': 'export_org.csv'
      },
      'types': {
        'model': Types,
        'filename': 'export_types.csv'
      }
    }


    let filename = choice[name].filename
    let model = choice[name].model

    await parse_data(filename, model, skip);

    res.json({status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

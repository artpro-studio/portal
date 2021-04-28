const bodyParser = require('body-parser');
const ApiError = require('../../handlers/apiError')
const {handlerDataTable} = require('../../handlers/handlerDataApi')
const { Nsi, Types, House } = require('../../models/house/index')
const { Organization } = require('../../models/organization/index')
const { OrganizationRoles, MunicipalResource } = require('../../models/organization/municipalResource')
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
      'types': {
        'model': Types,
        'filename': 'export_types.csv'
      },
      'role': {
        'model': OrganizationRoles,
        'filename': 'export_role.csv'
      },
      'resource': {
        'model': MunicipalResource,
        'filename': 'export_resource.csv'
      },
      'nsi': {
        'model': Nsi,
        'filename': 'exp_nsi_06_04.csv'
      },
      'org': {
        'model': Organization,
        'filename': 'export_org.csv'
      },
      'address': {
        'model': House,
        'filename': 'export_house.csv'
      },
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


module.exports.ImportBindingData = async (req, res, next) => {

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
            let obj = await Organization.findOne({where: {id: item.id}});

            if (!obj) {
              continue
            }

            await obj.addMunicipalResource(item.resource_id)

          } catch (e) {
            console.log(e);
            throw e
          }
      }
      });
  }

  //Импорт
  try {
    const skip = req.body['skip']
    let filename = 'export_org_resource.csv'
    let model = Organization

    await parse_data(filename, model, skip);

    res.json({status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

var Excel = require('exceljs');

module.exports.parseIncomingRegistry = async (req, res, next) => {

  function parse_data(filename) {
    var wb = new Excel.Workbook();
    wb.xlsx.readFile(filename).then(function(){

      var sh = wb.getWorksheet(2);

      console.log(sh.rowCount);
      //Get all the rows data [1st and 2nd column]
      for (i = 1; i <= sh.rowCount; i++) {
        console.log(sh.getRow(i).getCell(1).value, sh.getRow(i).getCell(2).value);
      }
    });
  }

  //Импорт
  try {
    const filename = 'test_incoming.xlsx'
    await parse_data(filename);

    res.json({status: true })
  } catch (e) {
    console.log(e);
    return next(ApiError.errorValidations(e))
  }
}

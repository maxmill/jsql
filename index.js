exports.sqlQuery = require("./lib/sqlQuery");

module.exports = {
    toSQL: function (jsStatement) {
        //TODO: add validation before SQL conversion
        return exports.sqlQuery(jsStatement);
    }
}
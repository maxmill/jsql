exports.commands = require("./commands");
module.exports = function (statement)
{
    var out = "",
        cmds = exports.commands;
    out += cmds.select(statement.select);
    out += cmds.from(statement.from);

    if (statement.hasOwnProperty('join')) {
        out += cmds.join(statement.join);
    }
    if (statement.hasOwnProperty('where')) {
        out += cmds.where(statement.where);
    }
    if (statement.hasOwnProperty('group')) {
        out += cmds.group(statement.group);
    }
    return out;
}
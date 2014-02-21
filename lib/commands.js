exports.operators = require("./operators");
module.exports =
{
    select: function (select) {
        return "SELECT\n\t" + (
            select.map(function (param) {
                return (param instanceof Array) ? (param[0] + " AS " + param[1]) : param;
            }).join(", ")
            );
    },
    from: function (dbObject) {
        return "\nFROM\n\t" + dbObject.join(", ");
    },
    join: function (joins) {
        var out = "";
        joins.map(function (join) {
            out += " \n  " + join.type.toUpperCase() + " JOIN\n\t" + join.on.table
                + " ON " + join.from.table + "." + join.from.column
                + " = " + join.on.table + "." + join.on.column;
        });
        return out;
    },
    where: function (clauses) {
        var out = " \nWHERE\n\t",
            operators = exports.operators;

        clauses.map(function (clause) {
            out += clause.column + " " + operators[clause.name] + " "
                + (
                (operators[clause.name] === "IN")
                    ? "(" + clause.value
                    .map(function (param) {
                        return "'" + param + "'";
                    })
                    .join(", ") + ")"
                    : (operators[clause.name] === "BETWEEN")
                    ? clause.value[0] + " AND " + clause.value[1]
                    : clause.value
                );
            if (clause.hasOwnProperty('conjunction')) {
                out += " " + operators[clause.conjunction] + "\n\t";
            }
        });
        return out;
    },
    group: function (group) {
        return "\nGROUP BY\n\t" + group.join(", ");
    }
};
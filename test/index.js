var expectedValue,
    test = require("tap").test,
    jsQL = require('../');

test("all features", function (t) {
    expectedValue = "SELECT\n\tname, active AS Active Account\nFROM\n\tprimaryTable \n  INNER JOIN\n\tsecondTable ON primaryTable.joiningColumn = secondTable.joiningColumn \n  LEFT OUTER JOIN\n\tthirdTable ON primaryTable.joiningColumn = thirdTable.joiningColumn \nWHERE\n\tname = my stuff AND\n\tactive = true AND\n\tinClause IN ('param1', 'param2') AND\n\tactive BETWEEN 0 AND 1\nGROUP BY\n\tactive";

    t.equal(
        jsQL.toSQL({
            select: ["name", ["active", "Active Account"]],
            from: ["primaryTable"],
            join: [
                {
                    type: "inner",
                    from: {     table: "primaryTable", column: "joiningColumn"     },
                    on: {       table: "secondTable", column: "joiningColumn"     }
                },
                {
                    type: "left outer",
                    from: {     table: "primaryTable", column: "joiningColumn"     },
                    on: {       table: "thirdTable", column: "joiningColumn"     }
                }
            ],
            where: [
                { column: "name", name: "$e", value: "my stuff", conjunction: "$and" },
                { column: "acked", name: "$e", value: true, conjunction: "$and"  },
                { column: "inClause", name: "$in", value: ["param1", "param2"], conjunction: "$and"  },
                { column: "active", name: "$btw", value: [0, 1]   }
            ],
            group: ["active"]
        }),
        expectedValue,
        "testing: select alias join where group in between and"
    );
    t.end();
});


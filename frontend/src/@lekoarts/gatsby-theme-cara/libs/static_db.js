import db001 from "../../../../static/db/db001.json"
import db002 from "../../../../static/db/db002.json"

var db_list = [db001, db002]

async function gatherResponse(barcode) {
    var res = [];
    const barcode_query = [
        barcode.slice(0, 7),
        barcode.slice(0, 9),
        barcode
    ];
    db_list.forEach((db) => {
        barcode_query
        .map((key) => {
            if (key in db) {
                res.push({"len": key.length, "content": db[key]});
            }
        });
    })
    res.sort((a, b) => {
        return(10 * (b["len"] - a["len"]) + b["content"]["isspc"] - a["content"]["isspc"]);
    })
    const result = res.length > 0 ? res[0]["content"] : {};
    return JSON.stringify(result);
}

async function handleRequest(barcode) {
    const results = await gatherResponse(barcode);
    return results;
}

export default handleRequest
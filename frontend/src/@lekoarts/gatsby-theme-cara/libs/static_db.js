import allow from "../../../../static/db/allow.json"
import block from "../../../../static/db/block.json"

async function gatherResponse(allow, block, barcode) {
    var res = {};
    var barcode_company = barcode;
    if (barcode.length > 6) {
        for (let i = 7; i < 10; i++) {
            barcode_company = barcode.slice(0, i);
            if (barcode_company in allow) {
                res["type"] = "company";
                res["content"] = allow[barcode_company];
                res["isSPC"] = true;
            }
            if (barcode_company in block) {
                res["type"] = "company";
                res["content"] = block[barcode_company];
                res["isSPC"] = false;
            }
        }
    }
    if (barcode in allow) {
        res["type"] = "product";
        res["content"] = allow[barcode];
        res["isSPC"] = true;
    }
    if (barcode in block) {
        res["type"] = "product";
        res["content"] = block[barcode];
        res["isSPC"] = false;
    }
    return JSON.stringify(res);
}

async function handleRequest(barcode) {
    const results = await gatherResponse(allow, block, barcode);
    return results;
}

export default handleRequest
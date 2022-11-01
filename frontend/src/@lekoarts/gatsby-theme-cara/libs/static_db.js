import allow from "../../../../static/db/allow.json"
import block from "../../../../static/db/block.json"

async function gatherResponse(allow, block, barcode) {
    const allow_company = allow.company;
    const allow_product = allow.product;
    const block_company = block.company;
    const block_product = block.product;
    var res = {};
    var barcode_company = barcode;
    if (barcode.length > 6) {
        for (let i = 7; i < 10; i++) {
            barcode_company = barcode.slice(0, i);
            if (barcode_company in allow_company) {
                res["type"] = "company";
                res["content"] = allow_company[barcode_company];
                res["isSPC"] = true;
            }
            if (barcode_company in block_company) {
                res["type"] = "company";
                res["content"] = block_company[barcode_company];
                res["isSPC"] = false;
            }
        }
    }
    if (barcode in allow_product) {
        res["type"] = "product";
        res["content"] = allow_product[barcode];
        res["isSPC"] = true;
    }
    if (barcode in block_product) {
        res["type"] = "product";
        res["content"] = block_product[barcode];
        res["isSPC"] = false;
    }
    return JSON.stringify(res);
}

async function handleRequest(barcode) {
    const results = await gatherResponse(allow, block, barcode);
    return results;
}

export default handleRequest
import allow from "../static_db/allow.json"
import block from "../static_db/block.json"

async function gatherResponse(allow, block, barcode) {
    let barcode_company = barcode.slice(0, 7);
    const allow_company = allow.company;
    const allow_product = allow.product;
    const block_company = block.company;
    const block_product = block.product;
    var res = {};
    if (barcode_company in allow_company) {
        res["type"] = "company";
        res["content"] = allow_company[barcode_company];
    }
    if (barcode in allow_product) {
        res["type"] = "product";
        res["content"] = allow_product[barcode];
    }
    if (barcode_company in block_company || barcode in block_product) {
        res = {};
    }
    return JSON.stringify(res);
}

async function handleRequest(barcode) {
    const results = await gatherResponse(allow, block, barcode);
    return results;
}

export default handleRequest
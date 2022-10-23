import allow from "./data/allow.json"
import block from "./data/block.json"

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

async function handleRequest(request) {
    const init_json = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "https://isspc.pages.dev"
        }
    };
    const { searchParams } = new URL(request.url);
    let barcode = searchParams.get("barcode");
    const results = await gatherResponse(allow, block, barcode);
    console.log(results);
    return new Response(results, init_json);
    // return new Response(allow, init);
}

addEventListener("fetch", (event) => {
    return event.respondWith(handleRequest(event.request));
});
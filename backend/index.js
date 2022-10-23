const allowurl = '/data/allow.json';
const blockurl = '/data/block.json';

async function gatherResponse(allow, block, barcode) {
    let barcode_company = barcode.slice(0, 7);
    allow_dict = await JSON.parse(allow);
    block_dict = await JSON.parse(block);
    allow_company = allow_dict["compnay"];
    allow_product = allow_dict["product"];
    block_company = block_dict["compnay"];
    block_product = block_dict["product"];

    var res = {};

    if (barcode_company in allow_company) {
        res["type"] = "company";
        res["content"] = allow_company[barcode_company];
    }
    if (barcode in allow_product) {
        res["type"] = "product";
        res["content"] = allow_product[barcode];
    }
    if (barcode_company in block_company || barcode in block_product)  {
        res = {};
    }
    
    return res;
}

async function handleRequest(request) {
    const init = {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
    };

    const { searchParams } = new URL(request.url);
    let barcode = searchParams.get('barcode');
    
    const allow = await fetch(allowurl, init);
    const block = await fetch(blockurl, init);

    const results = await gatherResponse(allow, block, barcode);
    return new Response(results, init);
}

/**
 * Fetch and log a given request object
 * @param {Request} request
 */

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
});
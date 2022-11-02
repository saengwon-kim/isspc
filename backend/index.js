import db001 from "./db/db001.json"

var db_list = [db001]

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

async function handleRequest(request) {
    const init_json = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "https://isspc.pages.dev"
        }
    };
    const { searchParams } = new URL(request.url);
    let barcode = searchParams.get("barcode");
    const results = await gatherResponse(barcode);
    return new Response(results, init_json);
    // return new Response(allow, init);
}

addEventListener("fetch", (event) => {
    return event.respondWith(handleRequest(event.request));
});
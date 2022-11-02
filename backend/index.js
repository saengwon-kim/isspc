async function gatherResponse(barcode) {
    var res = [];
    const barcode_query = [
        barcode.slice(0, 7),
        barcode.slice(0, 9),
        barcode
    ];
    res = await Promise.all(
        barcode_query
        .map(async (key) => {
            const value = await isspcKV.get(key, { cacheTtl: 3600 });
            const result = value ? {"len": key.length, "content": JSON.parse(value)} : null;
            return result;
        }));
    res = res.filter(item => item);
    var result = {};
    if (res.length > 0) {
        res.sort((a, b) => {
            const diff = 10 * (b["len"] - a["len"]) + b["content"]["isspc"] - a["content"]["isspc"];
            return diff;
        });
        result = res[0]["content"];
    }
    return JSON.stringify(result);
}

async function handleRequest(request) {
    const init_json = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": ["https://isspc.pages.dev", "localhost"]
        }
    };
    const { searchParams } = new URL(request.url);
    let barcode = searchParams.get("barcode");
    const results = await gatherResponse(barcode);
    return new Response(results, init_json);
}

addEventListener("fetch", (event) => {
    return event.respondWith(handleRequest(event.request));
});
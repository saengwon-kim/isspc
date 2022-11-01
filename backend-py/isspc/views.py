import json
from os import path

from django.conf import settings
from django.http import JsonResponse, Http404

allow_path = path.join(settings.DATA_DIR, "allow.json")
block_path = path.join(settings.DATA_DIR, "block.json")

with open(allow_path, 'r') as file:
    allow_dict = json.load(file)
    allow_product = allow_dict["product"]
    allow_company = allow_dict["company"]

with open(block_path, 'r') as file:
    block_dict = json.load(file)
    block_product = block_dict["product"]
    block_company = block_dict["company"]

def isspc(request):
    barcode = request.GET.get('barcode')
    res = {}
    for last in range(7, 10):
        barcode_company = barcode[:last]
        if barcode_company in allow_company:
            res["type"] = "company"
            res["content"] = allow_company[barcode_company]
            res["isSPC"] = True
        if barcode_company in block_company:
            res["type"] = "company"
            res["content"] = block_company[barcode_company]
            res["isSPC"] = False
    
    if barcode in allow_product:
        res["type"] = "product"
        res["content"] = allow_product[barcode]
        res["isSPC"] = True

    if barcode in block_product:
        res["type"] = "product"
        res["content"] = block_product[barcode]
        res["isSPC"] = False

    if len(res) == 0:
        raise Http404
    else:
        return JsonResponse(res)
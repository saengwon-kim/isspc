# SPC 관련 제품 데이터베이스

## 자료 저장

`db/dbxxx.json` 파일에 저장, Cloudflare KV 저장소와 동기화

## 자료 형태

```json
{
    "바코드번호": {
        "isspc": "{bool}",
        "type": "company",
        "manufacturer": "제조"
    },
    "바코드번호": {
        "isspc": "{bool}",
        "type": "product",
        "manufacturer": "제조",
        "distributor": "유통",
        "name": "제품 이름"
    }
}
```

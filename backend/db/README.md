# SPC 관련 제품 데이터베이스

## 자료 저장 방식

`db/dbxxx.json` 파일에 저장 (추후 데이터베이스가 커지는 경우를 고려), Cloudflare KV 저장소와 동기화

실제로는 Cloudflare Workers가 KV 저장소에서 바코드를 검색하는 식으로 동작. 자세한 내용은 [프론트엔드 코드](../../frontend/src/@lekoarts/gatsby-theme-cara/libs/scanner.js) 참고.

## 자료 저장 형태

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
# SPC 관련 제품 데이터베이스

## 파일 설명

* `allow.json`: SPC 관련 제품
* `block.json`: SPC 관련이 아닌 제품

## 자료 형태

제조 기업 관련 내용은 다음과 같이 저장됩니다.

```json
"company": {
    "바코드번호(일부)": {
        "manufacturer": "제조"
    },
    // ...
}
```

제품은 다음과 같이 저장됩니다.

```json
"product": {
    "바코드번호": {
        "manufacturer": "제조",
        "distributor": "유통",
        "name": "제품 이름"
    },
    // ...
}
```

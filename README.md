# FeelEtc API

API для выполнения задания:

![](https://user-images.githubusercontent.com/3001791/79685605-bd15db00-8242-11ea-8f88-a214fb1113b1.png)

**HOST: https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/**

Во всех примерах ниже используется [httpie](https://httpie.org/) для запросов к API из командной строки.

## /users (GET)

Получить список пользователей

```
$ http https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 559
Content-Type: application/json
Date: Sun, 19 Apr 2020 14:14:26 GMT
Via: 1.1 8556a7e6f097b43ef38a15da76d83874.cloudfront.net (CloudFront)
X-Amz-Cf-Id: oxjaprlCRjamjfNZ823QW0DRnTVMFJgVzyBW_Xk_BOK6ZMItHedCVA==
X-Amz-Cf-Pop: ARN1-C1
X-Amzn-Trace-Id: Root=1-5e9c5cc2-a869a1992914275daed6a5d4;Sampled=0
X-Cache: Miss from cloudfront
x-amz-apigw-id: LPNuXF6PLPEFtsA=
x-amzn-RequestId: a6291668-f464-40d2-9ff1-d355c219f4f0

[
    {
        "createdAt": "2020-04-19T13:59:45.039Z",
        "id": "371c69df-2711-4c21-ae36-f92bd9358cb7",
        "user_age": 30,
        "user_name": "Viktor Karpov",
        "user_sex": "M"
    },
    {
        "createdAt": "2020-04-19T13:59:59.004Z",
        "id": "767f4fec-ab47-41b3-8571-01a1391fc301",
        "user_age": 31,
        "user_name": "Лёха Швед",
        "user_sex": "M"
    },
    {
        "createdAt": "2020-04-19T14:00:08.374Z",
        "id": "654023f1-7ddc-4d29-8834-7e30516b506f",
        "user_name": "Таня Швед",
        "user_sex": "F"
    },
    {
        "createdAt": "2020-04-19T13:59:53.144Z",
        "id": "7a5fe153-f229-432b-9a7c-7c19682814d9",
        "user_age": "31",
        "user_name": "FeelEtc",
        "user_sex": "M"
    }
]
```

## /users/ (POST)

Добавить нового пользователя (в теле запроса нужно указать данные пользователя в формате JSON)

```
$ http POST https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users name=Test sex=M age=31

HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 134
Content-Type: application/json
Date: Sun, 19 Apr 2020 14:16:29 GMT
Via: 1.1 05c02ade53b3395a9e9f2e8f66c7e4d1.cloudfront.net (CloudFront)
X-Amz-Cf-Id: _RNoQbu5gfGNQAADz4ltIfRp-4Aa6alXLTqp4_1dioAUJU7UUMorwg==
X-Amz-Cf-Pop: ARN1-C1
X-Amzn-Trace-Id: Root=1-5e9c5d3c-ea0cc3e4b975354ebcb2e53c;Sampled=0
X-Cache: Miss from cloudfront
x-amz-apigw-id: LPOBfG-HrPEFvpw=
x-amzn-RequestId: 278c9316-dbd2-4e4d-995d-2cd05acae75b

{
    "createdAt": "2020-04-19T14:16:29.133Z",
    "id": "c3cf9b87-591c-453b-8b3d-4bc0f3d98b6a",
    "user_age": "31",
    "user_name": "Test",
    "user_sex": "M"
}
```

## /users/{id} (PATCH)

Обновить данные указанного пользователя (подставить его id в URL вместо `{id}`)

```
$ http PATCH https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/7a5fe153-f229-432b-9a7c-7c19682814d9 name=FeelEtc sex=M age=31

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 137
Content-Type: application/json
Date: Sun, 19 Apr 2020 14:13:53 GMT
Via: 1.1 210fa10efb175d891774d170436663b1.cloudfront.net (CloudFront)
X-Amz-Cf-Id: akgMlUK27rBmbvfw3YhsvaJKmRu2lrra2aV6IavEvhcCefhaRbIiaQ==
X-Amz-Cf-Pop: ARN1-C1
X-Amzn-Trace-Id: Root=1-5e9c5ca1-3b06e50ec8099b158245883d;Sampled=0
X-Cache: Miss from cloudfront
x-amz-apigw-id: LPNpRGF6LPEFbWg=
x-amzn-RequestId: 61ffc277-06ff-45a4-86ac-d79ea0200924

{
    "createdAt": "2020-04-19T13:59:53.144Z",
    "id": "7a5fe153-f229-432b-9a7c-7c19682814d9",
    "user_age": "31",
    "user_name": "FeelEtc",
    "user_sex": "M"
}
```

## /users/{id} (DELETE)

Удалить указанного пользователя (подставить его id в URL вместо `{id}`)

```
$ http DELETE https://7r2d5vhfu8.execute-api.eu-west-2.amazonaws.com/dev/users/c3cf9b87-591c-453b-8b3d-4bc0f3d98b6a

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 39
Content-Type: application/json
Date: Sun, 19 Apr 2020 14:17:52 GMT
Via: 1.1 9b9ff06545217fe747384bd8b8509aa4.cloudfront.net (CloudFront)
X-Amz-Cf-Id: PLBQahyUy8gn0Pcth7CaEpQPAmTF-cO7A6iQ1sFEuK_WYPtC269HVg==
X-Amz-Cf-Pop: ARN1-C1
X-Amzn-Trace-Id: Root=1-5e9c5d90-03425084272db134bc04c8bd;Sampled=0
X-Cache: Miss from cloudfront
x-amz-apigw-id: LPOOiHCYrPEFkww=
x-amzn-RequestId: f0ac84f8-2a4e-4b65-9fc4-396c2acb880c

{
    "message": "User deleted successfully"
}
```

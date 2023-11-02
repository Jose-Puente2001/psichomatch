# Create Patient With Google

**URL** : `/decoding/decode`

**Method** : `PUT`

**Auth required** : Yes

**Content example**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNjk3Njg3MDg0LCJleHAiOjE2OTc2OTQyODR9.rw6RQRi3EdXbbxU86V3ZeU1IlNMSH7XCHG2q8gQQeQA"
}
```

## Success Response

**Code** : `200 OK`

**Content** : The patient token still valid

```json
{
 "true"
}
```

## Error Response

**Condition** : If patient token expire.

**Code** : `409 BAD REQUEST`

**Content** :

```json
{
  "false"
}
```

- [Back](../../README.md) : `MainPage`

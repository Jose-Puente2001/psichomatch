# Login Patient

**URL** : `/patient/login`

**Method** : `POST`

**Auth required** : No

**Data constraints**

```json
{
  "patientEmail": "Email",
  "password": "PASSWORD"
}
```

**Data example**

```json
{
  "patientEmail": "zeduard89@gmail.com",
  "password": "123456"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  {
    "data": {
        "id": 21,
        "name": null,
        "lastName": null,
        "phone": null,
        "email": "zeduard89@gmail.com",
        "password": "$2a$10$ZMJQVSGeO5BDJjfgD2paie9GwQ5eXU.nnb9M8xSgCkXEBWnIt7K5O",
        "role": "patient"
    },
    "tokenSession": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNjk3NTk5OTM4LCJleHAiOjE2OTc2MDcxMzh9.HqE_Q75JoC7vQqYPYYFdz2lxvkXAABsaHKz3Jvt1Utw"
  }
}
```

## Success Response

**Code** : `400 NO`
**Condition** : If 'email' don't exist.

**Content example**

```json
{
  "message": "false"
}
```

## Success Response

**Code** : `400 NO`

## Error Response

**Condition** : Wrong Password.

```json
{
  "message": "worng Password"
}
```

- [Back](../../README.md) : `MainPage`

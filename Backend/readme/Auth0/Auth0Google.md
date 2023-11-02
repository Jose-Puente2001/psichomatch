# Create Patient With Google

**URL** : `/auth/google`

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content** : The patient password will be sent to his/her Email

```json
{
  "Fill DB with"
    "
        name: userName,
        lastName: userLastName,
        email: patientEmail,
        password,(RANDOM)

    "
}
```

## Error Response

**Condition** : If 'email' dont exist.

**Code** : `500 BAD REQUEST`

**Content** :

```json
{
  "errorMessage": "Internal Server Error"
}
```

- [Back](../../README.md) : `MainPage`

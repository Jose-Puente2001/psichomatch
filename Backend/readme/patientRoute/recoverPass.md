# Create Patient with Email

**URL** : `/recoverPass`

**Method** : `PUT`

**Auth required** : No

**Data constraints**

```json
{
  "patientEmail": "Email"
}
```

**Data example**

```json
{
  "patientEmail": "zeduard89@gmail.com"
}
```

## Success Response (1)

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Please check you email"
}
```

## Success Response (2)

**User Email** : `User Most Click on the link, to rocover his/her pass`

**Content example**

```EMAIL
{
  "message": "Clic in the link to change the password:http://localhost:3001/recoverPass2/21"
}
```

## Success Response (3)

**Code** : `200`

**Content example**

```json
{
  "message": "Plase check you email"
}
```

**DB pass will change** : `Patient will recive a new email with his/her new password`

## Error Response

**Condition** : If 'email' exist.

**Code** : `500 BAD REQUEST`

- [Back](../../README.md) : `MainPage`

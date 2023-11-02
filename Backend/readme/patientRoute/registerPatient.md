# Create Patient with Email

**URL** : `/registerPatient`

**Method** : `POST`

**Auth required** : No

**Data constraints**

```json
{
  "patientEmail": "Email",
  "password": "PASSWORD",
  "patientName": "name",
  "patientLastName": "lastName",
  "patientPhone": "phone"
}
```

**Data example**

```json
{
  "patientEmail": "zeduard89@gmail.com",
  "password": "123456",
  "patientName": "Guillermo",
  "patientLastName": "Paez",
  "patientPhone": "0111111"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Patient Registered, please check you email"
}
```

## Error Response

**Condition** : If 'email' exist.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "errorMessage": "Patient already Exist"
}
```

- [Back](../../README.md) : `MainPage`

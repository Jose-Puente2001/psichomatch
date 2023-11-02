# Get all Patients

**URL** : `/patients?page=4`

**Method** : `GET`

**Auth required** : YES Bearer Token

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  "patients": [
    {
      "id": 19,
      "name": "Oscar",
      "lastName": "Apellido19",
      "phone": "809-787-6767",
      "email": "oscar@example.com",
      "password": "password654",
      "role": "patient"
    },
    {
      "id": 20,
      "name": "Julia",
      "lastName": "Apellido20",
      "phone": "809-565-4343",
      "email": "julia@example.com",
      "password": "password987",
      "role": "patient"
    },
    {
      "id": 21,
      "name": null,
      "lastName": null,
      "phone": null,
      "email": "zeduard89@gmail.com",
      "password": "$2a$10$ZMJQVSGeO5BDJjfgD2paie9GwQ5eXU.nnb9M8xSgCkXEBWnIt7K5O",
      "role": "patient"
    }
  ],
  "totalPages": 4,
  "actualPage": 4
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 BAD REQUEST`

**Content** :

```String
"Route not found"
```

- [Back](../../README.md) : `MainPage`

# Search a Patient with ID

**URL** : `/therapist/getTherapistByID/:id`

**Method** : `GET`

**Auth required** : YES

**Description** : Get the dates of a therapist with ID.

## Required Dates
```
  Body parameter:
    - none

  Query parameter:
    - none 
```


## Optional Dates
```
  Body parameter:
    - none

  Query parameter:
    - none
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
  //Example of Success Response
{
    "id": 1,
    "name": "Juan",
    "lastName": "Perez",
    "price": 100,
    "phone": "123456789",
    "adress": "Calle falsa 123",
    "image": "https://terapify.s3.amazonaws.com/1603911710956_Psic%C3%B3logo%20en%20l%C3%ADnea%20-%20Fernando%20Terapify-min.png",
    "description": "Lorem ipsum dolor",
    "rating": 0,
    "isActive": true,
    "email": "test@gmail.com",
    "password": "1234",
    "CategoryId": 4
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 NOT FOUND`

**Content** :

```String
"Route not found"
```

**Condition** : If 'id' is missing

**Code** : `400 BAD REQUEST`

**Content** :

```String
"Missing fields"
```

**Condition** : If any 'Therapist' found.

**Code** : `404 NOT FOUND`

**Content** :

```String
"Therapist not found"
```

**Condition** : If have a unknow ERROR

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```String
"error.message()"
```

- [Back](../../README.md) : `MainPage`

# Search By Country

**URL** : `/therapist/searchCountry/:country`

**Method** : `GET`

**Auth required** : YES

**Description** : Search by a Country by code ISO 3166-1 alfa-2, you can see the ISO CODE here (Only Spanish language):
  https://docs.google.com/spreadsheets/d/1q9UC-kJUFp55Bgz74TjUTaFKVIuOBcHg2QPBM-kgGA0/edit?usp=sharing
  You can use this to give the country flag.
  We use https://www.banderas-mundo.es/descargar/api to make a country flag in the web.

  If you want to add a flag, you should use:
  https://flagcdn.com/{SIZE}/{CODE-ISO}.png

  If you want Argentina flag
  https://flagcdn.com/48x36/ar.png

  The ISO code should be in lowercase letters.


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
    - ?page=x | x >= 1 & x <= totalPages
      Eg: /therapist/searchUbication/:ubication?page=2
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  [         
        {
        "id": 8,
        "name": "Sara",
        "lastName": "Gómez",
        "price": 800,
        "phone": "567890123",
        "adress": "Calle mayor 789",
        "image": "https://terapify.s3.amazonaws.com/1643761672588__Psic%C3%B3logo%20en%20linea-%20Yolanda%20Salas-%20%20Terapify-min.png",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt quam ut quam ultricies, et vehicula quam scelerisque.",
        "rating": 0,
        "isActive": false,
        "email": "test8@gmail.com",
        "password": "12350",
        "CategoryId": 3
    },
    
    {
        ...
    },
  ],
  "totalPages": 1,
  "totalTherapist": 6
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 NOT FOUND`

**Content** :

```String
"Route not found"
```

**Condition** : If 'ubication' is missing.

**Code** : `400 BAD REQUEST`

**Content** :

```String
"Missing fields"
```

**Condition** : If any 'Therapist' not found.

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

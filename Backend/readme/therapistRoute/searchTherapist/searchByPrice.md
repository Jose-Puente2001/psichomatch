# Search By Price

**URL** : `/therapist/searchPrice/:price`

**Method** : `GET`

**Auth required** : YES

**Description** : Filter with price param, you should use a number and the function return
the therapist with under price. 

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

**Condition** : If 'price' is missing.

**Code** : `400 BAD REQUEST`

**Content** :

```String
"Missing fields"
```

**Condition** : If 'price' is under 0.

**Code** : `406 NOT ACCEPTABLE`

**Content** :

```String
"Price must be > 0"
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

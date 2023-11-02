# Search By Category Id

**URL** : `/therapist/category/:id`

**Method** : `GET`

**Auth required** : YES

**Description** : Filter with a CategoryId it's the list:
    1- Terapia Psicoanalítica
    2- Terapia Cognitivo-Conductual
    3- Terapia sistémica breve
    4- Terapia cognitiva
    5- Counseling
    6- Terapia neuropsicológica
    7- Arte y musicoterapia

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
    "therapists": [
        {
            "id": 3,
            "name": "Pedro",
            "lastName": "López",
            "price": 300,
            "phone": "567890123",
            "adress": "Calle mayor 789",
            "image": "https://terapify.s3.amazonaws.com/1655855069895__Psic%C3%B3logo%20en%20linea-%20Lucas%20Di%20Marco%20Terapify-min.png",
            "description": "Soy psicólogo clínico con experiencia en terapia de grupo, terapia de adicciones y terapia de trauma. Estoy comprometido con ayudar a las personas a superar los desafíos de la vida. Me centro en proporcionar apoyo y orientación a mis clientes.",
            "rating": 0,
            "isActive": true,
            "linkedIn": "https://www.linkedin.com/in/francisco-perezdev/",
            "nation": "ec",
            "email": "test3@gmail.com",
            "password": "12346",
            "CategoryId": 1,
            "Category": {
                "name": "Terapia psicoanalítica"
            }
        },
        ...
    ],
    "totalPages": 1,
    "actualPage": 1
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 NOT FOUND`

**Content** :

```String
"Route not found"
```

**Condition** : If 'id' is missing.

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

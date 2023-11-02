# Get Therapist

**URL** : `/therapist/:page`

**Method** : `GET`

**Auth required** : YES

**Description** : Give with pagination a list of all therapist, 
you can obtain therapist and the pages of all therapist.

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
      Eg: /therapist?page=2
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  [         
    {
            "id": 12,
            "name": "José",
            "lastName": "López",
            "price": 300,
            "phone": "567890124",
            "adress": "Calle mayor 790",
            "image": "https://terapify.s3.amazonaws.com/1646441800780__Psic%C3%B3logo%20en%20linea-%20Jos%C3%A9%20Luis%20Herver%20Terapify-min.png",
            // this is a example img
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt quam ut quam ultricies, et vehicula quam scelerisque.",
            "isActive": true,
            "email": "test12@gmail.com",
            "password": "12346"
    },
    
    {
        ...
    },
  ],
  "totalPages": 4
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 NOT FOUND`

**Content** :

```String
"Route not found"
```

- [Back](../../README.md) : `MainPage`

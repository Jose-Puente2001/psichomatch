# Get all Medics

**URL** : `/medicsRoute/allMedics`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  [ {
        "id": 2,
        "title": "Proyecto 2",
        "description": "This is an example of a description.",

    },
 {}... ]
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

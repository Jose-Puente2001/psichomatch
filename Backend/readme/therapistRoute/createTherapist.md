# Create Therapist

**URL** : `/therapist/create`

**Method** : `POST`

**Auth required** : YES

**Description** : Add a therapist in DB.

## Required Dates
```
  Body parameter:
    - name -> String
    - lastname -> String
    - adress -> String

  Query parameter:
    - none
```


## Optional Dates
```
  Body parameter:
    - price -> Number
    - phone -> String
    - image -> Img-Format
    - description -> String
    - email -> email-format
    - password -> password-format

  Query parameter:
    - none
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  //Example of Success Response
  "message": "Therapist created"
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 NOT FOUND'`

**Content** :

```String
"Route not found"
```

**Condition** : If 'required arguments' is missing

**Code** : `400 BAD REQUEST`

**Content** :

```String
"Missing fields"
```

- [Back](../../README.md) : `MainPage`

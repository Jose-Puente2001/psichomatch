# Create Therapist

**URL** : `/therapist/changeDescription/:id`

**Method** : `PUT`

**Auth required** : YES

**Description** : Update therapist description.

## Required Dates
```
  Body parameter:
    - id -> Number
    - phone -> String
    - description -> String
    - image -> Image-format

  Query parameter:
    - id -> Number
    Eg: /therapist/changeDescription/2
```


## Optional Dates
```
  Body parameter:
   - none

  Query parameter:
    - none
```

## Success Response

**Code** : `202 ACCEPTED`

**Content example**

```json
{
  //Example of Success Response
  "message": "Therapist updated"
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

**Condition** : If 'therapist' dont found in DB. (Invalid Key)

**Code** : `404 NOT FOUND`

**Content** :

```String
"Therapist not found"
```

- [Back](../../README.md) : `MainPage`

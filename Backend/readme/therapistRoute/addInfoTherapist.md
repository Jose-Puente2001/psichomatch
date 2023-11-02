# Create Therapist

**URL** : `/therapist/addInfo/:id`

**Method** : `PUT`

**Auth required** : YES

**Description** : Add info to a therapist

## Required Dates
```
  Body parameter:
    - phone -> String
    - description -> String
    - image -> Image-format

  Query parameter:
    - id -> Number
    Eg: /therapist/addInfo/2
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

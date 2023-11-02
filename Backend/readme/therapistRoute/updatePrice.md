# Create Therapist

**URL** : `/therapist/updatePrice/:id`

**Method** : `PUT`

**Auth required** : YES

**Description** : Update therapist price per hour. Put a fixed value.

## Required Dates
```
  Body parameter:
    - price -> Number

  Query parameter:
    - id -> Number
    Eg: /therapist/updatePrice/2
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
  "message": "Price of therapist updated"
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

**Condition** : If 'price' < 0

**Code** : `406 NOT ACCEPTABLE`

**Content** :

```String
"Price must be > 0"
```

- [Back](../../README.md) : `MainPage`

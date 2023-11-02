# Create Therapist

**URL** : `/therapist/updatePricePercent/:id`

**Method** : `PUT`

**Auth required** : YES

**Description** : With the old value add a % increment.

## Required Dates
```
  Body parameter:
    - porcent -> Number between 0 and 100

  Query parameter:
    - id -> Number
    Eg: /therapist/updatePricePercent/2
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
  "message": "Price of therapist updated in ${porcent}%"
  // porcent is the body parameter.
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

**Condition** : If 'porcent' its not in a valid range.

**Code** : `406 NOT ACCEPTABLE`

**Content** :

```String
"Porcent must be between 0 and 100"
```

- [Back](../../README.md) : `MainPage`

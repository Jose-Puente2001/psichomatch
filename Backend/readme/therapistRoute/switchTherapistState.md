# Create Therapist

**URL** : `/therapist/switchTherapist/:id`

**Method** : `PUT`

**Auth required** : YES

**Description** : Switch the state of a therapist. (ACTIVE / INACTIVE)

## Required Dates
```
  Body parameter:
    - none

  Query parameter:
    - id -> Number
    Eg: /therapist/switchTherapist/2
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
  "message": "Therapist state updated"
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

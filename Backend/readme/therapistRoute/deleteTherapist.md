# Create Therapist

**URL** : `/therapist/delete/:id`

**Method** : `DELETE`

**Auth required** : YES

**Description** : Delete a therapist of the DB.
This make a DELETE with no backup.

## Required Dates
```
  Body parameter:
    - none

  Query parameter:
    - id -> Number
    Eg: /therapist/delete/2
```


## Optional Dates
```
  Body parameter:
   - none

  Query parameter:
    - none
```

## Success Response

**Code** : `204 NO CONTENT`

**Content example**

```json
{
  //Example of Success Response
  "message": "Therapist deleted"
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

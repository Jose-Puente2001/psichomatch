# Back Docs

`Develope url: https://localhost:3001/...`

## Open Endpoints

Open endpoints require no Authentication.

- [Patient Login](./readme/patientRoute/login.md) : `POST /patient/login`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### JWT token

- [Patient Token Info](./readme/decoding/decoding.md) : `PUT /decoding/decode`

### Patient related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

- [Patient Register](./readme/patientRoute/registerPatient.md) : `POST /registerPatient`
- [Patient Register Google](./readme/Auth0/Auth0Google.md) : `GET /auth/google`
- [Patient RecoverPass](./readme/patientRoute/recoverPass.md) : `POST /recoverPass`
- [All Patients](./readme/patientRoute/getAllPatients.md) : `GET /patients`

### Medics related

Endpoints for viewing and manipulating the Projects that the Admin
has permissions to access

-

### Imagen Containers related

Endpoints for viewing and manipulating the Projects that the Admin
has permissions to access

### Payment Methods

-

### DashBoard Admin

-

### Developer Tools

- npm run dev

### Build Tsc

- npm run tsc

# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Reguest Body

The request body should be in JSON format and include the following fields:

  - `fullname` (object):
    - `firstname` (string, required): User's first name (minimum 3 characters) .
    - `lastname` (string, optional): User's last name (minimum 3 characters).
  - `email` (string, required): User's email address (must be a valid email).
  - `password` (string, required): User's password (minimum 6 characters).

### Response Body

The response body should be in JSON format and include the following fields:

  - `user` (object)
    - `fullname` (object):
        - `firstname` (string, required): User's first name (minimum 3 characters) .
        - `lastname` (string, optional): User's last name (minimum 3 characters).
    - `email` (string, required): User's email address (must be a valid email).
    - `password` (string, required): User's password (minimum 6 characters).
  - `token` (string): JWT Token.


## `/users/login` Endpoint

### Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:
- `email` (string, required): User's email address.
- `password` (string, required): User's password (minimum 6 characters).

### Response Body

The response body should be in JSON format and include the following fields:

  - `user` (object)
    - `fullname` (object):
        - `firstname` (string, required): User's first name (minimum 3 characters) .
        - `lastname` (string, optional): User's last name (minimum 3 characters).
    - `email` (string, required): User's email address (must be a valid email).
    - `password` (string, required): User's password (minimum 6 characters).
  - `token` (string): JWT Token.

## `/users/profile` Endpoint

### Description
Retrieves the authenticated user's profile information.

### HTTP Method
`GET`

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Response Body
The response returns the authenticated user's information in JSON format.

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  // ...other user properties...
}
```

## `/users/logout` Endpoint

### Description
Logs out the user by clearing the authentication token cookie and blacklisting the token.

### HTTP Method
`GET`

### Response Body
A JSON message confirming the logout:
```json
{ "message": "Logged out" }
```

## `/captains/register` Endpoint

### Description
Registers a new captain by creating an account with the provided details, including vehicle information.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:
  - `fullname` (object):
    - `firstname` (string, required): Captain's first name (minimum 3 characters).
    - `lastname` (string, optional): Captain's last name (minimum 3 characters).
  - `email` (string, required): Captain's email address.
  - `password` (string, required): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string, required): Vehicle color (minimum 3 characters).
    - `plate` (string, required): Vehicle plate number (minimum 3 characters).
    - `capacity` (number, required): Vehicle capacity (minimum 1).
    - `vehicleType` (string, required): One of 'car', 'motorcyle', or 'auto'.

### Response Body
The response returns a JSON object containing:
  - `token` (string): JWT token for authentication.
  - `captain` (object): The newly created captain's details.

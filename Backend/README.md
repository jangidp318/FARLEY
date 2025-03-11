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

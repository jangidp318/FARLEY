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

## `/captains/login` Endpoint

### Description
Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include:
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.

### Response Body
A JSON object containing:
- `token` (string): JWT Token.
- `captain` (object): The authenticated captain's details.

## `/captains/profile` Endpoint

### Description
Retrieves the authenticated captain's profile information.

### HTTP Method
`GET`

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Response Body
A JSON object with the captain's details.
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

## `/captains/logout` Endpoint

### Description
Logs out the captain by clearing the authentication token cookie and blacklisting the token.

### HTTP Method
`GET`

### Response Body
A JSON object confirming the logout:
```json
{ "message": "Logged out" }
```


## `/maps/get-coordinates` Endpoint

### Description
Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method
`GET`

### Query Parameters
- `address` (string, required): The address to get coordinates for (minimum 3 characters).

### Response Body
The response body should be in JSON format and include the following fields:
- `lat` (number): The latitude of the address.
- `long` (number): The longitude of the address.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```http
GET /maps/get-coordinates?address=123+Main+St
```

### Example Response
```json
{
  "lat": 37.7749,
  "long": -122.4194
}
```

## `/maps/get-distance-time` Endpoint

### Description
Retrieves the distance and time between two locations.

### HTTP Method
`GET`

### Query Parameters
- `origin` (string, required): The starting address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Response Body
The response body should be in JSON format and include the following fields:
- `distance` (object): The distance information.
  - `text` (string): The distance in human-readable format.
  - `value` (number): The distance in meters.
- `duration` (object): The duration information.
  - `text` (string): The duration in human-readable format.
  - `value` (number): The duration in seconds.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```http
GET /maps/get-distance-time?origin=123+Main+St&destination=456+Elm+St
```

### Example Response
```json
{
  "distance": {
    "text": "5.3 km",
    "value": 5300
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

## `/maps/get-suggestions` Endpoint

### Description
Retrieves autocomplete suggestions for a given input.

### HTTP Method
`GET`

### Query Parameters
- `input` (string, required): The input text to get suggestions for (minimum 3 characters).

### Response Body
The response body should be in JSON format and include the following fields:
- `predictions` (array): An array of prediction objects.
  - `description` (string): The description of the prediction.
  - `place_id` (string): The place ID of the prediction.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```http
GET /maps/get-suggestions?input=Main+St
```

### Example Response
```json
{
  "predictions": [
    {
      "description": "123 Main St, San Francisco, CA, USA",
      "place_id": "ChIJd_Y0eVIvkIARuQyDN0F1LBA"
    },
    {
      "description": "Main St, San Francisco, CA, USA",
      "place_id": "ChIJd_Y0eVIvkIARuQyDN0F1LBB"
    }
  ]
}
```


## `/rides/create` Endpoint

### Description
Creates a new ride with the provided details.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:
- `pickup` (string, required): Pickup address (minimum 3 characters).
- `destination` (string, required): Destination address (minimum 3 characters).
- `vehicleType` (string, required): One of 'car', 'auto', or 'moto'.

### Response Body
The response body should be in JSON format and include the following fields:
- `user` (object): The user who created the ride.
- `pickup` (string): The pickup address.
- `destination` (string): The destination address.
- `otp` (string): The OTP for the ride.
- `fare` (number): The fare for the ride.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

### Example Response
```json
{
  "user": "user_id",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "otp": "123456",
  "fare": 150
}
```

## `/rides/get-fare` Endpoint

### Description
Retrieves the fare for a ride based on the provided pickup and destination addresses.

### HTTP Method
`GET`

### Request Body
The request body should be in JSON format and include the following fields:
- `pickup` (string, required): Pickup address (minimum 3 characters).
- `destination` (string, required): Destination address (minimum 3 characters).

### Response Body
The response body should be in JSON format and include the following fields:
- `auto` (number): The fare for an auto.
- `car` (number): The fare for a car.
- `moto` (number): The fare for a moto.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St"
}
```

### Example Response
```json
{
  "auto": 80,
  "car": 150,
  "moto": 100
}
```

## `/rides/confirm` Endpoint

### Description
Confirms a ride by updating its status to 'accepted' and assigning a captain to the ride.

### HTTP Method
`GET`

### Request Body
The request body should be in JSON format and include the following fields:
- `rideId` (string, required): The ID of the ride to be confirmed.
- `captain` (object, required): The captain object containing the captain's details.

### Response Body
The response body should be in JSON format and include the following fields:
- `ride` (object): The updated ride details, including the user and captain information.

### Headers
- `Authorization`: Bearer token (or use cookie-based auth)

### Example Request
```json
{
  "rideId": "60c72b2f9b1e8a001c8e4d5a",
  "captain": {
    "_id": "60c72b2f9b1e8a001c8e4d5b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Example Response
```json
{
  "ride": {
    "_id": "60c72b2f9b1e8a001c8e4d5a",
    "user": {
      "_id": "60c72b2f9b1e8a001c8e4d5c",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com"
    },
    "captain": {
      "_id": "60c72b2f9b1e8a001c8e4d5b",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main St",
    "destination": "456 Elm St",
    "fare": "150.00",
    "status": "accepted",
    "otp": "123456"
  }
}
```
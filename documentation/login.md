# Login

Authenticates a user and returns their user ID along with a secret key.
Endpoint


```js
GET /api/login/<username>/<password>
```

## Parameters

| Parameter | Type   | Description         |
|    -      |   -    |      -              |
| username  | String |Username of the user |
| password  | String |Password of the user |

## Example Request

```bash
curl -X GET "https://example.com/api/login/example_user/example_password"
```

## Example Response

```json
{
  "user_id": 123,
  "secret": "random_secret_key"
}
```
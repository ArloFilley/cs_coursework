# Create User

Creates a new user in the database.
Endpoint

```js
POST /api/create_user
```

## Request Body

```json
{
  "username": "example_user",
  "password": "example_password"
}
```

## Example Request

```bash
curl -X POST "https://example.com/api/create_user" \
-H "Content-Type: application/json" \
-d '{"username": "example_user", "password": "example_password"}'
```
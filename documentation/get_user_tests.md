# Get User Tests

Retrieves tests associated with a specific user from the database.

## Endpoint

```js
GET /api/get_tests/<user_id>/<secret>
```

## Parameters

| Parameter | Type      | Description                                          | 
| -         |  -        |      -                                               |
| user_id   | integer   | User ID of the user whose tests need to be retrieved |
| secret    | String    | Secret key for authentication                        |

## Example Request

```bash
curl -X GET "https://example.com/api/get_tests/123/your_secret_key_here"
```

## Example Response

```json
{
  "test_type": "words",
  "test_length": 100,
  "test_time": 300,
  "test_seed": 987654321,
  "quote_id": 123,
  "wpm": 65,
  "accuracy": 98
}
```
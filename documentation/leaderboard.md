This API endpoint retrieves the highest test data from each user and returns it as a JSON array.  

# Endpoint

```
GET /api/leaderboard
```

# Request Parameters

This endpoint does not require any request parameters.

# Example Request

```bash
curl -X GET "https://example.com/api/leaderboard"
```

# Response

```json
[
	{
	    "userName": "user_1",
	    "wpm": 85,
	},
	{
	    "userName": "user_2",
	    "score": 80,
	},
	{
	    "userName": "user_3",
	    "wpm": 73,
	}
]
```
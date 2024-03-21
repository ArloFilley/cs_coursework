Post Test Data  This API endpoint allows you to post test data, recording the results of a test taken by a user.  

# Endpoint

```
POST /api/post_test
```

# Request Parameters  
| Parameter  |  Type   | Description                                          |
| ---------- | :-----: | ---------------------------------------------------- |
| testType   | String  | Type of the test (e.g., "typing", "multiple choice") |
| testLength | Integer | Length of the test in number of items or questions   |
| testTime   | Integer | Duration of the test in seconds                      |
| testSeed   | String  | Seed for generating randomized test content          |
| quoteId    | String  | Identifier for a specific quote, if applicable       |
| wpm        | Integer | Words per minute (typing speed)                      |
| accuracy   | Integer | Accuracy of responses (e.g., percentage)             |
| userId     | String  | Identifier of the user taking the test               |
| secret     | String  | Secret key for authentication and authorization      |

# Example Request

```bash 
curl -X POST "https://example.com/api/post_test" \
	-H "Content-Type: application/json" \ 
	-d '{   
		"testType": "typing",   
		"testLength": 100,   
		"testTime": 600,   
		"testSeed": "random_seed_123",   
		"quoteId": "quote_456",   
		"wpm": 65.5,   
		"accuracy": 98.2,   
		"userId": "user_789",   
		"secret": "your_secret_key_here" 
	}'
```

# Example Response

Upon successful submission, you will receive a JSON response with the following structure:

```json
{
	"status": "success",   
	"message": "Test results successfully recorded",   
	"testId": "test_123456789" 
}
```

- `status`: Indicates the status of the request (either "success" or "error").
- `message`: Describes the outcome of the request.
- `testId`: Unique identifier assigned to the recorded test data.

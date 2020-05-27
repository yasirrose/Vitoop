# API V1 DOC

## GET /api/v1/conversations/{id}
<details>
  <summary>Get conversation by id</summary>

  ### Response
  ```json
{
    "conversation":{
        "id":1,
        "name":"Name",
        "conversation_data":{
            "id":1,
            "sheet":"Text",
            "is_for_related_users":true,
            "messages":[
                {
                    "id":1,
                    "message":"test",
                    "user":{
                        "id":1,
                        "username":"user",
                        "is_show_help":false,
                        "is_agreed_with_term":true,
                        "is_check_max_link":true
                    },
                    "date":{"date":"2020-03-17 19:48:34.000000","timezone_type":3,"timezone":"UTC"}
                }
            ],
            "rel_users":[]
        },
        "user": {
              "id":1,
              "username":"user",
              "is_show_help":false,
              "is_agreed_with_term":true,
              "is_check_max_link":true
        },
        "created":"2020-03-17T19:48:33+0000"
    },
    "isOwner":true,
    "canEdit":true,
    "token":"token",
    "userId": 1
}
```
</details>

## GET /api/v1/my-projects
<details>
  <summary>Get my projects (where I am owner or have relation)</summary>
  
  ### Response
  ```json
[
    {
        "id":1,
        "name":"Project Name"
    }
]
```
</details>

## GET /api/v1/projects/{id}
<details>
  <summary>Get project by id</summary>

  ### Response
  ```json
{
    "project": {
        "id": 1,
        "name": "Name",
        "project_data":{
            "id":1,
            "sheet":"Text",
            "is_private":false,
            "is_for_related_users":false,
            "is_all_records":false,
            "rel_users":[
                {
                    "id":1,
                    "user":{
                       "id":1,
                       "username":"user",
                       "is_show_help":false,
                       "is_agreed_with_term":true,
                       "is_check_max_link":true
                    },
                    "read_only":false
                }
            ]
        },
        "user": {
            "id":1,
            "username":"user",
            "is_show_help":false,
            "is_agreed_with_term":true,
            "is_check_max_link":true
        },
        "created":"2020-03-17T19:48:33+0000"
    },
    "resourceInfo": {
        "prjc":"0",
        "lexc":"0",
        "pdfc":"0",
        "telic":"0",
        "linkc":"0",
        "adrc":"0",
        "bookc":"0",
        "convc":"0"
    },
    "isOwner": true
}
```
</details>

## GET /api/v1/projects/{id}/assignments
<details>
  <summary>Get assignment resources for project</summary>

  ### Response
  ```json
[
    {
        "id":1,
        "resourceId":"1",
        "linkedResourceId": "1",
        "coefficient": 0,
        "userId":1
    }
]
```
</details>

## POST /api/v1/projects/{id}/assignments
<details>
  <summary>Create assignment resources for project</summary>

  ### Request
```json
{
  "resourceIds": [1,2]
}
```
  ### Response: code - 201
  ```json
[
    {
        "id":1,
        "resourceId":"1",
        "linkedResourceId": "1",
        "coefficient": 0,
        "userId":1
    }
]
```
</details>

## POST /api/v1/users/passwords
<details>
  <summary>Send request for forgot password</summary>

  ### Request
```json
{
  "email": "test@example.com"
}
```
  ### Response: code - 204
</details>

## PUT /api/v1/users/passwords
<details>
  <summary>Send request for forgot password</summary>

  ### Request
```json
{
  "token": "token",
  "password": "password"
}
```
  ### Response: code - 204
</details>
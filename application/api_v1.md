# API V1 DOC

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

## GET /api/v1/conversations/{id}/assignments
<details>
  <summary>Get assignment resources for conversations</summary>

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

## POST /api/v1/conversations/{id}/assignments
<details>
  <summary>Create assignment resources for conversations</summary>

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

## GET /api/v1/conversations/{id}/{resourceType}
<details>
  <summary>Get resources of determined type (pdf|adr|link|teli|lex|prj|book) for conversations </summary>

  ### Response
  ```json
{
    "recordsTotal":1,
    "recordsFiltered": 1,
    "data": [{
        "id": 1,
        "name": "Name",
        "username": "user",
        "res12count": 1,
        "avgmark": 0,
        "isUserHook": 0,
        "isUserRead": 0,
        "coeff": 0,
        "coeffId": 1
    }],
    "resourceInfo": {
       "prjc":"0",
       "lexc":"0",
       "pdfc":"0",
       "telic":"0",
       "linkc":"0",
       "adrc":"0",
       "bookc":"0",
       "convc":"0"
    } 
}
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
  <summary>Set new password using token from email</summary>

  ### Request
```json
{
  "token": "token",
  "password": "password"
}
```
  ### Response: code - 204
</details>

## GET /api/v1/resources/{id}
<details>
  <summary>Get resource info by id</summary>

  ### Response
```json
{
    "resource_type":"link",
    "resource":{
        "name":"Springer",
        "name2":null,
        "lang":"de",
        "country":null,
        "isUserHook":false,
        "isUserRead":false,
        "url":"https:\/\/www.springer.com\/",
        "is_hp":true,
        "user":{},
        "street":null,
        "zip":null,
        "city":null,
        "contact1":null,
        "contact3":null,
        "contact4":null,
        "contact5":null,
        "author":null,
        "publisher":null,
        "issuer":null,
        "isbn":null,
        "tnop":null,
        "kind":null,
        "year":null,
        "releaseDate":null,
        "pdfDate":null,
        "wikifullurl":null,
        "description":null,
        "status":null,
        "isNotify":null,
        "isResourceUser":null
    },
    "tabs":{
        "remarks":"0",
        "remarks_private":"0",
        "comments":"0",
        "rels":"0"
    },
    "rating":{
        "ownmark":null,
        "ownimg":"",
        "avgmark":null,
        "avgimg":""
    },
    "tags":{
        "tags":[
            {
                "id":541,
                "text":"Verlag",
                "cnt_tag":"1",
                "is_own":"0"
            }
        ],
        "tagsRestAddedCount":5,
        "tagsRestRemovedCount":2
    }
}
```
</details>

## POST /api/v1/resources
<details>
  <summary>Create resource</summary>

  ### Request
```json
{
    "resource_type":"link",
    "resource":{
        "name":"Springer",
        "name2":null,
        "lang":"de",
        "country":null,
        "isUserHook":false,
        "isUserRead":false,
        "url":"https:\/\/www.springer.com\/",
        "is_hp":true,
        "user":{},
        "street":null,
        "zip":null,
        "city":null,
        "contact1":null,
        "contact3":null,
        "contact4":null,
        "contact5":null,
        "author":null,
        "publisher":null,
        "issuer":null,
        "isbn":null,
        "tnop":null,
        "kind":null,
        "year":null,
        "releaseDate":null,
        "pdfDate":null,
        "wikifullurl":null,
        "description":null,
        "status":null,
        "isNotify":null,
        "isResourceUser":null
    }
}
```

  ### Response
```json
{
    "resource_type":"link",
    "resource":{
        "name":"Springer",
        "name2":null,
        "lang":"de",
        "country":null,
        "isUserHook":false,
        "isUserRead":false,
        "url":"https:\/\/www.springer.com\/",
        "is_hp":true,
        "user":{},
        "street":null,
        "zip":null,
        "city":null,
        "contact1":null,
        "contact3":null,
        "contact4":null,
        "contact5":null,
        "author":null,
        "publisher":null,
        "issuer":null,
        "isbn":null,
        "tnop":null,
        "kind":null,
        "year":null,
        "releaseDate":null,
        "pdfDate":null,
        "wikifullurl":null,
        "description":null,
        "status":null,
        "isNotify":null,
        "isResourceUser":null
    },
    "tabs":{
        "remarks":"0",
        "remarks_private":"0",
        "comments":"0",
        "rels":"0"
    },
    "rating":{
        "ownmark":null,
        "ownimg":"",
        "avgmark":null,
        "avgimg":""
    },
    "tags":{
        "tags":[
            {
                "id":541,
                "text":"Verlag",
                "cnt_tag":"1",
                "is_own":"0"
            }
        ],
        "tagsRestAddedCount":5,
        "tagsRestRemovedCount":2
    }
}
```
</details>

## PUT /api/v1/resources/{id}
<details>
  <summary>Update resource</summary>
  
 ### Request
```json
{
    "resource_type":"link",
    "resource":{
        "name":"Springer",
        "name2":null,
        "lang":"de",
        "country":null,
        "isUserHook":false,
        "isUserRead":false,
        "url":"https:\/\/www.springer.com\/",
        "is_hp":true,
        "user":{},
        "street":null,
        "zip":null,
        "city":null,
        "contact1":null,
        "contact3":null,
        "contact4":null,
        "contact5":null,
        "author":null,
        "publisher":null,
        "issuer":null,
        "isbn":null,
        "tnop":null,
        "kind":null,
        "year":null,
        "releaseDate":null,
        "pdfDate":null,
        "wikifullurl":null,
        "description":null,
        "status":null,
        "isNotify":null,
        "isResourceUser":null
    }
}
```

 ### Response
```json
{
    "resource_type":"link",
    "resource":{
        "name":"Springer",
        "name2":null,
        "lang":"de",
        "country":null,
        "isUserHook":false,
        "isUserRead":false,
        "url":"https:\/\/www.springer.com\/",
        "is_hp":true,
        "user":{},
        "street":null,
        "zip":null,
        "city":null,
        "contact1":null,
        "contact3":null,
        "contact4":null,
        "contact5":null,
        "author":null,
        "publisher":null,
        "issuer":null,
        "isbn":null,
        "tnop":null,
        "kind":null,
        "year":null,
        "releaseDate":null,
        "pdfDate":null,
        "wikifullurl":null,
        "description":null,
        "status":null,
        "isNotify":null,
        "isResourceUser":null
    },
    "tabs":{
        "remarks":"0",
        "remarks_private":"0",
        "comments":"0",
        "rels":"0"
    },
    "rating":{
        "ownmark":null,
        "ownimg":"",
        "avgmark":null,
        "avgimg":""
    },
    "tags":{
        "tags":[
            {
                "id":541,
                "text":"Verlag",
                "cnt_tag":"1",
                "is_own":"0"
            }
        ],
        "tagsRestAddedCount":5,
        "tagsRestRemovedCount":2
    }
}
```
</details>

## GET /api/v1/resources/{id}/remarks
<details>
  <summary>Get all remarks for resource</summary>

  ### Response
```json
[
  {
      "id":110,
      "text":"test",
      "ip":"172.23.0.1",
      "locked":false,
      "user":{
          "id":1,
          "username":"user"
      },
      "created_at":"2020-05-14T20:53:19+00:00"
  }
]
```
</details>

## POST /api/v1/resources/{id}/remarks
<details>
  <summary>Add remark to resource</summary>
  
  ### Request
 
```json
{
  "text":"test",
  "locked":false
} 
```

  ### Response

```json
[
  {
      "id":110,
      "text":"test",
      "ip":"172.23.0.1",
      "locked":false,
      "user":{
          "id":1,
          "username":"user"
      },
      "created_at":"2020-05-14T20:53:19+00:00"
  }
]
```
</details>

## GET /api/v1/resources/{id}/private-remarks
<details>
  <summary>Get private remark for resource (Remark foor only current user)</summary>

  ### Response
```json
[
  {
      "id":110,
      "text":"test",
      "user":{
          "id":1,
          "username":"user"
      },
      "created_at":"2020-05-14T20:53:19+00:00"
  }
]
```
</details>


## POST /api/v1/resources/{id}/private-remarks
<details>
  <summary>Add/update private remark to resource</summary>
  
  ### Request
 
```json
{
  "text":"test"
} 
```

  ### Response

```json
[
  {
      "id":110,
      "text":"test",
      "user":{
          "id":1,
          "username":"user"
      },
      "created_at":"2020-05-14T20:53:19+00:00"
  }
]
```
</details>


## GET /api/v1/resources/{id}/comments
<details>
  <summary>Get comments for resource</summary>

  ### Response
```json
[
  {
    "id":1,
    "text":"comments",
    "user":{
        "id":1,
        "username":"username"
      },
    "is_visible":false,
    "created_at":"2016-04-05T12:54:20+00:00"
  }
]
```
</details>

## POST /api/v1/resources/{id}/comments
<details>
  <summary>Add comment to resource</summary>
  
  ### Request
 
```json
{
  "text":"test"
} 
```

  ### Response

```json
[
  {
    "id":1,
    "text":"test",
    "user":
        {
            "id":1,
            "username":"username"
        },
    "is_visible":true,
    "created_at":"2020-07-15T13:29:32+00:00"
  }
]
```
</details>


## GET /api/v1/resources/{id}/assignments
<details>
  <summary>Get assignments for resource</summary>

  ### Response
```json
{
    "lexicons":[
        {
            "id":1,
            "name":"Lexicon",
            "cnt_res":"1",
            "is_own":"1"
        }
    ],
    "projects":[
        {
            "name":"Project name"
        }
    ]
}
```
</details>

## POST /api/v1/resources/{id}/tags
<details>
  <summary>Add tag to resource</summary>
 
 ### Request
 ```json
{
  "name": "tag name"
}
 ```
 
 ### Response
  ```json
{
  "tags":[
      {
          "id":541,
          "text":"Verlag",
          "cnt_tag":"1",
          "is_own":"0"
      }
  ],
  "tagsRestAddedCount":5,
  "tagsRestRemovedCount":2
}
  ```
</details>

## DELETE /api/v1/resources/{id}/tags/{tagId}
<details>
  <summary>Remove tag from resource by id</summary>
    
   ### Response
```json
  {
    "tags":[
        {
            "id":541,
            "text":"Verlag",
            "cnt_tag":"1",
            "is_own":"0"
        }
    ],
    "tagsRestAddedCount":5,
    "tagsRestRemovedCount":2
  }
  ```
</details>

## POST /api/v1/resources/{id}/flags
<details>
  <summary>Add flag to resource</summary>
 
 ### Request
 ```json
{
  "type": 1, // 1 - delete, 2 - blame
  "info": "test"
}
 ```
 
 ### Response
  ```json
{
    "id": 1,
    "type": 1,
    "info": "test",
    "user": {
        "id": 1,
        "username": "username"
    },
    "created_at": "2020-07-21T09:25:06+00:00"
}
  ```
</details>

## POST /api/v1/resources/{id}/flags/{flagId}/approvements
<details>
  <summary>Delete resource by changing flag type to 128 type (only for admin)</summary>
    
   ### Response
```json
{
    "id": 1,
    "type": 128,
    "info": "test",
    "user": {
        "id": 1,
        "username": "username"
    },
    "created_at": "2020-07-21T09:25:06+00:00"
}
```
</details>


## DELETE /api/v1/resources/{id}/flags/{flagId}
<details>
  <summary>Remove flag from resource by id (only for admin)</summary>
    
   ### Response 204
```json
  []
  ```
</details>

## POST /api/v1/resources/{id}/hidings
<details>
  <summary>Hide resource with url (pdf, link, textlink) for auto url checking (only for admin)</summary>
 
 ### Request
 ```json
{
   "isSkip": true
}
 ```
 
 ### Response
  ```json
{
   "isSkip": true
}
  ```
</details>

## POST /api/v1/resources/{id}/ratings
<details>
  <summary>Add rating by user</summary>
 
 ### Request
 ```json
{
   "ownmark": "5" /* possible values '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5' */
}
 ```
 
 ### Response
  ```json
{
    "ownmark":5,
    "ownimg":"rating_p50.png",
    "avgmark":5,
    "avgimg":"rating_p50.png"
}
  ```
</details>

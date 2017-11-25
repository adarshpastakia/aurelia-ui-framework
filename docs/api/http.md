#### Basic Fetch Operations

###### Retrieval Operations

* `get(apiSlug, query, headerOptions):Promise<JSON>`
DEPRECATED: Alias for json method.

* `text(apiSlug, query, headerOptions):Promise<String>`
Fetch text

* `blob(apiSlug, query, headerOptions):Promise<BLOB>`
Fetch BLOB

* `json(apiSlug, query, headerOptions):Promise<JSON>`
Fetch json result


###### Change Operations

* `post(apiSlug, jsonBody, headerOptions):Promise<JSON>`
POST operation

* `put(apiSlug, jsonBody, headerOptions):Promise<String>`
PUT operation

* `patch(apiSlug, jsonBody, headerOptions):Promise<BLOB>`
PATCH operation

* `delete(apiSlug, headerOptions):Promise<JSON>`
DELETE operation

###### File Operations

* `upload(apiSlug, formElement, headerOptions):Promise<JSON>`
POST file upload operation

* `reupload(apiSlug, formElement, headerOptions):Promise<String>`
PUT file upload operation

> __NOTE__ File operations use FormData Browser API. For details regarding FormData [read here](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

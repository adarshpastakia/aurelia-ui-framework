# Data-Model and Data-Source

----


## DataModel

1. Add option for URL for CRUD
  * `/api/user` which will be used for following
    * `GET /api/user/:id`
    * `POST /api/user/`
    * `PUT /api/user/:id`
    * `DELETE /api/user/:id`
* All operations will provide `isBusy` indicator
* Add decorator `@ignoreSerialize` to ignore given property from serialization
* Observe all model property keys to update `dirty` and `propDirty` indicators (Need to think about structuring the propDirty)
* Are three model states required? This will be useful when using the model in a DataSource
  * `__original__` maintains the original record
  * `__updated__` maintains updated values that have not been synced via the API
  * `discardChanges()` will revert to the `__updated__` dataset
  * `reset()` will revert to the `__original__` dataset

### Initial Thoughts
```ts
// Since there is no objectObservation need to rely on propertyObserver for updating the dirty indicators
// Update property dirty on propertyObserve callback
init() {
  each(keys, key=>observe(prop, ()=>this.propChange(key)));
}

propChange(key) {
  return ()=>this.checkDirty(
    this.propDirty[key] = this.__original__[key]!==this[key]);
}

discard() {
  each(keys, key=>this[key] = this.__updated__[key]);
}

reset() {
  each(keys, key=>this[key] = this.__updated__[key] = this.__original__[key]);
}
```

---

## Remote DataSource
1. Add option for URL for CRUD
  * `/api/user` which will be used for following
    * `GET /api/users` fetch all models
    * `POST /api/user/`
    * `PUT /api/user/:id`
    * `DELETE /api/user/:id`
    > Do we follow singular calls for all updates and deletes
    > Or do we create a single call with multiple update models
    > eg. DELETE /api/users body=[1,2,3]
* Observe the dirty property of all models to maintain dirty indicator for the store
* Need to have server side sorting, pagination and filter capabilities
  * Filter is important when using stores with lists and auto-complete

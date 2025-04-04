import { Collection } from "../classes/collection.class"

/*
export const collectionActivate = (collection:Collection) => ({
  type : COLLECTION_ACTIVATE,
  payload : {
    collection
  }
})

export const collectionAdd = (collection: Partial<Collection>) => ({
  type : COLLECTION_ADD,
  payload : {
    collection
  }
})

export const collectionEdit = (key:string, value:any) => ({
  type : COLLECTION_EDIT,
  payload : {
    key,
    value
  }
})

export const collectionGet = (collections: Collection[]) => ({
  type : COLLECTION_GET,
  payload : {
    collections
  }
})

export const collectionInit = () => ({
  type : COLLECTION_INIT
})

export const collectionStatus = (status:StatusType) => ({
  type : COLLECTION_STATUS,
  payload : {
    status
  }
})

*/


//API

export const collectionDestroy = (id:string) => ({
  type : "API",
  payload : {
    method : "DELETE",
    url : "/collection/" + id
  }
})

export const collectionCreate = (collection: Collection) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/collection/create",
    data : {
      collection
    }
  }
})

export const collectionFetch = (accountId: string | null, search: string, limit:number, offset: number) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/collections",
    data : {
      accountId,
      search,
      limit,
      offset
    }
  }
})

export const collectionFetchOne = (id: string) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/collection",
    data : {
      id
    }
  }
})

export const collectionUpdate = (collection: Collection) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/collection/update",
    data : {
      collection
    }
  }
})
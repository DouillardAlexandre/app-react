/**
 * Class Collection
 *
 */

 import { StatusType } from "./_status.types"


export class Collection{
  id : string = ""
  name : string = ""
  description : string = ""
  picture : boolean = false
  isDraft: boolean = true
  AccountId : string = ""

  constructor(collection: Partial<Collection> = {}){
    if (!collection) collection = new Collection()
    Object.assign(this, collection)
  }

  get withDraft(): boolean {
    return false
  }

}

export interface CollectionState{
  active : Collection
  list : Collection[]
  status : StatusType
}

export const COLLECTION_ACTIVATE: string = "COLLECTION_ACTIVATE"
export const COLLECTION_ADD: string = "COLLECTION_ADD"
export const COLLECTION_EDIT: string = "COLLECTION_EDIT"
export const COLLECTION_GET: string = "COLLECTION_GET"
export const COLLECTION_INIT: string = "COLLECTION_INIT"
export const COLLECTION_STATUS: string = "COLLECTION_STATUS"
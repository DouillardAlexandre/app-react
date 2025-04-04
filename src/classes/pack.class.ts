/**
 * Class Pack
 *
 */

import { StatusType } from "./_status.types"

export class Pack{
  id : string = ""
  dateOpen : number | null = null
  dateAcquisition : number = 0
  serialNumber : number = 0
  PackTemplateId : string = ""
  nbObtainedVisible : number = 0
  AcquirerId : string = ""
  OpenerId : string | null = null

  /*constructor(pack: Pack){
    Object.assign(this, pack)
  }*/

  constructor(pack: Partial<Pack> = {}){
    if (!pack) pack = new Pack()
    Object.assign(this, pack)
  }

}

export interface PackState{
  active : Pack
  list : Pack[]
  status : StatusType
}

export const PACK_ACTIVATE: string = "PACK_ACTIVATE"
export const PACK_ADD: string = "PACK_ADD"
//export const PACK_EDIT: string = "PACK_EDIT"
export const PACK_GET: string = "PACK_GET"
export const PACK_INIT: string = "PACK_INIT"
export const PACK_STATUS: string = "PACK_STATUS"
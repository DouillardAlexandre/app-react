/**
 * Class PackTemplate
 *
 */

import { StatusType } from "./_status.types"

export type PackType = "BOOSTER" | "BOX"

export class PackTemplate{
  id : string = ""
  name : string = ""
  description : string = ""
  quantityTotal : number | null = null
  quantityAcquirable : number | null = null
  nbToDraft : number = 1
  basePrice : number = 1
  canBeDiscounted : boolean = false
  isDraft: boolean = true
  isSellable : boolean = false
  isExchangeable : boolean = false
  feePercentage : number = 0
  dateAnnouncement : number | null = null
  datePresale : number | null = null
  dateRelease : number = 0
  dateEnd : number | null = null
  CollectionId : string | null = null
  picture : boolean = false
  type : PackType = "BOX"
  nbTotalDrafted: number = 0
  nbTotalAcquired: number = 0
  nbUserDrafted: number = 0
  nbUserAcquired: number = 0

  constructor(packTemplate: Partial<PackTemplate> = {}){
    if (!packTemplate) packTemplate = new PackTemplate()
    Object.assign(this, packTemplate)
  }

  get quantitySold(): number{
    return 0
  }

}

export interface PackTemplateState{
  active : PackTemplate
  list : PackTemplate[]
  status : StatusType
}

export const PACK_TEMPLATE_ACTIVATE: string = "PACK_TEMPLATE_ACTIVATE"
export const PACK_TEMPLATE_ADD: string = "PACK_TEMPLATE_ADD"
export const PACK_TEMPLATE_EDIT: string = "PACK_TEMPLATE_EDIT"
export const PACK_TEMPLATE_GET: string = "PACK_TEMPLATE_GET"
export const PACK_TEMPLATE_INIT: string = "PACK_TEMPLATE_INIT"
export const PACK_TEMPLATE_STATUS: string = "PACK_TEMPLATE_STATUS"
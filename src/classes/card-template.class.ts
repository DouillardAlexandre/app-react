/**
 * Class CardTemplate
 *
 */

import { StatusType } from "./_status.types"

export class CardTemplate{
  id: string = ""
  name: string = ""
  description: string = ""
  quantityTotal: number = 1
  picture: string = ""
  isSecret: boolean = false
  isDraft: boolean = true
  collectionNumber: number = 0
  media: string = ""
  thumbnail: string = ""
  isSellable: boolean = false
  isExchangeable: boolean = false
  feePercentage: number = 0
  PackTemplateId: string = ""
  CollectionId: string | null = null
  AccountId: string = ""
  nbTotalDrafted: number = 0
  nbTotalAcquired: number = 0
  nbUserDrafted: number = 0

  constructor(cardTemplate: Partial<CardTemplate> = {}){
    if (!cardTemplate) cardTemplate = new CardTemplate()
    Object.assign(this, cardTemplate)
  }

  get isError(): boolean{
    return this.media.length < 1
    || this.thumbnail.length < 1
    || this.quantityTotal < 1
  }

  get isWarning(): boolean{
    return this.name.length < 1
    || this.description.length < 1
  }

}

export interface CardTemplateState{
  active : CardTemplate
  list : CardTemplate[]
  status : StatusType
}

export const CARD_TEMPLATE_ACTIVATE: string = "CARD_TEMPLATE_ACTIVATE"
export const CARD_TEMPLATE_ADD: string = "CARD_TEMPLATE_ADD"
export const CARD_TEMPLATE_EDIT: string = "CARD_TEMPLATE_EDIT"
export const CARD_TEMPLATE_GET: string = "CARD_TEMPLATE_GET"
export const CARD_TEMPLATE_INIT: string = "CARD_TEMPLATE_INIT"
export const CARD_TEMPLATE_REPLACE:string = "CARD_TEMPLATE_REPLACE"
export const CARD_TEMPLATE_STATUS: string = "CARD_TEMPLATE_STATUS"
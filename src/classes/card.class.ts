/**
 * Class Card
 *
 */

import { StatusType } from "./_status.types"

export type CardLight = { id: string, qtty: number }

export class Card{
  id : string = ""
  serialNumber : number = 0
  totalNumber : number = 0
  CardTemplateId : string = ""
  PackId : string = ""
  nbObtainedVisible : number = 0
  rank : number = 0

  constructor(card: Partial<Card> = {}){
    if (!card) card = new Card()
    Object.assign(this, card)
  }

}

export interface CardState{
  active : Card
  list : Card[]
  status : StatusType
}

export const CARD_ACTIVATE: string = "CARD_ACTIVATE"
export const CARD_ADD: string = "CARD_ADD"
//export const CARD_EDIT: string = "CARD_EDIT"
export const CARD_GET: string = "CARD_GET"
export const CARD_INIT: string = "CARD_INIT"
export const CARD_STATUS: string = "CARD_STATUS"
/**
 * Class Discount
 *
 */

import { StatusType } from "./_status.types"


export class Discount{
  id: string = ""
  name: string = ""
  description: string = ""
  code: string | null = null
  price: number = 0
  qttyToBuy: number = 0
  limit: number | null = null
  cumulative: boolean = false
  dateStart: number = 1
  dateEnd: number | null = null
  PackTemplateId: string = ""
  AccountId: string = ""

  constructor(discount: Partial<Discount> = {}){
    if (!discount) discount = new Discount()
    Object.assign(this, discount)
  }

}

export interface DiscountState{
  active : Discount
  list : Discount[]
  status : StatusType
}
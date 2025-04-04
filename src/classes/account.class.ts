/**
 * Class Account
 *
 */

import { StatusType } from "./_status.types"

export class Account{
  id: string = ""
  name: string = ""

  constructor(account: Partial<Account> = {}){
    if (!account) account = new Account()
    Object.assign(this, account)
  }

}

export interface AccountState{
  active: Account
  list: Account[]
  status: StatusType
}
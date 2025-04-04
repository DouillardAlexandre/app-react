/**
 * Class Account
 *
 */

import { StatusType } from "./_status.types"

export class Account{
  id : string = ""
  alias : string = ""
  email : string = ""
  firstname : string | null = null
  lastname : string | null = null
  options : AccountOptions = new AccountOptions()
  picture : boolean = false
  adminLevel : number = 0
  dateCreate : number = 0
  dateUpdate : number | null = null

  constructor(account: Partial<Account> = {}){
    if (!account) account = new Account()
    account.options = account.options ? new AccountOptions(account.options) : new AccountOptions()
    Object.assign(this, account)
  }

}

export class AccountOptions{
  constructor(accountOptions: Partial<AccountOptions> = {}){
    Object.assign(this, accountOptions)
  }
}

export interface AccountState{
  active: Account
  list: Account[]
  status: StatusType
}

export const ACCOUNT_ACTIVATE: string = "ACCOUNT_ACTIVATE"
export const ACCOUNT_ADD: string = "ACCOUNT_ADD"
export const ACCOUNT_EDIT: string = "ACCOUNT_EDIT"
export const ACCOUNT_GET: string = "ACCOUNT_GET"
export const ACCOUNT_INIT: string = "ACCOUNT_INIT"
export const ACCOUNT_STATUS: string = "ACCOUNT_STATUS"
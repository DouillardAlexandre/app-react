/**
 * Class Session
 */


import { Account } from "./account.class"

export type themeColor = "dark" | "light"

export class Session{
  User: any | null = null
  Account: Account = new Account()
  language: string = "fr"
  expiration: number = -1

  constructor(_session: Partial<Session> = {}){
    if (!_session) _session = new Session()
    _session.Account = new Account(_session.Account)
    Object.assign(this, _session)
  }
 
}

//SESSION REDUCERS

export const SESSION_EDIT: string = 'SESSION_EDIT'
export const SESSION_INIT: string = 'SESSION_INIT'
export const SESSION_UPDATE: string = 'SESSION_UPDATE'

import { Account } from "../classes/account.class"

//API

export const accountCheckAvailability = (alias:string, email:string) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/account/availability",
    data : {
      alias,
      email
    }
  }
})

export const accountDestroy = (id: string) => ({
  type : "API",
  payload : {
    method : "DELETE",
    url : "/account/" + id
  }
})

export const accountFetch = (search: string, limit:number, offset: number) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/accounts",
    data : {
      search,
      limit,
      offset
    }
  }
})

export const accountFetchOne = (id: string) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/account",
    data : {
      id
    }
  }
})

export const accountUpdate = (account: Account) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/account/update",
    data : {
      account
    }
  }
})
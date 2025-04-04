
//API
export const accountFetchOne = (type: "JAVA" | "NODE", id: string) => ({
  type,
  payload : {
    method : "GET",
    url : "/public/account",
    data : {
      id
    }
  }
})

export const accountFetch = (type: "JAVA" | "NODE", search?: string, limit?: number, offset?: number) => ({
  type,
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
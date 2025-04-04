

//API

export const _authRegister = (alias: string, email: string) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/_auth/register",
    data : {
      alias,
      email
    }
  }
})

export const _authSignin = (login: string) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/_auth/signin",
    data : {
      login
    }
  }
})

export const _authSignout = () => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/_auth/signout"
  }
})

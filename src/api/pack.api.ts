
/*
export const packActivate = (pack:Pack) => ({
  type : PACK_ACTIVATE,
  payload : {
    pack
  }
})

export const packAdd = (pack: Partial<Pack>) => ({
  type : PACK_ADD,
  payload : {
    pack
  }
})

export const packGet = (packs: Pack[]) => ({
  type : PACK_GET,
  payload : {
    packs
  }
})

export const packInit = () => ({
  type : PACK_INIT
})

export const packStatus = (status:StatusType) => ({
  type : PACK_STATUS,
  payload : {
    status
  }
})
*/

//API

export const packAcquire = (packTemplateId: string) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/pack/acquire",
    data : {
      packTemplateId
    }
  }
})

export const packFetch = () => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/pack/get",
  }
})

export const packOpen = (id: string) => ({
  type : "API",
  payload : {
    method : "PUT",
    url: "/pack/open/" + id,
  }
})
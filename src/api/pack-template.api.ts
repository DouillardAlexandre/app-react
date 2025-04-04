import { PackTemplate } from "../classes/pack-template.class"

/*
export const packTemplateActivate = (packTemplate: PackTemplate) => ({
  type : PACK_TEMPLATE_ACTIVATE,
  payload : {
    packTemplate
  }
})

export const packTemplateAdd = (packTemplate: Partial<PackTemplate>) => ({
  type : PACK_TEMPLATE_ADD,
  payload : {
    packTemplate
  }
})

export const packTemplateEdit = (key: string, value: any) => ({
  type : PACK_TEMPLATE_EDIT,
  payload : {
    key,
    value
  }
})

export const packTemplateGet = (packTemplates: PackTemplate[]) => ({
  type : PACK_TEMPLATE_GET,
  payload : {
    packTemplates
  }
})

export const packTemplateInit = () => ({
  type : PACK_TEMPLATE_INIT
})

export const packTemplateStatus = (status: StatusType) => ({
  type : PACK_TEMPLATE_STATUS,
  payload : {
    status
  }
})

*/


//API

export const packTemplateFetchPublic = (collectionId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/pack-templates",
    data : {
      collectionId
    }
  }
})

export const packTemplateFetch = (accountId: string | null, collectionId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/pack-template/get",
    data : {
      accountId,
      collectionId
    }
  }
})

export const packTemplateFetchSelf = (collectionId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/pack-template/get-self",
    data : {
      collectionId
    }
  }
})

export const packTemplateFetchSuper = (packTemplateId: string) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/super/pack-template/get",
    data : {
      packTemplateId
    }
  }
})

export const packTemplateCreate = (packTemplate: PackTemplate) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/pack-template/create",
    data : {
      packTemplate
    }
  }
})

export const packTemplateCreateMultiple = (packTemplates: PackTemplate[]) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/pack-template/create-multiple",
    data : {
      packTemplates
    }
  }
})

export const packTemplateUpdate = (packTemplate: PackTemplate) => ({
  type : "API",
  payload : {
    method : "PUT",
    url : "/pack-template/update",
    data : {
      packTemplate
    }
  }
})
import { CardTemplate } from "../classes/card-template.class"

/*
export const cardTemplateActivate = (cardTemplate: CardTemplate) => ({
  type : CARD_TEMPLATE_ACTIVATE,
  payload : {
    cardTemplate
  }
})

export const cardTemplateAdd = (cardTemplate: Partial<CardTemplate>) => ({
  type : CARD_TEMPLATE_ADD,
  payload : {
    cardTemplate
  }
})

export const cardTemplateEdit = (key:string, value:any) => ({
  type : CARD_TEMPLATE_EDIT,
  payload : {
    key,
    value
  }
})

export const cardTemplateGet = (cardTemplates: CardTemplate[]) => ({
  type : CARD_TEMPLATE_GET,
  payload : {
    cardTemplates
  }
})

export const cardTemplateInit = () => ({
  type : CARD_TEMPLATE_INIT
})

export const cardTemplateReplace = (cardTemplate: CardTemplate) => ({
  type : CARD_TEMPLATE_REPLACE,
  payload : {
    cardTemplate
  }
})

export const cardTemplateStatus = (status:StatusType) => ({
  type : CARD_TEMPLATE_STATUS,
  payload : {
    status
  }
})

*/


//API

export const cardTemplateFetchPublic = (collectionId: string | null, packTemplateId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/public/card-templates",
    data : {
      collectionId,
      packTemplateId
    }
  }
})

export const cardTemplateFetch = (accountId: string | null, collectionId: string | null, packTemplateId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/card-template/get",
    data : {
      accountId,
      collectionId,
      packTemplateId
    }
  }
})

export const cardTemplateFetchSelf = (collectionId: string | null, packTemplateId: string | null) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/card-template/get-self",
    data : {
      collectionId,
      packTemplateId
    }
  }
})

export const cardTemplateFetchSuper = (packTemplateId: string) => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/super/card-template/get",
    data : {
      packTemplateId
    }
  }
})

export const cardTemplateCreate = (cardTemplate: CardTemplate) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/card-template/create",
    data : {
      cardTemplate
    }
  }
})

export const cardTemplateCreateMultiple = (cardTemplates: CardTemplate[]) => ({
  type : "API",
  payload : {
    method : "POST",
    url : "/card-template/create-multiple",
    data : {
      cardTemplates
    }
  }
})

export const cardTemplateUpdate = (cardTemplate: CardTemplate) => ({
  type : "API",
  payload : {
    method : "PUT",
    url : "/card-template/update",
    data : {
      cardTemplate
    }
  }
})
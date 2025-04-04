
/*
export const cardActivate = (card: Card) => ({
  type : CARD_ACTIVATE,
  payload : {
    card
  }
})

export const cardAdd = (card: Partial<Card>) => ({
  type : CARD_ADD,
  payload : {
    card
  }
})

export const cardGet = (cards: Card[]) => ({
  type : CARD_GET,
  payload : {
    cards
  }
})

export const cardInit = () => ({
  type : CARD_INIT
})

export const cardStatus = (status: StatusType) => ({
  type : CARD_STATUS,
  payload : {
    status
  }
})

*/

/** API **/

export const cardFetch = () => ({
  type : "API",
  payload : {
    method : "GET",
    url : "/card/get"
  }
})

export const cardGetMediaLink = (id: string) => ({
  type: "API",
  payload : {
    method: "GET",
    url: "/card/get-link",
    data : {
      id
    }
  }
})



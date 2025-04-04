/**
 * PROBABILITY-UTILS
 * 
 */

export {
  getProbability
}

import { sum } from "lodash"
import { CardLight } from "@/classes/card.class"


//full function
function getProbability(cards: CardLight[], nbToDraft: number, cardsIWantToObtain: CardLight[]): number{
  const totalQtty: number = sum(cards.map((x: CardLight)=>x.qtty))
  const combinations: CardLight[][] = cardsIWantToObtain.length < nbToDraft ? 
  getCombinations(cards.filter((x: CardLight)=>cardsIWantToObtain.map((y:CardLight)=>y.id).indexOf(x.id) === -1), nbToDraft-cardsIWantToObtain.length).map((x: CardLight[])=>cardsIWantToObtain.concat(x)) : [cardsIWantToObtain]
  return sum(combinations.map((x: CardLight[])=>
    sum(getPermutations(x).map((y: CardLight[])=>
      getProbabilityOrder(totalQtty, y.map((z: CardLight)=>z.qtty))
    ))
  ))
}

//combination function using dfs (depth-first search) algorithm
function getCombinations(items: CardLight[], nbToDraft: number): CardLight[][] {
  if(nbToDraft > items.length) return [];
  const result: CardLight[][] = [];
  const current: CardLight[] = [];
  const dfs = (start: number) => {
    if (current.length === nbToDraft) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      dfs(i + 1);
      current.pop();
    }
  }
  dfs(0);
  return result;
}

//permutation function using dfs (depth-first search) algorithm
function getPermutations(items: CardLight[]): CardLight[][] {
  const result: CardLight[][] = [];
  const current: CardLight[] = [];
  const visited = new Set<CardLight>();
  const dfs = (start: number) => {
    if (current.length === items.length) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      if (visited.has(items[i])) continue;
      visited.add(items[i]);
      current.push(items[i]);
      dfs(i + 1);
      visited.delete(items[i]);
      current.pop();
    }
  }
  dfs(0);
  return result;
}

//returns the probabilty to get the exact combination cards in the correct order
function getProbabilityOrder(totalQtty: number, coefs: number[]): number{
  let denom: number = totalQtty
  let total: number = 1

  for(let i = 0; i < coefs.length; i++){
    if(i > 0){
      denom -= coefs[i-1]
    }
    total *= denom
  }

  return coefs.reduce((accumulator: number, currentValue: number) => accumulator * currentValue, 1) / total
}
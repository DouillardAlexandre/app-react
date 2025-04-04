/**
 *
 * CARD-PLAYGROUND.WIDGET
 * Editing cards order in a collection
 *
 */

import React, { useState } from "react"
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import CardTemplateDisplayer from "@/components/card-template-displayer"
import { CardTemplate } from "@/classes/card-template.class"

const ITEMS_PER_ROW: number = 10
const ROW_HEIGHT: number = 120

function CardPlayground2Widget() {

  /*
  const [items, setItems] = useState<CardTemplate[]>([
    new CardTemplate({id: "01", name: "card_01"}),
    new CardTemplate({id: "02", name: "card_02"}),
    new CardTemplate({id: "03", name: "card_03"}),
    new CardTemplate({id: "04", name: "card_04"}),
    new CardTemplate({id: "05", name: "card_05"}),
    new CardTemplate({id: "06", name: "card_06"}),
    new CardTemplate({id: "07", name: "card_07"}),
    new CardTemplate({id: "08", name: "card_08"}),
    new CardTemplate({id: "09", name: "card_09"}),
    new CardTemplate({id: "10", name: "card_10"}),
    new CardTemplate({id: "11", name: "card_11"}),
    new CardTemplate({id: "12", name: "card_12"}),
    new CardTemplate({id: "13", name: "card_13"}),
    new CardTemplate({id: "14", name: "card_14"}),
    new CardTemplate({id: "15", name: "card_15"}),
    new CardTemplate({id: "16", name: "card_16"}),
    new CardTemplate({id: "17", name: "card_17"}),
    new CardTemplate({id: "18", name: "card_18"}),
    new CardTemplate({id: "19", name: "card_19"}),
    new CardTemplate({id: "20", name: "card_20"}),
    new CardTemplate({id: "21", name: "card_21"}),
    new CardTemplate({id: "22", name: "card_22"})
  ]); // supply your own state
  */

  const [items, setItems] = useState<any>({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
      { id: 6, name: "Richard" },
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      { id: 11, name: "pam" },
      { id: 12, name: "katie" },
      { id: 13, name: "george" },
      { id: 14, name: "rupert" },
      { id: 15, name: "alice" },
      { id: 16, name: "katherine" },
      { id: 17, name: "pam" },
      { id: 18, name: "katie" },
      { id: 19, name: "pam" },
      { id: 20, name: "katie" }
    ],
    right: [
      { id: 21, name: "ben" },
      { id: 22, name: "joe" },
      { id: 23, name: "jason" },
      { id: 24, name: "chris" },
      { id: 25, name: "heather" },
      { id: 26, name: "Richard" },
      { id: 27, name: "george" },
      { id: 28, name: "rupert" },
      { id: 29, name: "alice" },
      { id: 30, name: "katherine" },
      { id: 31, name: "pam" },
      { id: 32, name: "katie" },
      { id: 33, name: "george" },
      { id: 34, name: "rupert" },
      { id: 35, name: "alice" },
      { id: 36, name: "katherine" },
      { id: 37, name: "pam" },
      { id: 38, name: "katie" },
      { id: 39, name: "pam" },
      { id: 40, name: "katie" }
    ]
  });
 
  // target id will only be set if dragging from one dropzone to another.
  function onChange(sourceId: any, sourceIndex: any, targetIndex: any, targetId: any) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div
        className="flex flex-dcol"
        style={{ touchAction: "none", height: 800, width: 900 }}
      >
        <GridDropZone
          className="flex1"
          id="left"
          boxesPerRow={ITEMS_PER_ROW}
          rowHeight={ROW_HEIGHT}
          style={{height: Math.ceil(items.left.length / ITEMS_PER_ROW) * ROW_HEIGHT}}
        >
          {items.left.map((item: {id: string, name: string}) => (
          <GridItem key={item.id}>
            {
              <CardTemplateDisplayer
                cardTemplate={new CardTemplate(item)}              
                isMini
              />
            /*
            <div className="grid-item">
              <div className="grid-item-content">
                {item.name[0].toUpperCase()}
              </div>
            </div>
            */
            }
          </GridItem>
          ))}
        </GridDropZone>

        <GridDropZone
          className="flex1"
          id="right"
          boxesPerRow={ITEMS_PER_ROW}
          rowHeight={ROW_HEIGHT}
          style={{height: Math.ceil(items.left.length / ITEMS_PER_ROW) * ROW_HEIGHT}}
        >
          {items.right.map((item: {id: string, name: string}) => (
          <GridItem key={item.id}>
            {
              <CardTemplateDisplayer
                cardTemplate={new CardTemplate(item)}
                isMini              
              />
            /*
            <div className="grid-item">
              <div className="grid-item-content">
                {item.name[0].toUpperCase()}
              </div>
            </div>
            */
            }
          </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  )
}

export default CardPlayground2Widget

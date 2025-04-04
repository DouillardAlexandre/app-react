/**
 *
 * CARD-PLAYGROUND.WIDGET
 * Editing cards order in a collection
 *
 */

import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import DroppableElement from "@/components/droppable-element"
import DraggableElement from "@/components/draggable-element"
import CardTemplateDisplayer from "@/components/card-template-displayer"
import { CardTemplate } from "@/classes/card-template.class"

/***** TEMP ******/

const initialData: any = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Cook dinner" },
    "task-6": { id: "task-6", content: "Cook dinner" },
    "task-7": { id: "task-7", content: "Cook dinner" },
    "task-8": { id: "task-8", content: "Cook dinner" },
    "task-9": { id: "task-9", content: "Cook dinner" },
    "task-10": { id: "task-10", content: "Cook dinner" },
    "task-11": { id: "task-11", content: "Cook dinner" },
    "task-12": { id: "task-12", content: "Cook dinner" },
    "task-13": { id: "task-13", content: "Cook dinner" },
    "task-14": { id: "task-14", content: "Cook dinner" },
    "task-15": { id: "task-15", content: "Cook dinner" },
    "task-16": { id: "task-16", content: "Cook dinner" },
    "task-17": { id: "task-17", content: "Cook dinner" },
    "task-18": { id: "task-18", content: "Cook dinner" },
    "task-19": { id: "task-19", content: "Cook dinner" },
    "task-20": { id: "task-20", content: "Cook dinner" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
        "task-9",
        "task-10",
        "task-11",
        "task-12",
        "task-13",
        "task-14",
        "task-15",
        "task-16",
        "task-17",
        "task-18",
        "task-19",
        "task-20",
      ]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
}

/***** END OF TEMP ******/

function CardPlaygroundWidget() {
  const { tasks, columnOrder } = initialData

  //const [tasks, setTasks] = useState<any>(initialData.tasks)

  const [columns, setColumns] = useState<any>(initialData.columns)

  //const [columnOrder, setColumnOrder] = useState<string[]>(initialData.columnOrder)

  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const [sourceIndex, setSourceIndex] = useState<number>(-1)

  const [destinationIndex, setDestinationIndex] = useState<number>(-1)

  function onBeforeDragStart(element: any) {
    setSourceIndex(element.source.index)
    setDestinationIndex(element.source.index)
  }

  function onDragStart(element: any) {
    if (activeItemId !== element.draggableId) {
      setActiveItemId(element.draggableId)
    }
  }

  function onDragUpdate(update: any) {
    if(update.destination){
      setDestinationIndex(update.destination.index)
    }
  }

  function onDragEnd(result: any) {
    setSourceIndex(-1)
    setDestinationIndex(-1)

    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    if (start === finish) {
      //const column = columns[source.droppableId];
      //const newTaskIds = Array.from(column.taskIds);

      const newTaskIds = Array.from(start.taskIds)

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn
      })

      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    })
  }

  function getFutureOrder(index: number): number | undefined{
    if(index === sourceIndex){
      return destinationIndex + 1
    }
    else if(index > sourceIndex && index <= destinationIndex){
      return index
    }
    else if(index < sourceIndex && index >= destinationIndex){
      return index + 2
    }
    else{
      return undefined
    }

  }

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      
      <div>
        {columnOrder.map((columnId: string) => {
          const column: any = columns[columnId]
          return (
            <DroppableElement
              key={columnId}
              id={columnId}
              direction="horizontal"
            >

              <h3>{"Move elements here " + columnId}</h3>

              <div
                className="flex flex-wrap"
                style={{overflowY: "auto"}}
              >
                {column.taskIds.map((taskId: string, index: number) => {
                  const item: { id: string; content: string } = tasks[taskId]
                  return (
                    <DraggableElement
                      key={taskId}
                      id={taskId}
                      index={index}
                    >
                      <div
                        style={{
                          margin: 4,
                          //borderRadius: 8,
                          //boxShadow: activeItemId === taskId ? "0px 0px 4px 4px blue" : undefined
                        }}
                        //onClick={() => setActiveItemId(taskId)}
                      >
                        <CardTemplateDisplayer
                          isActive={activeItemId === taskId}
                          isMini
                          futureIndex={getFutureOrder(index)}
                          cardTemplate={
                            new CardTemplate({
                              name: `task : ${item ? item.content : "not found"}`,
                              collectionNumber: index + 1
                            })
                          }
                          //onClick={() => setActiveItemId(taskId)}
                        />
                      </div>
                    </DraggableElement>
                  )}
                )}
              </div>
            </DroppableElement>
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default CardPlaygroundWidget

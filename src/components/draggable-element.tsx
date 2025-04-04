import { Draggable } from "react-beautiful-dnd"

interface OwnProps {
  id: string
  index: number
  children?: any
}

type Props = OwnProps

function DraggableElement(props: Props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided: any, snapshot: any) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
            borderRadius: 8,
            backgroundColor: snapshot.isDragging
              ? "lightgreen"
              : undefined
          }}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableElement

import { useEffect, useState } from "react"
import { Direction, Droppable } from "react-beautiful-dnd"

interface OwnProps {
  id: string
  children?: any
  direction?: Direction
}

type Props = OwnProps

function DroppableElement(props: Props) {
  /** To keep using beautiful-dnd without removing React.StrictMode **/
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }
  /** */

  return (
    <Droppable
      droppableId={props.id}
      direction={props.direction}
    >
      {(provided: any, snapshot: any) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            ...provided.droppableProps.style,
            border: "1px solid blue",
            borderRadius: 8,
            padding: 4,
            backgroundColor: snapshot.isDraggingOver
              ? "skyblue"
              : undefined
          }}
        >
          {props.children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DroppableElement

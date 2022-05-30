import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter
} from "@thisbeyond/solid-dnd";
import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

const Sortable = (props) => {
  const sortable = createSortable(props.item.toDoId + 1, props.item);
  return (
    <div
      use:sortable
      class="sortable"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      {props.item.description}
    </div>
  );
};

export const SortableTest = (props) => {
  const [items, setItems] = createStore([
    {
      toDoId: 0,
      description: "Lorem Ipsum4"
    },
    {
      toDoId: 1,
      description: "Lorem Ipsum12"
    },
    {
      toDoId: 2,
      description: "Lorem Ipsum1"
    },
    {
      toDoId: 3,
      description: "Lorem Ipsum20"
    }
  ]);
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => items.map((item) => item.toDoId + 1);

  const onDragStart = ({ draggable }) => setActiveItem(draggable.toDoId);

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = [...items];
      console.log(currentItems, draggable.id, droppable.id);
      const fromIndex = currentItems.findIndex(
        (item) => item.toDoId === draggable.id
      );
      const toIndex = currentItems.findIndex(
        (item) => item.toDoId === droppable.id
      );
      console.log(fromIndex, toIndex);
      if (fromIndex !== toIndex) {
        console.log("In changer");
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        console.log(updatedItems);
        setItems(updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <SortableProvider ids={ids()}>
        <For each={items}>{(item) => <Sortable item={item} />}</For>
      </SortableProvider>
      <DragOverlay>
        <div class="sortable">{activeItem()}</div>
      </DragOverlay>
    </DragDropProvider>
  );
};
export default SortableTest;

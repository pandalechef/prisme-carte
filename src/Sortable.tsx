import React from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }: { value: string }) => (
  <li>{value}</li>
));

const SortableList = SortableContainer(({ items }: { items: string[] }) => {
  return (
    <ol>
      {items.map((value: string, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ol>
  );
});

export default class SortableComponent extends React.Component {
  public state = {
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]
  };
  public onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };
  public render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

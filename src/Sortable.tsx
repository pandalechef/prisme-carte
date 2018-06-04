import React from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }: { value: IPdvInterface }) => (
  <li>{value.enseigne}</li>
));

const SortableList = SortableContainer(
  ({ items }: { items: IPdvInterface[] }) => {
    return (
      <ol>
        {items.map((value: IPdvInterface, index: number) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ol>
    );
  }
);

interface IPdvInterface {
  adresse: string;
  enseigne: string;
  lat: number;
  lng: number;
}
interface IPdvsInterface {
  pdvs: IPdvInterface[];
  onMove: (pdvs: IPdvInterface[]) => void;
}

// tslint:disable-next-line:no-empty-interface
interface IState {}
export default class SortableComponent extends React.Component<
  IPdvsInterface,
  IState
> {
  public onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newItems = arrayMove(this.props.pdvs, oldIndex, newIndex);
    this.props.onMove(newItems);
    this.setState({
      items: newItems
    });
  };
  public render() {
    return <SortableList items={this.props.pdvs} onSortEnd={this.onSortEnd} />;
  }
}

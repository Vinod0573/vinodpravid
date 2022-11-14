import React, { PureComponent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dndbtn from "../../../theme/assets/svg/campaign/dndbutton.svg";

class DndComponent extends React.Component {
  //  startingList = this.props.startingList
  constructor(props) {
    super(props);
    this.state = { items: this.props?.startingList };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startingList !== this.props.startingList) {
      this.setState({ items: this.props.startingList });
    }
  }

  onDragEnd = (e) => {
    if (!e.destination) {
      return;
    }
    const { items } = this.state;
    const sorted = this.reorder(items, e.source.index, e.destination.index);
    this.setState({
      items: sorted,
    });
    this.props.sendOrder(sorted);
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  render() {
    return (
      // <DragDropContext onDragEnd={this.onDragEnd}>
      //   {this.state.items?.map((item, index) => (
      //     <Droppable
      //       droppableId={`Table ${item.condition}`}
      //       key={item.condition}
      //       index={index}
      //     >
      //       {(provided, snapshot) => (
      //         <>
      //           {/* <tbody> */}

      //           <tr
      //             {...provided.droppableProps}
      //             ref={provided.innerRef}
      //             // style={{display:"contents"}}
      //           >
      //             <Draggable
      //               key={item.condition}
      //               draggableId={item.condition}
      //               index={index}
      //             >
      //               {(provided) => (
      //                 <>
      //                   <td>{index + 1}</td>
      //                   {Object.values(item).map((each, i) => {
      //                     if (i != 1) {
      //                       return <td>{each}</td>;
      //                     } else {
      //                       return "";
      //                     }
      //                   })}
      //                   <td
      //                     ref={provided.innerRef}
      //                     {...provided.draggableProps}
      //                     {...provided.dragHandleProps}
      //                     isDragging={snapshot.isDragging}
      //                   >
      //                     <img src={dndbtn} />
      //                   </td>
      //                   {/* <td>{index +1}</td>
      //                       <td>{item.condition}</td>
      //                       <td>{item.component}</td>
      //                       <td>{item.selectComponent}</td>
      //                       <td><img src={dndbtn}/></td> */}
      //                 </>
      //               )}
      //             </Draggable>
      //           </tr>

      //           {provided.placeholder}
      //           {/* </tbody> */}
      //         </>
      //       )}
      //     </Droppable>
      //   ))}
      // </DragDropContext>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="table-body"
          className={"retry-time-setion"}
          // isDropDisabled={true}
        >
          {(provided, snapshot) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.items?.map((row, i) => {
                console.log(row,"data")
                return (  <Draggable
                    draggableId={row.condition}
                    key={i}
                    index={i}
                    // isDragDisabled={row.condition=="Due Date"?true:false}
                  >
                    {(provided, snapshot) => {
                      return (
                        <tr
                          {...provided.draggableProps}
                          // {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          isDragging={snapshot?.isDragging}
                        >
                          {/* <td
                               {...provided.draggableProps}
                               isDragging={snapshot.isDragging}
                              >
                                {row.condition}
                              </td> */}
                          <td>{i + 1}</td>
                          {Object.values(row).map((each, i) => {
                            if (i != 1) {
                              return <td key={i}>{each}</td>;
                            } else {
                              return "";
                            }
                          })}
                          <td
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot?.isDragging}
                          >
                            <img src={dndbtn} />
                          </td>
                        </tr>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {/* <tr>
                <td
                  style={{ backgroundColor: "darkblue" }}
                  // colSpan={columns.length}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    IOIO
                  </div>
                </td>
              </tr> */}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DndComponent;

import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import DropIcon from "../../../../../theme/assets/svg/campaign/multiLevelIcon.svg";
import "./MultiLevel.css";

function MultiLevel(props) {
  const [sel, setSel] = useState(false);
  const [checkedArr, setCheckedArr] = useState();

  const ref = useRef();
  const getChangedDetails = (data) => {
    let Fldata = data?.map((each) => {
      return {
        name: each.flow,
        children: each.flows?.map((er) => {
          return { name: er };
        }),
      };
    });
    return Fldata;
  };
  function showDropdown(e) {
    if (ref.current) {
      ref.current.toggle(e);
    }
  }

  let formattedData = getChangedDetails(props.mapData);
  const menus = [
    {
      name:
        props.selectedParentChild?.length > 0
          ? props.selectedParentChild
          : "Select Flow",
      children: formattedData,
    },
  ];

  useEffect(() => {
    if (props.selectedSubChild) {
      let makeAllChecked = props.selectedSubChild
        ?.filter((data) => data?.["Post-Due"])
        ?.map((e) => e?.post);
      makeAllChecked = makeAllChecked[0];
      setCheckedArr((prev) => makeAllChecked);
    }
  }, [props.selectedSubChild]);

  useEffect(() => {
    if (props.parent?.includes("Post-Due")) {
      setSel(true);
    } else {
      setSel(false);
    }
  }, [props.parent]);

  return (
    <div className="multi-level-dropdown">
      {menus.map((menu) => (
        <Dropdown
          wrapperClassName={"mld__dropdown__wrapper"}
          buttonClassName={"mld__dd__button mld__dd__button__secondary"}
          ref={ref}
          title={
            typeof menu.name !== "object"
              ? menu.name
              : menu.name?.map((e) => {
                  return (
                    <div className="placeholderDiv">
                      {" "}
                      {e}
                      {props.child?.length && e === "Post-Due" ? (
                        <span style={{ fontSize: "8px" }}>
                          {" "}
                          ({props.child[0]}{" "}
                          {props.child?.length > 1 ? "..." : ""})
                        </span>
                      ) : (
                        ""
                      )}{" "}
                    </div>
                  );
                })
          }
          menuClassName="text-14 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black mld__menuClass"
        >
          {menu.children &&
            menu.children.map((item) => (
              <Dropdown.Item
                className={`${props.parent == item.name ? "activeDrop" : ""} ${
                  props.parent?.includes(item.name) ? "colorItem" : ""
                }`}
              >
                <span
                  style={{ width: "100%" }}
                  id={"flowId"}
                  onClick={(e) => {
                    return props.selectedData(item.name, e);
                  }}
                >
                  <input
                    type="checkBox"
                    className="checkBox"
                    checked={props.parent?.includes(item.name)}
                    // onChange={(e) => {
                    //   return props.selectedData(item.name, e);
                    // }}
                  ></input>{" "}
                  {item.name}
                </span>
                {item.name === "Post-Due" && (
                  <img
                    src={DropIcon}
                    className="arrowMultiDropdown"
                    alt="Img"
                  ></img>
                )}
                {item.children && (
                  <Dropdown.Submenu position="right">
                    {item.children &&
                      // sel &&
                      item.children.map((submenu) => (
                        <Dropdown.Item
                          className={`${
                            props.child == submenu.name ? "activeDrop" : ""
                          }`}
                          // onClick={(e) => {
                          //   props.selctChildData( submenu.name, e);
                          // }}
                        >
                          <span
                            style={{ width: "100%" }}
                            onClick={(e) => {
                              props.selctChildData(submenu.name, e);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="checkBox"
                              checked={
                                props.child?.includes(submenu.name)
                                  ? true
                                  : false
                              }
                              // onChange={(e) => {
                              //   props.selctChildData(submenu.name, e);
                              // }}
                            ></input>
                            {submenu.name}
                          </span>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Submenu>
                )}
              </Dropdown.Item>
            ))}
        </Dropdown>
      ))}
      <img src={props.icon} alt="pic" onClick={showDropdown} />
    </div>
  );
}

export default MultiLevel;

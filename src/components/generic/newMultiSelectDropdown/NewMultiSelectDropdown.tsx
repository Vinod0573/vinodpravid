import React, { useEffect, useRef } from "react";
import styles from "./NewMultiSelectDropdown.module.scss";
import { props } from "./types";
import { useState } from "react";
// import { dropdownDownArrow } from "../../../theme/assets/svg";
// import { crossblue, tickblue } from "../../../theme/assets/svg/rightSideIcon";
import PravidIcons from "../icon/PravidIcons";
export default function NewMultiSelectDropdown(props: props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<any>();
  useEffect(() => {
    setSelected([...props.selected]);
  }, [props.selected]);
  function toggleAllSelected() {
    if (selected.length === props.data.length) {
      setSelected([]);
    } else {
      setSelected([...props.data]);
    }
  }
  function handleClickOutside(event: any) {
    // console.log("clicked");
    if (ref.current !== null) {
      if (!ref.current?.contains(event.target)) {
        setShowDropdown(false);
        setSelected([...props.selected]);
      }
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={ref} className={styles.wrapper}>
        <div
          className={styles.title}
          onClick={() => {
            setShowDropdown((prev) => !prev);
            setSelected([...props.selected]);
          }}
        >
          <span> {props.title}</span>
          <PravidIcons activeIcon={"dropdownDownArrow"} />
        </div>
        {showDropdown && (
          <div className={styles.dropdown}>
            <div
              className={styles.selectAll}
              data-selected={selected?.length === props.data.length}
              onClick={toggleAllSelected}
            >
              {" "}
              <input
                type="checkbox"
                checked={selected?.length === props.data.length}
                readOnly
              ></input>
              Select All
            </div>
            <div className={styles.dropdownOptions}>
              {props.data.map((e: string, index: number) => {
                return (
                  <div
                    data-selected={selected?.includes(e)}
                    className={styles.each}
                    onClick={() =>
                      setSelected((prev) => {
                        if (prev.includes(e)) {
                          return prev.filter((eachItem) => eachItem !== e);
                        }

                        return [...prev, e];
                      })
                    }
                    key={index}
                  >
                    <input
                      type={"checkbox"}
                      checked={selected?.includes(e)}
                      readOnly
                    ></input>
                    {e}
                  </div>
                );
              })}
            </div>
            <div className={styles.submit}>
              <span
                className={styles.img}
                onClick={() => {
                  setSelected(props.selected);
                  setShowDropdown(false);
                }}
              >
                <PravidIcons
                  activeIcon={"crossblue"}
                  extraClass={styles.cancle}
                />
              </span>
              <span
                className={styles.img}
                onClick={() => {
                  props.handleSubmit(selected);
                  setShowDropdown(false);
                }}
              >
                <PravidIcons activeIcon={"tickblue"} extraClass={styles.ok} />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

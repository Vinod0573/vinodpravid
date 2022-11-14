import React, { useEffect, useState } from "react";

import styles from "./SingleDropdown.module.scss";

import { props } from "./types";
import { dropdownDownArrow } from "../../../theme/assets/svg";
import { searchIcon } from "../../../theme/assets/svg";
import SearchInputBox from "../searchInputBox/SearchInputBox";
/**
 *  use this for single dropdown element
 *
 *
 */
export default function SingleDropdown(props: props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const [filteredData, setFilteredData] = useState<any>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);
  useEffect(() => {
    if (selected.name !== "") {
      setTitle(selected.name);
      props.handleChange(selected.name, selected.id);
    } else {
      setTitle(props.title);
    }
  }, [selected]);

  // clear the filter
  useEffect(() => {
    if (!showDropdown) {
      setFilteredData(props.data);
    }
  }, [showDropdown]);
  function filterSearch(searchText: any) {
    const filter_data_temp = props.data.filter((e) => {
      return e.name
        .toLowerCase()
        .includes(searchText.target.value.toLowerCase());
    });
    setFilteredData(filter_data_temp);
  }
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.dropBox}
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
      >
        {title} <img src={dropdownDownArrow} alt="" />
      </div>
      {showDropdown ? (
        <div className={styles.dropdown}>
          <SearchInputBox
            searchIcon={searchIcon}
            placeholder="search"
            onChange={filterSearch}
          ></SearchInputBox>
          <div className={styles.dropdownData}>
            {filteredData.map((each: any, index: any) => {
              return (
                <div
                  key={index}
                  data-selected={selected.name === each.name}
                  className={styles.eachDropdown}
                  onClick={() => {
                    setSelected((prev) => {
                      return { name: each.name, id: each.id };
                    });
                    setShowDropdown(false);
                  }}
                >
                  {each.name}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

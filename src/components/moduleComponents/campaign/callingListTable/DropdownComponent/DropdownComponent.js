import React, { useState, useEffect, useRef } from "react";
import "./DropdownComponent.css";
import Checkbox from "../../../../generic/checkbox/Checkbox";
import searchIcon from "../../../../../theme/assets/svg/generic/searchIcon.svg";
import DropdownIcon from "../../../../../theme/assets/svg/generic/dropdownIcon.svg";
import { useSelector } from "react-redux";
import MaxAttempt from "../../../../moduleComponents/campaign/schedulerAllComponent/attempModal/MaxAttempt";
import arrow from "../../../../../theme/assets/svg/campaign/filterArrow.svg";
import arrowHover from "../../../../../theme/assets/svg/campaign/filterhoverArrow.svg";

const DropdownComponent = (props) => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [toBeFilterData, setToBeFilterData] = useState([]);
  const [toRealfilterData, setToRealFilterData] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [searchData, setSearchData] = useState();
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [maxAttempt, setmaxAttempt] = useState();
  const [flowData, setFlowData] = useState([]);
  const [selectedLangData, setSelectedLangData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState([]);
  const [selectedDispositionData, setSelectedDispositionData] = useState([]);
  const [selectedMainData, setSelectedMainData] = useState([]);
  const [imgArrow, setImgArrow] = useState();

  const ref = useRef();

  const { imgSrcLeft, placeHolderText, imgSrcRight } = props.options;
  useEffect(() => {
    props.getFilteredData(["abhishek"]);
  }, []);

  const filterByData = useSelector((store) => {
    return store.filterReducer.filterByCallingListData;
  });

  const callingFilterListData = useSelector((store) => {
    return store.filterReducer.callingFilterList;
  });

  useEffect(() => {
    if (props.toBeFilterData && props.toBeFilterData?.length > 0) {
      setToBeFilterData((prev) => props.toBeFilterData);
      setToRealFilterData((prev) => props.toBeFilterData);
    }
  }, [props.toBeFilterData]);

  useEffect(() => {
    setIsSelectAll((prev) => isSelectAll);
  }, [isSelectAll]);

  useEffect(() => {
    setIsDropdownShow((prev) => props.toShowListOut);
  }, [props.toShowListOut]);

  useEffect(() => {
    if (selectedData?.length > 0) {
      if (selectedData?.length === toBeFilterData?.length) {
        //alert('jai');
        setIsSelectAll((prev) => true);
      } else {
        setIsSelectAll((prev) => false);
      }
    }
  }, [selectedData, toBeFilterData]);

  // useDidMountEffect(() => {
  //         if(selectedData?.length >0) {
  //         if(selectedData?.length === toBeFilterData?.length){
  //             //alert('jai');
  //             setIsSelectAll(prev => true);

  //         }
  //         else{
  //             setIsSelectAll(prev => false);
  //         }
  //     }
  //     })

  useEffect(() => {
    if (props.selectedDataOutside?.length > 0) {
      if (props.selectedDataOutside?.length != toBeFilterData?.length) {
        setIsSelectAll((prev) => false);
      }
      setSelectedData((prev) => props.selectedDataOutside);
    } else {
      setIsSelectAll(false);
      setSelectedData((prev) => []);
    }
  }, [props.selectedDataOutside, toBeFilterData]);

  // useEffect(() => {
  //     setSelectedData(prev =>  selectedData);
  // },[selectedData])

  // To select all checkbox
  const getIsAllChecked = (e) => {
    let checked = e;

    if (checked === false) {
      setIsSelectAll(false);
      setSelectedData((prev) => []);
    } else {
      setSelectedData((prev) => toBeFilterData);
      setIsSelectAll(checked);
    }
  };

  // To select single checkbox
  const getChecked = (e, data, index) => {
    // if(props.isHideAllCheckbox){
    //     if (selectedData?.includes(data)) {
    //         let tempArr = [];
    //         // const indexr = tempArr.indexOf(data);
    //         // if (indexr > -1) {
    //         //     tempArr.splice(indexr, 1);
    //         // }
    //         setSelectedData(prevState => {
    //             return [...tempArr]
    //         })
    //           props.getFilteredData([...tempArr])
    //     } else {
    //         let tempArr = [];
    //         tempArr.push(data);
    //         setSelectedData(prevState => {
    //             return [...tempArr]
    //         })
    //         props.getFilteredData([...tempArr])
    //     }
    // }
    // else{
    if (selectedData?.includes(data)) {
      let tempArr = [...selectedData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
        if (data == "Flow") {
          setFlowData((prev) => []);
        }
        if (data == "Language") {
          setSelectedLangData((prev) => []);
        }
        if (data == "Connection Status") {
          setConnectionStatus((prev) => []);
        }
        if (data == "Disposition") {
          setSelectedDispositionData((prev) => []);
        }
        if (data == "No. of Attempts") {
          setmaxAttempt();
        }
      }
      setSelectedData((prevState) => {
        return [...tempArr];
      });
      props.getFilteredData([...tempArr]);
    } else {
      if (data == "Flow") {
        let data = Object.values(callingFilterListData.flowType)?.map(
          (each) => {
            return each;
          }
        );
        setFlowData((prev) => data);
      }
      if (data == "Language") {
        let lang = Object.values(callingFilterListData.language)?.map(
          (each) => {
            return each;
          }
        );

        setSelectedLangData((prev) => lang);
      }
      if (data == "Connection Status") {
        let connection = Object.values(
          callingFilterListData.connectionStatus
        ).map((each, i) => {
          return each;
        });
        setConnectionStatus((prev) => connection);
      }
      if (data == "Disposition") {
        let disposition = Object.values(callingFilterListData.disposition)?.map(
          (each, i) => {
            return each;
          }
        );
        setSelectedDispositionData((prev) => disposition);
      }
      setSelectedData((prevState) => {
        return [...prevState, data];
      });
      props.getFilteredData([...selectedData, data]);
    }
    // }
  };

  useEffect(() => {
    let arr = filterByData;
    if (selectedLangData?.length) {
      if (!arr?.includes("Language")) {
        props.getFilteredData([...arr, "Language"]);
      }
    } else {
      let temp = filterByData;
      let index = temp?.indexOf("Language");
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (temp?.length) {
        props.getFilteredData(temp);
      }
    }
  }, [selectedLangData]);
  useEffect(() => {
    let arr = filterByData;
    if (flowData?.length) {
      if (!arr?.includes("Flow")) {
        props.getFilteredData([...arr, "Flow"]);
      }
    } else {
      let temp = filterByData;
      let index = temp?.indexOf("Flow");
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (temp?.length) {
        props.getFilteredData(temp);
      }
    }
  }, [flowData]);
  useEffect(() => {
    let arr = filterByData;
    if (selectedDispositionData?.length) {
      if (!arr?.includes("Disposition")) {
        props.getFilteredData([...arr, "Disposition"]);
      }
    } else {
      let temp = filterByData;
      let index = temp?.indexOf("Disposition");
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (temp?.length) {
        props.getFilteredData(temp);
      }
    }
  }, [selectedDispositionData]);
  useEffect(() => {
    let arr = filterByData;
    if (connectionStatus?.length) {
      if (!arr?.includes("Connection Status")) {
        props.getFilteredData([...arr, "Connection Status"]);
      }
    } else {
      let temp = filterByData;
      let index = temp?.indexOf("Connection Status");
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (temp?.length) {
        props.getFilteredData(temp);
      }
    }
  }, [connectionStatus]);

  const getLangChecked = (e, data, index) => {
    if (selectedLangData?.includes(data)) {
      let tempArr = [...selectedLangData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedLangData((prevState) => {
        return [...tempArr];
      });
      // props.selectedLanguageData(tempArr)
    } else {
      setSelectedLangData((prevState) => {
        return [...prevState, data];
      });
      // props.selectedLanguageData([...selectedLangData,data])
      // props.getFilteredData([...selectedData, data])
    }
  };
  // select flow
  const getFlowChecked = (e, data, index) => {
    if (flowData?.includes(data)) {
      let tempArr = [...flowData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setFlowData((prevState) => {
        return [...tempArr];
      });
      // props.selectedLanguageData(tempArr)
    } else {
      setFlowData((prevState) => {
        return [...prevState, data];
      });
      // props.selectedLanguageData([...selectedLangData,data])
    }
  };
  // select connection status
  const getConnectionStatusChecked = (e, data, index) => {
    if (connectionStatus?.includes(data)) {
      let tempArr = [...connectionStatus];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setConnectionStatus((prevState) => {
        return [...tempArr];
      });
      // props.selectedLanguageData(tempArr)
    } else {
      setConnectionStatus((prevState) => {
        return [...prevState, data];
      });
      // props.selectedLanguageData([...selectedLangData,data])
    }
  };

  const getDispositionChecked = (e, data, index) => {
    if (selectedDispositionData?.includes(data)) {
      let tempArr = [...selectedDispositionData];
      const indexr = tempArr.indexOf(data);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedDispositionData((prevState) => {
        return [...tempArr];
      });
      // props.selectedDispositionData(tempArr)
    } else {
      setSelectedDispositionData((prevState) => {
        return [...prevState, data];
      });
      // props.selectedDispositionData([...selectedDispositionData,data])
    }
  };

  useEffect(() => {
    if (!filterByData?.includes("No. of Attempts") && maxAttempt == "1") {
      true;
    } else {
      if (maxAttempt > 1) {
        let arr = filterByData;
        if (!arr?.includes("No. of Attempts")) {
          props.getFilteredData([...arr, "No. of Attempts"]);
        }
        props.maxAttempt(maxAttempt);
      } else if (!maxAttempt) {
        props.maxAttempt(maxAttempt);
      } else if (
        filterByData?.includes("No. of Attempts") &&
        maxAttempt == "1"
      ) {
        props.maxAttempt(maxAttempt);
      }
    }
  }, [maxAttempt, filterByData]);

  useEffect(() => {
    props.flowData(flowData);
  }, [flowData]);

  useEffect(() => {
    props.connectionStatus(connectionStatus);
  }, [connectionStatus]);
  useEffect(() => {
    props.selectedLanguageData(selectedLangData);
  }, [selectedLangData]);

  useEffect(() => {
    props.selectedDispositionData(selectedDispositionData);
  }, [selectedDispositionData]);

  // To search to be selected data
  const getInputData = (e) => {
    setSearchData((prev) => e.target.value);
    let toSearch = e.target.value.toLowerCase();
    let finalData = toBeFilterData.map((dat, i) => {
      if (dat.toLowerCase().match(toSearch) && toSearch) {
        return dat;
      }
    });
    let data = finalData.filter((e) => {
      return e;
    });
    if (e.target.value) {
      setToRealFilterData(data);
    } else {
      setToRealFilterData(toBeFilterData);
    }
  };
  useEffect(() => {
    setToRealFilterData(toBeFilterData);
  }, [isDropdownShow]);

  const getFilteredData = () => {
    // if(selectedData?.length <=0 || !selectedData){
    //     setIsDropdownShow(prev => false);
    //     return;
    // }
    props.getFilteredData(selectedData);
    setIsDropdownShow((prev) => false);
  };

  const handleOnCancel = () => {
    if (props.selectedDataOutside?.length != toBeFilterData?.length) {
      setIsSelectAll((prev) => false);
    } else {
      setIsSelectAll((prev) => true);
    }
    setSelectedData((prev) =>
      props.selectedDataOutside ? props.selectedDataOutside : []
    );
    setIsDropdownShow((prev) => false);
  };

  // function for hide and show dropdowm
  const hideAndShowDropdown = () => {
    let temp = isDropdownShow;
    temp = !temp;
    setIsDropdownShow(temp);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropdownShow && ref.current && !ref.current.contains(e.target)) {
        setIsDropdownShow(false);
      }
    };
    setSearchData((prev) => null);
    setSelectedMainData(["abhishek"]);
    setImgArrow();
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownShow]);

  // console.log('filterData' , filterByData , callingFilterListData  )

  return (
    <>
      <div
        className={`callingdropdownwrapper-wrapper ${
          props.multiselectWrapperWrapper ? props.multiselectWrapperWrapper : ""
        }`}
        ref={ref}
      >
        <div
          className={`selecteditem  select-data ${
            props.isFilter ? "filter-section-drop" : ""
          } 
          ${props.isDisable ? "disablePointerEventUniversaljp" : ""}
            ${
              props.extraSelectedClass
                ? props.extraSelectedClass
                : "extraSelectedClass"
            }
          `}
          onClick={() => hideAndShowDropdown()}
        >
          {imgSrcLeft && (
            <img
              className={`select-data ${
                props.leftImgStyle ? props.leftImgStyle : ""
              }`}
              //   style={{ width: "12px" }}
              src={imgSrcLeft ? imgSrcLeft : ""}
              alt="Dropdown left icon"
            />
          )}
          <p
            className={`select-data ${
              props.extraPlaceHolderStyle ? props.extraPlaceHolderStyle : ""
            }`}
          >
            {" "}
            {placeHolderText?.length
              ? typeof placeHolderText === "object"
                ? placeHolderText?.map((e, i) => {
                    if (i < 2) {
                      return (
                        <span key={i} className="placeholderDiv">
                          {" "}
                          {e}
                        </span>
                      );
                    } else if (i === 2) {
                      return "....";
                    }
                  })
                : placeHolderText
              : `Select`}
          </p>
          {
            <img
              className="select-data"
              src={imgSrcRight ? imgSrcRight : DropdownIcon}
              alt="Dropdown left icon"
            />
          }
        </div>
        {isDropdownShow && (
          <div
            className={`multiselect-wrapper filterdataToBeSelected ${
              props.filterDataTobeSelected ? props.filterDataTobeSelected : ""
            }`}
          >
            <div className="multi-over">
              {props.isHideSearchBar ? (
                ""
              ) : (
                <div className="search-wrap">
                  <img className="multi-icon" src={searchIcon} />
                  <input
                    className="search-inp"
                    type="text"
                    onChange={getInputData}
                    value={searchData}
                  />
                </div>
              )}
              <div className="multiselect-bodyjp">
                <>
                  {props.isHideAllCheckbox ? (
                    ""
                  ) : (
                    <div
                      className="body-data"
                      style={{
                        width: "100px",
                        // fontSize: "10px",
                      }}
                    >
                      <Checkbox
                        checked={isSelectAll ? true : false}
                        onChange={getIsAllChecked}
                        extraSpan={
                          isSelectAll ? "multi-border" : "multi-border-bs"
                        }
                      />
                      Select All
                    </div>
                  )}
                  {toRealfilterData &&
                    toRealfilterData?.map((each, i) => {
                      return (
                        <div
                          className={`body-data red ${
                            filterByData &&
                            filterByData[selectedData?.length - 1] == each
                              ? "select-class"
                              : ""
                          } 
                        ${imgArrow == i ? "parent" : ""}`}
                          key={i}
                          onMouseOver={(e) => {
                            return (
                              setImgArrow(i),
                              setSelectedMainData((prev) => [each])
                              // props.getFilteredData([...selectedData, each])
                            );
                          }}
                          onMouseOut={(e) => {
                            //  return (
                            //    setImgArrow()
                            // //  setSelectedMainData()
                            //  );
                          }}
                          // onClick ={(e) => getChecked(e, each, i) }
                        >
                          <Checkbox
                            checked={
                              selectedData?.includes(each) ? true : false
                            }
                            onChange={(e) => getChecked(e, each, i)}
                            extraSpan={
                              isSelectAll || selectedData?.includes(each)
                                ? "multi-border"
                                : "multi-border-bs"
                            }
                          />
                          <div className="eachName">{each}</div>
                          {each !== "Disabled Accounts" ? (
                            <img src={imgArrow == i ? arrowHover : arrow}></img>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                </>
              </div>
              {props.isHideFooter ? (
                ""
              ) : (
                <div className="multiselect-footer">
                  <button
                    className="multiple-btn"
                    onClick={() => getFilteredData()}
                  >
                    Ok
                  </button>
                  <button
                    className="multiple-btn"
                    onClick={() => handleOnCancel()}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {isDropdownShow &&
          (filterByData?.length > 0 || selectedMainData?.length) && (
            <div
              className={`multiselect-wrapper filterdataToBeSelected child ${
                props.filterDataTobeSelected ? props.filterDataTobeSelected : ""
              } ${selectedMainData[0]}`}
            >
              <div className="multi-over">
                {selectedMainData[0] == "No. of Attempts" && (
                  <MaxAttempt
                    setAttempt={setmaxAttempt}
                    MaxAttempt={maxAttempt}
                  />
                )}
                {selectedMainData[0] == "Flow" &&
                  callingFilterListData &&
                  Object.values(callingFilterListData?.flowType)?.length >
                    0 && (
                    <div className="multiselect-bodyjp">
                      <>
                        {Object.values(callingFilterListData?.flowType).map(
                          (each, i) => {
                            return (
                              // <div className="body-data sub-child" key={i} onClick={()=>{setFlowData(each)}}>
                              //   <div>{each}</div>
                              // </div>
                              <div className="body-data" key={i}>
                                <Checkbox
                                  checked={
                                    flowData?.includes(each) ? true : false
                                  }
                                  onChange={(e) => getFlowChecked(e, each, i)}
                                  extraSpan={
                                    isSelectAll || flowData?.includes(each)
                                      ? "multi-border"
                                      : "multi-border-bs"
                                  }
                                />
                                <div>{each}</div>
                              </div>
                            );
                          }
                        )}
                      </>
                    </div>
                  )}
                {selectedMainData[0] == "Language" &&
                  callingFilterListData &&
                  Object.values(callingFilterListData?.language)?.length >
                    0 && (
                    <div className="multiselect-bodyjp">
                      <>
                        {props.isHideAllCheckbox ? (
                          ""
                        ) : (
                          <div
                            className="body-data "
                            style={{
                              width: "100px",
                              fontSize: "10px",
                              borderBottom: "1px solid black",
                              padding: "5px",
                              margin: "auto",
                            }}
                          >
                            <Checkbox
                              checked={isSelectAll ? true : false}
                              onChange={getIsAllChecked}
                              extraSpan={
                                isSelectAll ? "multi-border" : "multi-border-bs"
                              }
                            />
                            Select All
                          </div>
                        )}
                        {Object.values(callingFilterListData?.language)
                          ?.length > 0 &&
                          Object.values(callingFilterListData?.language)?.map(
                            (each, i) => {
                              return (
                                <div className="body-data" key={i}>
                                  <Checkbox
                                    checked={
                                      selectedLangData?.includes(each)
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => getLangChecked(e, each, i)}
                                    extraSpan={
                                      isSelectAll ||
                                      selectedLangData?.includes(each)
                                        ? "multi-border"
                                        : "multi-border-bs"
                                    }
                                  />
                                  <div>{each}</div>
                                </div>
                              );
                            }
                          )}
                      </>
                    </div>
                  )}
                {selectedMainData[0] == "Connection Status" &&
                  callingFilterListData &&
                  Object.values(callingFilterListData?.connectionStatus)
                    ?.length > 0 && (
                    <div className="multiselect-bodyjp">
                      <>
                        {Object.values(
                          callingFilterListData?.connectionStatus
                        ).map((each, i) => {
                          return (
                            // <div className="body-data sub-child" key={i} onClick={()=>{setConnectionStatus(each)}}>
                            //   <div>{each.toLowerCase()}</div>
                            // </div>
                            <div className="body-data" key={i}>
                              <Checkbox
                                checked={
                                  connectionStatus?.includes(each)
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  getConnectionStatusChecked(e, each, i)
                                }
                                extraSpan={
                                  isSelectAll ||
                                  connectionStatus?.includes(each)
                                    ? "multi-border"
                                    : "multi-border-bs"
                                }
                              />
                              <div>{each}</div>
                            </div>
                          );
                        })}
                      </>
                    </div>
                  )}
                {selectedMainData[0] == "Disposition" &&
                  callingFilterListData &&
                  Object.values(callingFilterListData?.disposition)?.length >
                    0 && (
                    <div className="multiselect-bodyjp">
                      <>
                        {props.isHideAllCheckbox ? (
                          ""
                        ) : (
                          <div
                            className="body-data"
                            style={{
                              width: "100px",
                              fontSize: "10px",
                              borderBottom: "1px solid black",
                              padding: "5px",
                              margin: "auto",
                            }}
                          >
                            <Checkbox
                              checked={isSelectAll ? true : false}
                              onChange={getIsAllChecked}
                              extraSpan={
                                isSelectAll ? "multi-border" : "multi-border-bs"
                              }
                            />
                            Select All
                          </div>
                        )}
                        {Object.values(callingFilterListData?.disposition)
                          ?.length > 0 &&
                          Object.values(
                            callingFilterListData?.disposition
                          )?.map((each, i) => {
                            return (
                              <div className="body-data" key={i}>
                                <Checkbox
                                  checked={
                                    selectedDispositionData?.includes(each)
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    getDispositionChecked(e, each, i)
                                  }
                                  extraSpan={
                                    isSelectAll ||
                                    selectedDispositionData?.includes(each)
                                      ? "multi-border"
                                      : "multi-border-bs"
                                  }
                                />
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    getDispositionChecked(e, each, i)
                                  }
                                >
                                  {each}
                                </div>
                              </div>
                            );
                          })}
                      </>
                    </div>
                  )}
                {/* {props.isHideSearchBar?"":<div className='search-wrap'>
                    <img className="multi-icon" src={searchIcon} />
                    <input
                        className="search-inp"
                        type="text"
                        onChange={getInputData}
                        value={searchData}
                        
                    />
                </div>}
                <div className='multiselect-bodyjp'>
                    <>
                    {props.isHideAllCheckbox ?"":
                        <div
                            className='body-data'
                            style={{
                                width: "100px",
                                fontSize: "10px",
                                borderBottom: "1px solid black",
                                padding: "5px",
                                margin: "auto"
                            }}>
                            <Checkbox
                                checked={isSelectAll ? true : false
                                }
                                onChange={getIsAllChecked}
                                extraSpan={isSelectAll?"multi-border":"multi-border-bs"}

                            />
                            Select All
                        </div>}
                        { toRealfilterData && toRealfilterData?.map((each, i) => {
                            return(
                            <div className='body-data' key={i}>
                                <Checkbox
                                    checked={
                                        selectedData?.includes(each) ? true : false}
                                    onChange={(e) => getChecked(e, each, i)}
                                    extraSpan={(isSelectAll || selectedData?.includes(each)) ? "multi-border" : "multi-border-bs"}
                                />
                                <div>{each}</div>
                               
                            </div>
                            )
                        })
                        }
                    </>

                </div>
                {props.isHideFooter?"":<div className='multiselect-footer'>
                    <button className="multiple-btn" onClick={() => getFilteredData()}>
                        Ok
                    </button>
                    <button className="multiple-btn" onClick={() => handleOnCancel()}>
                        Cancel
                    </button>
                </div>} */}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default DropdownComponent;

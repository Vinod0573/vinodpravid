import styles from "./ColumnMultiselect.module.scss";
import React, { useState, SetStateAction, useEffect } from "react";
import PravidIcons from "../../../generic/icon/PravidIcons";
// import {
//   searchIcon,
// } from "../../../../theme/assets/svg/rightSideIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setReportColumnInDnd,
  setSelectedFilterOptions,
} from "../../../../redux/filters/actions";
import { setSelectedFilterType } from "../../../../redux/filters/actions";
import { RootState } from "../../../../redux";
export default function ColumnMultiselect(props: any) {
  // const [closeDropDown, setCloseDropDown] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const optionsAvailableInDnd = useSelector(
    (state: RootState) => state.filterReducers.allSelectedReportingColumn
  );

  useEffect(() => {
    const sle = props.options.options.filter((each: any) => {
      if (each.originalName === "Sr. No") return false;
      return each.isActive;
    });
    setFilterOptions(props.options.options);
    setSelectedData(sle);

    if (sle.length === props.options.options.length - 1) {
      setIsSelectAll(true);
    }
  }, [props.options.options]);

  useEffect(() => {
    setSelectedData(optionsAvailableInDnd);
  }, [optionsAvailableInDnd]);

  // const selectedFilterType = useSelector(
  //   (state: RootState) => state.filterReducers?.selectedFilterType
  // );
  // const dispatch=useDispatch();
  // function handleCloseOnDropdown() {
  //   (selectedFilterType===props.options.name) &&setCloseDropDown(!closeDropDown);
  //   dispatch(setSelectedFilterType(props?.options?.name));
  // }
  //manange slelcte filter
  // useEffect(() => {
  //   if (selectedFilterType === props.options.name) {
  //     if (closeDropDown) {
  //       setCloseDropDown(false);
  //     } else {
  //       setCloseDropDown(true);
  //     }
  //   } else {
  //     setCloseDropDown(true);
  //   }
  // }, [selectedFilterType]);
  // const optionsDefaultSelected = useSelector(
  //   (state: RootState) =>
  //     state.filterReducers?.selectedFilterOptions[props.options.name]
  // );
  const getChecked = (data: any, index: number) => {
    if (
      data.originalName === "Contact Number" ||
      data.originalName === "Sr. No"
    )
      return;
    if (selectedData?.find((ex) => ex.id === data.id)) {
      const tempArr = [...selectedData];
      const indexr = tempArr.findIndex((ex) => ex.id === data.id);
      if (indexr > -1) {
        tempArr.splice(indexr, 1);
      }
      setSelectedData([...tempArr]);
      if (tempArr.length === props.options.options.length - 1) {
        setIsSelectAll(true);
      } else {
        setIsSelectAll(false);
      }
    } else {
      if (data.originalName === "Sr. No") return;
      setSelectedData([...selectedData, data]);
      if (selectedData.length + 1 === props.options.options.length - 1) {
        setIsSelectAll(true);
      } else {
        setIsSelectAll(false);
      }
    }
  };
  const getSearchData = (e: any) => {
    if (e.target.value.length < 3 && !(e.target.value.length === 0)) return;
    const searchTerm = e.target.value.toLowerCase();
    const searchedData: any = [];
    props.options.options.forEach((each: any) => {
      if (each?.currentName.toLowerCase().includes(searchTerm)) {
        searchedData.push(each);
      }
    });
    setFilterOptions(searchedData);
  };
  const getIsAllChecked = () => {
    if (isSelectAll) {
      setIsSelectAll(false);
      let newOptions: any = filterOptions.filter((e: any) => {
        if (e.originalName === "Contact Number") {
          return true;
        } else {
          return false;
        }
      })
      if(!newOptions.find((e:any)=>e?.originalName==="Contact Number")){
        const x= props.options.options.find((e:any)=>e?.originalName==="Contact Number")
         if(x) newOptions=[...newOptions,x]
      }

      setSelectedData([...newOptions]);
    } else {
   setIsSelectAll(true);
    let newOptions:any=filterOptions.filter((e:any)=>{
      return !(e.originalName==="Sr. No" )
    })
    if(!newOptions.find((e:any)=>e.originalName==="Contact Number")){
      const x= props.options.options.find((e:any)=>e?.originalName==="Contact Number")
       if(x) newOptions=[...newOptions,x]
    }

      setSelectedData(newOptions);
    }
  };
  // function handleCloseButton() {
  //   setSelectedData([]);
  //   setIsSelectAll(false);
  //   setCloseDropDown(true);
  //   //  dispatch(setSelectedFilterOptions({type:props.options.name,options:[]}))
  // }
  // function handleTickButton() {
  //   setCloseDropDown(true);

  //   //  dispatch(setSelectedFilterOptions({type:props.options.name,options:selectedData}))
  // }
  // function handleClickOutsideButtons(e: any) {
  //   e.stopPropagation();
  //   setCloseDropDown(false);
  // }
  // useEffect(() => {
  //   if (optionsDefaultSelected !== undefined)
  //     setSelectedData(optionsDefaultSelected);
  // }, []);
  useEffect(() => {
    dispatch(setReportColumnInDnd(selectedData));
  }, [selectedData]);
  return (
    <>
      <div
        className={`${styles.filterwrappers}  ${
          props?.disabled ? styles.disablethisfilter : " "
        }`}
      >
        {/* <div className={styles.topdivof} onClick={handleCloseOnDropdown}>
        <img src={!closeDropDown  ? openarrow : closearrow}></img>
        <p
          className={
            closeDropDown ? styles.closedropdowntext : styles.opendropdowntext 
          }
        >
          {props.options.name}
        </p>
      </div> */}

        <div className={styles.openevrything}>
          {props.options?.options?.length > 0 && (
            <div className={styles.inputdiv}>
              {/* <img src={searchIcon} alt="" /> */}
              <PravidIcons activeIcon={"searchIcon"} />
              <input
                onChange={getSearchData}
                className={styles.searchinput}
                type="text"
                placeholder="Search"
              />
            </div>
          )}

          {
            <>
              {
                <div
                  className={
                    styles.colorgrey +
                    " " +
                    styles.margibttm +
                    " " +
                    (isSelectAll
                      ? styles.colorItem + " " + styles.bgbluesp
                      : "")
                  }
                >
                  <input
                    type="checkbox"
                    checked={isSelectAll ? true : false}
                    onChange={getIsAllChecked}
                    className={styles.checkboxcusror}
                  />
                  Select All
                </div>
              }
            </>
          }
          <div className={styles.wrapperforoptiosn}>
            {filterOptions?.map((each: any, i: number) => {
              if (each.currentName === "Sr. No") return null;
              return (
                <div
                  className={`${styles.bodydata}   ${
                    selectedData?.find(
                      (ex) => ex?.currentName === each?.currentName
                    )
                      ? styles.bgblue
                      : ""
                  }`}
                  key={i}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedData?.find(
                        (ex) => ex?.currentName === each?.currentName
                      )
                        ? true
                        : false
                    }
                    onChange={() => getChecked(each, i)}
                    className={styles.checkboxofoptions}
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => getChecked(each, i)}
                    className={
                      selectedData?.find(
                        (ex) => ex?.currentName === each?.currentName
                      )
                        ? styles.colorItem
                        : "" + " " + styles.colorgrey
                    }
                  >
                    {each?.currentName}
                  </div>
                </div>
              );
            })}
          </div>
          {/* {selectedData.length>0&&<>
       <div className={styles.divcontainingbtn}> <button className={styles.btnsforcloseopen} onClick={()=>{handleCloseButton()}}><img src={crossblue} alt="" /> </button> <button onClick={()=>{handleTickButton()}} className={styles.btnsforcloseopen}><img src={tickblue} alt="" /></button> </div>
      </>} */}
        </div>
        {/*       
      {closeDropDown && selectedData.length>0&&<>
      <div className={styles.optionsoutside}>{selectedData.map((e,i)=>
        {
          if(i<=1){return( <div  onClick={(e)=>{handleClickOutsideButtons(e)}} className={styles.eachoptionoutside}  key={i}>
            {selectedData[i]}
          </div>)}
          else if(i===2){
            return <div  onClick={(e)=>{handleClickOutsideButtons(e)}} className={styles.eachoptionoutside} key={i}>
            { ("+")+(selectedData.length-2) }
          </div>
          }
          else{
            return null
          }

         
        })}</div>
       
      </>} */}
      </div>
      {/* <div className={styles.divide}></div> */}
    </>
  );
}

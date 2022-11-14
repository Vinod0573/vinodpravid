import React, { useState, useEffect,useRef } from 'react'
import "./MultiSelectDropdown.css"
import Checkbox from "../../../../generic/checkbox/Checkbox";
import searchIcon from "../../../../../theme/assets/svg/generic/searchIcon.svg"
import DropdownIcon from "../../../../../theme/assets/svg/generic/dropdownIcon.svg";




const MultiSelectDropdown = (props) => {
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [toBeFilterData, setToBeFilterData] = useState([]);
    const [toRealfilterData, setToRealFilterData] = useState();
    const [selectedData, setSelectedData] = useState([]);
    const [searchData, setSearchData] = useState();
    const [isDropdownShow, setIsDropdownShow] = useState(false);

    const ref = useRef();

    const {imgSrcLeft,placeHolderText, imgSrcRight } = props.options;

    useEffect(() => {
       
        if(props.toBeFilterData ){
         setToBeFilterData(prev => props.toBeFilterData);
         setToRealFilterData(prev => props.toBeFilterData);
        }

    },[props.toBeFilterData]);

useEffect(() => {
    setIsSelectAll(prev => isSelectAll);
   
},[isSelectAll])


useEffect(
    () => {
       setIsDropdownShow(prev => props.toShowListOut)
    },[props.toShowListOut]
)

useEffect(() => {   
    if(selectedData?.length >0) {
    if(selectedData?.length === toBeFilterData?.length){
        //alert('jai');
        setIsSelectAll(prev => true);
        
    }
    else{
        setIsSelectAll(prev => false);
    }
}
},[selectedData , toBeFilterData])

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
    


useEffect( () => {
   

        if(props.selectedDataOutside?.length > 0){
            
            if(props.selectedDataOutside?.length != toBeFilterData?.length){
                setIsSelectAll(prev => false);
            }
            setSelectedData(prev => props.selectedDataOutside)
        }
        else{
            setIsSelectAll(false);
            setSelectedData(prev => []);
        }
    },[props.selectedDataOutside]);

    

    // useEffect(() => {
    //     setSelectedData(prev =>  selectedData);
    // },[selectedData])

    // To select all checkbox
    const getIsAllChecked = (e) => {
        let checked = e

        if (checked === false) {
            setIsSelectAll(false);
            setSelectedData(prev => [])
        } else {
            setSelectedData(prev => toBeFilterData)
            setIsSelectAll(checked)
           
        }

    }


// To select single checkbox
    const getChecked = (e, data, index) => {

        if(props.isHideAllCheckbox){
            if (selectedData?.includes(data)) {
                let tempArr = [];
                // const indexr = tempArr.indexOf(data);
                // if (indexr > -1) {
                //     tempArr.splice(indexr, 1);
                // }
                setSelectedData(prevState => {
                    return [...tempArr]
                })

            } else {
                let tempArr = [];
                tempArr.push(data);
                setSelectedData(prevState => {
                    return [...tempArr]
                })
            }
        }
        else{
            if (selectedData?.includes(data)) {
                let tempArr = [...selectedData]
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectedData(prevState => {
                    return [...tempArr]
                })

            } else {
                setSelectedData(prevState => {
                    return [...prevState, data]
                })
            }
        }  
    }

 // To search to be selected data
    const getInputData = (e) => {
        setSearchData(prev =>e.target.value)
        let toSearch = (e.target.value).toLowerCase()
        let finalData = toBeFilterData.map((dat, i) => {
            if (dat.toLowerCase().match(toSearch) && toSearch) {
                return dat
            }
        })
        let data = finalData.filter(e => { return e })
        if (e.target.value) {
            setToRealFilterData(data)
        } else {
            setToRealFilterData(toBeFilterData);
        }
    }
   useEffect(
       () => {
        setToRealFilterData(toBeFilterData)  
       },[isDropdownShow]
   )

  


    const getFilteredData = () => {
        // if(selectedData?.length <=0 || !selectedData){
        //     setIsDropdownShow(prev => false);
        //     return;
        // }
        props.getFilteredData(selectedData);
        setIsDropdownShow(prev => false);
    }

    const  handleOnCancel = () => {
        if(props.selectedDataOutside?.length != toBeFilterData?.length){
            setIsSelectAll(prev => false);
        }
        else{
            setIsSelectAll(prev => true);
            
        }
        setSelectedData(prev => props.selectedDataOutside ? props.selectedDataOutside : []);
        setIsDropdownShow(prev => false);
    }

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
        setSearchData(prev => null)
        document.addEventListener("mousedown", checkIfClickedOutside);
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside);
        };
      }, [isDropdownShow]);
    
    return (
        <>
        <div className={`multiselect-wrapper-omni ${props.multiselectWrapperWrapper ? props.multiselectWrapperWrapper : "" }`}  ref={ref}>
            <div
          className={`selecteditem  select-data ${
            props.isFilter ? "filter-section-drop" : ""
          } 
          ${
            props.isDisable ? "disablePointerEventUniversaljp"
              : ""
            }
            ${
              props.extraSelectedClass ? props.extraSelectedClass : "extraSelectedClass"
            }
          `}
            
          onClick={() => hideAndShowDropdown()}
        >
          { imgSrcLeft &&
            <img
              className={`select-data ${props.leftImgStyle ? props.leftImgStyle : ""}`}
            //   style={{ width: "12px" }}
              src={imgSrcLeft ?imgSrcLeft: ""}
              alt="Dropdown left icon"
            />}
          <p 
            className={`select-data ${ placeHolderText !=="Select Template" &&props.extraPlaceHolderStyle ? props.extraPlaceHolderStyle : ""}`}
          >
            {" "}
            {placeHolderText ? placeHolderText : `--select--`}{" "}
          </p>
          {
            <img
              className="select-data"
              src={imgSrcRight ? imgSrcRight :DropdownIcon}
              alt="Dropdown left icon"
            />
          }
        </div>
        {
        isDropdownShow && 
        <div className={`multiselect-wrapper filterdataToBeSelected ${props.filterDataTobeSelected ? props.filterDataTobeSelected : ""}`}>
            <div className="multi-over">
                <div className='search-wrap'>
                    <img className="multi-icon" src={searchIcon} />
                    <input
                        className="search-inp"
                        type="text"
                        onChange={getInputData}
                        value={searchData}
                        
                    />
                </div>
                <div className='multiselect-bodyjp'>
                    <>
                    {/* {props.isHideAllCheckbox ?"":
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
                        </div>} */}
                        { toRealfilterData && toRealfilterData?.map((each, i) => {
                            return(
                            <div className='body-data' key={i}>
                                <Checkbox
                                    checked={
                                        selectedData?.includes(each) ? true : false}
                                    onChange={(e) => getChecked(e, each, i)}
                                    extraSpan={(isSelectAll || selectedData?.includes(each)) ? "multi-border" : "multi-border-bs"}
                                />
                                <div className='imgoption'><img className='imgList'  src={props.imgList}></img></div>
                                <div onClick={(e) => getChecked(e, each, i)} style={{cursor:"pointer"}}>{each}</div>
                               
                            </div>
                            )
                        })
                        }
                    </>

                </div>
                <div className='multiselect-footer'>
                    <button className="multiple-btn" onClick={() => getFilteredData()}>
                        Ok
                    </button>
                    <button className="multiple-btn" onClick={() => handleOnCancel()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        }
        </div>
        </>
    )
    }


export default MultiSelectDropdown;

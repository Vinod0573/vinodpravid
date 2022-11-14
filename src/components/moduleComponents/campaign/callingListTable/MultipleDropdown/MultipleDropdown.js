import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";


function MultipleDropdown(props) {
  const objectArray = [
    { key: "Option 1" },
    { key: "Option 2" },
    { key: "Option 3" },
    { key: "Option 4" },
    { key: "Option 5" },
    { key: "Option 6" },
    { key: "Option 7" },
  ];
  const [multiDropdownData, setMultiDropdownData] = useState([]);
  const [selectedDropdownData, setSelectedDropdownData] = useState([]);
  const [lastSelectedValue,setLastSelectedValue]=useState("")
  const [selectedVal,setSelectedVal]=useState("")

  useEffect(() => {
    const dropdownData = props.inputArray.map((each, i) => {
      return { key: each };
    });
    setMultiDropdownData(dropdownData);
  }, [props.inputArray]);

  const handleSelect=(value)=>{
      if(value[value.length-1]){
          setLastSelectedValue()
      }
    setSelectedDropdownData(value);
  }

  const handleRemove=(value)=>{
    setSelectedDropdownData(value);
  }

  const propsForAll = {
    optionList: selectedVal ? selectedVal : "",
    imgSrcRight: "" ,
    placeHolderText: "select" 
}
const onChangeAll=()=>{

}

  console.log(selectedDropdownData);
  return (
      <>
    <div style={{ width: "100%", height: "100%" }}>
      <Multiselect
        options={multiDropdownData}
        displayValue="key"
        showCheckbox={true}
        placeholder={"Filter By"}
        onSelect={(value) => {
            handleSelect(value)
         
        }}
        onRemove={(value) => {
            handleRemove(value)
         
        }}
        selectedValues={
          selectedDropdownData.length > 0 ? [selectedDropdownData[0]] : []
        }
        isSelectedValue={false}
        showArrow={true}
      />
    </div>
    <div className="optionListContainer displayNone">
        <ul className="optionContainer">
       <li>jhghjg</li>
        </ul>
    </div>
   
    <div className="multiselect-parallel-section optionListContainer displayNone">
    
    </div>
   
    </>
  );
}

export default MultipleDropdown;

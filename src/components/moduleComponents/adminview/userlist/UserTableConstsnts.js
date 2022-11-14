import React from 'react';
import EditIcon from "../../../../theme/assets/svg/adminView/editIcon.svg";
import ToggleSwitch from "../../../generic/toggleSwitch/ToggleSwitch";

function TableConstants(handleClickUpdateUserDetail, handleDisableToggleSwitch) {

  const handleClickUpdateUserDetailLocal = (index) =>{
    handleClickUpdateUserDetail(index)
  }

  const handleDisableToggleSwitchLocal = (checked, index) =>{
    handleDisableToggleSwitch(checked, index)
  }

  return (
    
        [
    {
        title: 'Name',
        render: rowData => {
          return <span>{rowData.name}</span>;
        },
      },

      {
        title: 'User Name',
        render: rowData => {
          return <span>{rowData.userName}</span>;
        },
      },

      {
        title: "E-Mail",
        
        render: rowData => {
          return <span>{rowData.email}  </span>;
        },
      },
     
      {
        title: 'Role',
        render: rowData => {
          return <span>{rowData.role}</span>;
        },
      },
    
      {
        title: 'Status',
        render: (rowData, index) => {
          return(
          <span className={rowData?.isActive ? "" :"disableMakeBlurUniversaljp"}>
           <ToggleSwitch
          id={rowData?._id}
          checked={rowData?.isActive}
          onChange={(checked) =>
            handleDisableToggleSwitch(checked, index)
          }
          disabled={rowData?.role.toString().toLowerCase() === 'owner' || rowData?.role.toString() === 'Chief Risk Officer' ?  true : false}
        />
        </span>);
        },
      },
      {
        title: 'Edit',
        render: (rowData, index) => {
          return <span
          style={{ cursor: "pointer" }}
           onClick={() => handleClickUpdateUserDetailLocal(index)}
        >
          <img src={EditIcon} alt="Edit Icon" />
        </span>;
        },
      },
  ]

  )
}

export default TableConstants
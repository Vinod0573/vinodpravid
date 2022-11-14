import React, { useEffect } from "react";
import "./ColumnEditName.scss";
import { createPortal } from "react-dom";
// import { searchIcon } from "../../../../theme/assets/svg/rightSideIcon";
// import { tags,blueTags } from "../../../../theme/assets/svg/rightSideIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux";
import { useState } from "react";
import {
  updateSchemaRequest,
  directlyUpdateSchema,
} from "../../../../redux/onboarding/login/actions";

import {
  setShowEditColumnName,
  setShowColumnCustomizePop,
} from "../../../../redux/filters/actions";
import { useCurrentPageTab } from "../../../../hooks";
import { getDataFromSchema } from "../../../../utils/getDataFromSchema";
import { toast } from "react-toastify";
import PravidIcons from "../../../generic/icon/PravidIcons";
export default function ColumnEditName() {
  const {
    schema,
    sourceTab,
    isActivePageType,
    whatsappChannelTab,
    subModuleTab,
    channelTab,
    currentLoggerPage,
  } = useCurrentPageTab();

  const [allData, setAllData] = useState<any>({ options: [], name: "Columns" });
  useEffect(() => {
    if (
      sourceTab &&
      subModuleTab &&
      channelTab &&
      currentLoggerPage &&
      isActivePageType
    ) {
      setAllData({
        options: getDataFromSchema({
          schema,
          sourceTab,
          isActivePageType,
          whatsappChannelTab,
          subModuleTab,
          channelTab,
          currentLoggerPage,
        }).reportColumns,
        name: "Columns",
      });
    }
  }, [schema, sourceTab, whatsappChannelTab, subModuleTab, channelTab]);

  const dispatch = useDispatch();
  const [editCopy, setEditCopy] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>({ id: -1 });
  const [editedText, setEditedText] = useState<string>("");
  const [options, setOptions] = useState<any>([]);
  const [showBlue, setShowBlue] = useState<any>(false);
  // const [showConfirm, setShowConfirm] = useState<boolean>(false);
  useEffect(() => {
    const cp = JSON.parse(JSON.stringify(allData.options));
    setEditCopy(cp);
    setOptions(cp);
  }, [allData]);
  useEffect(() => {
    if (selectedItem.id !== -1) {
      setEditedText(selectedItem.currentName);
    }
  }, [selectedItem]);
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userLoginInfo?.userDetail?._id
  );
  useEffect(() => {
    setOptions(editCopy);
  }, [editCopy]);
  const handleChangeInInput = (e: any, each: any) => {
    setEditedText(e.target.value);
    //
  };
  const handleClick = (each: any) => {
    if (!selectedItem) {
      setSelectedItem({ ...each });
    } else if (selectedItem && each.id !== selectedItem.id) {
      setSelectedItem({ ...each });
    }
    // setShowConfirm(true);
    //
  };
  const getSearchData = (e: any) => {
    // console.log("Triggered");
    if (e.target.value.length < 3 && !(e.target.value.length === 0)) return;
    const searchTerm = e.target.value.toLowerCase();
    const searchedData: any = [];
    editCopy.forEach((each: any) => {
      if (each.currentName.toLowerCase().includes(searchTerm)) {
        searchedData.push(each);
      }
    });
    setOptions(searchedData);
  };
  const handleMouseLeave = (e: any, each: any) => {
    let editCopyTemp = editCopy;
    editCopyTemp = editCopyTemp.map((eachx: any) => {
      if (eachx.id === each.id) return { ...each, currentName: editedText };
      else return eachx;
    });
    setEditCopy(editCopyTemp);
    setSelectedItem({ id: -1 });
  };
  const handleTags = () => {
    let cp = JSON.parse(JSON.stringify(allData.options));
    cp = cp.map((each: any) => {
      return {
        ...each,
        currentName: each.originalName,
      };
    });

    setEditCopy(cp);
    const tempSchema = JSON.parse(JSON.stringify(schema));
    //console.log(isActivePageType,currentLoggerPage,sourceTab,channelTab,subModuleTab,"TABS")
    if (channelTab === "Call") {
      tempSchema[isActivePageType.toLocaleLowerCase()]["report"][sourceTab][
        channelTab
      ][!subModuleTab ? "Campaign" : subModuleTab]["reportColumns"] = cp;
    } else {
      tempSchema[isActivePageType.toLocaleLowerCase()]["report"][sourceTab][
        channelTab
      ][whatsappChannelTab][!subModuleTab ? "Campaign" : subModuleTab][
        "reportColumns"
      ] = cp;
    }
    //console.log(tempSchema,"MAKING--- TEMPSCHEMA")
    dispatch(setShowEditColumnName(false));
    dispatch(setShowColumnCustomizePop(false));
    dispatch(updateSchemaRequest({ id: userId, schema: tempSchema }));
    //update th schema on ui before backend
    dispatch(directlyUpdateSchema(tempSchema));
  };
  const handleCancel = () => {
    dispatch(setShowEditColumnName(false));
    dispatch(setShowColumnCustomizePop(true));
  };
  const handleConfirm = () => {
    const tempSchema = JSON.parse(JSON.stringify(schema));
    //console.log(isActivePageType,currentLoggerPage,sourceTab,channelTab,subModuleTab,"TABS")
    if (channelTab === "Call") {
      tempSchema[isActivePageType.toLocaleLowerCase()]["report"][sourceTab][
        channelTab
      ][!subModuleTab ? "Campaign" : subModuleTab]["reportColumns"] = editCopy;
    } else {
      tempSchema[isActivePageType.toLocaleLowerCase()]["report"][sourceTab][
        channelTab
      ][whatsappChannelTab][!subModuleTab ? "Campaign" : subModuleTab][
        "reportColumns"
      ] = editCopy;
    }
    //console.log(tempSchema,"MAKING--- TEMPSCHEMA")
    dispatch(setShowEditColumnName(false));
    dispatch(setShowColumnCustomizePop(false));
    dispatch(updateSchemaRequest({ id: userId, schema: tempSchema }));
    dispatch(directlyUpdateSchema(tempSchema));
    toast.success("Please Wait ...");
  };
  const handleKey = (e: any, each: any) => {
    if (e.key === "Enter") {
      let editCopyTemp = editCopy;
      editCopyTemp = editCopyTemp.map((eachx: any) => {
        if (eachx.id === each.id) return { ...each, currentName: editedText };
        else return eachx;
      });
      setEditCopy(editCopyTemp);
      setSelectedItem({ id: -1 });
    }
  };
  return createPortal(
    <div className="fized-wrapper_fixed">
      <div className="popup-box-wrapper">
        <div className="popup-inner-section">
          <p className="p">Set Custom Name</p>

          <div className="searchsection">
            {/* <img src={searchIcon} alt="" /> */}
            <PravidIcons activeIcon={"searchIcon"} />
            <input
              onChange={getSearchData}
              className="searcharea"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="search-and-items">
            {options.length > 0 &&
              options.map((each: any, i: number) => {
                if (each.currentName === "Sr. No") return null;
                return each.id !== selectedItem.id ? (
                  <div
                    className="each-option"
                    onClick={() =>
                      !(each.originalName === "Sr. No") && handleClick(each)
                    }
                    key={i}
                  >
                    <p
                      className={
                        each.currentName !== each.originalName
                          ? "colorblue"
                          : ""
                      }
                    >
                      {each.currentName}
                    </p>
                  </div>
                ) : (
                  <div
                    className="each-option"
                    // onChange={() => handleClick(each)}
                    key={i}
                  >
                    <input
                      className="inputtextsarea"
                      onChange={(e) => handleChangeInInput(e, each)}
                      onMouseLeave={(e) => {
                        handleMouseLeave(e, each);
                      }}
                      onKeyDown={(e) => handleKey(e, each)}
                      value={editedText}
                    ></input>
                  </div>
                );
              })}
          </div>
          <div className="dividehr"></div>
          <div
            className="tagssection"
            onMouseOver={(e) => {
              setShowBlue(true);
            }}
            onMouseLeave={() => {
              setShowBlue(false);
            }}
          >
            {showBlue ? (
              <PravidIcons activeIcon={"blueTags"} onClick={handleTags} />
            ) : (
              <PravidIcons activeIcon={"tags"} onClick={handleTags} />
            )}
            <p
              className={"tagssectiontext " + (showBlue ? "  colorblue" : " ")}
            >
              Set to default name
            </p>
          </div>

          <div className="buttonsection">
            <button className="cancelbutton" onClick={handleCancel}>
              Cancel
            </button>

            <button className="Confirmbutton" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root-portal")!
  );
}

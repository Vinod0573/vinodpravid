import React, { useRef } from "react";
import ColumnDnD from "./columnDnd/ColumnDnD";
import ColumnMultiselect from "./columnMultiselect/ColumnMultiselect";
import styles from "./ColumnCustomizeWrapper.module.scss";
import { blueTags, cross } from "../../../theme/assets/svg/rightSideIcon";
// import { tags } from "../../../theme/assets/svg/rightSideIcon";

import { createPortal } from "react-dom";
import {
  setShowColumnCustomizePop,
  setShowEditColumnName,
  toggleShowColumnCustomizePop,
} from "../../../redux/filters/actions";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { useCurrentPageTab } from "../../../hooks";
import { getDataFromSchema } from "../../../utils/getDataFromSchema";
import { find } from "lodash";
import {
  directlyUpdateSchema,
  updateSchemaRequest,
} from "../../../redux/onboarding/login/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { toast } from "react-toastify";
import PravidIcons from "../../generic/icon/PravidIcons";

export default function ColumnCustomizeWrapper() {
  //const refs = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleShowColumnCustomizePop());
  };
  const [showBlue, setShowBlue] = useState<any>(false);
  const [getOutOrder, setGetOutOrder] = useState<any>();
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
    if (sourceTab && channelTab && currentLoggerPage && isActivePageType) {
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

  useEffect(() => {
    // console.log(allData,"ALLDATA")
  }, [allData]);
  // const reportingcolumn = useSelector(
  //   (state: RootState) => state.filterReducers.defaultOptionsColumn
  // );
  const userId = useSelector(
    (state: RootState) => state.loginReducer.userLoginInfo?.userDetail?._id
  );
  const showCustomizeName = () => {
    dispatch(setShowEditColumnName(true));
    dispatch(setShowColumnCustomizePop(false));
    //
  };
  //const reportingcolumn = useFetchFromSchema().reportColumns;
  //dispatch(setReportColumnInDnd(reportingcolumn));
  const handleApplyChange = () => {
    toast.success("Please wait ...");
    let temp = JSON.parse(JSON.stringify(allData.options));
    getOutOrder.forEach((each: any, i: number) => {
      temp = temp.map((e: any) => {
        if (e.id === each.id) {
          return { ...e, position: i + 2, isActive: true };
        } else {
          return e;
        }
      });
    });
    temp = temp.map((e: any) => {
      if (getOutOrder.find((ex: any) => ex.id === e.id)) {
        return { ...e, isActive: true };
      } else {
        if (
          e.originalName === "Sr. No" ||
          e.originalName === "Contact Number"
        ) {
          return { ...e, isActive: true };
        }
        return { ...e, isActive: false };
      }
    });
    // send temp to API temp
    const tempSchema = JSON.parse(JSON.stringify(schema));
    //console.log(isActivePageType,currentLoggerPage,sourceTab,channelTab,subModuleTab,"TABS")
   
    if (channelTab === "Call") {
      tempSchema[isActivePageType.toLowerCase()]["report"][sourceTab][
        channelTab
      ][!subModuleTab ? "Campaign" : subModuleTab]["reportColumns"] = temp;
    } else {
      tempSchema[isActivePageType.toLowerCase()]["report"][sourceTab][
        channelTab
      ][whatsappChannelTab][!subModuleTab ? "Campaign" : subModuleTab][
        "reportColumns"
      ] = temp;
    }
    //console.log(tempSchema,"MAKING--- TEMPSCHEMA")
    dispatch(updateSchemaRequest({ id: userId, schema: tempSchema }));
    dispatch(directlyUpdateSchema(tempSchema));

    dispatch(setShowColumnCustomizePop(false));
  };
  return createPortal(
    <div className={styles.fixed}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <p>Edit table columns</p>{" "}
          <img onClick={handleClose} src={cross} alt="X" />
          {/* <PravidIcons
            activeIcon={"cross"}
            onClick={handleClose}
            className={styles.crosimg}
            altText="X"
          /> */}
        </div>
        <div className={styles.separators}>
          <ColumnMultiselect options={allData} />
          <ColumnDnD setOut={setGetOutOrder} />
        </div>

        <div className={styles.bottomssetioon}>
          <div
            className={styles.tagsarea}
            onMouseOver={() => {
              setShowBlue(true);
            }}
            onMouseLeave={() => {
              setShowBlue(false);
            }}
          >
            {showBlue ? (
              <PravidIcons
                activeIcon={"blueTags"}
                onClick={showCustomizeName}
                className={styles.crosimg}
                altText="Names"
              />
            ) : (
              <PravidIcons
                activeIcon={"tags"}
                onClick={showCustomizeName}
                className={styles.crosimg}
                altText="Names"
              />
            )}

            <p
              onClick={showCustomizeName}
              style={
                showBlue
                  ? { color: "#0174ff", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
            >
              Custom Name
            </p>
          </div>
          <div>
            <button
              className={styles.applychanges}
              onClick={() => handleApplyChange()}
            >
              {" "}
              Apply Changes{" "}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root-portal")!
  );
}

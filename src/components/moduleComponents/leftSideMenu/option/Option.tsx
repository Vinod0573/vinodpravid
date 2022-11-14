import React from "react";
import { optionType } from "../leftSideMenu.interface";
import ImageComponent from "../../../generic/imageComponent/ImageComponent";
import styles from "./option.module.scss";
import PravidIcons from "./../../../generic/icon/PravidIcons";
import { Mixpanel } from "../../../../utils/mixpanelSetup";

interface props {
  optionData: any;
  setActiveOption: (optionData: any) => void;
  isOnlyIcons?: boolean;
  highlightedModule?: string;
  hideIcon?: boolean;
}

export default function Option({
  optionData,
  setActiveOption,
  highlightedModule,
  hideIcon,
}: props) {
  /* handlers */
  const handleOptionClick = () => {
  
    Mixpanel.track("Global | Left Menu_Analytics Module Button | Clicks" , {
      "module" : "Analytics"
     })
    setActiveOption(optionData);
  };
  return (
    <div
      className={`${styles.optionContainer} optionContainer`}
      style={
        highlightedModule === optionData.name
          ? { backgroundColor: optionData.activeColor, color: "white" }
          : { backgroundColor: optionData.inActiveColor, color: "black" }
      }
      onClick={handleOptionClick}
      id={"auto_leftMenu_option_" + optionData.name}
    >
      {!hideIcon && (
        // <ImageComponent
        //   extraClass={styles.leftMenu__icon}
        //   src={
        //     highlightedModule === optionData.name
        //       ? optionData.activeSrc
        //       : optionData.inactiveSrc
        //   }
        //   style={{ height: "18px" }}
        // />
        <PravidIcons
          activeIcon={optionData.activeIcon}
          inActiveIcon={optionData.inActiveIcon}
          isInActive={highlightedModule !== optionData.name}
          extraClass={styles.leftMenu__icon}
        />
      )}
      <span className={styles.optionName} id="auto_leftMenu_option_4">
        {optionData.displayName}
      </span>
    </div>
  );
}

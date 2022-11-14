import React from "react";
import styles from "./HeaderTabComponent.module.scss";
import styless from "../subModuleHeaderTab/SubModuleHeader.module.scss";
import PravidIcons from "../../generic/icon/PravidIcons";

export default function HeaderTabComponent(props: any) {
  const tabItem = (item: any) => {
    const highlight = props.selectedTab === item.name ? true : false;

    return (
      <>
        <div className={styles.headerTabDiv}>
          <div
            className={`${
              item.isDisabled
                ? styles.disablePointerDiv
                : styles.toggleTabComponent
            }`}
          >
            <div className={styles.titleTab}>
              <div
                className={styles.subHeaderTopDiv}
                id={"auto_subHeader_" + item.name.trim().replace(/\s/g, "")}
              >
                {item.inActiveIcon && item.activeIcon ? (
                  highlight && !item.isDisabled ? (
                    <PravidIcons
                      extraClass={styles.icon}
                      activeIcon={item.activeIcon}
                    />
                  ) : (
                    <PravidIcons
                      extraClass={styles.icon}
                      activeIcon={item.inActiveIcon}
                    />
                  )
                ) : (
                  // <img
                  //   className={styles.icon}
                  //   src={`${
                  //     highlight && !item.isDisabled
                  //       ? item.activeIcon
                  //       : item.icon
                  //   }`}
                  //   alt="Icon"
                  // />

                  ""
                )}
                <div
                  className={`${
                    styless.extraClasss
                      ? styless.extraClass
                      : `${
                          highlight && !item.isDisabled
                            ? styles.activeTab
                            : styles.tabDiv
                        }`
                  }`}
                >
                  {item.displayName}
                </div>
              </div>

              {highlight && !item.isDisabled && (
                <div
                  className={`${
                    styless.extraHozitonLineClasss
                      ? styless.extraHozitonLineClasss
                      : styles.horizonLine
                  }`}
                ></div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {props.sourceDetails.map((item: any, i: any) => {
        return (
          <div key={i}>
            <div
              onClick={(e) => !item.isDisabled && props.onClick(item.name)}
              id={"auto_header_" + item.name.trim().replace(/\s/g, "")}
            >
              {tabItem(item)}
            </div>
          </div>
        );
      })}
    </>
  );
}

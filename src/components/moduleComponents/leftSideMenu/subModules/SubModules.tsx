import React, { useEffect, useRef, useState } from "react";
import Option from "../option/Option";
import "./SubModules.scss";

interface props {
  subModulesArr: Array<any>;
  setActiveOption: (optionData: any) => void;
  activeSubModule: string;
  setActiveSubModule: (value: string) => void;
}

export default function SubModules(props: props) {
  const [subModules, setSubModules] = useState<Array<any>>([]);
  const ref = useRef<any>();

  useEffect(() => {
    const newArr = [...props.subModulesArr].sort(
      (a, b) => a?.position - b?.position
    );
    setSubModules(newArr);
  }, []);

  useEffect(() => {
    const listener = (e: any) => {
      if (ref.current) {
        if (!ref.current?.contains(e.target)) {
          props.setActiveSubModule("");
        }
      }
    };
    setTimeout(() => document.addEventListener("click", listener), 10);
    return () => document.removeEventListener("click", listener);
  }, [ref]);

  /* handlers */

  return (
    <div className="wrapper__subModule">
      <div className="inner-div" ref={ref}>
        {subModules.map((option, index) => {
          return (
            <div
              className="leftMenuOption__container"
              key={index}
              id="auto_main_subModule_3"
            >
              <Option
                optionData={option}
                setActiveOption={props.setActiveOption}
                hideIcon={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

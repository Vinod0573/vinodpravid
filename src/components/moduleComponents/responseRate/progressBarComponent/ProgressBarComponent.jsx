import React from 'react';
import "./ProgressBarComponent.css";

const ProgressBarComponent = (props) => {
    const {
        isLoading = props.percent === "loading",
        percent,
        size = "small",
        showInfo = false
    } = props;

    return (
        <>
            <div className="progress-outer">
                <div
                    className={`progress ${size ? "progress--" + size : ""} ${isLoading ? "progress--" + "loading" : ""
                        }`}
                >
                    <div className={`${props.extraClass? props.extraClass: "progress-bar"}`} style={{ width: percent + "%" }}></div>
                </div>

                {isLoading == false && showInfo ? (
                    <span className="progress-info">{percent}%</span>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};


export default ProgressBarComponent
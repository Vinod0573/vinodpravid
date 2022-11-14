import React from "react";
import "./ResponseRate.css";
import ProgressBarComponent from "./progressBarComponent/ProgressBarComponent";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as dashboardAction from "../../../../../Documents/Dashboard/Chat-History-Dashboard/src/actions/dashboardActions";
import NoDatamodel from "../../generic/noDatamodel/NoDatamodel";
import { noPhoneDataIcon } from "../../../theme/assets/svg";
const ResponseRate = (props) => {
  let accountName = props.userLoginInfo?.userDetail.accountDetails[0].name;
  accountName = accountName?.toString().toLowerCase();

  if (accountName === "saarthi demo" && props.isselectedTab == "payment") {
    var config = props.isConfig?.[0][accountName].payment;
  } else if (
    accountName === "saarthi demo" &&
    props.isselectedTab == "customer"
  ) {
    var config = props.isConfig?.[0][accountName].customer;
  } else {
    var config = props.isConfig?.[0][accountName].campaign;
  }

  let total = config?.responseRateChart?.chart?.total;
  var rateArr = [
    {
      icon: config?.responseRateChart?.chart?.icon1,
      title: config?.responseRateChart?.chart?.title1,
      value: ((100 * config?.responseRateChart?.chart?.value1) / total).toFixed(
        0
      ),
    },
    {
      icon: config?.responseRateChart?.chart?.icon2,
      title: config?.responseRateChart?.chart?.title2,
      value: ((100 * config?.responseRateChart?.chart?.value2) / total).toFixed(
        0
      ),
    },
    {
      icon: config?.responseRateChart?.chart?.icon3,
      title: config?.responseRateChart?.chart?.title3,
      value: ((100 * config?.responseRateChart?.chart?.value3) / total).toFixed(
        0
      ),
    },
    {
      icon: config?.responseRateChart?.chart?.icon4,
      title: config?.responseRateChart?.chart?.title4,
      value: ((100 * config?.responseRateChart?.chart?.value4) / total).toFixed(
        0
      ),
    },
  ];
  return (
    <div className="responseRateMainDiv">
      {config?.responseRateChart?.chart?.value1 ||
      config?.responseRateChart?.chart?.value2 ||
      config?.responseRateChart?.chart?.value3 ||
      config?.responseRateChart?.chart?.value4 ? (
        <div>
          {rateArr.map((each, i) => {
            return (
              <div key={i} className="responseRate">
                <div className="icons">
                  <img src={each.icon} />
                </div>
                <div className="name">{each.title}</div>
                <div style={{ width: "50%" }}>
                  <ProgressBarComponent
                    isLoading={false}
                    percent={each.value}
                    size={"large"}
                    showInfo={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="notFound">
          <NoDatamodel srcImg={noPhoneDataIcon}></NoDatamodel>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chartData: state.dashboardReducer.chartData,
    isWarranty: state.dashboardReducer.warranty,
    isselectedTab: state.dashboardReducer.selectedTab,
    isConfig: state.dashboardReducer.config,
    userLoginInfo: state.loginReducer?.userLoginInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, dashboardAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ResponseRate);

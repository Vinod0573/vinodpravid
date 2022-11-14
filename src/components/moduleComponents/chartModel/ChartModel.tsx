import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../generic/loader/Loader";
import AnalyticsCard from "../analyticsCard/AnalyticsCard";
import StackedBarChart from "../charts/StackedBarChart";
import PravidIcons from "../../generic/icon/PravidIcons";
import styles from "./ChartModel.module.scss";
import ChartDownloadComponent from "../chartDownloadComponent/ChartDownloadComponent";
import DonutChartComponent from "../donutChartComponent/DonutChartComponent";
import SimpleBarChart from "../charts/SimpleBarChart";
import LineChart from "../charts/lineChart";
import BarLineChart from "../charts/BarLineChart";
import Disposition from "../disposition/Disposition";
import { useScreenshot } from "use-screenshot-hook";
import {
  getExpandedChart,
  getSortedChart,
} from "../../../redux/analytics/actions";
import { RootState } from "../../../redux";
import { getAnalyticsChartDownloadCSV } from "../../../redux/analytics/actions";
import Html2Pdf from "js-html2pdf";
import moment from "moment";
import useOnClickOutside from "../../../utils/useOnClickOutside";
import BiaxialBarChart from "../charts/BiaxialBarChart";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { Mixpanel } from "../../../utils/mixpanelSetup";

interface props {
  default: string;
}

export default function ChartModel(props: any) {
  const [downloadChartName, setDownloadChartName] = useState<string>();
  const [isDownload, setIsDownload] = useState<boolean>(false);
  const [expandTitle, setExpandedTitle] = useState<any | undefined>([]);

  const dispatch = useDispatch();
  const deepChartData = JSON.parse(JSON.stringify(props.chartData));

  // const testRef = useRef(null);
  const downloadRef = useRef<any>();
  useOnClickOutside(downloadRef, () => setIsDownload(false));

  // const { image, takeScreenshot, isLoading, clear } = useScreenshot({
  //   ref: testRef,
  // });
  // const download = (image: any = {}) => {
  //   const a = document.createElement("a");
  //   a.href = image;
  //   a.download = "image.jpg";
  //   a.click();
  // };

  //To Capture Image with Scroll
  const handleCaptureClick = async (i: number) => {
    const printChartElement: any = document.querySelector(`#printChart${[i]}`);

    if (!printChartElement) return;
    const copiedPrintChartElement = printChartElement?.cloneNode(
      true
    ) as HTMLElement;

    copiedPrintChartElement.style.position = "fixed";
    copiedPrintChartElement.style.height = "auto";
    copiedPrintChartElement.style.width = "auto";
    copiedPrintChartElement.style.padding = "20px";
    copiedPrintChartElement.style.background = "#000";
    const printChartClone = copiedPrintChartElement.querySelectorAll(
      'div[data-id="chartViewOnPrint"]'
    );
    printChartClone.forEach((x: any) => {
      // x.style.maxWidth = "100%";
      x.style.width = "100%";
      x.style.height = "100%";
    });
    document.body.append(copiedPrintChartElement);
    const canvas = await html2canvas(copiedPrintChartElement, {
      useCORS: true,
      scale: 3,
    });
    copiedPrintChartElement.remove();
    const dataURL = canvas.toDataURL("image/png", 1.0);
    downloadjs(dataURL, "download.png", "image/png");
    Mixpanel.track("Analytics | Download Graph Data | Clicks" , {
      "module" : "Analytics",
      "name" : i,
      "fileType" : "png"
 
     })
  };

  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );

  const filterSelectedDate = useSelector(
    (store: RootState) => store?.filterReducers?.calenderData
  );

  const isExpand = useSelector(
    (store: RootState) => store?.analyticsReducer?.isExpand
  );

  const expandedChart = useSelector(
    (store: RootState) => store?.analyticsReducer?.expandedChart
  );

  const isSortedView = useSelector(
    (store: RootState) => store?.analyticsReducer?.isSort
  );

  const sortedChart = useSelector(
    (store: RootState) => store?.analyticsReducer?.sortedChart
  );

  const selectedFilters = useSelector(
    (state: RootState) => state?.filterReducers?.selectedFilterOptions
  );

  const isViewMore = useSelector(
    (store: RootState) => store?.analyticsReducer?.isViewMore
  );

  const viewMoreChart = useSelector(
    (store: RootState) => store?.analyticsReducer?.viewMoreChart
  );

  const propsKpi = JSON.parse(JSON.stringify(props?.kpiDetails));
  const kpiDetailsArr =
    propsKpi && Object.keys(propsKpi)?.length > 0 ? Object.keys(propsKpi) : [];
  const chartData =
    propsKpi && Object.values(propsKpi["charts"]).length > 0
      ? Object.values(
          propsKpi["charts"].sort((a: any, b: any) => {
            return a.position - b.position;
          })
        )
      : [];

  const getIsExpandView = (title: string) => {
    if (title) {
      const temp = expandTitle;
      const index = temp.indexOf(title);
      if (index > -1) {
        temp.splice(index, 1);
        dispatch(getExpandedChart(false, temp));
        setExpandedTitle(temp);
      } else {
        temp.push(title);
        dispatch(getExpandedChart(true, temp));
        Mixpanel.track("Analytics | Expand Graph |Clicks" , {
          "module" : "Analytics",
          "name" : title
         })
        setExpandedTitle(temp);
      }
    }
  };

  const getIsDownload = (title: string) => {
    if (title) {
      setIsDownload(!isDownload);
      setDownloadChartName(title);
    }
  };

  const getIsSort = (title: string) => {
    if (title) {
      dispatch(getSortedChart(!isSortedView, title));
      Mixpanel.track("Analytics | Sort Feature |Clicks" , {
        "module" : "Analytics",
        "name" : title
       })
    }
  };

  const getDownloadCsvData = (data: any) => {
    const bodyData = {
      username: accountName,
      start_date:
        filterSelectedDate.formatedStartDate === undefined ||
        filterSelectedDate.formatedStartDate === ""
          ? moment(new Date()).format("YYYY-MM-DD")
          : filterSelectedDate.formatedStartDate,

      end_date:
        filterSelectedDate.formatedEndDate === undefined ||
        filterSelectedDate.formatedEndDate === ""
          ? moment(new Date()).format("YYYY-MM-DD")
          : filterSelectedDate.formatedEndDate,
      source: [props.source],
      channel: [props.channel],
      ...(props.whatsappChannel && {
        communicationType: [props.whatsappChannel],
      }),
      ...selectedFilters,
    };
    dispatch(
      getAnalyticsChartDownloadCSV({
        kpiDetails: data,
        filters: bodyData,
      })

    );
    Mixpanel.track("Analytics | Download Graph Data | Clicks" , {
     "module" : "Analytics",
     "name" : data?.chartTitle,
     "fileType" : "CSV"

    })
  };

  function scrollToRightView(e: any, i: any) {
    document.getElementById("chartModel" + i)!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  useEffect(() => {
    // if(isViewMore){
    getIsExpandView(viewMoreChart);
    // }
  }, [isViewMore]);

  return (
    <>
      <div className={styles.chartModelTopDiv}>
        {kpiDetailsArr?.map((each: any, i: any) => {
          return (
            <div key={i}>
              {each === "cards" && propsKpi[each]?.length > 0 ? (
                <div>
                  {deepChartData ? (
                    <div>
                      <AnalyticsCard
                        cardDetails={props.kpiDetails["cards"]}
                        data={deepChartData}
                      />
                      {/* <div className="html2pdf__page-break"></div> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : each === "charts" ? (
                <div className={styles.allChartBody} id="allChartBody">
                  {chartData.map((each: any, i: any) => {
                    if (!each.isActive) return null;
                    return (
                      <div
                        // ref={
                        //   isDownload && each.chartTitle === downloadChartName
                        //     ? testRef
                        //     : null
                        // }
                        key={i}
                        // id={
                        //   isDownload && each.chartTitle === downloadChartName
                        //     ? "printChart"
                        //     : undefined
                        // }
                        id={`printChart${i}`}
                        className="printEachChart"
                      >
                        {/* <div className="html2pdf__page-break"></div> */}
                        {/* {i !== 0 ? (
                          <div className="html2pdf__page-break"></div>
                        ) : (
                          ""
                        )} */}

                        <div
                          key={i}
                          className={styles.chartView}
                          id={"chartModel" + i}
                          data-id="chartViewOnPrint"
                          // style={
                          //   expandTitle.includes(each.chartTitle)
                          //     ? each.expand.expandStyle
                          //     : each.chartStyle
                          // }
                          style={{
                            width: expandTitle.includes(each.chartTitle)
                              ? each.expand.expandStyle.width
                              : each.chartStyle.width,
                            height: expandTitle.includes(each.chartTitle)
                              ? each.expand.expandStyle.height
                              : each.chartStyle.height,
                            minWidth: expandTitle.includes(each.chartTitle)
                              ? "1100px"
                              : "550px",
                            minHeight: expandTitle.includes(each.chartTitle)
                              ? "750px"
                              : "412px",
                          }}
                        >
                          <div className={styles.chartHeader}>
                            <div className={styles.chartTitle}>
                              {each.chartTitle}
                            </div>
                            <div className={styles.chartIcons}>
                              {each.download?.showDownloadButton &&
                                !props.loading && (
                                  <div
                                    onClick={() =>
                                      getIsDownload(each.chartTitle)
                                    }
                                    id="auto_analytics_download"
                                  >
                                    {/* <img
                                      className={styles.icons}
                                      src={downloadIcon}
                                    /> */}
                                    <PravidIcons
                                      extraClass={styles.icons}
                                      activeIcon={"downloadIcon"}
                                    />
                                    {isDownload &&
                                      each.chartTitle === downloadChartName && (
                                        <div
                                          ref={downloadRef}
                                          className={styles.downloadComponent}
                                        >
                                          <ChartDownloadComponent
                                            onClickScreenshot={() => {
                                              toast.success(
                                                "Please Wait ... Downloading "
                                              );
                                              // takeScreenshot().then(download)
                                              setTimeout(() => {
                                                handleCaptureClick(i);
                                                // console.log("sfdjhfgku");
                                              }, 500);
                                            }}
                                            onClickCsvData={() => {
                                              toast.success(
                                                "Please Wait ... Downloading "
                                              );
                                              getDownloadCsvData(each);
                                            }}
                                          />
                                        </div>
                                      )}
                                  </div>
                                )}

                              {each.sort?.showSortButton && (
                                <div
                                  onClick={() => getIsSort(each.chartTitle)}
                                  id="auto_analytics_sort"
                                >
                                  {isSortedView &&
                                  each.chartTitle === sortedChart ? (
                                    <PravidIcons
                                      extraClass={styles.icons}
                                      activeIcon={"asc"}
                                    />
                                  ) : (
                                    <PravidIcons
                                      extraClass={styles.icons}
                                      activeIcon={"desc"}
                                    />
                                  )}
                                </div>
                              )}

                              {each.expand?.showExpandButton && (
                                <div
                                  onClick={() => {
                                    getIsExpandView(each.chartTitle);
                                    setTimeout(() => {
                                      scrollToRightView(each, i);
                                    }, 50);
                                  }}
                                  id="auto_analytics_expand"
                                >
                                  {expandTitle.includes(each.chartTitle) ? (
                                    // <img
                                    //   className={styles.icons}
                                    //   src={contractIcon}
                                    //   alt="Contract"
                                    // />
                                    <PravidIcons
                                      extraClass={styles.icons}
                                      activeIcon={"contract"}
                                    />
                                  ) : (
                                    // <img
                                    //   className={styles.icons}
                                    //   src={expandIcon}
                                    //   alt="expand"
                                    // />
                                    <PravidIcons
                                      extraClass={styles.icons}
                                      activeIcon={"expand"}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={styles.chartBody}
                            // style={
                            //   isExpandedView && each.chartTitle === expandedChart
                            //     ? each.expand.expandStyle
                            //     : each.chartStyle
                            // }
                          >
                            {each.chartType === "stackedBarChart" ? (
                              deepChartData && !props.isLoading ? (
                                <StackedBarChart
                                  chartDetails={each}
                                  // data={props.chartData}
                                  chartTitle={each.chartTitle}
                                  data={deepChartData}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "donut" ? (
                              deepChartData && !props.isLoading ? (
                                <DonutChartComponent
                                  chartDetails={each}
                                  // data={props.chartData}
                                  chartTitle={each.chartTitle}
                                  data={deepChartData}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "barChart" ? (
                              deepChartData && !props.isLoading ? (
                                <SimpleBarChart
                                  chartDetails={each}
                                  //  data={props.chartData}
                                  chartTitle={each.chartTitle}
                                  data={deepChartData}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "lineChart" ? (
                              deepChartData && !props.isLoading ? (
                                <LineChart
                                  chartDetails={each}
                                  // data={props.chartData}
                                  chartTitle={each.chartTitle}
                                  data={deepChartData}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "barlineChart" ? (
                              deepChartData && !props.isLoading ? (
                                <BarLineChart
                                  chartDetails={each}
                                  // data={props.chartData}
                                  chartTitle={each.chartTitle}
                                  data={deepChartData}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "pieChart" ? (
                              deepChartData && !props.isLoading ? (
                                <Disposition
                                  chartDetails={each}
                                  data={props.chartData}
                                  chartTitle={each.chartTitle}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : each.chartType === "biaxialBarChart" ? (
                              deepChartData && !props.isLoading ? (
                                <BiaxialBarChart
                                  chartDetails={each}
                                  data={props.chartData}
                                  chartTitle={each.chartTitle}
                                />
                              ) : (
                                <Loader />
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

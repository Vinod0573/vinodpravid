// import React from "react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/moduleComponents/navigationBar/NavigationBar";
import LeftMenu from "../../components/moduleComponents/leftSideMenu/LeftSideMenu";
import RightSideBarRoute from "../../router/subRoutes/RightSideBarRoute";
import SubHeaderRoute from "../../router/subRoutes/SubHeaderRoute";
import { useReactToPrint } from "react-to-print";
import { useScreenshot } from "use-screenshot-hook";
import Html2Pdf from "js-html2pdf";
import { refreshApi, setDownloadViewAll } from "../../redux/filters/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/rootStore";
import { setRootPortalScreen } from "../../redux/baseScreen/baseScreenState/actions";
import jsPDF from "jspdf";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

import "./BaseScreen.scss";

export default function BaseScreen() {
  const activePage = useSelector(
    (store: RootState) => store?.loginReducer?.isActivePageType
  );
  const rootPortal = useSelector(
    (store: RootState) => store?.baseScreen?.baseScreenState?.rootPortalScreen
  );
  const dispatch = useDispatch();

  const screenRef = useRef(null);
  const { image, takeScreenshot, isLoading, clear } = useScreenshot({
    ref: screenRef,
  });
  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );

  useEffect(() => {
    dispatch(refreshApi(accountName));
  }, [accountName]);

  const handleCaptureClick = useCallback(async () => {
    const fullScreenElement = document.getElementById("fullscreen")!;
    if (!fullScreenElement) return;
    const copiedFullScreenElement = fullScreenElement.cloneNode(
      true
    ) as HTMLElement;
    copiedFullScreenElement.style.position = "fixed";
    // copiedFullScreenElement.style.right = "100%";
    copiedFullScreenElement.style.height = "auto";

    //To Capture the data in scroll
    const printChart = copiedFullScreenElement.querySelectorAll(
      'div[data-id="chartViewOnPrint"]'
    );
    printChart.forEach((x: any) => {
      // x.style.maxWidth = "100%";
      x.style.width = "100%";
      x.style.paddingLeft = "20px";
      x.style.paddingRight = "20px";
      x.style.background = "#f8f9fa";
      x.style.height = "100%";
    });

    // const printCharts =
    //   copiedFullScreenElement.querySelector<HTMLElement>("#allChartBody")!;
    // printCharts.style.display = "block";

    document.body.append(copiedFullScreenElement);

    const canvas = await html2canvas(copiedFullScreenElement, {
      useCORS: true,
      scale: 3,
    });

    copiedFullScreenElement.remove();

    const dataURL = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(dataURL);
    const width = pdf.internal.pageSize.getWidth();
    const ratio = width / imgProps.width;
    const height = ratio * imgProps.height;
    pdf.internal.pageSize.height = height;
    pdf.addImage(dataURL, "PNG", 0, 0, width, height);

    //To Download PDF
    pdf.save("AnalyticsScreen.pdf");
    //To Download Image
    // downloadjs(dataURL, "download.png", "image/png");
  }, []);

  // const downloadAnalytics = useReactToPrint({
  //   content: () => screenRef.current,
  //   copyStyles: true,
  //   onPrintError: (error) => console.log(error),
  //   print: async (printIframe: HTMLIFrameElement) => {
  //     const document = printIframe.contentDocument;
  //     if (document) {
  //       const html = document.getElementById("fullscreen");
  //       const exporter = new Html2Pdf(html, {
  //         margin: 0,
  //         filename: "AnalyticsScreen.pdf",
  //         image: { type: "jpeg", quality: 0.98 },
  //         html2canvas: {
  //           margin: 0,
  //           logging: true,
  //           dpi: 700,
  //           scale: 595.28 / 295,
  //         },
  //         jsPDF: {
  //           orientation: "l",
  //         },
  //       });
  //       await exporter.getPdf(true);
  //     }
  //   },
  // });

  const downloadAnalyticsState = useSelector(
    (state: RootState) => state.filterReducers.downloadViewAll
  );

  useEffect(() => {
    if (rootPortal) {
      dispatch(setRootPortalScreen(""));
    }
  }, [activePage]);

  useEffect(() => {
    if (downloadAnalyticsState === "InActive") {
      //
    } else {
      handleCaptureClick();
      dispatch(setDownloadViewAll("InActive"));
      // takeScreenshot()
      //   .then(downloadAnalytics)
      //   .then(() => dispatch(setDownloadViewAll("InActive")));
    }
  }, [downloadAnalyticsState]);

  return (
    <div className="wrapper__base-screen">
      <div className="header">
        <HeaderComponent />
      </div>
      <div className="base-screen__body">
        <div className="base-screen__left-menu">
          <LeftMenu />
        </div>
        <div id="fullscreen" className="base-screen__center" ref={screenRef}>
          <div className="sub-header">
            <SubHeaderRoute />
          </div>
          <div className="dynamic-screen">
            <Outlet />
          </div>
        </div>
        <div className="base-screen__right-menu">
          <RightSideBarRoute />
        </div>
      </div>
    </div>
  );
}

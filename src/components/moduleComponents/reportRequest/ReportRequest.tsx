import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ReportRequest.module.scss";
import ErrorMessage from "../../generic/errorMessage/ErrorMessage";
import UploadFileInput from "../uiKit/uploadFile/UploadFile";
import Description from "../uiKit/description/Description";
import TitleInput from "../uiKit/titleComponent/TitleComponent";
import SuccessfulUI from "../uiKit/successfulMessageUI/SuccessfulMessage";
import { crossIcon } from "../../../theme/assets/genericSvg";
import Button from "../../generic/button/Button";
import { AppDispatch, RootState } from "../../../redux/rootStore";
import { getrequestFeature } from "../../../redux/onboarding/login/actions";

interface props {
  default: string;
}

export default function ReportRequest(props: any) {
  const accountName = useSelector(
    (store: RootState) =>
      store?.loginReducer?.userLoginInfo?.accountDetails[0]?.name
  );
  const isSuccessReducer = useSelector(
    (store: RootState) => store?.loginReducer?.isSuccess
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [allDataToPost, setAllDataToPost] = useState<any | undefined>({
    title: "",
    description: "",
    accountName: "",
    file: null,
  });
  const [isError, setIsError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setAllDataToPost((prev: any) => allDataToPost);
  }, [allDataToPost]);

  useEffect(() => {
    if (isSuccessReducer === true) {
      setIsSuccess(true);
      setAllDataToPost(null);
    }
  }, [isSuccessReducer]);
  const onChangeValue = (e: any, type: any) => {
    setIsError("");
    // const { name, value } = e.target;
    if (type === "title") {
      const { name, value } = e.target;
      setAllDataToPost((prev: any) => {
        return {
          ...prev,
          title: value,
        };
      });
    } else if (type === "description") {
      const { name, value } = e.target;
      setAllDataToPost((prev: any) => {
        return {
          ...prev,
          description: value,
        };
      });
    } else if (type === "file") {
      const tempfile = e.target.files[0];
      setAllDataToPost((prev: any) => {
        return {
          ...prev,
          file: tempfile,
        };
      });
    }
  };

  // To post the report bug
  const handleSubmitRR = () => {
    if (!allDataToPost.title) {
      setIsError("Please fill title and description");
      return;
    }
    if (!allDataToPost.description) {
      setIsError("Please fill title and description");
      return;
    }

    const formBodyData = new FormData();
    formBodyData.append("title", allDataToPost?.title);
    formBodyData.append("description", allDataToPost?.description);
    formBodyData.append("accountName", accountName);

    formBodyData.append("file", allDataToPost?.file);
    // console.log(props.propsOption[1], "899999");
    if (props.propsOption[1] === "Feature Request") {
      dispatch(getrequestFeature(formBodyData));
    }
    // if (props.propsOption[1] === "Report a Bug") {
    //   postReportBugUrl = SERVER_URL + ONBOARDING_URL.REPROT_BUG;
    // } else if (props.propsOption[1] === "Feature Request") {
    //   postReportBugUrl = SERVER_URL + ONBOARDING_URL.REQUEST_FEATURE;
    // }
    // const token = await sessionStorage.getItem("token");
    // const id = await sessionStorage.getItem("Id");
    // const res = await axios
    //   .post(postReportBugUrl, formBodyData, {
    //     headers: {
    //       "content-type":"multipart/form-data"
    //     },
    //   })
    //   .then((res) => {
    //     // const tempData = res.data.data;
    //     // setAllUserList(res.data.data);
    //     setIsSuccess(prev =>true);
    //     setAllDataToPost( prev => null);
    //   })
    //   .catch((e) => {
    //     setIsError(e);
    //   });
  };
  // console.log(props.propsOption,"899")

  const handleSubmitAgain = (value: any) => {
    setIsSuccess((prev) => value);
    setAllDataToPost((prev: any) => {
      return {
        ...prev,
        title: "",
        description: "",
        accountName: "",
        file: null,
      };
    });
  };
  return (
    <>
      {isSuccess ? (
        <SuccessfulUI
          propsOption={props.propsOption}
          toCloseRRModel={() => props.toCloseRRModel()}
          handleSubmitAgain={(isAgain: any) => handleSubmitAgain(isAgain)}
        />
      ) : (
        <div className={styles.reportRequestTopDiv}>
          <div>
            <div className={styles.RRClosingDiv}>
              {" "}
              <img
                src={crossIcon}
                alt="cross icon"
                onClick={() => props.toCloseRRModel()}
              />
            </div>
            <div className={styles.RRHeadingDiv}>
              {" "}
              <h2> {props.propsOption[1]} </h2>
            </div>
            <div className={styles.RRAllInputTop}>
              <TitleInput
                onChangeValue={(e: any) => onChangeValue(e, "title")}
              />
              <Description
                onChangeValue={(e: any) => onChangeValue(e, "description")}
              />
              <UploadFileInput
                onChangeValue={(e: any) => onChangeValue(e, "file")}
              />
              <div className={styles.RRInput}>
                {isError && (
                  <ErrorMessage
                    errorMessage={isError}
                    extraClass={styles.errorMessageDivRR}
                  />
                )}

                <div className={styles.RRSaveButtonDiv}>
                  <Button
                    extraClass={styles.RRSaveButton}
                    text="Submit"
                    onClick={() => handleSubmitRR()}
                    disabled={
                      allDataToPost["title"]?.length < 3 ||
                      allDataToPost["description"]?.length < 3
                        ? true
                        : false
                    }
                  />
                  {/* <button
                className="RRSaveButton"
                onClick={() => handleSubmitRR()}
              >
                {" "}
                Submit{" "}
              </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

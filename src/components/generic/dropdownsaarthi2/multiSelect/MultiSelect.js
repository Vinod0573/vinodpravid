import React, { PureComponent, useState, useEffect } from 'react'
import "./MultiSelect.css"
import Axios from "axios";
import searchIcon from "../../../../theme/assets/svg/onboarding/searchIcon.svg"
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
 import * as campaignAction from "../../../../redux/campaign/actions";
import moment from "moment";
import { te } from 'date-fns/locale';
import Checkbox from '../../checkbox/Checkbox';

const race = ['Azure Female', 'Iron Dwarf', 'Highborn Human', 'Lowland Human', 'Mountain Dwarf', 'Scythian Elf', 'Woodland Elf'];

function MultiSelect(props) {
    let accountName = sessionStorage.getItem("accountName");
    accountName = accountName.toString().toLowerCase();
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [filterData, setFilter] = useState()
    const [resetData, setResetData] = useState()
    const [selectedData, setSelectedData] = useState([])
    const [selectFlow, setSelectFlow] = useState([])
    const [selectDisposition, setSelectDisposition] = useState([])
    const [selectStatus, setSelectStatus] = useState([])
    const [searchData, setSearchData] = useState('')
    const [selectRegion, setSelectRegion] = useState([])
    const [selectDuration, setSelectDuration] = useState([])
    const [selectCategory, setSelectCategory] = useState([])
    const [connectorObjectData, setconnectorObjectData] = useState([]);
    const [customerData, setCustomerData] = useState([])
    const [fetchData,setFetchData]=useState([])

    useEffect(() => {
    
        if (props.filterName[1] === 0) {
            props.setconnectorObject("SET_CONNECTOR_OBJECT_DATA_ONE", connectorObjectData)
        } else if (props.filterName[1] === 1) {
            props.setconnectorObject("SET_CONNECTOR_OBJECT_DATA_TWO", connectorObjectData)
        } else if (props.filterName[1] === 2) {
            props.setconnectorObject("SET_CONNECTOR_OBJECT_DATA_THREE", connectorObjectData)
        }
        props.selectItems(connectorObjectData);
    }, [connectorObjectData]);

    useEffect(() => {
        if (props.customerDataType?.length > 0) {
            setCustomerData(props.customerDataType)
        }
    }, [props.customerDataType]);

    useEffect(() => {
        if (props.flowtype?.length > 0) {
            setSelectFlow(props.flowtype)
        }
    }, [props.flowtype]);

    useEffect(() => {
        if (props.languageType?.length > 0) {
            setSelectedData(props.languageType)
        }
    }, [props.languageType]);

    useEffect(() => {
        if (props.regiontype?.length > 0) {
            setSelectRegion(props.regiontype)
        }
    }, [props.regiontype]);


    useEffect(() => {
        if (props.dispositiontype?.length > 0) {
            setSelectDisposition(props.dispositiontype)
        }
    }, [props.dispositiontype])

    useEffect(() => {
        if (props.statustype?.length > 0) {
            setSelectStatus(props.statustype)
        }
    }, [props.statustype])

    useEffect(() => {
        if (props.durationtype?.length > 0) {
            setSelectDuration(props.durationtype)
        }
    }, [props.durationtype])
    useEffect(() => {
        if (props.categorytype?.length > 0) {
            setSelectCategory(props.categorytype)
        }
    }, [props.categorytype])

    useEffect(() => {
        if (props.connectorType?.length > 0) {
            setconnectorObjectData(props.connectorType)
        }
    }, [props.connectorType]);

    useEffect(() => {
        if (props.selectedItems && props.selectedItems.length > 0) {
            setconnectorObjectData(props.selectedItems.split(","));
        }
    }, [props.selectedItems]);

    useEffect(() => {
        if (props.editedItem && props.editedItem.length > 0) {
            setconnectorObjectData([...props.editedItem]);
        }
    }, [props.editedItem]);
 
    useEffect(()=>{
        if(props.selectedItems && props.selectedItems.length>0){
            setFetchData([...props.selectedItems])
        }

    },[props.selectedItems])


    useEffect(() => {
        if (props.filterList) {
            // , "", "Language", "Flow"
            if (props.filterName == "Campaign Name") {
                setFilter([])
                setResetData([])

            } else if (props.filterName == "Region") {
                let filterData = props.filterList?.region ? Object.values(props.filterList?.region).filter(e => e) : ""
                let setselected = props.regiontype?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)

            } else if (props.filterName == "Language") {
                let filterData = props.filterList?.language ? Object.values(props.filterList?.language) : ""
                let setselected = props.languageType?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)
            } else if (props.filterName == "Disposition") {
                let filterData = props.filterList?.disposition ? Object.values(props.filterList?.disposition) : ""
                let setselected = props.dispositiontype?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)

            } else if (props.filterName == "Status") {
                // let filterData = ["Calls > 15 seconds","Calls < 15 seconds"]
                let filterData = ["Connected", "Not Connected"]
                let setselected = props.statustype?.length == filterData?.length
           
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)
            } else if (props.filterName == "Call duration") {
                let filterData = props.filterList?.status ? Object.values(props.filterList.status) : ""
                let setselected = props.duration?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)
            }
            else if (props.filterName == "Inquiry Category") {
                let filterData = props.filterList?.category? Object.values(props.filterList.category) : ""
                let datas= props.categorytype? Object.keys(props.categorytype)?.length:0
                let setselected = datas == filterData?.length
               
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)
            }
            else if (props.filterName[0] == "Sf Object Field") {
               
                let filterData = props.filterList
                // let setselected=props.filterList?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                // setselected && setIsSelectAll(true)
            } else if (props.filterName == "customer-data") {
               
                let filterData = props.filterList.list
                setFilter(filterData)
                setResetData(filterData)
            }else if (props.filterName == "fetch sf field") {
                let filterData = props.filterList.list
                setFilter(filterData)
                setResetData(filterData)
            } else {
                let filterData = props.filterList?.flow_type ? Object.values(props.filterList.flow_type) : ""
                let setselected = props.flowtype?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)

            }

            // setFilter(filterList)
        }
    }, [props.filterList])
 
    // useEffect(() => {
        
    //     setFetchData(props.fetchConnectorFieldData)
    //     },[props.fetchConnectorFieldData]
    // )

    const getIsAllChecked = (e) => {
        let checked = e

        if (checked == false) {
            if (props.filterName == "Region") {
                setSelectRegion([])
                setIsSelectAll(false)

            }
            if (props.filterName == "Language") {
                setSelectedData([])
                setIsSelectAll(false)

                // props.setSelectedLanguage("SET_LANGUAGE", [])

            }
            if (props.filterName == "Disposition") {
                setSelectDisposition([])
                setIsSelectAll(false)

                // props.setDispositionType("SET_DISPOSITION", [])

            }
            if (props.filterName == "Status") {
                setSelectStatus([])
                setIsSelectAll(false)

                // props.setStatusType("SET_STATUS", [])

            }
            if (props.filterName == "Call duration") {
                setSelectStatus([])
                setIsSelectAll(false)

                // props.setStatusType("SET_STATUS", [])

            }
            if (props.filterName == "Flow") {
                setSelectFlow([])
                setIsSelectAll(false)

                // props.setFlowType("SET_FLOW_TYPE", [])

            }
            if (props.filterName[0] == "Sf Object Field") {
                setconnectorObjectData([])
                setIsSelectAll(false)

                // props.setStatusType("SET_STATUS", [])

            }
            if (props.filterName == "customer-data") {
                setCustomerData([])
                setIsSelectAll(false)
            }
            if(props.filterName == "fetch sf field"){
                setFetchData([])
                setIsSelectAll(false)
            }
            if (props.filterName == "Inquiry Category") {
                setSelectCategory([])
                setIsSelectAll(false)
            }

        } else {
            if (props.filterName == "Region") {
                setSelectRegion(filterData)
            }
            if (props.filterName == "Call duration") {
                setSelectDuration(filterData)
            }
            if (props.filterName == "Language") {
                setSelectedData(filterData)
            }
            if (props.filterName == "Disposition") {
                setSelectDisposition(filterData)
            }
            if (props.filterName == "Status") {
                setSelectStatus(filterData)
            }
            if (props.filterName == "Flow") {
                setSelectFlow(filterData)
            }
            // console.log(props.filterName,"78676")
            if (props.filterName == "Inquiry Category") {
                setSelectCategory(filterData)
            }
            if (props.filterName[0] == "Sf Object Field") {
                setconnectorObjectData(filterData)
            }
            if (props.filterName == "customer-data") {
                setCustomerData(filterData)
            }
            if (props.filterName == "fetch sf field") {
              
                setFetchData(filterData)
            }
            setIsSelectAll(checked)
        }

    }

    const getChecked = (checked, data, index) => {
        if (filterData?.includes("Hindi")) {

            if (selectedData?.includes(data)) {
                let tempArr = selectedData
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectedData(prevState => {
                    return [...tempArr]
                })

            } else {
                setSelectedData(prevState => {
                    return [...prevState, data]

                })

            }
        } else if (props.filterName == "Region") {

            if (selectRegion?.includes(data)) {

                let tempArr = selectRegion
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectRegion(prevState => {
                    return [...tempArr]
                })
            } else {
                setSelectRegion(prevState => {
                    return [...prevState, data]

                })
            }


        } else if (props.filterName == "Inquiry Category") {

            if (selectCategory?.includes(data)) {

                let tempArr = selectCategory;
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                // console.log(selectRegion)
                setSelectCategory(prevState => {
                    return [...tempArr]
                })
            } else {
                setSelectCategory(prevState => {
                    return [...prevState, data]

                })
            }
        }else if (props.filterName == "Call duration") {
            if (selectDuration?.includes(data)) {
                let tempArr = selectDuration
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectDuration(prevState => {
                    return [...tempArr]
                })

            } else if (props.filterName == "Connector Dropdown") {
                let filterData = props.filterList?.data ? props.filterList?.data : ""
                let setselected = props.filterList?.data?.length == filterData?.length
                setFilter(filterData)
                setResetData(filterData)
                setselected && setIsSelectAll(true)
            } else {
                let tempArr = []
                tempArr.push(data)
                setSelectDuration(tempArr)
                // setSelectDuration(prevState => {
                //     return [...prevState, data]

                // })

            }

        }
        else if (props.filterName == "Disposition") {
            if (selectDisposition?.includes(data)) {
                let tempArr = selectDisposition
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectDisposition(prevState => {
                    return [...tempArr]
                })

            } else {
                setSelectDisposition(prevState => {
                    return [...prevState, data]

                })

            }

        } else if (props.filterName == "Status") {
            if (selectStatus?.includes(data)) {
                let tempArr = selectStatus
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectStatus(prevState => {
                    return [...tempArr]
                })

            } else {
                setSelectStatus(prevState => {
                    return [...prevState, data]

                })

            }

        } else if (props.filterName[0] == "Sf Object Field") {
            if (connectorObjectData?.includes(data)) {
                let tempArr = connectorObjectData;
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setconnectorObjectData(prevState => {
                    return [...tempArr]
                })

            } else {
                setconnectorObjectData(prevState => {
                    return [...prevState, data]

                })

            }
        } else if (props.filterName == "customer-data") {
            if (customerData?.includes(data)) {
                let tempArr = customerData;
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setCustomerData(prevState => {
                    return [...tempArr]
                })

            } else {
                setCustomerData(prevState => {
                    return [...prevState, data]

                })

            }
        } else if (props.filterName == "fetch sf field") {
            if (fetchData?.includes(data)) {
                let tempArr = fetchData;
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setFetchData(prevState => {
                    return [...tempArr]
                })

            } else {
                setFetchData(prevState => {
                    return [...prevState, data]

                })

            }
        }
        
        else {
            if (selectFlow?.includes(data)) {
                let tempArr = selectFlow
                const indexr = tempArr.indexOf(data);
                if (indexr > -1) {
                    tempArr.splice(indexr, 1);
                }
                setSelectFlow(prevState => {
                    return [...tempArr]
                })

            } else {
                setSelectFlow(prevState => {
                    return [...prevState, data]

                })
            }
        }


    }

    const getInputData = (e) => {
        setSearchData(e.target.value)
        let toSearch = (e.target.value).toLowerCase()

        let finalData = filterData.map((dat, i) => {
            if (dat.toLowerCase().match(toSearch) && toSearch) {
                return dat
            }
        })
        let data = finalData.filter(e => { return e })
        if (e.target.value) {
            setFilter(data)
        } else {
            setFilter(resetData)
        }
    }



    const getFilteredData = async () => {
        if (props.filterName == "customer-data") {
            props.setCustomerData("SET_CUSTOMER_DATA", customerData)
        }else if(props.filterName == "fetch sf field"){
            let temp=props.fetchConnectorFieldData?props.fetchConnectorFieldData:[]
            temp[props.filterList.id]=temp[props.filterList.id]?.length>0? [...temp[props.filterList.id],...fetchData]:[...fetchData]
            props.setFetchConnectorField("SET_FETCHCONNECTOR_TYPE",[...temp])
        }else {
            let temp = [...selectedData, ...selectFlow].filter(e => e)
            props.sendTags(temp)
            props.setSelectedLanguage("SET_LANGUAGE", selectedData)
            props.setFlowType("SET_FLOW_TYPE", selectFlow)
            props.setDispositionType("SET_DISPOSITION", selectDisposition)
            props.setStatusType("SET_STATUS", selectStatus)
            props.setRegionType("SET_REGION", selectRegion)
            props.setDurationType("SET_DURATION", selectDuration)
            props.setCategoryType("INQUIRY_CATEGORY", selectCategory)
            // alert("ya")
            // console.log(selectCategory,"33333")

            // props.setconnectorObject("SET_CONNECTOR_OBJECT_DATA_ONE",connectorObjectData)
            props.onCancel()

            // let flowlength = selectFlow.length - 1
            // let flow_type = selectFlow[flowlength] ? selectFlow[flowlength] : ""
            // // &language=hi-IN&start_date=2021-12-14&end_date=2021-12-15")
            // let languagelength = selectedData.length - 1
            // let language_type = selectedData[languagelength]
            // let finalLang = language_type == "Hindi" ? "hi-IN" :
            //     language_type == "Kannada" ? "kn-IN" :
            //         language_type == "Telugu" ? "te-IN" :
            //             language_type == "Tamil" ? "ta-IN" :
            //                 language_type == "Malayalam" ? "ml-IN" : ''
            let today = moment(new Date()).format("YYYY-MM-DD")

            let from_date = props.dates?.fromDate ? props.dates.fromDate : today
            let to_date = props.dates?.toDate ? props.dates.toDate : today
            var bodyData = []
            if (selectFlow?.length > 0) {
                bodyData.push({ flow_type: selectFlow })
            }
            if (selectRegion?.length > 0) {
                bodyData.push({ region: selectRegion })
            }
            if (selectDuration?.length > 0) {
                // bodyData.push({duration:selectDuration})
                var tempdat = []
                selectDuration.map((each) => {
                    if (each == "Calls > 15 seconds") {
                        tempdat.push({ "call_greater_than_15s": "True" })
                    }
                    if (each == "Calls < 15 seconds") {
                        tempdat.push({ "call_greater_than_15s": "False" })
                    }
                    if (each == "Calls > 10 seconds") {
                        tempdat.push({ "calls_greater_than_10s": [true] })
                    }
                    if (each == "Calls < 10 seconds") {
                        tempdat.push({ "calls_greater_than_10s": [false] })
                    }
                })

                bodyData.push(Object.assign({}, ...tempdat))

            }

            if (selectedData?.length > 0) {
                let tempArr = []
                selectedData.map((each) => {
                    if (each == "Hindi") {
                        tempArr.push("hi-IN")
                    }
                    if (each == "Kannada") {
                        tempArr.push("kn-IN")
                    }
                    if (each == "Telugu") {
                        tempArr.push("te-IN")
                    }
                    if (each == "Tamil") {
                        tempArr.push("ta-IN")
                    }
                    if (each == "Malayalam") {
                        tempArr.push("ml-IN")
                    }
                })
                bodyData.push({ language: tempArr })
            }
            if (selectDisposition?.length > 0) {
                bodyData.push({ disposition: selectDisposition })

            }
            if (selectCategory?.length > 0) {
                bodyData.push({ category: selectCategory })
                // console.log(bodyData,"filter")

            }

            if (selectStatus?.length > 0) {
                let tempArr = []
                selectStatus.map((each) => {
                    if (each == "Connected") {
                        tempArr.push("CONNECTED")
                    }
                    if (each == "Not Connected") {
                        tempArr.push("NOT_CONNECTED")
                    }

                })
                bodyData.push({ status: tempArr })
            }
            // if(each=="Calls > 15 seconds"){
            //     return bodyData.push({"call_greater_than_15s":"True"})
            // }
            // if(each=="Calls < 15 seconds"){
            //     return bodyData.push({"call_greater_than_15s":"False"})
            // }

            let QueryData = Object.assign({}, ...bodyData)

            props.loading(true)
            await props.getChartDetails(accountName, { ...QueryData, start_date: from_date, end_date: to_date }).then((response) => {
                // await Axios.post(`https://calllogger.saarthi.ai/testing`,{...QueryData,username:accountName,start_date:from_date,end_date:to_date}).then((response) => {
                // props.storeChartData(response.data)
                props.sendResponse(response)
                props.loading(false)
                setSelectedData([])
                setSelectFlow([])
            }).catch(() => {
                setSelectedData([])
                setSelectFlow([])
            })
        }
        // props.filterData(selectedData)
    }
    // useEffect(()=>{
    //     props.setSelectedLanguage("SET_LANGUAGE",selectedData)
    // },[selectedData])

    // useEffect(()=>{
    //     props.setFlowType("SET_FLOW_TYPE",selectFlow)
    // },[selectFlow])
    return (
        <div className="multiselect-wrapper">
            <div className="multi-over">
                <div className='search-wrap'>
                    <img className="multi-icon" src={searchIcon} />
                    <input
                        className="search-inp"
                        type="text"
                        onChange={getInputData}
                        value={searchData}
                    />
                </div>
                <div className='multiselect-body'>
                    <>
                        {((props.filterName == "Call duration") || (props.filterName == "Client Name")) ? "" :

                            <div
                                className='body-data'
                                style={{
                                    width: "100px",
                                    fontSize: "10px",
                                    borderBottom: "1px solid black",
                                    padding: "5px",
                                    margin: "auto"
                                }}>
                                <Checkbox
                                    checked={isSelectAll ? true :
                                        // props.flowtype?.length == filterData?.length ? true :
                                        //     props.languageType?.length == filterData?.length ? true :
                                        //         props.statustype?.length == filterData?.length ? true :
                                        //             props.dispositiontype?.length == filterData?.length ? true :
                                        false
                                    }
                                    onChange={getIsAllChecked}
                                    extraSpan={isSelectAll ? "multi-border" : "multi-border-bs"}

                                />
                                Select All
                            </div>}
                        {filterData && filterData.map((each, i) => {
                            let showSelected=props.fetchConnectorFieldData.length>0 && props.fetchConnectorFieldData[props.idData]?.includes(each)
                            return (
                                <div className='body-data' key={i} >
                                    <Checkbox
                                        checked={isSelectAll ? true :
                                            selectedData?.includes(each) ? true :
                                                selectFlow?.includes(each) ? true :
                                                    selectRegion?.includes(each) ? true :
                                                        selectDuration?.includes(each) ? true :
                                                            selectDisposition?.includes(each) ? true :
                                                                connectorObjectData?.includes(each) ? true :
                                                                    customerData?.includes(each) ? true :
                                                                        selectStatus?.includes(each) ? true:
                                                                        selectCategory?.includes(each) ? true:
                                                                        showSelected?true:
                                                                       fetchData?.includes(each) ? true
                                                                            : false}
                                        onChange={(e) => getChecked(e, each, i)}
                                        extraSpan={isSelectAll
                                            || selectedData?.includes(each) ||
                                            selectFlow?.includes(each) ||
                                            selectRegion?.includes(each) ||
                                            selectDisposition?.includes(each) ||
                                            selectDuration?.includes(each) ||
                                            selectStatus?.includes(each) ||
                                            connectorObjectData?.includes(each) ||
                                            customerData?.includes(each) ||
                                             fetchData?.includes(each) ||
                                            showSelected
                                            || selectCategory?.includes(each)
                                            ? "multi-border" : "multi-border-bs"}
                                    />
                                    {each}
                                </div>
                            )
                        })
                        }
                    </>

                </div>
                <div className='multiselect-footer'>
                    <button className="multiple-btn" onClick={getFilteredData}>
                        Ok
                    </button>
                    <button className="multiple-btn" onClick={() => {
                        // props.setSelectedLanguage("SET_LANGUAGE",[])
                        // props.setFlowType("SET_FLOW_TYPE",[])
                        props.onCancel()
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )

}
const mapStateToProps = (state, ownProps) => {
    return {
        flowtype: state.dashboardReducer.flowType,
        languageType: state.dashboardReducer.language,
        dispositiontype: state.dashboardReducer.dispositionType,
        statustype: state.dashboardReducer.statusType,
        regiontype: state.dashboardReducer.region,
        dates: state.dashboardReducer.dates,
        durationtype: state.dashboardReducer.duration,
        categorytype: state.dashboardReducer.category,
        connectorType1: state.dashboardReducer.connectordata1,
        connectorType2: state.dashboardReducer.connectordata2,
        connectorType3: state.dashboardReducer.connectordata3,
        customerDataType: state.campaignReducer?.customerDataType,
        reducerData:  state.dashboardReducer,
        fetchConnectorFieldData: state.dashboardReducer.fetchConnectordata,


    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, campaignAction),
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);


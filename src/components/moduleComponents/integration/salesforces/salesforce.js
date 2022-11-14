import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropdownSaarthi from '../../../generic/dropdownsaarthi2/DropdownSaarthi';
import "./salesforce.css";
import { CLIENTNAME_URL } from '../../../../services/ApiRoutes';
import TableJob from "../TableSaleforce/TableJob"
import dropdownRightIcon from "../../../../theme/assets/svg/integration/dropdownIcon.svg";
import BackIcon from "../../../../theme/assets/genericSvg/backIcon.svg";
import Breadcrum from '../../../generic/breadcrum/Breadcrum';


const Salesforce = (props) => {
    let userType = window.sessionStorage.getItem("userType");
    const [client, setClient] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [selectClient, setSelectClient] = useState("");
    const [search, setSearch] = useState("");
    const [searchClientName, setSearchClientName] = useState([]);
    const [visite, setVisite] = useState(true)
    const history = useNavigate()

    const propsForDropdown = {
        optionList: searchClientName.length > 0 ? searchClientName : clientName,
        imgSrcRight: dropdownRightIcon,
        placeHolderText: "-Select-",
    };

    const getClientName = () => {
        axios.get(CLIENTNAME_URL).then((response) => {
            let responseData = response.data.data;
            setClient(responseData);
            let temp = clientName;
            responseData.map((d) => {
                temp.push(d.name);
            })
            setClientName(temp);
        });
    }

    useEffect(() => {
        getClientName();
    }, []);

    useEffect(() => {
        setClientName(clientName)
    }, [clientName])


    // client name filter
    const onChangeClient = (selectedItem) => {
        setSelectClient(selectedItem);
    }

    const onnexte = () => {
        setVisite(true)
        //   history.push("/table")
    }

    const getInputData = (e) => {
        setSearch(e.target.value)
        let toSearch = (e.target.value).toLowerCase()
        let searchData = clientName;

        if (toSearch.length > 0) {
            let filteredData = searchData.map((d, i) => {
                if (d.toLowerCase().match(toSearch) && toSearch) {
                    return d;
                }
            })
            let finalData = filteredData.filter((e) => {
                return e
            })
            if (e.target.value) {
                setSearchClientName(finalData);
            }
        }else{
            setSearchClientName(clientName)
        }
    }

    const goToPrevious=()=>{
        props.previousPage()
    }
   
//  let userType = window.sessionStorage.getItem("userType");
 let accountName = window.sessionStorage.getItem("accountName");


    return (
        <>
            <div className='salesforceClientPage-wrap' >
            
            
                {visite ?
                <>
                {/* <div className='backArrowDivsalesforce'>
                 <img src={BackIcon} onClick={()=>{goToPrevious()}}/></div> */}
                    <TableJob pushBack = {goToPrevious} clientName = {selectClient ? selectClient : accountName} 
                     internal = {userType !== "Internal" ?  goToPrevious : ""}
                    />
                    </>:
                    <div className='topDiv'>
                        {/* <Sidebar /> */}
                        
                        <div className='childdiv'>
                        
                        { userType === "Internal" ?
                        <>
                         <div className='backArrowDivsalesforce'>
                 <img src={BackIcon} onClick={()=>{goToPrevious()}}/></div>
                        <div className='clientdropdown'>
                            <p className="clientHeader">Client Name*</p>
                            <DropdownSaarthi
                                droplist={propsForDropdown}
                                isFilter={true}
                                searchUi={true}
                                handleSearchItem={getInputData}
                                filterListData={{ language: true }}
                                selectedItem={(item) =>
                                    onChangeClient(item)}
                                extraClassSelectedArea={'extraStyleClass'}
                                extraClassToBeSelectedArea={'dropdownStyling'}
                                extraClassDropdownSearchArea={"searchBarStyle"}
                            />

                        </div></> : 
                        <>
                        <div className='backArrowDivsalesforce'>
                        <Breadcrum 
                            highlightSelected={"Salesforce"} 
                            listData={["Integration","CRM","Salesforce"]}
                            setNext={"Salesforce"}
                            />
                           <img src={BackIcon} onClick={()=>{goToPrevious()}}/>
                        </div>
                        <div className='internalclientdiv'>
                                <div className='connector' onClick={() => onnexte()}>
                                    <p>SFDC&nbsp;Connector</p>
                                </div>
                            </div>
                        </>
                         }
                        {selectClient ?
                         <>
                         <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",width:"90%",margin:"20px"}}>
                            {/* <img src={BackIcon}  style={{width:"10px"}} onClick={()=>{goToPrevious()}}/> */}
                         </div>
                            <div className='outerRectangleBox'>
                                <div className='connector' onClick={() => onnexte()}>
                                    <p>SFDC&nbsp;Connector</p>
                                </div>
                            </div> </>:
                            " "
                        }
                    </div>
                    </div>
                }

            </div>
        </>
    )
};


export default Salesforce
import React, { useEffect, useState } from 'react';
import saveIcon from "../../../theme/assets/svg/campaign/save.svg";
import "./createBot.css";
import Axios from "axios";
import BackIcon from "../../../theme/assets/svg/demo/backIcon.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBot(props) {
    const [showViewMore,setShowViewMore]=useState(false)
    const [botInfo,setBotInfo]=useState({
        botName:"",
        botId:"",
        accessToken:"",
        agentEmail:"",
        agentEndPoint:"",
        apiConfigEndPoint:"",
        apiConfigUrl:"",
        botEndPoint:"",
        verifyToken:"",
        clientName:""
    })
    const [isError,setIsError]=useState([])
    const [enableSaveBtn,setEnableSaveBtn]=useState(true)

    const getIsViewMore=()=>{
        let temp=showViewMore
        setShowViewMore(!temp)
    }

    const handleChange=(e)=>{
        
        setBotInfo(prevState=>{
            return Object.assign({},{...prevState,[e.target.name]:e.target.value})
        })
        let temp = isError
        if (temp.includes(e.target.name)) {
            // temp.splice(name, 1)
            const index = temp.indexOf(e.target.name);
                if (index > -1) {
                    temp.splice(index, 1);
                }
            setIsError(temp)
        }
        setEnableSaveBtn(false)
    }
 let  tokenZx=props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
          headers:{"Content-Type": "application/json" ,
       "x-access-token":tokenZx}
     };
    const saveClicked=()=>{
        var temp=Object.assign(botInfo)
        let tempArr=[]
            if( (!temp["botName"]) || temp["botName"].length==0){
                tempArr.push("botName")
            }
      
            if((!temp["botId"])||temp["botId"].length==0){
                tempArr.push("botId")
            }
        if(tempArr.length>0){
            setIsError(tempArr)
        }else{
            let entry= Object.fromEntries(Object.entries(botInfo).filter(([_, v]) => v.length>0))
            if(Object.keys(props.editData)?.length>0){
                setEnableSaveBtn(true)
                Axios.post(`https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/botInfo/v1/update`,botInfo,headers).then((response)=>{
                    setEnableSaveBtn(true)
                    toast.success("Bot details updated successfully!")
                    moveToPrevious()
                }).catch((err)=>{
                    toast.error("Bot details updation not successful")
                })
            }else{
                setEnableSaveBtn(true)
               Axios.post(`https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/botInfo/v1/create`,botInfo).then((response)=>{
                    
                    toast.success("Bot details created successfully!")
                    moveToPrevious()
                }).catch((err)=>{
                    toast.error("Bot details creation not successful")
                })
               
            }
           
        }
       
    }

    const moveToPrevious=()=>{
        props.previous()    
    }


    useEffect(()=>{
        setBotInfo(props.editData)
    },[props.editData])

    useEffect(()=>{
        if(Object.keys(props.editData).length>0){
         if((props.editData.accessToken==botInfo.accessToken)&&
         (props.editData.agentEmail==botInfo.agentEmail) &&
         (props.editData.agentEndPoint==botInfo.agentEndPoint)&&
         (props.editData.apiConfigEndPoint==botInfo.apiConfigEndPoint)&&
         (props.editData.apiConfigUrl==botInfo.apiConfigUrl)&&
         (props.editData.botEndPoint==botInfo.botEndPoint)&&
         (props.editData.botId==botInfo.botId)&&
         (props.editData.botName==botInfo.botName) &&
         (props.editData.verifyToken==botInfo.verifyToken) &&
         (props.editData.clientName==botInfo.clientName)
         ){
             setEnableSaveBtn(true)
         }else{
             setEnableSaveBtn(false)
         }}else{
            setEnableSaveBtn(false)
        }
     },[botInfo])

    

    
    return (
        <div className='create-bot'>
             <div className='create-bot-header'>
             <div className='back-img' onClick={()=>{moveToPrevious()}}>
                     <img src={BackIcon}/>
                 </div>
                <div className='bot-title'>
                    {Object.keys(props.editData)?.length>0?"Edit Bot Information":"Bot Information"}
                </div>
                <div className={`save-img ${(enableSaveBtn)?"disabled":""}`} 
                  onClick={() => { return (enableSaveBtn)?"":saveClicked()}}>
                    <img src={saveIcon} />
                </div>
            </div>
            <div className='bot-row'>
                <div className='bot-input'>
                Bot Name*
                <input
                     type="text"
                      className={`${isError.includes("botName")? "input-bot-error":"input-bot"}`}
                      name="botName"
                        value={botInfo?.botName}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {
                        isError.includes("botName")&&<span className='error-field'>
                        Bot name is required
                        </span>
                    }
                
                </div>
               
                <div className='bot-input'>
                    Bot End Point
                <input
                     type="text"
                      className="input-bot"
                        name="botEndPoint"
                        value={botInfo?.botEndPoint}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                       
                    />
                </div>
                      
            </div>
            <div className='bot-row'>
            <div className='bot-input'>
                Bot Id*
                <input
                     type="text"
                      className={` ${props.editData.botId?.length>0 ? "disabled":""} ${isError.includes("botId")? "input-bot-error":"input-bot"}`}
                      name="botId"
                      value={botInfo?.botId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      disabled={props.editData.botId?.length>0 ? true:false}
                    />
                    { isError.includes("botId")&&
                <span className='error-field'>
                Bot id is required
                </span>}
                </div>
                <div className='bot-input'>
                 Access Token
                <input
                     type="text"
                      className="input-bot"
                      name="accessToken"
                      value={botInfo?.accessToken}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      
                    />
                </div>
                      
            </div>
            <div className='bot-row'>
               
                <div className='bot-input'>
                    Verify Token
                <input
                     type="text"
                      className="input-bot"
                      name="verifyToken"
                      value={botInfo?.verifyToken}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                </div>
                <div className='bot-input'>
                Client Name
                <input
                     type="text"
                      className="input-bot"
                      name="clientName"
                      value={botInfo?.clientName}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      
                    />
                {/* <input
                     type="text"
                      className="input-bot hide-it"
                       /> */}
                </div>
               
                      
            </div>
            {showViewMore?
                <div style={{marginTop: "100px"}}>
                <div className='bot-row'>
                <div className='bot-input'>
                Agent Email
                <input
                     type="text"
                      className="input-bot"
                      name="agentEmail"
                      value={botInfo?.agentEmail}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                </div>
                <div className='bot-input'>
                    Api Config End Point
                <input
                     type="text"
                      className="input-bot"
                     name="apiConfigEndPoint"
                     value={botInfo?.apiConfigEndPoint}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                </div>
                      
            </div>
            <div className='bot-row'>
            <div className='bot-input'>
                Agent End Point
            <input
                 type="text"
                  className="input-bot"
                  name="agentEndPoint"
                  value={botInfo?.agentEndPoint}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                />
            </div>
            <div className='bot-input'>
                API Config URL
            <input
                 type="text"
                  className="input-bot"
                 name="apiConfigUrl"
                 value={botInfo?.apiConfigUrl}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                />
            </div>
                  
        </div>
        </div>:""
            }
            <div className='view-more' onClick={()=>{getIsViewMore()}}>
                {showViewMore?"View Less":"View More"}
            </div>
            {/* <ToastContainer
                position="top-center"
                type="success"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={false}
                draggable={false}
                rtl={true}
                
            /> */}
        </div>
    )
}

export default CreateBot

import React,{useState} from 'react'
import DivComponent from '../buttonDivComponent/DivComponent'
import "./ChannelPage.css"
import Channels from '../channels/Channels'
import smsIcon from "../../../../theme/assets/svg/demo/smsIcon.svg"
import whatsAppIcon from "../../../../theme/assets/svg/demo/whatsappIcon.svg"
import emailIcon from "../../../../theme/assets/svg/demo/emailIcon1.svg"
import Breadcrum from '../../../generic/breadcrum/Breadcrum'

function ChannelPage(props) {
    let arr =[
        { name :"WhatsApp" ,
          icon : whatsAppIcon },
        { name :"SMS" ,
          icon : smsIcon},
        { name :"Email" ,
          icon : emailIcon
      }
    ]
    const [selectedData,setSelectedData]=useState("")
    const showComponent=(e)=>{
      setSelectedData(e.name)
    }

  return (
    <div className='ChannelWrapper'>
          
     { selectedData=="WhatsApp"?
               <Channels showData={selectedData} setBack={()=>{setSelectedData("")}}/>:
               selectedData=="Email"?
               <Channels showData={selectedData} setBack={()=>{setSelectedData("")}}/>
               :
               selectedData=="SMS"?
               <Channels showData={selectedData} setBack={()=>{setSelectedData("")}}/>
               :
               <>
              {/* <div className='backArrow' onClick={()=>{props.getData()}}><img src={backIcon}></img></div>
           <div className='connectorIconDiv' onClick={()=>{props.getData()}}> 
         <img src={connectorIcon}></img>
       </div> */}
            <div className='backArrow'>
           <div className='iconBack'>
           {/* <img src={connectorIcon}
           data-tip data-for="registerTip"
           onClick = {()=>{props.getData()}}
           ></img>
           <ReactTooltip id="registerTip" place="top" effect="solid">
           Press to go to Integration Page
          </ReactTooltip> */}
           <Breadcrum 
           highlightSelected={"Channel Integration"} 
           listData={["Integration","Channel Integration"]}
           setNext={"Salesforce"}
          />
           </div>
           {/* <div className='iconBack'
            onClick = {()=>{props.getData()}}
            >
          <img src={backIcon} 
          ></img>
          </div> */}
          </div>
              {/* <div className='headindDiv'>
             <p className='heading'>Channel Integration</p>
         </div> */}
         <div className='componentContainer'>
             { arr.map((e,i )=> {

                  return <div key={i} onClick={()=>{showComponent(e)}}>
                    <DivComponent heading = {e.name } img ={e.icon}/>
                    </div>
             })}
            
        
         </div>
         </>
         }
       
    </div>
  )
}

export default ChannelPage
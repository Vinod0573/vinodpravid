import React, { useEffect, useState } from 'react'
import DropDown from "../../../generic/dropdownsaarthi2/DropdownSaarthi"
import "./AgentConfigurationModal.css"
import flowIcon from "../../../../theme/assets/svg/demo/flowIcon.svg"
import languageIcon from "../../../../theme/assets/svg/demo/languageIcon.svg"
import voiceIcon from "../../../../theme/assets/svg/demo/voiceIcon.svg"
import channelIcon from "../../../../theme/assets/svg/demo/channelIcon.svg"
import mindMapIcon from "../../../../theme/assets/svg/demo/mindMapIcon.svg";
import dateRangeIcon from "../../../../theme/assets/svg/demo/dateRangeIcon.svg"

import downArrow from "../../../../theme/assets/svg/demo/downArrowIcon.svg"
import arrowIcon from "../../../../theme/assets/svg/demo/arrowIcon.svg"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
// import * as dashboardAction from "../../../actions/dashboardActions";
// import * as campaignAction from "../../../actions/campaignActions";


import DateFilter from "../../../generic/datefilter/DateFilter";


import MultiSelectDropdown from "../.././../generic/multiselectdropdown/MultiSelectDropdown";
import eyeIcon from "../../../../theme/assets/svg/demo/eyeIcondemo.svg";
import axios from 'axios'

function AgentConfigurationModal(props) {
   
  const[selectPostEmi, setSelectPostEmi] = useState(false)
  const[selPreDue , setSelPreDue] = useState(props.postEmi?.length ? false : true)
  const[selectedPostEmi , setSelectedPostEmi] = useState('')
  const[selectedLanguage , setSelectedLanguage] = useState()
  const[selectedChannel , setSelectedChannel] = useState("")
  const[dropDownListShow, setDropListShow] =useState(false)
  const[agentConfiguration, setAgentConfiguration] = useState({})
  const[lang , setLang] = useState()
  const[getFlowPre , setGetFlowPre] =useState()
  const[selectPre , setSelectPre] = useState()
  const[disButton , setDisButton] =useState(true)
  const[mapImg , setMapImg] = useState()

    //all redux data 
  
     
  


 //post emi dropdown
    const propsForPreEmiDropdown = {
        optionList: props.postEmiName ? props.postEmiName : "",
        imgSrcRight: arrowIcon ,
        placeHolderText: props.postEmi ? props.postEmi :"select" ,
       
    };

    
//for language
    useEffect(
        () => {
            if(selectedPostEmi?.length){
                props.fetchData?.map(e => {
                    if(e.name === selectedPostEmi){
                        setLang(prev => e.languages)
                    }
                }
              )
            }
            else if(getFlowPre?.length){
                getFlowPre.map(e =>{
                setLang(prev => e.languages)
                }
                )
            }

        },[selectedPostEmi , getFlowPre]
    )
   
    const propsForLanguageDropdown = {
        optionList: lang ? lang : "",
        imgSrcRight: downArrow ,
        placeHolderText:  props.languagee ? props.languagee :"select" 
    }
    const propsForChannelDropdown = {
        optionList: ["WhatsApp", "Email","SMS"],
        imgSrcRight: downArrow ,
        // placeHolderText:agentConfiguration.demoChannel ? agentConfiguration.demoChannel : "select" 
        placeHolderText : props.channel ? props.channel : "select"
    }
    const onChangePostEmi =(item) => {
        setSelectedPostEmi(prev => item)
        setSelectPre(prev => null)
        
    }
    const onChangeLanguge =(item) => {
        setSelectedLanguage(prev =>item)
      
      
    }
    const onChangeChannel=(item) => {
        setSelectedChannel(prev => item) 
        
    }
    const getdropDownListShow =() => {
        let temp=dropDownListShow
        setDropListShow(!temp)
     }
      
      
   

      useEffect(
          () => {
            //   console.log(props.postEmi,'postEmi');
            //   console.log(props.languagee,'postemi');
            //   console.log(props.channel,'chanel');
            setAgentConfiguration(
                prev => {
                    return {
                        ...prev ,
                 postEmiData :  selectedPostEmi?.length &&  !selectPre?.lenght ? selectedPostEmi  ? selectedPostEmi: props.postEmi : "" ,
                  demoLanguage : selectedLanguage?.length ? selectedLanguage : props.languagee,
                  demoChannel : selectedChannel?.length ? selectedChannel : props.channel,
                 preEMiData : selectPre && !selectPostEmi ? selectPre : null
                
            }
        }
            )
            // let camData ={
            //     "flowType":selectedPostEmi ? selectedPostEmi :selectPre,
            //     "language":[selectedLanguage],
            //     "channels":[...selectedChannel]
            // }
            // props.setCamapignSelectedData(camData);
          }
     ,[selectedPostEmi, selectedChannel, selectedLanguage , selectPostEmi])
     

        useEffect(
            () => {
                props.agentdata(agentConfiguration)
            }, [agentConfiguration]
        )   
     
    //  useEffect(
    //      () => {
    //          props.setDemoAgentConfigurationData("SET_DEMO_AGENTCONFIGURATION_DATA",agentConfiguration)
    //      },[selectedPostEmi, selectedChannel, selectedLanguage]
    //  )
     const options = {
        imgSrcRight: downArrow,
        imgSrcleft: "",
        placeHolderText:  (selectedChannel ? selectedChannel.join(" ")   :props.channel ? props.channel.join(" "): "select")
      };

      useEffect(() => {
          if(( (agentConfiguration.postEmiData?.length  )|| (agentConfiguration.preEMiData?.length )) 
               && agentConfiguration.demoLanguage && agentConfiguration.demoChannel 
          ){
              setDisButton(prev =>false)
             
          }
        
          else{
              setDisButton(prev => true)
          }
      },[agentConfiguration])
      useEffect(
          () => {
               if(!disButton){
                props.disableButton(prev => false)}
                else{
                    props.disableButton(prev => true)}
                
            
          },[disButton ,!disButton]
      )
     

      const getPreDue = () => {
          axios.post(props.url ,{"flowName":["Pre-Due"]}).then(
            data => {return setGetFlowPre(data.data.data[0].subFlow)}
          )
          if(!props.postEmi || selPreDue){
          setSelectPre(pre=> "Pre-Due")
          setSelectedPostEmi(prev => null)
          }
          else if(props.postEmi && !selPreDue){
            setSelectedPostEmi(prev => props.postEmi)
          }
          

      }
      useEffect(
          () => 
           {
                getPreDue() 
           },
          [selPreDue]
      )
      useEffect(
          () => {
              let data = {
                "flowName":   selectedPostEmi  ?
                       "Post-Due"
                : selPreDue  ?
                 "Pre-Due"   :
                props.postEmi && !selPreDue ?
                "Post-Due" :
                props.preDue && selPreDue ? 
                "Pre-Due"
                :"",
                "subFlow":   selectedPostEmi  ?
                selectedPostEmi

                : selPreDue  ?
                "Pre-Due"  :
                props.postEmi && !selPreDue ?
                props.postEmi:
                props.preDue && selPreDue ? 
                props.preDue
                :"",
                "language": agentConfiguration.demoLanguage ? agentConfiguration.demoLanguage : props.languagee
              }
              axios.post(`https://${process.env.REACT_APP_SERVER_URL}/api/accounts/demoTemplate/v1/filter`, data).then(
                  e => { return setMapImg(prev => e.data.data?.azureLink),
                    props.togetImg(e.data.data?.azureLink )
                      }
              )
          },[agentConfiguration]
      )

      useEffect(
          () => {
             if(selectPostEmi){
                setSelectPre(prev => null) 
                setLang(prev => null)
             }
          },[selectPostEmi]
      )

  return (
    <div className='AgentConfigurationWrapper'>
        <div className='AgentConfigurationDiv'>
            <div className='OuterDiv'>
            <div className='ContainDiv'>
                <div className='logoNameDiv'> 
                    <img  src= {flowIcon} width ={"50px"}
                    alt='img'></img>
                    <h2 className='heading'>Flow</h2>
                </div>
                <div className='TwoDropDownDiv'>
                <div>
                    <div className='btnContainer'>
                    <div 
                    className ={`${selPreDue ||(props.preDue && !selectPostEmi)? "highlightStaticDiv" :'staticDivbtn'}`}
                     onClick={() => {return setSelectPostEmi(false) , setSelPreDue(true) ,getPreDue()}}
                     >
                         <p > 
                             Pre-Due
                         </p>
                     </div>
                    <div 
                        className ={`${selectPostEmi || (props.postEmi && !selPreDue && ! props.preDue)? "highlightStaticDiv" :'staticDivbtn'}`}>
                         <p onClick={() => { return getdropDownListShow() ,setSelectPostEmi(true) ,setSelPreDue(false)} }> 
                             Post-Due
                         </p>
                     </div>
                    </div>
                    
                </div>
                <div style={{paddingLeft:"10%"}}>{selectPostEmi || (props.postEmi && !selPreDue && !props.preDue) ?
                    <DropDown
                droplist={propsForPreEmiDropdown}
                // isFilter={true}
                searchUi={false}
                handleSearchItem={selectedPostEmi}
                selectedItem={(item) =>
                    onChangePostEmi(item)}
                extraClassSelectedArea={'preEmidropdown'}
                extraClassToBeSelectedArea={'dropdowndListArea'}
                showInitialList = {dropDownListShow}
                />
                : "" }</div>
                </div>
               
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'> 
                    <img src={languageIcon} width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Language</h2>
                </div>
                <div className='dropDownDiv'> <DropDown
                 droplist={propsForLanguageDropdown}
                 // isFilter={true}
                 searchUi={false}
                 handleSearchItem={selectedLanguage}
                 selectedItem={(item) =>
                    onChangeLanguge(item)}
                 extraClassSelectedArea={'languageDropdown'}
                 extraClassToBeSelectedArea={'dropdowndListArea'}/></div>
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'> 
                    <img  src ={voiceIcon} width ={"50px"}  alt='img'></img>
                    <h2 className='heading'>Voice</h2>
                </div>
                <div className='dropDownDiv'> 
                <div className='staticDiv'>
                         <p> 
                             Female
                         </p>
                     </div>
                </div>
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img  src ={channelIcon}  width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Channels</h2>
                </div>
                <div  className='dropDownDiv'>
                    {/* <DropDown
                    droplist={propsForChannelDropdown}
                    // isFilter={true}
                    searchUi={false}
                    handleSearchItem={selectedChannel}
                    selectedItem={(item) =>
                        onChangeChannel(item)}
                    extraClassSelectedArea={'languageDropdown'}
                    extraClassToBeSelectedArea={'dropdowndListArea'}
                    /> */}
                    <MultiSelectDropdown
           options={options}
          toBeFilterData={ propsForChannelDropdown && Object.values(propsForChannelDropdown.optionList).length>0?Object.values(propsForChannelDropdown.optionList):[]}
           extraSelectedClass="languageDropdown"
           getFilteredData={(value) =>onChangeChannel(value)}
           key="dispositionMultiSelectOne"
           selectedDataOutside={selectedChannel? [...selectedChannel]: propsForChannelDropdown.optionList}
           isDisable={props.disableFilterList?.includes('Disposition') ? true : false}
           extraPlaceHolderStyle = "placeholderMultiStyleAgent"
          />
                </div>
            </div>
            {
                props.campaign ?
                <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img src={dateRangeIcon} width ={"50px"} alt="img"></img>
                    <h2 className='heading'>Date Range:</h2>
                </div>
                <div  className='dropDownDiv'>

                {/* <div className='staticDiv2'> */}
                <div style={{ border: "0.982333px solid #D8D8D8"}}>
                <DateFilter id="dateRangeOne" dateHeader={'show'}/> 
              </div>
                     {/* </div> */}
                </div>
            </div>

            :
            <div className='ContainDiv'>
            <div className='logoNameDiv'>
                <img src={mindMapIcon} width ={"50px"} alt="img"></img>
                <h2 className='heading'>Mindmap:</h2>
            </div>
            <div  className='dropDownDiv'>
            <div className='staticDiv2'>
                         <p> 
                            {/* {((selectedPostEmi || props.postEmi  && !selPreDue)&& (selectedLanguage || props.language ))
                            ? ((selectedPostEmi || props.postEmi)+ "_" + (selectedLanguage || props.language))
                             : (selPreDue && selectedLanguage )? ("Pre-Due-"+selectedLanguage ): "" } */}
                             {
                                 selectedPostEmi && selectedLanguage ?
                                   selectedPostEmi+"_"+selectedLanguage

                                   : selPreDue && selectedLanguage ?
                                   "Pre-Due"+"_"+selectedLanguage    :
                                   props.postEmi && !selPreDue ?
                                   props.postEmi+"_"+ props.languagee :
                                   props.preDue && selPreDue ? 
                                   props.preDue+"_"+ props.languagee
                                   :""
                             }

                         </p>
                    
                     </div>
                        <div className='eyeIconDiv' 
                        onClick={() => props.eyeCall(true)}
                          >
                        <img
                          className={`eyeIcon`}
                          src={eyeIcon}
                          alt="Eye Icon"
                          width={"20px"}
                        />
                        </div>
            </div>
        </div>
            }

            </div>
        </div>
         {/* <MultiSelectDropdown
           options={options}
          toBeFilterData={ propsForChannelDropdown && Object.values(propsForChannelDropdown.optionList).length>0?Object.values(propsForChannelDropdown.optionList):[]}
           extraSelectedClass="languageDropdown"
           getFilteredData={(value) =>onChangeChannel(value)}
           key="dispositionMultiSelectOne"
           selectedDataOutside={propsForChannelDropdown.optionList}
           isDisable={props.disableFilterList?.includes('Disposition') ? true : false}
           extraPlaceHolderStyle = "placeholderMultiStyleAgent"
          /> */}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
    return {
        demoAgent :  state.demoReducer.demoAgentConfigurationData,
     languagee: state.demoReducer?.demoAgentConfigurationData?.demoLanguage,
     postEmi: state.demoReducer.demoAgentConfigurationData?.postEmiData,
     preDue: state.demoReducer.demoAgentConfigurationData?.preEMiData,
     channel: state.demoReducer.demoAgentConfigurationData?.demoChannel,
    };
  };
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}),
        dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AgentConfigurationModal);

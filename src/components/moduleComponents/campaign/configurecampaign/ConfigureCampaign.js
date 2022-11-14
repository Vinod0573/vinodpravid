import React, { useEffect, useState } from 'react'
import "./ConfigureCampaign.css"
import flowIcon from "../../../../theme/assets/svg/demo/flowIcon.svg"
import languageIcon from "../../../../theme/assets/svg/demo/languageIcon.svg"
import channelIcon from "../../../../theme/assets/svg/demo/channelIcon.svg"
import campaignTypeicon from "../../../../theme/assets/svg/campaign/campaignType.svg"
import campaignNameIcon from "../../../../theme/assets/svg/demo/campaignNameIcon.svg"
import downArrow from "../../../../theme/assets/svg/campaign/dropdownIconDown.svg"
import callunActive from "../../../../theme/assets/svg/campaign/callunActive.svg"
import callActive from "../../../../theme/assets/svg/campaign/callActive.svg"
import whatsAppunActive from "../../../../theme/assets/svg/campaign/whatsAppUnActive.svg"
import whatsAppActive from "../../../../theme/assets/svg/campaign/whatsAppActive.svg"
import emailunActive from "../../../../theme/assets/svg/campaign/emailunActive.svg"
import smsunActive from "../../../../theme/assets/svg/campaign/smsunActive.svg"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAction from "../../../../redux/onboarding/login/actions";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as filterAction from "../../../../redux/filter/actions";
import { format } from "date-fns";





import MultiSelectDropdown from "../../../moduleComponents/campaign/schedulerAllComponent/MultiSelectDropdown";
import axios from 'axios'
import MultiLevel from '../../../moduleComponents/campaign/schedulerAllComponent/multiLevel/MultiLevel'

import ChannelOmni from '../../campaign/omniChannel/channelBtnOmni/channelOmni'

function ConfigureCampaign(props) {
  const[selectPostEmi, setSelectPostEmi] = useState(false)
  const[selPreDue , setSelPreDue] = useState(false)
  const[selectedPostEmi , setSelectedPostEmi] = useState()
  const[selectedLanguage , setSelectedLanguage] = useState()
  const[selectedChannel , setSelectedChannel] = useState([])
  const[dropDownListShow, setDropListShow] =useState(false)
  const[agentConfiguration, setAgentConfiguration] = useState({})
  const[lang , setLang] = useState()
  const[getFlowPre , setGetFlowPre] =useState()
  const[selectPre , setSelectPre] = useState()
  const[disButton , setDisButton] =useState(props.EditData ? false : true)
  const[propsForPostEmiDropdown , setpropsForPostEmiDropdown] = useState([])
  const[hidebtn , setHidebtn] = useState(props.EditData ? true : true)
  const [parentName,setParentName]=useState([])
  const [childName,setChildName]=useState([])
  const [selectedParentChild,setSelectedParentChild]=useState(["Select Flow"])
  const[arrSel , setarrSel] = useState([])
  const[arrSelchild , setarrSelchild] = useState()
  const[newCampaignName , setNewCampaignName] = useState()
  const[errMessageCamp , setErrMessageCamp] = useState()
  const[changeClick , setChangeClick] = useState(false)
  useEffect(
      () => {
        setpropsForPostEmiDropdown(prev => props.postEmiName )
      }, [ props.postEmiName ]
  )
    //  useEffect(
    //      () => {
    //          if(props.toHideupload ===false){
    //          setHidebtn(props.toHideupload)
    //          props.toSetHideupload()
    //         }

    //      },[props.toHideupload]
    //  )
    useEffect(
             () => {


                 props.toSetHideupload(changeClick)


             },[changeClick]
         )
  // toggle button pre and post and selected data as per button selection
  var flowType = {

}
    //  selPreDue && (flowType["Pre-Due"] = [])
    // selectedPostEmi && (flowType["Post-Due"] = selectedPostEmi)
      parentName?.includes("Pre-Due") && (flowType["Pre-Due"] = [])
      parentName?.includes("Post-Due") && (flowType["Post-Due"] = childName)


   const togglePreDue =() => {
        setSelPreDue(!selPreDue)
        setHidebtn(true)

   }
   const togglePostDue =() => {
    setSelectPostEmi(!selectPostEmi)
   }
   useEffect(
       () => {
        setSelectedParentChild(parentName)

       }
       ,[parentName]
   )
   useEffect(
       () => {
         if(selPreDue){
             setSelectPre(prev => [])

         }
         else{
            setSelectPre(prev => null)
         }
       },[selPreDue]
   )
   useEffect(
    () => {
      if(!selectPostEmi){
        setSelectedPostEmi(prev => null)
      }

    },[selectPostEmi]
)


// useEffect(()=>{
//     if(selectedPostEmi){
//         setSelectedPostEmi(prev => selectedPostEmi)
//     }
// },[selectedPostEmi])

//for getting language
    useEffect(
        () => {
            if(parentName?.length && parentName?.includes("Post-Due")){
                props.fetchData?.map(e => {
                    if(e.name === childName?.[0]){
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

        },[parentName ,childName, getFlowPre , props.fetchData]
    )

    const [propsForLanguageDropdown ,setPropsForLanguageDropdown] =useState([])

    useEffect(() =>{
        setPropsForLanguageDropdown(prev => lang)
    },[lang])

    //for onChange event
    const onChangePostEmi =(item) => {
        setSelectedPostEmi(prev =>item)
        setHidebtn(true)
        // setSelectPre(prev => null)
    }
    const onChangeLanguge =(item) => {
        setSelectedLanguage(prev =>item)
        setHidebtn(true)
        setChangeClick(true)
    }
    const onChangeChannel=(item) => {
        setSelectedChannel(prev =>item)
        setHidebtn(true)
    }
    const getdropDownListShow =() => {
        let temp=dropDownListShow
        setDropListShow(!temp)
     }
     const onChangeCampaignNewName =(data) => {
         if(data?.length >0){
            setNewCampaignName(data?.trim())
            setHidebtn(true)
            setErrMessageCamp()
            setChangeClick(true)
         }
         else{
            setNewCampaignName(data)
            setErrMessageCamp()
         }

    }
    // for error handling Campaign Name
    // useEffect(
    //     () => {
    //         if(newCampaignName?.length <=2 && newCampaignName?.length >0 ){
    //             setErrMessageCamp(" ")
    //         }
    //         else{
    //             setErrMessageCamp()
    //         }
    //     },[newCampaignName]
    // )
   useEffect(
       () => {
           if(props.errMessage?.length >0){
            setErrMessageCamp(props.errMessage)
           }
       },[props.errMessage?.length]
   )
//  for edit
useEffect(
    () => {
        if(selPreDue && selectPostEmi){
            setParentName(prev => ["Pre-Due" , "Post-Due"])
        }
        else if(selPreDue){
            setParentName(prev => ["Pre-Due" ])
        }
        else if(selectPostEmi){
            setParentName(prev => ["Post-Due"])
        }

    },[selPreDue , selectPostEmi]
)

useEffect(() =>{
    if(props.campaignEditUpdateType === 'edit'){
       let selectedData = props.campaignSelectedData
        // let selectedData =props.EditData
        //typeof(selectedData?.flowType) !== "object" ? selectedData?.flowType === 'Pre-Due' ?  : (selectedData?.flowType?.["Pre-Due"]  !== "Pre-Due" ? selectedData?.flowType?.["Post-Due"]  : "")
        if( typeof(selectedData?.flowType )== "object" && selectedData?.flowType?.["Pre-Due"] && selectedData?.flowType?.["Post-Due"] ){
            setSelectPre(prev => [])
            setSelPreDue(prev => true)
            setSelectedPostEmi(prev =>[ ...selectedData?.flowType?.["Post-Due"]])
            setSelectPostEmi(true)
            setParentName(prev => ["Pre-Due" , "Post-Due"])
            setChildName(prev => [ ...selectedData?.flowType?.["Post-Due"]])

        }
        if(typeof(selectedData?.flowType) !== "object" && selectedData?.flowType === 'Pre-Due'  ){
            setSelectPre(prev => [])
            setSelPreDue(prev => true)
            setParentName(prev => ["Pre-Due"])

        }
      else if( typeof(selectedData?.flowType )== "object" && selectedData?.flowType?.["Pre-Due"]   ){
            setSelectPre(prev => [])
            setSelPreDue(prev => true)
           let temp = []
           temp.push("Pre-Due")
            setParentName(prev => [...temp])

        }
        // if (typeof(selectedData?.flowType )== "object" && selectedData?.flowType?.["Post-Due"]){
        //     console.log("jaiho " ,selectedData?.flowType?.["Post-Due"])
        //     setSelectedPostEmi(prev =>  selectedData?.flowType?.["Post-Due"])
        //     setSelectPostEmi(true)
        // }

        // if( selectedData?.flowType === 'Pre-Due' || selectedData?.flowType ==="pre_emi" ){
        //     setSelectPre(prev => 'Pre-Due')
        //     setSelPreDue(prev => true)
        // }
        // else {
        //     // setSelectPre(prev => null)

        //      let c =  (typeof(selectedData?.flowType) !== "object"  &&  selectedData?.flowType !== "Pre-Due" ) ? selectedData?.flowType : (selectedData?.flowType?.["Pre-Due"]  !== "Pre-Due" ? selectedData?.flowType?.["Post-Due"]  : "")
        //     let d = [ ...c]

        //     // setSelectedPostEmi( prev => props.campaignSelectedData?.flowType && d !== 'Pre-Due'  ?  [...props.campaignSelectedData?.flowType]  : [...selectedData?.flowType])
        //     setSelectedPostEmi(prev => d)
        //     setSelectPostEmi(true)
        //     // setSelPreDue(false)

        // }
        else if( typeof(selectedData?.flowType) !== "object" && selectedData?.flowType !== 'Pre-Due' ){
            setSelectedPostEmi(prev => selectedData?.flowType ? [...selectedData?.flowType] : "")
            setSelectPostEmi(true)
            setParentName(prev => [ "Post-Due"])
            setChildName(prev => [ ...selectedData?.flowType])
        }
        else if(typeof(selectedData?.flowType )== "object" && selectedData?.flowType?.["Post-Due"]  ){
            setSelectedPostEmi(prev => [...selectedData?.flowType?.["Post-Due"] ])
            setSelectPostEmi(true)
            setParentName(async prev => await["Post-Due"])
            setChildName(prev => [ ...selectedData?.flowType?.["Post-Due"]])
        }
       // setSelectedLanguage(prev => selectedData?.language ? [...selectedData?.language] : props.campaignSelectedData?.language)
       setSelectedLanguage(prev => props.campaignSelectedData?.language?  props.campaignSelectedData?.language :  selectedData?.language ?[...selectedData?.language] : [])        // console.log("13", [...selectedData?.language])
        // setSelectedChannel(prev => selectedData?.channels ? [...selectedData?.channels] : props.campaignSelectedData?.channels)
        setSelectedChannel(prev => props.campaignSelectedData?.channels ?  props.campaignSelectedData?.channels : selectedData?.channels ? [...selectedData?.channels] : [])
        // props.setDateFilterData({ fromDate: selectedData?.startDate, toDate: selectedData?.endDate });
        if(selectedData?.startDate){
            props.setDateFilterData({ fromDate:  format(new Date(selectedData?.startDate), "yyyy-MM-dd"),toDate: format(new Date(selectedData?.endDate), "yyyy-MM-dd") });
        }
        setNewCampaignName(prev => props.campaignSelectedData?.parentLabel ? props.campaignSelectedData?.parentLabel : props.campaignSelectedData?.campaignName)
    }
},[])

// useEffect(
//     () => {
//         let  camData ={
//             "flowType": props.EditData?.flowType,
//             "language": props.EditData?.language,
//             "channels": props.EditData?.channels,
//             isActive: props.EditData?.isActive,
//             voice: "Female",
//             startDate: props.EditData?.startDate,
//             endDate: props.EditData?.endDate
//         }
//         props.setCamapignSelectedData(camData);
//     }, [props.EditData]
// )

// useEffect(() => {
//     setSelectedLanguage(prev => props.EditData?.language);
// });


      useEffect(
          () => {

            let fromDate = props.filteredDateRangeData?.fromDate;
            let toDate = props.filteredDateRangeData?.toDate;



            let  camData ={
                // "flowType": selectedPostEmi ? [...selectedPostEmi]  : selectPre ? selectPre : props.campaignSelectedData?.flowType ,
                "flowType" :  flowType,
                "language": selectedLanguage ? [...selectedLanguage] :props.campaignSelectedData?.language,
                "channels": selectedChannel ? [...selectedChannel] : props.campaignSelectedData?.channels,
                isActive: true,
                voice: "Female",
                startDate: fromDate,
                endDate: toDate,
                campaignType:["AI Driven"],
                campaignName: newCampaignName

            }

            if(props.campaignEditUpdateType === 'edit'){
                // camData['id'] =props.campaignSelectedData?.id
                camData["id"] =  props?.EditData?.id ? [props.EditData.id] : ""
            }
            if(props.campaignEditUpdateType === 'create'){
                camData['accountName']= ( props.clientNameRedux && props.clientNameRedux !== "Select All") ? props.clientNameRedux : props.userLoginInfo?.userDetail?.accountDetails[0]?.name
            }
            props.setCamapignSelectedData(camData);
          }
     ,[selectedPostEmi,selectedChannel ,selectedLanguage,props.filteredDateRangeData , selectPre , parentName,childName , newCampaignName ])

     const options = {
        imgSrcRight: downArrow,
        imgSrcleft: "",
        //placeHolderText:  selectedChannel?.length ? selectedChannel?.join(" ") : "Select"
        placeHolderText :  selectedChannel?.length ? selectedChannel : "Select Channel"
      };
      const langOptions ={
        imgSrcRight: downArrow,
        imgSrcleft: "",
       // placeHolderText:  selectedLanguage?.length ?  selectedLanguage?.[0]+(selectedLanguage?.length>1 ? ("+".concat(selectedLanguage?.length-1)) : ""): "Select"
         placeHolderText : selectedLanguage?.length ? selectedLanguage  : "Select Language"
      }

      const PostOptions ={
        imgSrcRight: downArrow,
        imgSrcleft: "",
        placeHolderText:  selectedPostEmi?.length ?  selectedPostEmi?.[0]+ (selectedPostEmi?.length >1 ? ("+".concat(selectedPostEmi?.length-1)) : "")  : props.campaignSelectedData?.flowType !== "Pre-Due"  && props.campaignSelectedData?.flowType?.["Post-Due"] ?.length?  props.campaignSelectedData?.flowType?.["Post-Due"] : "Select"

      }

      const propsForChannelDropdown = {
        optionList: ["", "Email","SMS"]
    }

      useEffect(() => {
          if(parentName?.length &&  selectedLanguage?.length && selectedChannel?.length && (newCampaignName?.length >=3) && hidebtn
          ){
              setDisButton(prev =>false)

          }
          else{
              setDisButton(prev => true)
          }
      },[selectedPostEmi , selectPre , selectedLanguage , selectedChannel , hidebtn,parentName, newCampaignName ])

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
            data => {return   setGetFlowPre(data.data.data[0].subFlow)}
          )
          setSelectPre(pre=> "Pre-Due")
        //   setSelectedPostEmi(prev => null)

      }
      useEffect(
          () => {
         if(parentName?.includes("Pre-Due")){  //change
          getPreDue()
         }

           }, [parentName]  //change selPreDue

      )

    //   useEffect(
    //       () => {
    //           if( !selectedPostEmi?.length && !selPreDue ){
    //           setSelectedPostEmi(prev => props.EditData?.flowType)
    //           }
    //           if(props.campaignSelectedData && !props.EditData?.flowType && !selPreDue && props.campaignSelectedData?.flowType !== "Pre-Due" ){
    //               console.log("bhai mere" , "inside")
    //             setSelectedPostEmi(prev => props.campaignSelectedData?.flowType)
    //           }
    //           else if(props.campaignSelectedData?.flowType === "Pre-Due" && !props.EditData?.flowType  && !selectPostEmi ){

    //             setSelectPostEmi(false)
    //             setSelPreDue(true)
    //           }

    //       }, [props.EditData , selectPostEmi , selPreDue ]
    //   )
    // useEffect(
    //     () => {
    //         if(selectPostEmi?.length){
    //         if(typeof(props.campaignSelectedData?.flowType) !== "object" &&props.campaignSelectedData?.flowType !=="Pre-Due"  ){
    //             setSelectedPostEmi(prev => [...props.campaignSelectedData?.flowType ])
    //         }
    //         else if(typeof(props.campaignSelectedData?.flowType) === "object" && props.campaignSelectedData?.flowType?.["Post-Due"]  ){
    //             setSelectedPostEmi(prev => [...props.campaignSelectedData?.flowType?.["Post-Due"] ])
    //         }
    //     }

    //     },[selectedPostEmi]
    // )
    const btnUploadHide = (data) => {
        setHidebtn(data)
    }
    // useEffect(
    //     () => {
    //         if(props.campaignEditUpdateType === 'edit'){
    //             setHidebtn(false)
    //         }
    //     }, [props.campaignEditUpdateType]
    // )

    // const getSelectedData=(parent,child ,e)=>{

    //    console.log("p" , e.target.checked , parent ,child, e.target.value)
    //    if( typeof(child) !=="object"){
    //        console.log("lop1")
    //       if(arrSel?.includes(parent) ) {
    //           console.log("ha")
    //         let g =  arrSel?.indexOf(parent)
    //         console.log("pppp" ,g)
    //         arrSel.splice(g, 1)
    //         setarrSel(prev => [...arrSel , parent+"-"+child])
    //       }
    //       else{
    //           if(!arrSel.includes(parent+"-"+child)){
    //             let newArr = arrSel?.filter(
    //                 e => {return  !e?.includes("post")}
    //             )
    //         setarrSel(prev => [...newArr , parent+"-"+child])}
    //       }
    //    }
    //    else if(e.target.checked){
    //     console.log("lop2")
    //     setParentName(parent)
    //     setChildName(child)
    //     setarrSel(prev =>  [...arrSel , parent] )
    //    }else if(e.target.checked ===false){
    //     console.log("lop3")
    //        console.log(arrSel)
    //      let g =  arrSel?.indexOf(parent)
    //      console.log(g)
    //      if(g >-1){
    //      arrSel.splice(g, 1);}
    //      console.log(arrSel)
    //      setarrSel(prev => [...arrSel])
    //    }
    //    if(e.target.checked ===false && typeof(child) ==="object"){
    //        let newArr = arrSel?.filter(
    //            e => {return  !e.includes("post")}
    //        )
    //        console.log(newArr , "loop last")
    //        setarrSel(prev => [...newArr])
    //    }
    // //    setarrSel(prev => [...arrSel , parent+"-"+child])
    //  }
    //  useEffect(
    //      () => { return setSelectedParentChild(arrSel)},[arrSel]
    //  )

    // const getSelectedData =(parent,child,e) => {
    //      if(e.target.checked){
    //       let keys =   arrSel?.map( e => {return e.flow })
    //       console.log(keys , "abhi")
    //       if( !keys.includes(parent)){
    //          let data = {
    //          }
    //          if(!child?.length){
    //              child = []

    //          }else{
    //              let arr = child?.map(data => data.name)
    //              child =arr
    //          }
    //          data["flow"] = parent
    //          data["subflow"] = child
    //          setarrSel(prev => [...arrSel , data])
    //       }
    //      }
    //      else{
    //          let newArr = arrSel.filter(
    //              (data) => { return data["flow"] !== parent}
    //          )
    //          setarrSel(prev => [...newArr])
    //      }

    // }

//   const  getChildSelected =(parent , subChild ,e) => {
//          if(e.target.checked){
//              let arr =[]
//              let dataObj =arrSelchild?.[parent]
//              if(dataObj?.length){
//              if(!dataObj?.includes(subChild)){
//                  arr = arrSelchild?.[parent]
//                 arr.push(subChild)
//                 console.log("if")
//              }
//             }
//             else{

//                 arr.push(subChild)
//                 console.log("else" ,subChild)
//             }
//             let obj = {}
//             console.log("abhi" ,arr)
//             obj[parent] = arr
//             setarrSelchild(obj)
//          }
//          else{
//             let dataObj =arrSelchild?.[parent]
//            let newArr = dataObj?.filter(child => {return child !== subChild})
//            let obj = {}
//            obj[parent] = newArr
//            setarrSelchild(obj)
//          }
// //   }

//   useEffect(
//        () => {
//            if(arrSelchild){

//             arrSel?.map(e => {
//                 if(e["flow"] ==="Post-Due"){
//                 e["subflow"] = arrSelchild["Post-Due"]

//              } })
//                 setarrSel([...arrSel])

//            }

//        },[arrSelchild ]
//   )
//   useEffect(
//       () => {
//         let arrPrent = arrSel?.map( e => e.flow)
//         setParentName(prev => [...arrPrent])
//         if(arrPrent?.includes("Post-Due")){
//         let ans= arrSel?.map( e=> {
//              if(e.flow ==="Post-Due"){
//                  if(e.subflow?.length >0)
//                 return e.subflow
//              }
//          })
//            console.log("abhishek" ,ans)
//          setChildName(prev => ans)
//         }
//       },[arrSel]
//   )

  const getFlow =(data , e ) => {
        if (parentName?.includes(data)) {
        let tempArr = [...parentName]
        const indexr = tempArr.indexOf(data);
        if (indexr > -1) {
            if(data ==="Post-Due"){
                setChildName(prev => [])
            }
            tempArr.splice(indexr, 1);
        }
        setParentName(prevState => {
            return [...tempArr]
        })

    } else {

        if(data ==="Post-Due"){
            setParentName(prevState => {
                return [...prevState, data]
            })
                setChildName(prev => propsForPostEmiDropdown)
        }else{
        setParentName(prevState => {
            return [...prevState, data]
        })
    }
    }
    setHidebtn(true)
    setChangeClick(true)
  }
  const getFlows =(data ,e) => {
    if (childName?.includes(data)) {
        let tempArr = [...childName]
        const indexr = tempArr.indexOf(data);
        if (indexr > -1) {
            tempArr.splice(indexr, 1);
        }
        setChildName(prevState => {
            return [...tempArr]
        })

    } else {
        if(!parentName?.includes("Post-Due")){
            setParentName(prevState => {
                return [...prevState, "Post-Due"]
            })
        }
        setChildName(prevState => {
            if(prevState){
                return [...prevState, data]
            }
            else{
                return [ data]
            }
            
        })
    }
    setHidebtn(true)
    setChangeClick(true)
  }
    useEffect(
        () => {
            if(parentName?.length){
            if(parentName?.includes("Post-Due") &&props.campaignEditUpdateType !== 'edit') {
                // setChildName(prev => propsForPostEmiDropdown)
            }
            }
            // if(!parentName?.includes("Post-Due")){
            //     if(childName?.length >0){
            //     setChildName(prev => [])
            //     }
            // }
        },[parentName ,childName]
    )
    useEffect(
        () => {
            if(!childName?.length){
             let arr = parentName?.filter(e => e !=="Post-Due")
             setParentName(arr)
            }
        },[childName ]
    )
    //channel btn
    const clickedBtn =(data)  => {
        if(selectedChannel?.includes(data)){
            let tempArr = [...selectedChannel];
            const indexr = tempArr.indexOf(data);
            if (indexr > -1) {
              tempArr.splice(indexr, 1);
            }
            setSelectedChannel((prevState) => {
              return [...tempArr];
            });

        }
        else{

            setSelectedChannel(prev => [...prev , data])
        }
        setHidebtn(true)
        setChangeClick(true)
    }



     let arrChannelOmni = [
         {name : "Call" ,
         imgActive : callActive ,
         imgUnActive :callunActive,
         disable : !(props.userLoginInfo?.accountDetails[0]?.channels?.includes("Call")) || props?.EditData?.id ? true : false
        },
         {
            name :"WhatsApp",
             imgActive :whatsAppActive ,
             imgUnActive :whatsAppunActive,
             disable : !(props.userLoginInfo?.accountDetails[0]?.channels?.includes("Whatsapp")) || props?.EditData?.id ? true : false
         },
         {
            name :"Mail" ,
            imgActive :emailunActive,
             imgUnActive :emailunActive  ,
             disable :true
         },
         {
            name :"SMS" ,
            imgActive :smsunActive ,
            imgUnActive :smsunActive ,
            disable : true
         }
     ]

  return (
    <div className='ConfigurationCampaignWrapper'>
        <div className='AgentConfigurationDiv'>
            <div className='OuterDiv'>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img src={campaignNameIcon} width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Campaign Name:</h2>
                </div>
                <div className='heightCampName'>
                 <input type="text" className= {`inputNameCamp ${!newCampaignName?.length ? "colorPlaceholder" : ""}`  }
                 placeholder='Campaign Name'
                 value={newCampaignName}
                  onChange ={(e) => onChangeCampaignNewName(e.target.value)}
                  readOnly={props.campaignCredentials?.isChildCampaign ?  "readonly" : false}
                 />
                  {/* {errMessageCamp?.length &&<div >
                   <ErrorMessage
                          errorMessage={errMessageCamp} />
                   </div>
                } */}
                 </div>

            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img  src ={channelIcon}  width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Channels:</h2>
                </div>
                <div  className='dropDownDivChannel'>
                    {/* <MultiSelectDropdown
           options={options}
           toBeFilterData={ propsForChannelDropdown && Object.values(propsForChannelDropdown.optionList).length>0?Object.values(propsForChannelDropdown.optionList):[]}
           extraSelectedClass="languageDropdown"
           getFilteredData={(value) =>onChangeChannel(value)}
           key="dispositionMultiSelectOne"
           selectedDataOutside={ selectedChannel ? [...selectedChannel] : propsForChannelDropdown.optionList}
           isDisable={props.disableFilterList?.includes('Disposition') ? true : false}
           extraPlaceHolderStyle = "placeholderMultiStyleAgent"
          /> */}
             { arrChannelOmni?.map((e ,i) => {
                 return (
                    <div key={i} className='channelBtns'>
                    <ChannelOmni name = {e.name}
                    imgActive = {e.imgActive }
                    imgUnActive ={e.imgUnActive}
                    onselect ={clickedBtn }
                     outSideSelect = {selectedChannel?.includes(e.name)}
                     disable ={e?.disable}
                     />
                     </div>
                 )
             }

             )}
                </div>
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img  src= {flowIcon} width ={"50px"}
                    alt='img'></img>
                    <h2 className='heading'>Flow:</h2>
                </div>
                {/* <div className='TwoDropDownDiv'> */}
                {/* <div> */}
                    <div className='dropDownDiv'>
                    <MultiLevel
         mapData={[{flow : "Pre-Due" } ,{ flow : "Post-Due" , flows : propsForPostEmiDropdown}
        ]}
        icon = {downArrow}
        selectedData={getFlow}
        selctChildData = {getFlows}
        selectedParentChild={selectedParentChild}
        parent={parentName}
        child={childName}
        selectedSubChild = {arrSel}
         />
                    {/* <div
                    className ={`${selPreDue ? "highlightStaticDiv" :'staticDivbtn'}`}
                     onClick={() => {return  togglePreDue() }}
                     >
                         <p >
                             Pre-Due
                         </p>
                     </div>
                    <div
                        className ={`${selectPostEmi ? "highlightStaticDiv" :'staticDivbtn'}`}>
                         <p onClick={() => { return getdropDownListShow() ,togglePostDue()} }>
                             Post-Due
                         </p>
                     </div> */}
                    {/* </div> */}

                {/* </div> */}
             {/* <div style={{paddingLeft:"10%"}}>{selectPostEmi ?
                //     <DropDown
                // droplist={propsForPreEmiDropdown}
                // // isFilter={true}
                // searchUi={false}
                // handleSearchItem={selectedPostEmi}
                // selectedItem={(item) =>
                //     onChangePostEmi(item)}
                // extraClassSelectedArea={'preEmidropdown'}
                // extraClassToBeSelectedArea={'dropdowndListArea'}
                // showInitialList = {dropDownListShow}
                // />
                <MultiSelectDropdownOld
                options={PostOptions}
               toBeFilterData={ propsForPostEmiDropdown &&  propsForPostEmiDropdown  }
                extraSelectedClass="languageDropdown"
                getFilteredData={(item) =>onChangePostEmi(item)}
                key="postEmiMultiSelectOne"
               selectedDataOutside={ selectedPostEmi}
                //isDisable={props.disableFilterList?.includes('Disposition') ? true : false}
                extraPlaceHolderStyle = "placeholderMultiStyleAgent"
                toShowListOut = {dropDownListShow}
               />
                : "" } */}
                {/* </div> */}
                </div>

            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img src={languageIcon} width ={"50px"} alt='img'></img>
                    <h2 className='heading'>Language:</h2>
                </div>
                <div className='dropDownDiv'>
                {/* <DropDown
                 droplist={propsForLanguageDropdown}
                 // isFilter={true}
                 searchUi={false}
                 handleSearchItem={selectedLanguage}
                 selectedItem={(item) =>
                    onChangeLanguge(item)}
                 extraClassSelectedArea={'languageDropdown'}
                 extraClassToBeSelectedArea={'dropdowndListArea'}/> */}
             <MultiSelectDropdown
           options={langOptions}
          toBeFilterData={ propsForLanguageDropdown  && propsForLanguageDropdown}
           extraSelectedClass="languageDropdown"
           getFilteredData={(value) =>onChangeLanguge(value)}
           key="dispositionMultiSelectOne"
          selectedDataOutside={ selectedLanguage }
           isDisable={props.disableFilterList?.includes('Disposition') ? true : false}
           extraPlaceHolderStyle = "placeholderMultiStyleAgent"
          />
                 </div>
            </div>
            <div className='ContainDiv'>
                <div className='logoNameDiv'>
                    <img  src ={campaignTypeicon} width ={"50px"}  alt='img'></img>
                    <h2 className='heading'>Campaign Type:</h2>
                </div>
                <div className='dropDownDiv'>
                <div className='staticDiv'>
                         <p>
                             AI Driven
                         </p>
                     </div>
                     <div className='staticDivHuman'>
                         <p>
                             Human Driven
                         </p>
                     </div>
                </div>
            </div>

            {
            // props.campaign ?
            //     <div className='ContainDiv'>
            //     <div className='logoNameDiv'>
            //         <img src={dateRangeIcon} width ={"50px"} alt="img"></img>
            //         <h2 className='heading'>Date Range:</h2>
            //     </div>
            //     <div  className='dropDownDiv'>
            //     <div className='midDate'>
            //     <DateFilter id="dateRangeOne" dateHeader={'show'}
            //       hideBtnUp= {btnUploadHide}
            //       schedulerFilter = {true}
            //       disableRangeMin ={true}
            //       typeText = "campaign"
            //     />
            //   </div>
            //          {/* </div> */}
            //     </div>
            // </div>

        //     :
        //     <div className='ContainDiv'>
        //     <div className='logoNameDiv'>
        //         <img src={mindMapIcon} width ={"50px"} alt="img"></img>
        //         <h2 className='heading'>Mindmap:</h2>
        //     </div>
        //     <div  className='dropDownDiv'>
        //     <div className='staticDiv2'>
        //                  <p>
        //                     {(selectedPostEmi && selectedLanguage )? (selectedPostEmi+ "-" +selectedLanguage )
        //                      : (selPreDue && selectedLanguage )? ("Pre-Due-"+selectedLanguage ): "" }
        //                  </p>

        //              </div>
        //                 <div className='eyeIconDiv'
        //                 onClick={() => props. eyeCall(true)}
        //                   >
        //                 <img
        //                   className={`eyeIcon`}
        //                   src={eyeIcon}
        //                   alt="Eye Icon"
        //                   width={"20px"}
        //                 />
        //                 </div>
        //     </div>
        // </div>
            }

            </div>
        </div>

    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
    return {
        userLoginInfo:state.loginReducer.userLoginInfo,
        filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
        campaignEditUpdateType:state.campaignReducer?.campaignEditUpdateType,
        campaignSelectedData:state.campaignReducer?.campaignSelectedData,
        clientNameRedux : state.campaignReducer?.campaignClientName,
        campaignCredentials: state.campaignReducer.campaignCredentials,
    };
  };
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, loginAction,filterAction,campaignAction),
        dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ConfigureCampaign);

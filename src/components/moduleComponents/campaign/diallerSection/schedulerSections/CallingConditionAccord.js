import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Accord from './Accord/Accord'
import CallingConditionTableData from './CallingConditionTableData'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../../../../../../newChatHistory/Chat-History-Dashboard/src/actions/breadcrumActions";

function CallingConditionAccord(props) {
  const [shuffleData,setShuffleData]=useState([])
    const checkBoxChecked=(data)=>{
        console.log(data)

    }
    const selectedCallingData = useSelector((store)=>{
        return store.breadcrumReducer.selectedCallingData;
      })
      const shuffledCallingCondition=useSelector((store)=>{
        return store.breadcrumReducer.shuffledCallingConditionData
      })

      const preferedTime = useSelector((store) => {
        return store.schedulerReducer?.dialtimeData?.preferedTime;
      });

      const breadCrumReducerData = useSelector((store) => {
        return store.breadcrumReducer;
      });

      useEffect(()=>{
        // if(shuffledCallingCondition?.length>0){
        //   let shuffledData=shuffledCallingCondition.map((each)=>{
        //     return each.text
        //   })
        //   setShuffleData(prev=>shuffledData)
        // }
        if(selectedCallingData?.length>0){
          let shuffledData=selectedCallingData.map((each)=>{
            return each.text
          })
          setShuffleData(prev=>shuffledData)

        }
      },[shuffledCallingCondition,selectedCallingData])

      useEffect(()=>{
        if(selectedCallingData?.length>0){
        let val=selectedCallingData.map((et)=>{
          return et.text
        })
        let tempop=[]
        let tempOpOut=[]
        let testVal=breadCrumReducerData?.callingCondition?.condition.map((ew)=>{
          let index=val.indexOf(ew.text)
          if(index>-1){
            if(ew.text !=="EMI Value"){
              ew.value=selectedCallingData.filter((em)=>em.text==ew.text)[0].values.map((ed)=>{return ed.value})
            }
            tempop[index]=ew
          }else{
            tempOpOut.push(ew)
          }

        })
        let callingSet=Object.assign({},{...breadCrumReducerData.callingCondition})
         callingSet.condition=[...tempop,...tempOpOut]

          props.setCallingCondition(callingSet)
      }
      },[])


    return (
          <Accord
            title={"Calling Condition"}
            content={preferedTime?"":<CallingConditionTableData
            selectedCallingData={selectedCallingData?.length>0 ?[...selectedCallingData]:[]}
            />}
            isChecked={(selectedCallingData?.length>0)?true:false}
            isToggle={false}
            isHideContent={preferedTime?true:false}
          />
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, breadcrumActions),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallingConditionAccord);

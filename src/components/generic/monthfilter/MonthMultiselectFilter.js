
// import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import  MonthPicker  from "./monthsFilter/MonthPicker/MonthPicker";

export default function MonthMultiselectFilter(props) {
  const [selected, setSelected] = useState();
  const [openCalender , setOpenCalender] = useState(false)
 

 

  let date = new Date() ;
  
   
  useEffect(
    () => {
      let start = moment(date).startOf("month").format("YYYY-MM-DDTHH:mm:ss")
     let end = moment(date).endOf("month").format("YYYY-MM-DDTHH:mm:ss")
     
      if(start && end) {
         setSelected(prev => [start ,end])
    }}, []
  )
  const presets = [
    {
      title: "This month",
      start: moment().startOf("month").toDate(),
      end: moment().endOf("month").toDate()
    },
    {
      title: "Past 3 months",
      start: moment().subtract(2, "month").startOf("month").toDate(),
      end: moment().endOf("month").toDate()
    },
    {
      title: "Past 6 months",
      start: moment().subtract(5, "month").startOf("month").toDate(),
      end: moment().endOf("month").toDate()
    },
    {
      title: "This Year",
      start: moment().startOf("year").toDate(),
      end: moment().endOf("year").toDate()
    }
  ];
  useEffect(
      () => {
          if(selected?.length){
            props.getData(selected)
          }
          
      }
      ,[selected]
  )
  const ref = useRef()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
     
      if (openCalender && ref.current && !ref.current.contains(e.target)) {
       setOpenCalender(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openCalender])
  return (
    <div className="pickerPosition" ref= {ref}>
      <MonthPicker
        highlightCol="#0174FF"
        closeDelay={500}
        onChange={(d) => setSelected(d)}
        openCalender = {setOpenCalender}
        closeCalender = {openCalender}
      />
      {/* {selected !== null ? (
        <p>
          Start: {moment(selected[0]).format("D MMM YYYY")} <br />
          End: {moment(selected[1]).format("D MMM YYYY")}
        </p>
      ) : null} */}
    </div>
  );
}
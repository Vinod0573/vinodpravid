import React,{useState, useEffect} from 'react';
import './TextAreaInput.css';

const TextAreaInput = (props) => {
    const [inputMessage, setInputMessage] = useState();
   const handleChangeInputMessage = (e) => {
    const temp = e.target.value;
    setInputMessage(prev =>temp);
    props.handleMessage(temp);
   }

useEffect(()=>{

    if(props?.defaultMessage){
        setInputMessage(prev=>props?.defaultMessage);
    }
},[props?.defaultMessage])

    return(
        <>
        <div className='textAreaWrapper'>
        <div className="textAreaInputTopDiv">
              <div className={`fdFormTextareajpp ${props?.contSmall&&props?.contSmall==true?"smallify":""} `}>
        <textarea className={props.extraClass?props.extraClass:""}
                  value={inputMessage}
                  rows="4"
                  placeholder={props.placeholder ? props.placeholder : ""}
                  onChange={handleChangeInputMessage}
                  style={{width:"97%",border:"none",outline:"none",padding:"1vmax",resize: "none",borderRadius:"7px"}}
                />
                </div>
                </div>
        </div>
        </>
    )
}

export default TextAreaInput
import React,{useEffect, useState} from 'react';
import { FileUploader } from 'react-drag-drop-files';

import "./DragDropFileInput.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../redux/campaign/actions";


const DragDropFileInput = (props) => {
const [title, setTitle] = useState()

const fileTypes = ["CSV","XLS","XLSX"];
const fileTypest = ["DOC","DOCX"]

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    if(file[0]?.name?.length>0){
      setFile(file[0]);
      props.dragdropfile(file[0]);
    }
      
  };


  useEffect(() => {
    if(props.typeUploadClick === 'uploadOne'){
      setTitle(prev => "Upload Call Details")
    }
    else if(props.typeUploadClick === 'uploadTwo'){
      setTitle(prev => "Upload Payment Details")
    }
    else{
      setTitle(prev => props.titleDunny)
    }

  },[props.typeUploadClick])

  const CustomDropArea = () => {
      return(
          <>
          <div className='customDragDropWrapper'>
          <div className='customDropArea'>
              <h3 className='customDropAreapaa'>{title}</h3>
              <p className='customDropAreapaa'>
                {
                  props?.docTrue ? "DOC" :"CSV or Excel Sheet"
                }
              </p>
              <p className='customDropAreapaa'>
              <span>Choose a file or</span> <span>drag it here.</span> 
              </p>
          </div>
      
          </div>
          </>
      )
  }
  return (
     <div className='dragDropWrapper'>
    <div className="dragDropArea">
      <FileUploader
        multiple={true}
        handleChange={(file) => handleChange(file)}
        name="file"
        types={props?.docTrue ? fileTypest :fileTypes}
        // children={<CustomDropArea/>}
      > <CustomDropArea/> </FileUploader>
      <p>{file ? `File name: ${file.name}` : ""}</p>
    </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    typeUploadClick: state.campaignReducer.typeUploadClick,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, campaignAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DragDropFileInput);
//export default DragDropFileInput;

import './ErrorMessage.css';
import ErrorIcon from './ErrorIcon.svg'

const ErrorMessage = (props) =>{
    return(
        <>
        <div className={`errorTopDiv ${props.extraClass ? props.extraClass : ""}`}>
            <img src={ErrorIcon} alt="Error Icon"/>&nbsp;&nbsp;
            <p>{props.errorMessage}</p>
        </div>
        </>
    )
}

export default ErrorMessage;
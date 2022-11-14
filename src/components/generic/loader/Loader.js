import Spinner from "../../../theme/assets/svg/lodder/Saarthiloadinggif.gif";
import Threedots from "../../../theme/assets/svg/lodder/3dots.gif";
import './Loader.css';



const Loader = (props) =>{
    return(
        <>
        <div className="loaderSaarthi">
                <img className="loaderSaarthiGif"
                  src={props.isDot?Threedots:Spinner}
                  alt="spinner"
                />
        </div>
        </>
    )
}

export default Loader;
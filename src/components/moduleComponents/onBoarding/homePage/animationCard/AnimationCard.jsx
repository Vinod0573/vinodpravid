import './AnimationCard.css';
import { data } from "./animationData";

const AnimationCard = () => {

    return (
        <>
            <div className='carouselWrapper' >
              {data.map((each, i) => {
                return (
                  <div key={`${"key"}+${i}`}>
                    <div className={"carouselInner"}>
                      <div className="carouselImg">
                        <img className="animatedImage" src={each.img} />
                      </div>
                      <div className="center">
                        <span className="carouseText">{each.title}</span>
                        <span
                          className="carouseText"
                          style={{ color: "#3DF9D3", fontWeight: "bold" }}
                        >
                          {each.mainTitle}
                        </span>
                        <span className="carouseText">{each.subTiltle}</span>
                      </div>
                    </div>
                  </div>
                );
                        })}
                    )
               
              
            </div>
             
        </>
    )
}

export default AnimationCard
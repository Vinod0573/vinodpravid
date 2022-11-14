import React, { useEffect, useState } from 'react';

import './EngageMessage.css';

const EngageMessage = () => {
    const [vMessage, setVMessage] = useState();
     const [list] = useState(['Call','Message','WhatsApp','E-mail']);
     const [colorList] = useState(['red','green','blue','yellow'])
    const [selectedColor, setSelectedColor]= useState('red')

let counter = 0;
    useEffect(() =>{
        // let temp=counter
      setInterval(() =>{
            if(counter === 4){
                counter = 0
            }
            else{
                counter = counter + 1;
            }
            setVMessage(list[counter])
            setSelectedColor(colorList[counter])
        },1500) 
    },[])


    return(
        <>
        <div className='messageToEngageClWrapper'>
            <div className='messageToEngageClMessage'>
           <p className='leftMessage'> Engage your users on  </p><span className={selectedColor ? selectedColor : 'red'}> {vMessage ? vMessage  :'Call'} </span>
            </div>
        </div>
        </>
    )
}

export default EngageMessage;
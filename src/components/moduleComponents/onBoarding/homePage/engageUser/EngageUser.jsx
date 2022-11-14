import React from 'react';

import './EngageUser.css';

import SuperAgent from '../superagent/SuperAgent'
import OmniChannel from '../omnichannel/OmniChannel'
import SeamlessCx from '../seamlesscx/SeamlessCx'
import MultiLingual from '../multilingual/MultiLingual'

const EngageUser = () => {
return(
    <> 
    <div className='engageUserWrapperjp'>
    <div className='engageUserSection'>
        {/* <div>
            <h2 className='engageUserSectionHead'>
                Engage your users on <span className='pinkSpan'> call</span> 
            </h2>
        </div> */}
        <div>
            <div>
               <SuperAgent/>
            </div>
            <div>
               <OmniChannel/>
            </div>
           
            <div>
                <SeamlessCx/>
            </div>
            <div>
            < MultiLingual/>
        </div>
        </div>
    </div>
    </div>
    </>
)
}

export default EngageUser;
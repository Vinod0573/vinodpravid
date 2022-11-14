import React, { useState } from 'react'
import Table from '../../../components/generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp'
import './History.css'
import {data } from './dummy'
import TableConstant from './TableConstant'


function History() {
    
        const [isLoading, setIsLoading] = useState('loaded');
        const handleEdit = (item) => () => {
          // write your logic
          alert(JSON.stringify(item))
        }
  return (
    <div className='historyWrapper'>
        <div className='historyDiv'>
            <div className='tableDiv'>
                <Table 
                data = {data}
                cols = {TableConstant(handleEdit)} 
                isLoading={isLoading}
                extraClassTBody= "tableBody"
                />
            </div>
        </div>
    </div>
  )
}

export default History
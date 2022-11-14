import React from 'react';


function TableConstants() {


    return (

        [
            {
                title: "Sr. No.",
                render: (rowData, indx, pageNo) => {
                    return <span>{(pageNo - 1) * 15 + indx + 1}.</span>;
                },
            },

            {
                title: 'Contact',
                render: rowData => {
                    return <span>{rowData.phone}</span>;
                },
            },

            {
                title: "Loan ID",

                render: rowData => {
                    return <span>{rowData.loanId}  </span>;
                },
            },

            {
                title: 'Status',
                render: rowData => {
                    return <span>{rowData.paymentStatus ? rowData.paymentStatus : "Unpaid" }</span>;
                },
            },

            {
                title: 'Amount',
                render: rowData => {
                    return <span>{rowData.emiAmount}</span>;
                },
            },
            {
                title: 'Paid Amount',
                render: rowData => {
                    return <span>{rowData.paidAmount}</span>;
                },
            },
            {
                title: 'Is Partial',
                render: rowData => {
                    return <span>{rowData.isPartial===true? "True" : "False"}</span>;
                },
            },
            {
                title: 'Payment ID',
                render: rowData => {
                    return <span>{rowData.paymentIdentifier}</span>;
                },
            },
        ]

    )
}

export default TableConstants
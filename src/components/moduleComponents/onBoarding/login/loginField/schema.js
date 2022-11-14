export const schema ={
    "analytics": {
        "Debt Collection": {
            "Campaign": {
                "Whatsapp": {
                    "oneWay": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "kpiDetails":{

                            "cardPosition":1,
                            
                            "chartPosition":2,
                            
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4",
                                            "position": 1
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D",
                                            "position": 2
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                }
                            ],
                        },
                        
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "twoWay": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "kpiDetails":{

                            "cardPosition":1,
                            
                            "chartPosition":2,
                            
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                },
                                {
                                    "name": "Avg. First Response Time",
                                    "referenceKey": "card_details.averageResponseTime",
                                    "icon": "responseTime",
                                    "position": 2,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7300cdd5d3dbe0536e1",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Sent",
                                    "referenceKey": "card_details.sent",
                                    "icon": "message sent",
                                    "position": 3,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7750cdd5d3dbe0536e6",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Failed",
                                    "referenceKey": "card_details.failed",
                                    "icon": "message failed",
                                    "position": 4,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7bb0cdd5d3dbe0536ea",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                    "kpiCustomizationName": "Payment Delay Reason",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "reason",
                                            "icon": "",
                                            "referenceKeyName": "reason",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "reason_count",
                                            "icon": "",
                                            "referenceKeyName": "reason_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "reason_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 3,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Chat Disposition",
                                    "kpiCustomizationName": "Chat Disposition",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "disposition",
                                            "icon": "",
                                            "referenceKeyName": "disposition",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "disposition_count",
                                            "icon": "",
                                            "referenceKeyName": "disposition_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "disposition_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 4,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "PTP Distribution: Date Wise",
                                    "kpiCustomizationName": "PTP Distribution",
                                    "chartType": "barChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "400px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "legendData": [
                                        "Count of PTP Given"
                                    ],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Date",
                                            "icon": "",
                                            "referenceKeyName": "ptp_date",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "Count of PTP Given",
                                            "icon": "",
                                            "referenceKeyName": "ptp_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "ptp_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "600px",
                                            "overflowX": "scroll",
                                            "overflowY": "hidden"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 5,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Seen",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Revert",
                                            "icon": "revertIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "Revert",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "No Revert",
                                            "icon": "notRevertIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "No Revert",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 6,
                                    "isActive": true
                                }
                            ],
                        },
                        
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "Call": {
                    "filters": [
                        {
                            "name": "Language",
                            "position": 1,
                            "backendReference": "language",
                            "id": "633ab39d2b25096f8e191ac9"
                        },
                        {
                            "name": "Flow",
                            "position": 2,
                            "backendReference": "flow_type",
                            "id": "633ab3b62b25096f8e191acd"
                        },
                        {
                            "name": "Disposition",
                            "position": 3,
                            "backendReference": "disposition",
                            "id": "633ab3d52b25096f8e191ad1"
                        },
                        {
                            "name": "Region",
                            "position": 4,
                            "backendReference": "region",
                            "id": "633ab4002b25096f8e191ad5"
                        }
                    ],
                    "kpiDetails":{

                        "cardPosition":1,
                        
                        "chartPosition":2,
                        
                        "cards": [
                            {
                                "name": "AHT(Sec)",
                                "referenceKey": "card_details.aht",
                                "icon": "aht",
                                "position": 7,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Allocated",
                                "referenceKey": "card_details.total_allocated",
                                "icon": "allocated",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b7300cdd5d3dbe0536e1",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Connected",
                                "referenceKey": "card_details.total_connected_calls",
                                "icon": "connected",
                                "position": 2,
                                "kpiCustomisationName": "",
                                "id": "6336b7750cdd5d3dbe0536e6",
                                "isActive": true
                            },
                            {
                                "name": "Total Connected Calls",
                                "referenceKey": "card_details.totalConnected",
                                "icon": "total connected",
                                "position": 4,
                                "kpiCustomisationName": "",
                                "id": "6336b7bb0cdd5d3dbe0536ea",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Not Connected",
                                "referenceKey": "card_details.not_connected",
                                "icon": "total not connected",
                                "position": 3,
                                "kpiCustomisationName": "",
                                "id": "6336b8060cdd5d3dbe0536ee",
                                "isActive": true
                            },
                            {
                                "name": "Total Not Connected Calls",
                                "referenceKey": "card_details.totalNotConnected",
                                "icon": "total- not connected",
                                "position": 5,
                                "kpiCustomisationName": "",
                                "id": "6336b8450cdd5d3dbe0536f2",
                                "isActive": true
                            },
                            {
                                "name": "Talk Time(Min)",
                                "referenceKey": "card_details.total_talk_time_in_mins",
                                "icon": "total talk time",
                                "position": 6,
                                "kpiCustomisationName": "",
                                "id": "6336b88b0cdd5d3dbe0536f6",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Call Objective",
                                "kpiCustomizationName": "Call Objective",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Successful (SL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "SL",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Unsuccessful (UL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UL",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "callObjective",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "700px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 13,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Payment Mode",
                                "kpiCustomizationName": "Payment Mode",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "e-NACH",
                                        "icon": "enachIcon",
                                        "referenceKeyName": "eNanch",
                                        "shortKey": "e-NACH",
                                        "fillColor": "#0066FF",
                                        "position": 1
                                    },
                                    {
                                        "name": "Payment Link (PL)",
                                        "icon": "paymentIcon",
                                        "referenceKeyName": "paymentLink",
                                        "shortKey": "PL",
                                        "fillColor": "#1DEBA4",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "paymentMode",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 12,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Agent Referral",
                                "kpiCustomizationName": "Agent Referral",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "agentReferral",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 11,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Sentiment",
                                "kpiCustomizationName": "Customer Sentiment",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Positive (+ve)",
                                        "icon": "positiveIcon",
                                        "referenceKeyName": "positive",
                                        "shortKey": "+ve",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Negative (-ve)",
                                        "icon": "negativeIcon",
                                        "referenceKeyName": "negative",
                                        "shortKey": "-ve",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalSentimentIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "customerSentiment",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 10,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Willingness To Pay",
                                "kpiCustomizationName": "Willingness To Pay",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "uiIcon",
                                        "referenceKeyName": "na",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "willingnessToPay",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 9,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls Responded vs Time Slot",
                                "kpiCustomizationName": "Calls Responded vs Time Slot",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Customer Connected",
                                    "Time Slot"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Time Slot",
                                        "icon": "",
                                        "referenceKeyName": "timeSlot",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "timeSlotDistribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 8,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                "kpiCustomizationName": "Payment Delay Reason",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "reason",
                                        "icon": "",
                                        "referenceKeyName": "reason",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "reason_count",
                                        "icon": "",
                                        "referenceKeyName": "reason_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "reason_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 7,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Call Disposition",
                                "kpiCustomizationName": "Call Disposition",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "disposition",
                                        "icon": "",
                                        "referenceKeyName": "disposition",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "disposition_count",
                                        "icon": "",
                                        "referenceKeyName": "disposition_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "disposition_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 6,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Day-Wise Connected Calls",
                                "kpiCustomizationName": "Day-Wise Connected Calls",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Day-Wise Connected Calls",
                                    "Date"
                                ],
                                "legendColor": [
                                    {
                                        "year": "2021",
                                        "fillColor": "#6041E8"
                                    },
                                    {
                                        "year": "2022",
                                        "fillColor": "#9ADBF9"
                                    },
                                    {
                                        "year": "2023",
                                        "fillColor": "#5B5FF9"
                                    }
                                ],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "duration",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "customer_connected_distribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Outbound Calls: Attempt Count",
                                "kpiCustomizationName": "Attempt Count",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of Unique Account Called",
                                    "No of Attempt",
                                    "Percentage of Unique Account Called"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "No. of Attempt",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Account Called",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count_number",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "attempt_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "PTP Distribution: Date Wise",
                                "kpiCustomizationName": "PTP Distribution",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Count of PTP Given"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "ptp_date",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Count of PTP Given",
                                        "icon": "",
                                        "referenceKeyName": "ptp_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "ptp_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls < 10 sec Vs Calls >= 10 sec",
                                "kpiCustomizationName": "Calls < 10 sec vs >= 10 sec",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "calls < 10s",
                                    "calls >= 10s"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "calls_less_than_10s",
                                        "shortKey": "calls < 10s",
                                        "fillColor": "#6041E8",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "calls_greater_than_10s",
                                        "shortKey": "calls >= 10s",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Unique Accounts Connected Vs Not Connected",
                                "kpiCustomizationName": "Unique Connected vs Not Connected",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Total connected",
                                    "Total not connected"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "total_connected_calls",
                                        "shortKey": "Total connected",
                                        "fillColor": "#52E9AB",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "not_connected",
                                        "shortKey": "Total  not connected",
                                        "fillColor": "#FF6D4D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            }
                        ],
                    },
                    
                    "sidebarModules": [
                        {
                            "name": "Datepicker",
                            "isActive": true,
                            "position": 1
                        },
                        {
                            "name": "Last Updated",
                            "isActive": true,
                            "position": 2
                        },
                        {
                            "name": "Filter",
                            "isActive": true,
                            "position": 3
                        },
                        {
                            "name": "Download",
                            "isActive": true,
                            "position": 4,
                            "keys": [
                                {
                                    "mainKey": "Download",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "All View",
                                            "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                            "type": "radio"
                                        },
                                        {
                                            "keyName": "All Data",
                                            "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Format",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "PDF",
                                            "info": "",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Download",
                                    "type": "button"
                                }
                            ]
                        },
                        {
                            "name": "KPI customisation",
                            "isActive": true,
                            "position": 5
                        },
                        {
                            "name": "Shuffle Column",
                            "isActive": true,
                            "position": 6
                        }
                    ],
                    "reportColumns": [
                        {
                            "_id": "6336ccbd43caa52bc7424ac6",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Sr. No",
                            "originalName": "Sr. No",
                            "position": 1,
                            "referancKeyName": "srNo",
                            "backendReferancKeyName": "srNo"
                        },
                        {
                            "_id": "6336cd6b43caa52bc7424aca",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Contact Number",
                            "originalName": "Contact Number",
                            "position": 2,
                            "referancKeyName": "information.phone_number",
                            "backendReferancKeyName": "information.phone_number"
                        },
                        {
                            "_id": "6336d89443caa52bc7424ace",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Date",
                            "originalName": "Date",
                            "position": 3,
                            "referancKeyName": "date",
                            "backendReferancKeyName": "date"
                        },
                        {
                            "_id": "6336d9058a59164ca748cb65",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Time",
                            "originalName": "Time",
                            "position": 4,
                            "referancKeyName": "time",
                            "backendReferancKeyName": "time"
                        },
                        {
                            "_id": "6336d9888a59164ca748cb69",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Loan ID",
                            "originalName": "Loan ID",
                            "position": 5,
                            "referancKeyName": "information.loan_id",
                            "backendReferancKeyName": "information.loan_id"
                        }
                    ],
                    "Summary": [
                        {
                            "mainKey": "Customer Profile",
                            "subKey": [
                                {
                                    "keyName": "Name",
                                    "referenceKeyName": "-"
                                },
                                {
                                    "keyName": "Gender",
                                    "referenceKeyName": "-"
                                }
                            ]
                        },
                        {
                            "mainKey": "Conversation",
                            "subKey": [
                                {
                                    "keyName": "Flow Type",
                                    "referenceKeyName": "data[0].information.[flow_type]"
                                },
                                {
                                    "keyName": "PTP Date",
                                    "referenceKeyName": "data[0].information.[ptp_date]"
                                },
                                {
                                    "keyName": "EMI Date",
                                    "referenceKeyName": "data[0].information.[emiDate]"
                                },
                                {
                                    "keyName": "Delay Reason",
                                    "referenceKeyName": "data[0].information.[reason]"
                                },
                                {
                                    "keyName": "Disposition",
                                    "referenceKeyName": "data[0].information.[disposition]"
                                }
                            ]
                        }
                    ]
                },
                "SMS": {},
                "Mail": {}
            },
            "Payment": {
                "Whatsapp": {},
                "Call": {
                    "filters": [
                        {
                            "name": "Language",
                            "position": 1,
                            "backendReference": "language",
                            "id": "633ab39d2b25096f8e191ac9"
                        },
                        {
                            "name": "Flow",
                            "position": 2,
                            "backendReference": "flow_type",
                            "id": "633ab3b62b25096f8e191acd"
                        },
                        {
                            "name": "Disposition",
                            "position": 3,
                            "backendReference": "disposition",
                            "id": "633ab3d52b25096f8e191ad1"
                        },
                        {
                            "name": "Region",
                            "position": 4,
                            "backendReference": "region",
                            "id": "633ab4002b25096f8e191ad5"
                        }
                    ],
                    "kpiDetails":{

                        "cardPosition":1,
                        
                        "chartPosition":2,
                        
                        "cards": [],
                    "charts": [
                        {
                            "chartTitle": "Payment Collection Status",
                            "kpiCustomizationName": "Payment Collection Status",
                            "chartType": "donut",
                            "chartStyle": {
                                "width": "550px",
                                "height": "400px",
                                "margin": "20px",
                                "innerWidth": "450px",
                                "innerHeight": "260px",
                                "innerRadius": "55px",
                                "outerRadius": "80px"
                            },
                            "legendData": [],
                            "legendColor": [],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "Total Full Payment (TFP)",
                                    "icon": "fullPaymentIcon",
                                    "referenceKeyName": "totalFullPaymentCollected",
                                    "shortKey": "TFP",
                                    "fillColor": "#1DEBA4",
                                    "position": 1
                                },
                                {
                                    "name": "Total Partial Payment (TPP)",
                                    "icon": "partialPaymentIcon",
                                    "referenceKeyName": "totalPartialPaymentCollected",
                                    "shortKey": "TPP",
                                    "fillColor": "#F9BD53",
                                    "position": 2
                                },
                                {
                                    "name": "Total Pending Payment (TP)",
                                    "icon": "pendindPaymentIcon",
                                    "referenceKeyName": "totalPending",
                                    "shortKey": "TP",
                                    "fillColor": "#FD4B33",
                                    "position": 3
                                }
                            ],
                            "refenceKeyForData": "data",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1200px",
                                    "height": "620px",
                                    "margin": "10px"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": false
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 1,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Timely vs Late Payment",
                            "kpiCustomizationName": "Timely vs Late Payment",
                            "chartType": "donut",
                            "chartStyle": {
                                "width": "550px",
                                "height": "400px",
                                "margin": "20px",
                                "innerWidth": "450px",
                                "innerHeight": "280px",
                                "innerRadius": "60px",
                                "outerRadius": "85px"
                            },
                            "legendData": [],
                            "legendColor": [],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "Timely Payment (TP)",
                                    "icon": "timelyPaymentIcon",
                                    "referenceKeyName": "timely",
                                    "shortKey": "TP",
                                    "fillColor": "#1DEBA4",
                                    "position": 1
                                },
                                {
                                    "name": "Late Payment (LP)",
                                    "icon": "latePaymentIcon",
                                    "referenceKeyName": "lately",
                                    "shortKey": "LP",
                                    "fillColor": "#FD4B33",
                                    "position": 2
                                }
                            ],
                            "refenceKeyForData": "data",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "10px"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": false
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 2,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Total Connected Calls: Payment Failure Reason",
                            "kpiCustomizationName": "Payment Failure Reason",
                            "chartType": "pieChart",
                            "chartStyle": {
                                "width": "1200px",
                                "height": "600px",
                                "margin": "20px"
                            },
                            "legendData": [],
                            "legendColor": [],
                            "TableHeading": [
                                "Reason",
                                "count"
                            ],
                            "keys": [
                                {
                                    "name": "reason",
                                    "icon": "",
                                    "referenceKeyName": "reason",
                                    "shortKey": "",
                                    "fillColor": "",
                                    "position": 1
                                },
                                {
                                    "name": "reasonCount",
                                    "icon": "",
                                    "referenceKeyName": "reasonCount",
                                    "shortKey": "",
                                    "fillColor": "",
                                    "position": 2
                                }
                            ],
                            "refenceKeyForData": "paymentFailureReasonDetails",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1270px",
                                    "height": "700px",
                                    "margin": "20px"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": true
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 3,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Preferred Payment Time",
                            "kpiCustomizationName": "PTP Distribution",
                            "chartType": "barChart",
                            "chartStyle": {
                                "width": "550px",
                                "height": "460px",
                                "margin": "20px"
                            },
                            "legendData": [
                                "Customer Count in Morning",
                                "Customer Count in Afternoon",
                                "Customer Count in Evening"
                            ],
                            "legendColor": [],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "Time Slot",
                                    "icon": "",
                                    "referenceKeyName": "ptp_date",
                                    "shortKey": "",
                                    "fillColor": "#FF6D4D",
                                    "position": 1
                                },
                                {
                                    "name": "Paid Customer Count",
                                    "icon": "",
                                    "referenceKeyName": "ptp_count",
                                    "shortKey": "",
                                    "fillColor": "#52E9AB",
                                    "position": 2
                                }
                            ],
                            "slots": [
                                {
                                    "keyName": "Morning (12AM-12PM)",
                                    "referenceKeyName": "morning"
                                },
                                {
                                    "keyName": "Afternoon (12PM-6PM)",
                                    "referenceKeyName": "afternoon"
                                },
                                {
                                    "keyName": "Evening (6PM-12AM)",
                                    "referenceKeyName": "evening"
                                }
                            ],
                            "refenceKeyForData": "prefferedPaymentTime",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1100px",
                                    "height": "650px",
                                    "margin": "10px"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": false
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 4,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Paid Customer - Attempt Count",
                            "kpiCustomizationName": "Attempt Count",
                            "chartType": "barChart",
                            "chartStyle": {
                                "width": "1200px",
                                "height": "450px",
                                "overflowX": "scroll",
                                "overflowY": "hidden"
                            },
                            "legendData": [
                                "No of Attempts",
                                "No. of Paid Customer"
                            ],
                            "legendColor": [],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "Attempts Taken to Collect",
                                    "icon": "attempt",
                                    "referenceKeyName": "attempt",
                                    "shortKey": "calls < 10s",
                                    "fillColor": "",
                                    "position": 1
                                },
                                {
                                    "name": "Paid Customer Count",
                                    "icon": "attemptCount",
                                    "referenceKeyName": "attemptCount",
                                    "shortKey": "calls >= 10s",
                                    "fillColor": "",
                                    "position": 2
                                }
                            ],
                            "refenceKeyForData": "numOfAttemptToCollectDetails",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1270px",
                                    "height": "600px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": true
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 5,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Day Wise Collection Status",
                            "kpiCustomizationName": "Day Wise Collection Status",
                            "chartType": "lineChart",
                            "chartStyle": {
                                "width": "1200px",
                                "height": "450px",
                                "overflowX": "scroll",
                                "overflowY": "hidden"
                            },
                            "legendData": [
                                "Customer Count",
                                "Amount"
                            ],
                            "legendColor": [
                                {
                                    "year": "2021",
                                    "fillColor": "#6041E8"
                                },
                                {
                                    "year": "2022",
                                    "fillColor": "#9ADBF9"
                                },
                                {
                                    "year": "2023",
                                    "fillColor": "#5B5FF9"
                                }
                            ],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "Payment Date",
                                    "icon": "",
                                    "referenceKeyName": "date",
                                    "shortKey": "",
                                    "fillColor": "",
                                    "position": 1
                                },
                                {
                                    "name": "Customer Count",
                                    "icon": "",
                                    "referenceKeyName": "customerCount",
                                    "shortKey": "",
                                    "fillColor": "",
                                    "position": 2
                                },
                                {
                                    "name": "Total Collection",
                                    "icon": "",
                                    "referenceKeyName": "totalCollection",
                                    "shortKey": "",
                                    "fillColor": "",
                                    "position": 3
                                }
                            ],
                            "refenceKeyForData": "dayWiseCollectionStatusDetails",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1270px",
                                    "height": "600px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": true
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 6,
                            "isActive": true
                        },
                        {
                            "chartTitle": "Payment Link Channel",
                            "kpiCustomizationName": "Payment Link Channel",
                            "chartType": "donut",
                            "chartStyle": {
                                "width": "550px",
                                "height": "450px",
                                "margin": "20px",
                                "innerWidth": "500px",
                                "innerHeight": "300px",
                                "innerRadius": "60px",
                                "outerRadius": "100px"
                            },
                            "legendData": [],
                            "legendColor": [],
                            "TableHeading": [],
                            "keys": [
                                {
                                    "name": "SMS",
                                    "icon": "smsModeIcon",
                                    "referenceKeyName": "sms",
                                    "shortKey": "SMS",
                                    "fillColor": "#1DEBA4",
                                    "position": 1
                                },
                                {
                                    "name": "Email",
                                    "icon": "emailModeIcon",
                                    "referenceKeyName": "email",
                                    "shortKey": "Email",
                                    "fillColor": "#FD4B33",
                                    "position": 2
                                },
                                {
                                    "name": "WhatsApp",
                                    "icon": "whatsappModeIcon",
                                    "referenceKeyName": "whatsapp",
                                    "shortKey": "WhatsApp",
                                    "fillColor": "#0174FF",
                                    "position": 3
                                }
                            ],
                            "refenceKeyForData": "data",
                            "expand": {
                                "showExpandButton": true,
                                "expandStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "10px"
                                },
                                "isExpanded": false
                            },
                            "sort": {
                                "showSortButton": false
                            },
                            "download": {
                                "showDownloadButton": true
                            },
                            "position": 7,
                            "isActive": true
                        }
                    ],
                    },
                    
                    "sidebarModules": [
                        {
                            "name": "Datepicker",
                            "isActive": true,
                            "position": 1
                        },
                        {
                            "name": "Last Updated",
                            "isActive": true,
                            "position": 2
                        },
                        {
                            "name": "Filter",
                            "isActive": true,
                            "position": 3
                        },
                        {
                            "name": "Download",
                            "isActive": true,
                            "position": 4,
                            "keys": [
                                {
                                    "mainKey": "Download",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "All View",
                                            "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                            "type": "radio"
                                        },
                                        {
                                            "keyName": "All Data",
                                            "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Format",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "PDF",
                                            "info": "",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Download",
                                    "type": "button"
                                }
                            ]
                        },
                        {
                            "name": "KPI customisation",
                            "isActive": true,
                            "position": 5
                        },
                        {
                            "name": "Shuffle Column",
                            "isActive": true,
                            "position": 6
                        }
                    ],
                    "reportColumns": [
                        {
                            "_id": "6336ccbd43caa52bc7424ac6",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Sr. No",
                            "originalName": "Sr. No",
                            "position": 1,
                            "referancKeyName": "srNo",
                            "backendReferancKeyName": "srNo"
                        },
                        {
                            "_id": "6336cd6b43caa52bc7424aca",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Contact Number",
                            "originalName": "Contact Number",
                            "position": 2,
                            "referancKeyName": "information.phone_number",
                            "backendReferancKeyName": "information.phone_number"
                        },
                        {
                            "_id": "6336d89443caa52bc7424ace",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Date",
                            "originalName": "Date",
                            "position": 3,
                            "referancKeyName": "date",
                            "backendReferancKeyName": "date"
                        },
                        {
                            "_id": "6336d9058a59164ca748cb65",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Time",
                            "originalName": "Time",
                            "position": 4,
                            "referancKeyName": "time",
                            "backendReferancKeyName": "time"
                        },
                        {
                            "_id": "6336d9888a59164ca748cb69",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Loan ID",
                            "originalName": "Loan ID",
                            "position": 5,
                            "referancKeyName": "information.loan_id",
                            "backendReferancKeyName": "information.loan_id"
                        }
                    ],
                    "Summary": [
                        {
                            "mainKey": "Customer Profile",
                            "subKey": [
                                {
                                    "keyName": "Name",
                                    "referenceKeyName": "-"
                                },
                                {
                                    "keyName": "Gender",
                                    "referenceKeyName": "-"
                                }
                            ]
                        },
                        {
                            "mainKey": "Conversation",
                            "subKey": [
                                {
                                    "keyName": "Flow Type",
                                    "referenceKeyName": "data[0].information.[flow_type]"
                                },
                                {
                                    "keyName": "PTP Date",
                                    "referenceKeyName": "data[0].information.[ptp_date]"
                                },
                                {
                                    "keyName": "EMI Date",
                                    "referenceKeyName": "data[0].information.[emiDate]"
                                },
                                {
                                    "keyName": "Delay Reason",
                                    "referenceKeyName": "data[0].information.[reason]"
                                },
                                {
                                    "keyName": "Disposition",
                                    "referenceKeyName": "data[0].information.[disposition]"
                                }
                            ]
                        }
                    ]
                },
                "SMS": {},
                "Mail": {}
            },
            "Customer Behaviour": {
                "Whatsapp": {},
                "Call": {
                    "filters": [
                        {
                            "name": "Language",
                            "position": 1,
                            "backendReference": "language",
                            "id": "633ab39d2b25096f8e191ac9"
                        },
                        {
                            "name": "Flow",
                            "position": 2,
                            "backendReference": "flow_type",
                            "id": "633ab3b62b25096f8e191acd"
                        },
                        {
                            "name": "Disposition",
                            "position": 3,
                            "backendReference": "disposition",
                            "id": "633ab3d52b25096f8e191ad1"
                        },
                        {
                            "name": "Region",
                            "position": 4,
                            "backendReference": "region",
                            "id": "633ab4002b25096f8e191ad5"
                        }
                    ],
                    "kpiDetails":{

                        "cardPosition":1,
                        
                        "chartPosition":2,
                        
                        "cards": [
                            {
                                "name": "Customer Hang up After Greet",
                                "referenceKey": "card_details.Greet",
                                "icon": "aht",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Payment Link Tracking",
                                "kpiCustomizationName": "Payment Link Tracking",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Link Opened (LO)",
                                        "icon": "visitedIcon",
                                        "referenceKeyName": "customersClickedCount",
                                        "shortKey": "LO",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Link Not Opened (LNO)",
                                        "icon": "notVisitedIcon",
                                        "referenceKeyName": "customerNotClickedCount",
                                        "shortKey": "LNO",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Tone",
                                "kpiCustomizationName": "Customer Tone",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "260px",
                                    "innerRadius": "55px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Harsh",
                                        "icon": "harshIcon",
                                        "referenceKeyName": "harsh",
                                        "shortKey": "Harsh",
                                        "fillColor": "#0066FF",
                                        "position": 2
                                    },
                                    {
                                        "name": "Humilate",
                                        "icon": "humilatedIcon",
                                        "referenceKeyName": "humiliate",
                                        "shortKey": "Humilate",
                                        "fillColor": "#FD4B33",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Late Fee Waiver Offer",
                                "kpiCustomizationName": "Late Fee Waiver Offer",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Paid",
                                        "icon": "paidIcon",
                                        "referenceKeyName": "paidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Not Paid",
                                        "icon": "notPaidIcon",
                                        "referenceKeyName": "notPaidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Channel Response Rate",
                                "kpiCustomizationName": "Channel Response Rate",
                                "chartType": "responseRateChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Voice",
                                        "icon": "callIcon",
                                        "referenceKeyName": "callResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 1
                                    },
                                    {
                                        "name": "SMS",
                                        "icon": "smsIcon",
                                        "referenceKeyName": "smsResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 2
                                    },
                                    {
                                        "name": "WhatsApp",
                                        "icon": "whatsappIcon",
                                        "referenceKeyName": "whatsappResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 3
                                    },
                                    {
                                        "name": "Email",
                                        "icon": "emailIcon",
                                        "referenceKeyName": "emailResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 4
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "550px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Broken PTP Info",
                                "kpiCustomizationName": "Broken PTP Info",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of PTP Count",
                                    "No. of Customers"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Broken PTP Count",
                                        "icon": "",
                                        "referenceKeyName": "ptpCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Customer count",
                                        "icon": "",
                                        "referenceKeyName": "usersCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data.ptpBrokenDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            }
                        ],
                    },
                    
                    "sidebarModules": [
                        {
                            "name": "Datepicker",
                            "isActive": true,
                            "position": 1
                        },
                        {
                            "name": "Last Updated",
                            "isActive": true,
                            "position": 2
                        },
                        {
                            "name": "Filter",
                            "isActive": true,
                            "position": 3
                        },
                        {
                            "name": "Download",
                            "isActive": true,
                            "position": 4,
                            "keys": [
                                {
                                    "mainKey": "Download",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "All View",
                                            "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                            "type": "radio"
                                        },
                                        {
                                            "keyName": "All Data",
                                            "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Format",
                                    "type": "text",
                                    "subKey": [
                                        {
                                            "keyName": "PDF",
                                            "info": "",
                                            "type": "radio"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Download",
                                    "type": "button"
                                }
                            ]
                        },
                        {
                            "name": "KPI customisation",
                            "isActive": true,
                            "position": 5
                        },
                        {
                            "name": "Shuffle Column",
                            "isActive": true,
                            "position": 6
                        }
                    ],
                    "reportColumns": [
                        {
                            "_id": "6336ccbd43caa52bc7424ac6",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Sr. No",
                            "originalName": "Sr. No",
                            "position": 1,
                            "referancKeyName": "srNo",
                            "backendReferancKeyName": "srNo"
                        },
                        {
                            "_id": "6336cd6b43caa52bc7424aca",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Contact Number",
                            "originalName": "Contact Number",
                            "position": 2,
                            "referancKeyName": "information.phone_number",
                            "backendReferancKeyName": "information.phone_number"
                        },
                        {
                            "_id": "6336d89443caa52bc7424ace",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Date",
                            "originalName": "Date",
                            "position": 3,
                            "referancKeyName": "date",
                            "backendReferancKeyName": "date"
                        },
                        {
                            "_id": "6336d9058a59164ca748cb65",
                            "isPermanentDisable": false,
                            "isSortBtn": true,
                            "name": "Time",
                            "originalName": "Time",
                            "position": 4,
                            "referancKeyName": "time",
                            "backendReferancKeyName": "time"
                        },
                        {
                            "_id": "6336d9888a59164ca748cb69",
                            "isPermanentDisable": false,
                            "isSortBtn": false,
                            "name": "Loan ID",
                            "originalName": "Loan ID",
                            "position": 5,
                            "referancKeyName": "information.loan_id",
                            "backendReferancKeyName": "information.loan_id"
                        }
                    ],
                    "Summary": [
                        {
                            "mainKey": "Customer Profile",
                            "subKey": [
                                {
                                    "keyName": "Name",
                                    "referenceKeyName": "-"
                                },
                                {
                                    "keyName": "Gender",
                                    "referenceKeyName": "-"
                                }
                            ]
                        },
                        {
                            "mainKey": "Conversation",
                            "subKey": [
                                {
                                    "keyName": "Flow Type",
                                    "referenceKeyName": "data[0].information.[flow_type]"
                                },
                                {
                                    "keyName": "PTP Date",
                                    "referenceKeyName": "data[0].information.[ptp_date]"
                                },
                                {
                                    "keyName": "EMI Date",
                                    "referenceKeyName": "data[0].information.[emiDate]"
                                },
                                {
                                    "keyName": "Delay Reason",
                                    "referenceKeyName": "data[0].information.[reason]"
                                },
                                {
                                    "keyName": "Disposition",
                                    "referenceKeyName": "data[0].information.[disposition]"
                                }
                            ]
                        }
                    ]
                },
                "SMS": {},
                "Mail": {}
            }
        },
        "Lead Generation": {}
    },
    "Logger": {
        "report": {
            "Debt Collection": {
                "Campaign": {
                    "Whatsapp": {
                        "oneWay": {
                            "filters": [
                                {
                                    "name": "Language",
                                    "position": 1,
                                    "backendReference": "language",
                                    "id": "633ab39d2b25096f8e191ac9"
                                },
                                {
                                    "name": "Flow",
                                    "position": 2,
                                    "backendReference": "flow_type",
                                    "id": "633ab3b62b25096f8e191acd"
                                },
                                {
                                    "name": "Disposition",
                                    "position": 3,
                                    "backendReference": "disposition",
                                    "id": "633ab3d52b25096f8e191ad1"
                                },
                                {
                                    "name": "Region",
                                    "position": 4,
                                    "backendReference": "region",
                                    "id": "633ab4002b25096f8e191ad5"
                                }
                            ],
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4",
                                            "position": 1
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D",
                                            "position": 2
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                }
                            ],
                            "sidebarModules": [
                                {
                                    "name": "Datepicker",
                                    "isActive": true,
                                    "position": 1
                                },
                                {
                                    "name": "Last Updated",
                                    "isActive": true,
                                    "position": 2
                                },
                                {
                                    "name": "Filter",
                                    "isActive": true,
                                    "position": 3
                                },
                                {
                                    "name": "Download",
                                    "isActive": true,
                                    "position": 4,
                                    "keys": [
                                        {
                                            "mainKey": "Download",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "All View",
                                                    "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                    "type": "radio"
                                                },
                                                {
                                                    "keyName": "All Data",
                                                    "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Format",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "PDF",
                                                    "info": "",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Download",
                                            "type": "button"
                                        }
                                    ]
                                },
                                {
                                    "name": "KPI customisation",
                                    "isActive": true,
                                    "position": 5
                                },
                                {
                                    "name": "Shuffle Column",
                                    "isActive": true,
                                    "position": 6
                                }
                            ],
                            "reportColumns": [
                                {
                                    "_id": "6336ccbd43caa52bc7424ac6",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Sr. No",
                                    "originalName": "Sr. No",
                                    "position": 1,
                                    "referancKeyName": "srNo",
                                    "backendReferancKeyName": "srNo"
                                },
                                {
                                    "_id": "6336cd6b43caa52bc7424aca",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Contact Number",
                                    "originalName": "Contact Number",
                                    "position": 2,
                                    "referancKeyName": "information.phone_number",
                                    "backendReferancKeyName": "information.phone_number"
                                },
                                {
                                    "_id": "6336d89443caa52bc7424ace",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Date",
                                    "originalName": "Date",
                                    "position": 3,
                                    "referancKeyName": "date",
                                    "backendReferancKeyName": "date"
                                },
                                {
                                    "_id": "6336d9058a59164ca748cb65",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Time",
                                    "originalName": "Time",
                                    "position": 4,
                                    "referancKeyName": "time",
                                    "backendReferancKeyName": "time"
                                },
                                {
                                    "_id": "6336d9888a59164ca748cb69",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Loan ID",
                                    "originalName": "Loan ID",
                                    "position": 5,
                                    "referancKeyName": "information.loan_id",
                                    "backendReferancKeyName": "information.loan_id"
                                }
                            ],
                            "Summary": [
                                {
                                    "mainKey": "Customer Profile",
                                    "subKey": [
                                        {
                                            "keyName": "Name",
                                            "referenceKeyName": "-"
                                        },
                                        {
                                            "keyName": "Gender",
                                            "referenceKeyName": "-"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Conversation",
                                    "subKey": [
                                        {
                                            "keyName": "Flow Type",
                                            "referenceKeyName": "data[0].information.[flow_type]"
                                        },
                                        {
                                            "keyName": "PTP Date",
                                            "referenceKeyName": "data[0].information.[ptp_date]"
                                        },
                                        {
                                            "keyName": "EMI Date",
                                            "referenceKeyName": "data[0].information.[emiDate]"
                                        },
                                        {
                                            "keyName": "Delay Reason",
                                            "referenceKeyName": "data[0].information.[reason]"
                                        },
                                        {
                                            "keyName": "Disposition",
                                            "referenceKeyName": "data[0].information.[disposition]"
                                        }
                                    ]
                                }
                            ]
                        },
                        "twoWay": {
                            "filters": [
                                {
                                    "name": "Language",
                                    "position": 1,
                                    "backendReference": "language",
                                    "id": "633ab39d2b25096f8e191ac9"
                                },
                                {
                                    "name": "Flow",
                                    "position": 2,
                                    "backendReference": "flow_type",
                                    "id": "633ab3b62b25096f8e191acd"
                                },
                                {
                                    "name": "Disposition",
                                    "position": 3,
                                    "backendReference": "disposition",
                                    "id": "633ab3d52b25096f8e191ad1"
                                },
                                {
                                    "name": "Region",
                                    "position": 4,
                                    "backendReference": "region",
                                    "id": "633ab4002b25096f8e191ad5"
                                }
                            ],
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                },
                                {
                                    "name": "Avg. First Response Time",
                                    "referenceKey": "card_details.averageResponseTime",
                                    "icon": "responseTime",
                                    "position": 2,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7300cdd5d3dbe0536e1",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Sent",
                                    "referenceKey": "card_details.sent",
                                    "icon": "message sent",
                                    "position": 3,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7750cdd5d3dbe0536e6",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Failed",
                                    "referenceKey": "card_details.failed",
                                    "icon": "message failed",
                                    "position": 4,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7bb0cdd5d3dbe0536ea",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                    "kpiCustomizationName": "Payment Delay Reason",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "reason",
                                            "icon": "",
                                            "referenceKeyName": "reason",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "reason_count",
                                            "icon": "",
                                            "referenceKeyName": "reason_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "reason_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 3,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Chat Disposition",
                                    "kpiCustomizationName": "Chat Disposition",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "disposition",
                                            "icon": "",
                                            "referenceKeyName": "disposition",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "disposition_count",
                                            "icon": "",
                                            "referenceKeyName": "disposition_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "disposition_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 4,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "PTP Distribution: Date Wise",
                                    "kpiCustomizationName": "PTP Distribution",
                                    "chartType": "barChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "400px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "legendData": [
                                        "Count of PTP Given"
                                    ],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Date",
                                            "icon": "",
                                            "referenceKeyName": "ptp_date",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "Count of PTP Given",
                                            "icon": "",
                                            "referenceKeyName": "ptp_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "ptp_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "600px",
                                            "overflowX": "scroll",
                                            "overflowY": "hidden"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 5,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Seen",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Revert",
                                            "icon": "revertIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "Revert",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "No Revert",
                                            "icon": "notRevertIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "No Revert",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 6,
                                    "isActive": true
                                }
                            ],
                            "sidebarModules": [
                                {
                                    "name": "Datepicker",
                                    "isActive": true,
                                    "position": 1
                                },
                                {
                                    "name": "Last Updated",
                                    "isActive": true,
                                    "position": 2
                                },
                                {
                                    "name": "Filter",
                                    "isActive": true,
                                    "position": 3
                                },
                                {
                                    "name": "Download",
                                    "isActive": true,
                                    "position": 4,
                                    "keys": [
                                        {
                                            "mainKey": "Download",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "All View",
                                                    "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                    "type": "radio"
                                                },
                                                {
                                                    "keyName": "All Data",
                                                    "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Format",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "PDF",
                                                    "info": "",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Download",
                                            "type": "button"
                                        }
                                    ]
                                },
                                {
                                    "name": "KPI customisation",
                                    "isActive": true,
                                    "position": 5
                                },
                                {
                                    "name": "Shuffle Column",
                                    "isActive": true,
                                    "position": 6
                                }
                            ],
                            "reportColumns": [
                                {
                                    "_id": "6336ccbd43caa52bc7424ac6",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Sr. No",
                                    "originalName": "Sr. No",
                                    "position": 1,
                                    "referancKeyName": "srNo",
                                    "backendReferancKeyName": "srNo"
                                },
                                {
                                    "_id": "6336cd6b43caa52bc7424aca",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Contact Number",
                                    "originalName": "Contact Number",
                                    "position": 2,
                                    "referancKeyName": "information.phone_number",
                                    "backendReferancKeyName": "information.phone_number"
                                },
                                {
                                    "_id": "6336d89443caa52bc7424ace",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Date",
                                    "originalName": "Date",
                                    "position": 3,
                                    "referancKeyName": "date",
                                    "backendReferancKeyName": "date"
                                },
                                {
                                    "_id": "6336d9058a59164ca748cb65",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Time",
                                    "originalName": "Time",
                                    "position": 4,
                                    "referancKeyName": "time",
                                    "backendReferancKeyName": "time"
                                },
                                {
                                    "_id": "6336d9888a59164ca748cb69",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Loan ID",
                                    "originalName": "Loan ID",
                                    "position": 5,
                                    "referancKeyName": "information.loan_id",
                                    "backendReferancKeyName": "information.loan_id"
                                }
                            ],
                            "Summary": [
                                {
                                    "mainKey": "Customer Profile",
                                    "subKey": [
                                        {
                                            "keyName": "Name",
                                            "referenceKeyName": "-"
                                        },
                                        {
                                            "keyName": "Gender",
                                            "referenceKeyName": "-"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Conversation",
                                    "subKey": [
                                        {
                                            "keyName": "Flow Type",
                                            "referenceKeyName": "data[0].information.[flow_type]"
                                        },
                                        {
                                            "keyName": "PTP Date",
                                            "referenceKeyName": "data[0].information.[ptp_date]"
                                        },
                                        {
                                            "keyName": "EMI Date",
                                            "referenceKeyName": "data[0].information.[emiDate]"
                                        },
                                        {
                                            "keyName": "Delay Reason",
                                            "referenceKeyName": "data[0].information.[reason]"
                                        },
                                        {
                                            "keyName": "Disposition",
                                            "referenceKeyName": "data[0].information.[disposition]"
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [
                            {
                                "name": "AHT(Sec)",
                                "referenceKey": "card_details.aht",
                                "icon": "aht",
                                "position": 7,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Allocated",
                                "referenceKey": "card_details.total_allocated",
                                "icon": "allocated",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b7300cdd5d3dbe0536e1",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Connected",
                                "referenceKey": "card_details.total_connected_calls",
                                "icon": "connected",
                                "position": 2,
                                "kpiCustomisationName": "",
                                "id": "6336b7750cdd5d3dbe0536e6",
                                "isActive": true
                            },
                            {
                                "name": "Total Connected Calls",
                                "referenceKey": "card_details.totalConnected",
                                "icon": "total connected",
                                "position": 4,
                                "kpiCustomisationName": "",
                                "id": "6336b7bb0cdd5d3dbe0536ea",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Not Connected",
                                "referenceKey": "card_details.not_connected",
                                "icon": "total not connected",
                                "position": 3,
                                "kpiCustomisationName": "",
                                "id": "6336b8060cdd5d3dbe0536ee",
                                "isActive": true
                            },
                            {
                                "name": "Total Not Connected Calls",
                                "referenceKey": "card_details.totalNotConnected",
                                "icon": "total- not connected",
                                "position": 5,
                                "kpiCustomisationName": "",
                                "id": "6336b8450cdd5d3dbe0536f2",
                                "isActive": true
                            },
                            {
                                "name": "Talk Time(Min)",
                                "referenceKey": "card_details.total_talk_time_in_mins",
                                "icon": "total talk time",
                                "position": 6,
                                "kpiCustomisationName": "",
                                "id": "6336b88b0cdd5d3dbe0536f6",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Call Objective",
                                "kpiCustomizationName": "Call Objective",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Successful (SL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "SL",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Unsuccessful (UL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UL",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "callObjective",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "700px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 13,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Payment Mode",
                                "kpiCustomizationName": "Payment Mode",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "e-NACH",
                                        "icon": "enachIcon",
                                        "referenceKeyName": "eNanch",
                                        "shortKey": "e-NACH",
                                        "fillColor": "#0066FF",
                                        "position": 1
                                    },
                                    {
                                        "name": "Payment Link (PL)",
                                        "icon": "paymentIcon",
                                        "referenceKeyName": "paymentLink",
                                        "shortKey": "PL",
                                        "fillColor": "#1DEBA4",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "paymentMode",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 12,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Agent Referral",
                                "kpiCustomizationName": "Agent Referral",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "agentReferral",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 11,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Sentiment",
                                "kpiCustomizationName": "Customer Sentiment",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Positive (+ve)",
                                        "icon": "positiveIcon",
                                        "referenceKeyName": "positive",
                                        "shortKey": "+ve",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Negative (-ve)",
                                        "icon": "negativeIcon",
                                        "referenceKeyName": "negative",
                                        "shortKey": "-ve",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalSentimentIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "customerSentiment",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 10,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Willingness To Pay",
                                "kpiCustomizationName": "Willingness To Pay",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "uiIcon",
                                        "referenceKeyName": "na",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "willingnessToPay",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 9,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls Responded vs Time Slot",
                                "kpiCustomizationName": "Calls Responded vs Time Slot",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Customer Connected",
                                    "Time Slot"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Time Slot",
                                        "icon": "",
                                        "referenceKeyName": "timeSlot",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "timeSlotDistribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 8,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                "kpiCustomizationName": "Payment Delay Reason",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "reason",
                                        "icon": "",
                                        "referenceKeyName": "reason",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "reason_count",
                                        "icon": "",
                                        "referenceKeyName": "reason_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "reason_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 7,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Call Disposition",
                                "kpiCustomizationName": "Call Disposition",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "disposition",
                                        "icon": "",
                                        "referenceKeyName": "disposition",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "disposition_count",
                                        "icon": "",
                                        "referenceKeyName": "disposition_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "disposition_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 6,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Day-Wise Connected Calls",
                                "kpiCustomizationName": "Day-Wise Connected Calls",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Day-Wise Connected Calls",
                                    "Date"
                                ],
                                "legendColor": [
                                    {
                                        "year": "2021",
                                        "fillColor": "#6041E8"
                                    },
                                    {
                                        "year": "2022",
                                        "fillColor": "#9ADBF9"
                                    },
                                    {
                                        "year": "2023",
                                        "fillColor": "#5B5FF9"
                                    }
                                ],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "duration",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "customer_connected_distribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Outbound Calls: Attempt Count",
                                "kpiCustomizationName": "Attempt Count",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of Unique Account Called",
                                    "No of Attempt",
                                    "Percentage of Unique Account Called"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "No. of Attempt",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Account Called",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count_number",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "attempt_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "PTP Distribution: Date Wise",
                                "kpiCustomizationName": "PTP Distribution",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Count of PTP Given"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "ptp_date",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Count of PTP Given",
                                        "icon": "",
                                        "referenceKeyName": "ptp_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "ptp_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls < 10 sec Vs Calls >= 10 sec",
                                "kpiCustomizationName": "Calls < 10 sec vs >= 10 sec",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "calls < 10s",
                                    "calls >= 10s"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "calls_less_than_10s",
                                        "shortKey": "calls < 10s",
                                        "fillColor": "#6041E8",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "calls_greater_than_10s",
                                        "shortKey": "calls >= 10s",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Unique Accounts Connected Vs Not Connected",
                                "kpiCustomizationName": "Unique Connected vs Not Connected",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Total connected",
                                    "Total not connected"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "total_connected_calls",
                                        "shortKey": "Total connected",
                                        "fillColor": "#52E9AB",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "not_connected",
                                        "shortKey": "Total  not connected",
                                        "fillColor": "#FF6D4D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                },
                "Payment": {
                    "Whatsapp": {},
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [],
                        "charts": [
                            {
                                "chartTitle": "Payment Collection Status",
                                "kpiCustomizationName": "Payment Collection Status",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "260px",
                                    "innerRadius": "55px",
                                    "outerRadius": "80px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Total Full Payment (TFP)",
                                        "icon": "fullPaymentIcon",
                                        "referenceKeyName": "totalFullPaymentCollected",
                                        "shortKey": "TFP",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Partial Payment (TPP)",
                                        "icon": "partialPaymentIcon",
                                        "referenceKeyName": "totalPartialPaymentCollected",
                                        "shortKey": "TPP",
                                        "fillColor": "#F9BD53",
                                        "position": 2
                                    },
                                    {
                                        "name": "Total Pending Payment (TP)",
                                        "icon": "pendindPaymentIcon",
                                        "referenceKeyName": "totalPending",
                                        "shortKey": "TP",
                                        "fillColor": "#FD4B33",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "620px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Timely vs Late Payment",
                                "kpiCustomizationName": "Timely vs Late Payment",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "280px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Timely Payment (TP)",
                                        "icon": "timelyPaymentIcon",
                                        "referenceKeyName": "timely",
                                        "shortKey": "TP",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Late Payment (LP)",
                                        "icon": "latePaymentIcon",
                                        "referenceKeyName": "lately",
                                        "shortKey": "LP",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Payment Failure Reason",
                                "kpiCustomizationName": "Payment Failure Reason",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Reason",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "reason",
                                        "icon": "",
                                        "referenceKeyName": "reason",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "reasonCount",
                                        "icon": "",
                                        "referenceKeyName": "reasonCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "paymentFailureReasonDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Preferred Payment Time",
                                "kpiCustomizationName": "PTP Distribution",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Customer Count in Morning",
                                    "Customer Count in Afternoon",
                                    "Customer Count in Evening"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Time Slot",
                                        "icon": "",
                                        "referenceKeyName": "ptp_date",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 1
                                    },
                                    {
                                        "name": "Paid Customer Count",
                                        "icon": "",
                                        "referenceKeyName": "ptp_count",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 2
                                    }
                                ],
                                "slots": [
                                    {
                                        "keyName": "Morning (12AM-12PM)",
                                        "referenceKeyName": "morning"
                                    },
                                    {
                                        "keyName": "Afternoon (12PM-6PM)",
                                        "referenceKeyName": "afternoon"
                                    },
                                    {
                                        "keyName": "Evening (6PM-12AM)",
                                        "referenceKeyName": "evening"
                                    }
                                ],
                                "refenceKeyForData": "prefferedPaymentTime",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Paid Customer - Attempt Count",
                                "kpiCustomizationName": "Attempt Count",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "450px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No of Attempts",
                                    "No. of Paid Customer"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Attempts Taken to Collect",
                                        "icon": "attempt",
                                        "referenceKeyName": "attempt",
                                        "shortKey": "calls < 10s",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Paid Customer Count",
                                        "icon": "attemptCount",
                                        "referenceKeyName": "attemptCount",
                                        "shortKey": "calls >= 10s",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "numOfAttemptToCollectDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Day Wise Collection Status",
                                "kpiCustomizationName": "Day Wise Collection Status",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "450px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Customer Count",
                                    "Amount"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Payment Date",
                                        "icon": "",
                                        "referenceKeyName": "date",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Customer Count",
                                        "icon": "",
                                        "referenceKeyName": "customerCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    },
                                    {
                                        "name": "Total Collection",
                                        "icon": "",
                                        "referenceKeyName": "totalCollection",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "dayWiseCollectionStatusDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 6,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Payment Link Channel",
                                "kpiCustomizationName": "Payment Link Channel",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "450px",
                                    "margin": "20px",
                                    "innerWidth": "500px",
                                    "innerHeight": "300px",
                                    "innerRadius": "60px",
                                    "outerRadius": "100px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "SMS",
                                        "icon": "smsModeIcon",
                                        "referenceKeyName": "sms",
                                        "shortKey": "SMS",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Email",
                                        "icon": "emailModeIcon",
                                        "referenceKeyName": "email",
                                        "shortKey": "Email",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "WhatsApp",
                                        "icon": "whatsappModeIcon",
                                        "referenceKeyName": "whatsapp",
                                        "shortKey": "WhatsApp",
                                        "fillColor": "#0174FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 7,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                },
                "Customer Behaviour": {
                    "Whatsapp": {},
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [
                            {
                                "name": "Customer Hang up After Greet",
                                "referenceKey": "card_details.Greet",
                                "icon": "aht",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Payment Link Tracking",
                                "kpiCustomizationName": "Payment Link Tracking",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Link Opened (LO)",
                                        "icon": "visitedIcon",
                                        "referenceKeyName": "customersClickedCount",
                                        "shortKey": "LO",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Link Not Opened (LNO)",
                                        "icon": "notVisitedIcon",
                                        "referenceKeyName": "customerNotClickedCount",
                                        "shortKey": "LNO",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Tone",
                                "kpiCustomizationName": "Customer Tone",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "260px",
                                    "innerRadius": "55px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Harsh",
                                        "icon": "harshIcon",
                                        "referenceKeyName": "harsh",
                                        "shortKey": "Harsh",
                                        "fillColor": "#0066FF",
                                        "position": 2
                                    },
                                    {
                                        "name": "Humilate",
                                        "icon": "humilatedIcon",
                                        "referenceKeyName": "humiliate",
                                        "shortKey": "Humilate",
                                        "fillColor": "#FD4B33",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Late Fee Waiver Offer",
                                "kpiCustomizationName": "Late Fee Waiver Offer",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Paid",
                                        "icon": "paidIcon",
                                        "referenceKeyName": "paidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Not Paid",
                                        "icon": "notPaidIcon",
                                        "referenceKeyName": "notPaidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Channel Response Rate",
                                "kpiCustomizationName": "Channel Response Rate",
                                "chartType": "responseRateChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Voice",
                                        "icon": "callIcon",
                                        "referenceKeyName": "callResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 1
                                    },
                                    {
                                        "name": "SMS",
                                        "icon": "smsIcon",
                                        "referenceKeyName": "smsResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 2
                                    },
                                    {
                                        "name": "WhatsApp",
                                        "icon": "whatsappIcon",
                                        "referenceKeyName": "whatsappResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 3
                                    },
                                    {
                                        "name": "Email",
                                        "icon": "emailIcon",
                                        "referenceKeyName": "emailResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 4
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "550px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Broken PTP Info",
                                "kpiCustomizationName": "Broken PTP Info",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of PTP Count",
                                    "No. of Customers"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Broken PTP Count",
                                        "icon": "",
                                        "referenceKeyName": "ptpCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Customer count",
                                        "icon": "",
                                        "referenceKeyName": "usersCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data.ptpBrokenDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                }
            },
            "Lead Generation": {}
        },
        "transcript": {
            "Debt Collection": {
                "Campaign": {
                    "Whatsapp": {
                        "oneWay": {
                            "filters": [
                                {
                                    "name": "Language",
                                    "position": 1,
                                    "backendReference": "language",
                                    "id": "633ab39d2b25096f8e191ac9"
                                },
                                {
                                    "name": "Flow",
                                    "position": 2,
                                    "backendReference": "flow_type",
                                    "id": "633ab3b62b25096f8e191acd"
                                },
                                {
                                    "name": "Disposition",
                                    "position": 3,
                                    "backendReference": "disposition",
                                    "id": "633ab3d52b25096f8e191ad1"
                                },
                                {
                                    "name": "Region",
                                    "position": 4,
                                    "backendReference": "region",
                                    "id": "633ab4002b25096f8e191ad5"
                                }
                            ],
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4",
                                            "position": 1
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D",
                                            "position": 2
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                }
                            ],
                            "sidebarModules": [
                                {
                                    "name": "Datepicker",
                                    "isActive": true,
                                    "position": 1
                                },
                                {
                                    "name": "Last Updated",
                                    "isActive": true,
                                    "position": 2
                                },
                                {
                                    "name": "Filter",
                                    "isActive": true,
                                    "position": 3
                                },
                                {
                                    "name": "Download",
                                    "isActive": true,
                                    "position": 4,
                                    "keys": [
                                        {
                                            "mainKey": "Download",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "All View",
                                                    "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                    "type": "radio"
                                                },
                                                {
                                                    "keyName": "All Data",
                                                    "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Format",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "PDF",
                                                    "info": "",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Download",
                                            "type": "button"
                                        }
                                    ]
                                },
                                {
                                    "name": "KPI customisation",
                                    "isActive": true,
                                    "position": 5
                                },
                                {
                                    "name": "Shuffle Column",
                                    "isActive": true,
                                    "position": 6
                                }
                            ],
                            "reportColumns": [
                                {
                                    "_id": "6336ccbd43caa52bc7424ac6",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Sr. No",
                                    "originalName": "Sr. No",
                                    "position": 1,
                                    "referancKeyName": "srNo",
                                    "backendReferancKeyName": "srNo"
                                },
                                {
                                    "_id": "6336cd6b43caa52bc7424aca",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Contact Number",
                                    "originalName": "Contact Number",
                                    "position": 2,
                                    "referancKeyName": "information.phone_number",
                                    "backendReferancKeyName": "information.phone_number"
                                },
                                {
                                    "_id": "6336d89443caa52bc7424ace",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Date",
                                    "originalName": "Date",
                                    "position": 3,
                                    "referancKeyName": "date",
                                    "backendReferancKeyName": "date"
                                },
                                {
                                    "_id": "6336d9058a59164ca748cb65",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Time",
                                    "originalName": "Time",
                                    "position": 4,
                                    "referancKeyName": "time",
                                    "backendReferancKeyName": "time"
                                },
                                {
                                    "_id": "6336d9888a59164ca748cb69",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Loan ID",
                                    "originalName": "Loan ID",
                                    "position": 5,
                                    "referancKeyName": "information.loan_id",
                                    "backendReferancKeyName": "information.loan_id"
                                }
                            ],
                            "Summary": [
                                {
                                    "mainKey": "Customer Profile",
                                    "subKey": [
                                        {
                                            "keyName": "Name",
                                            "referenceKeyName": "-"
                                        },
                                        {
                                            "keyName": "Gender",
                                            "referenceKeyName": "-"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Conversation",
                                    "subKey": [
                                        {
                                            "keyName": "Flow Type",
                                            "referenceKeyName": "data[0].information.[flow_type]"
                                        },
                                        {
                                            "keyName": "PTP Date",
                                            "referenceKeyName": "data[0].information.[ptp_date]"
                                        },
                                        {
                                            "keyName": "EMI Date",
                                            "referenceKeyName": "data[0].information.[emiDate]"
                                        },
                                        {
                                            "keyName": "Delay Reason",
                                            "referenceKeyName": "data[0].information.[reason]"
                                        },
                                        {
                                            "keyName": "Disposition",
                                            "referenceKeyName": "data[0].information.[disposition]"
                                        }
                                    ]
                                }
                            ]
                        },
                        "twoWay": {
                            "filters": [
                                {
                                    "name": "Language",
                                    "position": 1,
                                    "backendReference": "language",
                                    "id": "633ab39d2b25096f8e191ac9"
                                },
                                {
                                    "name": "Flow",
                                    "position": 2,
                                    "backendReference": "flow_type",
                                    "id": "633ab3b62b25096f8e191acd"
                                },
                                {
                                    "name": "Disposition",
                                    "position": 3,
                                    "backendReference": "disposition",
                                    "id": "633ab3d52b25096f8e191ad1"
                                },
                                {
                                    "name": "Region",
                                    "position": 4,
                                    "backendReference": "region",
                                    "id": "633ab4002b25096f8e191ad5"
                                }
                            ],
                            "cards": [
                                {
                                    "name": "No. of Unique Account",
                                    "referenceKey": "card_details.totalUniqueAccount",
                                    "icon": "unique accounts",
                                    "position": 1,
                                    "kpiCustomisationName": "",
                                    "id": "6336b6beee42fa3d2bfeb6e0",
                                    "isActive": true
                                },
                                {
                                    "name": "Avg. First Response Time",
                                    "referenceKey": "card_details.averageResponseTime",
                                    "icon": "responseTime",
                                    "position": 2,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7300cdd5d3dbe0536e1",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Sent",
                                    "referenceKey": "card_details.sent",
                                    "icon": "message sent",
                                    "position": 3,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7750cdd5d3dbe0536e6",
                                    "isActive": true
                                },
                                {
                                    "name": "Message Failed",
                                    "referenceKey": "card_details.failed",
                                    "icon": "message failed",
                                    "position": 4,
                                    "kpiCustomisationName": "",
                                    "id": "6336b7bb0cdd5d3dbe0536ea",
                                    "isActive": true
                                }
                            ],
                            "charts": [
                                {
                                    "chartTitle": "Message Sent",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Delivered (DLVD)",
                                            "icon": "deliverIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "DLVD",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "Not Delivered (NDLVD)",
                                            "icon": "notDeliverIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "NDLVD",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 1,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Delivered",
                                    "kpiCustomizationName": "Message Delivered",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "460px",
                                        "margin": "20px",
                                        "innerWidth": "520px",
                                        "innerHeight": "320px",
                                        "innerRadius": "60px",
                                        "outerRadius": "85px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Seen",
                                            "icon": "seenIcon",
                                            "referenceKeyName": "read",
                                            "shortKey": "Seen",
                                            "fillColor": "#0066FF"
                                        },
                                        {
                                            "name": "Not Seen",
                                            "icon": "notSeenIcon",
                                            "referenceKeyName": "notRead",
                                            "shortKey": "Not Seen",
                                            "fillColor": "#1DEBA4"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "700px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 2,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                    "kpiCustomizationName": "Payment Delay Reason",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "reason",
                                            "icon": "",
                                            "referenceKeyName": "reason",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "reason_count",
                                            "icon": "",
                                            "referenceKeyName": "reason_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "reason_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 3,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Chat Disposition",
                                    "kpiCustomizationName": "Chat Disposition",
                                    "chartType": "pieChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [
                                        "Disposition",
                                        "count"
                                    ],
                                    "keys": [
                                        {
                                            "name": "disposition",
                                            "icon": "",
                                            "referenceKeyName": "disposition",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "disposition_count",
                                            "icon": "",
                                            "referenceKeyName": "disposition_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "disposition_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "700px",
                                            "margin": "20px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 4,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "PTP Distribution: Date Wise",
                                    "kpiCustomizationName": "PTP Distribution",
                                    "chartType": "barChart",
                                    "chartStyle": {
                                        "width": "1200px",
                                        "height": "400px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "legendData": [
                                        "Count of PTP Given"
                                    ],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Date",
                                            "icon": "",
                                            "referenceKeyName": "ptp_date",
                                            "shortKey": "",
                                            "fillColor": ""
                                        },
                                        {
                                            "name": "Count of PTP Given",
                                            "icon": "",
                                            "referenceKeyName": "ptp_count",
                                            "shortKey": "",
                                            "fillColor": ""
                                        }
                                    ],
                                    "refenceKeyForData": "ptp_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1270px",
                                            "height": "600px",
                                            "overflowX": "scroll",
                                            "overflowY": "hidden"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": true
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 5,
                                    "isActive": true
                                },
                                {
                                    "chartTitle": "Message Seen",
                                    "kpiCustomizationName": "Message Sent",
                                    "chartType": "donut",
                                    "chartStyle": {
                                        "width": "550px",
                                        "height": "450px",
                                        "margin": "20px"
                                    },
                                    "legendData": [],
                                    "legendColor": [],
                                    "TableHeading": [],
                                    "keys": [
                                        {
                                            "name": "Revert",
                                            "icon": "revertIcon",
                                            "referenceKeyName": "delivered",
                                            "shortKey": "Revert",
                                            "fillColor": "#1DEBA4"
                                        },
                                        {
                                            "name": "No Revert",
                                            "icon": "notRevertIcon",
                                            "referenceKeyName": "notDelivered",
                                            "shortKey": "No Revert",
                                            "fillColor": "#FA795D"
                                        }
                                    ],
                                    "refenceKeyForData": "status_details",
                                    "expand": {
                                        "showExpandButton": true,
                                        "expandStyle": {
                                            "width": "1200px",
                                            "height": "650px",
                                            "margin": "10px"
                                        },
                                        "isExpanded": false
                                    },
                                    "sort": {
                                        "showSortButton": false
                                    },
                                    "download": {
                                        "showDownloadButton": true
                                    },
                                    "position": 6,
                                    "isActive": true
                                }
                            ],
                            "sidebarModules": [
                                {
                                    "name": "Datepicker",
                                    "isActive": true,
                                    "position": 1
                                },
                                {
                                    "name": "Last Updated",
                                    "isActive": true,
                                    "position": 2
                                },
                                {
                                    "name": "Filter",
                                    "isActive": true,
                                    "position": 3
                                },
                                {
                                    "name": "Download",
                                    "isActive": true,
                                    "position": 4,
                                    "keys": [
                                        {
                                            "mainKey": "Download",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "All View",
                                                    "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                    "type": "radio"
                                                },
                                                {
                                                    "keyName": "All Data",
                                                    "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Format",
                                            "type": "text",
                                            "subKey": [
                                                {
                                                    "keyName": "PDF",
                                                    "info": "",
                                                    "type": "radio"
                                                }
                                            ]
                                        },
                                        {
                                            "mainKey": "Download",
                                            "type": "button"
                                        }
                                    ]
                                },
                                {
                                    "name": "KPI customisation",
                                    "isActive": true,
                                    "position": 5
                                },
                                {
                                    "name": "Shuffle Column",
                                    "isActive": true,
                                    "position": 6
                                }
                            ],
                            "reportColumns": [
                                {
                                    "_id": "6336ccbd43caa52bc7424ac6",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Sr. No",
                                    "originalName": "Sr. No",
                                    "position": 1,
                                    "referancKeyName": "srNo",
                                    "backendReferancKeyName": "srNo"
                                },
                                {
                                    "_id": "6336cd6b43caa52bc7424aca",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Contact Number",
                                    "originalName": "Contact Number",
                                    "position": 2,
                                    "referancKeyName": "information.phone_number",
                                    "backendReferancKeyName": "information.phone_number"
                                },
                                {
                                    "_id": "6336d89443caa52bc7424ace",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Date",
                                    "originalName": "Date",
                                    "position": 3,
                                    "referancKeyName": "date",
                                    "backendReferancKeyName": "date"
                                },
                                {
                                    "_id": "6336d9058a59164ca748cb65",
                                    "isPermanentDisable": false,
                                    "isSortBtn": true,
                                    "name": "Time",
                                    "originalName": "Time",
                                    "position": 4,
                                    "referancKeyName": "time",
                                    "backendReferancKeyName": "time"
                                },
                                {
                                    "_id": "6336d9888a59164ca748cb69",
                                    "isPermanentDisable": false,
                                    "isSortBtn": false,
                                    "name": "Loan ID",
                                    "originalName": "Loan ID",
                                    "position": 5,
                                    "referancKeyName": "information.loan_id",
                                    "backendReferancKeyName": "information.loan_id"
                                }
                            ],
                            "Summary": [
                                {
                                    "mainKey": "Customer Profile",
                                    "subKey": [
                                        {
                                            "keyName": "Name",
                                            "referenceKeyName": "-"
                                        },
                                        {
                                            "keyName": "Gender",
                                            "referenceKeyName": "-"
                                        }
                                    ]
                                },
                                {
                                    "mainKey": "Conversation",
                                    "subKey": [
                                        {
                                            "keyName": "Flow Type",
                                            "referenceKeyName": "data[0].information.[flow_type]"
                                        },
                                        {
                                            "keyName": "PTP Date",
                                            "referenceKeyName": "data[0].information.[ptp_date]"
                                        },
                                        {
                                            "keyName": "EMI Date",
                                            "referenceKeyName": "data[0].information.[emiDate]"
                                        },
                                        {
                                            "keyName": "Delay Reason",
                                            "referenceKeyName": "data[0].information.[reason]"
                                        },
                                        {
                                            "keyName": "Disposition",
                                            "referenceKeyName": "data[0].information.[disposition]"
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [
                            {
                                "name": "AHT(Sec)",
                                "referenceKey": "card_details.aht",
                                "icon": "aht",
                                "position": 7,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Allocated",
                                "referenceKey": "card_details.total_allocated",
                                "icon": "allocated",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b7300cdd5d3dbe0536e1",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Connected",
                                "referenceKey": "card_details.total_connected_calls",
                                "icon": "connected",
                                "position": 2,
                                "kpiCustomisationName": "",
                                "id": "6336b7750cdd5d3dbe0536e6",
                                "isActive": true
                            },
                            {
                                "name": "Total Connected Calls",
                                "referenceKey": "card_details.totalConnected",
                                "icon": "total connected",
                                "position": 4,
                                "kpiCustomisationName": "",
                                "id": "6336b7bb0cdd5d3dbe0536ea",
                                "isActive": true
                            },
                            {
                                "name": "Total Unique Account Not Connected",
                                "referenceKey": "card_details.not_connected",
                                "icon": "total not connected",
                                "position": 3,
                                "kpiCustomisationName": "",
                                "id": "6336b8060cdd5d3dbe0536ee",
                                "isActive": true
                            },
                            {
                                "name": "Total Not Connected Calls",
                                "referenceKey": "card_details.totalNotConnected",
                                "icon": "total- not connected",
                                "position": 5,
                                "kpiCustomisationName": "",
                                "id": "6336b8450cdd5d3dbe0536f2",
                                "isActive": true
                            },
                            {
                                "name": "Talk Time(Min)",
                                "referenceKey": "card_details.total_talk_time_in_mins",
                                "icon": "total talk time",
                                "position": 6,
                                "kpiCustomisationName": "",
                                "id": "6336b88b0cdd5d3dbe0536f6",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Call Objective",
                                "kpiCustomizationName": "Call Objective",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Successful (SL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "SL",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Unsuccessful (UL)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UL",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "successIcon",
                                        "referenceKeyName": "successful",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "callObjective",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "700px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 13,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Payment Mode",
                                "kpiCustomizationName": "Payment Mode",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "e-NACH",
                                        "icon": "enachIcon",
                                        "referenceKeyName": "eNanch",
                                        "shortKey": "e-NACH",
                                        "fillColor": "#0066FF",
                                        "position": 1
                                    },
                                    {
                                        "name": "Payment Link (PL)",
                                        "icon": "paymentIcon",
                                        "referenceKeyName": "paymentLink",
                                        "shortKey": "PL",
                                        "fillColor": "#1DEBA4",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "paymentMode",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 12,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Agent Referral",
                                "kpiCustomizationName": "Agent Referral",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "agentReferral",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 11,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Sentiment",
                                "kpiCustomizationName": "Customer Sentiment",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "525px",
                                    "innerHeight": "290px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Positive (+ve)",
                                        "icon": "positiveIcon",
                                        "referenceKeyName": "positive",
                                        "shortKey": "+ve",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Negative (-ve)",
                                        "icon": "negativeIcon",
                                        "referenceKeyName": "negative",
                                        "shortKey": "-ve",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalSentimentIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "customerSentiment",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 10,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Willingness To Pay",
                                "kpiCustomizationName": "Willingness To Pay",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px",
                                    "innerWidth": "520px",
                                    "innerHeight": "320px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Yes",
                                        "icon": "yesIcon",
                                        "referenceKeyName": "yes",
                                        "shortKey": "Yes",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "No",
                                        "icon": "noIcon",
                                        "referenceKeyName": "no",
                                        "shortKey": "No",
                                        "fillColor": "#FA795D",
                                        "position": 2
                                    },
                                    {
                                        "name": "Unidentified (UI)",
                                        "icon": "uiIcon",
                                        "referenceKeyName": "na",
                                        "shortKey": "UI",
                                        "fillColor": "#0066FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "willingnessToPay",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 9,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls Responded vs Time Slot",
                                "kpiCustomizationName": "Calls Responded vs Time Slot",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Customer Connected",
                                    "Time Slot"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Time Slot",
                                        "icon": "",
                                        "referenceKeyName": "timeSlot",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "timeSlotDistribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 8,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Payment Delay Reason",
                                "kpiCustomizationName": "Payment Delay Reason",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "reason",
                                        "icon": "",
                                        "referenceKeyName": "reason",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "reason_count",
                                        "icon": "",
                                        "referenceKeyName": "reason_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "reason_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 7,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Call Disposition",
                                "kpiCustomizationName": "Call Disposition",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Disposition",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "disposition",
                                        "icon": "",
                                        "referenceKeyName": "disposition",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "disposition_count",
                                        "icon": "",
                                        "referenceKeyName": "disposition_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "disposition_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 6,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Day-Wise Connected Calls",
                                "kpiCustomizationName": "Day-Wise Connected Calls",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Day-Wise Connected Calls",
                                    "Date"
                                ],
                                "legendColor": [
                                    {
                                        "year": "2021",
                                        "fillColor": "#6041E8"
                                    },
                                    {
                                        "year": "2022",
                                        "fillColor": "#9ADBF9"
                                    },
                                    {
                                        "year": "2023",
                                        "fillColor": "#5B5FF9"
                                    }
                                ],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "duration",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "total",
                                        "shortKey": "",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "customer_connected_distribution",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Outbound Calls: Attempt Count",
                                "kpiCustomizationName": "Attempt Count",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of Unique Account Called",
                                    "No of Attempt",
                                    "Percentage of Unique Account Called"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "No. of Attempt",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "No. of Unique Account Called",
                                        "icon": "",
                                        "referenceKeyName": "attempt_count_number",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "attempt_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "PTP Distribution: Date Wise",
                                "kpiCustomizationName": "PTP Distribution",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Count of PTP Given"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Date",
                                        "icon": "",
                                        "referenceKeyName": "ptp_date",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Count of PTP Given",
                                        "icon": "",
                                        "referenceKeyName": "ptp_count",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "ptp_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Calls < 10 sec Vs Calls >= 10 sec",
                                "kpiCustomizationName": "Calls < 10 sec vs >= 10 sec",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "calls < 10s",
                                    "calls >= 10s"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "calls_less_than_10s",
                                        "shortKey": "calls < 10s",
                                        "fillColor": "#6041E8",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Number of Connected Calls",
                                        "icon": "",
                                        "referenceKeyName": "calls_greater_than_10s",
                                        "shortKey": "calls >= 10s",
                                        "fillColor": "#9ADBF9",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Unique Accounts Connected Vs Not Connected",
                                "kpiCustomizationName": "Unique Connected vs Not Connected",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Total connected",
                                    "Total not connected"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "",
                                        "icon": "",
                                        "referenceKeyName": "total_connected_calls",
                                        "shortKey": "Total connected",
                                        "fillColor": "#52E9AB",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Unique Accounts",
                                        "icon": "",
                                        "referenceKeyName": "not_connected",
                                        "shortKey": "Total  not connected",
                                        "fillColor": "#FF6D4D",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "card_details",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                },
                "Payment": {
                    "Whatsapp": {},
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [],
                        "charts": [
                            {
                                "chartTitle": "Payment Collection Status",
                                "kpiCustomizationName": "Payment Collection Status",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "260px",
                                    "innerRadius": "55px",
                                    "outerRadius": "80px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Total Full Payment (TFP)",
                                        "icon": "fullPaymentIcon",
                                        "referenceKeyName": "totalFullPaymentCollected",
                                        "shortKey": "TFP",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Total Partial Payment (TPP)",
                                        "icon": "partialPaymentIcon",
                                        "referenceKeyName": "totalPartialPaymentCollected",
                                        "shortKey": "TPP",
                                        "fillColor": "#F9BD53",
                                        "position": 2
                                    },
                                    {
                                        "name": "Total Pending Payment (TP)",
                                        "icon": "pendindPaymentIcon",
                                        "referenceKeyName": "totalPending",
                                        "shortKey": "TP",
                                        "fillColor": "#FD4B33",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "620px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Timely vs Late Payment",
                                "kpiCustomizationName": "Timely vs Late Payment",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "280px",
                                    "innerRadius": "60px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Timely Payment (TP)",
                                        "icon": "timelyPaymentIcon",
                                        "referenceKeyName": "timely",
                                        "shortKey": "TP",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Late Payment (LP)",
                                        "icon": "latePaymentIcon",
                                        "referenceKeyName": "lately",
                                        "shortKey": "LP",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Total Connected Calls: Payment Failure Reason",
                                "kpiCustomizationName": "Payment Failure Reason",
                                "chartType": "pieChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "600px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [
                                    "Reason",
                                    "count"
                                ],
                                "keys": [
                                    {
                                        "name": "reason",
                                        "icon": "",
                                        "referenceKeyName": "reason",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "reasonCount",
                                        "icon": "",
                                        "referenceKeyName": "reasonCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "paymentFailureReasonDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "700px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Preferred Payment Time",
                                "kpiCustomizationName": "PTP Distribution",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "460px",
                                    "margin": "20px"
                                },
                                "legendData": [
                                    "Customer Count in Morning",
                                    "Customer Count in Afternoon",
                                    "Customer Count in Evening"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Time Slot",
                                        "icon": "",
                                        "referenceKeyName": "ptp_date",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 1
                                    },
                                    {
                                        "name": "Paid Customer Count",
                                        "icon": "",
                                        "referenceKeyName": "ptp_count",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 2
                                    }
                                ],
                                "slots": [
                                    {
                                        "keyName": "Morning (12AM-12PM)",
                                        "referenceKeyName": "morning"
                                    },
                                    {
                                        "keyName": "Afternoon (12PM-6PM)",
                                        "referenceKeyName": "afternoon"
                                    },
                                    {
                                        "keyName": "Evening (6PM-12AM)",
                                        "referenceKeyName": "evening"
                                    }
                                ],
                                "refenceKeyForData": "prefferedPaymentTime",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1100px",
                                        "height": "650px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Paid Customer - Attempt Count",
                                "kpiCustomizationName": "Attempt Count",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "450px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No of Attempts",
                                    "No. of Paid Customer"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Attempts Taken to Collect",
                                        "icon": "attempt",
                                        "referenceKeyName": "attempt",
                                        "shortKey": "calls < 10s",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Paid Customer Count",
                                        "icon": "attemptCount",
                                        "referenceKeyName": "attemptCount",
                                        "shortKey": "calls >= 10s",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "numOfAttemptToCollectDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Day Wise Collection Status",
                                "kpiCustomizationName": "Day Wise Collection Status",
                                "chartType": "lineChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "450px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "Customer Count",
                                    "Amount"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Payment Date",
                                        "icon": "",
                                        "referenceKeyName": "date",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Customer Count",
                                        "icon": "",
                                        "referenceKeyName": "customerCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    },
                                    {
                                        "name": "Total Collection",
                                        "icon": "",
                                        "referenceKeyName": "totalCollection",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "dayWiseCollectionStatusDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 6,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Payment Link Channel",
                                "kpiCustomizationName": "Payment Link Channel",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "450px",
                                    "margin": "20px",
                                    "innerWidth": "500px",
                                    "innerHeight": "300px",
                                    "innerRadius": "60px",
                                    "outerRadius": "100px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "SMS",
                                        "icon": "smsModeIcon",
                                        "referenceKeyName": "sms",
                                        "shortKey": "SMS",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Email",
                                        "icon": "emailModeIcon",
                                        "referenceKeyName": "email",
                                        "shortKey": "Email",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    },
                                    {
                                        "name": "WhatsApp",
                                        "icon": "whatsappModeIcon",
                                        "referenceKeyName": "whatsapp",
                                        "shortKey": "WhatsApp",
                                        "fillColor": "#0174FF",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 7,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                },
                "Customer Behaviour": {
                    "Whatsapp": {},
                    "Call": {
                        "filters": [
                            {
                                "name": "Language",
                                "position": 1,
                                "backendReference": "language",
                                "id": "633ab39d2b25096f8e191ac9"
                            },
                            {
                                "name": "Flow",
                                "position": 2,
                                "backendReference": "flow_type",
                                "id": "633ab3b62b25096f8e191acd"
                            },
                            {
                                "name": "Disposition",
                                "position": 3,
                                "backendReference": "disposition",
                                "id": "633ab3d52b25096f8e191ad1"
                            },
                            {
                                "name": "Region",
                                "position": 4,
                                "backendReference": "region",
                                "id": "633ab4002b25096f8e191ad5"
                            }
                        ],
                        "cards": [
                            {
                                "name": "Customer Hang up After Greet",
                                "referenceKey": "card_details.Greet",
                                "icon": "aht",
                                "position": 1,
                                "kpiCustomisationName": "",
                                "id": "6336b6beee42fa3d2bfeb6e0",
                                "isActive": true
                            }
                        ],
                        "charts": [
                            {
                                "chartTitle": "Payment Link Tracking",
                                "kpiCustomizationName": "Payment Link Tracking",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Link Opened (LO)",
                                        "icon": "visitedIcon",
                                        "referenceKeyName": "customersClickedCount",
                                        "shortKey": "LO",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Link Not Opened (LNO)",
                                        "icon": "notVisitedIcon",
                                        "referenceKeyName": "customerNotClickedCount",
                                        "shortKey": "LNO",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 1,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Customer Tone",
                                "kpiCustomizationName": "Customer Tone",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "260px",
                                    "innerRadius": "55px",
                                    "outerRadius": "85px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Neutral",
                                        "icon": "neutalIcon",
                                        "referenceKeyName": "neutral",
                                        "shortKey": "Neutral",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Harsh",
                                        "icon": "harshIcon",
                                        "referenceKeyName": "harsh",
                                        "shortKey": "Harsh",
                                        "fillColor": "#0066FF",
                                        "position": 2
                                    },
                                    {
                                        "name": "Humilate",
                                        "icon": "humilatedIcon",
                                        "referenceKeyName": "humiliate",
                                        "shortKey": "Humilate",
                                        "fillColor": "#FD4B33",
                                        "position": 3
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "10px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 2,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Late Fee Waiver Offer",
                                "kpiCustomizationName": "Late Fee Waiver Offer",
                                "chartType": "donut",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px",
                                    "innerWidth": "450px",
                                    "innerHeight": "270px",
                                    "innerRadius": "60px",
                                    "outerRadius": "90px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Paid",
                                        "icon": "paidIcon",
                                        "referenceKeyName": "paidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#1DEBA4",
                                        "position": 1
                                    },
                                    {
                                        "name": "Not Paid",
                                        "icon": "notPaidIcon",
                                        "referenceKeyName": "notPaidAfterOfferCount",
                                        "shortKey": "",
                                        "fillColor": "#FD4B33",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "600px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 3,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Channel Response Rate",
                                "kpiCustomizationName": "Channel Response Rate",
                                "chartType": "responseRateChart",
                                "chartStyle": {
                                    "width": "550px",
                                    "height": "400px",
                                    "margin": "20px"
                                },
                                "legendData": [],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Voice",
                                        "icon": "callIcon",
                                        "referenceKeyName": "callResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 1
                                    },
                                    {
                                        "name": "SMS",
                                        "icon": "smsIcon",
                                        "referenceKeyName": "smsResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 2
                                    },
                                    {
                                        "name": "WhatsApp",
                                        "icon": "whatsappIcon",
                                        "referenceKeyName": "whatsappResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#FF6D4D",
                                        "position": 3
                                    },
                                    {
                                        "name": "Email",
                                        "icon": "emailIcon",
                                        "referenceKeyName": "emailResponseRate",
                                        "shortKey": "",
                                        "fillColor": "#52E9AB",
                                        "position": 4
                                    }
                                ],
                                "refenceKeyForData": "data",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1200px",
                                        "height": "550px",
                                        "margin": "20px"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": false
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 4,
                                "isActive": true
                            },
                            {
                                "chartTitle": "Broken PTP Info",
                                "kpiCustomizationName": "Broken PTP Info",
                                "chartType": "barChart",
                                "chartStyle": {
                                    "width": "1200px",
                                    "height": "400px",
                                    "overflowX": "scroll",
                                    "overflowY": "hidden"
                                },
                                "legendData": [
                                    "No. of PTP Count",
                                    "No. of Customers"
                                ],
                                "legendColor": [],
                                "TableHeading": [],
                                "keys": [
                                    {
                                        "name": "Broken PTP Count",
                                        "icon": "",
                                        "referenceKeyName": "ptpCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 1
                                    },
                                    {
                                        "name": "Customer count",
                                        "icon": "",
                                        "referenceKeyName": "usersCount",
                                        "shortKey": "",
                                        "fillColor": "",
                                        "position": 2
                                    }
                                ],
                                "refenceKeyForData": "data.ptpBrokenDetails",
                                "expand": {
                                    "showExpandButton": true,
                                    "expandStyle": {
                                        "width": "1270px",
                                        "height": "600px",
                                        "overflowX": "scroll",
                                        "overflowY": "hidden"
                                    },
                                    "isExpanded": false
                                },
                                "sort": {
                                    "showSortButton": true
                                },
                                "download": {
                                    "showDownloadButton": true
                                },
                                "position": 5,
                                "isActive": true
                            }
                        ],
                        "sidebarModules": [
                            {
                                "name": "Datepicker",
                                "isActive": true,
                                "position": 1
                            },
                            {
                                "name": "Last Updated",
                                "isActive": true,
                                "position": 2
                            },
                            {
                                "name": "Filter",
                                "isActive": true,
                                "position": 3
                            },
                            {
                                "name": "Download",
                                "isActive": true,
                                "position": 4,
                                "keys": [
                                    {
                                        "mainKey": "Download",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "All View",
                                                "info": "The entire analytics graph of selected date range will be downloaded in pdf format.",
                                                "type": "radio"
                                            },
                                            {
                                                "keyName": "All Data",
                                                "info": "The entire analytics data of selected date range will be downloaded in csv format.",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Format",
                                        "type": "text",
                                        "subKey": [
                                            {
                                                "keyName": "PDF",
                                                "info": "",
                                                "type": "radio"
                                            }
                                        ]
                                    },
                                    {
                                        "mainKey": "Download",
                                        "type": "button"
                                    }
                                ]
                            },
                            {
                                "name": "KPI customisation",
                                "isActive": true,
                                "position": 5
                            },
                            {
                                "name": "Shuffle Column",
                                "isActive": true,
                                "position": 6
                            }
                        ],
                        "reportColumns": [
                            {
                                "_id": "6336ccbd43caa52bc7424ac6",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Sr. No",
                                "originalName": "Sr. No",
                                "position": 1,
                                "referancKeyName": "srNo",
                                "backendReferancKeyName": "srNo"
                            },
                            {
                                "_id": "6336cd6b43caa52bc7424aca",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Contact Number",
                                "originalName": "Contact Number",
                                "position": 2,
                                "referancKeyName": "information.phone_number",
                                "backendReferancKeyName": "information.phone_number"
                            },
                            {
                                "_id": "6336d89443caa52bc7424ace",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Date",
                                "originalName": "Date",
                                "position": 3,
                                "referancKeyName": "date",
                                "backendReferancKeyName": "date"
                            },
                            {
                                "_id": "6336d9058a59164ca748cb65",
                                "isPermanentDisable": false,
                                "isSortBtn": true,
                                "name": "Time",
                                "originalName": "Time",
                                "position": 4,
                                "referancKeyName": "time",
                                "backendReferancKeyName": "time"
                            },
                            {
                                "_id": "6336d9888a59164ca748cb69",
                                "isPermanentDisable": false,
                                "isSortBtn": false,
                                "name": "Loan ID",
                                "originalName": "Loan ID",
                                "position": 5,
                                "referancKeyName": "information.loan_id",
                                "backendReferancKeyName": "information.loan_id"
                            }
                        ],
                        "Summary": [
                            {
                                "mainKey": "Customer Profile",
                                "subKey": [
                                    {
                                        "keyName": "Name",
                                        "referenceKeyName": "-"
                                    },
                                    {
                                        "keyName": "Gender",
                                        "referenceKeyName": "-"
                                    }
                                ]
                            },
                            {
                                "mainKey": "Conversation",
                                "subKey": [
                                    {
                                        "keyName": "Flow Type",
                                        "referenceKeyName": "data[0].information.[flow_type]"
                                    },
                                    {
                                        "keyName": "PTP Date",
                                        "referenceKeyName": "data[0].information.[ptp_date]"
                                    },
                                    {
                                        "keyName": "EMI Date",
                                        "referenceKeyName": "data[0].information.[emiDate]"
                                    },
                                    {
                                        "keyName": "Delay Reason",
                                        "referenceKeyName": "data[0].information.[reason]"
                                    },
                                    {
                                        "keyName": "Disposition",
                                        "referenceKeyName": "data[0].information.[disposition]"
                                    }
                                ]
                            }
                        ]
                    },
                    "SMS": {},
                    "Mail": {}
                }
            },
            "Lead Generation": {}
        }
    }
}
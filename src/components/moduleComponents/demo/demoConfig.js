const demoConfig = () => {
    let BFSI = {
         'guest':{
             integration:{
                 filters:{
                         list:["crm" , "payment" , "channel"],
                         disabled:[],
                         hidden:["channel"]
                     },
     
                 },
             crm:{
                     filters:{
                             list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                             disabled:[],
                             hidden:["Hubspot", "Zoho", "Freshworks", "SugarCRM"]
                         }
                     },
             payment:{
                     filters:{
                             list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"  ],
                             disabled:[],
                             hidden:["Juspay" ,"PayU","Billdesk","Cashfree" ]
                         }
                     },
         },
         'owner':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel"],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:["Hubspot", "Zoho", "Freshworks", "SugarCRM"]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"  ],
                            disabled:[],
                            hidden:["Juspay" ,"PayU","Billdesk","Cashfree" ]
                        }
                    },
        },
         'chief risk officer':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:["channel"]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:["Hubspot", "Zoho", "Freshworks", "SugarCRM"]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay", "Juspay" ,"PayU","Billdesk","Cashfree" ],
                            disabled:[],
                            hidden:["Juspay" ,"PayU","Billdesk","Cashfree" ]
                        }
                    },
                 
         },
         'collectionmanager':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:["channel"]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce", "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:["Hubspot", "Zoho", "Freshworks", "SugarCRM"]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"],
                            disabled:[],
                            hidden:["Juspay" ,"PayU","Billdesk","Cashfree" ]
                        }
                    },
         },
         'campaignanalyst':{
            
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:["channel"]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" ,"Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:["Hubspot", "Zoho", "Freshworks", "SugarCRM"]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree" ],
                            disabled:[],
                            hidden:["Juspay" ,"PayU","Billdesk","Cashfree" ]
                        }
                    },
         }
     }

     let All = {
        'guest':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel"],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:[]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"  ],
                            disabled:[],
                            hidden:[]
                        }
                    },
        },
        'owner':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel"],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:[]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"  ],
                            disabled:[],
                            hidden:[]
                        }
                    },
        },
        'chief risk officer':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" , "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:[]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay", "Juspay" ,"PayU","Billdesk","Cashfree" ],
                            disabled:[],
                            hidden:[]
                        }
                    },
                 
         },
         'collectionmanager':{
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce", "Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:[]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree"],
                            disabled:[],
                            hidden:[]
                        }
                    },
         },
         'campaignanalyst':{
            
            integration:{
                filters:{
                        list:["crm" , "payment" , "channel" ],
                        disabled:[],
                        hidden:[]
                    },
    
                },
            crm:{
                    filters:{
                            list:["Salesforce" ,"Hubspot", "Zoho", "Freshworks", "SugarCRM"],
                            disabled:[],
                            hidden:[]
                        }
                    },
            payment:{
                    filters:{
                            list:["Razorpay" , "Juspay" ,"PayU","Billdesk","Cashfree" ],
                            disabled:[],
                            hidden:[ ]
                        }
                    },
         }
        
     }

     
          
         
 
    return {
     manappuram:BFSI,
     avail:BFSI,
     sriram:BFSI,
     indostar:BFSI,
     fedfina:BFSI,
     navi:BFSI,
     manya:BFSI,
     cred:BFSI,
     homefirst:BFSI,
     badabusiness:BFSI,
     wheelseye:BFSI,
     itc:BFSI,
     saarthidemo:All,
     internaltesting:All,
     'ola money': BFSI,
     fincare:BFSI,
     cleartouch:BFSI,
     'cleartouch testing':BFSI
    }
 }
 export default demoConfig;
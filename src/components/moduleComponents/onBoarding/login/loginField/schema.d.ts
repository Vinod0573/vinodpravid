export namespace schema {
    const analytics: {
        "Debt Collection": {
            Campaign: {
                Whatsapp: {
                    oneWay: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        kpiDetails: {
                            cardPosition: number;
                            chartPosition: number;
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                    position: number;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                        };
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    twoWay: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        kpiDetails: {
                            cardPosition: number;
                            chartPosition: number;
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: string[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: string[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        overflowX: string;
                                        overflowY: string;
                                        margin?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                        };
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                };
                Call: {
                    filters: {
                        name: string;
                        position: number;
                        backendReference: string;
                        id: string;
                    }[];
                    kpiDetails: {
                        cardPosition: number;
                        chartPosition: number;
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: {
                                year: string;
                                fillColor: string;
                            }[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                    };
                    sidebarModules: ({
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys?: undefined;
                    } | {
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys: ({
                            mainKey: string;
                            type: string;
                            subKey: {
                                keyName: string;
                                info: string;
                                type: string;
                            }[];
                        } | {
                            mainKey: string;
                            type: string;
                            subKey?: undefined;
                        })[];
                    })[];
                    reportColumns: {
                        _id: string;
                        isPermanentDisable: boolean;
                        isSortBtn: boolean;
                        name: string;
                        originalName: string;
                        position: number;
                        referancKeyName: string;
                        backendReferancKeyName: string;
                    }[];
                    Summary: {
                        mainKey: string;
                        subKey: {
                            keyName: string;
                            referenceKeyName: string;
                        }[];
                    }[];
                };
                SMS: {};
                Mail: {};
            };
            Payment: {
                Whatsapp: {};
                Call: {
                    filters: {
                        name: string;
                        position: number;
                        backendReference: string;
                        id: string;
                    }[];
                    kpiDetails: {
                        cardPosition: number;
                        chartPosition: number;
                        cards: never[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            slots: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: {
                                year: string;
                                fillColor: string;
                            }[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        })[];
                    };
                    sidebarModules: ({
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys?: undefined;
                    } | {
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys: ({
                            mainKey: string;
                            type: string;
                            subKey: {
                                keyName: string;
                                info: string;
                                type: string;
                            }[];
                        } | {
                            mainKey: string;
                            type: string;
                            subKey?: undefined;
                        })[];
                    })[];
                    reportColumns: {
                        _id: string;
                        isPermanentDisable: boolean;
                        isSortBtn: boolean;
                        name: string;
                        originalName: string;
                        position: number;
                        referancKeyName: string;
                        backendReferancKeyName: string;
                    }[];
                    Summary: {
                        mainKey: string;
                        subKey: {
                            keyName: string;
                            referenceKeyName: string;
                        }[];
                    }[];
                };
                SMS: {};
                Mail: {};
            };
            "Customer Behaviour": {
                Whatsapp: {};
                Call: {
                    filters: {
                        name: string;
                        position: number;
                        backendReference: string;
                        id: string;
                    }[];
                    kpiDetails: {
                        cardPosition: number;
                        chartPosition: number;
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                    };
                    sidebarModules: ({
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys?: undefined;
                    } | {
                        name: string;
                        isActive: boolean;
                        position: number;
                        keys: ({
                            mainKey: string;
                            type: string;
                            subKey: {
                                keyName: string;
                                info: string;
                                type: string;
                            }[];
                        } | {
                            mainKey: string;
                            type: string;
                            subKey?: undefined;
                        })[];
                    })[];
                    reportColumns: {
                        _id: string;
                        isPermanentDisable: boolean;
                        isSortBtn: boolean;
                        name: string;
                        originalName: string;
                        position: number;
                        referancKeyName: string;
                        backendReferancKeyName: string;
                    }[];
                    Summary: {
                        mainKey: string;
                        subKey: {
                            keyName: string;
                            referenceKeyName: string;
                        }[];
                    }[];
                };
                SMS: {};
                Mail: {};
            };
        };
        "Lead Generation": {};
    };
    namespace Logger {
        const report: {
            "Debt Collection": {
                Campaign: {
                    Whatsapp: {
                        oneWay: {
                            filters: {
                                name: string;
                                position: number;
                                backendReference: string;
                                id: string;
                            }[];
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                    position: number;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                            sidebarModules: ({
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys?: undefined;
                            } | {
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys: ({
                                    mainKey: string;
                                    type: string;
                                    subKey: {
                                        keyName: string;
                                        info: string;
                                        type: string;
                                    }[];
                                } | {
                                    mainKey: string;
                                    type: string;
                                    subKey?: undefined;
                                })[];
                            })[];
                            reportColumns: {
                                _id: string;
                                isPermanentDisable: boolean;
                                isSortBtn: boolean;
                                name: string;
                                originalName: string;
                                position: number;
                                referancKeyName: string;
                                backendReferancKeyName: string;
                            }[];
                            Summary: {
                                mainKey: string;
                                subKey: {
                                    keyName: string;
                                    referenceKeyName: string;
                                }[];
                            }[];
                        };
                        twoWay: {
                            filters: {
                                name: string;
                                position: number;
                                backendReference: string;
                                id: string;
                            }[];
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: string[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: string[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        overflowX: string;
                                        overflowY: string;
                                        margin?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                            sidebarModules: ({
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys?: undefined;
                            } | {
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys: ({
                                    mainKey: string;
                                    type: string;
                                    subKey: {
                                        keyName: string;
                                        info: string;
                                        type: string;
                                    }[];
                                } | {
                                    mainKey: string;
                                    type: string;
                                    subKey?: undefined;
                                })[];
                            })[];
                            reportColumns: {
                                _id: string;
                                isPermanentDisable: boolean;
                                isSortBtn: boolean;
                                name: string;
                                originalName: string;
                                position: number;
                                referancKeyName: string;
                                backendReferancKeyName: string;
                            }[];
                            Summary: {
                                mainKey: string;
                                subKey: {
                                    keyName: string;
                                    referenceKeyName: string;
                                }[];
                            }[];
                        };
                    };
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: {
                                year: string;
                                fillColor: string;
                            }[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
                Payment: {
                    Whatsapp: {};
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: never[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            slots: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
                "Customer Behaviour": {
                    Whatsapp: {};
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
            };
            "Lead Generation": {};
        };
        const transcript: {
            "Debt Collection": {
                Campaign: {
                    Whatsapp: {
                        oneWay: {
                            filters: {
                                name: string;
                                position: number;
                                backendReference: string;
                                id: string;
                            }[];
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                    position: number;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                            sidebarModules: ({
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys?: undefined;
                            } | {
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys: ({
                                    mainKey: string;
                                    type: string;
                                    subKey: {
                                        keyName: string;
                                        info: string;
                                        type: string;
                                    }[];
                                } | {
                                    mainKey: string;
                                    type: string;
                                    subKey?: undefined;
                                })[];
                            })[];
                            reportColumns: {
                                _id: string;
                                isPermanentDisable: boolean;
                                isSortBtn: boolean;
                                name: string;
                                originalName: string;
                                position: number;
                                referancKeyName: string;
                                backendReferancKeyName: string;
                            }[];
                            Summary: {
                                mainKey: string;
                                subKey: {
                                    keyName: string;
                                    referenceKeyName: string;
                                }[];
                            }[];
                        };
                        twoWay: {
                            filters: {
                                name: string;
                                position: number;
                                backendReference: string;
                                id: string;
                            }[];
                            cards: {
                                name: string;
                                referenceKey: string;
                                icon: string;
                                position: number;
                                kpiCustomisationName: string;
                                id: string;
                                isActive: boolean;
                            }[];
                            charts: ({
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth: string;
                                    innerHeight: string;
                                    innerRadius: string;
                                    outerRadius: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                legendData: never[];
                                legendColor: never[];
                                TableHeading: string[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        margin: string;
                                        overflowX?: undefined;
                                        overflowY?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            } | {
                                chartTitle: string;
                                kpiCustomizationName: string;
                                chartType: string;
                                chartStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                    innerWidth?: undefined;
                                    innerHeight?: undefined;
                                    innerRadius?: undefined;
                                    outerRadius?: undefined;
                                };
                                legendData: string[];
                                legendColor: never[];
                                TableHeading: never[];
                                keys: {
                                    name: string;
                                    icon: string;
                                    referenceKeyName: string;
                                    shortKey: string;
                                    fillColor: string;
                                }[];
                                refenceKeyForData: string;
                                expand: {
                                    showExpandButton: boolean;
                                    expandStyle: {
                                        width: string;
                                        height: string;
                                        overflowX: string;
                                        overflowY: string;
                                        margin?: undefined;
                                    };
                                    isExpanded: boolean;
                                };
                                sort: {
                                    showSortButton: boolean;
                                };
                                download: {
                                    showDownloadButton: boolean;
                                };
                                position: number;
                                isActive: boolean;
                            })[];
                            sidebarModules: ({
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys?: undefined;
                            } | {
                                name: string;
                                isActive: boolean;
                                position: number;
                                keys: ({
                                    mainKey: string;
                                    type: string;
                                    subKey: {
                                        keyName: string;
                                        info: string;
                                        type: string;
                                    }[];
                                } | {
                                    mainKey: string;
                                    type: string;
                                    subKey?: undefined;
                                })[];
                            })[];
                            reportColumns: {
                                _id: string;
                                isPermanentDisable: boolean;
                                isSortBtn: boolean;
                                name: string;
                                originalName: string;
                                position: number;
                                referancKeyName: string;
                                backendReferancKeyName: string;
                            }[];
                            Summary: {
                                mainKey: string;
                                subKey: {
                                    keyName: string;
                                    referenceKeyName: string;
                                }[];
                            }[];
                        };
                    };
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: {
                                year: string;
                                fillColor: string;
                            }[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
                Payment: {
                    Whatsapp: {};
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: never[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: string[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            slots: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                            slots?: undefined;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
                "Customer Behaviour": {
                    Whatsapp: {};
                    Call: {
                        filters: {
                            name: string;
                            position: number;
                            backendReference: string;
                            id: string;
                        }[];
                        cards: {
                            name: string;
                            referenceKey: string;
                            icon: string;
                            position: number;
                            kpiCustomisationName: string;
                            id: string;
                            isActive: boolean;
                        }[];
                        charts: ({
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth: string;
                                innerHeight: string;
                                innerRadius: string;
                                outerRadius: string;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                margin: string;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                                overflowX?: undefined;
                                overflowY?: undefined;
                            };
                            legendData: never[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    margin: string;
                                    overflowX?: undefined;
                                    overflowY?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        } | {
                            chartTitle: string;
                            kpiCustomizationName: string;
                            chartType: string;
                            chartStyle: {
                                width: string;
                                height: string;
                                overflowX: string;
                                overflowY: string;
                                margin?: undefined;
                                innerWidth?: undefined;
                                innerHeight?: undefined;
                                innerRadius?: undefined;
                                outerRadius?: undefined;
                            };
                            legendData: string[];
                            legendColor: never[];
                            TableHeading: never[];
                            keys: {
                                name: string;
                                icon: string;
                                referenceKeyName: string;
                                shortKey: string;
                                fillColor: string;
                                position: number;
                            }[];
                            refenceKeyForData: string;
                            expand: {
                                showExpandButton: boolean;
                                expandStyle: {
                                    width: string;
                                    height: string;
                                    overflowX: string;
                                    overflowY: string;
                                    margin?: undefined;
                                };
                                isExpanded: boolean;
                            };
                            sort: {
                                showSortButton: boolean;
                            };
                            download: {
                                showDownloadButton: boolean;
                            };
                            position: number;
                            isActive: boolean;
                        })[];
                        sidebarModules: ({
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys?: undefined;
                        } | {
                            name: string;
                            isActive: boolean;
                            position: number;
                            keys: ({
                                mainKey: string;
                                type: string;
                                subKey: {
                                    keyName: string;
                                    info: string;
                                    type: string;
                                }[];
                            } | {
                                mainKey: string;
                                type: string;
                                subKey?: undefined;
                            })[];
                        })[];
                        reportColumns: {
                            _id: string;
                            isPermanentDisable: boolean;
                            isSortBtn: boolean;
                            name: string;
                            originalName: string;
                            position: number;
                            referancKeyName: string;
                            backendReferancKeyName: string;
                        }[];
                        Summary: {
                            mainKey: string;
                            subKey: {
                                keyName: string;
                                referenceKeyName: string;
                            }[];
                        }[];
                    };
                    SMS: {};
                    Mail: {};
                };
            };
            "Lead Generation": {};
        };
    }
}

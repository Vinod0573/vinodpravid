import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClientData,
  setCurrentSelectedClient,
} from "../../../../redux/allClient/actions/allClient.action";
import Loader from "../../../generic/loader/Loader";
import SingleDropdown from "../../../generic/singleDropdown/SingleDropdown";
/**
 *
 * you can get the client list and current selected client
 * @example
 * 
  const clientList = useSelector((state: any) => {
    return state.allClientReducer.allClientList;
  });
    const currentUser = useSelector((state: any) => {
    return state.allClientReducer?.currentSelectedClient[0];
  });
 *
 */
export default function SelectClient() {
  const dispatch = useDispatch();
  const [allClient, setAllClient] = useState<{ name: string; id: string }[]>(
    []
  );
  const [selectedClient, setSelectedClient] = useState<any>("");

  const clientList = useSelector((state: any) => {
    return state.allClientReducer.allClientList;
  });
  const selectedClientInRedux = useSelector((state: any) => {
    return state.allClientReducer.currentSelectedClient;
  });
  const isLoading = useSelector(
    (state: any) => state.allClientReducer.isLoading
  );
  function setClient(name: string, id: string) {
    //  console.log(name, id, "nithin client");
    const currentSelected = clientList.filter((e: any) => e.id === id);
    setSelectedClient(currentSelected);
  }
  useEffect(() => {
    if (selectedClient !== "") {
      dispatch(setCurrentSelectedClient(selectedClient));
    }
  }, [selectedClient]);

  //set all client list to be given to dropdown
  useEffect(() => {
    if (clientList) {
      const client_list = clientList.map((e: any) => {
        return { name: e.name, id: e.id };
      });
      setAllClient(client_list);
    }
  }, [clientList]);
  useEffect(() => {
    // console.log("allC nithin");
    if (clientList.length === 0) {
      dispatch(getAllClientData());
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <SingleDropdown
          data={allClient}
          handleChange={setClient}
          title={
            selectedClientInRedux.length > 0
              ? selectedClientInRedux[0].name
              : "select client"
          }
        ></SingleDropdown>
      )}
    </>
  );
}

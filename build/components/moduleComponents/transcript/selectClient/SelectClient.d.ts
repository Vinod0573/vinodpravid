/// <reference types="react" />
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
export default function SelectClient(): JSX.Element;

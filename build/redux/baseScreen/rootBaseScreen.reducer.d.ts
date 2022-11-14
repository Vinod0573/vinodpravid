/// <reference types="redux-persist/types/persistreducer" />
declare const rootBaseScreenReducer: import("redux").Reducer<import("redux").CombinedState<{
    leftMenu: import("./leftMenu").stateInterface & import("redux-persist/es/persistReducer").PersistPartial;
    baseScreenState: import("./baseScreenState/interface").stateInterface;
}>, import("redux").AnyAction>;
export default rootBaseScreenReducer;

import { call, put, select } from "redux-saga/effects";
import actionTypes from "../actionTypes/login.actionTypes"
import  { config,ONBOARDING_URL} from '../../../../services/ApiRoutes';

// export function* loginWorker() {
//  try {
//       // let response = yield call(config.POST_WITH_HEADER,);
       
//    } catch (error) {
    
//    } 
// }
export function * schemaUpdateWorker(data:any):any{
    try{ 
      const response:any =yield call(config.POST, `https://${process.env.REACT_APP_SERVER_URL}${ONBOARDING_URL.SCHEMA_UPDATE}`,data.payload);
                  
      yield put({
                     type: actionTypes.SET_SCHEMA_UPDATE_SUCCESS,
                     payload: response.data.data.schema}
                   )                                                                                          
    }catch(err){
      yield put({
         type: actionTypes.SET_SCHEMA_UPDATE_FAILURE,
                  payload: "error"
      })
 //
    }
}

export function * requestFeatureWorker(data:any):any{
  try{ 
    const response:any =yield call(config.POST_WITH_HEADER, `https://${process.env.REACT_APP_SERVER_URL}${ONBOARDING_URL.REQUEST_FEATURE}`,data.payload,
    );
                
    yield put({
                   type: actionTypes.SET_REQUEST_FEATURE_SUCCESS,
                   payload: response
                  }
                 )  
                                                                                                       
  }catch(err){
    yield put({
       type: actionTypes.SET_REQUEST_FEATURE_FAILURE,
                payload: err
    })
//
  }
}

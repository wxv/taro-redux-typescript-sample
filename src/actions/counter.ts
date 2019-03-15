import { createAction, createApiAction } from "./index";
import { ADD, LIST, MINUS } from '../constants/counter'
import api from "../service/api";
export const add = createAction(ADD)
export const minus = createAction(MINUS)
export const list = createApiAction(LIST, (params) => api.get('NervJS/taro/issues', params))

// 异步的action
export function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

import { ADD, LIST, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  list: []
}

/** 
 * 根据指定动作执行特定方法
 * @state state 数据储存
 * @action action 对象中包含了执行动作以及数据
 */
export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case LIST:
      let data = state.list.concat(action.payload.data)
      return {
        ...state,
        list: data
      }
    default:
      return state
  }
}

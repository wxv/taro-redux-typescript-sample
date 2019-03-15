/** 定义公共的动作action = () => { return { type: ADD } } */
export function createAction(actionType) {
    return (payload?) => ({ type: actionType, payload })
}
/** 定义公共的API动作 */
export function createApiAction(actionType, func = (params) => { }) {
    return (
        params = {},
        callback = { success: ({}) => { }, failed: ({}) => { } },
        customActionType = actionType,
    ) => async (dispatch) => {
        try {
            dispatch({ type: `${customActionType}_request`, params });
            // 执行请求
            const data = await func(params);
            // 出发customActionType事件并将参数传递
            dispatch({ type: customActionType, params, payload: data });
            // 如果有回调执行回调
            callback.success && callback.success({ payload: data })
            return data
        } catch (e) {
            dispatch({ type: `${customActionType}_failure`, params, payload: e })

            callback.failed && callback.failed({ payload: e })
        }
    }
}

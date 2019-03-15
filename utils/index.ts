import {formatTime} from "./common";
declare let wx
export const logError = (name, action, info?) => {
    let device
    if (!info) {
        info = 'empty'
    }
    try {
        let deviceInfo = wx.getSystemInfoSync()
        device = JSON.stringify(deviceInfo)
    } catch (err) {
        console.error('not support getSystemInfoSync api', err.message)
    }
    let time = formatTime(new Date())
    console.error(time, name, action, info, device)
    if (typeof info === 'object') {
        info = JSON.stringify(info)
    }
}

export function formatTime(time) {
    // 1 分内 xx s
    // 1 小时内 xx m
    // 24 小时内 xx h
    // else 

    // 拿到当前的时间戳（毫秒) -- 转换为秒
    let currentTime = new Date()
    let currentTimestamp = currentTime.getTime() / 1000

    // 传进来的时间戳（毫秒)
    let t = new Date(time)
    let oldTimestamp = t.getTime() / 1000

    // 年
    let oldY = t.getFullYear()
    // 月
    let oldM = t.getMonth() + 1
    // 日
    let oldD = t.getDate()
    // 时
    let oldH = t.getHours()
    // 分
    let oldi = t.getMinutes()
    // 秒
    let olds = t.getSeconds()

    // 相隔多少秒
    let timestampDiff = currentTimestamp - oldTimestamp

    if (timestampDiff < 60) { // 一分钟以内
        return timestampDiff + "s"
    }

    if (timestampDiff < 60 * 60) { // 一小时以内
        return Math.floor(timestampDiff / 60) + 'm'
    }

    // 今天的时间
    if (oldY === currentTime.getFullYear() && oldM === (currentTime.getMonth() + 1) && oldD === currentTime.getDate()) {
        // 10:22
        return `${zeroize(oldH)}h`
    }
    const monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
    // 剩下的，就是昨天及以前的数据
    return `${monthEnglish[oldM - 1]} ${oldD}`;
    // return `${oldY}-${zeroize(oldM)}-${zeroize(oldD)}`

    // 补0
    function zeroize(num) {
        return num < 10 ? "0" + num : num
    }


}

export function formatDuration(time) {
    const days =  Math.floor(time / (3600*24));
    time -= days * 3600*24;
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    const minutes = Math.floor(time / 60);
    time -= minutes * 60;
    const seconds = Math.floor(time);
    return `${days}d ${hours}h ${minutes}m`;


}
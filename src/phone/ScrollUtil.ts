
const isAndroidWeixin = () => {
    const isAndroid = (navigator.userAgent.match(/android/i))  //判断是否是Android
    if (!isAndroid) {
        console.log("isAndroidWX " + false);
        return false;
    }
    //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    const isAndroidWX = /Micromessenger/i.test(ua);
    console.log("isAndroidWX " + isAndroidWX);
    return isAndroidWX;
};

export const udScrollTop = () => {
    if (isAndroidWeixin()) {
        return document.body.scrollTop;
    }
    return document.documentElement.scrollTop;
}

export const udScrollTo = (options?: ScrollToOptions) => {
    if (isAndroidWeixin()) {
        document.body.scrollTo(options);
    } else {
        document.documentElement.scrollTo(options);
    }
}


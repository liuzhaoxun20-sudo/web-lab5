// 获取页面上显示结果的标签
const outputEl = document.getElementById('geolocation');

function getGeolocation() {
    // 1. 检查浏览器是否支持地理定位 API
    if (navigator.geolocation) {
        // 支持就请求当前位置
        // 成功时调用 showGeolocation
        // 失败时调用 handleError（我们自己写的）
        navigator.geolocation.getCurrentPosition(showGeolocation, handleError);
        outputEl.innerHTML = "正在获取位置，请稍等...";
    } else {
        // 老浏览器 / 被禁用
        outputEl.innerHTML = "此浏览器不支持地理定位功能。";
    }
}

// 成功拿到定位信息后的回调
function showGeolocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    outputEl.innerHTML =
        "纬度 (Latitude): " + lat + "\n" +
        "经度 (Longitude): " + lon;
}

// 失败时的回调（例如用户拒绝授权）
function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            outputEl.innerHTML = "用户拒绝提供位置信息。";
            break;
        case error.POSITION_UNAVAILABLE:
            outputEl.innerHTML = "位置信息不可用。";
            break;
        case error.TIMEOUT:
            outputEl.innerHTML = "获取位置超时。";
            break;
        default:
            outputEl.innerHTML = "未知错误。";
    }
}

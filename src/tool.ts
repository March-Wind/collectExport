/**
 * 去掉多余的/
 * @param url 
 */
const formatURL = (url) => {
    return url.replace(/\/\//g, '/');
}

export {
    formatURL
}
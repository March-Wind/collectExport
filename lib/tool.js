"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatURL = void 0;
/**
 * 去掉多余的/
 * @param url
 */
var formatURL = function (url) {
    return url.replace(/\/\//g, '/');
};
exports.formatURL = formatURL;

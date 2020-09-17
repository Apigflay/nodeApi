const CryptoJS = require('../crypto-js/crypto-js.js');  //引用AES源码js
/**
 * 加密（）--api
 * @param word
 * @returns {*}
 */
function encrypt(word){
	var key = CryptoJS.enc.Utf8.parse("xiaohuixiaohuihahaha");
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return encrypted.toString();
}
/**
 * 解密 --api
 * @param word
 * @returns {*}
 */
function decrypt(word){
	var key = CryptoJS.enc.Utf8.parse("xiaohuixiaohuihahaha");
	var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
/**
 * 请求结构体 --api 100
 * @param word
 * @returns {*}
 */
function suc100(word,data){
    return {code:100,msg:word,data:data}
}
/**
 * 请求结构体 --api 101
 * @param word
 * @returns {*}
 */
function err101(word,data){
    return {code:101,msg:word,data:data}
}
/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};


/**
 * 请求构造sql查询语句 --fund
 * @param word
 * @returns {*}
 */
function whereSql(obj){//  后期使用
	console.log(obj)
    return '';
}
module.exports = {
    encrypt,
	decrypt,
	suc100,
	err101,
	getClientIP,

	
	whereSql
}
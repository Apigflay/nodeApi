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
module.exports = {
    encrypt,
    decrypt
}
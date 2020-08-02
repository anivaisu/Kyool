const API = 'http://3.21.105.57:3001/v1/';

const Headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

const reactNative = require('react-native');

export const userlogin = async(name,params) => {
	return fetch(API+name, {
		method: 'POST',
		headers: Headers,
		body: JSON.stringify({
			userMobile : params.userMobile,
			userOTP: params.userOTP,
		})
	});
} 

export const getAll = async (name,params) => {
	Headers['authToken'] = await reactNative.AsyncStorage.getItem('userMobile');
	return fetch(API+name, {
		method: 'POST',
		headers: Headers,
		body: JSON.stringify(params)
	});
} 

export const uploadCSV = async (name,params) => {
	Headers['authToken'] = await reactNative.AsyncStorage.getItem('userMobile');
	return fetch(API+name, {
		method: 'POST',
		headers: Headers,
		body: JSON.stringify(params)
	});
} 
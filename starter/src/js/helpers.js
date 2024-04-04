import { TIMEOUT_SEC } from './config.js';



const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};






export const getJSON = async function (url) {
    try {
        console.log('Request URL:', url);
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        console.log('Fetch response:', res);
        const data = await res.json();
        console.log('Parsed response data:', data);



        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }

}
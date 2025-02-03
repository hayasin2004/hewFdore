// paypay.js
import https from 'https';

const PAYPAY_API_URL = 'https://api.paypay.ne.jp/v2';
const PAYPAY_SECRET = process.env.PAYPAY_SECRET;

export const getPayPayProduct = async (productId :string) => {
    return new Promise((resolve, reject) => {
        const productId = "04583037014938517504"
        const options = {
            hostname: 'api.paypay.ne.jp',
            path: `/v2/products/${productId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYPAY_SECRET}`,
            },
        };
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
                    //console.log("食い終わった" + data)
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
        });
        //console.log(req)
        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
};

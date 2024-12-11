import axios from "axios";

export const callApi = async (url: any, method: any, data: any, callback: any, token: any) => {
    return axios({
        url: `https://play.satoriplay.com/api/${url}`,
        method: method,
        data,
        headers: { Authorization: token },
    })
        .then(function (res) {
            callback(res.data)
            // if (typeof res.data?.points == "number") {
            //     addNotification({
            //         title: 'Success',
            //         message: res.data?.points,
            //         theme: 'light',
            //     })
            // } else {
            //     // success("Success")
            // }
        })
        .catch(function (err) {
            console.log(err);
            if (url == 'user/doRef') {
                return
            }
            if (err) {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    console.log(err);
                } else if (err.response) {
                    console.log(err);
                }
            }
        });
};

export const createTransaction = (receiver: string, amount: string, payload: string) => {
    console.log(payload);
    return {
        // The transaction is valid for 10 minutes from now, in unix epoch seconds.
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
            {
                // The receiver's address.
                address: receiver,
                // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
                amount: amount,
                // (optional) State initialization in boc base64 format.
                //   stateInit:
                //   "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
                // (optional) Payload in boc base64 format.
                payload,
            },
        ],
    };
}
export const shortName = (username: any, length = 7) => {
    if (username && username.length > length) {
        return username.slice(0, length)+"..."
    } else {
        return username
    }
}

export const wait = (ms: any) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
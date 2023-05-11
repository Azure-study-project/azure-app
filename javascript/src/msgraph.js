// Microsoft Graph APIにリクエストを送り、レスポンスを返す非同期関数
async function callMSGraph(endpoint, token, axios) {
    // optionsというオブジェクトを作成
    const options = {
    method: 'GET',
    url: endpoint,
        headers: {
            Authorization: token
        }
    };
    // axiosというライブラリで、optionsに指定されたHTTPリクエストを非同期で送信
    return await axios(options)
    // レスポンスが正常に受信された場合
    .then((response) => {
        return response.data;
    })
    // レスポンスがエラーになった場合
    .catch((error) => {
        console.error(error);
        return error;
    });
}
// endpointとtokenとaxiosを受け取って、callMSGraph関数を呼び出して、結果を返す非同期関数をモジュールとしてエクスポート
module.exports = async function(endpoint, token, axios){
    return await callMSGraph(endpoint, token, axios);
}
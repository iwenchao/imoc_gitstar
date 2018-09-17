/**
 * Author: iwen
 * Create Time: 2018-09-17 23:08
 * Description:
 */

export default class DataRepository {


    getNetData(url) {
        return new Promise(((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        }))
    }
}
/**
 * Author: iwen
 * Create Time: 2018-09-22 20:56
 * Description:
 */

export default class ArrayUtils {


    /**
     * 克隆一个数组
     * @param from
     * @returns {Array}
     */
    static clone(from){
        if(!from) return [];
        let newArr = [];
        for (let i = 0; i < from.length; i++) {
            newArr[i] = from[i];
        }
        return newArr;
    }

}
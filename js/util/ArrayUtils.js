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

    /**
     * 判断两个数组内容是否一一对应
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    static isEqual(arr1, arr2){
        if (!arr1 && !arr2) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }
}
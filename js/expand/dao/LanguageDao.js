/**
 * Author: iwen
 * Create Time: 2018-09-20 23:19
 * Description:
 */

import React from 'react';
import {AsyncStorage} from 'react-native';
import keys from '../../../res/data/keys';
import langs from '../../../res/data/langs';

export var FLAG_LANGUAGE = {flag_language: 'flag_language_language', flag_key: 'flag_language_key'};



export default class LanguageDao {

    constructor(flag) {
        this.flag = flag;
    }


    fetch() {
        return new Promise(((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result) {
                        try {
                            let jsonResult = JSON.parse(result);
                            if (jsonResult && jsonResult.length !== 0) {
                                resolve(jsonResult);
                            } else {
                                let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : langs;
                                this.save(data);
                                resolve(data);
                            }

                        } catch (e) {
                            reject(e);
                        }

                    } else {
                        let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        }))
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error) => {
            console.log(error);
        })
    }

}
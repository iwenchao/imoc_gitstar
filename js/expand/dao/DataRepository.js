/**
 * Author: iwen
 * Create Time: 2018-09-17 23:08
 * Description:
 */
import React from 'react';
import {AsyncStorage} from 'react-native';
import GithubTrending from 'GitHubTrending'

export var FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'}

export default class DataRepository {


    constructor(flag){
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) {
            this.trending = new GithubTrending();
        }
    }

    getNetData(url) {
        return new Promise(((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending){
                this.trending.fetchTrending(url)
                  .then(resut=>{
                      if (!resut){
                          reject(new Error('responseData is null'))
                        return;
                      }
                    resolve(result);
                      this._saveRepository(url,resut);
                  })
            } else {
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  if (!result) {
                    reject(new Error('response data is null'));
                    return;
                  }
                  resolve(result);
                  this._saveRepository(url, result.items);
                })
                .catch(error => {
                  reject(error);
                }).done();
            }


        }))
    }

    fetchRepositoryByKey(url) {
        return new Promise(((resolve, reject) => {
            //先获取本地缓存
            this._fetchLocalCache(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.getNetData(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(e => {
                                reject(e);
                            })
                    }

                })
                .catch(e => {
                    this.getNetData(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e => {
                            reject(e);
                        })
                })


        }))
    }


    _fetchLocalCache(url) {
        return new Promise(((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        }))
    }

    _saveRepository(url, items, callback) {
        if (!url || !items) return;

        let wrapData = {items: items, update_date: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }


    checkDate(longTime) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        return (cDate.getHours() - tDate.getHours()) <= 4;


    }
}
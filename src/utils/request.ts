import axios, { AxiosRequestConfig, CancelTokenSource, AxiosError } from "axios";

import { Toast } from "vant";

import qs from "qs";
import Storage from "./storage";
import CryptoHelper from "./cryptoJs";

export const baseURl = "http://localhost:3000/";

const CANCELTTYPE = {
  CACHE: 1,
  REPEAT: 2,
};

interface CancelType {
  data: any;
  type: number;
}

interface RequsetTtpe {
  md5Key: string;
  source: CancelTokenSource;
}

const pendingResquests: RequsetTtpe[] = [];

const axiosInstance = axios.create({
  baseURL: baseURl,
  timeout: 10 * 1000,
});

const storage = new Storage();

const cryptoHelper = new CryptoHelper("cacheKey");

axiosInstance.interceptors.request.use(
  (config) => {
    /**
     * 为每一次请求生成一个CancelToken
     */
    const source = axios.CancelToken.source();

    config.cancelToken = source.token;

    /**
     * 缓存命中判断
     * 成功则取消当次请求
     */
    const data = storage.get(
      cryptoHelper.encrypt(
        config.url + JSON.stringify(config.data || config.params) + (config.method || "")
      )
    );

    if (data && Date.now() <= data.exppries) {
      console.log(`接口: ${config.url}缓存====${Date.now()}====${data.exppries}`);

      source.cancel(
        JSON.stringify({
          type: CANCELTTYPE.CACHE,
          data: data.data,
        })
      );
    }

    /**
     * 重复请求判断
     * 同url和同请求类型判定为重复请求
     * 以最新的请求为准
     */
    const md5Key = cryptoHelper.encrypt(config.url + (config.method || ""));

    /**
     * 将之前的重复且未完成的请求全部取消
     */
    const history = pendingResquests.filter((item) => item.md5Key === md5Key);

    if (history.length > 0) {
      history.forEach((item) => {
        item.source.cancel(
          JSON.stringify({
            type: CANCELTTYPE.REPEAT,
            data: "重复请求,已取消",
          })
        );
      });
    }

    /**
     * 将当前的请求添加进请求队列中
     */
    pendingResquests.push({
      md5Key,
      source,
    });

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    /**
     * 不论请求是否成功
     * 将本次完成的请求从请求队列中移除
     */

    /**
     * 以同样的加密方式获取加密字符串
     */
    const md5Key = cryptoHelper.encrypt(response.config.url + (response.config.method || ""));

    const index = pendingResquests.findIndex((item) => item.md5Key === md5Key);

    if (index > -1) pendingResquests.splice(index, 1);

    if (response.data && response.data.type === 0) {
      if (response.config.data) {
        const dataParse = JSON.parse(response.config.data);
        if (dataParse.cache) {
          if (!dataParse.cacheTime) {
            dataParse.cacheTime = 1000 * 60 * 3;
          }
          storage.set(
            cryptoHelper.encrypt(
              response.config.url + response.config.data + (response.config.method || "")
            ),
            {
              data: response.data.data,
              exppries: Date.now() + dataParse.cacheTime,
            }
          );
          console.log(`接口：${response.config.url} 设置缓存，缓存时间: ${dataParse.cacheTime}`);
        }
      }
      // return response.data.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function request(config: AxiosRequestConfig) {
  // return new Promise((resolve, reject) => {
  //   /**
  //    * 集成接口缓存过期机制
  //    * 缓存过期将重新请求获取最新数据，并更新缓存
  //    * {cache： true, cacheTime: 1000 * 60 *3 } 默认缓存三分钟
  //    */
  //   axiosInstance(config)
  //     .then(async (res) => {
  //       await resolve(res.data);
  //     })
  //     .catch((error: AxiosError) => {
  //       if (axios.isCancel(error)) {
  //         const cancle: CancelType = JSON.parse(error.message);
  //         if (cancle.type === CANCELTTYPE.REPEAT) {
  //           return resolve(null);
  //         } else {
  //           return resolve(cancle.data);
  //         }
  //       } else {
  //         return reject(error);
  //       }
  //     });
  // });
  // return axiosInstance(config)
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((error: AxiosError) => {
  //     if (axios.isCancel(error)) {
  //       const cancel: CancelType = JSON.parse(error.message);
  //       if (cancel.type === CANCELTTYPE.REPEAT) {
  //         return null;
  //       } else {
  //         return cancel.data;
  //       }
  //     } else {
  //       return error;
  //     }
  //   });
}

const httpHelper = {
  get(url: string, params?: any) {
    return axiosInstance
      .get(url, { params })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          const cancle = JSON.parse(error.message);
          if (cancle.type === CANCELTTYPE.REPEAT) {
            return [];
          } else {
            return cancle.data;
          }
        } else {
          return error;
        }
      });
  },

  post({ url, data }: { url: string; data: any }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data)
        .then(async (res) => {
          resolve(res);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            const cancle = JSON.parse(error.message);
            if (cancle.type === CANCELTTYPE.REPEAT) {
              return resolve(null);
            } else {
              return resolve(cancle.data);
            }
          } else {
            return reject(error);
          }
        });
    });
  },
};

export default httpHelper;

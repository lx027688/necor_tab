import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { useEnv } from "@/hooks/useEnv";
import { get } from 'lodash'

const { VITE_BASE_API } = useEnv();

const service: AxiosInstance = axios.create({
    baseURL: VITE_BASE_API,
    timeout: 10 * 1000, // 请求超时时间
    headers: { "Content-Type": "application/json;charset=UTF-8" }
});

// 请求拦截
service.interceptors.request.use(config => config,error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
});

// 响应拦截
service.interceptors.response.use((response: AxiosResponse) => {
        const data = response.data
        // 这个状态码是和后端约定的
        const { code } = data
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 NECOR 请求最新版本
            return data
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 1000:
                case -1000:
                case 1001:
                case 1002:
                case 10001:
                case 20001:
                    return data
                    break
                default:
                    // 不是正确的 code
                    // errorCreate(`${data.msg}: ${response.config.url}`)
                    break
            }
        }
    },
    (err) => {
        const status = get(err, 'response.status')
        switch (status) {
            case 400: err.message = '请求错误'; break
            case 401: err.message = '访问失败'; break
            case 403: err.message = '拒绝访问'; break
            case 404: err.message = `请求地址出错: ${err.response.config.url}`; break
            case 408: err.message = '请求超时'; break
            case 500: err.message = '服务器内部错误'; break
            case 501: err.message = '服务未实现'; break
            case 502: err.message = '网关错误'; break
            case 503: err.message = '服务不可用'; break
            case 504: err.message = '网关超时'; break
            case 505: err.message = 'HTTP版本不受支持'; break
            default: break
        }
        return Promise.reject(err)
    }
);

const request = {
    get<T = any>(url: string, data?: any): Promise<T> {
        return request.request("GET", url, { params: data });
    },
    post<T = any>(url: string, data?: any): Promise<T> {
        return request.request("POST", url, { data });
    },
    put<T = any>(url: string, data?: any): Promise<T> {
        return request.request("PUT", url, { data });
    },
    delete<T = any>(url: string, data?: any): Promise<T> {
        return request.request("DELETE", url, { params: data });
    },
    request<T = any>(method = "GET", url: string, data?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            service({ method, url, ...data })
                .then((res) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                })
        });
    }
};

export default request;
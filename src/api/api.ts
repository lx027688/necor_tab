import request from "@/utils/service";
import {isBlank, isNotBlank} from '@/utils/common';

let remoteUrl = localStorage.getItem('remoteUrl')

export function menus () {
    if (isBlank(remoteUrl)) {
        return request.post('/data/menus.json')
    }else {
        return request.post(remoteUrl+'/data/menus.json')
    }
}

export const navs = (data: any) => request.post('/data/navs'+data+'.json');
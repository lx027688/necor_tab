import request from "@/utils/service";
import {isBlank} from '@/utils/common';

let remoteUrl = localStorage.getItem('remoteUrl')

export async function getMenus(): Promise<any> {
    return fetchData('menus', 'menus.json');
}

export async function addMenu(menu): Promise<any> {
    // 如果配置没有远程地址
    if (isBlank(remoteUrl)) {
        // 尝试获取数据
        const menus = await fetchData('menus', 'menus.json')
        // 将新数据添加到集合中
        let index = menus.data.length+1
        menus.data.push({'index':index+'', sort:index, ...menu})
        // 更新到localStorage中
        setItemWithExpiry('menus', JSON.stringify(menus), 1)
    }else { // 配置了远程地址，保存到服务器

    }
}

export async function getMenuIcons(): Promise<any> {
    return fetchData('menuIcons', 'menu_icons.json');
}

export function navs (data: any) {
    if (isBlank(remoteUrl)) {
        return request.post('/data/navs'+data+'.json')
    }else {
        return request.post(remoteUrl+'/data/menus.json')
    }
}

//-------------------------------------------------------------------------- 公共方法 --------------------------------------------------------------------------
async function fetchData<T>(key: string, localFile: string): Promise<T> {
    return new Promise((resolve, reject) => {
        // 如果配置没有远程地址
        if (isBlank(remoteUrl)) {
            // 尝试从 localStorage 获取数据
            const storedData = getItemWithExpiry(key);

            // localStorage 中有数据
            if (storedData) {
                resolve(JSON.parse(storedData));
            } else {
                // 如果 localStorage 中没有数据，则从本地文件获取
                fetch('/data/'+localFile).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject(`无法获取${key}数据`);
                    }
                }).then(data => {
                    // 得到结果后放入localStorage中
                    setItemWithExpiry(key, JSON.stringify(data), 1);
                    resolve(data);
                }).catch(error => {
                    reject(`获取${key}数据时出错: ${error}`);
                });
            }
        } else { // 配置了远程地址，从远处地址中获取
            request.get(`${remoteUrl}/data/${localFile}`).then(response => {
                return response;
            }).then(data => {
                // 得到响应后放入localStorage中
                setItemWithExpiry(key, JSON.stringify(data), 1);
                resolve(data);
            }).catch(error => {
                console.error(`获取${key}数据时出错: `, error);
                if (storedData) {
                    resolve(JSON.parse(storedData));
                } else {
                    reject(`获取${key}数据时出错: ${error}`);
                }
            });
        }
    });
}

// 设置数据到 localStorage，带过期时间
function setItemWithExpiry(key, value, expiryInMinutes) {
    const now = new Date();
    const expiryTime = now.getTime() + expiryInMinutes * 60 * 1000; // 计算过期时间
    const item = {
        value: value,
        expiry: expiryTime
    };
    localStorage.setItem(key, JSON.stringify(item)); // 存储数据
}

// 从 localStorage 获取数据，并检查是否过期
function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // 如果没有找到数据，返回 null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    // 检查是否过期 （暂时不做过期处理）
    if (false /*now.getTime() > item.expiry*/) {
        localStorage.removeItem(key); // 删除过期数据
        return null;
    }
    return item.value; // 返回有效数据
}
import * as Cookie from 'js-cookie';

const key = 'authorization';
export let getToken: ()=>any = ()=>{
    return Cookie.get(key);
};

export let setToken: (val: string)=>void = (val)=>{
    Cookie.set(key, val, { expires: 7 });
};

export let removeToken: ()=>void = ()=>{
    Cookie.remove(key);
};
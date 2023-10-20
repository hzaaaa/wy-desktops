// * 后端微服务端口名

// 鉴权
// export const PORTAuth = "/impaladata";
export const PORTAuth = import.meta.env.VITE_PATH_NAME as string;
// export const PORTAuth = "/equalProtection";

// 业务
// export const PORTBiz = "/impaladata";
export const PORTBiz = import.meta.env.VITE_PATH_NAME as string;
// export const PORTBiz = "/equalProtection";


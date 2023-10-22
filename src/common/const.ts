// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://backend-eta-teal.vercel.app/';

export const noCacheHeader = new Headers();
noCacheHeader.append('Pragma', 'no-cache');
noCacheHeader.append('Cache-Control', 'no-cache')
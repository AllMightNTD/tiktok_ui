import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

// Tạo một phương thức get với path ( url ) và options
export const get = async (path, options = {}) => {
    // Lấy ra cái data đầu của url
    const respone = await request.get(path, options);
    // Truy cập vào data của respone
    return respone.data;
};

export default request;

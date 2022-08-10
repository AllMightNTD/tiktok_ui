import { useEffect, useState } from 'react';

// Cài đặt useDebounce
// Debounce : Delay gọi API trong khoảng thời gian dự tính value người dùng nhập vào

function useDebounce(value, delay) {
    // value : giá trị
    // delay : khoảng thời gian delay
    // delay giá trị sau 1 khoảng thời gian

    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        // Sau một khoảng thời gian  delay mới set lại debounceValue là value mới
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounce;

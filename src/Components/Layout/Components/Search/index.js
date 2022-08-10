import { WrapperPopper as PopperWrapper } from '~/Components/Propper';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '~/Components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

// Quy tập tất cả các thằng lấy ra từ file request.js => thành một object request
import * as request from '~/utils/request';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { SearchIcon } from '~/Components/Icons';

import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchresult] = useState([]);

    // Set searchValue
    // Thay đổi ẩn hiện clear ( dấu "x")
    const [searchValue, setSearchValue] = useState('');

    // Boolean focus ẩn hiện list tìm khi blur ra ngoài
    const [showResult, setShowResult] = useState(true);

    // Set Loading
    const [Loading, setLoading] = useState(false);
    const inputRef = useRef();

    // Đặt biến , gọi đến useDebounce để delay giá trị search value với khoảng thời gian truyền vào
    // delay : 500 ms
    const debounce = useDebounce(searchValue, 500);

    // Khởi tạo bằng dữ liệu mình tìm kiếm
    useEffect(() => {
        // Kiểm tra nếu nó bằng rỗng => return luôn (out)
        if (!debounce.trim()) {
            // Nếu không nhập gì vào ô tìm kiếm => không hiện gì
            setSearchresult([]);
            return;
        }
        // Khi nhập search vào => hiện loading
        setLoading(true);
        // Lấy API
        // enodeURIComponent (Tách searh khói các kí tự parameter)

        // XMLHttpRequest
        // Fetch

        // Nối chuỗi
        // Dùng thư viện axioss
        request
            .get('users/search', {
                // Cấu hình
                // q : dữ liệu
                params: {
                    q: debounce,
                    type: 'less',
                },
            })
            .then((res) => {
                // Set searchValue
                // Thằng respone có thêm 1 cái data nữa
                console.log(res.data);
                setSearchresult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    // Hàm xử lý ẩn hiện kết quả tìm kiếm khi blur ra ngoài Tippy
    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchresult([]);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        // Nếu nó không bắt đầu bằng dấu cách và có khoảng trắng thì setValue
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // Hàm xử lý submit : gửi đi
    const hanldeSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>

                        {/* Duyệt tất cả dữ liệu => kết quả , map qua nhận được dữ liệu là result */}
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            // Blur ra ngoài Tippy => ẩn đi (setShowResult(false))
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    // Truy cập đến cái ref của thằng input
                    ref={inputRef}
                    value={searchValue}
                    maxLength="30"
                    placeholder="Search account and Video..."
                    spellCheck={false}
                    onChange={handleChange}
                    // Khi focus => lại hiện lại kết quả tìm kiếm
                    onFocus={() => setShowResult(true)}
                />
                {/* Nếu tồn tại searchValue => hiện dấu clear ("x")
                  Bắt sự kiện cho nút clear ("x") => xóa hết value
                */}
                {/* Clear ('x') */}
                {/* Nếu có searchValue và không có Loading => hiện icon Xóa */}
                {!!searchValue && !Loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Close */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* Nếu Loading = true => hiện icon  */}
                {Loading && <FontAwesomeIcon className={cx('loadding')} icon={faSpinner} />}
                {/* Loading */}

                {/* Huong placement */}
                {/* Content */}

                {/* Xử lý bỏ sự kiện mặc định của input khi nhấn chuột xuống : onMouseDown */}
                <button className={cx('search-btn')} onMouseDown={hanldeSubmit}>
                    {/*Search  */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

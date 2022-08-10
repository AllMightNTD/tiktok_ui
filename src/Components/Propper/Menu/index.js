import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { WrapperPopper as PopperWrapper } from '~/Components/Propper';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, onChange = () => {} }) {
    // Làm phần menu đa cấp
    const [history, setHistory] = useState([{ data: items }]);
    // Lấy tất cả dữ liệu của mảng mới
    const currentMenu = history[history.length - 1];

    const renderItem = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            // Push nó thêm vào mảng
                            // Mảng mới gồm các phần tử cũ và thêm phần tử mới
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                ></MenuItem>
            );
        });
    };
    return (
        <Tippy
            interactive
            offset={[14, 8]}
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* History.length > 1 : số phần tử mảng lớn hơn 1 */}
                        {history.length > 1 && (
                            <HeaderMenu
                                title={'Language'}
                                // onBack : quay lại => xóa từ phần tử đầu tiên đến phần tử gần cuối
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}

                        {/* Thêm class cho nó : bao trùm kết quả render ra  */}
                        <div className={cx('menu-scroll')}> {renderItem()}</div>
                    </PopperWrapper>
                    \
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

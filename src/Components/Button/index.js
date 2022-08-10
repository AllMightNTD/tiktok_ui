import styles from './button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    text = false,
    primary = false,
    outline = false,
    small = false,
    large = false,
    rounded = false,
    disabled = false,
    leftIcon,
    rightIcon,
    // Class Custom riêng
    className,
    onClick,
    children,
    passprops,
}) {
    let Comp = 'button';

    // Mặc định nó là button mặc định
    const props = {
        onClick,
        ...passprops,
    };

    // Nếu nó disabled
    // Bỏ luôn tất cả các sự kiện bắt đầu bằng chữ on trên nó
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        // Vào đây thành true => thằng nào có class này mới dùng được nó
        small,
        large,
        text,
        rounded,
        disabled,
        // Khi có className : lấy giá trị của className làm key
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{leftIcon}</span>}
        </Comp>
    );
}

export default Button;

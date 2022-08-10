import classNames from 'classnames/bind';
import styles from './Propper.module.scss';

const cx = classNames.bind(styles);
function WrapperPopper({ children, className }) {
    return <div className={cx('wrapperpop', className)}>{children}</div>;
}
export default WrapperPopper;

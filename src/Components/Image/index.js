import { forwardRef, useState } from 'react';
import images from '~/assets/image';

// Giúp đưa thêm class từ ngoài vào
import className from 'classnames';
import classNames from 'classnames';
import styles from './Image.module.scss';

console.log(images.noimage);

// Đổi tên failback thành customFailback
// Nếu không có fallback truyền từ ngoài vào => lấy thằng mặc định (images.noimages)
// Nếu có fallback thì lấy fallback truyền từ ngoài vào

function Image({ src, alt, failback: customFailback = images.noimage, ...props }, ref) {
    const [failback, setFailback] = useState('');

    const hanldeError = () => {
        setFailback(customFailback);
    };

    // eslint-disable-next-line jsx-a11y/alt-text
    // onError : biểu thị cho ảnh lỗi

    return (
        <img
            // Mặc định có thằng wrapper
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={failback || src}
            alt={alt}
            {...props}
            onError={hanldeError}
        />
    );
}

export default forwardRef(Image);

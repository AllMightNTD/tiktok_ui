// Pages
import Home from '~/pages/Home';
import Folowwing from '~/pages/Following';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
// HeaderOnly
import { HeaderOnly } from '~/Components/Layout';

// Cấu hình
import routesConfig from '~/config/routes';

// Dùng cho router k cần đăng nhập
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.folowwing, component: Folowwing },

    // Click vào nickname => chuyển sang trang profile
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];

// Dùng cho router phải đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };

import { RouteList } from '@lionrockjs/router';

RouteList.add('/register', 'controller/Register', 'register_post', 'POST')
RouteList.add('/login', 'controller/Auth', 'login');
RouteList.add('/login', 'controller/Auth', 'login_post', 'POST');
RouteList.add('/login/fail', 'controller/Auth', 'fail');
RouteList.add('/logout', 'controller/Auth', 'logout');
RouteList.add('/account', 'controller/Account', 'index');

RouteList.add('/account/person', 'controller/Account', 'change_person');
RouteList.add('/account/person', 'controller/Account', 'change_person_post', 'POST');
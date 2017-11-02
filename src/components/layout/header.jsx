import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Icon
} from 'antd';
import {
  Link
} from 'dva/router';

import styles from './header.less';

function Header({
  location
}) {
  return (
    <header className={styles.normal}>
      <div className={styles.logo}>
        <Link to="/">Starter</Link>
      </div>
      <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
      >
      </Menu>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default Header;

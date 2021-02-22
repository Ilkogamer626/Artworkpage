import React from 'react';
import { Link } from 'react-router-dom';
import styles from './csss/Navbar.module.css';

export const Navbar: React.FC = (props) => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navbar_nav}>{props.children}</ul>
		</nav>
	);
};

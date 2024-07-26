import React from 'react';
import { HeaderWrapper, HeaderLogo, HeaderSettingsIcon } from './styles.Header';
import logo from '../../assets/secondopinion.gif'
import { ReactComponent as SettingsIcon } from '../../assets/gear-solid.svg';

export const Header: React.FC = () => {

	return (
	<HeaderWrapper>
		<HeaderLogo onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
		<img height='100%' width='auto' src={logo} alt="logo" />
		</HeaderLogo>
		{/* <HeaderSettingsIcon>
		<SettingsIcon style={{width: '100%', height: '100%', fill: '#aaa8a5'}} />
		</HeaderSettingsIcon> */}
	</HeaderWrapper>
	)
};
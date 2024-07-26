import React from 'react';
import { Fonts } from './styles/fonts';
import { GlobalStyle } from './styles/globalStyle';
import { Header } from './components/Header/Header'
import { Content } from './Content'

export const App: React.FC = () => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <Fonts />
            <GlobalStyle />
            <Header></Header>
            <Content></Content>
        </div>
    );
};

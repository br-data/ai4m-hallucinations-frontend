import { createGlobalStyle } from 'styled-components';

import OpenSansRegularWoff2 from '../assets/fonts/open-sans/open-sans-v17-latin-regular.woff2';
import OpenSansRegularWoff from '../assets/fonts/open-sans/open-sans-v17-latin-regular.woff';
import OpenSansItalicWoff2 from '../assets/fonts/open-sans/open-sans-v17-latin-italic.woff2';
import OpenSansItalicWoff from '../assets/fonts/open-sans/open-sans-v17-latin-italic.woff';
import OpenSansSemiBoldWoff2 from '../assets/fonts/open-sans/open-sans-v17-latin-600.woff2';
import OpenSansSemiBoldWoff from '../assets/fonts/open-sans/open-sans-v17-latin-600.woff';
import OpenSansBoldWoff2 from '../assets/fonts/open-sans/open-sans-v17-latin-700.woff2';
import OpenSansBoldWoff from '../assets/fonts/open-sans/open-sans-v17-latin-700.woff';

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSansRegularWoff2}) format('woff2'),
            url(${OpenSansRegularWoff}) format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: fallback;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSansItalicWoff2}) format('woff2'),
            url(${OpenSansItalicWoff}) format('woff');
        font-weight: 400;
        font-style: italic;
        font-display: fallback;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSansSemiBoldWoff2}) format('woff2'),
            url(${OpenSansSemiBoldWoff}) format('woff');
        font-weight: 600;
        font-style: normal;
        font-display: fallback;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSansBoldWoff2}) format('woff2'),
            url(${OpenSansBoldWoff}) format('woff');
        font-weight: 700;
        font-style: normal;
        font-display: fallback;
    }
`;

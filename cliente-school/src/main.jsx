import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react';

// Define the custom theme with brown tones
const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: '#FFF4E5', // Light orange
                    100: '#FFE8CC',
                    200: '#FFD1A6',
                    300: '#FFB87F',
                    400: '#FF9F59',
                    500: '#FF7F2A', // Strong orange
                    600: '#CC641F',
                    700: '#994A15',
                    800: '#66300A',
                    900: '#331805',
                },
                brown: {
                    50: '#EFEBE9', // Light brown
                    100: '#D7CCC8',
                    //200: '#BCAAA4',
                    200:'#E8D9D0',
                    300: '#A1887F',
                    400: '#8D6E63',
                    500: '#795548', // Strong brown
                    600: '#6D4C41',
                    700: '#5D4037',
                    800: '#4E342E',
                    900: '#3E2723',
                },
            },
        },
    },
});

// Create the design system
const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider value={system}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>
);

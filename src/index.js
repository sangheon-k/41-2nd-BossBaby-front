import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './Router';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import ReactModal from 'react-modal';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);

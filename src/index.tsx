import { createRoot } from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './components/app/app';
import 'semantic-ui-css/semantic.min.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

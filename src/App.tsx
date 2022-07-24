import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from 'containers';
import { store } from 'reducers';
import { PrivateLayout } from 'layouts';
import { useEffect, useState } from 'react';
import { signIn } from 'reducers/profile';
import { staticRoute } from 'routes';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const resultId = window.location.href.split('results/');
    if (resultId[1]) localStorage.setItem('result_id', resultId[1]);
    try {
      const profile = JSON.parse(localStorage.getItem('profile') ?? '');
      store.dispatch(signIn(profile));
    } catch {
    } finally {
      setIsReady(true);
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AppContainer>
          {isReady && (
            <Routes>
              {Object.values(staticRoute).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path='/*' element={<PrivateLayout />} />
            </Routes>
          )}
        </AppContainer>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;

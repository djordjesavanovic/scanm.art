import React from 'react';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasketContextProvider } from './context/BasketContext';
import { Routes, Route, Outlet } from 'react-router-dom';
import Main from './views/Main/Main';
import Start from './views/Start/Start';

const App = () => {
  return (
    <BasketContextProvider>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Start />} />
          <Route path={'/scan'} element={<Main />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/*<Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </BasketContextProvider>
  );
};

const Layout = () => {
  return (
    <div className={'container-fluid bg-light vh-100 d-flex flex-column'}>
      <Header />
      <div className={'container'}>
        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <ToastContainer
          position={'bottom-center'}
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme={'light'}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default App;

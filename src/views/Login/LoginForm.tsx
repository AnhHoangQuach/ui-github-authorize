import { useEffect } from 'react';
import { authService } from 'services';
import { signIn, signOut } from 'reducers/profile';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from 'reducers/notification';
import { profileSelector } from 'reducers/profile';
import { store } from 'reducers';
import { useNavigate } from 'react-router-dom';
import { privateRoute } from 'routes';
import { GitHub } from '@mui/icons-material';
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } from 'env';
import { Link as MuiLink, Button } from '@mui/material';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(privateRoute.home.path, { replace: true });
    }
    const url = window.location.href;
    const hasCode = url.includes('?code=');
    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, '', newUrl[0]);

      const requestData = {
        code: newUrl[1],
      };

      authService
        .login(requestData)
        .then((res) => {
          dispatch(signIn(res));
          store.dispatch(openNotification({ message: 'Login Success', variant: 'success' }));
        })
        .catch(() => {
          dispatch(signOut());
          store.dispatch(openNotification({ message: 'Login Failed', variant: 'error' }));
        });
    }
  }, [navigate, isLoggedIn, dispatch]);

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='mx-auto'>
        <Button
          variant='contained'
          component={MuiLink}
          href={`https://github.com/login/oauth/authorize?scope=read:user,user:email&client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`}
          className='flex items-center space-x-4'
        >
          <GitHub /> <span>SIGN IN</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

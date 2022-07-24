import { Home } from 'views/Home';

type RouteType = {
  path: string;
  url?: (query: any) => string;
  name?: string;
  element: JSX.Element;
};

type PrivateRouteType = {
  [key: string]: RouteType;
};

const privateRoute: PrivateRouteType = {
  home: {
    path: '/results/:resultId',
    name: 'Results',
    url: ({ resultId }: { resultId: string }) => `/results/${resultId}`,
    element: <Home />,
  },
};

export default privateRoute;

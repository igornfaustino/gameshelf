type Route = {
  nameKey: string;
  href: string;
};

type ContextMenu = {
  [offlineRoutes: string]: Route[];
};

export const offlineRoutes: Route[] = [
  {
    nameKey: 'login',
    href: '/login',
  },
  {
    nameKey: 'singup',
    href: '/singup',
  },
];

export const onlineRoutes: Route[] = [];

export const contextMenu: ContextMenu = {
  offlineRoutes,
  onlineRoutes,
};

export const OFFLINE_ROUTE_KEY = 'offlineRoutes';
export const ONLINE_ROUTE_KEY = 'onlineRoutes';

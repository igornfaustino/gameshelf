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

export const contextMenu: ContextMenu = {
  offlineRoutes,
};

export const OFFLINE_ROUTE_KEY = 'offlineRoutes';

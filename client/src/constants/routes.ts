export const PUBLIC_ROUTES = {
  HOME: '/'
}

const ADMIN_ROUTE = '/admin'

export const PRIVATE_ROUTES = {
  ADMIN: {
    DASHBOARD: `${ADMIN_ROUTE}/dashboard`,
    MANAGE_USERS: `${ADMIN_ROUTE}/users`,
    MANAGE_POST: `${ADMIN_ROUTE}/posts`,
    PROFILE: `${ADMIN_ROUTE}/profile`
  }
}

const getters = {
  loading: state => state.app.loading,
  roles: state => state.user.roles,
  thispath: state => state.user.thispath,
  addRoutes: state => state.permission.addRoutes,
}
export default getters

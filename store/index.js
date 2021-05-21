import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  error: null,
})
export const mutations = {

}

export const actions = {
  async nuxtServerInit({ dispatch, }) {
    try {
      const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
      const cookies = Cookie.parse(cookieStr || '') || {};
      const token = cookies['jwt-token'];

      if (isJWT(token)) {
        try {

          let request = await dispatch('user/autoLogin');

        } catch (e) {
          console.log(e);
        }
      }

    } catch (e) {
      throw e
    }
  },
}

function isJWT(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expiers = jwtData.exp || 0
  return Math.floor(new Date().getTime() / 1000) < expiers

}

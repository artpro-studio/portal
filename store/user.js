import Cookie from "cookie";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const state = () => ({
  token: null,
  user: null,
  errorUser: null,
  language: 1,
});

export const mutations = {
  setUserState(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setErrorUser(state, error) {
    if (error == false) {
      state.errorUser = true;
    } else {
      state.errorUser = false;
    }
  },
  clearToken(state) {
    state.token = null;
    state.user = null;
  },
  languageState(state, id){
    state.language = id;
  }
};

export const actions = {
  async login({ state, dispatch, commit }, formData) {
    //Входи в личный кабинет
    try {
      const request = await this.$axios.$post(process.env.baseUrl + '/v1/auth/token', formData)

      await dispatch("setErrorUser", request.status);
      let auth = state.errorUser;

      if (!auth) {
        await dispatch("setToken", request.token);
        await commit("setUserState", request.user);
        return { status: true, user: request.user };
      }


      return { status: false, };
    } catch (e) {
      throw e;
      return { status: false, };
    }
  },
  async autoLogin({ dispatch }) {
    //Авто авторизация
    try {
      const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
      const cookies = Cookie.parse(cookieStr || "") || {};
      const token = cookies["jwt-token"];
      if (isJWT(token)) {
        dispatch("setToken", token);
        let request = await dispatch("setUser", token);
        await dispatch("setErrorUser", request.status);
        if (request.status == true) {
          return request
        }
      } else {
        //dispatch("logout");
      }
    } catch (e) {
      //dispatch("logout");
      throw e;
    }
  },
  async setErrorUser({ commit }, error) {
    await commit("setErrorUser", error);
  },
  setToken({ commit }, token) {
    commit("setToken", token);
    Cookies.set("jwt-token", token);
  },
  async setUser({ dispatch }) {
    //Получение данных пользователя
    try {
      const user = await this.$axios.$get(process.env.baseUrl + "/v1/auth/token");
      if (user.status == true) {
        dispatch("setUserToken", user["user"]);
        //dispatch("setCountPush", user["push_count"]);
        return { status: true, user: user };
      } else {
        throw 'myException';
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  logout({ commit }) {
    //Разлогирование
    this.$axios.setToken(false);
    commit("clearToken");
    Cookies.remove("jwt-token");
  },
  setUserToken({ commit }, user) {
    commit("setUserState", user);
  },
  setLanguage({ commit },typeLanguage){
    commit("languageState", typeLanguage);
  }
};

export const getters = {
  isAdmin: state => {
    if(!state.user){
      return false;
    }
    if(state.user.Role.code == 'admin'){
      return true
    }

    return false
  },
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
};

function isJWT(token) {
  if (!token) {
    return false;
  }
  const jwtData = jwtDecode(token) || {};
  const expiers = jwtData.exp || 0;

  return new Date().getTime() / 1000 < expiers;
}

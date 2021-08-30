export const onLogin = (data) => {
  return {
    type: "ON_LOGIN",
    payload: data,
  };
};

export const onLogout = () => {
  return {
    type: "ON_LOGOUT",
  };
};

export const onUpdateUser = (data) => {
  return {
    type: "ON_UPDATE_USER",
    payload: data,
  };
};

export const onLoading = (data) => {
  return {
    type: "ON_LOADING",
    payload: data,
  };
};

export const onSetRecipes = (recipes) => {
  return {
    type: "ON_SET_RECIPES",
    payload: recipes,
  };
};

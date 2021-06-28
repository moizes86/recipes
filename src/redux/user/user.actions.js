
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
  return{
    type: 'ON_UPDATE_USER',
    payload: data
  }
}
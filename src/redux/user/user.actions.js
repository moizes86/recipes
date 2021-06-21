export const onSetUser = data => {
  return {
    type: "ON_SET_USER",
    payload: data
  };
};

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
  console.log(data)
  return{
    type: 'ON_UPDATE_USER',
    payload: data
  }
}
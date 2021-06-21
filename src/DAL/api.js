const DAL = {
  setUser({email, username, password, recipeCategories}) {
    const existingUsers = DAL.getUsers();

    if (existingUsers[email]) {
      return false;
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify({
          ...existingUsers,
          [email]: { email, username, password, recipeCategories },
        })
      );
      return this.getUsers()[email];
    }
  },

  userExists({email, password}) {

    const usersFromStorage = JSON.parse(localStorage.getItem("users")) || false;
    if (!usersFromStorage[email]) {
      return { res: false, errorMessage: "User does not exists" };
    } else if (usersFromStorage[email].password !== password) {
      return { res: false, errorMessage: "Password does not match" };
    } else {
      return { res: usersFromStorage[email] };
    }
  },

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || {};
  },

  updateUser({email, username, password, recipeCategories}){
  }

  // login({ email, password }) {
  //   const userInStorage = this.userExists(email);

  //   if (!userInStorage) {
  //     return "User does not exists";
  //   } else if (userInStorage && userInStorage.password !== password) {
  //     return "Password does not match";
  //   } else return "success";
  // },
};

export default DAL;

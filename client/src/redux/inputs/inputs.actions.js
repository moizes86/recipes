export const onInputChange = (data) => {
  return {
    type: "ON_INPUT_CHANGE",
    payload: data,
  };
};

export const onValidateInput = (data) => {
  return {
    type: "ON_VALIDATE_INPUT",
    payload: data,
  };
};

export const onSelectRecipeCategory = (data) => {
  return {
    type: "ON_SELECT_RECIPE_CATEGORY",
    payload: data,
  };
};

export default (error = "", action) => {
  switch (action.type) {
    case "RESET":
      return "";
    case "NULL_FIELD":
      return "Ensure that you fill in every form";
    case "INVALID_USERNAME":
      return "That username is not recognized";
    case "INVALID_PASSWORD":
      return "You have entered an incorrect password";
    case "PASSWORDS_NOT_MATCHING":
      return "Your passwords do not match ";
    default:
      return error;
  }
};

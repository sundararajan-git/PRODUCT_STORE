const useJwtToken = () => {
  const setJwtToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const getJwtToken = () => {
    return localStorage.getItem("token") ?? "";
  };

  const removeJwtToken = () => {
    localStorage.removeItem("token");
  };

  return { setJwtToken, getJwtToken, removeJwtToken };
};

export default useJwtToken;

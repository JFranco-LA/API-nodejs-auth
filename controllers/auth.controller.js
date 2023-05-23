export const register = (req, res) => {
  console.log(req.body);
  res.json({
    message: "application registration",
  });
};

export const login = (req, res) => {
  res.json({
    message: "Login successful",
  });
};

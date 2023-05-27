import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    //jwt

    return res.status(201).json({ ok: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "User already exists" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "User not exists" });

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword)
      return res.status(403).json({ error: "Password incorrect" });

    //generate token
    const { token, expiresIn } = generateToken(user.id);

    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("Token does not exist");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

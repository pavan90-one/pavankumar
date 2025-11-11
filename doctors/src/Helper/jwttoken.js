const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Utilities/jwt');
exports.createTokensForUser = (user) => {
  // include tokenVersion so we can revoke refresh tokens by bumping tokenVersion in DB
  const payload = { userId: user._id, role: user.doctorRole };
   const access = signAccessToken(payload);
  const refresh = signRefreshToken({ ...payload, tokenVersion: user.tokenVersion });
  return { access, refresh };
};
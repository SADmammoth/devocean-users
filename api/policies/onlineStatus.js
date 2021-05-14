module.exports = async function (req, res, proceed) {
  if (req.headers.authorization) {
    const { teammateId } = sails.helpers.jwt.verify(
      req.headers.authorization.replace('Bearer ', ''),
    );

    const user = await User.updateOne(
      { teammateId },
      { lastRequest: Date.now() },
    );
  }

  return proceed();
};

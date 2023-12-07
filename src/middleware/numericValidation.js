const validateNumeric = (req, res, next) => {
  const numeric = ["parameter1", "parameter2"];
  for (const param of numeric) {
    if (req.query[param] && isNaN(Number(req.query[param]))) {
      return res
        .status(400)
        .json({ error: `invaid for ${param} must be numeric` });
    }
  }
  next();
};
export default validateNumeric;

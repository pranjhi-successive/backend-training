const logger = (req, res, next) => {
  const timeStamp = new Date();
  console.log(`${timeStamp} ${req.method} ${req.url}`);
  next();
};

export default logger;

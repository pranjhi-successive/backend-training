
const addCustomHeader = (headerName, headerValue) => {
    return (req, res, next) => {
      console.log(res.header(headerName, headerValue));
      
      next();
    };
  };
  export default addCustomHeader;
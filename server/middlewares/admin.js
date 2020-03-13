export async function hasAdminRole(req, res, next) {
  const { Admin } = req.context.models;
  const { token } = req.body;
  const [ email, password ] = token.split('|');
  
  const admin = await Admin.findByLogin(email, password);
  if (admin) {
    req.context.me = admin;
    next();
  } else {
    return res.send({
      status: 'error',
      errorMessage: 'lack of admin privillege'
    });
  } 
}

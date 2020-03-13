import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res) => {
  const { Admin } = req.context.models;
  const { email, password } = req.body;
  const admin = await Admin.findByLogin(email, password);  
  if (admin) {
    const token = admin.email+'|'+admin.password;
    return res.send({
      status: 'success',
      data: admin,
      token
    });
  } else {
    return res.send({
      status: 'failure'
    });
  }  
});

export default router;

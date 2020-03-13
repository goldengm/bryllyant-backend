import { Router } from 'express';
import { hasAdminRole } from '../middlewares/admin';

const router = Router();

// get users
router.get('/', async (req, res) => {
  const { User } = req.context.models;
  const users = await User.findAll();
  res.send({ users });
});

// create new user [POST]/user
router.post('/', hasAdminRole, async (req, res) => {
  const { data } = req.body;
  const { User } = req.context.models;
  const newUser = await User.create(
    data
  ).catch(function (err) {
    res.send({
      status: 'error',
      errorMessage: 'error when creating User.'
    })
  });
  res.send({
    status: 'success',
    newUser
  });
});

// drop user [DELETE]/user
router.post('/delete', hasAdminRole, async (req, res) => {
  const { User } = req.context.models;
  const { userId } = req.body;
  const user = await User.findByPk(userId)
  user.destroy();
  res.send({
    status: 'success'
  });
})

export default router;

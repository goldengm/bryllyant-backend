import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { status } from '../handlers/status';
import { errors } from '../handlers';
import models, { sequelize } from '../models';
import adminRoutes from './admin';
import userRoutes from './user';
import pollRoutes from './poll';

const router = new Router();

router.use(
  cors({ origin: true }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res, next) => {
    req.context = {
      models,
    };
    next();
  }
);

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/poll', pollRoutes);

// error handling
router.use(
  errors.notFound,
  errors.format,
  errors.handler,
);

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createTestData();
  }
});

const createTestData = async () => {
  let me = await models.Admin.create(
    {
      email: 'admin@mail.com',
      password: 'asdasd'
    }
  );

  // test
  let pollContent = await models.PollContent.create(
    {
      title: 'Test Question',
      questions: [
        {
          "questionSentence": "1st question"
        },
        {
          "questionSentence": "2nd question"
        }
      ]
    }, {
      include: { model: models.PollQuestion, as: 'questions' }
    }
  )
  pollContent.setMadeBy(me);

  let pollContent2 = await models.PollContent.create(
    {
      title: 'Simple Test Question',
      questions: [
        {
          "questionSentence": "Do you know node JS?"
        },
        {
          "questionSentence": "Are you expert of React?"
        }
      ]
    }, {
      include: { model: models.PollQuestion, as: 'questions' }
    }
  )
  pollContent2.setMadeBy(me);

  let user = await models.User.create(
    {
      email: 'user@mail.com',
      password: 'asdasd',
      firstName: 'firstName',
      lastName: 'lastName'
    }
  )

  let user2 = await models.User.create(
    {
      email: 'user2@mail.com',
      password: 'asdasd',
      firstName: 'firstName2',
      lastName: 'lastName2'
    }
  )

  let poll = await models.Poll.create(
    {
      title: pollContent.title,
      status: 'yet'
    }
  )
  poll.setSentTo(user);
  for (let question of pollContent.questions) {
    let answer = await models.PollAnswer.create(
      {
        answer: '',
        questionSentence: question.questionSentence
      }
    );
    answer.setPoll(poll);
  }
}

export default router;

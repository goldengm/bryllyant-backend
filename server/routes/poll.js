import { Router } from 'express';
import { hasAdminRole } from '../middlewares/admin';
// import { hasUserRole } from '../middlewares/user';

const router = Router();

// get polls(including not sent pollContents), group by same title
router.get('/', async (req, res) => {
  const { PollContent, PollQuestion, PollAnswer, Poll, User } = req.context.models;
  const pollContents = await PollContent.findAll({
    include: { model: PollQuestion, as: 'questions' }
  });
  const allUsers = await User.findAll();
  let polls2 = [];
  for (let pollContent of pollContents) {
    let byUsers = [];
    for (let user of allUsers) {
      let poll = await Poll.findOne({
        where: {
          title: pollContent.title,
          userId: user.id
        },
        include: [
          { model: PollAnswer, as: 'answers' },
          { model: User, as: 'sentTo' }
        ]
      })
      let answers = null;
      if (poll) {
        answers = poll.answers;
      }
      byUsers.push({
        answers,
        user        
      });
    }
    
    polls2.push({
      pollContent,
      byUsers
    });
  }
  res.send({
    polls: polls2
  })
})

// post poll
router.post('/content', hasAdminRole, async (req, res) => {
  const { PollContent, PollQuestion } = req.context.models;
  const { data } = req.body;
  const pollContent = await PollContent.create(
    {
      title: data.title,
      questions: data.questions
    }, {
      include: { model: PollQuestion, as: 'questions' }
    }
  ).catch((err) => {
    res.send({
      status: 'error',
      errorMessage: 'something error creating poll content'
    })
  })
  pollContent.setMadeBy(req.context.me);
  res.send({
    status: 'success'
  })
});

// delete poll
router.post('/delete-content', hasAdminRole, async (req, res) => {
  const { PollContent, PollQuestion } = req.context.models;
  const { pollContentId } = req.body;
  const pollContent = await PollContent.findByPk(pollContentId);
  pollContent.destroy();
  res.send({
    status: 'success'
  });
});

// send poll to users
router.post('/send', hasAdminRole, async (req, res) => {
  const { PollContent, PollQuestion, Poll, PollAnswer, User } = req.context.models;
  const { pollContentId, userIds } = req.body.data;
  const pollContent = await PollContent.findByPk(pollContentId, 
    { 
      include: { 
        model: PollQuestion, 
        as: 'questions'
      }
    }
  );
  let pollTokens = [];
  for (let userId of userIds) {
    let user = await User.findByPk(userId);
    let poll = await Poll.create(
      {
        title: pollContent.title,
        status: 'yet'
      }
    )
    poll.setSentTo(user);
    for (let question of pollContent.questions) {
      let answer = await PollAnswer.create(
        {
          answer: '',
          questionSentence: question.questionSentence
        }
      );
      answer.setPoll(poll);
    }
    pollTokens.push('pollToken-'+poll.id);
  }

  res.send({
    status: 'success',
    pollTokens
  })
})

// check token and get poll info from that
router.post('/check-polltoken', async (req, res) => {
  const { Poll,PollAnswer } = req.context.models;
  const { pollToken } = req.body;
  const pollId = pollToken.replace('pollToken-','');
  const poll = await Poll.findByPk(pollId, {
    include: {model: PollAnswer, as: 'answers'}
  });
  const user = await poll.getSentTo();
  const token = user.email+'|'+user.password; // it's user token, not poll token
  
  res.send({
    token,
    poll
  })
})

// save answer from one question from one poll
router.post('/answer', async (req, res) => {
  const { PollAnswer, Poll } = req.context.models;
  const { pollAnswerId, answer } = req.body;
  let pollAnswer = await PollAnswer.findByPk(pollAnswerId);
  pollAnswer.answer = answer;
  await pollAnswer.save();
  let poll = await Poll.findByPk(pollAnswer.pollId,
    {
      include: { model: PollAnswer, as: 'answers' }
    }
  );
  poll.status = 'progressing';  
  await poll.save();
  let isCompletable = true;
  for (let answer of poll.answers) {
    if (answer.answer=='') isCompletable = false;
  }
  res.send({
    status: 'success',
    poll,
    isCompletable
  })
})

// complete poll
router.post('/complete', async (req, res) => {
  const { Poll } = req.context.models;
  const { pollId } = req.body;
  let poll = await Poll.findByPk(pollId);
  poll.status = 'completed';
  await poll.save();
  res.send({
    status: 'success'
  })
})

export default router;

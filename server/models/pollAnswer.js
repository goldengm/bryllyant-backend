const pollAnswer = (sequelize, DataTypes) => {
  const PollAnswer = sequelize.define('pollAnswer', {
    questionSentence: DataTypes.STRING,
    answer: DataTypes.STRING
  });

  PollAnswer.associate = models => {
    PollAnswer.belongsTo(models.Poll, { as: 'poll', foreignKey: 'pollId' });
  };

  return PollAnswer;
};

export default pollAnswer;

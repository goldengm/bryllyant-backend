const pollQuestion = (sequelize, DataTypes) => {
  const PollQuestion = sequelize.define('pollQuestion', {    
    questionSentence: DataTypes.STRING
  });

  PollQuestion.associate = models => {
    PollQuestion.belongsTo(models.PollContent, { onDelete: 'CASCADE' });    
  };

  return PollQuestion;
};

export default pollQuestion;

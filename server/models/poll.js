const poll = (sequelize, DataTypes) => {
  const Poll = sequelize.define('poll', {
    title: DataTypes.STRING,
    status: DataTypes.STRING
  });
  // status - 'yet', 'progressing', 'completed'

  Poll.associate = models => {
    Poll.belongsTo(models.User, { as: 'sentTo', foreignKey: 'userId' });
    Poll.hasMany(models.PollAnswer, { onDelete: 'CASCADE', as: 'answers' });
  };

  return Poll;
};

export default poll;

const pollContent = (sequelize, DataTypes) => {
  const PollContent = sequelize.define('pollContent', {    
    title: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  PollContent.associate = models => {
    PollContent.belongsTo(models.Admin, { as: 'madeBy', foreignKey: 'adminId' });
    PollContent.hasMany(models.PollQuestion, { onDelete: 'CASCADE',  as: 'questions' });    
  };

  return PollContent;
};

export default pollContent;

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = models => {
    User.belongsTo(models.Admin);
    User.hasMany(models.Poll, { onDelete: 'CASCADE', as: 'polls' });
  }

  User.findByLogin = async (email, password) => {
    let user = await User.findOne({
      where: { email, password }
    });

    return user;
  };

  return User;
};

export default user;

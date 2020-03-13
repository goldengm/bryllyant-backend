const admin = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING
  });

  Admin.associate = models => {
    Admin.hasMany(models.User, { onDelete: 'CASCADE' });
    Admin.hasMany(models.PollContent, { foreignKey: 'adminId', as: 'pollContents', onDelete: 'CASCADE' });
  };

  Admin.findByLogin = async (email, password) => {
    let admin = await Admin.findOne({
      where: { email, password },
    });

    return admin;
  };

  return Admin;
};

export default admin;

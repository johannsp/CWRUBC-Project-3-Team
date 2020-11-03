module.exports = function(sequelize, DataTypes) {
  const Topic = sequelize.define("Topic", {
    title: DataTypes.STRING,
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Topic.associate = function(models) {
    // A Topic should belong to a Lesson
    Topic.belongsTo(models.Lesson, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Topic;
};

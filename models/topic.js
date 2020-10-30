module.exports = function(sequelize, DataTypes) {
  const Topic = sequelize.define("Topic", {
    title: DataTypes.STRING,
    time: DataTypes.TIME,
    textarea: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Topic.associate = function(models) {
    // A Topic should belong to a Lesson
    // There are not firm foreign key constraints since multiple join points are possible
    Topic.belongsTo(models.Lesson, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Topic;
};
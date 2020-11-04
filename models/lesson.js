module.exports = function(sequelize, DataTypes) {
  const Lesson = sequelize.define("Lesson", {
    title: DataTypes.STRING,
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Lesson.associate = function(models) {
    // Associating Lesson with
    // When a Lesson is deleted, also delete any associated Links
    Lesson.hasMany(models.Topic, {
      onDelete: "cascade"
    });
  };

  return Lesson;
};

module.exports = function(sequelize, DataTypes) {
  const Lesson = sequelize.define("Lesson", {
    title: DataTypes.STRING,
    time: DataTypes.TIME,
  });

  Lesson.associate = function(models) {
    // Associating Lesson with
    // When an Album is deleted, also delete any associated Links
    Lesson.hasMany(models.Topic, {
      onDelete: "cascade"
    });
  };

  return Lesson;
};

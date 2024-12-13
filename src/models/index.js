const User = require('./User');
const Role = require('./Role');
const Course = require('./Course');
const Lesson = require('./Lesson');
const CourseOrder = require('./CourseOrder');

// Role
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Lesson
Course.hasMany(Lesson, {foreignKey: 'courseId'});
Lesson.belongsTo(Course, {foreignKey: 'courseId'});

// Course Order
Course.hasMany(CourseOrder, {foreignKey: 'courseId'});
CourseOrder.belongsTo(Course, {foreignKey: 'courseId'});

User.hasMany(CourseOrder, {foreignKey: 'userId'});
CourseOrder.belongsTo(User, {foreignKey: 'userId'});

module.exports = {User, Role, Course, Lesson, CourseOrder};
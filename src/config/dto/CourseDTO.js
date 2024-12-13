class CourseDTO {
    constructor (course)
    {
        this.name = course.name,
        this.description = course.description,
        this.price = course.price,
        this.discount = course.discount
        this.is_free = course.is_free
    }
}

module.exports = CourseDTO;
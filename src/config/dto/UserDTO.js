class UserDTO {
    constructor(user)
    {
        this.id = user.id,
        this.username = user.username
        this.role = user.roleId
    }
}

module.exports = UserDTO;
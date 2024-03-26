import { mockUsers } from "../constants.js"

export const resolveFindUserIndex = (request, response, next) => {
    const { params: { id } } = request
    const paramsID = parseInt(id)

    if (isNaN(paramsID)) return response.sendStatus(400)
    
    const findUserIndex = mockUsers.findIndex((user) => user.id === paramsID)
    if (findUserIndex === -1) return response.sendStatus(404)
    
    request.findUserIndex = findUserIndex
    next();
}
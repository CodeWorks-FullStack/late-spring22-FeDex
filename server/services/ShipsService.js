import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ShipsService {
  async getAll(query = {}) {
    return await dbContext.Ships.find(query)
  }

  async getById(id) {
    const ship = await dbContext.Ships.findById(id)
    if (!ship) {
      throw new BadRequest('Invalid Hull Id')
    }
    return ship
  }

  async create(body) {
    return await dbContext.Ships.create(body)
  }

  async remove(shipId, userId) {
    const ship = await this.getById(shipId)
    if (ship.creatorId.toString() !== userId) {
      throw new Forbidden('You lack the proper documents to complete this action')
    }
    ship.remove()
  }
}
export const shipsService = new ShipsService()

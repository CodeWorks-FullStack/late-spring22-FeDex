import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

// TODO Write the Service
class PackagesService {
  async getAll(query = {}) {
    // only get packages by default that are not delivered,
    // if the user passed the query delivered=true, then show them
    // query.delivered = query.delivered || false;
    const packages = await dbContext.Packages.find(query)
    return packages
  }

  async getById(id) {
    const foundPackage = await dbContext.Packages.findById(id)
    if (!foundPackage) {
      throw new BadRequest('Invalid package ID your manager has been notified....next time paws and think about your actions')
    }
    return foundPackage
  }

  async create(body) {
    const newPackage = await dbContext.Packages.create(body)
    await newPackage.populate('creator', 'name picture')
    return newPackage
  }

  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('not your package')
    }
    if (original.delivered) {
      throw new BadRequest('this package has already been delivered')
    }
    original.name = update.name || original.name
    original.address = update.address || original.address
    original.shipId = update.shipId === undefined ? original.shipId : update.shipId

    await original.save()
    return original
  }

  async deliver(id) {
    const original = await this.getById(id)
    original.delivered = true
    original.shipId = null
    await original.save()
    return original
  }
}
export const packagesService = new PackagesService()

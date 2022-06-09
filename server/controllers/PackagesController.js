import { Auth0Provider } from '@bcwdev/auth0provider'
import { packagesService } from '../services/PackagesService.js'
import BaseController from '../utils/BaseController'

// TODO Write the Controller
export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.flagDelivered)
  }

  async getAll(req, res, next) {
    try {
      // get all by ship id?
      if (req.query.shipId === 'null') {
        req.query.shipId = null
      }
      const packages = await packagesService.getAll(req.query)
      return res.send(packages)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const foundPackage = await packagesService.getById(req.params.id)
      return res.send(foundPackage)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NEVER TRUST THE USER TO TELL WHO THEY ARE
      req.body.creatorId = req.userInfo.id
      const newPackage = await packagesService.create(req.body)
      return res.send(newPackage)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NEVER trust the user
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await packagesService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async flagDelivered(req, res, next) {
    try {
      const packageDelivered = await packagesService.deliver(req.params.id)
      return res.send(packageDelivered)
    } catch (error) {
      next(error)
    }
  }
}

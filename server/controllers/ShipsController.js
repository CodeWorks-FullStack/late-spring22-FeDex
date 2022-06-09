import { Auth0Provider } from '@bcwdev/auth0provider'
import Cat from 'catid'
import { packagesService } from '../services/PackagesService.js'
import { shipsService } from '../services/ShipsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ShipsController extends BaseController {
  constructor() {
    super('api/ships')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/packages', this.getPackagesByShipId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const ships = await shipsService.getAll(query)
      return res.send(ships)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const ship = await shipsService.getById(req.params.id)
      return res.send(ship)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async getPackagesByShipId(req, res, next) {
    try {
      const packages = await packagesService.getAll({ shipId: req.params.id })
      return res.send(packages)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.captain = Cat.getName()
      const ship = await shipsService.create(req.body)
      res.send(ship)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const shipId = req.params.id
      const userId = req.userInfo.id
      await shipsService.remove(shipId, userId)
      return res.send('That ship has been decommissioned')
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }
}

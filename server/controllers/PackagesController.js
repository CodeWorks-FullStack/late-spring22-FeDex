import BaseController from '../utils/BaseController'

// TODO Write the Controller
export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .post('', this.create)
  }

  async create(req, res, next) {
    throw new Error('Method not implemented.')
  }
}

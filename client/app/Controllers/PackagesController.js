import { ProxyState } from '../AppState.js'
import { packagesService } from '../Services/PackagesService.js'
import { logger } from '../Utils/Logger.js'

function _drawPackages() {
  const packages = ProxyState.packages
  let template = ''
  packages.forEach(p => template += p.Template)
  document.getElementById('packages').innerHTML = template
}

export class PackagesController {
  constructor() {
    ProxyState.on('packages', _drawPackages)
  }

  async getAllUnassignedPackages() {
    try {
      await packagesService.getAllUnassignedPackages()
      bootstrap.Offcanvas.getOrCreateInstance('#ships-list').hide()
    } catch (error) {
      logger.error(error)
    }
  }

  async assign(shipId, packageId) {
    try {
      await packagesService.assign(shipId, packageId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deliver(packageId) {
    try {
      await packagesService.deliver(packageId)
    } catch (error) {
      logger.error(error)
    }
  }
}

import { ProxyState } from '../AppState.js'
import { Package } from '../Models/Package.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PackagesService {
  async getAllPackages(shipId) {
    // const res = await api.get('api/packages', { params: { shipId } })
    // const res = await api.get('api/packages?shipId=' + shipId)
    const res = await api.get(`api/ships/${shipId}/packages`)
    logger.log('[GetAllPackages]: ', res.data)
    ProxyState.packages = res.data.map(p => new Package(p))
  }

  async getAllUnassignedPackages() {
    const res = await api.get('api/packages?shipId=null')
    ProxyState.packages = res.data.map(p => new Package(p))
    ProxyState.activeShip = null
  }

  async assign(shipId, packageId) {
    const res = await api.put('api/packages/' + packageId, { shipId })
    // modify proxystate || refetch data
    ProxyState.packages = ProxyState.packages.filter(p => p.id !== packageId)
  }

  async deliver(packageId) {
    await api.delete('api/packages/' + packageId)
    ProxyState.packages = ProxyState.packages.filter(p => p.id !== packageId)
  }
}

export const packagesService = new PackagesService()

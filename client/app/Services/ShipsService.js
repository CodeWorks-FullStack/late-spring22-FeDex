import { ProxyState } from '../AppState.js'
import { Ship } from '../Models/Ship.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class ShipsService {
  async getAll() {
    const res = await api.get('api/ships')
    logger.log('[Ships]', res.data)
    const ships = res.data.map(s => new Ship(s))
    ProxyState.ships = ships
  }

  setActive(id) {
    const found = ProxyState.ships.find(s => s.id === id)
    if (!found) {
      throw new Error('Invalid Ship Id')
    }
    ProxyState.activeShip = found
  }

  async createShip(newShip) {
    const res = await api.post('api/ships', newShip)
    const ship = new Ship(res.data)
    ProxyState.ships = [...ProxyState.ships, ship]
    ProxyState.activeShip = ship
  }
}

export const shipsService = new ShipsService()

import { ProxyState } from '../AppState.js'
import { getShipForm } from '../Forms/Ship.js'
import { shipsService } from '../Services/ShipsService.js'
import { logger } from '../Utils/Logger.js'

function _drawShips() {
  const shipElem = document.getElementById('ships')
  const ships = ProxyState.ships
  let template = ''
  ships.forEach(s => { template += s.ListTemplate })
  shipElem.innerHTML = template
}

function _drawActiveShip() {
  const ship = ProxyState.activeShip
  document.getElementById('ship-data').innerHTML = ship.DataTemplate
}

export class ShipsController {
  constructor() {
    ProxyState.on('ships', _drawShips)
    ProxyState.on('activeShip', _drawActiveShip)
    this.getShips()
  }

  async getShips() {
    try {
      await shipsService.getAll()
    } catch (error) {
      logger.error('[getShips]', error.message)
    }
  }

  setActive(id) {
    try {
      shipsService.setActive(id)
      bootstrap.Offcanvas.getOrCreateInstance('#ships-list').hide()
    } catch (error) {
      logger.error('[setActive]', error)
    }
  }

  openShipModal() {
    bootstrap.Offcanvas.getOrCreateInstance('#ships-list').hide()
    document.getElementById('modal-title-slot').innerText = 'New Ship'
    document.getElementById('modal-body-slot').innerHTML = getShipForm()
    bootstrap.Modal.getOrCreateInstance('#form-modal').show()
  }

  async createShip() {
    window.event.preventDefault()
    try {
      /** @type {HTMLFormElement} */
      // @ts-ignore
      const form = window.event.target
      const newShip = {
        name: form.shipName.value
      }
      await shipsService.createShip(newShip)
      form.reset()
    } catch (error) {
      logger.log('[createShip]', error.message)
    } finally {
      bootstrap.Modal.getOrCreateInstance('#form-modal').hide()
    }
  }
}

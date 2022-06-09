import { ProxyState } from '../AppState.js'

export class Package {
  constructor(data) {
    this.id = data.id
    this.address = data.address
    this.recipient = data.recipient
    this.delivered = data.delivered
    this.shipId = data.shipId
    /// creator and creatorId
  }

  get Template() {
    return `
    <div class="bg-light border border-secondary rounded elevation-1 m-2 p-3 d-flex justify-content-between">
      <p class="m-0 f-22">${this.recipient}</p>
      <p class="m-0 f-22">${this.address}</p>
      ${this.Button}
    </div>
    `
  }

  get Button() {
    if (this.delivered) {
      return '<p class="m-0 f-22">DELIVERED</p>'
    }
    if (this.shipId) {
      return `
      <button class="btn btn-info" onclick="app.packagesController.deliver('${this.id}')">Deliver</button>
      <button class="btn btn-info" onclick="app.packagesController.assign(null, '${this.id}')">Unassign</button>
      `
    }
    return `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Assign To
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        ${this.ShipButtons}
      </ul>
    </div>
    `
  }

  get ShipButtons() {
    let template = ''
    ProxyState.ships.forEach(s => {
      template += `<li><a class="dropdown-item" onclick="app.packagesController.assign('${s.id}', '${this.id}')">${s.name}</a></li>`
    })
    return template
  }
}

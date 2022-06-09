export class Ship {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.captain = data.captain
  }

  get ListTemplate() {
    return `<p class="p-1 selectable" onclick="app.shipsController.setActive('${this.id}')">${this.name}</p>`
  }

  get DataTemplate() {
    return `
    <h3>${this.name}</h3>
    <p><em>${this.captain}</em></p>`
  }
}

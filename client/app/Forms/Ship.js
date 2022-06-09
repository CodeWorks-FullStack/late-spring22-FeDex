export function getShipForm() {
  return /* html */`
  <form onsubmit="app.shipsController.createShip()">
    <div class="mb-3">
      <label for="shipName" class="form-label">Name</label>
      <input type="text" class="form-control" name="shipName" id="shipName" aria-describedby="helpId"
        placeholder="Name..." required>
      <small id="helpId" class="form-text text-muted">A clever name for your ship</small>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Save</button>
    </div>  
  </form>
  `
}

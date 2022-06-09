import { AuthController } from './Controllers/AuthController.js'
import { ShipsController } from './Controllers/ShipsController.js'

class App {
  authController = new AuthController()
  shipsController = new ShipsController()
}

// @ts-ignore
window.app = new App()

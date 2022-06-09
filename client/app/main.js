import { AuthController } from './Controllers/AuthController.js'
import { PackagesController } from './Controllers/PackagesController.js'
import { ShipsController } from './Controllers/ShipsController.js'

class App {
  authController = new AuthController()
  shipsController = new ShipsController()
  packagesController = new PackagesController()
}

// @ts-ignore
window.app = new App()

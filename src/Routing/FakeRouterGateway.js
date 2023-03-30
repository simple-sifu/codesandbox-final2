import { inject, injectable } from 'inversify'
import { Router } from './Router'

@injectable()
export class FakeRouterGateway {
  @inject(Router)
  router

  registerRoutes = async (routeConfig) => {
    console.log('fakeGateway.registerRoutes: routeId=', routeConfig.id)
    this.router.updateCurrentRoute(routeConfig.id)
  }

  unload = () => {}

  goToId = async (routeId) => {}
}

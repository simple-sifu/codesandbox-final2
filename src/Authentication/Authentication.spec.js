import { Types } from '../Core/Types'
import { AppTestHarness } from '../TestTools/AppTestHarness'
import { Router } from '../Routing/Router'
import { RouterRepository } from '../Routing/RouterRepository'
// import { LoginRegisterPresenter } from './LoginRegisterPresenter'
import { UserModel } from './UserModel'
// import { GetSuccessfulUserLoginStub } from '../TestTools/GetSuccessfulUserLoginStub'
// import { GetSuccessfulRegistrationStub } from '../TestTools/GetSuccessfulRegistrationStub'
// import { GetFailedRegistrationStub } from '../TestTools/GetFailedRegistrationStub'
// import { GetFailedUserLoginStub } from '../TestTools/GetFailedUserLoginStub'

let appTestHarness = null
// let loginRegisterPresenter = null
let router = null
let routerRepository = null
let routerGateway = null
// let dataGateway = null
// let userModel = null
let onRouteChange = null

describe('init', () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness()
    appTestHarness.init()
    router = appTestHarness.container.get(Router)
    routerRepository = appTestHarness.container.get(RouterRepository)
    routerGateway = appTestHarness.container.get(Types.IRouterGateway)
    // dataGateway = appTestHarness.container.get(Types.IDataGateway)
    // userModel = appTestHarness.container.get(UserModel)
    onRouteChange = () => {}
  })

  it('should be an null route', () => {
    expect(routerRepository.currentRoute.routeId).toBe(null)
  })

  describe('bootstrap', () => {
    beforeEach(() => {
      onRouteChange = () => {}
      appTestHarness.bootStrap(onRouteChange)
    })

    it('should start at null route', () => {
      expect(routerRepository.currentRoute.routeId).toBe(null)
    })

    describe('routing', () => {
      it('should block wildcard *(default) routes when not logged in', () => {
        router.goToId('default')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('loginLink')
      })

      it('should block secure routes when not logged in', () => {
        router.goToId('homeLink')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('loginLink')
      })

      it('should allow public route when not logged in', () => {
        router.goToId('authorPolicyLink')

        expect(routerGateway.goToId).toHaveBeenLastCalledWith('authorPolicyLink')
      })
    })

    // describe('register', () => {
    //   it.skip('should show successful user message on successful register', async () => {
    //     dataGateway.post = jest.fn().mockImplementation(() => {
    //       return Promise.resolve(GetSuccessfulRegistrationStub())
    //     })
    //     loginRegisterPresenter = appTestHarness.container.get(LoginRegisterPresenter)
    //     loginRegisterPresenter.email = 'a@b.com'
    //     loginRegisterPresenter.password = '123456'

    //     await loginRegisterPresenter.register()

    //     expect(loginRegisterPresenter.showValidationWarning).toBe(false)
    //     expect(loginRegisterPresenter.messages).toEqual(['User registered'])
    //   })

    //   it.skip('should show failed user message on failed register', async () => {
    //     dataGateway.post = jest.fn().mockImplementation(() => {
    //       return Promise.resolve(GetFailedRegistrationStub())
    //     })
    //     loginRegisterPresenter = appTestHarness.container.get(LoginRegisterPresenter)
    //     loginRegisterPresenter.email = 'a@b.com'
    //     loginRegisterPresenter.password = '123456'

    //     await loginRegisterPresenter.register()

    //     expect(loginRegisterPresenter.showValidationWarning).toBe(true)
    //     expect(loginRegisterPresenter.messages).toEqual([
    //       'Failed: credentials not valid must be (email and >3 chars on password).'
    //     ])
    //   })
    // })
    // describe('login', () => {
    //   it.skip('should start at loginLink', async () => {
    //     let routerRepository = appTestHarness.container.get(RouterRepository)
    //     console.log('routerRepository =', routerRepository)
    //     expect(routerRepository.currentRoute.routeId).toBe('loginLink')
    //   })

    //   it.skip('should go to homeLink on successful login (and populate userModel)', async () => {
    //     dataGateway.post = jest.fn().mockImplementation(() => {
    //       return Promise.resolve(GetSuccessfulUserLoginStub())
    //     })
    //     loginRegisterPresenter = appTestHarness.container.get(LoginRegisterPresenter)
    //     userModel = appTestHarness.container.get(UserModel)
    //     loginRegisterPresenter.email = 'a@b.com'
    //     loginRegisterPresenter.password = '123456'

    //     await loginRegisterPresenter.login()

    //     expect(loginRegisterPresenter.showValidationWarning).toBe(false)
    //     expect(loginRegisterPresenter.messages).toEqual([])
    //     expect(routerGateway.goToId).toHaveBeenLastCalledWith('homeLink')
    //     expect(userModel).toEqual({ email: 'a@b.com', token: 'a@b1234.com' })
    //   })

    //   it.skip('should update private route when successful login', async () => {
    //     dataGateway.post = jest.fn().mockImplementation(() => {
    //       return Promise.resolve(GetSuccessfulUserLoginStub())
    //     })

    //     loginRegisterPresenter = appTestHarness.container.get(LoginRegisterPresenter)
    //     userModel = appTestHarness.container.get(UserModel)
    //     loginRegisterPresenter.email = 'a@b.com'
    //     loginRegisterPresenter.password = '123456'

    //     await loginRegisterPresenter.login()

    //     expect(loginRegisterPresenter.showValidationWarning).toBe(false)
    //     expect(loginRegisterPresenter.messages).toEqual([])
    //     expect(routerGateway.goToId).toHaveBeenLastCalledWith('homeLink')
    //     expect(userModel).toEqual({ email: 'a@b.com', token: 'a@b1234.com' })
    //   })

    //   it.skip('should not update route when failed login', async () => {})

    //   it.skip('should show failed user message on failed login', async () => {})

    //   it.skip('should clear messages on route change', async () => {})

    //   it.skip('should logout', async () => {})
    // })
  })
})

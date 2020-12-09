import { of } from 'rxjs'

export class TestMockService {

  Login(param) {
    return of({statusCode:200});
  }
}

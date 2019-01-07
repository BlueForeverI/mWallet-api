export class LoggedUserViewModel {
  constructor(public token: string,
              public firstName: string,
              public lastName: string,
              public income: number) {
    
  }
}
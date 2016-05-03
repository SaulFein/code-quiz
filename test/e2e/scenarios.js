describe('code quiz homepage', function() {
  var username = element(by.model('user.username'))
  var password = element(by.model('user.password'))
  var signup = element(by.buttonText('SignUp'))

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/#/home')
  })

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Code Quiz')
  })

  // it('should have a default name', function() {
  //   expect(firstName.getAttribute('value')).toEqual('Peggy')
  //   expect(lastName.getAttribute('value')).toEqual('Hill')
  //   expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Peggy Hill')
  // })
  //
  it('new user can signup', function() {
    username.clear()
    username.sendKeys('E2EtestUser')
    password.clear()
    password.sendKeys('12345')
    signup.click()
    // expect(true).toEqual(false)
    expect(username.getAttribute('value')).toEqual('E2EtestUser')
    expect(password.getAttribute('value')).toEqual('12345')
    // expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Bobby UstaHill')
  })

})

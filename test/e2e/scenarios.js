describe('code quiz homepage', function() {
  var username = element(by.model('user.username'))
  var password = element(by.model('user.password'))
  var signup = element(by.buttonText('SignUp'))

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/')
  })

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Code Quiz')
  })

  it('new user can signup', function() {
    username.clear()
    username.sendKeys('E2EtestUser')
    password.clear()
    password.sendKeys('12345')
    signup.click()
    expect(username.getAttribute('value')).toEqual('E2EtestUser')
    expect(password.getAttribute('value')).toEqual('12345')
  })
})

describe('code quiz', function() {
  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/#/category')
    element(by.cssContainingText('.cat-choices', 'JavaScript')).click()
    element(by.cssContainingText('.dif-choices', 'Easy')).click()
  })

  it('should start a new quiz', function(){
    expect(element(by.id('game-title')).getText()).toEqual('Question:')
  })

  it('should show results page', function(){
    element(by.id('results-link')).click()
    expect(element(by.id('results-title')).getText()).toEqual('Results')
  })

  it('should send user back to login page', function(){
    element(by.id('logout')).click()
    expect(element(by.id('signup-link')).getText()).toEqual('Don\'t have an account yet? Sign Up here!')
  })
})

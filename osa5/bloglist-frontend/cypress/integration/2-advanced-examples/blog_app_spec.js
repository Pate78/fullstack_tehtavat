describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Pate',
      username: 'pate',
      password: 'salakala'
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('Käyttäjätunnus')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('pate')
    cy.get('#password').type('väärä')
    cy.get('#login-button').click()
    // cy.get('.error').contains('wrong credentials')
    cy.contains('Käyttäjätunnus')
  })

  it('login form is shown and login is functional', function() {
    cy.contains('log in').click()
    cy.get('#username').type('pate')
    cy.get('#password').type('salakala')
    cy.get('#login-button').click()

    cy.contains('Logged in as pate')
  })

  // afterEach(function() {
  //   cy.get('Logout').click()
  // })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pate', password: 'salakala' })
      cy.contains('New blog').click()
      cy.createBlog({ title: 'Hyvä blogi', author: 'pate', url: 'www.url.com', likes: '2' })
    })

    it('a new blog can be created', function() {
      cy.contains('Logged in as pate')

      cy.contains('New blog').click()
      cy.get('#title').type('A blog created with cypress')
      cy.get('#author').type('Cypress blogger')
      cy.get('#url').type('www.cypress.fi')
      cy.contains('Lisää blogi!').click()
      cy.contains('A blog created with cypress')
    })

    // describe('and blog exists', function() {
    //   beforeEach(function() {
    //     cy.createBlog({
    //       title: 'Taas uusi blogi',
    //       author: 'Pate',
    //       url: 'www.blogi.fi'
    //     })
    //   })
    // })
    it('like button works', function() {
      cy.contains('Näytä kaikki tiedot').click()
      cy.contains('.likeButton').click()
      cy.contains('likes: 3')
    })

    it('logged person can remove blog', function() {
      cy.contains('remove').click()
    })
  })

})



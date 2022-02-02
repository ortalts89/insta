// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('example to-do app', () => {
    beforeEach(() => {
        // Seed database with test data
        cy.task('db:seed')
    
        // Login test user
        cy.database('find', 'users').then((user) => {
          cy.login(user.username, 's3cret', true)
        })
      })
})

/* ==== Test Created with Cypress Studio ==== */
it('failed login', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:4000');
  cy.get('#username').clear();
  cy.get('#username').type('niko');
  cy.get('#standard-adornment-password').clear();
  cy.get('#standard-adornment-password').type('12345');
  cy.get('.MuiButton-root').click();
  cy.get('path').click();
  cy.get('path').click();
  /* ==== End Cypress Studio ==== */
});
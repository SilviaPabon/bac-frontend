/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

// Login as an admin and check the navbar options
beforeEach(() => {
	cy.visit('http://127.0.0.1:5173/login');
	cy.get('input[name="mail"]').should('exist');
	cy.get('input[name="password"]').should('exist');

	cy.get('input[name="mail"]').type('pedro.chaparro@gmail.com');
	cy.get('input[name="password"]').type('Upbbga2023*/');
	cy.get('input[type="submit"]').click();
  cy.get('button[aria-label="close"]').click();


	cy.url().should('include', '/view-residents');
	cy.get('a[href="/admin/register-staff"]').should('exist');
	cy.get('a[href="/view-residents"]').should('exist');
	cy.get('a[href="/logout"]').should('exist');
});

// Logout
afterEach(() => {
  cy.get('a[href="/logout"]').click();
  cy.url().should('include', '/login');
})

// --- Register resident ---
describe('Admin tests', () => {
  it('Should be able to register a staff member', () => {
    // Click the /admin/register-staff link
    cy.get('a[href="/admin/register-staff"]').click();

    // Check there are all the inputs
    cy.get('input[name="identification_card"]').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="mail"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="role"]').should('exist');

    // Fill the inputs
    cy.get('input[name="identification_card"]').type(
      faker.datatype
        .bigInt({
          min: 1000000000,
          max: 2000000000,
        })
        .toString(),
    );

    cy.get('input[name="name"]').type(faker.name.fullName());
    cy.get('input[name="mail"]').type(faker.internet.email());
    cy.get('input[name="password"]').type(faker.internet.password());
    cy.get('input[name="role"]').type('Watchman');

    // Click on the register button
    cy.get('input[type="submit"]').click();

    // Check the user is redirected to the /view-residents page
    cy.url().should('include', '/view-residents');

    // Close the toast alert
    cy.get('button[aria-label="close"]').click();
  })
}); 
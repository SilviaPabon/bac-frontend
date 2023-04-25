/// <reference types="cypress" />

afterEach(() => {
	// Logtout
	cy.get('a[href="/logout"]').click();
	cy.url().should('include', '/login');
});

describe('Non logged tests', () => {
	// --- Login as admin ---
	it('Should be able to login as admin', () => {
		cy.visit('http://127.0.0.1:5173/login');

		// Check there are a mail and password inputs
		cy.get('input[name="mail"]').should('exist');
		cy.get('input[name="password"]').should('exist');

		// Fill the input with the admin generated credentials
		cy.get('input[name="mail"]').type('pedro.chaparro.admin@gmail.com');
		cy.get('input[name="password"]').type('Upbbga2023*/');

		// Click on the login button
		cy.get('input[type="submit"]').click();

		// Check the user is redirected to the /view-residents page
		cy.url().should('include', '/view-residents');

		// Colose the toast
		cy.get('button[aria-label="close"]').click();

		// Check the navbar has the admin options by checking the links exist
		cy.get('a[href="/admin/register-staff"]').should('exist');
		cy.get('a[href="/view-residents"]').should('exist');
		cy.get('a[href="/logout"]').should('exist');
	});
});

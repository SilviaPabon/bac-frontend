/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Admin tests', () => {
	// --- Setup ---
	// Login as an admin and check the navbar options
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5173/login');
		cy.get('input[name="mail"]').should('exist');
		cy.get('input[name="password"]').should('exist');

		cy.get('input[name="mail"]').type('pedro.chaparro.admin@gmail.com');
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
	});

	// --- Tests ---
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
	});
});

describe('Staff tests', () => {
	// --- Setup ---
	// Login as an admin and check the navbar options
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5173/login');
		cy.get('input[name="mail"]').should('exist');
		cy.get('input[name="password"]').should('exist');

		cy.get('input[name="mail"]').type('pedro.chaparro.watchman@gmail.com');
		cy.get('input[name="password"]').type('Upbbga2023*/');
		cy.get('input[type="submit"]').click();
		cy.get('button[aria-label="close"]').click();

		cy.url().should('include', '/view-residents');
		cy.get('a[href="/staff/register-resident"]').should('exist');
		cy.get('a[href="/view-residents"]').should('exist');
		cy.get('a[href="/logout"]').should('exist');
	});

	// Logout
	afterEach(() => {
		cy.get('a[href="/logout"]').click();
		cy.url().should('include', '/login');
	});

	// --- Tests ---
	// --- Register resident ---
	it('Should be able to register a resident', () => {
		cy.get('a[href="/staff/register-resident"]').click();

		// Check there are all the inputs
		cy.get('input[name="name"]').should('exist');
		cy.get('input[name="mail"]').should('exist');
		cy.get('input[name="identification_card"]').should('exist');
		cy.get('input[name="apartment"]').should('exist');
		cy.get('input[type="submit"]').should('exist');

		// Generate data
		const name = faker.name.fullName();
		const mail = faker.internet.email();
		const identification_card = faker.datatype
			.bigInt({
				min: 1000000000,
				max: 2000000000,
			})
			.toString();
		const apartment = faker.datatype
			.number({
				min: 1,
				max: 100,
			})
			.toString();

		// Fill the inputs
		cy.get('input[name="name"]').type(name);
		cy.get('input[name="mail"]').type(mail);
		cy.get('input[name="identification_card"]').type(identification_card);
		cy.get('input[name="apartment"]').type(apartment);

		// Click on the register button
		cy.get('input[type="submit"]').click();
		cy.get('button[aria-label="close"]').click();

		// Check the user is redirected to the /view-residents page
		cy.url().should('include', '/view-residents');

		// Check the resident is at the end of the table
		cy.get('table tbody tr:last-child td:nth-child(1)').should(
			'contain',
			identification_card,
		);
		cy.get('table tbody tr:last-child td:nth-child(2)').should('contain', name);
		cy.get('table tbody tr:last-child td:nth-child(3)').should('contain', mail);
		cy.get('table tbody tr:last-child td:nth-child(4)').should(
			'contain',
			apartment,
		);
	});

	// --- Update resident ---
	it('Should be able to update a resident', () => {
		// Generate data
		const name = faker.name.fullName();
		const mail = faker.internet.email();
		const apartment = faker.datatype
			.number({
				min: 1,
				max: 100,
			})
			.toString();

		// Click the "Update" button in the last row
		cy.get('table tbody tr:last-child td:last-child a').click();

		// Check there are all the inputs
		cy.get('input[name="name"]').should('exist');
		cy.get('input[name="mail"]').should('exist');
		cy.get('input[name="apartment"]').should('exist');

		// Fill the inputs
		cy.get('input[name="name"]').clear().type(name);
		cy.get('input[name="mail"]').clear().type(mail);
		cy.get('input[name="apartment"]').clear().type(apartment);

		// Click on the update button
		cy.get('input[type="submit"]').click();
		cy.get('button[aria-label="close"]').click();

		// Check the user is redirected to the /view-residents page
		cy.url().should('include', '/view-residents');

		// Check the resident is at the end of the table
		cy.get('table tbody tr:last-child td:nth-child(2)').should('contain', name);
		cy.get('table tbody tr:last-child td:nth-child(3)').should('contain', mail);
		cy.get('table tbody tr:last-child td:nth-child(4)').should(
			'contain',
			apartment,
		);
	});
});

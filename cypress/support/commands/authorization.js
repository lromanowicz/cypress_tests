/// <reference types="Cypress" />

Cypress.Commands.add('registerUser', (username, email, password) => {
	cy.visit('/register');
	cy
		.get('[data-test="username"]')
		.type(username);
	cy
		.get('[data-test="email"]')
		.type(email);
	cy
		.get('[data-test="password"]')
		.type(password);
	cy
		.get('[data-test="sign-up"]')
		.click();
});

Cypress.Commands.add('login', (email, password) => {
	cy.clearCookies();
	cy.clearLocalStorage();
	cy.visit('/login');
	
	cy
		.get('[type="email"]')
		.type(email);
	cy
		.get('[type="password"]')
		.type(password);
	cy
		.get('button[type="submit"]')
		.click();
});

Cypress.Commands.add('loginApi', (email, password) => {
	cy.request({
		url: `${Cypress.env('apiUrl')}/users/login`,
		method: 'POST',
		body: {
			user: {
				email: email,
				password: password
			}
		},
		failOnStatusCode: false
	}).then(response => {
		localStorage.setItem('jwt', response.body.user.token);
		localStorage.setItem('jiraBaseUrl', 'atlassian.net');
		localStorage.setItem('captureCloudUrl', 'https://prod-capture.zephyr4jiracloud.com/capture')
	});
});

Cypress.Commands.add('registerUserApi', (username, email, password) => {
	cy.request({
		url: `${Cypress.env('apiUrl')}/users`,
		method: 'POST',
		body: {
			user: {
				username: username,
				email: email,
				password: password
			}
		},
		failOnStatusCode: false
	});
});
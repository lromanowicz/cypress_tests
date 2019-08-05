/// <reference types="Cypress" />

Cypress.Commands.add('createPost', function(title, description, content, tags) {
	cy.visit("/editor");
	cy
		.get("fieldset input, textarea")
		.each((el, idx) =>
			cy
				.wrap(el)
				.type(`${arguments[idx]}{enter}`)
		);
	cy
		.get('button')
		.click();
});

Cypress.Commands.add('createPostApi', (title, description, content, ...tags) => {
	cy.request({
		url: `${Cypress.env('apiUrl')}/articles`,
		method: 'POST',
		headers: {
			authorization: `Token ${localStorage.getItem('jwt')}`,
		},
		body: {
			article: {
				title: title,
				description: description,
				body: content,
				tagList: tags
			}
		},
		failOnStatusCode: false
	});
});

Cypress.Commands.add('createComment', (postSlug, content) => {
	cy.request({
		url: `${Cypress.env('apiUrl')}/articles/${postSlug}/comments`,
		method: 'POST',
		headers: {
			authorization: `Token ${localStorage.getItem('jwt')}`
		},
		body: {
			comment: {
				body: content
			}
		},
		failOnStatusCode: false
	});
});

Cypress.Commands.add('getUserPosts', (username) => {
	cy.request({
		url: `${Cypress.env('apiUrl')}/articles?author=${username}`,
		method: 'GET',
		headers: {
			authorization: `Token ${localStorage.getItem('jwt')}`
		}
	});
});

Cypress.Commands.add('deleteUserPosts', (username) => {
	cy
		.getUserPosts(username)
		.then(response => {
			cy
				.wrap(response.body.articles)
				.each(article => 
					cy.request({
						method: 'DELETE',
						headers: {
							authorization: `Token ${localStorage.getItem('jwt')}`
						},
						url: `${Cypress.env('apiUrl')}/articles/${article.slug}`
					})
				);
		});
});

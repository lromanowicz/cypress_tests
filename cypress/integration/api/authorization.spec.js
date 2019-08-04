describe('User authorization', function() {
	beforeEach(function() {
		cy.fixture('user').as('user');
	});

	context('User validation', function() {
		it('should not be able to get posts by an unauthorized user', function() {
			cy.getUserPosts(this.user.username)
				.then(response => {
					expect(response.status).to.eq(403);
				});
		});
	});
});
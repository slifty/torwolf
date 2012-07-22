var ActivistPlayer = Player.extend({
	role: PLAYER_ROLE_ACTIVIST,
	allegiance: PLAYER_ALLEGIANCE_ACTIVIST,
	
	init: function() {
		// Generate secrets
		for(var x = 0; x < config.secret_count; ++x) {
			var secret = new Secret();
			secret.content = "Secret " + x;
			this.secrets.push(secret);
		}
	}
});
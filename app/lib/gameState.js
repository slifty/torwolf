var interactions = {};

exports.getInteractionById = function(interactionId) {
	return interactions[interactionId];
};

exports.storeInteraction = function(interaction) {
	interactions[interaction.id] = interaction;
};

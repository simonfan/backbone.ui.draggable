define(['backbone.ui.draggable','backbone','jquery'], function(Draggable, Backbone, $) {


	var ModifiedDraggable = Draggable.extend({
		draggableOptions: {
			
		}
	});

	var draggable = new Draggable({
		el: $('#draggable'),
	});


	draggable.model.on('change', function(model) {
		console.log(model.attributes);
	})
});
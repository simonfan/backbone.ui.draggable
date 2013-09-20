define(['backbone.ui.draggable','backbone','jquery'], function(Draggable, Backbone, $) {


	var ModifiedDraggable = Draggable.extend({
		draggableOptions: {
			axis: 'x',
		},

		map: _.extend(Draggable.prototype.map, {
			'#position-top': 'positionTop',
			'#position-left': 'positionLeft',
			'#offset-top': 'offsetTop',
			'#offset-left': 'offsetLeft',
		}),
	});

	var draggable = window.draggable = new ModifiedDraggable({
		el: $('#draggable'),

		model: new Backbone.Model({
			positionTop: 100,
			positionLeft: 200,
		})
	});
});
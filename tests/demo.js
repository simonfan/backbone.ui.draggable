define(['backbone.ui.draggable','backbone','jquery'], function(Draggable, Backbone, $) {


	var ModifiedDraggable = Draggable.extend({
		draggableOptions: {
			axis: 'x',
		},

		map: _.extend(Draggable.prototype.map, {
			'#position-top': 'top',
			'#position-left': 'left',
			'#offset-top': 'offsetTop',
			'#offset-left': 'offsetLeft',
		}),


		handleDrag: function(e, ui) {
			if (this.model.get('left') > 400) {
				this.$el.draggable('option','axis',false);
			} else {
				this.$el.draggable('option','axis','x')
			}
		},
	});

	var draggable = window.draggable = new ModifiedDraggable({
		el: $('#draggable'),

		model: new Backbone.Model({
			top: 100,
			left: 200,
		})
	});
});
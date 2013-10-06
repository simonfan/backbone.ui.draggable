define(['backbone.view.model','jquery','backbone','underscore','jquery.ui.draggable'],
function(ModelView           , $      , Backbone , undef      , undef               ) {

	var Draggable = ModelView.extend({
		initialize: function(options) {

			_.bindAll(this,'_handleDrag','_handleDragStart','_handleDragStop');
			_.bindAll(this,'handleDrag','handleDragStart','handleDragStop');

			this.draggableOptions = _.extend(this.draggableOptions, options.draggableOptions);

			this.$draggable = options.draggable || this.$el;

			/**
			 * Build the draggable.
			 */
			this.$draggable
				.draggable(this.draggableOptions)
				.on('drag', this._handleDrag)
				.on('dragstart', this._handleDragStart)
				.on('dragstop', this._handleDragStop);

			/**
			 * Build the modelview map object: extend the original map object
			 */
			this.map = _.extend({}, this.map, {
				'.->css:top': this.dataMap.positionTop,
				'.->css:left': this.dataMap.positionLeft,
			});

			console.log(this.map)

			// run the ModelView initialize after so that the initial
			// positioning is actually applied.
			// Also, this gives us possibility of changing the data mapping
			ModelView.prototype.initialize.call(this, options);
		},

		map: {},

		draggableOptions: {},

		/**
		 * Default model constructor.
		 */
		model: Backbone.Model,

		_handleDrag: function(e, ui) {
			// get axis
			var axis = this.$el.draggable('option','axis');

			// set position
			var positionTopAttr = this.dataMap.positionTop,
				offsetTopAttr = this.dataMap.offsetTop,

				positionLeftAttr = this.dataMap.positionLeft,
				offsetLeftAttr = this.dataMap.offsetLeft;

			// only set the positionTopAttribute if axis is NOT equal 'x'
			if (axis !== 'x') {
				this.model
					.set(positionTopAttr, ui.position.top)
					.set(offsetTopAttr, ui.offset.top)
			}

			if (axis !== 'y') {
				this.model
					.set(positionLeftAttr, ui.position.left)
					.set(offsetLeftAttr, ui.offset.left);
			}
				

			this.handleDrag(e, ui);
		},

		_handleDragStart: function(e, ui) {

			this.handleDragStart(e, ui);
		},

		_handleDragStop: function(e, ui) {

			this.handleDragStop(e, ui);
		},

		/**
		 * Overwriting methods
		 */
		handleDrag: function(e, ui) {},
		handleDragStart: function(e, ui) {},
		handleDragStop: function(e, ui) {},

		/**
		 * Data mapping.
		 */
		dataMap: {
			positionTop: 'top',
			positionLeft: 'left',
			offsetTop: 'offsetTop',
			offsetLeft: 'offsetLeft',
		}
	});

	return Draggable;
});
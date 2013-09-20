define(['backbone.modelview','jquery','backbone','underscore','jquery.ui.draggable'],
function(ModelView          , $      , Backbone , undef      , undef               ) {

	var Handle = ModelView.extend({
		initialize: function(options) {

			_.bindAll(this,'_handleDrag','_handleDragStart','_handleDragStop');
			_.bindAll(this,'handleDrag','handleDragStart','handleDragStop');

			this.draggableOptions = _.extend(this.draggableOptions, options.draggableOptions);

			this.$handle = options.handle || this.$el;

			/**
			 * Build the draggable.
			 */
			this.$handle
				.draggable(this.draggableOptions)
				.on('drag', this._handleDrag)
				.on('dragstart', this._handleDragStart)
				.on('dragstop', this._handleDragStop);

			// run the ModelView initialize after so that the initial
			// positioning is actually applied.
			// Also, this gives us possibility of changing the data mapping
			ModelView.prototype.initialize.call(this, options);
		},

		map: {
			'.->css:top': 'positionTop',
			'.->css:left': 'positionLeft',
		},

		draggableOptions: {},

		/**
		 * Default model constructor.
		 */
		model: Backbone.Model,

		_handleDrag: function(e, ui) {
			// get axis
			var axis = this.$el.draggable('option','axis');

			// set position
			var positionTopAttr = this.positionDataMap.top,
				offsetTopAttr = this.offsetDataMap.top,

				positionLeftAttr = this.positionDataMap.left,
				offsetLeftAttr = this.offsetDataMap.left;

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
		positionDataMap: {
			top: 'positionTop',
			left: 'positionLeft',
		},

		offsetDataMap: {
			top: 'offsetTop',
			left: 'offsetLeft',
		},
	});

	return Handle;
});
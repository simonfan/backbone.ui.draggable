define(['backbone.modelview','jquery','backbone','underscore','jquery.ui.draggable'],
function(ModelView          , $      , Backbone , undef      , undef               ) {

	var Handle = ModelView.extend({
		initialize: function(options) {
			ModelView.prototype.initialize.call(this, options);

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
		},

		draggableOptions: {},

		/**
		 * Default model constructor.
		 */
		model: Backbone.Model,

		_handleDrag: function(e, ui) {
			// set position
			var positionTopAttr = this.positionDataMap.top,
				positionLeftAttr = this.positionDataMap.left;
			this.model
				.set(positionTopAttr, ui.position.top)
				.set(positionLeftAttr, ui.position.left);

			// set offset
			var offsetTopAttr = this.offsetDataMap.top,
				offsetLeftAttr = this.offsetDataMap.left;
			this.model
				.set(offsetTopAttr, ui.offset.top)
				.set(offsetLeftAttr, ui.offset.left);

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
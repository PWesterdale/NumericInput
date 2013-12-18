(function( $ ){

	$.fn.numericInput = function(conf) {

		var self = $(this);

		var api = {
			config: {
				maximum : false,
				minimum : false,
				prependZero : false,
				addValue : '&#9650;',
				subtractValue : '&#9660;',
				defaultValue : 0,
				cyclic : false,
				afterAdd : function(err){

				},
				afterSubtract : function(err){

				}
			},
			addElement: {},
			subtractElement: {},
			init : function(){
				var $a = $('<a href="#"></a>');

				var myapi = this;

				this.addElement = $a.clone().addClass('numeric-add').html(this.config.addValue);
				this.subtractElement = $a.clone().addClass('numeric-subtract').html(this.config.subtractValue);

				self.after(this.addElement, this.subtractElement);

				this.addElement.on('click', function(e){
					e.preventDefault();
					myapi.doAdd(1, myapi.config.afterAdd);
				});

				this.subtractElement.on('click', function(e){
					e.preventDefault();
					myapi.doSubtract(1, myapi.config.afterSubtract);
				});

			},
			doAdd : function(amount, cb){

				this.operation('add', amount, cb);

			},
			doSubtract : function(amount, cb){

				this.operation('subtract', amount, cb);

			},
			operation : function(operation, amount, cb){
				
				if(self.val() === ''){
					self.val(this.config.defaultValue);
				}

				if(operation == 'add'){
					var result = parseInt(self.val()) + amount;
				} else {
					var result = parseInt(self.val()) - amount;
				}

				returnResult = this.prependZero(result);

				switch(operation){
					case 'add':
						if(this.config.maximum){
							if(this.config.maximum >= result){
								self.val(returnResult);
							} else {
								if(this.config.cyclic){
									self.val(this.prependZero(this.config.minimum));
								} else {
									cb('Hit Maximum Limit');
								}
							}
						} else {
							self.val(returnResult)
						}
					break;
					case 'subtract':
						if(this.config.minimum !== false){
							if(this.config.minimum <= result){
								self.val(returnResult);
							} else {
								if(this.config.cyclic){
									self.val(this.prependZero(this.config.maximum));
								} else {
									cb('Hit Minimum Limit');
								}
							}
						} else {
							self.val(returnResult)
						}
					break;
				}

				cb(null);

			},
			prependZero : function(value){
				if(this.config.prependZero){
					return value < 10 ? '0' + value : value;
				} else {
					return value;
				}
			}
		};

		$.extend(api.config, conf);

		self.data('api', api);

		api.init();

	};

})(jQuery);
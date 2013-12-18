(function( $ ){

	$.fn.numericInput = function(conf) {

		var self = $(this);

		var api = {
			config: {
				max : false,
				minimum : false,
				prependZero : true,
				addValue : '&#9650;',
				subtractValue : '&#9660;',
				defaultValue : 0,
				afterAdd : function(){

				},
				afterSubtract : function(){

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

				if(this.config.prependZero){
					returnResult = result < 10 ? '0' + result : result;
				} else {
					returnResult = result;
				}

				switch(operation){
					case 'add':
						if(this.config.max){
							if(this.config.max >= result){
								self.val(returnResult);
							} else {
								return false;
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
								return false;
							}
						} else {
							self.val(returnResult)
						}
					break;
				}

				cb();

			}
		};

		$.extend(api.config, conf);

		self.data('api', api);

		api.init();

	};

})(jQuery);
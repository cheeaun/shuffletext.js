/*
Script: shuffleText.js
	Class for creating text shuffling effects.

License:
	MIT-style license.
*/

var shuffleText = new Class({

	Implements: [Events, Options],
	
	options:{
		/*
		onStart: $empty,
		onComplete: $empty,
		*/
		duration: 500,
		fps: 50
	},
	
	initialize: function(el, options){
		this.setOptions(options);
		this.options.duration = this.options.duration.toInt();
		this.el = $(el);
	},
	
	shuffle: function(){
		var time = $time();
		if (time < this.time + this.options.duration){
			var shuffledText = this.text.shuffle().join('');
			this.el.set('text', shuffledText);
		} else {
			this.el.set('text', this.oriText);
			this.complete();
		}
	},
	
	start: function(){
		if (this.timer) return this;
		this.oriText = this.el.get('text');
		this.text = this.oriText.split('');
		this.time = 0;
		this.startTimer();
		this.onStart();
		return this;
	},
	
	complete: function(){
		return (!this.stopTimer()) ? this : this.onComplete();
	},
	
	onStart: function(){
		return this.fireEvent('start');
	},

	onComplete: function(){
		return this.fireEvent('complete');
	},

	stopTimer: function(){
		if (!this.timer) return false;
		this.timer = $clear(this.timer);
		return true;
	},

	startTimer: function(){
		if (this.timer) return false;
		this.time = $time() - this.time;
		this.timer = this.shuffle.periodical(Math.round(1000 / this.options.fps), this);
		return true;
	}
	
});

// from http://pwnt.be/2007/08/11/bovine-spongiform-encephalopathy/
Array.implement({
	shuffle: function(){
		var temp;
		for (var i = this.length - 1; i > 0; i--){
			var j = $random(0, i);
			temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
		return this;
	}
});
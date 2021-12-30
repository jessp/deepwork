import noUiSlider from 'nouislider';

//slider contains the attributes to set up a new noui slider element
export class StudioB {
  	constructor(_id, _slider, _picA, _picB, _vidCallback, _picCallback) {
    	this.id = d3.select(_id);
    	this.slider = _slider;
    	this.position = this.slider.start;
    	this.max = this.slider.max;
    	this.picA = _picA;
    	this.picB = _picB;
    	this.vidCallback = _vidCallback;
    	this.picCallback = _picCallback;
    	this.pic = this.id.select(".photo-studio-main");
    	this.init();
	}


	updatePic(){
		if (this.picA === this.picB || this.position === 0){
			this.pic
			.style("background-image", `url(assets/images/starting_photos/${(this.picA + 1)}.png)`)
			.style("background-position", "0 0");
		} else if (this.position === this.max){
			this.pic
			.style("background-image", `url(assets/images/starting_photos/${(this.picB + 1)}.png)`)
			.style("background-position", "0 0");
		} else {
			if (this.picB > this.picA){
				this.pic
					.style("background-image", `url(assets/images/morphs/morphing_0${(this.picA + 1)}_0${(this.picB + 1)}.jpg)`)
					.style("background-position", `${this.position/this.max * 100}% 0%`);
			} else {
				this.pic
					.style("background-image", `url(assets/images/morphs/morphing_0${(this.picB + 1)}_0${(this.picA + 1)}.jpg)`)
					.style("background-position", `${(this.max + 1 - this.position)/this.max * 100}% 0%`);
			}
		}

		if (this.picB > this.picA){
			this.vidCallback(this.picA + 1, this.picB + 1, this.position);
			this.picCallback(this.picA + 1, this.picB + 1, this.position * -100);
		} else if (this.picB === this.picA) {
			if (this.picA < 8){
				this.vidCallback(this.picA + 1, 9, 0);
				this.picCallback(this.picA + 1, 9, 0);
			} else {
				this.vidCallback(1, this.picB + 1, this.max);
				this.picCallback(1, this.picB + 1, this.max * -100);
			}
		} else {
			this.vidCallback(this.picB + 1, this.picA + 1, (this.max + 1 - this.position));
			this.picCallback(this.picB + 1, this.picA + 1, (this.max + 1 - this.position) * -100);
		}


	}

	setupSlider(slide){
		noUiSlider.create(this.id.select(`#${slide.id}`).node(), {
		    start: [slide.start],
		    handleAttributes: [
        		{ 'aria-label': 'adjust ratio of pic A features versus pic B features' }
        	],
		    range: {
		        'min': slide.min,
		        'max': slide.max
		    },
		    connect: 'lower',
		    pips: {
		        mode: 'count',
    		    values: 2,
    		    density: 1000,
    		    format: {
    		    	to: function (value) {
			            return value === 0 ? slide.minLabel : slide.maxLabel
			        }
    		    }
		    },
		    step: 1
		}).on("change", e => {
			this.position = parseInt(e);
			this.updatePic();
		});

	}

	init(){
		this.setupSlider(this.slider);

		this.updatePic();
		
	}

	updateVar(isA, newPos){
		if (isA){
			this.picA = newPos;
		} else {
			this.picB = newPos;
		}
		this.updatePic();
	}

}
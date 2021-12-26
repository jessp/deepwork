import noUiSlider from 'nouislider';


export class StudioA {
  	constructor(_id, _slider, _sliders) {
    	this.id = d3.select(_id);
    	this.slider = _slider;
    	this.sliders = _sliders;
    	this.pos_beauty = 0;
    	this.pos_age = 0;
    	this.pos_gender = 0;

    	
    	this.pic = this.id.select(".photo-studio-main");
    	this.init();
	}

	updatePic(){

		const scaleLin = d3.scaleLinear()
			.domain([0, 6])
			.range([18, -18]);

		const scaleBeaut = d3.scaleLinear()
			.domain([0, 6])
			.range([0, -24]);

		const f = e => Math.round(e) + ".0";

		this.pic
			.style("background-image", `url(assets/images/attributes/expressions_0${(this.slider.position + 1)}__age,${f(scaleLin(this.pos_age))}_beauty,${f(scaleBeaut(this.pos_beauty))}_gender,${f(scaleLin(this.pos_gender))}.jpg`);

	}

	setupSlider(slide){
		noUiSlider.create(this.id.select(`#pos_${slide.att}`).node(), {
		    start: [slide.start],
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
			this[("pos_"+slide.att)] = parseInt(e);
			this.updatePic();
		});

	}


	init(){
		for (var i = 0; i < this.sliders.length; i++){
			this.setupSlider(this.sliders[i]);
		}
		

		this.slider.setCallback(e => this.updatePic());

		this.updatePic();


	}

}
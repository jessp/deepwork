import noUiSlider from 'nouislider';

export class PhotoSlider {
  	constructor(_id, _position, _steps, _effect) {
    	this.id = d3.select(_id);
    	this.position = _position;
    	this.effect = _effect;
    	this.steps = _steps;
    	this.grid = this.id.select(".photo-grid");
    	this.init();
	}

	setCallback(_effect){
		this.effect = _effect;
	}



	init(){


		this.grid.selectAll("div")
			.data(Array.apply(null, Array(this.steps)))
			.join(
				enter => enter.append("div")
					.style("background-image", (d, i) => `url(assets/images/thumbnail_starting_photos/${(i+1)}.png)`)
					.style("width", `calc(100%/${this.steps})`)
					.attr("class", (d, i) => i === this.position ? "selected-pic" : null)
			)

		noUiSlider.create(this.id.select(".photo-select").node(), {
		    start: [this.position],
		    range: {
		        'min': 0,
		        'max': this.steps - 1
		    },
		    connect: 'lower',
		    step: 1
		}).on("change", e => {
			this.position = parseInt(e);
			this.grid.selectAll("div").classed("selected-pic", false);
			this.grid.select(`div:nth-of-type(${(this.position + 1)})`)
				.classed("selected-pic", true);
			if (this.effect !== null){
				this.effect(this.position);
			}
		});


	}

}
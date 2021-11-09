export class PhotoSlider {
  	constructor(_id, _position, _effect) {
    	this.id = d3.select(_id);
    	this.position = _position;
    	this.effect = _effect;
    	this.input = this.id.select("input");
    	this.grid = this.id.select(".photo-grid");
    	this.init();
	}

	init(){
		const size = 10;

		this.input.attr("min", 0);
		this.input.attr("max", size-1);
		this.input.attr("value", this.position);

		this.grid.selectAll("div")
			.data(Array.apply(null, Array(size)))
			.join(
				enter => enter.append("div")
					.style("background-image", "url(https://www.fillmurray.com/200/100)")
					.style("width", `calc(100%/${size})`)
					.attr("class", (d, i) => i === this.position ? "selected-pic" : null)
			)

		this.input.on("change", d => {
			this.position = parseInt(d.target.value);
			this.grid.selectAll("div").classed("selected-pic", false);
			this.grid.select(`div:nth-of-type(${(this.position + 1)})`)
				.classed("selected-pic", true);
		})


	}

}
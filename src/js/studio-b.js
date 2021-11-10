export class StudioB {
  	constructor(_id, _slider, _position, _max, _picA, _picB) {
    	this.id = d3.select(_id);
    	this.slider = d3.select(_slider);
    	this.position = _position;
    	this.max = _max;
    	this.picA = _picA;
    	this.picB = _picB;
    	this.pic = this.id.select(".photo-studio-main");
    	this.init();
	}

	updatePic(){
		if (this.picA === this.picB){
			this.pic
			.style("background-image", `url(assets/images/starting_photos/${(this.picA + 1)}.png)`)
			.style("background-position", "0 0");
		} else {
			this.pic
			.style("background-image", `url(assets/images/morphs/morphing_0${(this.picA + 1)}_0${(this.picB + 1)}.jpg)`)
			.style("background-position", `${this.position/this.max * 100}% 0%`);
		}
	}

	init(){
		this.slider.attr("value", this.position);
		this.slider.attr("max", this.max);

		this.updatePic();
		
		this.slider.on("change", d => {
			this.position = parseInt(d.target.value);
			this.updatePic();
		})
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
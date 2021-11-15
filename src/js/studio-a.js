export class StudioA {
  	constructor(_id, _slider) {
    	this.id = d3.select(_id);
    	this.slider = _slider;
    	this.pos_beauty;
    	this.pos_smile;
    	this.pos_age;
    	this.pos_gender;

    	
    	this.pic = this.id.select(".photo-studio-main");
    	this.init();
	}

	updatePic(){
		// if (this.picA === this.picB){
		// 	this.pic
		// 	.style("background-image", `url(assets/images/starting_photos/${(this.picA + 1)}.png)`)
		// 	.style("background-position", "0 0");
		// } else {
		// 	this.pic
		// 	.style("background-image", `url(assets/images/morphs/morphing_0${(this.picA + 1)}_0${(this.picB + 1)}.jpg)`)
		// 	.style("background-position", `${this.position/this.max * 100}% 0%`);
		// }
	}

	init(){

		this.id.selectAll("input")
			.each(e => {
				
				console.log(e);

				e.on("change", f => {
					console.log(f);
				})
			})
		// this.slider.attr("value", this.position);
		// this.slider.attr("max", this.max);

		// this.updatePic();
		
		// this.slider.on("change", d => {
		// 	this.position = parseInt(d.target.value);
		// 	this.updatePic();
		// })
	}

}
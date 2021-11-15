export class StudioA {
  	constructor(_id, _slider) {
    	this.id = d3.select(_id);
    	this.slider = _slider;
    	this.pos_beauty = 0;
    	this.pos_age = 0;
    	this.pos_gender = 0;

    	
    	this.pic = this.id.select(".photo-studio-main");
    	this.init();
	}

	updatePic(){

		const scaleLin = d3.scaleLinear()
			.domain([0, 8])
			.range([20, -20]);

		const f = e => e + ".0";

		this.pic
			.style("background-image", `url(assets/images/attributes/expressions_0${(this.slider.position + 1)}__age,${f(scaleLin(this.pos_age))}_beauty,${f(scaleLin(this.pos_beauty))}_gender,${f(scaleLin(this.pos_gender))}.jpg`);

	}

	init(){

		this.slider.setCallback(e => this.updatePic());

		this.id.selectAll("input:not(.photo-select)")
			.each((e, i, v) => {
				if (v[i].id){
					this[("pos_"+v[i].id)] = parseInt(v[i].value);
				}
			})
			.on("change", e => {
				const att = e.target.id;
				if (this[("pos_"+att)] !== undefined){
					this[("pos_"+att)] = parseInt(e.target.value);
					this.updatePic();
				}
			});

		this.updatePic();


	}

}
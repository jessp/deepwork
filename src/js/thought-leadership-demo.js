export class ThoughtLeadership {
  	constructor(_id1, _id2, _inf1, _inf2, _content) {
    	this.id1 = d3.select(_id1);
    	this.id2 = d3.select(_id2);
    	this.inf1 = _inf1;
    	this.inf2 = _inf2;
    	this.content = d3.select(_content);
    	this.data = null;
    	this.picIndex = [5, 9, 1];
    	this.init();
	}

	getTransition(){
    	return this.content.transition()
        	.duration(750);
    }

    changePic(a, b, c){
    	this.picIndex = [a, b, c];
    	this.content.selectAll(".social-icon")
    		.select("img")
    		.attr("src", `assets/images/morphs/morphing_0${this.picIndex[0]}_0${this.picIndex[1]}.jpg`)
    		.style("margin-left", this.picIndex[2] + "%")

    }

	reqData(val1, val2, firstTry){

		fetch(`assets/data/tweets/${val1}_${val2}_tweets.csv`).then(response => {
		  if (!response.ok) {
		    return null;
		  }
		  return response.text();
		}).then(d => {
			if (d === null){
				if (firstTry){
					this.reqData(val2, val1, false);
				} else {
					console.log(`Data missing for ${val1} and ${val2}`);
				}
			} else {
				const data = d3.csvParse(d);
				this.content.selectAll("div.deepwork-social")
					.data(data, d => d.tweets)
					.join(
				        enter => enter.append("div")
				            .attr("class", "deepwork-social fade-in")
				            .html((d) => {
				            	return `<div class="social-icon">
									<img inline src='assets/images/morphs/morphing_0${this.picIndex[0]}_0${this.picIndex[1]}.jpg' style='margin-left: ${this.picIndex[2]}%'>
							 	</div>
							 	<div class="social-content">
							 		<p>Your Hot Takes</p>
									<p>${d.tweets}</p>
									<div class="impact-icons">
										<img inline src='assets/images/svgs/thumbs-up.svg'>
										<span>${parseInt(Math.random() * 100)}</span>
										<img inline src='assets/images/svgs/repeat.svg'>
										<span>${parseInt(Math.random() * 100)}</span>
									</div>
								</div>`
				            })
				            .style("margin-left", "-500px")
				            .call(enter => enter.transition(this.getTransition())
				            	.delay((d, i) => i * 100)
				            	.style("margin-left", "0px"))
				    )
			}
		})
	}

	setOptions(theThing, theInf){
		theThing.selectAll(`option`)
				.property("disabled", false);

		theThing.select(`option[value="${theInf}"]`)
				.property("disabled", true);
	}

	init(){

		this.id1.property('value', this.inf1);
		this.id2.property('value', this.inf2);

		this.setOptions(this.id1, this.inf2);
		this.setOptions(this.id2, this.inf1);

		this.reqData(this.inf1, this.inf2, true);


		this.id1.on("change", (e) => {
			this.inf1 = e.target.value;

			this.setOptions(this.id2, this.inf1);

			this.reqData(this.inf1, this.inf2, true);
		})

		this.id2.on("change", (e) => {
			this.inf2 = e.target.value;

			this.setOptions(this.id1, this.inf2);

			this.reqData(this.inf1, this.inf2, true);
		})
			
	}
}





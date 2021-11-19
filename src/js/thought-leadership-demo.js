export class ThoughtLeadership {
  	constructor(_id1, _id2, _inf1, _inf2, _content) {
    	this.id1 = d3.select(_id1);
    	this.id2 = d3.select(_id2);
    	this.inf1 = _inf1;
    	this.inf2 = _inf2;
    	this.content = d3.select(_content);
    	this.data = null;
    	this.init();
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
				            .attr("class", "deepwork-social")
				            .html(function(d){
				            	return `<div class="social-icon">
									<img inline src='assets/images/svgs/circle.svg'>
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





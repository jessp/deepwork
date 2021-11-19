export class Resume {

  	constructor(_id, _selected) {
    	this.id = d3.select(_id);
    	this.body = this.id.select(".demo-body");
    	this.dropdown = this.id.select("select");
    	this.refreshButton = this.id.select("button");
    	this.selectedItem = _selected;
    	this.tFormat = d3.timeFormat("%b '%y");
    	this.resumeList = {"senior": [], "intermediate": [], "student": []};
    	d3.json("/assets/data/resume_files.json").then((data) => {
		  this.resumeList = data;
		  this.init();
		});
	}

	fillInData(data) {
		let returnString = "";

		const yearsToLastDate = 
			data["work"].length * (Math.random() * 
			((this.selectedItem === "student" ? 1 : 3) - this.selectedItem === "student" ? 0.4 : 0.6) +
			this.selectedItem === "student" ? 0.4 : 0.6);

		const firstYear = d3.timeMonth.offset(new Date(), yearsToLastDate * -12);

		const timeScale = d3.scaleTime()
			.domain([0, 1])
			.range([firstYear, new Date()]);

		const startDates = 
			Array.from({length: data["work"].length - 1}, () => +timeScale(Math.random()))
			.sort((a, b) => b - a);

		const intro = 
			`<div>
				<div>
					<h3>${data.basics.label}</h3>
					<p>${data.basics.summary}</p>
				</div>
				<h3>Experience</h3>`;

		returnString += intro;

		data["work"].map((e, i) => {

			returnString += 
				`<div class="work">
 					<div class="pos-grid">
 						<div class="years">
 							<h5>${this.tFormat(i === data["work"]["length"] - 1 ? firstYear : startDates[i])} -</h5>
 							<h5>${this.tFormat(i === 0 ? new Date() : startDates[i - 1])}</h5>
 						</div>
 						<div>
 							<h4>${e.position}</h4>
 							<h5>${e.company}</h5>
 						</div>
 					</div>
 					<p>${e.summary}</p>
 				</div>`;
		});


		if (data["interests"]){
			returnString += 
			`<h3>Interests</h3><ul>`;

			data["interests"].map(e => {
				returnString += `<li>${e.name}</li>`;
			})

			returnString += `</ul>`;
		}

		returnString += `</div>`;


		return returnString;

	}

	changeValue(){
		const resIndex = parseInt(Math.random() * this.resumeList[this.selectedItem]["resumes"].length);

		d3.json(`/assets/data/resumes/${this.resumeList[this.selectedItem]["resumes"][resIndex]}`).then((data) => {
		  const resume = this.fillInData(data);
		  this.refreshButton.property("disabled", false);
		  this.body.html(resume);
		  this.body.node().scrollTop = 0;
		});
	}


	init(){
		this.refreshButton.property("disabled", true);

		this.refreshButton.on("click", e => {
			this.refreshButton.property("disabled", true);
			this.changeValue();
		})

		this.dropdown
			.select(`option[value=${this.selectedItem}]`)
			.property("selected", true);

		this.dropdown.on("change", e => {
			this.refreshButton.property("disabled", true);
			this.selectedItem = e.target.value;
			this.changeValue();
		})

		this.changeValue();
	}

}
// const handlebars = require('handlebars');

export class Resume {

  	constructor(_id) {
    	this.id = d3.select(_id);
    	this.body = this.id.select(".demo-body");
    	this.resumeList = {"senior": [], "intermediate": [], "student": []};
    	d3.json("/assets/data/resume_files.json").then((data) => {
		  this.resumeList = data;
		  this.init();
		});

		this.template = 
			`<div>
					<div>
						<h3>{{basics.label}}</h3>
						<p>{{basics.summary}}</p>
					</div>
					<h3>Experience</h3>
					{{#work}}
						<div class="work">
							<div class="pos-grid">
								<div class="years">
									<h4>June '19 -</h4>
									<h4>June '19</h4>
								</div>
								<div>
									<h4>{{position}}</h4>
									<h5>{{company}}</h5>
								</div>
							</div>
							<p>{{summary}}</p>
						</div>
					{{/work}}
					{{#if interests}}
						<h3>Interests</h3>
						<ul>
						{{#interests}}
							<ol>{{this.name}}</ol>
						{{/interests}}
						</ul>
					{{/if}}
				</div>`;

		// this.compiled = handlebars.compile(this.template);
	}

	populateFile(data) {
		// const content = this.compiled(data);
  // 		this.body.html(content);
  	}

	init(){
		// d3.json(`/assets/data/resumes/${this.resumeList["senior"]["resumes"][0]}`).then((data) => {
		//   this.resumeList = data;
		//   this.populateFile(data);
		// });
	}

}
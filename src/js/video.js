export class VideoPlayer {
  	constructor(_id) {
    	this.id = d3.select(_id);
    	this.picIndex = [5, 9, 1];
    	this.changeUpcoming = false;
    	this.upcoming = null;


    	this.vidHolder = 
    		this.id.select("#video-holder")
    		.style("position", "relative")
    		.style("aspect-ratio", "1 / 1");

    	this.staticVidHolder = 
    		this.vidHolder.append("video")
    		.style("position", "absolute")
    		.style("left", 0)
    		.style("top", 0)
    		.property("autoplay", true)
    		.property("muted", true)
    		.property("loop", true)
    		.style("width", "100%")
    		.style("height", "100%")
    		.style("z-index", 1);
    	
    	this.staticVidSrc =
    		this.staticVidHolder
    		.append("source")
    		.attr("src", `assets/videos/static_morphing_0${this.picIndex[0]}_0${this.picIndex[1]}_${this.picIndex[2]}.mp4`)
    		.attr("type", "video/mp4");

    	this.reactionVidHolder = 
    		this.vidHolder.append("video")
    		.style("position", "absolute")
    		.style("left", 0)
    		.style("top", 0)
    		.property("autoplay", true)
    		.property("muted", true)
    		.style("width", "100%")
    		.style("height", "100%");
    	
    	this.reactionVidSrc =
    		this.reactionVidHolder
    		.append("source")
    		.attr("src", "")
    		.attr("type", "video/mp4");

    	this.buttons = this.id.selectAll("button");

    	this.init();

	}

	showReaction(){
		this.reactionVidSrc
			.attr("src", `assets/videos/${this.upcoming}_morphing_0${this.picIndex[0]}_0${this.picIndex[1]}_${this.picIndex[2]}.mp4`)

		this.reactionVidHolder.node().load();

	}

	changeVid(a, b, c){
		this.picIndex = [a, b, c];

		this.staticVidSrc
    		.attr("src", `assets/videos/static_morphing_0${this.picIndex[0]}_0${this.picIndex[1]}_${this.picIndex[2]}.mp4`);
	
    	this.staticVidHolder.node().load();
	}


	init(){

		this.buttons.on("click", (e) => {
			this.upcoming = e.target.dataset["item"];
			this.changeUpcoming = true;

			this.showReaction();

		})

		this.reactionVidHolder.node()
			.addEventListener('canplay',() => this.staticVidHolder.style("opacity", 0),false);

		this.reactionVidHolder.node()
			.addEventListener('ended', () => {
				this.staticVidHolder.style("opacity", 100);
				this.reactionVidSrc.attr("src", "");
			}, false);
	}

}

export class VideoPlayer {
  	constructor(_id) {
    	this.id = d3.select(_id);

    	this.changeUpcoming = false;


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
    		.style("width", "100%");
    	
    	this.staticVidSrc =
    		this.staticVidHolder
    		.append("source")
    		.attr("src", "/assets/videos/static_morphing_05_09_1.mp4")
    		.attr("type", "video/mp4");

    	this.reactionVidHolder = 
    		this.vidHolder.append("video")
    		.style("position", "absolute")
    		.style("left", 0)
    		.style("top", 0)
    		.property("autoplay", true)
    		.property("muted", true)
    		.property("loop", true)
    		.style("width", "100%");
    	
    	this.reactionVidSrc =
    		this.staticVidHolder
    		.append("source")
    		.attr("src", "/assets/videos/static_morphing_05_09_1.mp4")
    		.attr("type", "video/mp4");

    	this.buttons = this.id.selectAll("button");

    	console.log(this.staticVidHolder);
    	console.log(this.staticVidSrc);

    	this.init();

	}

	init(){

		this.buttons.on("click", e => {
			console.log(e.target);
			this.changeUpcoming = true;
		})

	}

}

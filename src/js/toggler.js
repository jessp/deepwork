export class Toggler {

    constructor(_classId, _phraseA, _phraseB) {
      this.classId = _classId;
      this.phraseA = _phraseA;
      this.phraseB = _phraseB;

      this.init()
    }

    init(){

      d3.select(`.toggler.${this.classId}`).on("click", () =>
      {
        let toggler = d3.select(`.toggler.${this.classId}`);
        let toggled = d3.select(`.toggled.${this.classId}`);
        let stateOfToggle = toggler.classed("closed");

        toggler.classed("closed", !stateOfToggle);
        toggler.select(".phrase").html(stateOfToggle ? this.phraseB : this.phraseA);
        toggler.select("img").attr("src", `assets/images/svgs/chevron-${stateOfToggle ? "down" : "right"}.svg`);

        toggled.classed("closed", !stateOfToggle);


      })

    }

}
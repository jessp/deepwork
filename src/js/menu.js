//strategy from https://css-tricks.com/block-links-the-search-for-a-perfect-solution/#method-4-sprinkle-javascript-on-the-second-method
export class MenuLinker {

    constructor(_selector, _mainLink) {
      this.cards = d3.selectAll(_selector);
      this.anchors = this.cards.selectAll("a");
      this.mainLink = _mainLink;

      this.init();
    }

    init(){
      this.anchors.on("click", (e) => e.stopPropagation());
      const mainLink = this.mainLink;

      this.cards.on("click", function(e){
        const noTextSelected = !window.getSelection().toString();

        if (noTextSelected) {
          d3.select(this).select(mainLink).node().click();
        }
      });

    }

}

module.exports = {
  greaterThan: function(a, b, opts) {
    console.log(a, b, opts);
    if (a > b) return opts.fn(this);
    else return opts.inverse(this);
  },
  ifEquals: function(a, b, opts) {
    if (a === b) return opts.fn(this);
    else return opts.inverse(this);
  },
  lessThan: function(a, b, opts) {
    if (a < b) return opts.fn(this);
    else return opts.inverse(this);
  },
  slugify: function(text) {
    return String(text)
      .replace(/\s+/g, '-')
      .toLowerCase();
  },
  randomNumber: function(upper) {
    return parseInt(Math.random() * upper);
  },

  parseLink: function(text, del) {
    /*
    input = A statement like this with <del>text and a url<del>http://fake.com<del>
    sandwiched between del characters.
    output = The statement where text is hyperlinked according to the adjacent link.
    */
    let splitText = text.split(del);
    if (splitText.length < 2){
      return text;
    }
    
    for (var i = 1; i < splitText.length; i++){
      if (splitText[i].substring(0,4) === "http"){
        splitText[i-1] = `<a href="${splitText[i]}">${splitText[i-1]}</a>`;
        splitText[i] = "";
      }
    }
    return splitText.join("");
  }
};

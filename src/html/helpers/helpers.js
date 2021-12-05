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
    let splitText = text.split(del);
    if (splitText.length < 2){
      return text;
    }
    
    for (var i = 1; i < splitText.length; i++){
      if (splitText[i].substring(0,4) === "http"){
        splitText[i-1] = `<a target="_blank" href="${splitText[i]}">${splitText[i-1]}</a>`;
        splitText[i] = "";
      }
    }
    return splitText.join("");
  },

  removeLink: function(text, del) {
    let splitText = text.split(del);
    if (splitText.length < 2){
      return text;
    }
    
    for (var i = 1; i < splitText.length; i++){
      if (splitText[i].substring(0,4) === "http"){
        splitText[i] = "";
      }
    }
    return splitText.join("");
  }
};

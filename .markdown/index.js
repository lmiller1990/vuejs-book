var markdownpdf = require("markdown-pdf")
  , fs = require("fs")

fs.createReadStream("../chapter-4-slideshow-app-with-test-driven-development.md")
  .pipe(markdownpdf())
  .pipe(fs.createWriteStream("here.pdf"))


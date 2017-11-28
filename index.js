var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


/**
 * Visit URL
 * @param {uri/string} url 
 */
function visitPage(url) {
    var options = {
        url: url,
        headers: {
          'User-Agent': 'SufyBot'
        }
    };
	
	request(options, function(err, resp, body) {
		if (err) {
			console.log("An error occured.", err);
		}

		if (resp.statusCode === 200) {// OK
			//Parse the Document Body and Get the Title of the Page
			var $ = cheerio.load(body);
			console.log("Page title:  " + $('title').text()); //just like jQuery Expressions..

			collectLinks($);
		}
	});
}

/**
 * 
 * @param {bodyOfWebPage} $ 
 */
function collectLinks($) {
	var allRelativeLinks = []; //same domain links
	var allAbsoluteLinks = []; //outside of domain links.

	var relativeLinks = $("a[href^='/']");

	var absoluteLinks = $("a[href^='http']");
	
	// console.log("RelativeLinks:");
	relativeLinks.each(function() {
		console.log("Response: ");
		allRelativeLinks.push($(this).attr('href'));
	});
	// console.log("RelativeLinks: ", allRelativeLinks);

	absoluteLinks.each(function(resp) {
		allAbsoluteLinks.push($(this).attr('href'));
	});
	
	// console.log("AbsoluteLinks: ",allAbsoluteLinks);
	
	console.log("Found " + allRelativeLinks.length + " relative links");
	console.log("Found " + allAbsoluteLinks.length + " absolute links");
  
}

/**
 * 
 * @param {bodyOfWebPage} $ 
 * @param {Search for a word} word 
 */
function searchForWord($, word) {
	var bodyText = $('html > body').text();
	//Convert Body and Word into lowercase first
	if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
	  return true;
	}
	return false;
}
visitPage('https://sufyan.co.in/');
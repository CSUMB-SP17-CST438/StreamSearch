/**
 *			ABOUT
 ********************************************************
 * Facebook.htm (the homepage) has a variable that is used internally on the 
 * facebook page. This variable is a list that supposedly indicate which 
 * friends you have interacted most with. 
 * 
 * This code snippet scrapes that variable from the homepage html file and
 * opens a dialog with a link to all your "top" friends.
 * 
 */

// ==UserScript==
// @name        Facebook Top Friend List
// @namespace   facebook
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @include     www.facebook.com/*
// @version     0.1
// ==/UserScript==
var headID = document.getElementsByTagName("head")[0];    

//Load jQuery
var jqScript = document.createElement('script');
jqScript.type = 'text/javascript';
jqScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
headID.appendChild(jqScript);

//When the jQuery file has been loaded the jQuery UI and jQuery UI CSS will be downloaded async
jqScript.onload = function() {
	console.log("jQuery loaded");

	var JQUI_JS_DONE = false;
	var JQUI_CSS_DONE = false

	// jQuery UI
	var jquiScript = document.createElement('script');
	jquiScript.type = 'text/javascript';
	jquiScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js';
	headID.appendChild(jquiScript);
	jquiScript.onload = function() {
		console.log("jQuery UI JS file loaded");
		JQUI_JS_DONE = true;

		if (JQUI_JS_DONE && JQUI_CSS_DONE) addButton();
	}

	// jQuery UI CSS
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/smoothness/jquery-ui.css';
	headID.appendChild(cssNode);
	cssNode.onload = function() {
		console.log("jQuery UI CSS file loaded");
		JQUI_CSS_DONE = true;

		if (JQUI_JS_DONE && JQUI_CSS_DONE) addButton();
	}
	
	
	function addButton() {
		var button = $('<button id="topFriendsButton">Top Friends <span class="note"><span></button>');
		button.on("click", openTopFriendsDialog);
		$('#blueBar').append(button);
	}

	/**
	 * This method:
	 * 1. Scrapes the page for the list of ordered friends ids
	 * 2. Opens a dialog with a link to each of the ordered friends.
	 */
	function openTopFriendsDialog() {
		// Disable button
		$('#topFriendsButton').attr('disabled','disabled');
		$('#topFriendsButton').find('.note').text("(loading...)");
		
		// Scrape for ids
		var text = $(document).find("body").html().split("OrderedFriends"+"ListInitialData")[1];
		text = text.substring(15,text.length-1);
		text = text.split("]")[0];
		text = text.replace(/"/g,'');
		var ids = text.split(",");
		var newDiv = $('<div></div>');
		for (var i=0; i<ids.length; i++) {
			var item = $('<a href="/'+ids[i]+'">#'+(i+1)+'</a>');
			item.css("float", "left");
			item.css("margin-right", "5px");
			newDiv.append(item);
		}
		// Open dialog
		$(newDiv).dialog({
			title: '"Top" Friends',
			width: 500
		});
		// Enable button again
		$('#topFriendsButton').removeAttr('disabled');
		$('#topFriendsButton').find('.note').text("");
	}
};
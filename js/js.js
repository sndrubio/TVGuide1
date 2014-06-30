//Create external functions to download the data files using jQuery AJAX 


//downloading data from episodes.json

function performEpisodes(episodes){
	var parsed = episodes;
		
		$(parsed).each( function(i,val) {
								 
			var div = $("<div id = 'episode'></div>");					 
			
			var showTitle = $("<h2 class='showTitle' >"+val.show.title+"</h2>");
			$(showTitle).addClass(showTitle);
			$(div).append(showTitle);
			
			var episodeTitle = $('<h3 class="episodeTitle">' + val.episode.title + "</h3>");
			$(episodeTitle).addClass(episodeTitle);
			$(div).append(episodeTitle);
			
			var episodeSeason = $('<h5 class="episodeSeason"> Season: ' + val.episode.season + "</h5>");
			$(episodeSeason).addClass(episodeSeason);
			$(div).append(episodeSeason);
					
			$('#upcomingEpisodes').append(div);
		});
}


//downloading data from shows.json

var parsedShow = [];

function performShows(shows){
	 
		parsedShow = shows;
		
		$(parsedShow).each(function(i,val) {
					
			parsedShow.push(val);
			
			var div = $("<div class = 'show' id='"+i+"'></div>");					 
			
			var showTitle = $('<h3 class="showTitle">' + val.title + "</h3>");
			$(showTitle).addClass(showTitle);
			$(div).append(showTitle);
			
			var showOverview = $('<p class="showOverview">' + val.overview + "</p>");
			$(showOverview).addClass(showOverview);
			$(div).append(showOverview);
				
				
			var button = $('<button type="button" class="showMoreInfo" id="'+i+'" > + Info </button>');
			$(div).append(button);
			
			$(button).on("click", function(){
				moreShowsInfo(this.id);
					$(button).off("click");	
			});	
			
			
			$('#interestingShows').append(div);
			
		});
		
		
}



//function with hidden information. Additional information will be shown with .show() on clicked button.

function moreShowsInfo(id){
		
		
								 
			var div = $('.show[id="'+id+'"]');				 
			var showYear = $ ('<p class="showYear" > Year: '+parsedShow[id].year+'</p>')
			var showGenre = $('<p class="showGenre"> Genres: ' + parsedShow[id].genres + '</p>');
			$(div).append(showGenre);
			
			
			$('.showMoreInfo[id="'+id+'"]').before( $(showYear) );
			$('.showMoreInfo[id="'+id+'"]').before( $(showGenre) );
			
}






//load botton

(function(ui,$,undefined) {


ui.initialize = function() {
	
	
	$("#loadData").on("click", function(event) {
		
		
		var div = $("<div id = 'episodesHeaderDiv'></div>");					 
			$(div).append($("<h1> Upcoming episodes:</h1>"));	
		$('#upcomingEpisodes').append(div);
		
		
		var button = $('<button type="button" id="changeSeasonColor">Change Season Color</button>');
		$("#episodesHeaderDiv").append(button);
		
		 $(button).click(function(){
  			  $(".episodeSeason").css("color", "#FF0000");
		});
		
		
		
									
		$.ajax( {type: "GET", url:"episodes.json", contentType: "application/json; charset=utf-8"}).done(
	
	
			//When The AJAX RETURNS
			function(episodes) { 
				performEpisodes(episodes);
				
			});
	
		var showsHeaderDiv = document.createElement("div");
		showsHeaderDiv.innerHTML = "<h1> Interesting Shows:</h1>";
		var interestingShows = document.getElementById("interestingShows");
		interestingShows.appendChild(showsHeaderDiv);
		
	
		$.ajax( {type: "GET", url:"shows.json", contentType: "application/json; charset=utf-8"}).done(
	
	
			//When The AJAX RETURNS
			function(shows) { 
				performShows(shows);
				
				
				
				
			});
		
		  $("#loadData").hide("click");
		  

	});
}

$( document ).ready( function() {
  ui.initialize();
});

})(window.ui = window.ui || {},jQuery)





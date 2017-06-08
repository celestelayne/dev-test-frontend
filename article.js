	function getReady(){
		var deferrerReady = $.Deferred();

		$(document).on("ready", function(){
			console.log("Sanity Check: JS is working!");
			deferrerReady.resolve();
		});
		return deferrerReady.promise();
	}

	// Setup
	// ------------------------------------------------
	
	var firstRequest = $.ajax({url: 'https://api.myjson.com/bins/4ivfh'}),
			secondRequest = $.ajax({url: 'https://api.myjson.com/bins/1saw9'});
	var dataStore = [];
	var table = $('table');
	var currentPage, numPerPage, numRows, numPages, maxPageNum;
	var $button;

	// Functions
	// ------------------------------------------------

	$.when( getReady(), firstRequest, secondRequest).done(function(readyResponse, firstResponse, secondResponse){
		var data = [].concat(firstResponse[0].articles).concat(secondResponse[0].more_articles);
		// console.log(firstResponse[0].articles, secondResponse[0].more_articles);
		// console.log(data);
		$.each(data, function(index, result){
			// var num = index;
			// console.log(index)
			// parse the data
			var image = result.image;
			var title = result.title;
			var words = result.words;
			var link = result.url;
			var author = result.profile.first_name + ' ' + result.profile.last_name;
			var publish_at = result.publish_at;
			var submitted = $.timeago(publish_at); 

			dataStore.push({
				// num: num,
				image: image,
				title: title,
				link: link,
				words: words,
				author: author,
				submitted: submitted
			});
		})
		compileAndDisplayTemplate(dataStore);
		paginate();
		table.tablesorter({
			// sort on the first column and second column in ascending order
			headers : {
	        // set "sorter : false" (no quotes) to disable the column
	        0: { sorter: "digit" },
	        1: { sorter: false },
	        2: { sorter: "text" },
	        3: { sorter: "url" }
	    },
	    sortList: [0,0],
	    // use save sort widget
	    widgets: ["saveSort"],
			selectorHeaders : 'thead th'
		});
	});

	function paginate(){
		$('table.pagination').each(function(){
			currentPage = 0;
			numPerPage = 10;
			table = $(this);

			// Attach handler to click event
			table.bind('repaginate', function(){
				table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show(); // slice(0, 10)
			});

			// Execute handler 
			table.trigger('repaginate');
			numRows = table.find('tbody tr').length;
			console.log(numRows); // total number of rows = 60
			numPages = Math.ceil(numRows / numPerPage); // returns the smallest integer greater than or equal to 60/6 i.e. 10
			console.log(numPages); // 6

			$button = $('<a class="waves-effect waves-light btn-large"></a>');
			$button.text('Load More');
			// console.log($button);
			$button.bind('click', function(){
				$("tr:hidden").slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
			});
			// Add button dynamically to end of page
			$button.insertAfter(table).addClass('active');
		});
	}

	// Handlebars
	// ---------------------------------------------
				
	function compileAndDisplayTemplate(article){
		console.log('rendering articles: ', article);
		// Grab contents of template
		var template = $("#article-template").html();
		// Compile into a handlebars template
		var compiledTemplate = Handlebars.compile(template);
		var htmlFromCompiledTemplate = compiledTemplate({ article: article });
		$('#results').html( htmlFromCompiledTemplate );
	}



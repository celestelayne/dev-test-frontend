	$('document').ready(function(){
// Variables
var currentPage, numPerPage, numRows, numPages, moredata;
var $button, $table;

// Get data
function getArticles(){
	$.when(
		getData('https://api.myjson.com/bins/4ivfh'), 
		getData( 'https://api.myjson.com/bins/1saw9'))
		.done( function( a1, a2 ){
				console.log(a1);
				console.log(a2);
	})
}
getArticles();

function getData(source) {
	console.log(source)
	// var url = 'https://api.myjson.com/bins/1saw9';
	$.ajax({
		type: 'GET',
		url: source,
		dataType: 'json',
		success: function(object){
			console.log(object)
				var a2 = $.map(object.more_articles, function(value, index) {
				    return [value];
				});
				var a1 = $.map(object.articles, function(value, index) {
				    return [value];
				});
				data = [].concat(a1).concat(a2);
				console.log(data)
		}
	})
}
// getData();

var moreRawData = [];
function callMoreData(data){
		moreRawData = data;
		console.log(moreRawData);
		a();
		xhrRequest();
		compileAndDisplayMoreTemplate();
		paginateMoreArticles();
		console.log('You have loaded more articles');
		$.each(data, function (index, dataItem) {
			// moredata = JSON.stringify(dataItem);
			// COnvert data to array
			// var array = Object.keys(data).map(function(key){
			// 	return data[key];
			// })
			var array = Array.prototype.slice.apply( dataItem )
			console.log(array); // DATA!!!!!!!!!!!!!
			var source = array;

			// var template = Handlebars.compile(source);
			// $('#output').append(template(array));		
		})
	}

var rawData = []; // object that holds data
function callback(data){
	// articles.json
	rawData = data;
	console.log(rawData);
	compileAndDisplayTemplate();
	paginate();
	// xhrRequest();
	// addNewData();
	// callMoreData();
}

function compileAndDisplayTemplate(){

	// Grab contents of template 
	var articles = $("#article-template").html();
	// console.log(articles)
	// Compile into a handlebars template
	var template = Handlebars.compile(articles);

	var html = template(rawData);
	// var result = template(moreRawData) 
	// console.log(result);
	$('#output').html(html);
}

function compileAndDisplayMoreTemplate(){
	// Grab contents of template 
	var articles = $("#article-template").html();
	console.log(articles)
	// Compile into a handlebars template
	// var template = Handlebars.compile(articles);

	// var html = template(rawData);
	// var result = template(moreRawData) 
	// console.log(result);
	// $('#output').html(html);
}


function paginate(){
	$('table.pagination').each(function(){
		currentPage = 0;
		numPerPage = 10;
		table = $(this);
		console.log($table);

		// Attach handler to click event
		table.bind('repaginate', function(){
			table
				.find('tbody tr')
				.hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
				.show(); // slice(0, 10)
		});

		// Execute handler 
		table.trigger('repaginate');
		numRows = table.find('tbody tr').length;
		console.log(numRows); // total number of rows = 30
		numPages = Math.ceil(numRows / numPerPage); // returns the smallest integer greater than or equal to 30/3 i.e. 10
		console.log(numPages); // 3

		$button = $('<a class="waves-effect waves-light btn-large"></a>');
		$button.text('Load More');
		console.log($button);
		$button.bind('click', function(e){
			e.preventDefault();
			console.log(e.target)
			if (currentPage < maxPageNum){
				currentPage = currentPage + 1;
				table.trigger('repaginate');
				$("tr:hidden").slice(0, 10).show();
			}
			
		});
		// Add button dynamically to end of page
		$button.insertAfter(table).addClass('active');
	});
}

function paginateMoreArticles() {
	$('table.pagination').each(function(){
		currentPage = 0;
		numPerPage = 10;
		$table = $(this);
		console.log($table);

		// Attach handler to click event
		$table.bind('repaginate', function(){
			$table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show(); // slice(0, 10)
		});

		// Execute handler 
		$table.trigger('repaginate');
		numRows = $table.find('tbody tr').length;
		console.log(numRows); // total number of rows = 30
		numPages = Math.ceil(numRows / numPerPage); // returns the smallest integer greater than or equal to 30/3 i.e. 10
		console.log(numPages); // 3

		$button = $('<button type="button" class="btn btn-primary btn-lg btn-block"></button>');
		$button.text('Load More');
		// console.log($button);
		$button.bind('click', function(){
			$("tr:hidden").slice(0, 10).show();
		});
		// Add button dynamically to end of page
		$button.insertAfter($table).addClass('active');
	});

}
	});



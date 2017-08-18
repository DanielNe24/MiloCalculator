var swiper;

function showResults( whichUse ) {

	var length = $( "#length" ).val();
	if (length == "" || !$.isNumeric(length) || length > 99.99) {alert('הכנס אורך (ערך מספרי עד 99.99)');return 'ERROR'; }
	var width = $( "#width" ).val();
	if (width == "" || !$.isNumeric(width) || width > 99.99 ) {alert('הכנס רוחב (ערך מספרי עד 99.99)');return 'ERROR'; }
	var height = $( "#height" ).val();
	if (height == "" || !$.isNumeric(height) || height > 99.99) {alert('הכנס גובה (ערך מספרי עד 99.99)');return 'ERROR'; }
	var diameter;
	if ( $( "#diameter" ).val() == null ) 
		diameter = 'unknown';
    else 
		diameter = $( "#diameter" ).val();
	
	var capacity = width * height * length;
	var use = $( "#use" ).val();
	
	switch(use) {

    	case 'homeToilet':Maxuse=10;Minuse=5;break;
    	case 'homeShower':Maxuse = 12;Minuse=8;break;
    	case 'homeKitchen':Maxuse = 15;Minuse=10;break;
    	case 'homeLiving':Maxuse = 8;Minuse=4;break;
    	case 'homeLundry':Maxuse = 12;Minuse=8;break;
    	case 'office':Maxuse = 10;Minuse=5;break;
    	case 'officeMitting':Maxuse = 12;Minuse=8;break;
    	case 'officeToilet':Maxuse = 15;Minuse=10;break;
    	case 'officeHollway':Maxuse = 12;Minuse=6;break;
    	case 'businessToilet':Maxuse = 18;Minuse=12;break;
    	case 'businessRestaurent':Maxuse = 12;Minuse=8;break;
    	case 'businessKitchen':Maxuse = 25;Minuse=15;break;
    	case 'businessClub':Maxuse = 30;Minuse=20;break;
    	case 'businessBalcony':Maxuse = 20;Minuse=12;break;
    	case 'businessBeauty':Maxuse = 20;Minuse=12;break;
    	case 'businessLundry':Maxuse = 20;Minuse=10;break;
    	case 'businessHealth':Maxuse = 12;Minuse=8;break;
    	case 'businessStore':Maxuse = 10;Minuse=6;break;
    	case 'publicClass':Maxuse = 15;Minuse=6;break;
    	case 'publicLibrary':Maxuse = 10;Minuse=6;break;
    	case 'publicSport':Maxuse = 15;Minuse=10;break;
    	case 'publicShower':Maxuse = 12;Minuse=8;break;
    	case 'industry':Maxuse = 15;Minuse=10;break;
    	case 'industryCar':Maxuse = 15;Minuse=10;break;
    	case 'industryGarage':Maxuse = 15;Minuse=10;break;
    	case 'industryLock':Maxuse = 30;Minuse=15;break;
    	case 'industryMachines':Maxuse = 15;Minuse=10;break;
    	case 'poision':Maxuse = 20;Minuse=15;break;
    	default:Maxuse = 17;Minuse=10;
	}

	switch(whichUse) {

		case 1: use=Maxuse;break;
		case 2: use=Minuse;break;
		case 3: use=Minuse*0.8;break;
		default:Maxuse = 17;Minuse=10;
	}
	var x = capacity * use;
	var pipe = $('input[name=radio]:checked', '#pipe').val();
	var y = 15;
	
	if (pipe != 'wall' && pipe != 'window') {

		var pipeLength = $( "#pipeLength" ).val();
		if (pipeLength == "" || !$.isNumeric(pipeLength) || pipeLength > 99.99) {alert('הכנס אורך צינור (ערך מספרי עד 99.99)');return 'ERROR'; }
		
		var pipeTurns = $( "#pipeTurns" ).val();
		if (pipeTurns == "" || !$.isNumeric(pipeTurns) || pipeTurns > 99.99 ) {alert('הכנס מספר כיפופים (ערך מספרי עד 99.99)');return 'ERROR'; }
		var pipeSum = pipeTurns + pipeLength;
		var contra;
		if (pipe == 'hard')
			contra = 4;
		else
			contra = 8;

		y = 15 + (parseFloat(pipeLength) + parseFloat(pipeTurns)) * parseFloat(contra);
	}
	console.log("User's coordinate is: (" + x + "," + y + ")");
	var matches = [];
	for (var i in Products) {
		console.log("Checking if: " + Products[i].DisplayName + " matches");
		console.log("Products diameter: " + Products[i].diameter + " diameter: " + diameter);

		if ((((pipe == 'wall') && (Products[i].wall == true)) 
			|| ((pipe == 'window') && (Products[i].window == true))
			|| ((pipe == 'soft') && (Products[i].pipe == true))
			|| ((pipe == 'hard') && (Products[i].pipe == true)))
			&& ((Products[i].diameter ==  parseInt(diameter)) 
			|| (diameter == 'unknown'))) {
	
			for (var j in Products[i].coordinates){
			
				var currCord = Products[i].coordinates[j];
				if (j == 0) {
					var prevCord = currCord;
				} else {
				var prevCord = Products[i].coordinates[j-1];
				}	
				if (x <= currCord[0]) {
					console.log("User's x is between: (" + prevCord[0] + "," + prevCord[1] + ") (" + currCord[0] + "," + currCord[1] + ")" );
					var val = evluateLine(line(prevCord[0],prevCord[1],currCord[0],currCord[1]),x);
					console.log("Evaluated y is: " + val );
					if (y <= val)  {
						matches.push(Products[i].DisplayName);
						console.log("MATCH: " + Products[i].DisplayName);
					}
					break;
				}
  			}
  		}
  	}

  	ProductsWithOtherDiameter = [];
  	ProductsWithOtherDiameter.push(Products[5]); // CB-250 PLUS 
  	ProductsWithOtherDiameter.push(Products[7]); // CB-100 PLUS
  	ProductsWithOtherDiameter[0].diameter = 6;
  	ProductsWithOtherDiameter[1].diameter = 6;

  	for (var i in ProductsWithOtherDiameter) {
		console.log("Checking if: " + ProductsWithOtherDiameter[i].DisplayName + " matches");
		console.log("Products diameter: " + ProductsWithOtherDiameter[i].diameter + " diameter: " + diameter);

		if ((((pipe == 'wall') && (ProductsWithOtherDiameter[i].wall == true)) 
			|| ((pipe == 'window') && (ProductsWithOtherDiameter[i].window == true))
			|| ((pipe == 'soft') && (ProductsWithOtherDiameter[i].pipe == true))
			|| ((pipe == 'hard') && (ProductsWithOtherDiameter[i].pipe == true)))
			&& ((ProductsWithOtherDiameter[i].diameter ==  parseInt(diameter)) 
			|| (diameter == 'unknown'))) {
	
			for (var j in ProductsWithOtherDiameter[i].coordinates){
			
				var currCord = ProductsWithOtherDiameter[i].coordinates[j];
				if (j == 0) {
					var prevCord = currCord;
				} else {
				var prevCord = ProductsWithOtherDiameter[i].coordinates[j-1];
				}	
				if (x <= currCord[0]) {
					console.log("User's x is between: (" + prevCord[0] + "," + prevCord[1] + ") (" + currCord[0] + "," + currCord[1] + ")" );
					var val = evluateLine(line(prevCord[0],prevCord[1],currCord[0],currCord[1]),x);
					console.log("Evaluated y is: " + val );
					if (y <= val)  {
						matches.push(ProductsWithOtherDiameter[i].DisplayName);
						console.log("MATCH: " + ProductsWithOtherDiameter[i].DisplayName);
					}
					break;
				}
  			}
  		}
  	}

  	if (pipeSum > 6) {
  		arr = ['E-100','E-150','B-10 PLUS','B-15 PLUS','LHV-190','LHV-300'];
  		for (var i in arr) {
			var index = $.inArray(arr[i], matches);
			if (index > 0)
				matches.splice(index, 1);
		}
  	}

  	return unique(matches);
}

function results() {
	
	$('.carousel').remove();
	var results = document.getElementById("results");
	var csl = document.createElement("div");
	csl.setAttribute("class", "carousel");
	csl.setAttribute("id", "carousel");
	csl.setAttribute("dir", "rtl");
	results.appendChild(csl);

	console.log('################################################')
	console.log('############## Trying by Max Use ###############');
	console.log('################################################')
	var matches = showResults(1);
	if (matches == 'ERROR')
		return;
	if ( matches.length == 0 ) {
	console.log('################################################')
	console.log('############## Trying by Min Use ###############');
	console.log('################################################')
	//matches = unique(matches.concat(showResults(2)));
	matches = showResults(2);
	}
	if ( matches.length == 0 ) {
		console.log('################################################')
		console.log('############ Trying by Min Use * 0.8 ###########');
		console.log('################################################')
		matches = showResults(3);
	}

	var diameter;
	if ( $( "#diameter" ).val() == null ) 
		diameter = 'unknown';
    else 
		diameter = $( "#diameter" ).val();
  	
    //document.getElementById("container").setAttribute("style", "height:500px")

	if  ( matches.length > 0 ) {

		if ($('#exportRes').length > 0) {
			$('#exportRes').remove();
		}
		if ($.inArray('DIL 100/130', matches) >= 0) {
			var index = $.inArray('DIL 100/130', matches);
			matches.splice(index, 1);
		}
		if ($.inArray('MT-150', matches) >= 0) {
			var index = $.inArray('MT-150', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 200/910 High Speed', matches) >= 0 ) && ( $.inArray('DIL 200/910 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 200/910 High Speed', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 150/560 High Speed', matches) >= 0 ) && ( $.inArray('DIL 150/560 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 150/560 High Speed', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 100/270 High Speed', matches) >= 0 ) && ( $.inArray('DIL 100/270 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 100/270 High Speed', matches);
			matches.splice(index, 1);
		}

		ifUnknown(matches);

		matches = matches.sort( function(a, b) {
			a_p = getPriority(a);
			b_p = getPriority(b);
    		if (a_p < b_p) 
        		return -1 
    		if (a_p > b_p)
        		return 1
   			return 0 
		}) 

		var pipe = $('input[name=radio]:checked', '#pipe').val();
		if (pipe == 'wall') 
			matches = matches.slice(0, 3);
		else
			matches = matches.slice(0, 5);
		
		for (var i in matches) {
			console.log("create tab for: " + matches[i])
			var currProd;
			for (var j in Products) {

				 if (Products[j].DisplayName == matches[i]) {
				 	currProd = Products[j];
				 	break;
				 }

			}
		 
		 var slide = document.createElement("div");
		 slide.setAttribute("class", "carousel-cell");
		 var img = document.createElement("img");
		 img.setAttribute("src", currProd.img)
		 img.setAttribute("alt", currProd.DisplayName)
		 slide.appendChild(img);
		 $( "#carousel" ).append( slide );
		 
		}

	} else {
		 var slide = document.createElement("div");
		 slide.setAttribute("class", "carousel-cell");
		 var img = document.createElement("img");
		 img.setAttribute("src", "images/NoRes.png");
		 img.setAttribute("alt", "NoRes")
		 slide.appendChild(img);
		 $( "#carousel" ).append( slide );
	}

	var $carousel = $('.carousel').flickity({
  		imagesLoaded: true,
  		rightToLeft: true,
  		percentPosition: false,
	});

	var $imgs = $carousel.find('.carousel-cell img');
	var docStyle = document.documentElement.style;
	var transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
	var flkty = $carousel.data('flickity');

	$carousel.on( 'scroll.flickity', function() {
  		flkty.slides.forEach( function( slide, i ) {
    		var img = $imgs[i];
    		var x = ( slide.target + flkty.x ) * -1/3;
    		img.style[ transformProp ] = 'translateX(' + x  + 'px)';
  		});
	});


	
}

function hideTab4() {

	var x = document.getElementById('pipeSet');
    x.style.display = 'none';

}

function showTab4() {
    
    var x = document.getElementById('pipeSet');
	x.style.display = 'block';

}

function fillSelect() {

	var generalUse = $( "#generalUse" ).val();
	$( "#use" ).empty();
	var fillWith;
	switch ( generalUse ) {
    	case 'home':
        	fillWith = [['שירותים (בלבד)','homeToilet']
        	,['מקלחת ושרותים','homeShower'],['מטבח','homeKitchen']
        	,['חדר מגורים','homeLiving'],['חדר כביסה','homeLundry']];
        	break;
    	case 'office':
      	  	fillWith = [['משרד','office'],['חדר ישיבות','officeMitting']
      	  	,['שירותים במשרד','officeToilet'],['מסדרון','officeHollway']];
        	break;
   		case 'business':
        	fillWith = [['שירותים בבית עסק','businessToilet']
        	,['מסעדה/ בית קפה (אזור ההסעדה)','businessRestaurent']
        	,['מטבח תעשייתי','businessKitchen'],['מספרה','businessBalcony']
        	,['מכון יופי','businessBeauty'],['מכבסה','businessLundry']
        	,['מרפאה','businessHealth'],['חנות','businessStore']];
        	break;
    	case 'public':
        	fillWith = [['משרד','office'],['כיתת לימוד','publicClass']
        	,['ספריה ציבורית','publicLibrary'],['שירותים ציבוריים','businessToilet']
        	,['אולם ספורט / חדר כושר','publicSport']
        	,['מלתחות- אזור לוקרים','publicShower']];
        	break; 
        case 'industry':
        	fillWith = [['מבנה תעשיה','industry']
        	,['מוסך','industryCar'],['מחסן','industryGarage']
        	,['מסגריה','industryLock'],['חדר מכונות','industryMachines']
        	,['מעבדה','poision'],['חלל ייצור','industryMachines']];
        	break; 
    	default:
        	fillWith = [];	 
	}
	
	$( "#use" ).append($("<option></option>")
                    .attr("selected","true")
                   	.attr("disabled","disabled")
                    .text("-- בחר --"));

	for (var i in fillWith) {
		$( "#use" ).append($("<option></option>")
                    .attr("value",fillWith[i][1])
                    .text(fillWith[i][0]));
	}

}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

function engineerMode() {

	$(".content").remove();	
	$( "#engineer" )[0].innerHTML = "חזור למצב רגיל"
	$( "#engineer" )[0].setAttribute("onclick","location.reload();")

	var div3 = $( "#console" ).prepend("<div class='content' id='forDiameter'>");
	var div2 = $( "#console" ).prepend("<div class='content' id='forResistance' dir='ltr'>");
	var div1 = $( "#console" ).prepend("<div class='content' id='forCfm' dir='ltr'>");
	$( "#forCfm" ).append("CFM: <input type='text' class='textInput' id='cfm'>");
	$( "#forResistance" ).append("Pa: <input type='text' class='textInput' id='resistance'>");
	$( "#forDiameter" ).append('קוטר: <select id="diameter"><option selected="true" disabled="disabled">בחר קוטר</option><option value="4">4"</option><option value="6">6"</option><option value="8">8"</option><option value="12">12"</option><option value="unknown">לא ידוע</option></select> (צול)');
	$( "#res" ).attr('onclick', 'engResults()');

}

function engResults() {

	$('.carousel').remove();
	if ($( "#cfm" ).val() == "" || !$.isNumeric($( "#cfm" ).val())) {alert('Enter numeric CFM');return 'ERROR'; }
	var x = $( "#cfm" ).val() * 1.7;
	var y = $( "#resistance" ).val();
	if ( y == "" || !$.isNumeric(y)) {alert('Enter numeric Pa');return 'ERROR'; }

	var diameter;
	if ( $( "#diameter" ).val() == null ) 
		diameter = 'unknown';
   	else 
		diameter = $( "#diameter" ).val();

	var matches = showResultsEng(x, y, diameter);

	var results = document.getElementById("results");
	var csl = document.createElement("div");
	csl.setAttribute("class", "carousel");
	csl.setAttribute("id", "carousel");
	csl.setAttribute("dir", "rtl");
	results.appendChild(csl);


	if  ( matches.length > 0 ) {

  		ifUnknown(matches);
  	

		if ($('#exportRes').length > 0) {
			$('#exportRes').remove();
		}

		if ( ( $.inArray('DIL 200/910 High Speed', matches) >= 0 ) && ( $.inArray('DIL 200/910 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 200/910 High Speed', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 150/560 High Speed', matches) >= 0 ) && ( $.inArray('DIL 150/560 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 150/560 High Speed', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 100/270 High Speed', matches) >= 0 ) && ( $.inArray('DIL 100/270 Low Speed', matches) >= 0 ) ) {
			var index = $.inArray('DIL 100/270 High Speed', matches);
			matches.splice(index, 1);
		}

		matches = matches.sort( function(a, b) {
			a_p = getPriority(a);
			b_p = getPriority(b);
    		if (a_p < b_p) 
        		return -1 
    		if (a_p > b_p)
        		return 1
   			return 0 
		}) 


		for (var i in matches) {
			console.log("create tab for: " + matches[i])
			var currProd;
			for (var j in Products) {

				 if (Products[j].DisplayName == matches[i]) {
				 	currProd = Products[j];
				 	break;
				 }

			}
		 
		 var slide = document.createElement("div");
		 slide.setAttribute("class", "carousel-cell");
		 var img = document.createElement("img");
		 img.setAttribute("src", currProd.img)
		 img.setAttribute("alt", currProd.DisplayName)
		 slide.appendChild(img);
		 $( "#carousel" ).append( slide );
		 
		}

	} else {
		 var slide = document.createElement("div");
		 slide.setAttribute("class", "carousel-cell");
		 var img = document.createElement("img");
		 img.setAttribute("src", "images/NoRes.png")
		 slide.appendChild(img);
		 $( "#carousel" ).append( slide );
	}

	var $carousel = $('.carousel').flickity({
  		imagesLoaded: true,
  		rightToLeft: true,
  		percentPosition: false,
	});

	var $imgs = $carousel.find('.carousel-cell img');
	var docStyle = document.documentElement.style;
	var transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
	var flkty = $carousel.data('flickity');

	$carousel.on( 'scroll.flickity', function() {
  		flkty.slides.forEach( function( slide, i ) {
    		var img = $imgs[i];
    		var x = ( slide.target + flkty.x ) * -1/3;
    		img.style[ transformProp ] = 'translateX(' + x  + 'px)';
  		});
	});



}

function showResultsEng ( x , y, diameter) {


	console.log("User's coordinate is: (" + x + "," + y + ")");
	var matches = [];
	for (var i in Products) {
		console.log("Checking if: " + Products[i].DisplayName + " matches");
		console.log("Products diameter: " + Products[i].diameter + " diameter: " + diameter);

		if (((Products[i].diameter ==  parseInt(diameter)) || (diameter == 'unknown'))) {
	
			for (var j in Products[i].coordinates){
			
				var currCord = Products[i].coordinates[j];
				if (j == 0) {
					var prevCord = currCord;
				} else {
				var prevCord = Products[i].coordinates[j-1];
				}	
				if (x <= currCord[0]) {
					console.log("User's x is between: (" + prevCord[0] + "," + prevCord[1] + ") (" + currCord[0] + "," + currCord[1] + ")" );
					var val = evluateLine(line(prevCord[0],prevCord[1],currCord[0],currCord[1]),x);
					console.log("Evaluated y is: " + val );
					if (y <= val)  {
						matches.push(Products[i].DisplayName);
						console.log("MATCH: " + Products[i].DisplayName);
					}
					break;
				}
  			}
  		}
  	}

	return matches;
}

function getPriority( element ) {
	for (var j in Products) {
		if ( Products[j].DisplayName == element ) 
			return Products[j].priority;
	}
}

function ifUnknown(matches){

	if ( ( $.inArray('E-100', matches) >= 0 ) && ( $.inArray('E-150', matches) >= 0 ) ) {
			var index = $.inArray('E-150', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('B-10 PLUS', matches) >= 0 ) && ( $.inArray('B-15 PLUS', matches) >= 0 ) ) {
			var index = $.inArray('B-15 PLUS', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('LHV-190', matches) >= 0 ) && ( $.inArray('LHV-300', matches) >= 0 ) ) {
			var index = $.inArray('LHV-300', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('CB-100', matches) >= 0 ) && ( $.inArray('CB-250 PLUS', matches) >= 0 ) ) {
			var index = $.inArray('CB-250 PLUS', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 100/130', matches) >= 0 )) {
			arr = ['DIL 100/270 Low Speed', 'DIL 100/270 High Speed'
			, 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 100/270 Low Speed', matches) >= 0 )) {
			arr = ['DIL 100/270 High Speed', 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 100/270 High Speed', matches) >= 0 )) {
			arr = ['DIL 100/130', 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 150/560 Low Speed', matches) >= 0 )) {
			arr = ['DIL 150/560 High Speed','DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 150/560 High Speed', matches) >= 0 )) {
			arr = ['DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 200/910 Low Speed', matches) >= 0 )) {
			arr = ['DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index >= 0)
					matches.splice(index, 1);
			}
		}

}

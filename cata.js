function showResults( whichUse ) {

	var length = $( "#length" ).val();
	if (length == "" || !$.isNumeric(length)) {alert('הכנס אורך (ערך מספרי)');return 'ERROR'; }
	var width = $( "#width" ).val();
	if (width == "" || !$.isNumeric(width)) {alert('הכנס רוחב (ערך מספרי)');return 'ERROR'; }
	var height = $( "#height" ).val();
	if (height == "" || !$.isNumeric(height)) {alert('הכנס גובה (ערך מספרי)');return 'ERROR'; }
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
		if (pipeLength == "" || !$.isNumeric(pipeLength)) {alert('הכנס אורך צינור (ערך מספרי)');return 'ERROR'; }
		
		var pipeTurns = $( "#pipeTurns" ).val();
		if (pipeTurns == "" || !$.isNumeric(pipeTurns)) {alert('הכנס מספר כיפופים (ערך מספרי)');return 'ERROR'; }
		
		var contra;
		if (pipe == 'hard')
			contra = 2.5;
		else
			contra = 5;

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

  	return matches;
}

function results() {
	
	$( "#resultsViewer" ).empty();
	console.log('################################################')
	console.log('############## Trying by Max Use ###############');
	console.log('################################################')
	var matches = showResults(1);
	if (matches == 'ERROR')
		return;
	console.log('################################################')
	console.log('############## Trying by Min Use ###############');
	console.log('################################################')
	matches = unique(matches.concat(showResults(2)));
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

	if (diameter == 'unknown') {
  		ifUnknown(matches);
  	}
	
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        nested: true,
        speed: 600,
        height: 600,
    });	
    document.getElementById("container").setAttribute("style", "height:500px")


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

		matches = matches.sort( function(a, b) {
			a_p = getPriority(a);
			b_p = getPriority(b);
    		if (a_p < b_p) 
        		return -1 
    		if (a_p > b_p)
        		return 1
   			return 0 
		}) 

		matches = matches.slice(0, 3);

		var results = document.getElementById("results");
		var button = document.createElement("button");
		var a = document.createElement("a");
		button.appendChild(a);
		results.appendChild(button);
		button.setAttribute("style","width:100%;background-color: #008CBA;")
		button.setAttribute("id","exportRes")
		a.setAttribute("style", "color:white;")
		a.download = "Cata_Results.txt";
		a.href = "data:text/plain;base64," + btoa(matches);
		a.innerHTML = "הורדת תוצאות";

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
		 slide.setAttribute("class", "swiper-slide");
		 slide.setAttribute("style", "background-image:url(" + currProd.img + ");max-width: 100%;height: auto;width: auto\9;background-repeat: no-repeat;background-size:100% 100%;");
		 var title = document.createElement("div");
		 title.setAttribute("class", "title");
		 title.setAttribute("data-swiper-parallax", "-100");
		 title.setAttribute("style", "color:black;");
		 title.innerHTML = currProd.DisplayName;
		 slide.appendChild(title);
		 //var subTitle = document.createElement("div");
		 //subTitle.setAttribute("class", "subtitle");
		 //subTitle.setAttribute("data-swiper-parallax", "-200");
		 //subTitle.setAttribute("style", "color:black;");
		 //subTitle.innerHTML = "דגם מאוד נחמד";
		 //slide.appendChild(subTitle);
		 var description = document.createElement("div");
		 description.setAttribute("class", "text");
		 description.setAttribute("data-swiper-parallax", "-300");
		 description.setAttribute("style", "float:right;");
		 var text = document.createElement("p");
		 text.setAttribute("style", "color:black;");
		 text.innerHTML = "הסבר קצר וטכני על הדגם הנחמד"
		 description.appendChild(text);
		 slide.appendChild(description);
		 $( "#resultsViewer" ).append( slide );
		 
		}

		reinitSwiper(swiper);
	} else {
		var slide = document.createElement("div");
		 slide.setAttribute("class", "swiper-slide");
		 slide.setAttribute("style", "background-image:url(http://uri.mitkadem.co.il/blog/white-800x600.gif);max-width: 100%;height: auto;width: auto\9;");
		 var title = document.createElement("div");
		 title.setAttribute("class", "title");
		 title.setAttribute("data-swiper-parallax", "-100");
		 title.setAttribute("style", "color:black;");
		 title.innerHTML = "מצטערים לא נמצאו תוצאות.. \n אנא פנה אלינו בלשונית צור קשר";
		 slide.appendChild(title);
		 $( "#resultsViewer" ).append( slide );
	}
}

function reinitSwiper(swiper) {
  setTimeout(function () {
   swiper.update();
  }, 500);
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
        	,['מקלחת','homeShower'],['מטבח','homeKitchen']
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

function calcVol() {

	var width = $( "#width" ).val();
	var height = $( "#height" ).val();
	var length = $( "#length" ).val();
	if (width && height && length) 
		$( "#volume" ).val(width * height * length); 
		

}

function engResults() {

	
	if ($( "#cfm" ).val() == "" || !$.isNumeric($( "#cfm" ).val())) {alert('Enter numeric CFM');return 'ERROR'; }
	var x = $( "#cfm" ).val() * 1.7;
	var y = $( "#resistance" ).val();
	if ( y == "" || !$.isNumeric(y)) {alert('Enter numeric Pa');return 'ERROR'; }


	var swiper = new Swiper('.swiper-container', {
        	pagination: '.swiper-pagination',
        	paginationClickable: true,
        	nextButton: '.swiper-button-next',
        	prevButton: '.swiper-button-prev',
        	nested: true,
        	speed: 600,
        	height: 600,
    });	
    document.getElementById("container").setAttribute("style", "height:500px")
	$( "#resultsViewer" ).empty();
	var matches = showResultsEng(x, y, diameter);

	if  ( matches.length > 0 ) {

		var diameter;
		if ( $( "#diameter" ).val() == null ) 
			diameter = 'unknown';
   		else 
			diameter = $( "#diameter" ).val();

		if (diameter == 'unknown') {
  			ifUnknown(matches);
  		}

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

		//matches = matches.slice(0, 3);

		var results = document.getElementById("results");
		var button = document.createElement("button");
		var a = document.createElement("a");
		button.appendChild(a);
		results.appendChild(button);
		button.setAttribute("style","width:100%;background-color: #008CBA;")
		button.setAttribute("id","exportRes")
		a.setAttribute("style", "color:white;")
		a.download = "Cata_Results.txt";
		a.href = "data:text/plain;base64," + btoa(matches);
		a.innerHTML = "הורדת תוצאות";

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
		 slide.setAttribute("class", "swiper-slide");
		 slide.setAttribute("style", "background-image:url(" + currProd.img + ");max-width: 100%;height: auto;width: auto\9;background-repeat: no-repeat;background-size:100% 100%;");
		 var title = document.createElement("div");
		 title.setAttribute("class", "title");
		 title.setAttribute("data-swiper-parallax", "-100");
		 title.setAttribute("style", "color:black;");
		 title.innerHTML = currProd.DisplayName;
		 slide.appendChild(title);
		 //var subTitle = document.createElement("div");
		 //subTitle.setAttribute("class", "subtitle");
		 //subTitle.setAttribute("data-swiper-parallax", "-200");
		 //subTitle.setAttribute("style", "color:black;");
		 //subTitle.innerHTML = "דגם מאוד נחמד";
		 //slide.appendChild(subTitle);
		 var description = document.createElement("div");
		 description.setAttribute("class", "text");
		 description.setAttribute("data-swiper-parallax", "-300");
		 description.setAttribute("style", "float:right;");
		 var text = document.createElement("p");
		 text.setAttribute("style", "color:black;");
		 text.innerHTML = "הסבר קצר וטכני על הדגם הנחמד"
		 description.appendChild(text);
		 slide.appendChild(description);
		 $( "#resultsViewer" ).append( slide );
		 
		}

		reinitSwiper(swiper);
	} else {
		var slide = document.createElement("div");
		 slide.setAttribute("class", "swiper-slide");
		 slide.setAttribute("style", "background-image:url(http://uri.mitkadem.co.il/blog/white-800x600.gif);max-width: 100%;height: auto;width: auto\9;");
		 var title = document.createElement("div");
		 title.setAttribute("class", "title");
		 title.setAttribute("data-swiper-parallax", "-100");
		 title.setAttribute("style", "color:black;");
		 title.innerHTML = "מצטערים לא נמצאו תוצאות.. \n אנא פנה אלינו בלשונית צור קשר";
		 slide.appendChild(title);
		 $( "#resultsViewer" ).append( slide );
	}



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
		if ( ( $.inArray('CB-100', matches) >= 0 ) && ( $.inArray('CB-100 PLUS', matches) >= 0 ) ) {
			var index = $.inArray('CB-100 PLUS', matches);
			matches.splice(index, 1);
		}
		if ( ( $.inArray('DIL 100/130', matches) >= 0 )) {
			arr = ['DIL 100/270 Low Speed', 'DIL 100/270 High Speed'
			, 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 100/270 Low Speed', matches) >= 0 )) {
			arr = ['DIL 100/270 High Speed', 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 100/270 High Speed', matches) >= 0 )) {
			arr = ['DIL 100/130', 'DIL 150/560 Low Speed', 'DIL 150/560 High Speed'
			,'DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 150/560 Low Speed', matches) >= 0 )) {
			arr = ['DIL 150/560 High Speed','DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 150/560 High Speed', matches) >= 0 )) {
			arr = ['DIL 200/910 Low Speed', 'DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}
		if ( ( $.inArray('DIL 200/910 Low Speed', matches) >= 0 )) {
			arr = ['DIL 200/910 High Speed']
			for (var i in arr) {
				var index = $.inArray(arr[i], matches);
				if (index > 0)
					matches.splice(index, 1);
			}
		}

}

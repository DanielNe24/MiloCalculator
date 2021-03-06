function loadData() {

LHV300 = {};
LHV300.coordinates = [[0,36.8],[50,36.8],[100,36.8],[300,36.8],[350,36.8],[400,34.3],[500,31.5],[700,25.5],[900,20],[1100,14],[1300,5.8],[1450,0]];
LHV300.DisplayName = 'LHV-300';
LHV300.img = 'images/LHV300.png';
LHV300.window = true;
LHV300.wall = true;
LHV300.pipe = false;
LHV300.diameter = 12;
LHV300.priority = 3;
LHV190 = {};
LHV190.coordinates = [[0,20.8],[50,20.8],[100,20.8],[150,20.8],[170,20.8],[200,19.5],[250,18],[300,16],[350,14.2],[400,12.5],[450,11],[500,9.2],[550,7],[600,4.7],[700,0]];
LHV190.DisplayName = 'LHV-190';
LHV190.img = 'images/LHV190.png'
LHV190.window = true;
LHV190.wall = true;
LHV190.pipe = false;
LHV190.diameter = 8;
LHV190.priority = 3;
E150 = {};
E150.coordinates = [[0,48],[76,48],[88,48],[96,48],[105,46],[116,42],[130,38],[140,36],[160,34],[175,33],[207,31],[217,30],[247,27],[289,20],[315,12],[338,4],[350,0]];
E150.DisplayName = 'E-150';
E150.img = 'images/E150.png';
E150.window = false;
E150.wall = true;
E150.pipe = true;
E150.diameter = 6;
E150.priority = 1;
E100 = {};
E100.coordinates = [[0,24],[25,24],[29,24],[30,24],[35,22],[38,20],[43,18],[46,17],[53,16],[58,16],[68,15],[71,15],[81,13],[95,9],[104,6],[111,2],[115,0]];
E100.DisplayName = 'E-100';
E100.img = 'images/E100.png';
E100.window = false;
E100.wall = true;
E100.pipe = true;
E100.diameter = 4;
E100.priority = 1;
DIL100130 = {};
DIL100130.coordinates = [[0,98],[10,98],[20,98],[30,98],[38,98],[40,98],[50,98],[60,99],[70,100],[75,100],[80,95],[90,78],[100,60],[110,40],[120,20],[130,0]];
DIL100130.DisplayName = 'DIL 100/130';
DIL100130.img = 'images/DIL100130.png';
DIL100130.window = false;
DIL100130.wall = false;
DIL100130.pipe = true;
DIL100130.diameter = 4;
DIL100130.priority = 4;
CB250PLUS = {};
CB250PLUS.coordinates = [[0,230],[10,230],[20,230],[30,230],[40,230],[50,230],[60,230],[70,230],[80,230],[90,230],[100,230],[110,230],[120,229],[130,28],[140,225],[150,220],[160,215],[170,209],[180,202],[190,193],[200,180],[210,162],[220,143],[230,118],[240,95],[250,70],[260,40],[270,0]];
CB250PLUS.DisplayName = 'CB-250 PLUS';
CB250PLUS.img = 'images/CB250PLUS.png';
CB250PLUS.window = false;
CB250PLUS.wall = true;
CB250PLUS.pipe = true;
CB250PLUS.diameter = 4;
CB250PLUS.priority = 5;
CB100 = {};
CB100.coordinates = [[0,97.6],[5,97.6],[10,97.6],[15,97.6],[20,97.6],[25,97.6],[30,97.6],[35,97.6],[40,97.6],[40,97.6],[45,94],[50,90],[55,86],[60,82],[65,76],[70,68],[75,60],[80,52],[85,42],[90,31],[95,21],[100,10],[105,0]];
CB100.DisplayName = 'CB-100';
CB100.img = 'images/CB100.png';
CB100.window = false;
CB100.wall = false;
CB100.pipe = true;
CB100.diameter = 4;
CB100.priority = 5;
CB100PLUS = {};
CB100PLUS.coordinates = [[0,118],[10,118],[20,118],[30,118],[40,118],[50,118],[60,115],[70,112],[80,108],[90,102],[100,90],[110,69],[120,35],[130,0]];
CB100PLUS.DisplayName = 'CB-100 PLUS';
CB100PLUS.img = 'images/CB100PLUS.png';
CB100PLUS.window = false;
CB100PLUS.wall = false;
CB100PLUS.pipe = true;
CB100PLUS.diameter = 4;
CB100PLUS.priority = 5;
B15_B15PLUS = {};
B15_B15PLUS.coordinates = [[0,64],[10,64],[20,64],[30,64],[35,64],[40,64],[50,63],[60,60],[70,58],[75,57],[80,56],[90,54],[100,53],[110,52],[120,51.5],[130,51.6],[140,51],[150,50],[160,49],[170,48],[180,47],[190,46],[200,45],[210,44],[220,43],[230,42],[240,40],[250,38],[260,35],[270,32],[280,29],[290,25],[300,20],[310,12],[320,0]];
B15_B15PLUS.DisplayName = 'B-15 PLUS';
B15_B15PLUS.img = 'images/B15PLUS.png'; 
B15_B15PLUS.window = false;
B15_B15PLUS.wall = true;
B15_B15PLUS.pipe = true;
B15_B15PLUS.diameter = 6;
B15_B15PLUS.priority = 2;
B10_B10PLUS = {};
B10_B10PLUS.coordinates = [[0,26],[10,26],[20,26],[21,26],[25,25],[30,23.3],[40,19.5],[50,17],[60,13],[70,7.7],[80,5],[95,2],[105,0]];
B10_B10PLUS.DisplayName = 'B-10 PLUS';
B10_B10PLUS.img = 'images/B10PL.png';
B10_B10PLUS.window = false;
B10_B10PLUS.wall = true;
B10_B10PLUS.pipe = true;
B10_B10PLUS.diameter = 4;
B10_B10PLUS.priority = 2;
MT150 ={};
MT150.coordinates = [[0,65],[50,65],[100,59],[150,50],[200,40],[250,30],[300,25],[330,0]];
MT150.DisplayName = 'MT-150';
MT150.img = 'images/MT150.png';
MT150.window = false;
MT150.wall = false;
MT150.pipe = true;
MT150.diameter = 6;
MT150.priority = 7;
DIL100270LS = {};
DIL100270LS.coordinates = [[0,100.8],[45,100.8],[50,96],[62.5,90],[100,75],[131.25,66],[150,60],[168.75,48],[175,30],[187.5,0]];
DIL100270LS.DisplayName = 'DIL 100/270 Low Speed';
DIL100270LS.img = 'images/DIL100270LS.png';
DIL100270LS.window = false;
DIL100270LS.wall = false;
DIL100270LS.pipe = true;
DIL100270LS.diameter = 4;
DIL100270LS.priority = 4;
DIL100270HS = {};
DIL100270HS.coordinates = [[0,144],[50,144],[56.25,144],[80,140],[100,120],[112.5,114],[150,102],[200,90],[237.5,60],[250,42],[269,0]];
DIL100270HS.DisplayName = 'DIL 100/270 High Speed';
DIL100270HS.img = 'images/DIL100270HS.png';
DIL100270HS.window = false;
DIL100270HS.wall = false;
DIL100270HS.pipe = true;
DIL100270HS.diameter = 4;
DIL100270HS.priority = 4;
DIL150560LS = {};
DIL150560LS.coordinates = [[0,201.6],[12.5,201.6],[68.75,201.6],[80,192],[100,182],[131.25,180],[200,168],[268.75,156],[300,138],[318.75,120],[375,60],[400,20],[425,0]];
DIL150560LS.DisplayName = 'DIL 150/560 Low Speed';
DIL150560LS.img = 'images/DIL150560LS.png';
DIL150560LS.window = false;
DIL150560LS.wall = false;
DIL150560LS.pipe = true;
DIL150560LS.diameter = 6;
DIL150560LS.priority = 4;
DIL150560HS = {};
DIL150560HS.coordinates = [[0,268.8],[50,268.8],[80,268.8],[100,264],[200,240],[269,235],[300,228],[400,180],[468.75,120],[500,84],[531.25,60],[590,0]];
DIL150560HS.DisplayName = 'DIL 150/560 High Speed';
DIL150560HS.img = 'images/DIL150560HS.png';
DIL150560HS.window = false;
DIL150560HS.wall = false;
DIL150560HS.pipe = true;
DIL150560HS.diameter = 6;
DIL150560HS.priority = 4;
DIL200910LS = {};
DIL200910LS.coordinates = [[0.0,186.6],[105.3,186.6],[190,186.6],[200.0,187.5],[400.0,175.0],[505.3,166.7],[557.9,150.0],[600.0,116.7],[621.1,100.0],[663.2,50.0],[726.3,0.0]];
DIL200910LS.DisplayName = 'DIL 200/910 Low Speed';
DIL200910LS.img = 'images/DIL200910LS.png';
DIL200910LS.window = false;
DIL200910LS.wall = false;
DIL200910LS.pipe = true;
DIL200910LS.diameter = 8;
DIL200910LS.priority = 4;
DIL200910HS = {};
DIL200910HS.coordinates = [[0.00,220.83],[73.68,220.83],[200.00,220.83],[400.00,216.67],[600.00,208.33],[642.11,200.00],[705.26,179.17],[747.37,150.00],[800.00,108.33],[852.63,50.00],[905.26,0.00]];
DIL200910HS.DisplayName = 'DIL 200/910 High Speed';
DIL200910HS.img = 'images/DIL200910HS.png';
DIL200910HS.window = false;
DIL200910HS.wall = false;
DIL200910HS.pipe = true;
DIL200910HS.diameter = 8;
DIL200910HS.priority = 4;
Products = [];
Products.push(LHV300,LHV190,E100,E150,DIL100130,CB250PLUS,CB100,CB100PLUS,B15_B15PLUS,B10_B10PLUS,DIL100270LS,DIL100270HS,DIL150560LS,DIL150560HS,DIL200910LS,DIL200910HS);

}

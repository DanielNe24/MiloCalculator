function line(x1,y1,x2,y2) {

	var m = (y1  -  y2) / (x1 - x2)
	var y  = m + " *  (x - " + x1 + ") + " + y1
	return y
	
}

function evluateLine(line,value) {

	return math.eval(line.replace("x",value))

}

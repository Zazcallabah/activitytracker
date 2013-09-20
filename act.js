function Activity( name, settings )
{
	if( settings === undefined )
		settings = {};
	this.name = name;
	this.br = name === "br";
	this.pace = settings.pace || 30;
	this.slow_days = settings.slow_days || 0;
	this.slow_init = settings.slow_init || 10;
	this.slow_slope = settings.slow_slope || 5;
	this.init = settings.init || 10;
	this.slope = settings.slope || 5;
	this.rest = settings.rest || 4;
}

Activity.prototype.getMessageOfTheDay=function( day ){
    if( day === 0 )
        return "";
    if( day % this.rest === 0 )
        return "rest";
    var dayoffset = Math.ceil( day/this.rest);
	if( day > this.pace )
		return this.getMessageOfTheDay( this.pace );
    if( day < this.slow_days )
        return Math.ceil((this.slow_init + (day-dayoffset)*this.slow_slope)) + " " + this.name;
    else
        return Math.ceil((this.init + (day-dayoffset)*this.slope)) + " " + this.name;
}

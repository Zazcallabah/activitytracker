
describe('activity', function(){
	it('has a name', function(){
		var a = new Activity("name");
		expect( a.name ).toBe( "name" );
	});
	it('can be linebreak', function(){
		var a = new Activity("br");
		expect( a.br ).toBe( true );
		var b = new Activity("notbr");
		expect( b.br ).toBe( false );
	});
	it('has numbers', function(){
        var a = new Activity("name",{init:10,slope:1});
        expect( a.init ).toBe( 10 );
        expect( a.slope ).toBe( 1 );
    });
	it('returns nothing when given a dumb number', function(){
	    var a = new Activity("n",{init:10,slope:1});
	    expect(a.getMessageOfTheDay(0)).toBe( "" );
    });
    it('returns startcount when requesting message of the first day', function(){
        var a = new Activity("n",{init:10,slope:1});
        expect(a.getMessageOfTheDay(1)).toBe( "10 n" );
    });
    it('returns progressively larger values for following days', function(){
        var a = new Activity("n",{init:10,slope:3});
        expect(a.getMessageOfTheDay(2)).toBe( "13 n" );
        expect(a.getMessageOfTheDay(3)).toBe( "16 n" );
    });
    it('returns the string rest on rest days', function(){
        var a = new Activity("n",{init:10,slope:3});
        expect(a.getMessageOfTheDay(4)).toBe( "rest" );
    });
    it('returns correct numbers on days after rest day', function(){
        var a = new Activity("n",{init:10,slope:3});
        expect(a.getMessageOfTheDay(5)).toBe( "19 n" );
        expect(a.getMessageOfTheDay(6)).toBe( "22 n" );
        expect(a.getMessageOfTheDay(7)).toBe( "25 n" );
        expect(a.getMessageOfTheDay(8)).toBe( "rest" );
        expect(a.getMessageOfTheDay(9)).toBe( "28 n" );
        expect(a.getMessageOfTheDay(10)).toBe( "31 n" );
    });
});

describe('activities',function(){
var activities = [
new Activity("a",{init:15,slope:5}),
new Activity("b",{init:-20,slope:10,slow_days:9,slow_init:5,slow_slope:5}),
new Activity("c",{init:5,slope:2.5}),
new Activity("br"),
new Activity("d",{init:10,slope:5}),

];
    it('can handle decimal numbers ok',function(){
        expect(activities[1].getMessageOfTheDay(1)).toBe("5 b");
        expect(activities[1].getMessageOfTheDay(2)).toBe("10 b");
        expect(activities[1].getMessageOfTheDay(3)).toBe("15 b");
    });
    it('holds for arbitrary values',function(){
        expect(activities[1].getMessageOfTheDay(20)).toBe("rest");
        expect(activities[0].getMessageOfTheDay(23)).toBe("100 a");
        expect(activities[1].getMessageOfTheDay(9)).toBe("40 b");
        expect(activities[1].getMessageOfTheDay(7)).toBe("30 b");
    });
    it('holds for final day values',function(){
        expect(activities[0].getMessageOfTheDay(30)).toBe("125 a");
        expect(activities[1].getMessageOfTheDay(30)).toBe("200 b");
        expect(activities[2].getMessageOfTheDay(30)).toBe("60 c");
        expect(activities[4].getMessageOfTheDay(30)).toBe("120 d");
    });
	    it('stops at final day values for subsequent days',function(){
        expect(activities[0].getMessageOfTheDay(35)).toBe("125 a");
        expect(activities[1].getMessageOfTheDay(35)).toBe("200 b");
        expect(activities[2].getMessageOfTheDay(35)).toBe("60 c");
        expect(activities[4].getMessageOfTheDay(35)).toBe("120 d");
    });

});
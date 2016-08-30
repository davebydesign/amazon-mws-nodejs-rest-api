
module.exports = {	
	isEAN13              : isEAN13,
	isUPC : isUPC,
	calcISBNChecksum     : calcISBNChecksum,
	convertEAN13toISBN10 : convertEAN13toISBN10,
	randomizeUserAgent   : randomizeUserAgent,
	formatMySQLDateFromMWS : formatMySQLDateFromMWS
};
	

var 
	S         = require('string'),
	random = require("random-js")(); // uses the nativeMath engine	

function isEAN13(input) {
	if (input.length !== 13) return false;

    var 
		pos1  = Number(input.substr(0,1)),
		pos2  = Number(input.substr(1,1)),
		pos3  = Number(input.substr(2,1)),
		pos4  = Number(input.substr(3,1)),
		pos5  = Number(input.substr(4,1)),
		pos6  = Number(input.substr(5,1)),
		pos7  = Number(input.substr(6,1)),
		pos8  = Number(input.substr(7,1)),
		pos9  = Number(input.substr(8,1)),
		pos10 = Number(input.substr(9,1)),
		pos11 = Number(input.substr(10,1)),
		pos12 = Number(input.substr(11,1)),
		pos13 = Number(input.substr(12,1)),

		sumevens = (pos2 + pos4 + pos6 + pos8 + pos10 + pos12) * 3,
		sumodds  = pos1 + pos3 + pos5 + pos7 + pos9 + pos11,
		sum      = sumodds + sumevens,
		checksum = 10 - (sum % 10);

    if (checksum == 10) {
        checksum = 0;
    }
	
	return (input.length==13 && checksum==pos13);
}

function isUPC(N) {
	if (N.length !== 12) return false;
	var result, checksum;

	result = (N[0] + N[2] + N[4] + N[6] + N[8] + N[10]) * 3;
	result = N[1] + N[3] + N[5] + N[7] + N[9]  + result;
	result = result % 10;

	checksum = (result !== 0) ? 10-result : result;
	return (checksum === N[11]); 
}

/*
	public static function is_upca($N) {
	    if (strlen($N)!=12) return false; 
	    $result = ($N[0] + $N[2] + $N[4] + $N[6] + $N[8] + $N[10]) * 3;
	    $result = $N[1] + $N[3] + $N[5] + $N[7] + $N[9]  + $result;
	    $result = $result % 10;
	    
	    $checksum = ($result != 0) ? 10-$result : $result;
	    
	    return ($checksum==$N[11]); 
	}
 */


function calcISBNChecksum(isbn) {
  var d0=Number(isbn.substr(0,1));
  var d1=Number(isbn.substr(1,1));
  var d2=Number(isbn.substr(2,1));
  var d3=Number(isbn.substr(3,1));
  var d4=Number(isbn.substr(4,1));
  var d5=Number(isbn.substr(5,1));
  var d6=Number(isbn.substr(6,1));
  var d7=Number(isbn.substr(7,1));
  var d8=Number(isbn.substr(8,1));
  var checkdigit = 0;
  
  var sumtotal = ((d0*10)+(d1*9)+(d2*8)+(d3*7)+(d4*6)+(d5*5)+(d6*4)+(d7*3)+(d8*2));
  
  if (sumtotal % 11 === 0) {
	checkdigit = 0;
  } else {
	checkdigit = 11 - (sumtotal % 11);
  }
  
  if (checkdigit == 10) {
	return 'X';
  } else {
	return checkdigit;
  }

}

function convertEAN13toISBN10(ean) {
	var temp = ean.substr(3, 9);
	return temp + calcISBNChecksum(temp);
}



function randomizeUserAgent() {
	var 
		UserAgentArray = [
		"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36",
		"Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20120101 Firefox/29.0",
		"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0",
		"Mozilla/5.0 (X11; OpenBSD amd64; rv:28.0) Gecko/20100101 Firefox/28.0",
		"Mozilla/5.0 (X11; Linux x86_64; rv:28.0) Gecko/20100101 Firefox/28.0",
		"Mozilla/5.0 (Windows NT 6.1; rv:27.3) Gecko/20130101 Firefox/27.3",
		"Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:27.0) Gecko/20121011 Firefox/27.0",

		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36",
		"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36",
		"Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
		"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36",
		"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",

		"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
		"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
		"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
		"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)",
		"Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)",
		"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)",
		"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; Media Center PC 6.0; InfoPath.3; MS-RTC LM 8; Zune 4.7)"
	],
	
	RandomPosition = random.integer(0, UserAgentArray.length-1);
	
	return UserAgentArray[RandomPosition];
} 


function formatMySQLDateFromMWS(MWSDate) {
	MySQLDate = S(MWSDate).replaceAll('T', ' ').replaceAll('+00:00', '').s;
	if (S(MySQLDate ).length > 19) {
		MySQLDate  = S(MySQLDate).left(19).s;	
	}
	return MySQLDate;
}  	







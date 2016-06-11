var re = new XMLHttpRequest();
re.onreadystatechange = haha;
function haha() {
	if (re.readyState === 4) {
		// console.log(re.responseText); //普通网页
		console.log(re.responseXML.getElementsByTagName('title')); //XML
	}
}
// 在网址（http://swordair.com/rss/）执行
re.open('GET', '/rss/', true);
re.send();
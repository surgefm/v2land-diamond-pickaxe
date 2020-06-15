// Run it in https://blog.feedspot.com/abc_news_rss_feeds/

linkList = document.querySelectorAll('.data >p:first-of-type>a:first-of-type');
links = [];

for (el of linkList) {
    links.push(el.href);
}

console.log(links);

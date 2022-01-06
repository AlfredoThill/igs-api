### Instragram Scrapper API ###

Service Alts:
	-scrapper pkg => PRO: nice, canned solution CON: rate limit sucks (pkg: instagram-scraping)
	-META auth API => PRO: pending set up CON: rate limit, by docs (url: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started)
 	-browserScrapping => PRO: no rate limit so far, easy auth CON: performance, requires scrap dev (with puppeteer)
	-paid API => PRO: goes around rate limit by changing proxies CON: PAID external service (url: https://rapidapi.com/premium-apis-premium-apis-default/api/instagram85/)

Possible Solution: cluster(3) of replica services of "browserScrapping" and orchestrator(ngnix maybe) to balance the loads
	- no external services (-- steady cost)
	- scalable as fuck
	- may have to paid multiple pods(heroku dynos or whatever) (+ cost)
	- heavy on the dev side, devOps intensive too (++ initial cost)

Important Side Note: check about the legal status of this kind of personal data scrapping

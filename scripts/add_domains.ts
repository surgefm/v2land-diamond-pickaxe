import axios from 'axios';
import fs from 'fs';
import yaml from 'js-yaml';
import Parser, { Output as Feed } from 'rss-parser';
import { URL } from 'url';
import { FindOrCreateSiteDto } from '../src/site/dto/find-or-create-site.dto';

try {
	const site_yaml_file = process.argv[2];
	const sites = yaml.load(
		fs.readFileSync(site_yaml_file, 'utf8')
	) as FindOrCreateSiteDto[];

	const rssParser = new Parser();

	sites.forEach(async (site, i) => {
		if (
			site.domains !== null &&
			site.domains !== undefined &&
			site.domains.length > 0
		)
			return;
		// Get an url from feed's first item (if available)
		if (site.rssUrls.length < 1) {
			console.log('No rss url!');
			return;
		}
		const feed: Feed<any> = await rssParser.parseURL(site.rssUrls[0]);
		const url_of_first_item_in_feed = feed.items[0].link;

		const response = await axios.get(url_of_first_item_in_feed);
		const url = new URL(response.request.res.responseUrl as string);
		const domain = url.hostname;
		sites[i].domains = [domain];

		// Save to file
		fs.writeFile(site_yaml_file, yaml.dump(sites), null);
	});
} catch (e) {
	console.log(e);
}

import axios from 'axios';
import fs from 'fs';
import yaml from 'js-yaml';
import { FindOrCreateSiteDto } from '../src/site/dto/find-or-create-site.dto';

// https://example.com
const instance = process.env.INSTANCE;
const endpoint = '/site';
const url = instance + endpoint;

try {
	const site_yaml_file = process.argv[2];
	const sites = yaml.safeLoad(fs.readFileSync(site_yaml_file, 'utf8')) as FindOrCreateSiteDto[];

	sites.forEach(async (site) => {
		console.log(site);
		await axios.post(url, site);
	});
} catch (e) {
	console.log(e);
}

const { exec } = require('child_process');
const axios = require('axios');
const cheerio = require('cheerio');

// Retrieve the target URL from command-line arguments
const args = process.argv.slice(2);
let targetUrl = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-u' && args[i + 1]) {
        targetUrl = args[i + 1];
        break;
    }
}

if (!targetUrl) {
    console.error('Error: A target URL must be provided using the -u flag.');
    process.exit(1);
}

// Ensure the URL is normalized by adding http:// if no protocol is specified
if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'http://' + targetUrl;
}

console.log(`Processing Target URL: ${targetUrl}`);

try {
    const url = new URL(targetUrl);
    const hostname = url.hostname; // Extract the hostname from the URL

    // Execute a ping command to retrieve the IP address
    exec(`ping -c 1 ${hostname}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during ping execution: ${stderr}`);
            return;
        }

        // Extract the IP address from the ping output
        const match = stdout.match(/\(([^)]+)\)/);
        if (match && match[1]) {
            const pingIpAddress = match[1];
            console.log(`IPv4 Address for ${hostname}: ${pingIpAddress}`);

            // Perform a web request to retrieve the HTML content
            axios.get(`https://www.shodan.io/host/${pingIpAddress}`)
                .then(response => {
                    const html = response.data;
                    console.log('API response...');

                    // Parse the HTML content with Cheerio
                    const $ = cheerio.load(html);

                    // Locate the script tag containing the VULNS object
                    const scriptContent = $('script').filter((i, el) => {
                        return $(el).html().includes('const VULNS =');
                    }).html();

                    if (scriptContent) {
                        // Extract and parse the VULNS object
                        const vulnsMatch = scriptContent.match(/const VULNS = (\{.*?\});/s);
                        if (vulnsMatch && vulnsMatch[1]) {
                            const vulns = JSON.parse(vulnsMatch[1]);
                            console.log('Vulnerabilities:', vulns);
                        } else {
                            console.error('Error: Unable to extract the VULNS object.');
                        }
                    } else {
                        console.error('Error: Script containing the VULNS object not found.');
                    }
                })
                .catch(err => {
                    console.error(`Error during data retrieval from ${pingIpAddress}: ${err.message}`);
                });
        } else {
            console.error('Error: Failed to resolve an IP address from the ping output.');
        }
    });
} catch (error) {
    console.error(`Error: Invalid URL provided. Details: ${error.message}`);
}

console.log('\nCoded by FrostFoe.');

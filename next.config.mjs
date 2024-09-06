import createNextIntlPlugin from 'next-intl/plugin';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    compiler: {
        styledComponents: true,
    },
    experimental: {
        typedRoutes: true,
    },
    distDir: process.env.BUILD_DIR || '.next',
    webpack : (config) => {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        config.resolve.fallback = {
            "mongodb-client-encryption": false,
            "aws4": false
        };
        return config;
    },
    generateBuildId: async () => {

        let buildId;

        try {
            const data = await fs.readFileSync(__dirname  + '/.git/refs/remotes/origin/master', 'utf8');
            buildId = String(data).trim();
        } catch (err) {
            //console.error(err);
            buildId = Math.random().toString(36).substr(2,11)
        }

        console.log("generateBuildId", buildId)

        return buildId;

    },
};
export default withNextIntl(nextConfig);

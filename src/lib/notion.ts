// @ts-nocheck

'use server';

import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const servicesDatabaseId = process.env.NOTION_SERVICES_DATABASE_ID || '';

export const getServices = async () => {
    try {
        const response = await notion.databases.query({
            database_id: servicesDatabaseId,
        });

        const services = response.results.map((page) => {
            if ('properties' in page) {
                const titleProp = page.properties.title;
                const descriptionProp = page.properties.description;
                const linkProp = page.properties.url;

                const title = titleProp?.type === 'title' ? titleProp.title[0]?.plain_text : '';
                const description = descriptionProp?.type === 'rich_text' ? descriptionProp.rich_text[0]?.plain_text : '';
                const link = linkProp?.type === 'url' ? linkProp.url : '#';
                
                return { title, description, link };
            }
            return null;
        }).filter(Boolean);
        
        return services;

    } catch (error) {
        console.error("Failed to fetch services from Notion:", error);
        return [];
    }
};

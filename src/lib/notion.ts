// @ts-nocheck

'use server';

import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const servicesDatabaseId = process.env.NOTION_SERVICES_DATABASE_ID || '';

// Helper function to find a property by name, case-insensitively
const getProperty = (properties, propName) => {
    const lowercasedPropName = propName.toLowerCase();
    const propKey = Object.keys(properties).find(key => key.toLowerCase() === lowercasedPropName);
    return propKey ? properties[propKey] : null;
};

export const getServices = async () => {
    try {
        if (!servicesDatabaseId) {
            console.error("Notion services database ID is not configured.");
            return [];
        }

        const response = await notion.databases.query({
            database_id: servicesDatabaseId,
        });

        const services = response.results.map((page) => {
            if ('properties' in page) {
                const titleProp = getProperty(page.properties, 'title');
                const descriptionProp = getProperty(page.properties, 'description');
                const linkProp = getProperty(page.properties, 'url');

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

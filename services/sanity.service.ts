import { createClient } from '@sanity/client';
import chalk from 'chalk';

/**
 * Shared service for interacting with Sanity.io for asset storage
 */

const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID as string,
    dataset: process.env.SANITY_DATASET as string,
    token: process.env.SANITY_API_TOKEN as string,
    useCdn: false,
    apiVersion: '2023-05-03',
});

export const sanityService = {
    /**
     * Upload a file or image to Sanity
     * @param buffer The file buffer
     * @param filename Original filename
     * @param contentType MIME type
     */
    uploadAsset: async (buffer: Buffer, filename: string, contentType: string) => {
        try {
            // Determine Sanity asset type (image or file)
            const assetType = contentType.startsWith('image/') ? 'image' : 'file';

            console.log(chalk.blue(`[Sanity Service] Uploading ${assetType}: ${filename}...`));

            const asset = await sanityClient.assets.upload(assetType, buffer, {
                filename,
                contentType,
            });

            console.log(chalk.green(`[Sanity Service] Upload successful: ${asset.url}`));
            return asset;
        } catch (error) {
            console.error(chalk.red('[Sanity Service] Upload failed:'), error);
            throw error;
        }
    }
};

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { imageData, name } = req.body;

    if (!imageData || !name) {
        return res.status(400).json({ message: 'Missing image data or name' });
    }

    // Remove the base64 header from the image data
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');

    // Define the file path in the Next.js `public` directory
    const filePath = path.join(process.cwd(), 'public', `${name}.jpeg`);

    try {
        // Write the file to the public directory
        fs.writeFileSync(filePath, base64Data, 'base64');
        res.status(200).json({ message: 'Image saved successfully' });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ message: 'Error saving file' });
    }
}

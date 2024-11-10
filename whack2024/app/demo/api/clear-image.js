import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Define the directory where images are saved
        const publicDir = path.join(process.cwd(), 'public');

        // Get all files in the public directory
        const files = fs.readdirSync(publicDir);

        // Filter for JPEG images and delete each
        files.forEach(file => {
            if (file.endsWith('.jpeg')) {
                fs.unlinkSync(path.join(publicDir, file));
            }
        });

        res.status(200).json({ message: 'Images cleared successfully' });
    } catch (error) {
        console.error('Error clearing images:', error);
        res.status(500).json({ message: 'Error clearing images' });
    }
}

import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-1',
    credentials: {
        accessKeyId: process.env.EXPO_PUBLIC_ACCESS_KEY_ID || 'n/a',
        secretAccessKey: process.env.EXPO_PUBLIC_SECRET_ACCESS || 'n/a'
    }
});

const rekognition = new AWS.Rekognition();

export class RekognitionService {
    private static instance: RekognitionService;
    constructor() {}

    public static getInstance() {
        if (!RekognitionService.instance) {
            RekognitionService.instance = new RekognitionService();
        }
        return RekognitionService.instance;
    }

    public analyzeImage = async (imageUri: string) => {
        try {
            const response = await fetch(imageUri);
            const arrayBuffer = await response.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);

            const params = {
                Image: {
                    Bytes: bytes
                }
            };

            return new Promise((resolve, reject) => {
                rekognition.detectLabels(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    };
}

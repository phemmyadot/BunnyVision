import OpenAI from 'openai';
import { PersistentStorage } from './persistent-storage';

export const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export class GPTService {
    private static instance: GPTService;
    constructor() {}

    public static getInstance() {
        if (!GPTService.instance) {
            GPTService.instance = new GPTService();
        }
        return GPTService.instance;
    }

    public gpt4 = async (base64EncodedImage: string): Promise<string | null> => {
        const query = await this.getQueryByLanguage();
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: query,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${base64EncodedImage}`, //'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg'
                            },
                        },
                    ],
                },
            ],
        });

        return completion.choices[0].message.content;
    };

    private persistentStorage = PersistentStorage.getInstance();

    private getQueryByLanguage = async (): Promise<string> => {
        const lang = (await this.persistentStorage.getData('language')) || 'en';
        if (lang === 'es') {
            return '¿Qué hay en esta imagen?';
        } else if (lang === 'fr') {
            return "Qu'y a-t-il dans cette image?";
        } else {
            return "What's in this image?";
        }
    };
}

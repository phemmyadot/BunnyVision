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
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: "What's in this image?",
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
            return 'Describe brevemente una imagen con las siguientes etiquetas. No agregue el % al resultado, utilícelo para concluir el resultado:  \n\n';
        } else if (lang === 'fr') {
            return "Décrivez brièvement une image avec les étiquettes suivantes. N'ajoutez pas le % au résultat, utilisez-les plutôt pour conclure le résultat:  \n\n";
        } else {
            return "Describe briefly an image with the following labels. Don't add the % to the result, use them to conclude the result instead:  \n\n";
        }
    };

    public getMessageFromGPT4 = async (imageLabels: string): Promise<string> => {
        const query = await this.getQueryByLanguage();
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: query + imageLabels,
                },
            ],
            model: 'gpt-4o',
        });
        return chatCompletion.choices[0].message.content ?? '';
    };
}

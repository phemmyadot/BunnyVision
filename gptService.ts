import OpenAI from 'openai';
import axios from 'axios';

export const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
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

    public gpt4 = async (
        base64EncodedImage: string
    ): Promise<string | null> => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4-turbo',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: "What's in this image?"
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64EncodedImage}` //'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg'
                                }
                            }
                        ]
                    }
                ]
            });

            console.log(response.choices[0].message.content);
            return response.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    };

    public getDescriptionFromGPT4 = async (
        imageLabels: string
    ): Promise<string> => {
        try {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content:
                            "Describe briefly an image with the following labels. Don't add the % to the result, use them to conclude the result instead:  \n\n" +
                            imageLabels
                    }
                ],
                model: 'gpt-4o'
            });
            return chatCompletion.choices[0].message.content ?? '';
        } catch (error) {
            throw error;
        }
    };
}

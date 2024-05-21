import OpenAI from 'openai';

const openai = new OpenAI({
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

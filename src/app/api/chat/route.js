import { NextResponse } from "next/server";


let chatData = [{
    role: "",
    message: ""
}];

export async function POST(request) {



    try {
        const data = await request.json();


        chatData.push({
            role: "user",
            message: data.message
        });


        const mappedChatData = chatData.map((el, index, arr) => {
            return el.role + " : " + el.message
        })

        const stringChatData = mappedChatData.join("\n")
        console.log(stringChatData);

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": process.env.GEMINI_API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: stringChatData }],
                        },
                    ],
                }),
            }
        );



        const json = await response.json();


        const reply =
            json?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from Gemini";

        chatData.push({
            role: "assistant",
            message: reply
        });


        return NextResponse.json({ message: reply });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

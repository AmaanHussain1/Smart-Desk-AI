package com.smartdesk.ai.service;

import com.smartdesk.ai.dto.AiAnalysisResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiTicketService {

    private final ChatClient chatClient;

    public AiTicketService(ChatClient.Builder chatClientBuilder){
        this.chatClient = chatClientBuilder.build();
    }

    public AiAnalysisResponse analyzeTicket(String title, String description){
        // Construct the prompt
        String prompt = String.format(
                        "You are an expert IT support agent. Analyze the following support ticket.\n" +
                        "Title: %s\n" +
                        "Description: %s\n\n" +
                        "Categorize the issue into one of these exact words: HARDWARE, SOFTWARE, NETWORK, BILLING, ACCESS, UNASSIGNED.\n" +
                        "Assign a priority based on urgency using one of these exact words: LOW, MEDIUM, HIGH, CRITICAL.\n" +
                        "Draft a polite, helpful, and concise suggested reply to the user.", title, description
        );

        // Call Gemini and map the output directly to Java Record!
        return this.chatClient.prompt()
                .user(prompt)
                .call()
                .entity(AiAnalysisResponse.class);  // automatically tells Gemini to return JSON and maps it
    }
}

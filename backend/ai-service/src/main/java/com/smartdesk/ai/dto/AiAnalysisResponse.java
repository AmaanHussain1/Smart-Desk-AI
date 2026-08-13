package com.smartdesk.ai.dto;

public record AiAnalysisResponse(
   String category,
   String priority,
   String suggestedReply
) {}

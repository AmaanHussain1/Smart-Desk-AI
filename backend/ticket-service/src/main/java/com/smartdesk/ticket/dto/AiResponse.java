package com.smartdesk.ticket.dto;

public record AiResponse(
   String category,
   String priority,
   String suggestedReply
) {}

package com.smartdesk.ai.controller;

import com.smartdesk.ai.dto.AiAnalysisResponse;
import com.smartdesk.ai.dto.TicketRequest;
import com.smartdesk.ai.service.AiTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiTicketController {

    private final AiTicketService aiTicketService;

    @PostMapping("/analyze")
    public AiAnalysisResponse analyze(@RequestBody TicketRequest request) {
        return aiTicketService.analyzeTicket(request.title(), request.description());
    }
}

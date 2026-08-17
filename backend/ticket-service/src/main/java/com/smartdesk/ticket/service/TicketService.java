package com.smartdesk.ticket.service;

import com.smartdesk.ticket.dto.AiResponse;
import com.smartdesk.ticket.entity.Ticket;
import com.smartdesk.ticket.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final RestClient restClient;

    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
        this.restClient = RestClient.builder().baseUrl("http://localhost:8081").build();
    }

    // CREATE
    public Ticket createTicket(Ticket ticket) {
        try {
            // Call the AI Service
            AiResponse aiData = restClient.post()
                    .uri("/api/ai/analyze")
                    .body(Map.of(
                            "title", ticket.getTitle(),
                            "description", ticket.getDescription()
                    ))
                    .retrieve()
                    .body(AiResponse.class);

            // Update the ticket with AI's analysis if successful
            if (aiData != null) {
                ticket.setCategory(aiData.category());
                ticket.setPriority(aiData.priority());
                ticket.setSuggestedReply(aiData.suggestedReply());
            }
        } catch (Exception e) {
            System.err.println("AI Service Error Details: " + e.getMessage());
            e.printStackTrace();
            System.err.println("Warning: AI Service unreachable or failed. Saving ticket with defaults.");
        }

        // Save to database
        return ticketRepository.save(ticket);
    }

    // READ ALL
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // READ ONE
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    }

    // UPDATE
    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket existingTicket = getTicketById(id);

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());
        existingTicket.setCategory(updatedTicket.getCategory());
        existingTicket.setSuggestedReply(updatedTicket.getSuggestedReply());

        return ticketRepository.save(existingTicket);
    }

    // DELETE
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}

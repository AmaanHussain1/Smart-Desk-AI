package com.smartdesk.ticket.service;

import com.smartdesk.ticket.entity.Ticket;
import com.smartdesk.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    // CREATE
    public Ticket createTicket(Ticket ticket){
        return ticketRepository.save(ticket);
    }

    // READ ALL
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    // READ ONE
    public Ticket getTicketById(Long id){
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    }

    // UPDATE
    public Ticket updateTicket(Long id, Ticket updatedTicket){
        Ticket existingTicket = getTicketById(id);

        // Update fields
        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());
        existingTicket.setCategory(updatedTicket.getCategory());
        existingTicket.setSuggestedReply(updatedTicket.getSuggestedReply());

        return ticketRepository.save(existingTicket);
    }

    // DELETE
    public void deleteTicket(Long id){
        ticketRepository.deleteById(id);
    }
}

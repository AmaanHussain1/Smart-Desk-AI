package com.smartdesk.ticket.controller;

import com.smartdesk.ticket.entity.Ticket;
import com.smartdesk.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allows our React frontend to make requests
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        return new ResponseEntity<>(ticketService.createTicket(ticket), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets(){
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id){
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id,@RequestBody Ticket ticket){
        return ResponseEntity.ok(ticketService.updateTicket(id, ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id){
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}

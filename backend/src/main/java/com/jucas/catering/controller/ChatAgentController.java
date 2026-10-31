package com.jucas.catering.controller;

import com.jucas.catering.model.ChatRequest;
import com.jucas.catering.model.ChatResponse;
import com.jucas.catering.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatAgentController {

    private final AgentService agentService;

    @Autowired
    public ChatAgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = agentService.processChat(request);
        return ResponseEntity.ok(response);
    }
}

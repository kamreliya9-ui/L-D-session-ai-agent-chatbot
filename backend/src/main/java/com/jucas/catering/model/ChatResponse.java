package com.jucas.catering.model;

public class ChatResponse {
    private String reply;
    private boolean toolUsed;
    private String toolName;
    private Object toolOutput;
    private Order confirmedOrder;

    public ChatResponse() {
    }

    public ChatResponse(String reply) {
        this.reply = reply;
    }

    public ChatResponse(String reply, boolean toolUsed, String toolName, Object toolOutput, Order confirmedOrder) {
        this.reply = reply;
        this.toolUsed = toolUsed;
        this.toolName = toolName;
        this.toolOutput = toolOutput;
        this.confirmedOrder = confirmedOrder;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public boolean isToolUsed() {
        return toolUsed;
    }

    public void setToolUsed(boolean toolUsed) {
        this.toolUsed = toolUsed;
    }

    public String getToolName() {
        return toolName;
    }

    public void setToolName(String toolName) {
        this.toolName = toolName;
    }

    public Object getToolOutput() {
        return toolOutput;
    }

    public void setToolOutput(Object toolOutput) {
        this.toolOutput = toolOutput;
    }

    public Order getConfirmedOrder() {
        return confirmedOrder;
    }

    public void setConfirmedOrder(Order confirmedOrder) {
        this.confirmedOrder = confirmedOrder;
    }
}

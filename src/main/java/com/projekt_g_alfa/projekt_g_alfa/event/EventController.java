package com.projekt_g_alfa.projekt_g_alfa.event;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
public class EventController {
    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/all")
    List<Event> findAll(){
        return this.eventRepository.findAll();
    }

    @GetMapping("/{id}")
    Event findById(@PathVariable Integer id){
        Optional<Event> event = this.eventRepository.findById(id);
        if (event.isEmpty()){
            throw new EventNotFoundException();
        }

        return event.get();
    }
}

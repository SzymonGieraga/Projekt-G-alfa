package com.projekt_g_alfa.projekt_g_alfa.event;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    //Post
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    void create(@Valid @RequestBody Event event){
        this.eventRepository.create(event);
    }

    //Put
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void update(@Valid @RequestBody Event event, @PathVariable Integer id){
        this.eventRepository.update(id, event);
    }

    //Delete
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id){
        this.eventRepository.delete(id);
    }



}

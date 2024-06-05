package com.projekt_g_alfa.projekt_g_alfa.event;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class EventRepository {
    private final List<Event> events = new ArrayList<>();

    public List<Event> findAll(){
        return this.events;
    }

    public Optional<Event> findById(Integer id){
        return this.events.stream()
                .filter(event -> Objects.equals(event.id(), id))
                .findFirst();
    }

    public void create(Event event){
        this.events.add(event);
    }

    public void update(Integer id, Event event){
        Optional<Event> optionalEvent = this.findById(id);
        optionalEvent.ifPresent(value -> events.set(events.indexOf(value), event));
    }

    public void delete(Integer id){
        this.events.removeIf(event -> Objects.equals(event.id(), id));
    }

    @PostConstruct
    private void init(){
        this.events.add(new Event(
                1,
                "Test1",
                "Lorem ipsum",
                null,
                null
        ));
        this.events.add(new Event(
                2,
                "Test2",
                "Lorem ipsum",
                null,
                null
        ));
    }
}

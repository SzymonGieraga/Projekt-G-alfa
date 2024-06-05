package com.projekt_g_alfa.projekt_g_alfa.event;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EventRepository {
    private final List<Event> events = new ArrayList<>();

    public List<Event> findAll(){
        return events;
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

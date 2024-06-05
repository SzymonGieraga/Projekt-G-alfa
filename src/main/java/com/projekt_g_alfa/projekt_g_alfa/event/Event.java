package com.projekt_g_alfa.projekt_g_alfa.event;

import com.projekt_g_alfa.projekt_g_alfa.user.User;

import java.util.List;

public record Event(
        Integer id,
        String title,
        String text,
        List<User> participants,
        User creator
) {
}

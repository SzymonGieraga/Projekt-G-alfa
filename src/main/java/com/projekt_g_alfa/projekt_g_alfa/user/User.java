package com.projekt_g_alfa.projekt_g_alfa.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Positive;

public record User(
        @Positive
        Integer id,
        UserType userType,
        String firstName,
        String lastName,
        @Email
        String email
) {
}

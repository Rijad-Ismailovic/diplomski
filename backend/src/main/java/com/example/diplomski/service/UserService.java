package com.example.diplomski.service;

import com.example.diplomski.entity.User;

public interface UserService {

    public User register(User user);

    public String verify (User user);
}

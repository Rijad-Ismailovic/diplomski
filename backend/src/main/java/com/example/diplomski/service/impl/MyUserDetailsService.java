package com.example.diplomski.service.impl;

import com.example.diplomski.entity.User;
import com.example.diplomski.entity.UserPrincipal;
import com.example.diplomski.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);

        if (user == null || !user.getUsername().equals(username)) { // jer su db queries case insesntive
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user);
    }
}

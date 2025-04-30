package com.example.diplomski.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Component
public class SecurityUtil {

    @Autowired
    private RestTemplate restTemplate;

    public boolean isPwned(String password){
        String sha1 = HashUtil.sha1(password);
        String prefix = sha1.substring(0, 5);
        String suffix = sha1.substring(5);

        String url = "https://api.pwnedpasswords.com/range/" + prefix;
        String response = restTemplate.getForObject(url, String.class);

        List<String> items = Arrays.asList(response.split("\\n"));
        for(String item : items){
            String[] parts = item.split(":");
            if(parts[0].equalsIgnoreCase(suffix)){
                return true;
            }
        }

        return false;
    }
}


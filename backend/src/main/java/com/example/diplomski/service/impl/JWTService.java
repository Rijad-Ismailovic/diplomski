package com.example.diplomski.service.impl;

import com.example.diplomski.entity.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private String secretKey;

    public JWTService(){
        //try{
        //   KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        // SecretKey sk = keyGen.generateKey();
        //    secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        //    System.out.println("SECRET KEY !!!! :"+ secretKey);
        //} catch(NoSuchAlgorithmException e){
        //    throw new RuntimeException(e);
        //}
        secretKey = "nN3YIGNpIB81VcPqWysP7pHCR4IG5YQnTeIibUABYbY=";
    }

    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add("roles", "ROLE_USER") // TODO make it dynamic
                .and()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 min
                .signWith(getKey())
                .compact();
    }

    public SecretKey getKey(){
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        System.out.println("Decoded key length = " + bytes.length);
        return Keys.hmacShaKeyFor(bytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String usernameOrEmail = extractUsername(token);
        if(usernameOrEmail.contains("@")){
            String email = ((UserPrincipal) userDetails).getEmail();
            return usernameOrEmail.equals(email) && !isTokenExpired(token);
        }
        else{
            return (usernameOrEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractSub(String token) {
        return extractClaim(token, Claims::getSubject);
    }
}

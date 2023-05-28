package com.project.security.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.project.security.models.Account;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String SECRECT_KEY = "4D635166546A576E5A7234743777217A25432A462D4A614E645267556B587032";

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> ClaimsResolver) {
        final Claims claims = extractAllClaims(token);
        return ClaimsResolver.apply(claims);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRECT_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Map<String, Object> extraClaims, Account userDetails) {
        extraClaims.put("role", userDetails.getRole().getRoleName());
        extraClaims.put("username", userDetails.getUsername());
        extraClaims.put("id", userDetails.getId());
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getPhoneNumber())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() * 24 * 60 * 1000))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();
    }

    public String generateToken(Account userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token, Account userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getPhoneNumber())) && isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}

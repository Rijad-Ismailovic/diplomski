package com.example.diplomski.common.exceptions;

public class BreachedPasswordException extends RuntimeException{

    public BreachedPasswordException(String message){
        super(message);
    }
}

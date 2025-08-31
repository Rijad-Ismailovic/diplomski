package com.example.diplomski;

import com.example.diplomski.service.impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class DiplomskiApplication {
	@Autowired
	private EmailService senderService;

	public static void main(String[] args) {
		SpringApplication.run(DiplomskiApplication.class, args);
	}

	/*@EventListener(ApplicationReadyEvent.class)
	public void sendMail(){
		senderService.sendEmail("rijad.isma@gmail.com", "Subject", "Hello?");
	}*/

}

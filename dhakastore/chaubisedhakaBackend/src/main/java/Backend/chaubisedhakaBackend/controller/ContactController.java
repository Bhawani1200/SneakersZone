package Backend.chaubisedhakaBackend.controller;
import Backend.chaubisedhakaBackend.payload.ContactRequestDTO;
import Backend.chaubisedhakaBackend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactRequestDTO contactRequest,
                                               BindingResult bindingResult) {

        // Handle validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Validation failed",
                    "errors", errors
            ));
        }

        try {
            contactService.processContactForm(contactRequest);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Message sent successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Failed to send message. Please try again later."
            ));
        }
    }
}
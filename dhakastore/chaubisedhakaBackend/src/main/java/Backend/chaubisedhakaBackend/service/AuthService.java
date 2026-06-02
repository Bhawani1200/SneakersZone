package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.payload.AuthenticationResult;
import Backend.chaubisedhakaBackend.security.request.LoginRequest;
import Backend.chaubisedhakaBackend.security.request.SignupRequest;
import Backend.chaubisedhakaBackend.security.response.MessageResponse;
import Backend.chaubisedhakaBackend.security.response.UserInfoResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthenticationResult login(LoginRequest loginRequest);

    AuthenticationResult loginGoogle(String idToken);


    ResponseEntity<MessageResponse> register(@Valid SignupRequest signUpRequest);

    Object getCurrentUserDetails(Authentication authentication);

    ResponseCookie logoutUser();

    Object getAllSellers(Pageable pageable);
}

package Backend.chaubisedhakaBackend.security;

import Backend.chaubisedhakaBackend.model.AppRole;
import Backend.chaubisedhakaBackend.model.Role;
import Backend.chaubisedhakaBackend.model.User;
import Backend.chaubisedhakaBackend.repositories.RoleRepository;
import Backend.chaubisedhakaBackend.repositories.UserRepository;
import Backend.chaubisedhakaBackend.security.jwt.AuthEntryPointJwt;
import Backend.chaubisedhakaBackend.security.jwt.AuthTokenFilter;
import Backend.chaubisedhakaBackend.security.services.UserDetailsServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.HashSet;
import java.util.Set;

import static org.apache.catalina.webresources.TomcatURLStreamHandlerFactory.disable;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {

        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors->{})
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth -> auth.
                                requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/admin/cloudinary/upload").permitAll()
//                                .requestMatchers("/h2-console/**").permitAll()
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/api/seller/**").hasAnyRole("ADMIN","SELLER")
                                .requestMatchers("/api/public/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/images/**").permitAll()
                                .requestMatchers("/", "/error").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .anyRequest().authenticated());
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.headers(headers -> headers.frameOptions(
                HeadersConfigurer.FrameOptionsConfig::sameOrigin
        ));

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web -> web.ignoring().requestMatchers("/v2/api-docs",
                "/configuration/ui",
                "swagger-resources/**",
                "configuration/security",
                "swagger-ui.html",
                "webjars/**"
        ));
    }

//    @Transactional
//    @Bean
//    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            // Retrieve or create roles
//            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
//                    .orElseGet(() -> {
//                        Role newUserRole = new Role(AppRole.ROLE_USER);
//                        return roleRepository.save(newUserRole);
//                    });
//
//            Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
//                    .orElseGet(() -> {
//                        Role newSellerRole = new Role(AppRole.ROLE_SELLER);
//                        return roleRepository.save(newSellerRole);
//                    });
//
//            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
//                    .orElseGet(() -> {
//                        Role newAdminRole = new Role(AppRole.ROLE_ADMIN);
//                        return roleRepository.save(newAdminRole);
//                    });
//
//            Set<Role> userRoles = Set.of(userRole);
//            Set<Role> sellerRoles = Set.of(sellerRole);
//            Set<Role> adminRoles = Set.of(userRole, sellerRole, adminRole);
//
//
//
//            // Create users if not already present
//            if (!userRepository.existsByUserName("user1")) {
//                User user1 = new User("user1", "user1@example.com", passwordEncoder.encode("password1"));
//                userRepository.save(user1);
//            }
//
//            if (!userRepository.existsByUserName("seller1")) {
//                User seller1 = new User("seller1", "seller1@example.com", passwordEncoder.encode("password2"));
//                userRepository.save(seller1);
//            }
//
//            if (!userRepository.existsByUserName("admin")) {
//                User admin = new User("admin", "admin@example.com", passwordEncoder.encode("adminPass"));
//                userRepository.save(admin);
//            }
//
//            // Update roles for existing users
//            userRepository.findByUserName("user1").ifPresent(user -> {
//                user.setRoles(userRoles);
//                userRepository.save(user);
//            });
//
//            userRepository.findByUserName("seller1").ifPresent(seller -> {
//                seller.setRoles(sellerRoles);
//                userRepository.save(seller);
//            });
//
//            userRepository.findByUserName("admin").ifPresent(admin -> {
//                admin.setRoles(adminRoles);
//                userRepository.save(admin);
//            });
//        };
//    }
@Transactional
@Bean
public CommandLineRunner initData(RoleRepository roleRepository,
                                  UserRepository userRepository,
                                  PasswordEncoder passwordEncoder) {

    return args -> {

        // ---------- ROLES ----------
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

        Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_SELLER)));

        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));

        // ---------- USERS ----------
        if (!userRepository.existsByUserName("user1")) {
            userRepository.save(
                    new User("user1", "user1@example.com",
                            passwordEncoder.encode("password1"))
            );
        }

        if (!userRepository.existsByUserName("seller1")) {
            userRepository.save(
                    new User("seller1", "seller1@example.com",
                            passwordEncoder.encode("password2"))
            );
        }

        if (!userRepository.existsByUserName("admin")) {
            userRepository.save(
                    new User("admin", "admin@example.com",
                            passwordEncoder.encode("adminPass"))
            );
        }

        // ---------- ASSIGN ROLES (SAFE WAY) ----------
        userRepository.findByUserName("user1").ifPresent(user -> {
            user.getRoles().clear();
            user.getRoles().add(userRole);
        });

        userRepository.findByUserName("seller1").ifPresent(seller -> {
            seller.getRoles().clear();
            seller.getRoles().add(sellerRole);
        });

        userRepository.findByUserName("admin").ifPresent(admin -> {
            admin.getRoles().clear();
            admin.getRoles().add(userRole);
            admin.getRoles().add(sellerRole);
            admin.getRoles().add(adminRole);
        });
    };
}

}

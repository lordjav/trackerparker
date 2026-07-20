package dev.javiermeza.TrackerParker.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class OriginSecretFilter extends OncePerRequestFilter {

    private final boolean required;
    private final String secret;

    public OriginSecretFilter(
            @Value("${app.origin-secret.required}") boolean required,
            @Value("${app.origin-secret.value}") String secret
    ) {
        this.required = required;
        this.secret = secret;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return "/health".equals(request.getRequestURI());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!required) {
            filterChain.doFilter(request, response);
            return;
        }
        if (!StringUtils.hasText(secret)) {
            response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Origin secret is not configured");
            return;
        }
        String suppliedSecret = request.getHeader("x-origin-secret");
        boolean matches = suppliedSecret != null && MessageDigest.isEqual(
                secret.getBytes(StandardCharsets.UTF_8), suppliedSecret.getBytes(StandardCharsets.UTF_8));
        if (!matches) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }
        filterChain.doFilter(request, response);
    }
}

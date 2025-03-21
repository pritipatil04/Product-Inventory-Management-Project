package com.wirpo.repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.wirpo.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.User;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByClientId(String clientId) throws DataAccessException;
    Optional<User> findByName(String name) throws DataAccessException;
}

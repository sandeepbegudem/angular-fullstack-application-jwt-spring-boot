package com.sandeepbegudem.backend.application.repository;import com.sandeepbegudem.backend.application.entity.User;import org.springframework.data.jpa.repository.JpaRepository;import org.springframework.data.jpa.repository.Query;import org.springframework.data.repository.query.Param;import org.springframework.stereotype.Repository;@Repositorypublic interface UserRepository extends JpaRepository<User, Long> {      @Query(value = "select u from User as u where u.email like %:email%")      User findByEmail(@Param("email") String email);}
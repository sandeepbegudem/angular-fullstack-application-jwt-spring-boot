package com.sandeepbegudem.backend.application.entity;import jakarta.persistence.*;import lombok.AllArgsConstructor;import lombok.Data;import lombok.NoArgsConstructor;import java.util.HashSet;import java.util.Objects;import java.util.Set;@AllArgsConstructor@NoArgsConstructor@Data@Entity@Table(name = "users")public class User {    @Id    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column(name = "user_id", nullable = false)    private Long userId;    @Basic    @Column(name = "email", nullable = false, unique = true)    private String email;    @Basic    @Column(name = "password", nullable = false, length = 64)    private String password;    @ManyToMany(fetch = FetchType.EAGER)    @JoinTable(name = "user_role",    joinColumns = {@JoinColumn(name = "user_id")},    inverseJoinColumns = {@JoinColumn(name = "role_id")})    private Set<Role> roles = new HashSet<>();    @OneToOne(mappedBy = "user")    private Student student;    @OneToOne(mappedBy = "user")    private Instructor instructor;    public User( String email, String password) {        this.email = email;        this.password = password;    }    public void assignRoleToUser(Role role) {        this.roles.add(role);        role.getUsers().add(this);    }    public void removeRoleToUser(Role role) {        this.roles.remove(role);        role.getUsers().remove(this);    }    @Override    public String toString() {        return "User{" +                "userId=" + userId +                ", email='" + email + '\'' +                '}';    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        User user = (User) o;        return Objects.equals(userId, user.userId) && Objects.equals(email, user.email) && Objects.equals(password, user.password);    }    @Override    public int hashCode() {        return Objects.hash(userId, email, password);    }}
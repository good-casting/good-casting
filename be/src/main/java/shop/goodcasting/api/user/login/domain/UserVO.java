package shop.goodcasting.api.user.login.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import shop.goodcasting.api.common.domain.BaseEntity;

import javax.persistence.*;
import java.util.List;

@ToString
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Entity
public class UserVO extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") private Long userId;
    @Column(unique = true, nullable = false) private String username;
    @Column(nullable = false) private String password;
    @Column private Boolean position;

    @ElementCollection(fetch = FetchType.EAGER)
    List<Role> roles;

    public void changePosition(Boolean position) {
        this.position = position;
    }

    public void changeUserId(Long userId) {
        this.userId = userId;
    }

    public void changeUsername(String username) {
        this.username = username;
    }

    public void changePassword(String password) {
        this.password = password;
    }

    public void changeRoles(List<Role> roles) {
        this.roles = roles;
    }
}

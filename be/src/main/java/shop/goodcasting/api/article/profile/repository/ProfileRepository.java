package shop.goodcasting.api.article.profile.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.goodcasting.api.article.profile.domain.Profile;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>
    , QuerydslPredicateExecutor<Profile> {

    @Query("select p, p.actor, f from Profile p left join FileVO f on f.profile = p where p.profileId = :profileId")
    List<Object[]> getProfileAndFileAndActorByProfileId(@Param("profileId") Long profileId);

    @Query("select p, a from Profile p left join p.actor a where p.profileId = :profileId")
    Object getProfileWithActorByProfileId(@Param("profileId") Long profileId);

    @Query(value = "select p, p.actor, f " +
            " from Profile p " +
            " left join FileVO f on f.profile = p " +
            " where f.first = true " +
            " group by p")
    Page<Object[]> getProfileAndFileAndActorByFirst(Pageable pageable);

    @Query("select p, f from Profile p left join FileVO f on f.profile = p where p.profileId = :profileId")
    List<Object[]> getProfileAndFileByProfileId(@Param("profileId") Long profileId);

    @Modifying
    @Query("update Profile p set p.resemble = :resemble, p.confidence = :confidence where p.profileId = :profileId")
    void resembleUpdate(Long profileId, String resemble, String confidence);

}

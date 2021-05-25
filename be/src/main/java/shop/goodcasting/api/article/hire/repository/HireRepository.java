package shop.goodcasting.api.article.hire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import shop.goodcasting.api.article.hire.domain.Hire;

import java.util.List;

@Repository
public interface HireRepository extends JpaRepository<Hire, Long> {
    @Query("select h, h.producer, f from Hire h left join FileVO f on f.hire = h where h.hireId = :hireId")
    List<Object[]> getHireAndFileAndProducerByHireId(@Param("hireId") Long hireId);

    @Query("select p, p.producer, f from Hire p left join FileVO f on f.hire = p where f.first = :first")
    List<Object[]> getHireAndFileAndProducerByFirst(@Param("first") boolean first);

}

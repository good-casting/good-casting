package shop.goodcasting.api.article.hire.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import shop.goodcasting.api.article.hire.domain.HirePageRequestDTO;
import shop.goodcasting.api.article.profile.domain.ProfilePageRequestDTO;

public interface SearchHireRepository {
    Page<Object[]> searchPage(HirePageRequestDTO pageRequest, Pageable pageable);
    Page<Object[]> myHirePage(HirePageRequestDTO pageRequest, Pageable pageable);
}

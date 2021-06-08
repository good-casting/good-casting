package shop.goodcasting.api.article.hire;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import shop.goodcasting.api.article.hire.repository.HireRepository;
import shop.goodcasting.api.article.hire.service.HireService;
import shop.goodcasting.api.article.hire.domain.HirePageRequestDTO;
import shop.goodcasting.api.user.producer.repository.ProducerRepository;


import java.util.Arrays;

@SpringBootTest
public class HireTests {

    @Autowired
    private HireRepository hireRepository;

    @Autowired
    private ProducerRepository producerRepository;

    @Autowired
    private HireService service;



    @Test
    public void searchHireTests() {
//        LocalDate from = LocalDate.of(2021, 5, 1);
//        LocalDate to = LocalDate.of(2021, 5, 30);
        HirePageRequestDTO pageRequest = HirePageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();

        Page<Object[]> result = hireRepository.searchPage(pageRequest, pageRequest.getPageable(Sort.by("project").descending()));

        result.forEach(t -> {

            System.out.println("-------------------------------result: " + Arrays.toString(t));
        });
    }
}

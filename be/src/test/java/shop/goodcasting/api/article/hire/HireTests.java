package shop.goodcasting.api.article.hire;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import shop.goodcasting.api.article.hire.repository.HireRepository;
import shop.goodcasting.api.article.hire.service.HireService;
import shop.goodcasting.api.common.domain.PageRequestDTO;
import shop.goodcasting.api.common.domain.PageResultDTO;
import shop.goodcasting.api.user.producer.repository.ProducerRepository;


import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        LocalDate from = LocalDate.of(2021, 5, 1);
        LocalDate to = LocalDate.of(2021, 5, 30);
        PageRequestDTO pageRequest = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .type("Cp")
                .castKeyword("20대남자")
                .pkeyword("광고")
                .build();

        Page<Object[]> result = hireRepository.searchPage(pageRequest, pageRequest.getPageable(Sort.by("hireId").descending()));

        result.forEach(t -> {
            System.out.println("-------------------------------result: " + Arrays.toString(t));
        });
    }
}

package shop.goodcasting.api.produecr.controller;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import shop.goodcasting.api.user.actor.domain.Actor;
import shop.goodcasting.api.user.actor.domain.ActorDTO;
import shop.goodcasting.api.user.actor.repository.ActorRepository;
import shop.goodcasting.api.user.actor.service.ActorService;
import shop.goodcasting.api.user.login.domain.UserVO;
import shop.goodcasting.api.user.login.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class ActorTest {

    @Autowired
    private ActorRepository actorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActorService service;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Test
    public void insertDummyActors() throws IOException {
        List<String> list = new ArrayList();
        Document innerDoc = null;
        List<ActorDTO> actorList = new ArrayList<>();

        for(int j=1 ;j<5;j++) {
            Document document = connectUrl("https://www.filmmakers.co.kr/actorsProfile/page/" + j);
            Elements link = document.select("div.description>a");



            for (int i = 0; i < link.size(); i++) {
                String a = link.get(i).attr("href");
                list.add(a);
            }
        }
            System.out.println("list.size : " + list.size());

            Integer actorDummy = actorList.size();

            for (int i = 0; i < list.size(); i++) {
                String value = list.get(i);
                innerDoc = connectUrl("https://www.filmmakers.co.kr" + value);
                Elements name = innerDoc.select("table.ui>thead>tr>th>h2>a");
                Elements birthday = innerDoc.select("table.unstackable>tbody>tr:eq(0)>td.three+td");
                Elements height = innerDoc.select("table.unstackable>tbody>tr:eq(3)>td.three+td");
                Elements weight = innerDoc.select("table.unstackable>tbody>tr:eq(4)>td.three+td");

                System.out.println("name" + name);

                ActorDTO actorDTO = new ActorDTO();
                String yeardel= birthday.text().replace("년",""); //출생년도 "년" 삭제
                String cmdel= height.text().replace("Cm",""); //키 "cm" 삭제
                String kgdel= weight.text().replace("Kg",""); //키 "cm" 삭제

                boolean human = (height.text().contains("Cm") &&weight.text().contains("Kg"));

                if(human){

                    UserVO userVO = UserVO.builder()
                            .username("user" + i)
                            .password("1111")
                            .build();
                    userRepository.save(userVO);

                    actorDTO.setBirthday(yeardel);
                    actorDTO.setHeight(cmdel);
                    actorDTO.setWeight(kgdel);
                    actorDTO.setName(name.text());
                    actorList.add(actorDTO);

                    Actor actor = service.dtoToEntity(actorDTO);

                    actor.changeUserVO(userVO);
                    actorRepository.save(actor);
                    System.out.println("actor" + actor);
                }
            }

            System.out.println("actorList.size() : " + actorList.size());
        }


    public Document connectUrl(String url) throws IOException {
        return Jsoup
                .connect(url)
                .method(Connection.Method.GET)
                .userAgent("Mozilla/5.0 (X11; Linux x86_64; rv:10.0) " +
                        "Gecko/20100101 Firefox/10.0 " +
                        "AppleWebKit/537.36 (KHTML, like Gecko) " +
                        "Chrome/51.0.2704.106 Safari/537.36")
                .execute()
                .parse();
    }

}



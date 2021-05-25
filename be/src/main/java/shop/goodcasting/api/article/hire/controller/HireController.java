package shop.goodcasting.api.article.hire.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.goodcasting.api.article.hire.domain.HireDTO;
import shop.goodcasting.api.article.hire.service.HireServiceImpl;


@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/hire")
public class HireController {
    private final HireServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<Long> register(@RequestBody HireDTO hireDTO) {

        service.register(hireDTO);

        return ResponseEntity.ok(1L);
    }
    @GetMapping("/hire-detail/{hireId}")
    public ResponseEntity<HireDTO> hireDetail(@PathVariable Long hireId) {
        return ResponseEntity.ok(service.readHire(hireId));
    }

    @PutMapping("/update")
    public ResponseEntity<Long> update(@RequestBody HireDTO hireDTO){
        service.update(hireDTO);
        return new ResponseEntity<>(1L, HttpStatus.OK);
    }

    @DeleteMapping("/{hireId}")
    public ResponseEntity<Long> delete(@PathVariable Long hireId){
        service.deleteHire(hireId);
        return new ResponseEntity<>(1L, HttpStatus.OK);
    }



}

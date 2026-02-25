package com.yumeng.backend.controller;

import com.yumeng.backend.model.MLModel;
import com.yumeng.backend.repository.MLModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/models")
public class ModelController {

    @Autowired
    private MLModelRepository repository;

    @GetMapping
    public List<MLModel> getAllModels() {
        return repository.findAll();
    }
}
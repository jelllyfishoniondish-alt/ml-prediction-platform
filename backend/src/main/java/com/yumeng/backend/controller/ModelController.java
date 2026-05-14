package com.yumeng.backend.controller;

import com.yumeng.backend.model.MLModel;
import com.yumeng.backend.repository.MLModelRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/models")
public class ModelController {
    private final MLModelRepository repository;

    public ModelController(MLModelRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MLModel> getAllModels() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MLModel> getModelById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MLModel> createModel(@RequestBody MLModel model) {
        model.setId(null);
        MLModel createdModel = repository.save(model);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MLModel> updateModel(@PathVariable Long id, @RequestBody MLModel modelDetails) {
        return repository.findById(id)
                .map(existingModel -> {
                    existingModel.setName(modelDetails.getName());
                    existingModel.setCategory(modelDetails.getCategory());
                    existingModel.setTechStack(modelDetails.getTechStack());
                    existingModel.setStatus(modelDetails.getStatus());
                    existingModel.setDescription(modelDetails.getDescription());
                    existingModel.setAchievement(modelDetails.getAchievement());
                    MLModel updatedModel = repository.save(existingModel);
                    return ResponseEntity.ok(updatedModel);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
